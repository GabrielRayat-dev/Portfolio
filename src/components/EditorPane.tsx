import React from 'react';
import {
  TbX, TbMarkdown, TbFileDescription, TbBraces,
  TbFile, TbTerminal, TbBrandReact, TbFolder, TbCode
} from 'react-icons/tb';
import { AboutView } from './views/AboutView';
import { ExperienceView } from './views/ExperienceView';
import { ProjectsListView } from './views/ProjectsListView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { SkillsView } from './views/SkillsView';
import { ContactView } from './views/ContactView';
import { GitHistoryView } from './views/GitHistoryView';
import type { GitCommit } from '../data/gitHistory';
import { portfolioData } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorPaneProps {
  openTabs: string[];
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  gitCommits: GitCommit[];
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  openTabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  gitCommits,
}) => {
  const getTabMetadata = (tabId: string) => {
    switch (tabId) {
      case 'about.md':
        return { label: 'about.md', icon: <TbMarkdown size={14} className="text-sky-500" /> };
      case 'experience.log':
        return { label: 'experience.log', icon: <TbFileDescription size={14} className="text-amber-500" /> };
      case 'projects':
        return { label: 'projects', icon: <TbFolder size={14} className="text-violet-600 dark:text-violet-400" /> };
      case 'project-one':
        return { label: 'progresso.tsx', icon: <TbBrandReact size={14} className="text-cyan-500" /> };
      case 'project-two':
        return { label: 'stellars-dental.ts', icon: <TbTerminal size={14} className="text-emerald-500" /> };
      case 'skills.json':
        return { label: 'skills.json', icon: <TbBraces size={14} className="text-yellow-500" /> };
      case 'contact.txt':
        return { label: 'contact.txt', icon: <TbFile size={14} className="text-zinc-400" /> };
      case 'git-history.log':
        return { label: 'git-history.log', icon: <TbFileDescription size={14} className="text-violet-500" /> };
      default:
        return { label: 'file', icon: <TbFile size={14} /> };
    }
  };

  const renderActiveView = () => {
    switch (activeTabId) {
      case 'about.md':
        return <AboutView />;
      case 'experience.log':
        return <ExperienceView />;
      case 'projects':
        return <ProjectsListView onOpenProject={onTabSelect} />;
      case 'project-one':
        return <ProjectDetailView project={portfolioData.projects[0]} />;
      case 'project-two':
        return <ProjectDetailView project={portfolioData.projects[1]} />;
      case 'skills.json':
        return <SkillsView />;
      case 'contact.txt':
        return <ContactView />;
      case 'git-history.log':
        return <GitHistoryView commits={gitCommits} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Tabs Header */}
      {openTabs.length > 0 && (
        <div className="hidden md:flex h-9 w-full items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto select-none shrink-0 no-scrollbar">
          {openTabs.map((tabId) => {
            const meta = getTabMetadata(tabId);
            const isActive = activeTabId === tabId;

            return (
              <div
                key={tabId}
                onClick={() => onTabSelect(tabId)}
                className={`h-full flex items-center gap-2 px-4 border-r border-zinc-200 dark:border-zinc-800 text-xs font-mono cursor-pointer transition-colors relative group shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-semibold'
                    : 'text-zinc-500 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-950/40 hover:text-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                {/* Active Tab Accent Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-violet-600 dark:bg-violet-500" />
                )}

                {/* Tab Icon */}
                <span>{meta.icon}</span>

                {/* Tab Label */}
                <span>{meta.label}</span>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tabId);
                  }}
                  className={`p-0.5 rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label={`Close ${meta.label}`}
                >
                  <TbX size={10} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <AnimatePresence mode="wait">
          {activeTabId ? (
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          ) : (
            /* Welcome Screen (VS Code No-Editor-Open style) */
            <div className="h-full flex flex-col items-center justify-center font-sans select-none text-center px-6 py-12">
              <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                <TbCode size={36} />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Gabriel Rayat Portfolio
              </h2>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-sm mb-8 leading-relaxed">
                Welcome to my IDE-styled workspace. Select a file from the explorer on the left or use the actions below to get started.
              </p>

              <div className="space-y-3 font-mono text-xs w-full max-w-xs">
                {[
                  { label: 'View Profile', file: 'about.md', hint: 'Click about.md' },
                  { label: 'View Experience', file: 'experience.log', hint: 'Click experience.log' },
                  { label: 'View Tech Stack', file: 'skills.json', hint: 'Click skills.json' },
                  { label: 'Get in Touch', file: 'contact.txt', hint: 'Click contact.txt' },
                ].map((action) => (
                  <button
                    key={action.file}
                    onClick={() => onTabSelect(action.file)}
                    className="w-full flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:border-violet-500/50 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all active:scale-98"
                  >
                    <span className="font-sans font-semibold text-zinc-700 dark:text-zinc-300">
                      {action.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded bg-white dark:bg-zinc-950 shadow-sm">
                      {action.file}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};