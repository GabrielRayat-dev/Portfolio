import React, { useState } from 'react';
import { TbGitBranch, TbGitCommit, TbPlus, TbChevronRight, TbFile, TbCheck, TbX, TbClock, TbUser, TbCopy } from 'react-icons/tb';
import { motion, AnimatePresence } from 'framer-motion';
import type { GitCommit } from '../data/gitHistory';

interface GitPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleFileExplorer: () => void;
  onViewHistory: () => void;
  commits: GitCommit[];
  stagedChanges: GitCommit[];
  hasCommitted: boolean;
  onCommitStaged: () => void;
  /** Hide the built-in header when embedded (e.g. inside the mobile drawer) */
  showHeader?: boolean;
}

export const GitPanel: React.FC<GitPanelProps> = ({
  isOpen,
  onClose,
  onToggleFileExplorer,
  onViewHistory,
  commits,
  stagedChanges,
  hasCommitted,
  onCommitStaged,
  showHeader = true,
}) => {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [showStaged, setShowStaged] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  if (!isOpen) return null;

  return (
    <aside className={`flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 ${
      showHeader ? 'w-64 border-r border-zinc-200 dark:border-zinc-800' : 'w-full'
    } animate-slide-in`}>
      {/* Header */}
      {showHeader && (
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
      )}

      {/* Toolbar */}
      <div className="px-3 py-2 flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <button
          onClick={() => setShowStaged(!showStaged)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            showStaged
              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          <TbPlus size={12} />
          <span>Staged ({stagedChanges.length})</span>
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            showHistory
              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          <TbGitCommit size={12} />
          <span>History ({commits.length})</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Staged Changes */}
        <AnimatePresence initial={false}>
          {showStaged && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <TbPlus size={12} className="text-green-500" />
                Staged Changes
                <span className="ml-auto px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-[10px]">
                  {stagedChanges.length}
                </span>
              </div>

              {/* Items animate out individually via AnimatePresence */}
              <div className="space-y-1 mt-1">
                <AnimatePresence initial={false}>
                  {stagedChanges.map((commit, index) => (
                    <StagedChangeItem
                      key={`${commit.message}-${index}`}
                      commit={commit}
                    />
                  ))}
                </AnimatePresence>

                {stagedChanges.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-2 py-3 text-xs text-zinc-400 dark:text-zinc-500 italic"
                  >
                    Nothing staged
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Commit History */}
        <AnimatePresence initial={false}>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <TbGitCommit size={12} className="text-violet-600 dark:text-violet-400" />
                Commit History
                <span className="ml-auto px-1.5 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded text-[10px]">
                  {commits.length}
                </span>
              </div>
              <div className="space-y-1 mt-1">
                <AnimatePresence initial={false}>
                  {commits.map((commit) => (
                    <CommitItem
                      key={commit.fullHash}
                      commit={commit}
                      isExpanded={expandedCommit === commit.fullHash}
                      onToggle={() => setExpandedCommit(expandedCommit === commit.fullHash ? null : commit.fullHash)}
                    />
                  ))}
                </AnimatePresence>
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
        <button
          onClick={onCommitStaged}
          disabled={hasCommitted}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasCommitted
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
              : 'bg-violet-600 hover:bg-violet-700 text-white'
          }`}
        >
          <TbCheck size={14} />
          {hasCommitted ? 'Working tree clean' : 'Commit Staged Changes'}
        </button>
        <button
          onClick={onViewHistory}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg transition-colors"
        >
          <TbClock size={14} />
          View All History
        </button>
      </div>
    </aside>
  );
};

// Staged Change Item Component — animates out on commit
interface StagedChangeItemProps {
  commit: GitCommit;
}

const StagedChangeItem: React.FC<StagedChangeItemProps> = ({ commit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24, height: 0, marginTop: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
      >
        <TbChevronRight
          size={14}
          className={`text-zinc-400 dark:text-zinc-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
        />
        <TbFile size={16} className="text-green-500 flex-shrink-0" />
        <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100 truncate flex-1">
          {commit.files.join(', ')}
        </span>
        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-[10px] font-medium flex-shrink-0">
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
    </motion.div>
  );
};

// Commit Item Component
interface CommitItemProps {
  commit: GitCommit;
  isExpanded: boolean;
  onToggle: () => void;
}

const CommitItem: React.FC<CommitItemProps> = ({ commit, isExpanded, onToggle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyHash = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(commit.fullHash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <TbChevronRight
          size={14}
          className={`text-zinc-400 dark:text-zinc-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
        />
        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
          <TbGitCommit size={14} className="text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm text-zinc-900 dark:text-zinc-100 ${isExpanded ? 'whitespace-normal break-words' : 'truncate'}`}>
            {commit.message}
          </p>
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
            <div className="px-3 py-3 space-y-3">
              {/* Full message */}
              <div className="ml-10">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Commit message
                </p>
                <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-normal break-words leading-relaxed">
                  {commit.message}
                </p>
              </div>

              {/* Full SHA — clickable to copy */}
              <div className="ml-10">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Commit hash
                </p>
                <button
                  onClick={handleCopyHash}
                  title="Click to copy full hash"
                  className="group flex items-center gap-2 w-full text-left font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded px-2 py-1.5 transition-colors"
                >
                  <span className="truncate flex-1">{commit.fullHash}</span>
                  {copied ? (
                    <TbCheck size={13} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <TbCopy size={13} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 flex-shrink-0" />
                  )}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Date & Time */}
              <div className="ml-10 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <TbUser size={11} />
                <span>{commit.author}</span>
                <span className="mx-1">·</span>
                <TbClock size={11} />
                <span>{commit.date} at {commit.time}</span>
              </div>

              {/* Files changed */}
              <div className="ml-10">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Files changed ({commit.files.length})
                </p>
                <ul className="space-y-0.5">
                  {commit.files.map((file, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-mono"
                    >
                      <TbFile size={12} className="text-zinc-400 flex-shrink-0" />
                      <span className="break-all">{file}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
