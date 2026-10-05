import React from 'react';
import { useAppStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { ScoreRing } from '../../components/ui/ScoreRing';
import { StatusPill } from '../../components/ui/StatusPill';
import { Printer, CheckCircle2, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const Report: React.FC = () => {
  const { project, findings, storeAssets } = useAppStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 no-print">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            Launch Certification Report
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Per-app audit document generated for client stakeholders and LG Seller Lounge compliance record.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handlePrint}
          icon={<Printer className="h-4 w-4" />}
          className="print-include"
        >
          Print / Save PDF
        </Button>
      </div>

      {/* Printable Report Document Card */}
      <article className="rounded-lg border border-border bg-elevated p-8 sm:p-12 shadow-sh-1 print:border-none print:shadow-none print:p-0 print-page">
        {/* Document Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-primary pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-2xl font-medium tracking-tight text-app-text">
                Meridian Studio
              </span>
              <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary uppercase font-bold">
                Certification Report
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-app-text">
              {project.name}
            </h1>
            <p className="font-mono text-xs text-muted mt-1">
              Manifest ID: {project.appId} · Release v{project.version} · Category: {project.category}
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <ScoreRing score={project.readinessScore} size={96} strokeWidth={8} />
            <span className="font-mono text-[11px] text-muted mt-1">
              Readiness: {project.readinessScore}/100
            </span>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="py-6 border-b border-border text-xs leading-relaxed space-y-2">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            1. Executive Verification Summary
          </h2>
          <p className="text-app-text-2">
            This report confirms pre-submission readiness for <strong>{project.name}</strong>. Static analysis, hardware remote-control navigation tests, and store asset conformity checks have been conducted in accordance with LG Content Store Developer Guidelines.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 font-mono">
            <div className="rounded bg-surface p-2 border border-border">
              <span className="text-muted block text-[10px]">Test Hardware:</span>
              <span className="text-app-text font-medium">{project.deviceTested}</span>
            </div>
            <div className="rounded bg-surface p-2 border border-border">
              <span className="text-muted block text-[10px]">Audit Checks:</span>
              <span className="text-app-text font-medium">14 of 14 Completed</span>
            </div>
            <div className="rounded bg-surface p-2 border border-border">
              <span className="text-muted block text-[10px]">Release IPK:</span>
              <span className="text-app-text font-medium">1.8 MB (Validated)</span>
            </div>
            <div className="rounded bg-surface p-2 border border-border">
              <span className="text-muted block text-[10px]">Submission State:</span>
              <span className="text-app-text font-medium">{project.reviewStage}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Automated Checks Matrix */}
        <section className="py-6 border-b border-border print-avoid-break">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            2. Codebase Certification Audit (14 Checks)
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border font-mono text-[10px] text-muted">
                <th className="py-2">Check Name</th>
                <th className="py-2">Target File</th>
                <th className="py-2">Severity</th>
                <th className="py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {findings.map((f) => (
                <tr key={f.id} className="py-2">
                  <td className="py-2 font-medium text-app-text">{f.check}</td>
                  <td className="py-2 font-mono text-muted text-[11px]">{f.file}</td>
                  <td className="py-2 uppercase font-mono text-[10px] font-bold text-muted">
                    {f.severity}
                  </td>
                  <td className="py-2 text-right font-medium">
                    <span className={f.status === 'Fixed' ? 'text-success' : 'text-error'}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 3: Store Graphics Conformity */}
        <section className="py-6 border-b border-border print-avoid-break">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            3. Store Asset Specifications
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border font-mono text-[10px] text-muted">
                <th className="py-2">Asset Name</th>
                <th className="py-2">Filename</th>
                <th className="py-2">Expected Dimensions</th>
                <th className="py-2">Max Weight</th>
                <th className="py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {storeAssets.map((a) => (
                <tr key={a.id}>
                  <td className="py-2 font-medium text-app-text">{a.name}</td>
                  <td className="py-2 font-mono text-muted text-[11px]">{a.fileName}</td>
                  <td className="py-2 font-mono text-app-text">{a.expectedSpec.dimensions}</td>
                  <td className="py-2 font-mono text-muted">{a.expectedSpec.maxWeight}</td>
                  <td className="py-2 text-right uppercase font-mono font-bold text-success">
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 4: Next Steps & Batch Rollout */}
        <section className="pt-6 text-xs text-app-text-2 space-y-2">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            4. Catalog Rollout Recommendation
          </h2>
          <p>
            Upon approval of App #1 ({project.name}), the packaging and validation template will be applied across the remaining 39 catalog titles. Estimated turnaround for batch submissions: 3-5 days per wave of 10 applications.
          </p>
        </section>
      </article>
    </div>
  );
};
