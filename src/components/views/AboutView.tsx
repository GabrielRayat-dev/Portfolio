import React from 'react';
import { TbSchool, TbBook, TbRosetteDiscountCheckFilled, TbMapPin } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import profileImg from '../../assets/pr1.png';

export const AboutView: React.FC = () => {
  const { about } = portfolioData;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 text-left font-sans select-text">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 sm:mb-8 text-center sm:text-left">
        <img
          src={profileImg}
          alt={about.name}
          className="w-20 h-20 md:w-30 md:h-30 rounded-full object-cover shadow-sm border border-violet-500 shrink-0"
        />
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight flex items-center gap-2">
            {about.tagline}
            <TbRosetteDiscountCheckFilled size={26} className="text-violet-500 shrink-0" />
          </h1>
          <p className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
            <TbMapPin size={16} className="shrink-0" />
            {about.location}
          </p>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-mono mt-1">
            {about.title}
          </p>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 my-6" />

      {/* About Me Section */}
      <div className="mb-10">
        <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-3">
          {"// About me"}
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
          {about.bio}
        </p>
      </div>

      {/* Education Section */}
      <div className="mb-6">
        <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-4">
          {"// Education"}
        </div>
        <div className="space-y-4">
          {about.education.map((edu, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-colors"
            >
              <div className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 shrink-0">
                {idx === 0 ? <TbSchool size={20} /> : <TbBook size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-100 text-sm sm:text-base truncate">
                    {edu.degree}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 shrink-0 self-start sm:self-center">
                    {edu.years}
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                  {edu.school}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};