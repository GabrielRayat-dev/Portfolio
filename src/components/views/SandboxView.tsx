import React, { useState, useEffect, useRef } from 'react';
import './SandboxView.css';

// Keywords are colored as "reserved words". Note: true/false are intentionally
// NOT here — they are grouped with numbers so they share the same accent color.
const keywords = [
  'const', 'let', 'var', 'function', 'func', 'void', 'return', 'class',
  'interface', 'if', 'else', 'for', 'while',
  'import', 'export', 'from',
];

// --- Safe Highlighter ---------------------------------------------------
// 1. Escape ALL raw HTML special chars first -> no injection possible.
// 2. Run a SINGLE combined tokenizing regex pass over the escaped plain
//    text. Strings are matched first, then keywords, then numbers/booleans,
//    then function-call names (identifier immediately followed by "("), and
//    finally bare brackets. Because it's one pass over escaped text, we never
//    re-scan already-injected <span> tags.
// -----------------------------------------------------------------------
const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const keywordPattern = keywords.join('|');

// Group 1 = string | Group 2 = keyword | Group 3 = number/boolean
// Group 4 = function name | (brackets are matched with no capture group)
const tokenRegex = new RegExp(
  `("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)` +
    `|\\b(${keywordPattern})\\b` +
    `|\\b(true|false|\\d+\\.?\\d*[eE][+-]?\\d+)\\b` +
    `|([A-Za-z_$][\\w$]*(?=\\s*\\())` +
    `|[(){}[\\]]`,
  'g'
);

const highlight = (text: string): string => {
  const escaped = escapeHtml(text);
  return escaped.replace(
    tokenRegex,
    (match, str, kw, num, fn) => {
      if (str !== undefined) return `<span class="highlight string">${str}</span>`;
      if (kw !== undefined) return `<span class="highlight keyword">${kw}</span>`;
      if (num !== undefined) return `<span class="highlight number">${num}</span>`;
      if (fn !== undefined) return `<span class="highlight function">${fn}</span>`;
      // Bare bracket: match is a single char in (){}[]
      if (match.length === 1 && '(){}[]'.includes(match)) {
        return `<span class="highlight bracket">${match}</span>`;
      }
      return match;
    }
  );
};

// Auto-closing pair map (opening -> closing)
const OPEN_TO_CLOSE: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']',
  '"': '"',
  "'": "'",
  '`': '`',
};
// Characters we can "skip over" if the user types them where one already exists
const CLOSING_CHARS = new Set([')', '}', ']', '"', "'", '`']);
// For backspace pair-deletion
const OPEN_TO_CLOSE_BRACKET: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']',
};

export const SandboxView: React.FC = () => {
  const [codeText, setCodeText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply highlighted, HTML-safe markup to the code block.
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlight(codeText);
    }
  }, [codeText]);

  // Keep the gutter + rendered code perfectly in sync with the textarea scroll.
  const handleScroll = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = ta.scrollTop;
    }
  };

  // Smart keyboard handling: Tab indent, auto-closing pairs, pair skip/delete.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const ta = textareaRef.current;
    if (!ta) return;

    // --- Tab: insert 4-space indentation ---
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const indent = '    ';
      const next = ta.value.slice(0, start) + indent + ta.value.slice(end);
      ta.value = next;
      ta.selectionStart = ta.selectionEnd = start + indent.length;
      setCodeText(next);
      return;
    }

    // --- Backspace: delete an empty pair in one stroke ---
    if (e.key === 'Backspace') {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      if (start === end && start > 0) {
        const before = ta.value[start - 1];
        const after = ta.value[start];
        const close = OPEN_TO_CLOSE_BRACKET[before];
        if (close && after === close) {
          e.preventDefault();
          const next = ta.value.slice(0, start - 1) + ta.value.slice(start + 1);
          ta.value = next;
          ta.selectionStart = ta.selectionEnd = start - 1;
          setCodeText(next);
        }
      }
      return;
    }

    // --- Skip over an auto-inserted closing char if it's already there ---
    const ch = e.key;
    if (CLOSING_CHARS.has(ch) && ta.value[ta.selectionStart] === ch) {
      e.preventDefault();
      ta.selectionStart = ta.selectionEnd = ta.selectionStart + 1;
      return;
    }

    // --- Auto-close an opening enclosure ---
    const close = OPEN_TO_CLOSE[ch];
    if (close !== undefined) {
      e.preventDefault();
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.slice(start, end);
      const next = ta.value.slice(0, start) + ch + selected + close + ta.value.slice(end);
      ta.value = next;
      // Place caret right between the pair (after the selected text)
      const caret = start + ch.length + selected.length;
      ta.selectionStart = ta.selectionEnd = caret;
      setCodeText(next);
    }
  };

  const focusEditor = () => textareaRef.current?.focus();

  const lineCount = Math.max(1, codeText.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div
      ref={containerRef}
      className="sandbox-editor relative h-full w-full bg-white dark:bg-zinc-950"
      onClick={focusEditor}
    >
      {/* Line-number gutter */}
      <div ref={gutterRef} className="gutter">
        {lineNumbers.map((n) => (
          <span key={n} className="line-number">{n}</span>
        ))}
      </div>

      {/* Transparent textarea (captures real input) */}
      <textarea
        ref={textareaRef}
        value={codeText}
        onChange={(e) => setCodeText(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="textarea absolute inset-0 w-full h-full bg-transparent border-none outline-none resize-none font-mono text-transparent caret-zinc-800 dark:caret-zinc-200"
      />

      {/* Styled, highlighted code mirror */}
      <pre ref={preRef} className="code-block absolute inset-0 w-full h-full pointer-events-none">
        <code ref={codeRef} className="language-javascript" />
      </pre>
    </div>
  );
};
