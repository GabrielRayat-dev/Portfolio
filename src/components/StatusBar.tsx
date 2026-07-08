import React from 'react';
import { TbCheck, TbWifi } from 'react-icons/tb';

interface StatusBarProps {
  activeTabId: string | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeTabId }) => {
  const getLanguageMode = () => {
    if (!activeTabId) return 'Plain Text';
    if (activeTabId.endsWith('.md')) return 'Markdown';
    if (activeTabId.endsWith('.log')) return 'Log Stream';
    if (activeTabId.endsWith('.py')) return 'Python 3';
    if (activeTabId.endsWith('.tsx')) return 'TypeScript JSX';
    if (activeTabId.endsWith('.json')) return 'JSON';
    if (activeTabId.endsWith('.txt')) return 'Plain Text';
    if (activeTabId === 'projects') return 'Directory Overview';
    return 'Plain Text';
  };

  return (
    <footer className="hidden md:flex h-9 w-full items-center justify-between px-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono text-zinc-500 dark:text-zinc-400 select-none shrink-0 z-10">
      {/* Left section: Copyright */}
      <div className="flex items-center gap-1.5 truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          © 2026 Jan Gabriel Rayat
        </span>
      </div>

      {/* Right section: IDE details */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-1">
          <TbWifi size={14} className="text-emerald-500" />
          <span>connected</span>
        </div>
        <div className="hidden md:block">
          <span>Ln 1, Col 1</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
        <div>
          <span>{getLanguageMode()}</span>
        </div>
        <div className="flex items-center gap-1">
          <TbCheck size={14} className="text-emerald-500" />
          <span>Prettier</span>
        </div>
      </div>
    </footer>
  );
};
