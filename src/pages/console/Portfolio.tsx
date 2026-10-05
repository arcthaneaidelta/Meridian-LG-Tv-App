import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { PortfolioApp, AppStatus, AppCategory } from '../../data/apps';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { ScoreRing } from '../../components/ui/ScoreRing';
import {
  Search,
  Filter,
  Layers,
  Wand2,
  Play,
  FileText,
  Check,
  ChevronRight,
  Loader2,
  Tv,
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const {
    portfolioApps,
    portfolioSearch,
    setPortfolioSearch,
    portfolioStatusFilter,
    setPortfolioStatusFilter,
    portfolioCategoryFilter,
    setPortfolioCategoryFilter,
    selectedAppIds,
    toggleSelectApp,
    selectAllFilteredApps,
    clearAppSelection,
    isBulkRunning,
    bulkProgress,
    runBulkChecksAsync,
    applyTemplateFixAsync,
    activeDrawerAppId,
    setActiveDrawerAppId,
    switchCurrentProject,
  } = useAppStore();

  const navigate = useNavigate();

  // Filtered list
  const filteredApps = useMemo(() => {
    return portfolioApps.filter((app) => {
      const matchSearch =
        portfolioSearch.trim() === '' ||
        app.name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
        app.bundleId.toLowerCase().includes(portfolioSearch.toLowerCase());
      const matchStatus =
        portfolioStatusFilter === 'All' || app.status === portfolioStatusFilter;
      const matchCategory =
        portfolioCategoryFilter === 'All' || app.category === portfolioCategoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [portfolioApps, portfolioSearch, portfolioStatusFilter, portfolioCategoryFilter]);

  const activeApp = portfolioApps.find((a) => a.id === activeDrawerAppId) || null;

  // Counts for summary bar
  const liveCount = portfolioApps.filter((a) => a.status === 'Live').length;
  const inReviewCount = portfolioApps.filter((a) => a.status === 'In review').length;
  const inProgressCount = portfolioApps.filter((a) => a.status === 'In progress').length;
  const blockedCount = portfolioApps.filter((a) => a.status === 'Blocked').length;

  return (
    <div className="space-y-6 relative pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            Multi-App Portfolio (40 Apps)
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Centralized governance and automated rollout across your entire catalog of channel applications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/console/report')}
            icon={<FileText className="h-3.5 w-3.5" />}
          >
            Export Catalog Report
          </Button>
        </div>
      </div>

      {/* Aggregate Stats & Stacked Distribution Bar */}
      <div className="rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border text-xs">
          <span className="font-semibold text-app-text">
            Catalog Fleet Distribution ({portfolioApps.length} Apps)
          </span>
          <div className="flex items-center gap-4 text-muted font-mono font-medium">
            <span className="text-success">{liveCount} Live</span>
            <span className="text-info">{inReviewCount} In Review</span>
            <span className="text-primary">{inProgressCount} In Progress</span>
            <span className="text-error">{blockedCount} Blocked</span>
          </div>
        </div>

        {/* Stacked Horizontal Bar */}
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-border">
          <div style={{ width: `${(liveCount / 40) * 100}%` }} className="bg-success" />
          <div style={{ width: `${(inReviewCount / 40) * 100}%` }} className="bg-info" />
          <div style={{ width: `${(inProgressCount / 40) * 100}%` }} className="bg-primary" />
          <div style={{ width: `${(blockedCount / 40) * 100}%` }} className="bg-error" />
        </div>
      </div>

      {/* Table Toolbar: Search, Filters, Bulk Selection */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-sh-1">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            placeholder="Search by app title or bundle ID..."
            value={portfolioSearch}
            onChange={(e) => setPortfolioSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-elevated pl-9 pr-3 py-1.5 text-xs text-app-text outline-none focus:border-primary"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 text-xs">
          {(['All', 'Live', 'In review', 'In progress', 'Blocked'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setPortfolioStatusFilter(st)}
              className={`rounded px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                portfolioStatusFilter === st
                  ? 'bg-primary text-surface'
                  : 'bg-elevated text-app-text hover:bg-surface border border-border'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Category Select */}
        <div className="flex items-center gap-2">
          <select
            value={portfolioCategoryFilter}
            onChange={(e) => setPortfolioCategoryFilter(e.target.value as any)}
            className="rounded border border-border bg-elevated px-2.5 py-1 text-xs text-app-text outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Channels">Channels</option>
            <option value="News">News</option>
            <option value="Fitness">Fitness</option>
            <option value="Kids">Kids</option>
            <option value="Radio">Radio</option>
            <option value="Learning">Learning</option>
          </select>
        </div>
      </div>

      {/* 40-App Data Table */}
      <div className="rounded-lg border border-border bg-elevated shadow-sh-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface text-muted uppercase font-mono text-[10px]">
                <th className="py-2.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedAppIds.length > 0 &&
                      selectedAppIds.length === filteredApps.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectAllFilteredApps(filteredApps.map((a) => a.id));
                      } else {
                        clearAppSelection();
                      }
                    }}
                    className="rounded border-border"
                  />
                </th>
                <th className="py-2.5 px-4 font-semibold">Application</th>
                <th className="py-2.5 px-4 font-semibold">Category</th>
                <th className="py-2.5 px-4 font-semibold">Version</th>
                <th className="py-2.5 px-4 font-semibold">Readiness Score</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Activity</th>
                <th className="py-2.5 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-muted">
                    No apps match this query. Try clearing filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const isSelected = selectedAppIds.includes(app.id);

                  return (
                    <tr
                      key={app.id}
                      className={`hover:bg-surface/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectApp(app.id)}
                          className="rounded border-border"
                        />
                      </td>

                      <td className="py-3 px-4" onClick={() => setActiveDrawerAppId(app.id)}>
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded text-white font-bold text-xs"
                            style={{ backgroundColor: app.iconBg }}
                          >
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-app-text block">{app.name}</span>
                            <span className="font-mono text-[10px] text-muted">{app.bundleId}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-muted">{app.category}</td>
                      <td className="py-3 px-4 font-mono text-muted">v{app.version}</td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-border overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${app.readinessScore}%` }}
                            />
                          </div>
                          <span className="font-mono font-semibold text-[11px] text-app-text">
                            {app.readinessScore}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <StatusPill status={app.status} size="sm" />
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-muted whitespace-nowrap">
                        {app.lastActivity}
                      </td>

                      <td className="py-3 px-2 text-right pr-4" onClick={() => setActiveDrawerAppId(app.id)}>
                        <ChevronRight className="h-4 w-4 text-muted inline" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk Action Bar (when rows are selected) */}
      {selectedAppIds.length > 0 && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 rounded-lg border border-border bg-screen px-6 py-3.5 text-surface shadow-sh-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="font-mono text-xs text-[#8FA79F] font-semibold">
            {selectedAppIds.length} apps selected
          </span>

          <div className="h-4 w-[1px] bg-screen-2" />

          <Button
            variant="secondary"
            size="sm"
            onClick={runBulkChecksAsync}
            isLoading={isBulkRunning}
            icon={<Play className="h-3.5 w-3.5" />}
            className="text-xs bg-screen-2 border-screen-2 text-surface hover:bg-screen"
          >
            Run Batch Audit
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={applyTemplateFixAsync}
            icon={<Wand2 className="h-3.5 w-3.5" />}
            className="text-xs bg-accent hover:bg-accent/90 border-transparent text-white"
          >
            Apply Template Fix
          </Button>

          <button
            onClick={clearAppSelection}
            className="text-xs text-muted hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* App Detail Drawer */}
      <Drawer
        isOpen={Boolean(activeApp)}
        onClose={() => setActiveDrawerAppId(null)}
        title={activeApp?.name}
        subtitle={activeApp?.bundleId}
        width="md"
      >
        {activeApp && (
          <div className="space-y-6">
            {/* Top Score Ring */}
            <div className="flex flex-col items-center justify-center p-6 rounded-md border border-border bg-surface text-center">
              <ScoreRing score={activeApp.readinessScore} size={96} strokeWidth={7} />
              <span className="font-ui text-sm font-semibold text-app-text mt-3">
                {activeApp.status}
              </span>
              <span className="font-mono text-xs text-muted mt-0.5">
                {activeApp.checksPassed} of {activeApp.totalChecks} Automated Checks Passed
              </span>
            </div>

            {/* Quick Metadata */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">Category:</span>
                <span className="font-medium text-app-text">{activeApp.category}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">Package Version:</span>
                <span className="font-mono font-medium text-app-text">v{activeApp.version}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">Last Activity:</span>
                <span className="font-mono text-muted">{activeApp.lastActivity}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3">
              <Button
                variant="primary"
                size="md"
                className="w-full text-xs"
                onClick={() => {
                  switchCurrentProject(activeApp);
                  navigate('/console');
                }}
                icon={<Tv className="h-4 w-4" />}
              >
                Set as Active Project in Console
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="w-full text-xs"
                onClick={() => {
                  switchCurrentProject(activeApp);
                  navigate('/console/report');
                }}
                icon={<FileText className="h-4 w-4" />}
              >
                Generate Certification Report
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Bulk Progress Modal */}
      <Modal
        isOpen={Boolean(bulkProgress)}
        onClose={() => {}}
        title="Running Automated Fleet Checks"
        description="Scanning manifest and remote navigators across selected apps."
        maxWidth="sm"
      >
        {bulkProgress && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span>
                Processed {bulkProgress.completed} of {bulkProgress.total} apps...
              </span>
              {bulkProgress.completed < bulkProgress.total ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <Check className="h-4 w-4 text-success font-bold" />
              )}
            </div>

            <div className="h-2 w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${(bulkProgress.completed / bulkProgress.total) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-muted pt-2 border-t border-border">
              <span>{bulkProgress.successCount} Cleared</span>
              <span>{bulkProgress.warnCount} Require Attention</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
