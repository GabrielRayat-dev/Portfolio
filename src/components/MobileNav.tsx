import React from 'react';
import {
  TbMarkdown, TbFileDescription, TbFolder,
  TbBraces, TbFile,
} from 'react-icons/tb';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeTabId: string | null;
  onTabSelect: (tabId: string) => void;
}

const NAV_ITEMS = [
  { id: 'about.md',       label: 'About',      icon: TbMarkdown,        iconClass: 'text-sky-400' },
  { id: 'experience.log', label: 'Experience',  icon: TbFileDescription, iconClass: 'text-amber-400' },
  { id: 'projects',       label: 'Projects',    icon: TbFolder,          iconClass: 'text-violet-400' },
  { id: 'skills.json',    label: 'Skills',      icon: TbBraces,          iconClass: 'text-yellow-400' },
  { id: 'contact.txt',    label: 'Contact',     icon: TbFile,            iconClass: 'text-zinc-400' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeTabId, onTabSelect }) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 flex items-stretch border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-sm select-none pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon, iconClass }) => {
        const isActive = activeTabId === id ||
          (id === 'projects' && (activeTabId === 'project-one' || activeTabId === 'project-two'));

        return (
          <button
            key={id}
            onClick={() => onTabSelect(id)}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Active indicator pill */}
            {isActive && (
              <motion.div
                layoutId="mobile-nav-active"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-violet-500"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}

            <Icon
              size={22}
              className={`transition-colors ${
                isActive ? 'text-violet-500 dark:text-violet-400' : iconClass
              }`}
            />
            <span
              className={`text-[10px] font-mono font-medium transition-colors leading-none ${
                isActive
                  ? 'text-violet-500 dark:text-violet-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};