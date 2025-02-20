import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { transmissionsArticles } from './transmissionsIndex';

const fuse = new Fuse(transmissionsArticles, {
  keys: ['title'],
  threshold: 0.3, // adjust this to control fuzziness
});

export default function NeuralSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const fuseResults = fuse.search(q);
    setResults(fuseResults.map(result => result.item));
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search transmissions..."
      />
      <ul>
        {results.map((article, idx) => (
          <li key={idx}>
            <a href={`/transmissions/${article.slug}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
