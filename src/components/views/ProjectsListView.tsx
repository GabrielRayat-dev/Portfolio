import React from 'react';
import { TbTerminal, TbBrandReact, TbFolder, TbExternalLink } from 'react-icons/tb';
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
        {projects.map((project) => (
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
              <div className="min-w-0">
                <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {project.filename}
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-zinc-100 text-base leading-tight mt-0.5 truncate">
                  {project.title}
                </h3>
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

            {/* Open Detail Button */}
            <div className="flex items-center justify-between text-xs font-mono border-t border-zinc-200 dark:border-zinc-800 pt-4 text-zinc-500 dark:text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              <span>View Case Study</span>
              <TbExternalLink size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
