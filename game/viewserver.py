import os
import re
import sqlite3
import random
from flask import Flask, render_template, request, jsonify, g

app = Flask(__name__)
DATABASE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'tailwindview.db')
K_FACTOR = 32  # Elo adjustment constant

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    # Ensure the 'elo' column exists in chats.
    try:
        db.execute("ALTER TABLE chats ADD COLUMN elo INTEGER")
        db.commit()
    except sqlite3.OperationalError:
        pass  # Likely the column already exists.
    db.execute("UPDATE chats SET elo = 1500 WHERE elo IS NULL")
    db.commit()

    # Ensure the 'reports' column exists in chats if you want a simple counter.
    try:
        db.execute("ALTER TABLE chats ADD COLUMN reports INTEGER")
        db.commit()
    except sqlite3.OperationalError:
        pass  # Already exists.
    db.execute("UPDATE chats SET reports = 0 WHERE reports IS NULL")
    db.commit()

    # Create a new table for detailed reports if it doesn't exist.
    db.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id INTEGER,
            report_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    db.commit()

def extract_html(markdown_text):
    """
    Extracts HTML content from markdown that looks like:
    ```html
    ... HTML content ...
    ```
    If not in that format, returns the original text.
    """
    pattern = re.compile(r"^```html\s*(.*?)\s*```", re.DOTALL)
    match = pattern.search(markdown_text)
    if match:
        return match.group(1)
    return markdown_text

# Initialize the database at startup.
with app.app_context():
    init_db()

@app.route("/")
def compare():
    return render_template("compare.html")

@app.route("/api/pair", methods=["GET"])
def get_pair():
    """Return two random website entries as JSON."""
    db = get_db()
    cur = db.execute("SELECT * FROM chats ORDER BY RANDOM() LIMIT 2")
    rows = cur.fetchall()
    if len(rows) < 2:
        return jsonify({"error": "Not enough entries in database."}), 400

    pair = []
    for row in rows:
        pair.append({
            "id": row["id"],
            "question": row["question"],
            "reasoning": row["reasoning"],
            "html": extract_html(row["answer"]),
            "elo": row["elo"],
            "reports": row["reports"]
        })
    return jsonify({"siteA": pair[0], "siteB": pair[1]})

@app.route("/api/choose", methods=["POST"])
def choose():
    """
    Receive a JSON payload with:
      { "winner_id": <id>, "loser_id": <id> }
    Update Elo ratings accordingly and return a new pair.
    """
    data = request.get_json()
    if not data or "winner_id" not in data or "loser_id" not in data:
        return jsonify({"error": "Invalid data."}), 400

    winner_id = data["winner_id"]
    loser_id = data["loser_id"]
    db = get_db()

    # Fetch both entries.
    cur = db.execute("SELECT * FROM chats WHERE id IN (?, ?)", (winner_id, loser_id))
    rows = cur.fetchall()
    if len(rows) != 2:
        return jsonify({"error": "Could not find both entries."}), 400

    winner, loser = None, None
    for row in rows:
        if row["id"] == winner_id:
            winner = row
        elif row["id"] == loser_id:
            loser = row
    if winner is None or loser is None:
        return jsonify({"error": "Invalid winner or loser."}), 400

    # Calculate Elo ratings for a head-to-head win.
    r_winner = winner["elo"]
    r_loser = loser["elo"]
    expected_winner = 1 / (1 + 10 ** ((r_loser - r_winner) / 400))
    expected_loser = 1 / (1 + 10 ** ((r_winner - r_loser) / 400))

    new_winner_rating = r_winner + K_FACTOR * (1 - expected_winner)
    new_loser_rating = r_loser + K_FACTOR * (0 - expected_loser)

    db.execute("UPDATE chats SET elo = ? WHERE id = ?", (int(new_winner_rating), winner_id))
    db.execute("UPDATE chats SET elo = ? WHERE id = ?", (int(new_loser_rating), loser_id))
    db.commit()

    # Return a new pair.
    cur = db.execute("SELECT * FROM chats ORDER BY RANDOM() LIMIT 2")
    rows = cur.fetchall()
    if len(rows) < 2:
        return jsonify({"error": "Not enough entries for a new pair."}), 400
    pair = []
    for row in rows:
        pair.append({
            "id": row["id"],
            "question": row["question"],
            "reasoning": row["reasoning"],
            "html": extract_html(row["answer"]),
            "elo": row["elo"],
            "reports": row["reports"]
        })
    return jsonify({"siteA": pair[0], "siteB": pair[1]})

