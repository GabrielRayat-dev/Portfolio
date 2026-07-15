import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TbSearch, TbX, TbFile, TbFolder, TbMarkdown, TbFileDescription, TbBraces, TbTerminal, TbBrandReact } from 'react-icons/tb';

interface FileItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  group: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (fileId: string) => void;
}

const FILE_ITEMS: FileItem[] = [
  { id: 'about.md', label: 'about.md', icon: <TbMarkdown size={16} className="text-sky-500" />, group: 'Files' },
  { id: 'experience.log', label: 'experience.log', icon: <TbFileDescription size={16} className="text-amber-500" />, group: 'Files' },
  { id: 'projects', label: 'projects', icon: <TbFolder size={16} className="text-violet-600 dark:text-violet-400" />, group: 'Folders' },
  { id: 'project-one', label: 'progresso.tsx', icon: <TbBrandReact size={16} className="text-cyan-500" />, group: 'Files' },
  { id: 'project-two', label: 'stellars-dental.ts', icon: <TbTerminal size={16} className="text-emerald-500" />, group: 'Files' },
  { id: 'skills.json', label: 'skills.json', icon: <TbBraces size={16} className="text-yellow-500" />, group: 'Files' },
  { id: 'contact.txt', label: 'contact.txt', icon: <TbFile size={16} className="text-zinc-400" />, group: 'Files' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectFile,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredItems = FILE_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, FileItem[]>);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          onSelectFile(filteredItems[selectedIndex].id);
          onClose();
        }
        break;
      default:
        break;
    }
  }, [filteredItems, selectedIndex, onClose, onSelectFile]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && filteredItems[selectedIndex]) {
      const item = listRef.current.querySelector('[data-selected="true"]');
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, filteredItems]);

  // Handle global keydown for closing
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleGlobalKeyDown);
    }
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Go to File"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 relative">
          <div className="relative">
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type file name to search..."
              className="w-full pl-10 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                aria-label="Clear search"
              >
                <TbX size={18} />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded">⌘P</kbd>
            <span>Go to File</span>
            <span className="mx-1">·</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded">↑↓</kbd>
            <span>Navigate</span>
            <span className="mx-1">·</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded">Enter</kbd>
            <span>Open</span>
            <span className="mx-1">·</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded">Esc</kbd>
            <span>Close</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          <ul ref={listRef} className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {Object.entries(groupedItems).map(([group, items]) => (
              <li key={group}>
                <div className="px-4 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
                  {group}
                </div>
                {items.map((item) => {
                  const globalIndex = filteredItems.indexOf(item);
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      data-selected={isSelected}
                      onClick={() => {
                        onSelectFile(item.id);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="font-mono text-sm truncate">{item.label}</span>
                      {isSelected && (
                        <span className="ml-auto text-xs text-violet-500 dark:text-violet-400">→</span>
                      )}
                    </li>
                  );
                })}
              </li>
            ))}
            {filteredItems.length === 0 && query && (
              <li className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                No files matching "{query}"
              </li>
            )}
            {filteredItems.length === 0 && !query && (
              <li className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                Start typing to search files...
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};