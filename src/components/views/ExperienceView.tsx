import React, { useState } from 'react';
import { TbChevronDown, TbChevronRight } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export const ExperienceView: React.FC = () => {
  const { experience } = portfolioData;

  // Most recent expanded by default (index 0), others collapsed
  const [expandedIndices, setExpandedIndices] = useState<{ [key: number]: boolean }>({
    0: true,
  });

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left font-sans select-text">
      <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-8">
        {"// Experience log - Timeline view"}
      </div>

      <div className="relative ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6 sm:space-y-8 pb-4">
        {experience.map((exp, idx) => {
          const isExpanded = !!expandedIndices[idx];
          const isLast = idx === experience.length - 1;

          return (
            <div key={idx} className="relative group">
              {/* Connector segment to next node (skipped for the last entry) */}
              {!isLast && (
                <div
                  className="absolute -left-[29px] top-[30px] -bottom-[42px] sm:-bottom-[50px] w-px bg-zinc-200 dark:bg-zinc-800"
                  aria-hidden="true"
                />
              )}

              {/* Hollow Dot Node */}
              <div
                className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 bg-white dark:bg-zinc-950 transition-colors flex items-center justify-center cursor-pointer ${
                  isExpanded
                    ? 'border-violet-600 dark:border-violet-500 shadow-[0_0_0_4px_rgba(124,58,237,0.1)]'
                    : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
                }`}
                onClick={() => toggleExpand(idx)}
                aria-label={`Toggle details for ${exp.title}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isExpanded ? 'bg-violet-600 dark:bg-violet-500' : 'bg-transparent'
                  }`}
                />
              </div>

              {/* Entry Container */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                {/* Header (Clickable) */}
                <button
                  className="w-full p-4 flex items-start sm:items-center justify-between gap-4 text-left font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
                  onClick={() => toggleExpand(idx)}
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 dark:text-zinc-500">
                        {isExpanded ? <TbChevronDown size={18} /> : <TbChevronRight size={18} />}
                      </span>
                      <h3 className="font-semibold text-zinc-950 dark:text-zinc-100 text-base sm:text-lg truncate">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm pl-7 mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950 shrink-0 self-start sm:self-center">
                    {exp.period}
                  </span>
                </button>

                {/* Collapsible Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 pl-11 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/20">
                        <ul className="space-y-2.5 text-zinc-600 dark:text-zinc-400 text-sm">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <span className="text-violet-500 font-mono select-none mt-0.5 shrink-0">
                                →
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};