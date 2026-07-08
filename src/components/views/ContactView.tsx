import React, { useState } from 'react';
import { TbMail, TbBrandGithub, TbCopy, TbCheck, TbExternalLink } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';

export const ContactView: React.FC = () => {
  const { contact } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left font-sans select-text">
      {/* File Comment Header */}
      <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-6">
        {`# let's talk`}
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
          Get in Touch
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
          {contact.status}
        </p>
      </div>

      {/* Rows */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/20 dark:bg-zinc-900/10">
        
        {/* Email Row */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-zinc-400 dark:text-zinc-500 shrink-0">
              <TbMail size={20} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Email</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {contact.email}
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50 dark:hover:border-violet-500/50 bg-white dark:bg-zinc-950 transition-all select-none active:scale-95"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <TbCheck className="text-emerald-500" size={14} />
                <span className="text-emerald-500 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <TbCopy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* GitHub Row */}
        <div className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-zinc-400 dark:text-zinc-500 shrink-0">
              <TbBrandGithub size={20} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">GitHub</div>
              <a
                href={`https://${contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 hover:underline truncate"
              >
                {contact.github}
              </a>
            </div>
          </div>

          <a
            href={`https://${contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/50 dark:hover:border-violet-500/50 bg-white dark:bg-zinc-950 transition-colors select-none"
          >
            <span>Visit</span>
            <TbExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};
