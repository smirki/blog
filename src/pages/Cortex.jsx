import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { glossaryData } from '../data/glossaryData';
import { marked } from 'marked';
import { FaRobot } from 'react-icons/fa';
import renderMathInElement from 'katex/contrib/auto-render'; // Import KaTeX auto-render

// Helper function for smooth scrolling
const smoothScrollTo = (element, duration = 500) => {
  const startingY = window.pageYOffset;
  const elementY = element.getBoundingClientRect().top + window.pageYOffset;
  const diff = elementY - startingY;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

// Helper to create URL-friendly slugs from terms.
const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

export default function Cortex() {
  const { term: urlTerm } = useParams(); // Extract the term parameter from the URL
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeDefinition, setActiveDefinition] = useState(null);
  const [showChat, setShowChat] = useState(false); // State for chat visibility
  const [messages, setMessages] = useState([]); // State for chat messages
  const [newMessage, setNewMessage] = useState(''); // For user input in chat
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const messagesEndRef = useRef(null);  // Ref for scrolling to bottom of chat
  const definitionRef = useRef(null); // Ref for scrolling to definition

  // When the URL contains a term, look it up in the glossaryData.
  useEffect(() => {
    if (urlTerm) {
      // Compare the slugified term in glossaryData to the URL term.
      const matchingTerm = glossaryData.find(item => slugify(item.term) === urlTerm.toLowerCase());
      if (matchingTerm) {
        setActiveDefinition(matchingTerm);
        setSearchTerm(matchingTerm.term);
        // Scroll to the definition section smoothly
        if (definitionRef.current) {
          setTimeout(() => smoothScrollTo(definitionRef.current), 100);
        }
      }
    }
  }, [urlTerm]);

  // Update filtered results when the search term changes.
  useEffect(() => {
    if (!searchTerm) {
      setFilteredResults([]);
      return;
    }
    const matches = glossaryData.filter((item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(matches);
  }, [searchTerm]);

  const showTermDefinition = (term) => {
    const found = glossaryData.find((item) => item.term === term);
    if (found) {
      setActiveDefinition(found);
      // Scroll to the definition section smoothly
      if (definitionRef.current) {
        setTimeout(() => smoothScrollTo(definitionRef.current), 100);
      }
    }
  };

  const getDefinitionHTML = (item) => {
    if (!item) return '';
    if (item.longDefinition) {
      return marked.parse(item.longDefinition);
    }
    return marked.parse(item.definition);
  };

  // After the definition is rendered, use KaTeX to process math expressions.
  useEffect(() => {
    if (definitionRef.current) {
      renderMathInElement(definitionRef.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ]
      });
    }
  }, [activeDefinition]);

  // Chat functionality
  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { text: newMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate a delay for the AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find the relevant term. This logic could be MUCH more sophisticated.
    const aiResponse = glossaryData.find(item => item.term.toLowerCase().includes(newMessage.toLowerCase()));

    let aiMessage;
    if (aiResponse) {
      aiMessage = { text: aiResponse.definition, sender: 'ai' };
    } else {
      aiMessage = { text: "I'm not sure I understand. Try searching for a term in the glossary.", sender: 'ai' };
    }

    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setIsTyping(false);
  };

  // Scroll to the bottom of the chat whenever messages change.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add a debounce function to prevent rapid updates.
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSetSearchTerm = debounce(setSearchTerm, 200);

  return (
    <div className="container mx-auto px-6 pt-24 pb-12 relative animate-scanline"
         style={{
           backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)",
           backgroundSize: "100% 4px"
         }}>
      <div className="cyber-border holographic-header rounded-t-2xl py-8 mb-4">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-pulse">
          Cortex: Neural Glossary
        </h1>
      </div>

      {/* Search bar */}
      <div className="search-container text-center mb-4">
        <input
          type="text"
          onChange={(e) => debouncedSetSearchTerm(e.target.value)}
          className="search-input bg-black/30 border border-cyan-500/30
                     rounded-lg px-4 py-2 text-white focus:outline-none
                     focus:ring-2 focus:ring-cyan-500/50 w-full md:w-1/2 max-w-md"
          placeholder="Search terms..."
          value={searchTerm}
        />
        {filteredResults.length > 0 && (
          <div className="search-results absolute left-1/2 transform -translate-x-1/2
                          bg-black/70 border border-cyan-500/30 mt-2 w-full md:w-1/2 max-w-md z-20"
          >
            {filteredResults.map((res) => (
              <div
                key={res.term}
                className="search-result-item px-4 py-2 cursor-pointer text-cyan-300 hover:bg-cyan-500/20"
                onClick={() => {
                  showTermDefinition(res.term);
                  setSearchTerm(res.term);
                  setFilteredResults([]);
                }}
              >
                {res.term}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Word cloud */}
      <div className="word-cloud-container flex flex-wrap justify-center items-center gap-2 mb-6">
        {glossaryData.map((item) => (
          <span
            key={item.term}
            className="word-cloud-term text-cyan-300 cursor-pointer transition-transform
                       hover:scale-150 hover:text-shadow hover:text-pink-400
                       text-lg md:text-xl"
            onClick={() => showTermDefinition(item.term)}
          >
            {item.term}
          </span>
        ))}
      </div>

      {/* Definition box */}
      <div ref={definitionRef}
           className={`cyber-border term-definition-container transition-all duration-500 ease-in-out ${
             activeDefinition ? 'active opacity-100 max-h-screen py-4 px-6' : 'opacity-0 max-h-0 overflow-hidden p-0'
           }`}
      >
        {activeDefinition && (
          <div
            className="prose prose-invert prose-code:text-cyan-300 prose-strong:text-pink-400"
            dangerouslySetInnerHTML={{
              __html: getDefinitionHTML(activeDefinition)
            }}
          />
        )}
      </div>

      {/* Chat button */}
      <button
        onClick={handleChatToggle}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-purple-500 
                   hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg z-40"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat container */}
      <div className={`chat-container ${showChat ? 'active' : ''}`}>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="avatar">{message.sender === 'user' ? 'U' : 'AI'}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="avatar">AI</div>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="px-4 pb-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full bg-black/50 border border-cyan-500/30 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            placeholder="Type your message..."
          />
        </form>
      </div>
    </div>
  );
}
