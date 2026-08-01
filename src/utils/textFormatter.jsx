import React from 'react';

// Formats raw text strings into ChatGPT-styled HTML/JSX elements with no raw ** asterisks
export function formatChatGPTText(text) {
  if (!text) return '';
  if (typeof text !== 'string') return text;

  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={lIdx} className="h-1.5"></div>;

    // Headings (# Header or ## Header)
    if (trimmed.startsWith('#')) {
      const headerText = trimmed.replace(/^#+\s*/, '');
      return (
        <h4 key={lIdx} className="font-bold text-base text-teal-300 mt-2.5 mb-1 tracking-tight flex items-center space-x-1.5">
          {parseBoldText(headerText)}
        </h4>
      );
    }

    // Bullet points (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const bulletContent = trimmed.slice(2);
      return (
        <div key={lIdx} className="flex items-start space-x-2 my-1 pl-1">
          <span className="text-teal-400 font-bold text-sm leading-none mt-0.5">•</span>
          <div className="leading-relaxed">{parseBoldText(bulletContent)}</div>
        </div>
      );
    }

    return (
      <p key={lIdx} className="my-1 leading-relaxed">
        {parseBoldText(trimmed)}
      </p>
    );
  });
}

// Helper: Replace **bold text** with styled <strong> elements
export function parseBoldText(str) {
  if (!str) return '';
  if (typeof str !== 'string') return str;

  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-teal-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
