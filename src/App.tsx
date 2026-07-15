import { useState, useCallback, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { EditorPane } from './components/EditorPane';
import { StatusBar } from './components/StatusBar';
import { MobileNav } from './components/MobileNav';
import { CommandPalette } from './components/CommandPalette';
import { GitPanel } from './components/GitPanel';

function App() {
  const { theme, toggleTheme } = useTheme();

  // Navigation & Workspace states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  // Sidebar view state: 'explorer' or 'source-control'
  const [sidebarView, setSidebarView] = useState<'explorer' | 'source-control'>('explorer');

  // Command palette state
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Tab states: default opens about.md
  const [openTabs, setOpenTabs] = useState<string[]>(['about.md']);
  const [activeTabId, setActiveTabId] = useState<string | null>('about.md');

  // Tab activation/opening logic — also closes sidebar on mobile
  const handleTabSelect = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    if (!openTabs.includes(tabId)) {
      setOpenTabs((prev) => [...prev, tabId]);
    }
    // On mobile, collapse sidebar after navigation so it doesn't block content
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [openTabs]);

  // Ctrl/Cmd + P — Open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Tab closing logic
  const handleTabClose = (tabIdToClose: string) => {
    const updatedTabs = openTabs.filter((tabId) => tabId !== tabIdToClose);
    setOpenTabs(updatedTabs);

    if (activeTabId === tabIdToClose) {
      if (updatedTabs.length > 0) {
        setActiveTabId(updatedTabs[updatedTabs.length - 1]);
      } else {
        setActiveTabId(null);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors font-sans overflow-hidden">
      {/* Top Header */}
      <TopBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* Main Workspace (Sidebar + Editor) */}
      <div className="flex-1 flex min-h-0 relative">
        {sidebarView === 'explorer' ? (
          <Sidebar
            activeTabId={activeTabId}
            onTabSelect={handleTabSelect}
            projectsExpanded={projectsExpanded}
            setProjectsExpanded={setProjectsExpanded}
            sidebarOpen={sidebarOpen}
            onOpenSourceControl={() => setSidebarView('source-control')}
          />
        ) : (
          <GitPanel
            isOpen={sidebarView === 'source-control'}
            onClose={() => setSidebarView('explorer')}
            onToggleFileExplorer={() => setSidebarView('explorer')}
            onViewHistory={() => handleTabSelect('git-history.log')}
          />
        )}

        <main className="flex-1 h-full min-w-0 bg-white dark:bg-zinc-950 relative pb-20">
          <EditorPane
            openTabs={openTabs}
            activeTabId={activeTabId}
            onTabSelect={handleTabSelect}
            onTabClose={handleTabClose}
          />
        </main>
      </div>

      {/* Bottom Status Bar — desktop only */}
      <StatusBar activeTabId={activeTabId} />

      {/* Mobile bottom navigation — replaces sidebar on small screens */}
      <MobileNav activeTabId={activeTabId} onTabSelect={handleTabSelect} />

      {/* Command Palette (Ctrl/Cmd + P) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectFile={handleTabSelect}
      />
    </div>
  );
}

export default App;
