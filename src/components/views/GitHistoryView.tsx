import React from 'react';
import { TbTerminal2, TbGitCommit } from 'react-icons/tb';
import type { GitCommit } from '../../data/gitHistory';

interface GitHistoryViewProps {
  commits: GitCommit[];
}

export const GitHistoryView: React.FC<GitHistoryViewProps> = ({ commits }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 font-mono text-sm">
      {/* Terminal window */}
      <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-950">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex items-center gap-2 ml-3 text-zinc-500 dark:text-zinc-400 text-xs">
            <TbTerminal2 size={14} />
            <span>git — log</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {/* Command line */}
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <span className="text-violet-600 dark:text-violet-400 select-none">$</span>
            <span>git log --graph --oneline --decorate</span>
          </div>

          {/* Commit tree */}
          <div className="mt-4 space-y-0.5">
            {commits.map((node, idx) => {
              const isLast = idx === commits.length - 1;
              const isHead = idx === 0;
              // Build ASCII graph line: ● for node, │ connector down, ├─/└─ branch
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
                  {/* Author / date sub-line on hover */}
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
          <div className="flex items-center gap-2 mt-4 text-zinc-500 dark:text-zinc-400">
            <span className="text-violet-600 dark:text-violet-400 select-none">$</span>
            <span className="inline-block w-2 h-4 bg-zinc-500 dark:bg-zinc-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500 text-center font-sans">
        Showing {commits.length} commits • Synced with local repository history
      </p>
    </div>
  );
};
