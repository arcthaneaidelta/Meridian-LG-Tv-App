import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tv,
  Send,
  Layers,
  MoreHorizontal,
  FileCode2,
  Maximize2,
  Settings2,
  Package,
  Image as ImageIcon,
  FileText,
  X,
} from 'lucide-react';

export const TabBar: React.FC = () => {
  const [moreOpen, setMoreOpen] = useState(false);

  const mainTabs = [
    { to: '/console', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/console/simulator', label: 'Simulator', icon: Tv },
    { to: '/console/submission', label: 'Submission', icon: Send },
    { to: '/console/portfolio', label: 'Portfolio', icon: Layers },
  ];

  const secondaryLinks = [
    { to: '/console/review', label: 'Code Review', icon: FileCode2 },
    { to: '/console/resolution', label: 'Resolution Lab', icon: Maximize2 },
    { to: '/console/config', label: 'Config Validator', icon: Settings2 },
    { to: '/console/build', label: 'Build & Package', icon: Package },
    { to: '/console/assets', label: 'Store Assets', icon: ImageIcon },
    { to: '/console/report', label: 'Launch Report', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Tab Bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-surface px-2 md:hidden pb-safe shadow-sh-2"
      >
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-primary font-semibold' : 'text-muted hover:text-app-text'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[11px] font-medium transition-colors ${
            moreOpen ? 'text-primary' : 'text-muted'
          }`}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span>More</span>
        </button>
      </nav>

      {/* More Bottom Sheet */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 md:hidden">
          <div className="rounded-t-xl border-t border-border bg-elevated p-6 shadow-sh-3">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-ui text-base font-semibold text-app-text">More Workstations</h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="rounded p-1 text-muted hover:text-app-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4">
              {secondaryLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 rounded-md border border-border bg-surface p-3 text-xs font-medium text-app-text hover:bg-elevated hover:border-primary/40"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
