import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { EditorPane } from './components/EditorPane';
import { StatusBar } from './components/StatusBar';
import { MobileNav } from './components/MobileNav';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  // Navigation & Workspace states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  
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
      />

      {/* Main Workspace (Sidebar + Editor) */}
      <div className="flex-1 flex min-h-0 relative">
        <Sidebar
          activeTabId={activeTabId}
          onTabSelect={handleTabSelect}
          projectsExpanded={projectsExpanded}
          setProjectsExpanded={setProjectsExpanded}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 h-full min-w-0 bg-white dark:bg-zinc-950 relative">
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
    </div>
  );
}

export default App;
