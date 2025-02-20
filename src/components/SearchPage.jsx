import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// Import your transmissions index data
import { transmissionsArticles } from './transmissionsIndex';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() !== '') {
      // Filter the articles by checking if the title includes the query string (case-insensitive)
      const filtered = transmissionsArticles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-black p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent neon-pulse mb-8">
          Search Results
        </h1>
        <div className="mb-6 text-center">
          <span className="text-xl text-white">Your search for: </span>
          <span className="text-xl font-bold text-cyan-400">"{query}"</span>
        </div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article, index) => (
              <Link
                key={index}
                to={`/transmissions/${article.slug}`}
                className="block p-6 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition transform hover:-translate-y-1 shadow-lg cyber-border"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-300">Read more...</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-400">
            No results found for "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
