import React from 'react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbSun, TbMoon, TbSearch } from 'react-icons/tb';
import type { Theme } from '../hooks/useTheme';

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
  onOpenPalette: () => void;
}

// Detect macOS so we can show ⌘P instead of Ctrl+P
const isMac = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac/.test(navigator.userAgent);
};

export const TopBar: React.FC<TopBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  theme,
  toggleTheme,
  onOpenPalette,
}) => {
  const shortcut = isMac() ? '⌘P' : 'Ctrl+P';

  return (
    <header className="h-12 w-full flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 select-none shrink-0">
      {/* Left section: Sidebar toggle + Workspace title */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/60 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            aria-label={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {sidebarOpen ? <TbLayoutSidebarLeftCollapse size={18} /> : <TbLayoutSidebarLeftExpand size={18} />}
          </button>
        </div>
        <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate">
          portfolio — gabriel rayat
        </span>
      </div>

      {/* Center section: VS Code-style search pill */}
      <button
        onClick={onOpenPalette}
        className="group hidden md:flex items-center gap-2 px-3 h-8 min-w-[220px] max-w-[320px] rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:border-violet-400 dark:hover:border-violet-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        title="Search files"
        aria-label="Search files"
      >
        <TbSearch size={15} className="flex-shrink-0" />
        <span className="text-xs truncate">🔍 Search files... ({shortcut})</span>
      </button>

      {/* Right section: Theme toggle */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/60 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <TbSun size={18} /> : <TbMoon size={18} />}
        </button>
      </div>
    </header>
  );
};
