import React from 'react';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Moving Grid Background */}
        <div className="absolute inset-0 grid-bg"></div>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-5xl md:text-7xl font-bold neon-pulse text-white mb-4">
            AI Night City
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            An AI blog by Manav Majumdar, Sam Eyerman
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg text-white hover:opacity-90 transition">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <div className="container mx-auto px-6 pb-32 -mt-20 lg:-mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* MAIN COLUMN */}
          <main className="lg:col-span-3 space-y-12">
            {/* Enhanced Card 1 */}
            <div className="cyber-border parallax-card group overflow-hidden">
              <div className="h-48 w-full holographic-header rounded-t-2xl"></div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent neon-pulse">
                  Neural Analytics
                </h3>
                <p className="text-gray-300/80">
                  Learn about all Ai
                </p>
                <button className="bg-gradient-to-r from-cyan-400 to-purple-400 px-4 py-2 rounded-lg hover:opacity-90 transition">
                  Access Cortex
                </button>
              </div>
            </div>
            {/* Featured Post */}
            <article className="cyber-border parallax-card overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-t-xl"></div>
              <div className="p-6">
                <span className="text-cyan-400 text-sm">Quantum Computing</span>
                <h2 className="text-3xl font-bold my-4">
                  Neural Networks in 2045: The Singularity Horizon
                </h2>
                <p className="text-gray-300/80 mb-6">
                  Explore how artificial superintelligence is reshaping...
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition">
                  Read Full Transmission
                </button>
              </div>
            </article>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="cyber-border p-4 hover:-translate-y-1 transition-transform overflow-hidden">
                <div className="h-40 mb-4 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl"></div>
                <h3 className="text-xl font-bold mb-2">Cybernetic Augmentation Ethics</h3>
                <p className="text-gray-300/80 text-sm mb-4">
                  The moral implications of human-machine...
                </p>
                <div className="flex justify-between text-xs text-cyan-400">
                  <span>15.08.2045</span>
                  <span>8 min read</span>
                </div>
              </article>
              <article className="cyber-border p-4 hover:-translate-y-1 transition-transform overflow-hidden">
                <div className="h-40 mb-4 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl"></div>
                <h3 className="text-xl font-bold mb-2">Cybernetic Augmentation Ethics</h3>
                <p className="text-gray-300/80 text-sm mb-4">
                  The moral implications of human-machine...
                </p>
                <div className="flex justify-between text-xs text-cyan-400">
                  <span>15.08.2045</span>
                  <span>8 min read</span>
                </div>
              </article>
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-4 mt-8">
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition">
                ← Prev
              </button>
              <div className="flex space-x-2">
                <span className="px-4 py-2 rounded-lg bg-cyan-500/20">1</span>
                <span className="px-4 py-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer">
                  2
                </span>
                <span className="px-4 py-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer">
                  3
                </span>
              </div>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition">
                Next →
              </button>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            {/* Glossary Section */}
            <div className="cyber-border p-6 overflow-hidden">
              <h3 className="text-xl font-bold mb-4">Neural Index</h3>
              <nav className="space-y-3">
                <a
                  href="/cortex"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span className="mr-2">⏺</span> AI Terminology
                </a>
                <a
                  href="/"
                  className="flex items-center text-purple-400 hover:text-purple-300 transition"
                >
                  <span className="mr-2">⏺</span> Cybernetic Laws
                </a>
              </nav>
            </div>

            {/* Newsletter */}
            <div className="cyber-border p-6 overflow-hidden">
              <h3 className="text-xl font-bold mb-4">Subscribe Pulse</h3>
              <input
                type="email"
                placeholder="Your neuro-email"
                id="newsletterEmail"
                className="w-full mb-3 bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
              />
              <button
                className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-lg w-full hover:opacity-90 transition"
                onClick={() => {
                  const val = document.getElementById('newsletterEmail').value;
                  alert('Subscribed: ' + val);
                }}
              >
                Join Neural Network
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
