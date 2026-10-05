import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Tv,
  FileCode2,
  Package,
  Send,
  Layers,
  Wand2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useAppStore } from '../../store';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, runAllChecksAsync, autoFixConfigJson, resetDemo } =
    useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Listen for global Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const items = [
    { id: 'ov', label: 'Go to Project Overview', category: 'Navigation', icon: LayoutDashboard, action: () => navigate('/console') },
    { id: 'sim', label: 'Go to TV Simulator & Remote', category: 'Navigation', icon: Tv, action: () => navigate('/console/simulator') },
    { id: 'rev', label: 'Go to Project Review (14 Checks)', category: 'Navigation', icon: FileCode2, action: () => navigate('/console/review') },
    { id: 'res', label: 'Go to Resolution Lab', category: 'Navigation', icon: Tv, action: () => navigate('/console/resolution') },
    { id: 'cfg', label: 'Go to Config Validator (appinfo.json)', category: 'Navigation', icon: Wand2, action: () => navigate('/console/config') },
    { id: 'bld', label: 'Go to Build & Packaging Pipeline', category: 'Navigation', icon: Package, action: () => navigate('/console/build') },
    { id: 'sub', label: 'Go to LG Content Store Submission', category: 'Navigation', icon: Send, action: () => navigate('/console/submission') },
    { id: 'por', label: 'Go to Portfolio (40 Apps)', category: 'Navigation', icon: Layers, action: () => navigate('/console/portfolio') },
    { id: 'chk', label: 'Action: Run All Checks', category: 'Actions', icon: Play, action: () => runAllChecksAsync() },
    { id: 'fix', label: 'Action: Auto-Fix appinfo.json', category: 'Actions', icon: Wand2, action: () => autoFixConfigJson() },
    { id: 'rst', label: 'Action: Reset Demo to Default State', category: 'Actions', icon: RotateCcw, action: () => resetDemo() },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof items)[0]) => {
    item.action();
    setCommandPaletteOpen(false);
    setQuery('');
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-start justify-center pt-24 p-4">
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-app-text/45 transition-opacity"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-elevated shadow-sh-3 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a screen name or action..."
            className="w-full bg-transparent text-sm text-app-text outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-xs text-muted">No commands found for "{query}".</p>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors text-left ${
                    idx === selectedIndex ? 'bg-primary text-surface' : 'text-app-text hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase ${
                      idx === selectedIndex ? 'text-surface/80' : 'text-muted'
                    }`}
                  >
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
