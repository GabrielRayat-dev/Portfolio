import React from 'react';
import { TbGitCommit } from 'react-icons/tb';
import type { GitCommit } from '../../data/gitHistory';

interface GitHistoryViewProps {
  commits: GitCommit[];
}

export const GitHistoryView: React.FC<GitHistoryViewProps> = ({ commits }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-8 font-mono text-sm">
      {/* Command line */}
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-5">
        <span className="text-violet-600 dark:text-violet-400 select-none">$</span>
        <span>git log --graph --oneline --decorate</span>
      </div>

      {/* Commit tree */}
      <div className="space-y-0.5">
        {commits.map((node, idx) => {
          const isLast = idx === commits.length - 1;
          const isHead = idx === 0;
          const connector = isLast ? '└─' : '├─';
          const spine = isLast ? '  ' : '│ ';
          return (
            <div key={node.fullHash} className="group">
              <div className="flex items-start gap-2 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 rounded px-1 -mx-1 transition-colors">
                <span className="text-zinc-400 dark:text-zinc-600 select-none shrink-0 w-[2.5rem] text-right">
                  {connector}
                </span>
                <span className="text-violet-600 dark:text-violet-400 shrink-0">
                  <TbGitCommit size={14} className="mt-0.5" />
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                  {node.hash}
                </span>
                <span className="text-zinc-800 dark:text-zinc-200 flex-1 min-w-0">
                  {node.message}
                </span>
                {isHead && (
                  <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-sans font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                    HEAD -&gt; main
                  </span>
                )}
              </div>
              {/* Author / date sub-line */}
              <div className="flex items-center gap-2 pl-[4.9rem] text-[11px] text-zinc-400 dark:text-zinc-500">
                <span>{node.author}</span>
                <span className="text-zinc-300 dark:text-zinc-600">•</span>
                <span>{node.date}</span>
              </div>
              {/* Spine continuation for non-last rows */}
              {!isLast && (
                <div className="text-zinc-400 dark:text-zinc-600 select-none pl-[0.6rem]">
                  {spine}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Blinking cursor */}
      <div className="flex items-center gap-2 mt-5 text-zinc-500 dark:text-zinc-400">
        <span className="text-violet-600 dark:text-violet-400 select-none">$</span>
        <span className="inline-block w-2 h-4 bg-zinc-500 dark:bg-zinc-400 animate-pulse" />
      </div>
    </div>
  );
};
