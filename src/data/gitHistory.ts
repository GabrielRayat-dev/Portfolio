export interface GitCommit {
  hash: string;
  fullHash: string;
  message: string;
  author: string;
  date: string;
  time: string;
  files: string[];
  staged?: boolean;
}

// Deterministic 40-char SHA derived from a short 7-char hash (mock full hash)
const extendHash = (short: string): string => {
  const tail = '0f1e2d3c4b5a69788796a5b4c3d2e1f0';
  return (short + tail).slice(0, 40);
};

// Generate a random 7-char hex string (e.g. 'g2f8h3k')
export const generateHash = (length: number): string => {
  const chars = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// Build a full 40-char mock hash from a short one
export const fullFromShort = (short: string): string => extendHash(short);

// Real GitHub commit history (newest -> oldest)
export const REAL_COMMITS: GitCommit[] = [
  {
    hash: '36db536',
    fullHash: extendHash('36db536'),
    message: 'feat: complete interactive source control and commit history accordion',
    author: 'Gabriel Rayat',
    date: 'Jul 15, 2026',
    time: '16:42:10',
    files: ['modified: src/components/GitPanel.tsx', 'modified: src/components/views/GitHistoryView.tsx'],
  },
  {
    hash: 'e9de2b0',
    fullHash: extendHash('e9de2b0'),
    message: 'feat: add clickable source control sidebar panel and header command palette',
    author: 'Gabriel Rayat',
    date: 'Jul 15, 2026',
    time: '15:18:33',
    files: ['modified: src/components/Sidebar.tsx', 'added: src/components/CommandPalette.tsx', 'modified: src/components/TopBar.tsx'],
  },
  {
    hash: 'dbaba8a',
    fullHash: extendHash('dbaba8a'),
    message: 'feat: add wifi connection animation and 3-min idle status sequence',
    author: 'Gabriel Rayat',
    date: 'Jul 15, 2026',
    time: '13:05:51',
    files: ['modified: src/components/StatusBar.tsx'],
  },
  {
    hash: '3feb3fa',
    fullHash: extendHash('3feb3fa'),
    message: 'fix: restore visibility of main editor pane on desktop viewports',
    author: 'Gabriel Rayat',
    date: 'Jul 15, 2026',
    time: '11:47:09',
    files: ['modified: src/App.tsx'],
  },
  {
    hash: 'ec9e917',
    fullHash: extendHash('ec9e917'),
    message: 'fix(mobile): add bottom padding to layout container',
    author: 'Gabriel Rayat',
    date: 'Jul 15, 2026',
    time: '10:22:44',
    files: ['modified: src/App.tsx', 'modified: src/index.css'],
  },
  {
    hash: 'ced8576',
    fullHash: extendHash('ced8576'),
    message: 'update title',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '17:30:00',
    files: ['modified: src/data/portfolio.ts'],
  },
  {
    hash: '5e9f983',
    fullHash: extendHash('5e9f983'),
    message: 'update work year',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '16:12:00',
    files: ['modified: src/data/portfolio.ts'],
  },
  {
    hash: '7572f6d',
    fullHash: extendHash('7572f6d'),
    message: 'update planned features list and light mode terminal mockup',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '14:55:00',
    files: ['modified: src/data/portfolio.ts', 'modified: src/components/views/AboutView.tsx'],
  },
  {
    hash: 'e6d039c',
    fullHash: extendHash('e6d039c'),
    message: 'update education years to present',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '13:40:00',
    files: ['modified: src/data/portfolio.ts'],
  },
  {
    hash: '8d90750',
    fullHash: extendHash('8d90750'),
    message: 'fix experience timeline connector alignment',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '12:15:00',
    files: ['modified: src/components/views/ExperienceView.tsx'],
  },
  {
    hash: 'dab045a',
    fullHash: extendHash('dab045a'),
    message: 'increase profile picture size on desktop',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '11:02:00',
    files: ['modified: src/components/views/AboutView.tsx'],
  },
  {
    hash: '7b0cf91',
    fullHash: extendHash('7b0cf91'),
    message: 'fix mobile content cutoff behind bottom nav',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '09:48:00',
    files: ['modified: src/App.tsx', 'modified: src/components/MobileNav.tsx'],
  },
  {
    hash: 'd9e141f',
    fullHash: extendHash('d9e141f'),
    message: 'add location under name',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '08:30:00',
    files: ['modified: src/components/views/AboutView.tsx'],
  },
  {
    hash: '58c1500',
    fullHash: extendHash('58c1500'),
    message: 'update about title',
    author: 'Gabriel Rayat',
    date: 'Jul 9, 2026',
    time: '07:15:00',
    files: ['modified: src/components/views/AboutView.tsx'],
  },
  {
    hash: '97b5eae',
    fullHash: extendHash('97b5eae'),
    message: 'update favicon',
    author: 'Gabriel Rayat',
    date: 'Jul 8, 2026',
    time: '18:00:00',
    files: ['modified: public/favicon.svg', 'modified: index.html'],
  },
  {
    hash: '16383a2',
    fullHash: extendHash('16383a2'),
    message: 'Initial commit: porfolio site',
    author: 'Gabriel Rayat',
    date: 'Jul 8, 2026',
    time: '09:00:00',
    files: ['added: index.html', 'added: src/', 'added: package.json', 'added: public/'],
  },
];

// Local work-in-progress (uncommitted) changes shown under "Staged Changes"
export const STAGED_CHANGES: GitCommit[] = [
  {
    hash: 'uncommitted',
    fullHash: 'uncommitted',
    message: 'work in progress: Add breadcrumb navigation highlight',
    author: 'You',
    date: 'Just now',
    time: '—',
    files: ['modified: src/components/Breadcrumbs.tsx', 'added: src/hooks/useScrollSpy.ts'],
    staged: true,
  },
  {
    hash: 'uncommitted',
    fullHash: 'uncommitted',
    message: 'work in progress: Dark mode theme refinements',
    author: 'You',
    date: 'Just now',
    time: '—',
    files: ['modified: src/index.css', 'modified: src/components/TopBar.tsx'],
    staged: true,
  },
];
