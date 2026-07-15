import React from 'react';
import {
  TbChevronDown, TbChevronRight, TbFolder, TbFolderOpen,
  TbMarkdown, TbFileDescription, TbBraces, TbFile,
  TbTerminal, TbBrandReact, TbGitBranch
} from 'react-icons/tb';

interface SidebarProps {
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
  projectsExpanded: boolean;
  setProjectsExpanded: (expanded: boolean) => void;
  sidebarOpen: boolean;
  onOpenSourceControl: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTabId,
  onTabSelect,
  projectsExpanded,
  setProjectsExpanded,
  sidebarOpen,
  onOpenSourceControl,
}) => {
  if (!sidebarOpen) return null;

  const fileItems = [
    { id: 'about.md', label: 'about.md', icon: <TbMarkdown size={16} className="text-sky-500" /> },
    { id: 'experience.log', label: 'experience.log', icon: <TbFileDescription size={16} className="text-amber-500" /> },
    {
      id: 'projects',
      label: 'projects',
      isFolder: true,
      children: [
        { id: 'project-one', label: 'progresso.tsx', icon: <TbBrandReact size={16} className="text-cyan-500" /> },
        { id: 'project-two', label: 'stellars-dental.ts', icon: <TbTerminal size={16} className="text-emerald-500" /> },
      ]
    },
    { id: 'skills.json', label: 'skills.json', icon: <TbBraces size={16} className="text-yellow-500" /> },
    { id: 'contact.txt', label: 'contact.txt', icon: <TbFile size={16} className="text-zinc-400" /> },
  ];

  return (
    <aside className="hidden md:flex w-64 h-full border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/70 select-none flex-col shrink-0">
      {/* Sidebar Header with Source Control toggle */}
      <div className="flex items-center justify-between px-4 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase border-b border-zinc-200 dark:border-zinc-800">
        <span>Explorer</span>
        <button
          onClick={onOpenSourceControl}
          className="p-1 rounded text-zinc-400 dark:text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          title="Open Source Control"
          aria-label="Open Source Control"
        >
          <TbGitBranch size={16} />
        </button>
      </div>

      {/* Explorer Accordion */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="flex items-center px-2 py-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase font-mono tracking-wide">
          <TbChevronDown size={14} className="mr-1" />
          portfolio — gabriel
        </div>

        {/* Tree Root */}
        <div className="mt-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-[2px]">
          {fileItems.map((item) => {
            if (item.isFolder) {
              return (
                <div key={item.id} className="space-y-[2px]">
                  {/* Folder Item */}
                  <div
                    onClick={() => {
                      setProjectsExpanded(!projectsExpanded);
                      onTabSelect('projects'); // Clicking the projects folder also opens the card overview
                    }}
                    className={`flex items-center px-4 py-1.5 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors ${
                      activeTabId === 'projects' ? 'bg-zinc-200 dark:bg-zinc-800/70 text-violet-600 dark:text-violet-400 font-semibold' : ''
                    }`}
                  >
                    <span className="mr-1">
                      {projectsExpanded ? <TbChevronDown size={14} /> : <TbChevronRight size={14} />}
                    </span>
                    <span className="mr-2">
                      {projectsExpanded ? (
                        <TbFolderOpen size={16} className="text-violet-600 dark:text-violet-400" />
                      ) : (
                        <TbFolder size={16} className="text-violet-600 dark:text-violet-400" />
                      )}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {/* Folder Children (Expandable) */}
                  {projectsExpanded && (
                    <div className="pl-6 space-y-[2px] border-l border-zinc-200/60 dark:border-zinc-800/60 ml-6">
                      {item.children?.map((child) => (
                        <div
                          key={child.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTabSelect(child.id);
                          }}
                          className={`flex items-center px-4 py-1.5 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors rounded-sm ${
                            activeTabId === child.id ? 'bg-zinc-200 dark:bg-zinc-800/70 text-violet-600 dark:text-violet-400 font-semibold' : ''
                          }`}
                        >
                          <span className="mr-2">{child.icon}</span>
                          <span>{child.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Normal File Item
            return (
              <div
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                className={`flex items-center px-6 py-1.5 cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors ${
                  activeTabId === item.id ? 'bg-zinc-200 dark:bg-zinc-800/70 text-violet-600 dark:text-violet-400 font-semibold' : ''
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
