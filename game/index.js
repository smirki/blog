const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Constants
const DB_PATH = path.join(__dirname, 'tailwindview.db');
const K_FACTOR = 32;

// Initialize the database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database:', DB_PATH);
  }
});

// Utility function to run a query with optional params and return a Promise
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

// Utility function to get all rows from a query (SELECT)
function getAll(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// Utility function similar to 'init_db' in Flask code
async function initDb() {
  try {
    // Add the 'elo' column if it doesn't exist
    await runQuery('ALTER TABLE chats ADD COLUMN elo INTEGER');
    console.log("Added 'elo' column to chats.");
  } catch (err) {
    // Ignore errors like 'duplicate column name'
  }

  // Set default 1500 for null elo
  await runQuery('UPDATE chats SET elo = 1500 WHERE elo IS NULL');

  try {
    // Add the 'reports' column if it doesn't exist
    await runQuery('ALTER TABLE chats ADD COLUMN reports INTEGER');
    console.log("Added 'reports' column to chats.");
  } catch (err) {
    // Ignore errors like 'duplicate column name'
  }

  // Set default 0 for null reports
  await runQuery('UPDATE chats SET reports = 0 WHERE reports IS NULL');

  // Create a separate 'reports' table if not exists
  await runQuery(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      report_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Database initialization complete.");
}

// Extract HTML content from Markdown wrapped in ```html ... ```
function extractHtml(markdownText) {
  const pattern = /^```html\s*(.*?)\s*```/s;
  const match = pattern.exec(markdownText);
  if (match) {
    return match[1];
  }
  return markdownText;
}

// Call initDb on startup
initDb().catch(err => console.error("initDb error:", err));

// Serve compare.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'compare.html'));
});

// GET /api/pair - return two random entries
app.get('/api/pair', async (req, res) => {
  try {
    const rows = await getAll('SELECT * FROM chats ORDER BY RANDOM() LIMIT 2');
    if (rows.length < 2) {
      return res.status(400).json({ error: 'Not enough entries in database.' });
    }

    const pair = rows.map(row => ({
      id: row.id,
      question: row.question,
      reasoning: row.reasoning,
      html: extractHtml(row.answer),
      elo: row.elo,
      reports: row.reports
    }));

    return res.json({ siteA: pair[0], siteB: pair[1] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

// POST /api/choose - update ELO for winner/loser
app.post('/api/choose', async (req, res) => {
  const { winner_id, loser_id } = req.body;
  if (!winner_id || !loser_id) {
    return res.status(400).json({ error: 'Invalid data.' });
  }

  try {
    // Get both chats
    const rows = await getAll('SELECT * FROM chats WHERE id IN (?, ?)', [winner_id, loser_id]);
    if (rows.length !== 2) {
      return res.status(400).json({ error: 'Could not find both entries.' });
    }

    let winner = null;
    let loser = null;
    for (const row of rows) {
      if (row.id === winner_id) {
        winner = row;
      } else if (row.id === loser_id) {
        loser = row;
      }
    }

    if (!winner || !loser) {
      return res.status(400).json({ error: 'Invalid winner or loser ID.' });
    }

    // ELO calculation
    const r_winner = winner.elo;
    const r_loser = loser.elo;
    const expected_winner = 1 / (1 + Math.pow(10, (r_loser - r_winner) / 400));
    const expected_loser = 1 / (1 + Math.pow(10, (r_winner - r_loser) / 400));

    const new_winner_rating = r_winner + K_FACTOR * (1 - expected_winner);
    const new_loser_rating = r_loser + K_FACTOR * (0 - expected_loser);

    await runQuery('UPDATE chats SET elo = ? WHERE id = ?', [Math.round(new_winner_rating), winner_id]);
    await runQuery('UPDATE chats SET elo = ? WHERE id = ?', [Math.round(new_loser_rating), loser_id]);

    // Return a new pair
    const newPair = await getAll('SELECT * FROM chats ORDER BY RANDOM() LIMIT 2');
    if (newPair.length < 2) {
      return res.status(400).json({ error: 'Not enough entries for a new pair.' });
    }

    const pair = newPair.map(row => ({
      id: row.id,
      question: row.question,
      reasoning: row.reasoning,
      html: extractHtml(row.answer),
      elo: row.elo,
      reports: row.reports
    }));

    return res.json({ siteA: pair[0], siteB: pair[1] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

// POST /api/choose_tie - handle "both good" or "both bad"
app.post('/api/choose_tie', async (req, res) => {
  const { idA, idB, type } = req.body;
  if (!idA || !idB || !type) {
    return res.status(400).json({ error: 'Invalid data.' });
  }

  try {
    const rows = await getAll('SELECT * FROM chats WHERE id IN (?, ?)', [idA, idB]);
    if (rows.length !== 2) {
      return res.status(400).json({ error: 'Could not find both entries.' });
    }

    let entryA = null;
    let entryB = null;
    for (const row of rows) {
      if (row.id === idA) {
        entryA = row;
      } else if (row.id === idB) {
        entryB = row;
      }
    }

    if (!entryA || !entryB) {
      return res.status(400).json({ error: 'Invalid entries.' });
    }

    let rA = entryA.elo;
    let rB = entryB.elo;

    if (type === 'good') {
      // Treat as a tie
      const expectedA = 1 / (1 + Math.pow(10, (rB - rA) / 400));
      const expectedB = 1 / (1 + Math.pow(10, (rA - rB) / 400));
      rA += K_FACTOR * (0.5 - expectedA);
      rB += K_FACTOR * (0.5 - expectedB);
    } else if (type === 'bad') {
      // Both lose to an imaginary 1500
      const imaginary = 1500;
      const expectedA = 1 / (1 + Math.pow(10, (imaginary - rA) / 400));
      const expectedB = 1 / (1 + Math.pow(10, (imaginary - rB) / 400));
      rA += K_FACTOR * (0 - expectedA);
      rB += K_FACTOR * (0 - expectedB);
    } else {
      return res.status(400).json({ error: 'Invalid vote type.' });
    }

    await runQuery('UPDATE chats SET elo = ? WHERE id = ?', [Math.round(rA), idA]);
    await runQuery('UPDATE chats SET elo = ? WHERE id = ?', [Math.round(rB), idB]);

    // Return a new pair
    const newPair = await getAll('SELECT * FROM chats ORDER BY RANDOM() LIMIT 2');
    if (newPair.length < 2) {
      return res.status(400).json({ error: 'Not enough entries for a new pair.' });
    }

    const pair = newPair.map(row => ({
      id: row.id,
      question: row.question,
      reasoning: row.reasoning,
      html: extractHtml(row.answer),
      elo: row.elo,
      reports: row.reports
    }));

    return res.json({ siteA: pair[0], siteB: pair[1] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

// POST /api/report - save report text in the reports table
app.post('/api/report', async (req, res) => {
  const { id, report_text } = req.body;
  if (!id || !report_text || !report_text.trim()) {
    return res.status(400).json({ error: 'Invalid data or empty report_text.' });
  }

  try {
    await runQuery('INSERT INTO reports (chat_id, report_text) VALUES (?, ?)', [id, report_text.trim()]);
    return res.json({ message: 'Report saved.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
