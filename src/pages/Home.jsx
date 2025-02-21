import React from 'react';

// MetaTags component for SEO and social sharing
function MetaTags() {
  return (
    <>
      <meta name="description" content="AI Night City: An AI blog by Manav Majumdar, Sam Eyerman" />
      <meta property="og:title" content="AI Night City" />
      <meta property="og:description" content="Explore neural analytics, quantum computing and more." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* Add additional meta tags as needed */}
    </>
  );
}

// Header component (Hero Section)
function Header() {
  return (
    <header className="relative w-full h-screen overflow-hidden" role="banner">
      {/* Moving Grid Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true"></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-5xl md:text-7xl font-bold neon-pulse text-white mb-4">
          AI Night City
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          An AI blog by Manav Majumdar, Sam Eyerman
        </p>
        <button
          className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-lg text-white hover:opacity-90 transition"
          aria-label="Begin your journey"
        >
          Begin Your Journey
        </button>
      </div>
    </header>
  );
}

// MainContent component with articles and pagination
function MainContent() {
  return (
    <main className="lg:col-span-3 space-y-12">
      {/* Enhanced Card */}
      <article className="cyber-border parallax-card group overflow-hidden" aria-labelledby="neural-analytics-title">
        <div className="h-48 w-full holographic-header rounded-t-2xl" aria-hidden="true"></div>
        <div className="p-6 space-y-4">
          <h3 id="neural-analytics-title" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent neon-pulse">
            Neural Analytics
          </h3>
          <p className="text-gray-300/80">Learn about all Ai</p>
          <button className="bg-gradient-to-r from-cyan-400 to-purple-400 px-4 py-2 rounded-lg hover:opacity-90 transition" aria-label="Access Cortex">
            Access Cortex
          </button>
        </div>
      </article>

      {/* Featured Post */}
      <article className="cyber-border parallax-card overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-t-xl" aria-hidden="true"></div>
        <div className="p-6">
          <span className="text-cyan-400 text-sm">Quantum Computing</span>
          <h2 className="text-3xl font-bold my-4">Neural Networks in 2045: The Singularity Horizon</h2>
          <p className="text-gray-300/80 mb-6">
            Explore how artificial superintelligence is reshaping...
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition" aria-label="Read full transmission">
            Read Full Transmission
          </button>
        </div>
      </article>

      {/* Post Grid */}
      <section aria-label="Additional Posts" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/** Sample Post Cards **/}
        {['Cybernetic Augmentation Ethics', 'Cybernetic Augmentation Ethics'].map((title, index) => (
          <article key={index} className="cyber-border p-4 hover:-translate-y-1 transition-transform overflow-hidden">
            <div className="h-40 mb-4 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-xl" aria-hidden="true"></div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300/80 text-sm mb-4">
              The moral implications of human-machine...
            </p>
            <div className="flex justify-between text-xs text-cyan-400">
              <span>15.08.2045</span>
              <span>8 min read</span>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <nav className="flex justify-center space-x-4 mt-8" aria-label="Pagination">
        <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition" aria-label="Previous Page">
          ← Prev
        </button>
        <div className="flex space-x-2">
          <span className="px-4 py-2 rounded-lg bg-cyan-500/20">1</span>
          <button className="px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition" aria-label="Page 2">
            2
          </button>
          <button className="px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition" aria-label="Page 3">
            3
          </button>
        </div>
        <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition" aria-label="Next Page">
          Next →
        </button>
      </nav>
    </main>
  );
}

// Sidebar component with glossary and newsletter
function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Glossary Section */}
      <section className="cyber-border p-6" aria-labelledby="glossary-heading">
        <h3 id="glossary-heading" className="text-xl font-bold mb-4">Neural Index</h3>
        <nav className="space-y-3">
          <a
            href="/cortex"
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition"
          >
            <span className="mr-2" aria-hidden="true">⏺</span> AI Terminology
          </a>
          <a
            href="/"
            className="flex items-center text-purple-400 hover:text-purple-300 transition"
          >
            <span className="mr-2" aria-hidden="true">⏺</span> Cybernetic Laws (in development)
          </a>
        </nav>
      </section>

      {/* Newsletter Section */}
      <section className="cyber-border p-6" aria-labelledby="newsletter-heading">
        <h3 id="newsletter-heading" className="text-xl font-bold mb-4">Subscribe Pulse</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.elements.newsletterEmail.value;
            alert('Subscribed: ' + email);
          }}
        >
          <label htmlFor="newsletterEmail" className="sr-only">Email address</label>
          <input
            type="email"
            name="newsletterEmail"
            placeholder="Your neuro-email"
            className="w-full mb-3 bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-lg w-full hover:opacity-90 transition"
          >
            Join Neural Network
          </button>
        </form>
      </section>
    </aside>
  );
}

// App Component
export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Include Meta Tags */}
      <MetaTags />
      
      {/* Hero Section */}
      <Header />

      {/* Main Layout */}
      <div className="container mx-auto px-6 pb-32 -mt-20 lg:-mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MainContent />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
