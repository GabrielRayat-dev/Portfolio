import React from 'react';
import { TbTerminal2, TbGitCommit } from 'react-icons/tb';

interface GitHistoryNode {
  hash: string;
  message: string;
  author: string;
  date: string;
  branch?: string;
}

// Mock git commit history tree (terminal `git log --graph --oneline` style)
const GIT_HISTORY: GitHistoryNode[] = [
  { hash: 'a1b2c3d', message: 'feat: Add real-time typing animation for code files', author: 'Gabriel Rayat', date: '2024-01-15', branch: 'HEAD -> main' },
  { hash: 'e4f5g6h', message: 'fix: Resolve sidebar toggle on mobile breakpoint', author: 'Gabriel Rayat', date: '2024-01-14' },
  { hash: 'i7j8k9l', message: 'chore: Update dependencies and Tailwind config', author: 'Gabriel Rayat', date: '2024-01-13' },
  { hash: 'm0n1o2p', message: 'feat: Implement VS Code-style command palette (Ctrl+P)', author: 'Gabriel Rayat', date: '2024-01-12' },
  { hash: 'q3r4s5t', message: 'Initial commit - Portfolio v3 structure', author: 'Gabriel Rayat', date: '2024-01-10' },
];

export const GitHistoryView: React.FC = () => {
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
            {GIT_HISTORY.map((node, idx) => {
              const isLast = idx === GIT_HISTORY.length - 1;
              // Build ASCII graph line: ● for node, │ connector down, ├─/└─ branch
              const connector = isLast ? '└─' : '├─';
              const spine = isLast ? '  ' : '│ ';
              return (
                <div key={node.hash} className="group">
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
                    {node.branch && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-sans font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                        {node.branch}
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
        Showing {GIT_HISTORY.length} commits • Generated from local repository history
      </p>
    </div>
  );
};