@app.route("/api/choose_tie", methods=["POST"])
def choose_tie():
    """
    Handle votes when the user chooses one of the "both" options.
    Expected JSON payload:
      {
        "idA": <id>,
        "idB": <id>,
        "type": "good"  // Both Good vote
         OR
        "type": "bad"   // Both Need Work vote
      }
    For "good": update both as a tie (draw).
    For "bad": update both as if they lost to an imaginary opponent with a rating of 1500.
    """
    data = request.get_json()
    if not data or "idA" not in data or "idB" not in data or "type" not in data:
        return jsonify({"error": "Invalid data."}), 400

    idA = data["idA"]
    idB = data["idB"]
    vote_type = data["type"]

    db = get_db()
    cur = db.execute("SELECT * FROM chats WHERE id IN (?, ?)", (idA, idB))
    rows = cur.fetchall()
    if len(rows) != 2:
        return jsonify({"error": "Could not find both entries."}), 400

    entryA, entryB = None, None
    for row in rows:
        if row["id"] == idA:
            entryA = row
        elif row["id"] == idB:
            entryB = row

    if entryA is None or entryB is None:
        return jsonify({"error": "Invalid entries."}), 400

    rA = entryA["elo"]
    rB = entryB["elo"]

    if vote_type == "good":
        # Treat as a tie.
        expectedA = 1 / (1 + 10 ** ((rB - rA) / 400))
        expectedB = 1 / (1 + 10 ** ((rA - rB) / 400))
        new_rA = rA + K_FACTOR * (0.5 - expectedA)
        new_rB = rB + K_FACTOR * (0.5 - expectedB)
    elif vote_type == "bad":
        # Treat as a loss against an imaginary opponent with rating 1500.
        imaginary = 1500
        expectedA = 1 / (1 + 10 ** ((imaginary - rA) / 400))
        expectedB = 1 / (1 + 10 ** ((imaginary - rB) / 400))
        new_rA = rA + K_FACTOR * (0 - expectedA)
        new_rB = rB + K_FACTOR * (0 - expectedB)
    else:
        return jsonify({"error": "Invalid vote type."}), 400

    db.execute("UPDATE chats SET elo = ? WHERE id = ?", (int(new_rA), idA))
    db.execute("UPDATE chats SET elo = ? WHERE id = ?", (int(new_rB), idB))
    db.commit()

    # Return a new pair.
    cur = db.execute("SELECT * FROM chats ORDER BY RANDOM() LIMIT 2")
    rows = cur.fetchall()
    if len(rows) < 2:
        return jsonify({"error": "Not enough entries for a new pair."}), 400
    pair = []
    for row in rows:
        pair.append({
            "id": row["id"],
            "question": row["question"],
            "reasoning": row["reasoning"],
            "html": extract_html(row["answer"]),
            "elo": row["elo"],
            "reports": row["reports"]
        })
    return jsonify({"siteA": pair[0], "siteB": pair[1]})

@app.route("/api/report", methods=["POST"])
def report():
    """
    Receive a JSON payload with:
      { "id": <site id>, "report_text": "<user report>" }
    Save the report text in the reports table.
    """
    data = request.get_json()
    if not data or "id" not in data or "report_text" not in data:
        return jsonify({"error": "Invalid data."}), 400

    site_id = data["id"]
    report_text = data["report_text"].strip()
    if not report_text:
        return jsonify({"error": "Report text cannot be empty."}), 400

    db = get_db()
    db.execute("INSERT INTO reports (chat_id, report_text) VALUES (?, ?)", (site_id, report_text))
    db.commit()

    return jsonify({"message": "Report saved."})

if __name__ == "__main__":
    app.run(debug=True)
