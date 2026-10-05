import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Tv,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const {
    project,
    portfolioApps,
    switchCurrentProject,
    isTechnicalMode,
    toggleTechnicalMode,
    openTour,
    setCommandPaletteOpen,
    setNotificationsOpen,
    setKeyboardHelpOpen,
    resetDemo,
  } = useAppStore();

  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  // Derive route name for breadcrumb
  const routeNames: Record<string, string> = {
    '/console': 'Project Overview',
    '/console/review': 'Code Audit & Review',
    '/console/simulator': 'TV Simulator',
    '/console/resolution': 'Resolution Lab',
    '/console/config': 'Config Validator',
    '/console/build': 'Build & Package Pipeline',
    '/console/assets': 'Store Asset Inspector',
    '/console/submission': 'LG Content Store Submission',
    '/console/portfolio': 'Portfolio (40 Apps)',
    '/console/report': 'Launch Certification Report',
  };

  const currentTitle = routeNames[location.pathname] || 'Launch Console';

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-surface/90 px-4 md:px-6">
      {/* Left: Breadcrumbs & Project Switcher */}
      <div className="flex items-center gap-3">
        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProjectMenuOpen(!projectMenuOpen)}
            className="flex items-center gap-2 rounded-md border border-border bg-elevated px-2.5 py-1.5 text-xs font-semibold text-app-text hover:border-primary/50 shadow-sh-1 transition-all"
          >
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-ui">{project.name}</span>
            <span className="text-muted font-mono font-normal">v{project.version}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </button>

          {projectMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-60 rounded-md border border-border bg-elevated p-1 shadow-sh-2 z-50">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Switch Sample App
              </div>
              <div className="max-h-52 overflow-y-auto space-y-0.5">
                {portfolioApps.slice(0, 8).map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      switchCurrentProject(app);
                      setProjectMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-xs text-left transition-colors ${
                      app.id === project.id
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-app-text-2 hover:bg-surface hover:text-app-text'
                    }`}
                  >
                    <span className="truncate">{app.name}</span>
                    {app.id === project.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span className="text-border hidden sm:inline">/</span>

        {/* Current Screen Title */}
        <h1 className="font-ui text-sm font-semibold text-app-text hidden sm:inline-block">
          {currentTitle}
        </h1>
      </div>

      {/* Right: Actions, Toggles, Command Search, Notifications, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search / Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 rounded-md border border-border bg-elevated px-2.5 py-1.5 text-xs text-muted hover:border-app-text-2 hover:text-app-text transition-colors shadow-sh-1"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search or jumps...</span>
          <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        {/* Technical / Plain English Toggle */}
        <button
          onClick={toggleTechnicalMode}
          className="flex items-center gap-1.5 rounded-md border border-border bg-elevated px-2.5 py-1.5 text-xs font-medium text-app-text hover:border-primary/50 transition-colors shadow-sh-1"
          title="Toggle Technical vs Plain English explanations"
        >
          <span className="text-muted hidden sm:inline">Explanation:</span>
          <span className={isTechnicalMode ? 'text-primary font-semibold' : 'text-accent font-semibold'}>
            {isTechnicalMode ? 'Technical' : 'Plain English'}
          </span>
        </button>

        {/* Guided Tour Trigger */}
        <Button
          variant="secondary"
          size="sm"
          onClick={openTour}
          icon={<Sparkles className="h-3.5 w-3.5 text-accent" />}
          className="hidden lg:inline-flex text-xs h-8"
        >
          Guided Tour
        </Button>

        {/* Notifications Trigger */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative rounded-md border border-border bg-elevated p-2 text-app-text hover:bg-surface transition-colors shadow-sh-1"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        {/* Keyboard Help */}
        <button
          onClick={() => setKeyboardHelpOpen(true)}
          className="rounded-md border border-border bg-elevated p-2 text-app-text hover:bg-surface transition-colors shadow-sh-1"
          title="Keyboard shortcuts (?)"
          aria-label="Keyboard shortcuts"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Avatar / Demo Controls Menu */}
        <div className="relative">
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-surface font-semibold text-xs shadow-sh-1 hover:brightness-110 transition-all cursor-pointer"
            aria-label="User and demo actions"
          >
            M
          </button>

          {avatarMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-elevated p-1 shadow-sh-2 z-50">
              <div className="px-3 py-2 border-b border-border">
                <span className="block text-xs font-semibold text-app-text">Meridian Studio</span>
                <span className="block text-[11px] text-muted">Demo Session</span>
              </div>
              <button
                onClick={() => {
                  resetDemo();
                  setAvatarMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs text-app-text hover:bg-surface transition-colors text-left"
              >
                <RotateCcw className="h-3.5 w-3.5 text-muted" />
                <span>Reset Demo State</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
