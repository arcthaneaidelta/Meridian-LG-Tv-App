import React, { useState } from 'react';
import { initialPortfolioApps, PortfolioApp } from '../../data/apps';
import { Button } from '../../components/ui/Button';
import { Wand2, Layers, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScaleGrid: React.FC = () => {
  const [apps, setApps] = useState<PortfolioApp[]>(initialPortfolioApps);
  const [isFixing, setIsFixing] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<PortfolioApp | null>(null);
  const navigate = useNavigate();

  const handleRunTemplateFix = () => {
    setIsFixing(true);
    // Stagger flip 12 apps from blocked/warn to green in 60ms steps
    const blockedIndices = apps
      .map((a, idx) => (a.status === 'Blocked' || a.status === 'In progress' ? idx : -1))
      .filter((idx) => idx !== -1);

    blockedIndices.forEach((targetIdx, i) => {
      setTimeout(() => {
        setApps((prev) => {
          const next = [...prev];
          next[targetIdx] = {
            ...next[targetIdx],
            status: 'Live',
            readinessScore: 100,
            checksPassed: 14,
          };
          return next;
        });
        if (i === blockedIndices.length - 1) {
          setIsFixing(false);
        }
      }, i * 60);
    });
  };

  const liveCount = apps.filter((a) => a.status === 'Live').length;
  const inReviewCount = apps.filter((a) => a.status === 'In review').length;
  const inProgressCount = apps.filter((a) => a.status === 'In progress').length;
  const blockedCount = apps.filter((a) => a.status === 'Blocked').length;

  return (
    <section id="scale" className="py-24 border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              Multi-App Pipeline
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-app-text tracking-tight">
              One process. Forty apps.
            </h2>
            <p className="mt-3 text-base text-app-text-2">
              If your apps share a common web shell or channel layout, you should not pay for 40 independent learning curves. We fix the baseline template once and propagate verified packages across your entire catalog.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={handleRunTemplateFix}
              isLoading={isFixing}
              icon={<Wand2 className="h-4 w-4" />}
            >
              Run Template Batch Fix
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/console/portfolio')}
              icon={<Layers className="h-4 w-4" />}
            >
              Open Portfolio
            </Button>
          </div>
        </div>

        {/* Aggregate Status Indicator Bar */}
        <div className="rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border text-xs">
            <span className="font-semibold text-app-text">Catalog Status: 40 webOS Apps</span>
            <div className="flex items-center gap-5 text-muted font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span>{liveCount} Live</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-info" />
                <span>{inReviewCount} In Review</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{inProgressCount} In Progress</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-error" />
                <span>{blockedCount} Blocked</span>
              </span>
            </div>
          </div>

          {/* 5x8 Visual Matrix of App Dots */}
          <div className="mt-6 grid grid-cols-5 sm:grid-cols-8 gap-3">
            {apps.map((app) => {
              const dotColor =
                app.status === 'Live'
                  ? 'bg-success border-success/40'
                  : app.status === 'In review'
                  ? 'bg-info border-info/40'
                  : app.status === 'In progress'
                  ? 'bg-primary border-primary/40'
                  : 'bg-error border-error/40';

              return (
                <div
                  key={app.id}
                  onMouseEnter={() => setHoveredApp(app)}
                  onMouseLeave={() => setHoveredApp(null)}
                  onClick={() => navigate('/console/portfolio')}
                  className="group relative flex flex-col items-center justify-center p-3 rounded-md border border-border bg-surface hover:bg-elevated hover:border-secondary transition-all cursor-pointer"
                >
                  <span className={`h-3 w-3 rounded-full border shadow-sm transition-transform duration-200 group-hover:scale-125 ${dotColor}`} />
                  <span className="mt-2 font-ui text-[11px] font-medium text-app-text truncate w-full text-center">
                    {app.name}
                  </span>
                  <span className="font-mono text-[9px] text-muted">
                    {app.readinessScore}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Hover Tooltip Preview */}
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
            {hoveredApp ? (
              <div className="flex items-center gap-3 text-app-text">
                <span className="font-semibold">{hoveredApp.name}</span>
                <span className="text-muted font-mono">{hoveredApp.bundleId}</span>
                <span className="font-mono">Status: {hoveredApp.status}</span>
                <span className="font-mono text-primary font-semibold">{hoveredApp.readinessScore}% Readiness</span>
              </div>
            ) : (
              <span>Hover any app tile to view bundle telemetry and certification status.</span>
            )}
            <span className="font-mono text-[11px]">Repeatable batching enabled</span>
          </div>
        </div>
      </div>
    </section>
  );
};
