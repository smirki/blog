import React, { useState, useRef, useEffect } from 'react';

const sampleResponses = [
  "Welcome to Night City's Neural Network. How can I assist you today?",
  "Accessing cybernetic databases... What information do you seek?",
  "Neural pathways engaged. Ready to process your query."
];

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Open/close chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
    // If opening for first time, add initial AI msg
    if (!isOpen && messages.length === 0) {
      setMessages([{ content: sampleResponses[0], type: 'ai' }]);
    }
  };

  const addMessage = (content, type) => {
    setMessages((prev) => [...prev, { content, type }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    // user message
    addMessage(inputValue, 'user');
    setInputValue('');

    setIsTyping(true);
    // Simulate AI typing delay
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

    // AI message
    const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    addMessage(randomResponse, 'ai');
    setIsTyping(false);
  };

  // Press Enter to send
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* The bottom bar that triggers chat */}
      <div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4"
        style={{ zIndex: 60 }}
      >
        <div
          className="cyber-border backdrop-blur-xl bg-black/50 p-4 rounded-2xl flex items-center cursor-pointer"
          onClick={toggleChat}
        >
          <input
            type="text"
            placeholder="Ask the City AI..."
            className="flex-1 bg-transparent outline-none px-4 py-2 text-white focus:outline-none
                       focus:ring-2 focus:ring-cyan-500/50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <button
            className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500
                       rounded-lg hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation(); // prevent toggle
              handleSend();
            }}
          >
            Transmit
          </button>
        </div>
      </div>

      {/* The popup chat container */}
      <div className={`chat-container ${isOpen ? 'active' : ''}`}>
        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`message ${m.type}`}>
              <div className="avatar">
                {m.type === 'ai' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                {m.type === 'ai' ? (
                  <div className="text-cyan-400 text-sm mb-1">City AI</div>
                ) : (
                  <div className="text-purple-400 text-sm mb-1">You</div>
                )}
                <div className="text-white">{m.content}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai typing-indicator">
              <div className="avatar">🤖</div>
              <div className="message-content">
                <div className="text-cyan-400 text-sm mb-1">City AI</div>
                <div className="flex gap-2">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
