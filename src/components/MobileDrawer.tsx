import React from 'react';
import { TbX, TbSearch } from 'react-icons/tb';
import { GitPanel } from './GitPanel';
import type { GitCommit } from '../data/gitHistory';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPalette: () => void;
  commits: GitCommit[];
  stagedChanges: GitCommit[];
  hasCommitted: boolean;
  onCommitStaged: () => void;
  onViewHistory: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenPalette,
  commits,
  stagedChanges,
  hasCommitted,
  onCommitStaged,
  onViewHistory,
}) => {
  return (
    <>
      {/* Backdrop — click to close */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel — slides in from the right */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Drawer top bar */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0">
          <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate">
            portfolio — gabriel rayat
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close menu"
          >
            <TbX size={18} />
          </button>
        </div>

        {/* Search Files input — opens Command Palette */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          <button
            onClick={onOpenPalette}
            className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:border-violet-400 dark:hover:border-violet-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors text-left"
            aria-label="Search files"
          >
            <TbSearch size={15} className="flex-shrink-0" />
            <span className="text-xs truncate">🔍 Search Files...</span>
          </button>
        </div>

        {/* Embedded Source Control panel */}
        <div className="flex-1 overflow-y-auto">
          <GitPanel
            isOpen
            showHeader={false}
            onClose={onClose}
            onToggleFileExplorer={onClose}
            onViewHistory={() => {
              onViewHistory();
              onClose();
            }}
            commits={commits}
            stagedChanges={stagedChanges}
            hasCommitted={hasCommitted}
            onCommitStaged={onCommitStaged}
          />
        </div>
      </aside>
    </>
  );
};
