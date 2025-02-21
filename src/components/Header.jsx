import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header({ onThemeToggle, isDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // When the search form is submitted, navigate to the search page with the query.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the query as a URL parameter.
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  // Define navigation links and tooltips (greyed out ones are "coming soon")
  const navLinks = [
    { to: "/transmissions", label: "Transmissions", tooltip: "View all transmissions and updates.", active: true },
    { to: "#", label: "Ethics", tooltip: "Coming Soon: Explore AI ethics.", active: false },
    { to: "/cortex", label: "Cortex", tooltip: "Neural glossary and cortex insights.", active: true },
    { to: "#", label: "Simulation", tooltip: "Coming Soon: Run cyber simulations.", active: false },
    { to: "#", label: "Lab", tooltip: "Coming Soon: Access experimental labs.", active: false }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="cyber-border backdrop-blur-xl fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            AI NIGHT CITY
          </Link>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                  {link.active ? (
                    <Link
                      to={link.to}
                      className="text-xl font-bold text-white hover:text-cyan-400 transition"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-xl font-bold text-gray-400 cursor-default">
                      {link.label}
                    </span>
                  )}
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none whitespace-nowrap">
                    {link.tooltip}
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop Search Bar */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  placeholder="Neural Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 w-64 text-xl transition-all text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <div className="absolute right-3 top-2.5 text-cyan-500 text-xl">⌘/</div>
              </form>
            </div>
            {/* Desktop Sunshade Switch */}
            <div className="hidden md:block">
              <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="theme-toggle"
                  className="sr-only peer"
                  checked={isDark}
                  onChange={onThemeToggle}
                />
              </label>
            </div>
            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(true)} className="text-white text-3xl">
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <FaTimes />
          </button>
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              {link.active ? (
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={link.to}
                  className="text-2xl font-bold text-white hover:text-cyan-400 transition"
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-2xl font-bold text-gray-400">
                  {link.label}
                </span>
              )}
              {/* Tooltip for Mobile (displayed below link on hover) */}
              <div className="mt-2 text-center px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                {link.tooltip}
              </div>
            </div>
          ))}
          {/* Mobile Search Bar */}
          <div className="relative mt-6">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="search"
                placeholder="Neural Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 w-64 text-xl transition-all text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <div className="absolute right-3 top-2.5 text-cyan-500 text-xl">⌘/</div>
            </form>
          </div>
          {/* Mobile Sunshade Switch */}
          <div className="mt-6">
            <label htmlFor="mobile-theme-toggle" className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="mobile-theme-toggle"
                className="sr-only peer"
                checked={isDark}
                onChange={onThemeToggle}
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
}
