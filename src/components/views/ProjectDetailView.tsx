import React from 'react';
import { TbBrandGithub, TbExternalLink, TbBrandReact, TbServer, TbClock, TbAlertCircle } from 'react-icons/tb';
import type { Project } from '../../data/portfolio';

interface ProjectDetailViewProps {
  project: Project;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {

  // Progresso — Kanban board mockup
  const renderProgressoMockup = () => (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-sans text-xs overflow-hidden shadow-md">
      {/* Browser Chrome */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[10px]">progresso.app/dashboard/sprint-3</span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">In Progress</span>
      </div>

      {/* Kanban Board */}
      <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/30 select-none">
        {/* Sprint header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs">Sprint 3 — Team Alpha</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[10px]">5 of 8 tasks done</span>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-2">
          {/* TODO */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Todo</span>
            </div>
            <div className="space-y-1.5">
              {[
                { task: 'Add export to CSV', user: 'GR', color: 'border-zinc-300 dark:border-zinc-700' },
                { task: 'Email digest cron job', user: 'JD', color: 'border-zinc-300 dark:border-zinc-700' },
              ].map((t, i) => (
                <div key={i} className={`p-2 rounded border ${t.color} bg-white dark:bg-zinc-900 shadow-sm`}>
                  <div className="text-zinc-700 dark:text-zinc-300 text-[10px] leading-snug mb-1">{t.task}</div>
                  <div className="flex justify-end">
                    <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-[8px] flex items-center justify-center">{t.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">In Progress</span>
            </div>
            <div className="space-y-1.5">
              {[
                { task: 'Comment thread UI', user: 'GR', color: 'border-amber-300 dark:border-amber-800/60' },
              ].map((t, i) => (
                <div key={i} className={`p-2 rounded border-l-2 border ${t.color} bg-white dark:bg-zinc-900 shadow-sm`}>
                  <div className="text-zinc-700 dark:text-zinc-300 text-[10px] leading-snug mb-1">{t.task}</div>
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1 mr-2">
                      <div className="bg-amber-400 h-1 rounded-full" style={{ width: '60%' }} />
                    </div>
                    <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold text-[8px] flex items-center justify-center shrink-0">{t.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DONE */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Done</span>
            </div>
            <div className="space-y-1.5">
              {[
                { task: 'JWT auth + refresh', user: 'GR' },
                { task: 'Task assignment API', user: 'JD' },
                { task: 'Dashboard chart', user: 'AL' },
              ].map((t, i) => (
                <div key={i} className="p-2 rounded border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/10 shadow-sm">
                  <div className="text-zinc-500 dark:text-zinc-500 text-[10px] leading-snug line-through mb-1">{t.task}</div>
                  <div className="flex justify-end">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold text-[8px] flex items-center justify-center">{t.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Stellars Dental — API audit log terminal mockup
  const renderDentalMockup = () => (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 font-mono text-xs overflow-hidden shadow-md">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <TbServer size={12} className="text-emerald-400" />
          <span className="text-zinc-400 text-[10px]">Stellars API — Audit Log Stream</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
      </div>

      {/* Endpoint list header row */}
      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-zinc-800 bg-zinc-900/60">
        <span className="text-zinc-600 text-[10px] font-semibold w-14">METHOD</span>
        <span className="text-zinc-600 text-[10px] font-semibold flex-1">ENDPOINT</span>
        <span className="text-zinc-600 text-[10px] font-semibold w-16 text-right">STATUS</span>
        <span className="text-zinc-600 text-[10px] font-semibold w-14 text-right">TIME</span>
      </div>

      {/* Audit log rows */}
      <div className="divide-y divide-zinc-800/50 select-none">
        {[
          { method: 'POST', endpoint: '/api/auth/login', status: 200, time: '12ms', actor: 'dr.santos@clinic', methodColor: 'text-emerald-400' },
          { method: 'POST', endpoint: '/api/appointments', status: 201, time: '38ms', actor: 'staff@clinic', methodColor: 'text-emerald-400' },
          { method: 'GET',  endpoint: '/api/patients/PX-0042/records', status: 200, time: '24ms', actor: 'dr.santos@clinic', methodColor: 'text-sky-400' },
          { method: 'POST', endpoint: '/api/patients/PX-0042/diagnosis', status: 201, time: '91ms', actor: 'dr.santos@clinic', methodColor: 'text-emerald-400' },
          { method: 'PUT',  endpoint: '/api/appointments/APT-118/status', status: 200, time: '19ms', actor: 'staff@clinic', methodColor: 'text-amber-400' },
          { method: 'DELETE', endpoint: '/api/staff/USR-009', status: 403, time: '5ms', actor: 'receptionist@clinic', methodColor: 'text-red-400' },
          { method: 'GET',  endpoint: '/api/audit-logs?limit=50', status: 200, time: '33ms', actor: 'admin@clinic', methodColor: 'text-sky-400' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-900/40 transition-colors">
            <span className={`w-14 font-bold text-[10px] ${row.methodColor}`}>{row.method}</span>
            <span className="flex-1 text-zinc-300 text-[10px] truncate">{row.endpoint}</span>
            <span className={`w-16 text-right text-[10px] font-semibold ${row.status >= 400 ? 'text-red-400' : row.status >= 201 ? 'text-emerald-400' : 'text-sky-400'}`}>
              {row.status}
            </span>
            <span className="w-14 text-right text-zinc-500 text-[10px]">{row.time}</span>
          </div>
        ))}
      </div>

      {/* Footer status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900 border-t border-zinc-800">
        <div className="flex items-center gap-1.5">
          <TbAlertCircle size={10} className="text-red-400" />
          <span className="text-red-400 text-[10px]">1 forbidden action blocked (role: receptionist)</span>
        </div>
        <div className="flex items-center gap-1">
          <TbClock size={10} className="text-zinc-500" />
          <span className="text-zinc-500 text-[10px] animate-pulse">live</span>
        </div>
      </div>
    </div>
  );

  const renderVisualMockup = () => {
    if (project.id === 'project-one') return renderProgressoMockup();
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
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
          {isBackend ? (
            <TbServer className="text-emerald-500" size={26} />
          ) : (
            <TbBrandReact className="text-cyan-500" size={26} />
          )}
          {project.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Visual Interactive Mockup */}
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
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-violet-500 dark:hover:border-violet-500 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 transition-colors font-mono"
        >
          <TbBrandGithub size={18} />
          <span>Source Code</span>
        </a>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-violet-600 dark:border-violet-500 text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 rounded-lg text-sm font-semibold transition-colors font-mono"
        >
          <TbExternalLink size={18} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
};
