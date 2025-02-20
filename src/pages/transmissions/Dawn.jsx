import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';

/**
 * Example markdown content with:
 * - Headings
 * - Highlights
 * - Math (inline $...$ or block $$...$$)
 * - Images
 */
const markdownContent = `
# Transmission 1: The Dawn of AI Night City

**In the neon-lit alleys** of a future metropolis, neural networks guide every aspect of life, from traffic flow to economic policy. This is just the beginning...

![Night City Skyline](https://placehold.it/800x400/111111/09f.png?text=Night+City+Skyline)

## Highlights
- Cybernetic synergy
- AI consciousness
- Quantum leaps

> "The future is here. It's just not evenly distributed." — William Gibson

### A Mathematical Interlude

Consider the gradient descent update rule:
\\[
w := w - \\alpha \\nabla L
\\]
where \\( \\alpha \\) is the learning rate.

### Conclusion

**Stay tuned** for more transmissions as we delve deeper into the luminous realm of AI Night City.
`;

export default function Dawn() {
  const contentRef = useRef(null);

  // Parse Markdown to HTML
  const html = marked.parse(markdownContent);

  // Auto-render math expressions using KaTeX
  useEffect(() => {
    if (contentRef.current) {
      renderMathInElement(contentRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false,
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen pt-20 pb-10">
      {/* Optional: Animated grid or background effect */}
      <div className="grid-background"></div>

      {/* HERO / HEADER SECTION */}
      <header className="h-[40vh] w-full holographic-header flex items-center justify-center text-center px-6 mb-8 relative overflow-hidden">
        {/* The neon-pulse heading */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent neon-pulse z-10">
          Transmission 1: The Dawn of AI Night City
        </h1>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="cyber-border p-6 md:p-10">
          {/* PROSE container styled to look exactly like Medium */}
          <article
            ref={contentRef}
            className="prose prose-invert max-w-none prose-lg space-y-8
                       prose-headings:font-bold prose-headings:mt-0 prose-headings:mb-4
                       prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </div>
  );
}
