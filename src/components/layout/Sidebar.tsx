import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCode2,
  Tv,
  Maximize2,
  Settings2,
  Package,
  Image as ImageIcon,
  Send,
  Layers,
  FileText,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const launchLinks = [
    { to: '/console', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/console/review', label: 'Project Review', icon: FileCode2 },
    { to: '/console/simulator', label: 'TV Simulator', icon: Tv },
    { to: '/console/resolution', label: 'Resolution Lab', icon: Maximize2 },
    { to: '/console/config', label: 'Config Validator', icon: Settings2 },
    { to: '/console/build', label: 'Build & Package', icon: Package },
    { to: '/console/assets', label: 'Store Assets', icon: ImageIcon },
    { to: '/console/submission', label: 'Submission Tracker', icon: Send },
  ];

  const scaleLinks = [
    { to: '/console/portfolio', label: 'Portfolio (40 Apps)', icon: Layers },
    { to: '/console/report', label: 'Launch Report', icon: FileText },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border bg-surface transition-all duration-260 z-30 select-none ${
        collapsed ? 'w-[72px]' : 'w-[248px]'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-screen border border-primary/40 shadow-sm">
            <div className="h-3 w-4 rounded-xs bg-primary" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display text-base font-medium tracking-tight text-app-text leading-none">
                Meridian
              </span>
              <span className="text-[10px] font-mono text-muted uppercase mt-0.5">
                Launch Console
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={onToggleCollapse}
          className="rounded p-1 text-muted hover:bg-elevated hover:text-app-text transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Launch Group */}
        <div>
          {!collapsed && (
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">
              Launch Flow
            </span>
          )}
          <nav className="space-y-1">
            {launchLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-140 ${
                      isActive
                        ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold'
                        : 'text-app-text-2 hover:bg-elevated hover:text-app-text'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Scale Group */}
        <div>
          {!collapsed && (
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">
              Scale & Assets
            </span>
          )}
          <nav className="space-y-1">
            {scaleLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-140 ${
                      isActive
                        ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold'
                        : 'text-app-text-2 hover:bg-elevated hover:text-app-text'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Return to Story Link */}
      <div className="border-t border-border p-3">
        <Link
          to="/"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-app-text-2 hover:bg-elevated hover:text-app-text transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Back to Landing Story"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span>Back to Story</span>}
        </Link>
      </div>
    </aside>
  );
};
