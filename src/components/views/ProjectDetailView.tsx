import React from 'react';
import { TbBrandGithub, TbExternalLink, TbBrandReact, TbServer, TbClock, TbAlertCircle, TbClipboardList, TbCircleDashed } from 'react-icons/tb';
import type { Project } from '../../data/portfolio';

interface ProjectDetailViewProps {
  project: Project;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {

  const isComingSoon = project.status === 'coming-soon';

  // Planned features shown for projects still in planning (not yet built)
  const plannedFeatures = [
    'Project types — Thesis, School, Freelance, Personal',
    'Task statuses — Todo, In Progress, For Review, Done, Blocked',
    'Team member invitation by email with Accept or Decline',
    'Role-based access — Leader, Member, Viewer per project',
    'Activity log showing every action with timestamp',
    'Comment threads per task for team discussion',
    'Member progress tracking and analytics dashboard',
    'Notifications for task assignments and status changes',
    'Last updated timestamp on every task',
  ];

  // Stellars Dental — API audit log terminal mockup
  const renderDentalMockup = () => (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs overflow-hidden shadow-md">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <TbServer size={12} className="text-emerald-600 dark:text-emerald-400" />
          <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">Stellars API — my backend's audit log stream</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Endpoint list header row */}
      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60">
        <span className="text-zinc-500 dark:text-zinc-600 text-[10px] font-semibold w-14">METHOD</span>
        <span className="text-zinc-500 dark:text-zinc-600 text-[10px] font-semibold flex-1">ENDPOINT</span>
        <span className="text-zinc-500 dark:text-zinc-600 text-[10px] font-semibold w-16 text-right">STATUS</span>
        <span className="text-zinc-500 dark:text-zinc-600 text-[10px] font-semibold w-14 text-right">TIME</span>
      </div>

      {/* Audit log rows */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800/50 select-none">
        {[
          { method: 'POST', endpoint: '/api/auth/login', status: 200, time: '12ms', actor: 'dr.santos@clinic', methodColor: 'text-emerald-600 dark:text-emerald-400' },
          { method: 'POST', endpoint: '/api/appointments', status: 201, time: '38ms', actor: 'staff@clinic', methodColor: 'text-emerald-600 dark:text-emerald-400' },
          { method: 'GET',  endpoint: '/api/patients/PX-0042/records', status: 200, time: '24ms', actor: 'dr.santos@clinic', methodColor: 'text-sky-600 dark:text-sky-400' },
          { method: 'POST', endpoint: '/api/patients/PX-0042/diagnosis', status: 201, time: '91ms', actor: 'dr.santos@clinic', methodColor: 'text-emerald-600 dark:text-emerald-400' },
          { method: 'PUT',  endpoint: '/api/appointments/APT-118/status', status: 200, time: '19ms', actor: 'staff@clinic', methodColor: 'text-amber-600 dark:text-amber-400' },
          { method: 'DELETE', endpoint: '/api/staff/USR-009', status: 403, time: '5ms', actor: 'assistant@clinic', methodColor: 'text-red-600 dark:text-red-400' },
          { method: 'GET',  endpoint: '/api/audit-logs', status: 200, time: '33ms', actor: 'admin@clinic', methodColor: 'text-sky-600 dark:text-sky-400' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40 transition-colors">
            <span className={`w-14 font-bold text-[10px] ${row.methodColor}`}>{row.method}</span>
            <span className="flex-1 text-zinc-700 dark:text-zinc-300 text-[10px] truncate">{row.endpoint}</span>
            <span className={`w-16 text-right text-[10px] font-semibold ${row.status >= 400 ? 'text-red-600 dark:text-red-400' : row.status >= 201 ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>
              {row.status}
            </span>
            <span className="w-14 text-right text-zinc-400 dark:text-zinc-500 text-[10px]">{row.time}</span>
          </div>
        ))}
      </div>

      {/* Footer status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5">
          <TbAlertCircle size={10} className="text-red-600 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-400 text-[10px]">1 forbidden action blocked (role: assistant)</span>
        </div>
        <div className="flex items-center gap-1">
          <TbClock size={10} className="text-zinc-400 dark:text-zinc-500" />
          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] animate-pulse">live</span>
        </div>
      </div>
    </div>
  );

  // Planning-stage placeholder — replaces the fake mockup for unbuilt projects
  const renderPlanningPlaceholder = () => (
    <div className="w-full rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/20 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400">
        <TbCircleDashed size={18} />
        <span className="font-mono text-xs font-semibold uppercase tracking-wide">Planning stage — not yet built</span>
      </div>
      <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
        <TbClipboardList size={16} />
        <span className="font-mono text-xs">Planned features</span>
      </div>
      <ul className="space-y-2">
        {plannedFeatures.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 dark:text-zinc-600 mt-0.5 shrink-0">–</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderVisualMockup = () => {
    if (isComingSoon) return renderPlanningPlaceholder();
    if (project.id === 'project-two') return renderDentalMockup();
    return null;
  };

  const isBackend = project.id === 'project-two';

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left font-sans select-text">
      {/* File Tag */}
      <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-4">
        {`// case_study: ${project.filename}`}
      </div>

      {/* Header info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2 flex-wrap">
          {isBackend ? (
            <TbServer className="text-emerald-500" size={26} />
          ) : (
            <TbBrandReact className="text-cyan-500" size={26} />
          )}
          {project.title}
          {isComingSoon && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30">
              coming soon
            </span>
          )}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">
          {project.tagline}
        </p>
        {project.myRole && (
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-3 px-3 py-2 border-l-2 border-violet-500 bg-violet-50/50 dark:bg-violet-950/20 leading-relaxed">
            {project.myRole}
          </p>
        )}
      </div>

      {/* Visual Interactive Mockup / Planning Placeholder */}
      <div className="mb-8">
        {renderVisualMockup()}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-6" />

      {/* How it Works / The Problem */}
      <div className="mb-6">
        <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-3">
          {"// The Problem & Solution"}
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
          {project.problemSolution}
        </p>
      </div>

      {/* Tech Stack used */}
      <div className="mb-6">
        <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-3">
          {"// Technologies Used"}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        {isComingSoon ? (
          <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-400 dark:text-zinc-600 font-mono">
            <TbCircleDashed size={16} />
            <span>In planning — source and demo not yet available</span>
          </div>
        ) : (
          
            <a href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-violet-500 dark:hover:border-violet-500 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 transition-colors font-mono"
          >
            <TbBrandGithub size={18} />
            <span>Source Code</span>
          </a>
        )}
        {!isComingSoon && project.demoUrl && (
          
            <a href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-violet-600 dark:border-violet-500 text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 rounded-lg text-sm font-semibold transition-colors font-mono"
          >
            <TbExternalLink size={18} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};