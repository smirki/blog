import React from 'react';
import { marked } from 'marked';

const markdownContent = `
# Transmission 2: Cybernetics & Ethics

As we embrace enhancements, we must consider the moral lines we cross...

1. **Augmentation or Inequality?**
2. **Privacy or Open Systems?**

> "We shape our tools, and thereafter, our tools shape us." — Marshall McLuhan
`;

export default function Transmission2() {
  const html = marked.parse(markdownContent);

  return (
    <div className="prose prose-invert max-w-none p-6">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
