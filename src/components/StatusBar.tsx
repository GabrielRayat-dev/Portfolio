import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TbCheck, TbWifi, TbWifiOff } from 'react-icons/tb';

type ConnectionStatus = 'disconnected' | 'connecting' | 'authenticating' | 'connected';

interface StatusBarProps {
  activeTabId: string | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ activeTabId }) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  const IDLE_THRESHOLD = 180000; // 3 minutes

  // Ref holds the active idle timer so event listeners can clear/reset it
  // without forcing the component to re-render on every tick.
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Connection sequence: disconnected -> connecting (red) -> authenticating (orange) -> connected (green)
  const runConnectionSequence = useCallback(() => {
    setConnectionStatus('connecting');       // 0-1.5s: red
    setTimeout(() => {
      setConnectionStatus('authenticating'); // 1.5-3s: orange
      setTimeout(() => {
        setConnectionStatus('connected');    // after 3s: green
      }, 1500);
    }, 1500);
  }, []);

  // Reset the idle countdown. This ONLY clears/restarts the 5-minute timer.
  // It intentionally does NOT call runConnectionSequence, so any mouse move
  // or keypress just refreshes the countdown and never restarts the animation.
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      // Timer fully expired while the user was away -> re-auth sequence
      runConnectionSequence();
    }, IDLE_THRESHOLD);
  }, [runConnectionSequence]);

  // Set up idle detection
  useEffect(() => {
    // Initial connection sequence on mount
    runConnectionSequence();

    // Activity event listeners — reset the idle countdown only
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer, { passive: true }));

    // Start the idle countdown
    resetIdleTimer();

    // Cleanup
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [resetIdleTimer, runConnectionSequence]);

  const getLanguageMode = () => {
    if (!activeTabId) return 'Plain Text';
    if (activeTabId.endsWith('.md')) return 'Markdown';
    if (activeTabId.endsWith('.log')) return 'Log Stream';
    if (activeTabId.endsWith('.py')) return 'Python 3';
    if (activeTabId.endsWith('.tsx')) return 'TypeScript JSX';
    if (activeTabId.endsWith('.json')) return 'JSON';
    if (activeTabId.endsWith('.txt')) return 'Plain Text';
    if (activeTabId === 'projects') return 'Directory Overview';
    if (activeTabId === 'sandbox.js') return 'JavaScript';
    return 'Plain Text';
  };

  // Connection status styling
  const getWifiIcon = () => {
    switch (connectionStatus) {
      case 'disconnected':
        return <TbWifiOff size={14} className="text-red-500 animate-pulse" />;
      case 'connecting':
        return <TbWifi size={14} className="text-red-500 animate-pulse" />;
      case 'authenticating':
        return <TbWifi size={14} className="text-amber-500 animate-pulse" />;
      case 'connected':
        return <TbWifi size={14} className="text-emerald-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'disconnected':
        return 'disconnected';
      case 'connecting':
        return 'connecting...';
      case 'authenticating':
        return 'connecting...';
      case 'connected':
        return 'connected';
    }
  };

  const getConnectionTextClass = () => {
    switch (connectionStatus) {
      case 'disconnected':
        return 'text-red-500';
      case 'connecting':
        return 'text-red-500';
      case 'authenticating':
        return 'text-amber-500';
      case 'connected':
        return 'text-emerald-500';
    }
  };

  return (
    <footer className="hidden md:flex h-9 w-full items-center justify-between px-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono text-zinc-500 dark:text-zinc-400 select-none shrink-0 z-10">
      {/* Left section: Copyright */}
      <div className="flex items-center gap-1.5 truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          © 2026 Jan Gabriel Rayat
        </span>
      </div>

      {/* Right section: IDE details */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-1">
          {getWifiIcon()}
          <span className={`font-medium ${getConnectionTextClass()} transition-colors duration-300`}>
            {getConnectionText()}
          </span>
        </div>
        <div className="hidden md:block">
          <span>Ln 1, Col 1</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
        <div>
          <span>{getLanguageMode()}</span>
        </div>
        <div className="flex items-center gap-1">
          <TbCheck size={14} className="text-emerald-500" />
          <span>Prettier</span>
        </div>
      </div>
    </footer>
  );
};
