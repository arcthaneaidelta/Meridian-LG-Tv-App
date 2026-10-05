import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../../store';
import { Pipeline } from '../../components/domain/Pipeline';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Play, Download, XCircle, RotateCcw, ShieldCheck, FileCheck, AlertTriangle } from 'lucide-react';

export const Build: React.FC = () => {
  const {
    buildStage,
    buildStatus,
    buildLogs,
    simulatedBuildError,
    setSimulatedBuildError,
    startBuildAsync,
    cancelBuild,
    resetBuild,
    addToast,
  } = useAppStore();

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll build log
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [buildLogs]);

  const handleDownload = () => {
    addToast('Demo build: package checksum and size verified, no local IPK file generated.', 'info');
  };

  const handleFixAndRebuild = () => {
    setSimulatedBuildError(null);
    startBuildAsync();
  };

  const errorOptions = [
    { value: '', label: 'None (Happy Path Build)' },
    { value: 'Invalid version', label: 'Fail Stage 3: Invalid Version in appinfo.json' },
    { value: 'Missing icon', label: 'Fail Stage 3: Missing icon.png' },
    { value: 'Signing mismatch', label: 'Fail Stage 4: Certificate Mismatch' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            Production Build & IPK Packaging
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Automated, reproducible pipeline utilizing simulated webOS CLI (ares-package) with signature auditing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {buildStatus === 'running' ? (
            <Button variant="danger" size="md" onClick={cancelBuild} icon={<XCircle className="h-4 w-4" />}>
              Cancel Build
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={startBuildAsync}
              icon={<Play className="h-4 w-4" />}
            >
              {buildStatus === 'done' ? 'Re-Build Package' : 'Start Release Build'}
            </Button>
          )}

          {buildStatus !== 'idle' && (
            <Button variant="ghost" size="md" onClick={resetBuild} icon={<RotateCcw className="h-4 w-4" />}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Top: 6-Stage Pipeline Node Visualizer */}
      <div className="rounded-lg border border-border bg-surface p-4 shadow-sh-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border text-xs">
          <span className="font-semibold text-app-text">Build Pipeline Stages</span>
          <div className="flex items-center gap-2">
            <span className="text-muted">Simulate Error:</span>
            <select
              value={simulatedBuildError || ''}
              onChange={(e) => setSimulatedBuildError(e.target.value || null)}
              className="rounded border border-border bg-elevated px-2 py-1 text-xs text-app-text outline-none"
            >
              {errorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Pipeline currentStage={buildStage} status={buildStatus} />
      </div>

      {/* Grid: Build Log (col 1-7) & Artifact Cards (col 8-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Build Console Log */}
        <div className="lg:col-span-7 flex flex-col rounded-lg border border-screen-2 bg-screen p-5 shadow-sh-2">
          <div className="flex items-center justify-between pb-3 border-b border-screen-2 text-xs font-mono text-[#8FA79F]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>meridian-packager release terminal</span>
            </div>
            <span>Status: {buildStatus.toUpperCase()}</span>
          </div>

          <div className="mt-4 font-mono text-xs text-[#E2E8F0] space-y-2 min-h-[300px] max-h-[380px] overflow-y-auto leading-relaxed">
            {buildLogs.length === 0 ? (
              <p className="text-muted italic">Click "Start Release Build" to run the pipeline.</p>
            ) : (
              buildLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.includes('FAILED')
                      ? 'text-error font-semibold'
                      : log.includes('✓')
                      ? 'text-success font-semibold'
                      : 'text-[#CBD5E1]'
                  }
                >
                  {log}
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Right Column: Output Artifact & Signing Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Fix Suggestions on Error */}
          {buildStatus === 'failed' && (
            <div className="rounded-lg border border-error/50 bg-error/10 p-5 shadow-sh-1">
              <div className="flex items-center gap-2 text-error font-semibold text-sm mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Build Bottleneck Detected</span>
              </div>
              <p className="text-xs text-app-text-2 mb-4">
                Pipeline failed at validation check: {simulatedBuildError}. Click below to apply recommended configuration and re-run.
              </p>
              <Button variant="danger" size="sm" onClick={handleFixAndRebuild} className="w-full text-xs">
                Apply Fix & Rebuild
              </Button>
            </div>
          )}

          {/* Release IPK Package Output Card */}
          <div className="rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-3">
              <FileCheck className="h-4 w-4" />
              <span>Release Binary Output</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">Package Name:</span>
                <span className="font-mono font-medium text-app-text">
                  com.harbormedia.harbortv_1.0.3_all.ipk
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">Package Weight:</span>
                <span className="font-mono font-medium text-app-text">1.8 MB (Optimized)</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-border">
                <span className="text-muted">SHA-256 Checksum:</span>
                <span className="font-mono text-muted">d8f3a9e...4b81</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Target Architecture:</span>
                <span className="font-mono font-medium text-app-text">webOS 4.x - webOS 24 (All)</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <Button
                variant="secondary"
                size="md"
                className="w-full text-xs"
                onClick={handleDownload}
                icon={<Download className="h-4 w-4" />}
              >
                Download IPK Artifact (Demo)
              </Button>
            </div>
          </div>

          {/* Signing Card */}
          <div className="rounded-lg border border-border bg-surface p-5 text-xs text-app-text-2">
            <div className="flex items-center gap-2 font-semibold text-app-text mb-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span>Production Signing Profile</span>
            </div>
            <p className="leading-relaxed">
              Signed with developer certificate for Seller Lounge upload. Fingerprint verified against LG Content Store key registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
