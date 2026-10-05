import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoreRing } from '../../components/ui/ScoreRing';
import { Button } from '../../components/ui/Button';
import { Play, ArrowRight, CheckCircle2, ShieldAlert, Image, Layers } from 'lucide-react';

export const ConsolePreview: React.FC = () => {
  const [score, setScore] = useState(62);
  const [openIssues, setOpenIssues] = useState(3);
  const [passedChecks, setPassedChecks] = useState(11);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  const handleRunChecks = () => {
    setIsRunning(true);
    setTimeout(() => {
      setScore(100);
      setOpenIssues(0);
      setPassedChecks(14);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <section id="console" className="py-24 border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            Interactive Console Preview
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-app-text tracking-tight">
            One number you can watch: Launch Readiness.
          </h2>
          <p className="mt-3 text-base text-app-text-2">
            No vague updates. You get an objective score from 0 to 100 that climbs as code passes review, assets match specs, and hardware tests succeed.
          </p>
        </div>

        {/* Framed Miniature Console Overview Panel */}
        <div className="rounded-xl border border-border bg-elevated p-6 sm:p-8 shadow-sh-2">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                <h3 className="font-ui text-xl font-semibold text-app-text">
                  Harbor TV · v1.0.3
                </h3>
              </div>
              <p className="mt-0.5 text-xs text-muted font-mono">
                Bundle ID: com.harbormedia.harbortv · Category: Entertainment
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleRunChecks}
                isLoading={isRunning}
                icon={<Play className="h-4 w-4" />}
              >
                {score === 100 ? 'Re-Run All Checks' : 'Run All Checks'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/console')}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Open Full Console
              </Button>
            </div>
          </div>

          {/* Grid Layout: Score Ring + KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
            {/* Left: Readiness Score Ring */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-lg border border-border bg-surface text-center">
              <ScoreRing score={score} size={120} strokeWidth={9} />
              <h4 className="mt-4 font-ui text-base font-semibold text-app-text">
                {score === 100 ? 'Store Ready (0 Blockers)' : '2 Blockers Before Submission'}
              </h4>
              <p className="mt-1 text-xs text-app-text-2 max-w-xs">
                {score === 100
                  ? 'All 14 certification checks passed. Package verified for LG Seller Lounge.'
                  : 'Back-key exit dialog and focus retention require remediation.'}
              </p>
            </div>

            {/* Right: 4 Live KPI Cards */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-muted mb-2">
                  <span className="text-xs font-medium">Checks Passed</span>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <div className="font-display text-3xl font-medium text-app-text">
                  {passedChecks} <span className="text-sm font-ui text-muted">/ 14</span>
                </div>
                <span className="text-[11px] text-success font-medium block mt-1">
                  {score === 100 ? '100% compliant' : '11 automated passes'}
                </span>
              </div>

              <div className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-muted mb-2">
                  <span className="text-xs font-medium">Open Issues</span>
                  <ShieldAlert className="h-4 w-4 text-warning" />
                </div>
                <div className="font-display text-3xl font-medium text-app-text">
                  {openIssues}
                </div>
                <span className="text-[11px] text-muted font-medium block mt-1">
                  {openIssues === 0 ? 'Zero blockers remaining' : '2 blockers, 1 minor'}
                </span>
              </div>

              <div className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-muted mb-2">
                  <span className="text-xs font-medium">Store Assets</span>
                  <Image className="h-4 w-4 text-secondary" />
                </div>
                <div className="font-display text-3xl font-medium text-app-text">
                  5 <span className="text-sm font-ui text-muted">/ 7</span>
                </div>
                <span className="text-[11px] text-muted font-medium block mt-1">
                  Icons & splash verified
                </span>
              </div>

              <div className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-muted mb-2">
                  <span className="text-xs font-medium">Store Pipeline</span>
                  <Layers className="h-4 w-4 text-info" />
                </div>
                <div className="font-display text-2xl font-medium text-app-text">
                  {score === 100 ? 'Cleared' : 'Prepared'}
                </div>
                <span className="text-[11px] text-muted font-medium block mt-1">
                  Ready for QA intake
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
