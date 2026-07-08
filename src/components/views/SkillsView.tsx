import React from 'react';
import {
  SiHtml5, SiTailwindcss, SiVite, SiJavascript,
  SiPython, SiExpress, SiMysql,
  SiPostgresql, SiSupabase, SiAnthropic,
  SiGit, SiGithub, SiFigma
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbSparkles, TbCpu, TbRocket, TbCode, TbPalette } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';

export const SkillsView: React.FC = () => {
  const { skills } = portfolioData;

  const getTechIcon = (name: string) => {
    const size = 14;
    switch (name.toLowerCase()) {
      case 'html':
        return <SiHtml5 className="text-orange-500" size={size} />;
      case 'tailwind css':
        return <SiTailwindcss className="text-sky-400" size={size} />;
      case 'vite':
        return <SiVite className="text-purple-400" size={size} />;
      case 'javascript':
        return <SiJavascript className="text-yellow-400" size={size} />;
      case 'java':
        return <FaJava className="text-red-500" size={size} />;
      case 'python':
        return <SiPython className="text-blue-400" size={size} />;
      case 'express':
        return <SiExpress className="text-zinc-400 dark:text-zinc-200" size={size} />;
      case 'mysql':
        return <SiMysql className="text-blue-500" size={size} />;
      case 'postgresql':
        return <SiPostgresql className="text-blue-400" size={size} />;
      case 'supabase':
        return <SiSupabase className="text-emerald-400" size={size} />;
      case 'claude':
        return <SiAnthropic className="text-amber-700 dark:text-amber-500" size={size} />;
      case 'gemini':
        return <TbSparkles className="text-indigo-400" size={size} />;
      case 'codex':
        return <TbCpu className="text-emerald-500" size={size} />;
      case 'git':
        return <SiGit className="text-orange-500" size={size} />;
      case 'github':
        return <SiGithub className="text-zinc-800 dark:text-zinc-200" size={size} />;
      case 'canva':
        return <TbPalette className="text-sky-500" size={size} />;
      case 'antigravity':
        return <TbRocket className="text-pink-500" size={size} />;
      case 'figma':
        return <SiFigma className="text-red-400" size={size} />;
      case 'vs code':
        return <TbCode className="text-blue-500" size={size} />;
      default:
        return <TbCode className="text-zinc-400" size={size} />;
    }
  };

  // Helper to render a bracketed list of interactive string chips
  const renderArray = (arr: string[], isLast: boolean) => {
    return (
      <span>
        <span className="text-zinc-400 dark:text-zinc-600">[</span>
        <br />
        {arr.map((item, idx) => (
          <span key={item} className="block pl-8 py-0.5">
            <span className="text-zinc-400 dark:text-zinc-600">"</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 font-sans text-xs select-none hover:border-violet-500/50 dark:hover:border-violet-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              {getTechIcon(item)}
              <span>{item}</span>
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">"</span>
            {idx < arr.length - 1 && <span className="text-zinc-400 dark:text-zinc-600">,</span>}
          </span>
        ))}
        <span className="pl-4 text-zinc-400 dark:text-zinc-600">]</span>
        {!isLast && <span className="text-zinc-400 dark:text-zinc-600">,</span>}
        <br />
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left select-text">
      <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-4">
        {"// skills.json - Tech Stack Data Representation"}
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-zinc-50/20 dark:bg-zinc-900/10 shadow-sm font-mono text-sm leading-relaxed overflow-x-auto">
        <div className="text-zinc-800 dark:text-zinc-100">
          {/* Root brace */}
          <span className="text-zinc-400 dark:text-zinc-600">{"{"}</span>
          <br />

          {/* Frontend key */}
          <span className="pl-4 text-sky-600 dark:text-sky-400">"frontend"</span>
          <span className="text-zinc-500 dark:text-zinc-600">: </span>
          {renderArray(skills.frontend, false)}

          {/* Backend key */}
          <span className="pl-4 text-sky-600 dark:text-sky-400">"backend"</span>
          <span className="text-zinc-500 dark:text-zinc-600">: </span>
          {renderArray(skills.backend, false)}

          {/* AI key */}
          <span className="pl-4 text-sky-600 dark:text-sky-400">"ai"</span>
          <span className="text-zinc-500 dark:text-zinc-600">: </span>
          {renderArray(skills.ai, false)}

          {/* Tools key */}
          <span className="pl-4 text-sky-600 dark:text-sky-400">"tools"</span>
          <span className="text-zinc-500 dark:text-zinc-600">: </span>
          {renderArray(skills.tools, true)}

          {/* Root close brace */}
          <span className="text-zinc-400 dark:text-zinc-600">{"}"}</span>
        </div>
      </div>
    </div>
  );
};
