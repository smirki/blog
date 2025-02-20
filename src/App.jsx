import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ChatOverlay from './components/ChatOverlay';

// Pages
import Home from './pages/Home';
import Cortex from './pages/Cortex';
import SearchPage from './components/SearchPage';  // Import the new search page

import TransmissionIndex from './pages/transmissions/TransmissionIndex';
import Dawn from './pages/transmissions/Dawn';
import Transmission2 from './pages/transmissions/Transmission2';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  // Load theme from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.body.style.background = '';
    } else {
      // Default dark mode
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.body.style.background = 'radial-gradient(circle at center, #0a0a1a 0%, #000 100%)';
    }
  }, []);

  const handleThemeToggle = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.body.style.background = '';
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.background = 'radial-gradient(circle at center, #0a0a1a 0%, #000 100%)';
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <BrowserRouter>
      <Header onThemeToggle={handleThemeToggle} isDark={isDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:term?" element={<Cortex />} />
        <Route path="/cortex" element={<Cortex />} />
        <Route path="/search" element={<SearchPage />} /> {/* New Search Page Route */}
        <Route path="/transmissions" element={<TransmissionIndex />} />
        <Route path="/transmissions/dawn" element={<Dawn />} />
        <Route path="/transmissions/2" element={<Transmission2 />} />
      </Routes>
      <Footer />
      <ChatOverlay />
      {/* CRT Overlay effect (the scanning lines) */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0.2)_50%,transparent_50%)]
                     opacity-50"
          style={{ backgroundSize: '100% 4px' }}
        ></div>
        <div
          className="absolute inset-0 animate-scanline bg-[linear-gradient(transparent_95%,rgba(0,255,255,0.05)_100%)]"
        ></div>
      </div>
    </BrowserRouter>
  );
}
