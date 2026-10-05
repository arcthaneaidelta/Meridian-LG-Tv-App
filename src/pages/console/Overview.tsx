import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { ScoreRing } from '../../components/ui/ScoreRing';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/StatusPill';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Image as ImageIcon,
  Send,
  ArrowRight,
  Clock,
  Layers,
  FileCode2,
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { project, findings, storeAssets, activities, runAllChecksAsync, isTechnicalMode } =
    useAppStore();
  const [isRunning, setIsRunning] = useState(false);
  const [activityFilter, setActivityFilter] = useState<'All' | 'Fixes' | 'Builds' | 'Review'>('All');
  const navigate = useNavigate();

  const handleRunChecks = async () => {
    setIsRunning(true);
    await runAllChecksAsync();
    setIsRunning(false);
  };

  const openIssues = findings.filter((f) => f.status === 'Open');
  const nextActions = openIssues.slice(0, 4);

  const filteredActivities =
    activityFilter === 'All'
      ? activities
      : activities.filter((a) => a.category === activityFilter);

  return (
    <div className="space-y-8">
      {/* Row 1: Header + Readiness Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (col 1-8): Project Banner */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-lg border border-border bg-surface p-6 sm:p-8 shadow-sh-1">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                  Active Intake Project
                </span>
              </div>
              <StatusPill status={project.reviewStage} />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-normal text-app-text tracking-tight">
              {project.name} · v{project.version}
            </h2>
            <p className="mt-2 text-sm text-app-text-2 max-w-xl">
              {isTechnicalMode
                ? `Manifest ID ${project.appId} on webOS 22 container. Verified 14 certification heuristics with physical hardware trace on ${project.deviceTested}.`
                : `Readying ${project.name} for the LG Content Store. Complete audit of remote navigation, store graphics, and manifest compliance.`}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span>Hardware Profile:</span>
              <span className="text-app-text font-medium">{project.deviceTested}</span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleRunChecks}
              isLoading={isRunning}
              icon={<Play className="h-4 w-4" />}
            >
              Run All Checks
            </Button>
          </div>
        </div>

        {/* Right (col 9-12): Readiness Score Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-lg border border-border bg-elevated p-6 text-center shadow-sh-1">
          <ScoreRing score={project.readinessScore} size={120} strokeWidth={9} />
          <h3 className="mt-4 font-ui text-base font-semibold text-app-text">
            {project.readinessScore >= 95
              ? 'Ready for Submission'
              : `${project.openIssuesCount} Blockers Before Submission`}
          </h3>
          <p className="mt-1 text-xs text-app-text-2 max-w-xs">
            {project.readinessScore >= 95
              ? 'All certification and store requirements satisfied.'
              : 'Requires back key handler and focus restoration fixes.'}
          </p>
        </div>
      </div>

      {/* Row 2: Four Clickable KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Checks Passed */}
        <div
          onClick={() => navigate('/console/review')}
          className="group rounded-md border border-border bg-surface p-4 hover:border-secondary hover:shadow-sh-2 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Checks Passed</span>
            <CheckCircle2 className="h-4 w-4 text-success group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display text-3xl font-medium text-app-text">
            {project.passedChecks}{' '}
            <span className="text-sm font-ui text-muted">/ {project.totalChecks}</span>
          </div>
          <span className="text-[11px] text-muted block mt-1">14 automated rules</span>
        </div>

        {/* Open Issues */}
        <div
          onClick={() => navigate('/console/review')}
          className="group rounded-md border border-border bg-surface p-4 hover:border-secondary hover:shadow-sh-2 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Open Issues</span>
            <AlertTriangle className="h-4 w-4 text-warning group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display text-3xl font-medium text-app-text">
            {project.openIssuesCount}
          </div>
          <span className="text-[11px] text-muted block mt-1">
            {project.openIssuesCount === 0 ? 'Zero blockers' : 'Requires code fix'}
          </span>
        </div>

        {/* Assets Valid */}
        <div
          onClick={() => navigate('/console/assets')}
          className="group rounded-md border border-border bg-surface p-4 hover:border-secondary hover:shadow-sh-2 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Assets Valid</span>
            <ImageIcon className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display text-3xl font-medium text-app-text">
            {project.assetsValidCount}{' '}
            <span className="text-sm font-ui text-muted">/ {project.totalAssetsCount}</span>
          </div>
          <span className="text-[11px] text-muted block mt-1">Icons & store splash</span>
        </div>

        {/* Review Stage */}
        <div
          onClick={() => navigate('/console/submission')}
          className="group rounded-md border border-border bg-surface p-4 hover:border-secondary hover:shadow-sh-2 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-medium">Review Stage</span>
            <Send className="h-4 w-4 text-info group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display text-2xl font-medium text-app-text">
            {project.reviewStage}
          </div>
          <span className="text-[11px] text-muted block mt-1">Seller Lounge status</span>
        </div>
      </div>

      {/* Row 3: Next Actions (col 1-7) & Activity Feed (col 8-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Next Actions */}
        <div className="lg:col-span-7 rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="font-ui text-base font-semibold text-app-text">
              Actionable Work Items
            </h3>
            <span className="text-xs font-mono text-muted">
              {nextActions.length} open
            </span>
          </div>

          <div className="divide-y divide-border mt-2">
            {nextActions.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted">
                <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="font-medium text-app-text">Nothing blocking submission.</p>
                <p className="mt-1">All 14 automated review checks have been cleared.</p>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/console/submission')}
                  >
                    Go to Submission Tracker
                  </Button>
                </div>
              </div>
            ) : (
              nextActions.map((action) => (
                <div
                  key={action.id}
                  className="py-4 flex items-start justify-between gap-4 hover:bg-surface/50 rounded px-2 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {action.severity === 'blocker' ? (
                      <AlertCircle className="h-4 w-4 text-error shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-app-text">{action.check}</h4>
                      <p className="mt-0.5 text-xs text-app-text-2">
                        {isTechnicalMode ? action.explanationTechnical : action.explanationPlain}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted">
                        <span>File: {action.file}</span>
                        <span>·</span>
                        <span>Est: ~{action.effortMinutes}m</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/console/review')}
                    className="shrink-0 text-xs"
                  >
                    Open Fix
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-5 rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
            <h3 className="font-ui text-base font-semibold text-app-text">Activity Stream</h3>
            <div className="flex items-center gap-1">
              {(['All', 'Fixes', 'Builds', 'Review'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityFilter(cat)}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    activityFilter === cat
                      ? 'bg-primary text-surface font-semibold'
                      : 'text-muted hover:text-app-text'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border max-h-[380px] overflow-y-auto mt-2">
            {filteredActivities.slice(0, 7).map((act) => (
              <div key={act.id} className="py-3 px-1 text-xs">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-app-text truncate">{act.title}</span>
                  <span className="font-mono text-[10px] text-muted shrink-0">{act.timeAgo}</span>
                </div>
                <p className="text-app-text-2 line-clamp-1">{act.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
