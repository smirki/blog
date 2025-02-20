import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TransmissionIndex - a cyberpunk-themed blog index page
 */
export default function TransmissionIndex() {
  // Example “data” for transmissions; you can fetch dynamically instead.
  const transmissions = [
    {
      slug: "Dawn", // This was "Transmission 1: The Dawn of AI Night City"
      title: "Transmission 1: The Dawn of AI Night City",
      excerpt:
        "Explore the neon-lit origins of AI Night City. From the first spark of machine consciousness to the sprawling metropolis we know today.",
      date: "September 24, 2045",
      readTime: "5 min read",
    },
    {
      slug: "2", // Transmission 2: Cybernetics & Ethics
      title: "Transmission 2: Cybernetics & Ethics",
      excerpt:
        "As humanity merges with machines, new ethical dilemmas arise. Dive deep into the moral quagmire of neural implants and genetic enhancements.",
      date: "October 2, 2045",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-10">
      {/* Animated Grid Background (if you want to keep it consistent with the rest of your site) */}
      <div className="grid-background"></div>

      {/* Neon Hero Section */}
      <header className="h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent neon-pulse">
          Night City Transmissions
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto md:text-lg">
          Tap into the latest neural pulses from the heart of the cyber metropolis.  
          <br className="hidden md:block" />
          Connect your mind to the stories shaping tomorrow.
        </p>
      </header>

      {/* Main Blog Index */}
      <main className="container mx-auto px-4 md:px-8 lg:px-12 -mt-16">
        {/* Cyber border container around the blog listings */}
        <div className="cyber-border p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            All Transmissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transmissions.map((t) => (
              <article
                key={t.slug}
                className="bg-black/40 p-5 rounded-xl transition-transform
                           transform hover:-translate-y-1 hover:shadow-lg
                           hover:shadow-cyan-500/30"
              >
                {/* Title & Link */}
                <Link to={`/transmissions/${t.slug}`}>
                  <h3 className="text-xl font-semibold mb-3 text-cyan-400 hover:text-cyan-200">
                    {t.title}
                  </h3>
                </Link>
                {/* Meta Info */}
                <div className="text-sm text-gray-400 mb-3 flex items-center gap-3">
                  <span>{t.date}</span>
                  <span className="text-cyan-500">•</span>
                  <span>{t.readTime}</span>
                </div>
                {/* Excerpt */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {t.excerpt}
                </p>
                {/* Read More Link */}
                <Link
                  to={`/transmissions/${t.slug}`}
                  className="inline-block text-cyan-400 hover:text-cyan-200 mt-2 font-medium"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>

          {/* Example Pagination (If you have more transmissions) */}
          <div className="mt-10 flex items-center justify-center space-x-4">
            <button className="px-4 py-2 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300">
              ← Prev
            </button>
            <div className="flex space-x-2 text-sm">
              <span className="px-4 py-2 rounded-md bg-cyan-500/20">1</span>
              <span className="px-4 py-2 rounded-md hover:bg-cyan-500/20 cursor-pointer">
                2
              </span>
              <span className="px-4 py-2 rounded-md hover:bg-cyan-500/20 cursor-pointer">
                3
              </span>
            </div>
            <button className="px-4 py-2 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300">
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
