import React from 'react';
import { TbTerminal, TbBrandReact, TbFolder, TbExternalLink, TbClock } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';

interface ProjectsListViewProps {
  onOpenProject: (projectId: string) => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({ onOpenProject }) => {
  const { projects } = portfolioData;

  const getProjectIcon = (filename: string) => {
    if (filename.endsWith('.tsx')) {
      return <TbBrandReact className="text-cyan-500" size={24} />;
    }
    if (filename.endsWith('.ts')) {
      return <TbTerminal className="text-emerald-500" size={24} />;
    }
    return <TbFolder className="text-zinc-400" size={24} />;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left font-sans select-text">
      <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-4">
        {"// Projects overview directory"}
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
          <TbFolder className="text-violet-600 dark:text-violet-400" size={28} />
          projects/
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Click any project file below or in the sidebar to open its detailed case study.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const isComingSoon = project.status === 'coming-soon';

          return (
            <div
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 bg-zinc-50/20 dark:bg-zinc-900/10 hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-sm cursor-pointer transition-all group"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  {getProjectIcon(project.filename)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {project.filename}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="font-semibold text-zinc-950 dark:text-zinc-100 text-base leading-tight truncate">
                      {project.title}
                    </h3>
                    {isComingSoon && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 shrink-0">
                        <TbClock size={10} />
                        coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.tagline}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer: Source link or Coming Soon state */}
              {isComingSoon ? (
                <div className="flex items-center justify-between text-xs font-mono border-t border-zinc-200 dark:border-zinc-800 pt-4 text-zinc-400 dark:text-zinc-600">
                  <span>Source not yet available</span>
                </div>
              ) : (
                
                  <a href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-between text-xs font-mono border-t border-zinc-200 dark:border-zinc-800 pt-4 text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>View Source</span>
                  <TbExternalLink size={14} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};