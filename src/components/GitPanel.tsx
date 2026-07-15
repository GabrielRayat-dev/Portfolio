import React, { useState } from 'react';
import { TbGitBranch, TbGitCommit, TbPlus, TbMinus, TbChevronRight, TbChevronDown, TbFile, TbCheck, TbX, TbClock, TbUser } from 'react-icons/tb';
import { motion, AnimatePresence } from 'framer-motion';

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
  files: string[];
  staged?: boolean;
}

interface GitPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleFileExplorer: () => void;
}

const MOCK_COMMITS: GitCommit[] = [
  {
    hash: 'a1b2c3d',
    message: 'feat: Add real-time typing animation for code files',
    author: 'Gabriel Rayat',
    date: '2024-01-15',
    files: ['src/components/EditorPane.tsx', 'src/hooks/useTypingEffect.ts'],
    staged: false,
  },
  {
    hash: 'e4f5g6h',
    message: 'fix: Resolve sidebar toggle on mobile breakpoint',
    author: 'Gabriel Rayat',
    date: '2024-01-14',
    files: ['src/components/Sidebar.tsx', 'src/App.tsx'],
    staged: false,
  },
  {
    hash: 'i7j8k9l',
    message: 'chore: Update dependencies and Tailwind config',
    author: 'Gabriel Rayat',
    date: '2024-01-13',
    files: ['package.json', 'tailwind.config.js', 'vite.config.ts'],
    staged: false,
  },
  {
    hash: 'm0n1o2p',
    message: 'feat: Implement VS Code-style command palette (Ctrl+P)',
    author: 'Gabriel Rayat',
    date: '2024-01-12',
    files: ['src/components/CommandPalette.tsx', 'src/App.tsx'],
    staged: false,
  },
  {
    hash: 'q3r4s5t',
    message: 'Initial commit - Portfolio v3 structure',
    author: 'Gabriel Rayat',
    date: '2024-01-10',
    files: ['src/', 'public/', 'index.html', 'package.json'],
    staged: false,
  },
];

const STAGED_CHANGES: GitCommit[] = [
  {
    hash: '',
    message: 'work in progress: Add breadcrumb navigation highlight',
    author: 'You',
    date: 'Just now',
    files: ['src/components/Breadcrumbs.tsx', 'src/hooks/useScrollSpy.ts'],
    staged: true,
  },
  {
    hash: '',
    message: 'work in progress: Dark mode theme refinements',
    author: 'You',
    date: 'Just now',
    files: ['src/index.css', 'src/components/TopBar.tsx'],
    staged: true,
  },
];

export const GitPanel: React.FC<GitPanelProps> = ({
  isOpen,
  onClose,
  onToggleFileExplorer,
}) => {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [showStaged, setShowStaged] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    if (dateStr === 'Just now') return 'Just now';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <aside className="flex flex-col w-64 h-full border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFileExplorer}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Back to Explorer"
            title="Back to Explorer"
          >
            <TbChevronRight size={18} className="text-zinc-500 dark:text-zinc-400" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <TbGitBranch size={16} className="text-violet-600 dark:text-violet-400" />
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Source Control</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close Source Control"
        >
          <TbX size={16} className="text-zinc-500 dark:text-zinc-400" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-3 py-2 flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <button
          onClick={() => setShowStaged(!showStaged)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            showStaged
              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          <TbPlus size={12} />
          <span>Staged ({STAGED_CHANGES.length})</span>
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            showHistory
              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          <TbGitCommit size={12} />
          <span>History ({MOCK_COMMITS.length})</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Staged Changes */}
        <AnimatePresence>
          {showStaged && STAGED_CHANGES.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <TbPlus size={12} className="text-green-500" />
                Staged Changes
                <span className="ml-auto px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-[10px]">
                  {STAGED_CHANGES.length}
                </span>
              </div>
              <div className="space-y-1">
                {STAGED_CHANGES.map((commit, index) => (
                  <StagedChangeItem
                    key={index}
                    commit={commit}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Commit History */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <TbGitCommit size={12} className="text-violet-600 dark:text-violet-400" />
                Commit History
                <span className="ml-auto px-1.5 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded text-[10px]">
                  {MOCK_COMMITS.length}
                </span>
              </div>
              <div className="space-y-1">
                {MOCK_COMMITS.map((commit, index) => (
                  <CommitItem
                    key={commit.hash}
                    commit={commit}
                    index={index}
                    isExpanded={expandedCommit === commit.hash}
                    onToggle={() => setExpandedCommit(expandedCommit === commit.hash ? null : commit.hash)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!showStaged && !showHistory && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-500">
            <TbGitBranch size={48} className="mb-4 opacity-50" />
            <p className="text-sm text-center px-4">Select "Staged" or "History" to view changes</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-2">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
          <TbCheck size={14} />
          Commit Staged Changes
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg transition-colors">
          <TbClock size={14} />
          View All History
        </button>
      </div>
    </aside>
  );
};

// Staged Change Item Component
interface StagedChangeItemProps {
  commit: GitCommit;
  index: number;
}

const StagedChangeItem: React.FC<StagedChangeItemProps> = ({ commit, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
      >
        <TbChevronRight
          size={14}
          className={`text-zinc-400 dark:text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
        <TbFile size={16} className="text-green-500 flex-shrink-0" />
        <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100 truncate flex-1">
          {commit.files.join(', ')}
        </span>
        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-[10px] font-medium">
          Staged
        </span>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2"
          >
            <div className="ml-6 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">{commit.message}</p>
              <div className="flex items-center gap-2 ml-6">
                <TbUser size={10} />
                <span>{commit.author}</span>
                <span>·</span>
                <TbClock size={10} />
                <span>{commit.date}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Commit Item Component
interface CommitItemProps {
  commit: GitCommit;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const CommitItem: React.FC<CommitItemProps> = ({ commit, isExpanded, onToggle }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
      >
        <TbChevronRight
          size={14}
          className={`text-zinc-400 dark:text-zinc-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
          <TbGitCommit size={14} className="text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">{commit.message}</p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            <span className="font-mono">{commit.hash}</span>
            <span>·</span>
            <TbUser size={10} />
            <span>{commit.author}</span>
            <span>·</span>
            <TbClock size={10} />
            <span>{commit.date}</span>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
          >
            <div className="px-3 py-3 space-y-2">
              <div className="ml-10 space-y-1">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Files changed</p>
                <ul className="space-y-0.5">
                  {commit.files.map((file, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <TbFile size={12} className="text-zinc-400" />
                      <span className="font-mono">{file}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-10 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <TbUser size={10} />
                <span>{commit.author}</span>
                <span className="mx-1">·</span>
                <TbClock size={10} />
                <span>{commit.date}</span>
                <span className="mx-1">·</span>
                <code className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{commit.hash}</code>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};