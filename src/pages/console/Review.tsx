import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { Finding, FindingStatus, FindingSeverity } from '../../data/findings';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { Segmented } from '../../components/ui/Segmented';
import { DiffView } from '../../components/domain/CodeBlock';
import {
  FolderTree,
  FileCode2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Check,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const Review: React.FC = () => {
  const {
    findings,
    selectedFindingId,
    setSelectedFindingId,
    updateFindingStatus,
    findingFilterSeverity,
    setFindingFilterSeverity,
    findingFilterFile,
    setFindingFilterFile,
    findingSearchQuery,
    setFindingSearchQuery,
    isTechnicalMode,
  } = useAppStore();

  const [diffMode, setDiffMode] = useState<'before' | 'after'>('after');

  // File tree mock items
  const fileTree = [
    { name: 'All Files', path: 'all' },
    { name: 'js/nav.js', path: 'js/nav.js' },
    { name: 'js/app.js', path: 'js/app.js' },
    { name: 'css/main.css', path: 'css/main.css' },
    { name: 'appinfo.json', path: 'appinfo.json' },
    { name: 'index.html', path: 'index.html' },
    { name: 'assets/', path: 'assets/' },
  ];

  // Filter & Search
  const filteredFindings = useMemo(() => {
    return findings.filter((f) => {
      const matchSeverity =
        findingFilterSeverity === 'all' || f.severity === findingFilterSeverity;
      const matchFile =
        findingFilterFile === 'all' || f.file.startsWith(findingFilterFile);
      const matchSearch =
        findingSearchQuery.trim() === '' ||
        f.check.toLowerCase().includes(findingSearchQuery.toLowerCase()) ||
        f.file.toLowerCase().includes(findingSearchQuery.toLowerCase());
      return matchSeverity && matchFile && matchSearch;
    });
  }, [findings, findingFilterSeverity, findingFilterFile, findingSearchQuery]);

  const activeFinding = findings.find((f) => f.id === selectedFindingId) || null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            14-Point Code Review & Audit
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Static analysis of keypress interceptors, focus persistence, memory lifecycle, and webOS security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">
            {findings.filter((f) => f.status === 'Fixed').length} / 14 Verified
          </span>
        </div>
      </div>

      {/* Main 3-Pane Structure: Left File Tree, Center Findings Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: File Tree (col 1-3) */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-surface p-4 shadow-sh-1">
          <div className="flex items-center gap-2 font-semibold text-xs text-app-text uppercase tracking-wider mb-3">
            <FolderTree className="h-4 w-4 text-primary" />
            <span>Project Files</span>
          </div>

          <nav className="space-y-1 text-xs">
            {fileTree.map((item) => (
              <button
                key={item.path}
                onClick={() => setFindingFilterFile(item.path)}
                className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 transition-colors text-left ${
                  findingFilterFile === item.path
                    ? 'bg-primary text-surface font-semibold shadow-sh-1'
                    : 'text-app-text-2 hover:bg-elevated hover:text-app-text'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-mono text-[10px] opacity-75">
                  {item.path === 'all'
                    ? findings.length
                    : findings.filter((f) => f.file.startsWith(item.path)).length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Center Pane: Findings Table (col 4-12) */}
        <div className="lg:col-span-9 rounded-lg border border-border bg-elevated shadow-sh-1 overflow-hidden">
          {/* Table Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 bg-surface/50">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-muted" />
              <input
                type="text"
                placeholder="Search audit checks..."
                value={findingSearchQuery}
                onChange={(e) => setFindingSearchQuery(e.target.value)}
                className="w-full rounded-md border border-border bg-elevated pl-9 pr-3 py-1.5 text-xs text-app-text outline-none focus:border-primary"
              />
            </div>

            {/* Severity Filter Chips */}
            <div className="flex items-center gap-1 text-xs">
              {(['all', 'blocker', 'major', 'minor'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFindingFilterSeverity(sev)}
                  className={`rounded px-2.5 py-1 font-mono text-[11px] font-semibold uppercase transition-colors ${
                    findingFilterSeverity === sev
                      ? 'bg-primary text-surface'
                      : 'bg-elevated text-app-text hover:bg-surface border border-border'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface text-muted uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-4 font-semibold">Severity</th>
                  <th className="py-2.5 px-4 font-semibold">Check & Finding</th>
                  <th className="py-2.5 px-4 font-semibold">File</th>
                  <th className="py-2.5 px-4 font-semibold">Effort</th>
                  <th className="py-2.5 px-4 font-semibold">Status</th>
                  <th className="py-2.5 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFindings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-muted">
                      No findings match these filters. Try clearing one.
                    </td>
                  </tr>
                ) : (
                  filteredFindings.map((finding) => {
                    const isSelected = selectedFindingId === finding.id;
                    const sevIcon =
                      finding.severity === 'blocker' ? (
                        <AlertCircle className="h-3.5 w-3.5 text-error shrink-0" />
                      ) : finding.severity === 'major' ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
                      ) : (
                        <AlertTriangle className="h-3.5 w-3.5 text-info shrink-0" />
                      );

                    return (
                      <tr
                        key={finding.id}
                        onClick={() => setSelectedFindingId(finding.id)}
                        className={`hover:bg-surface/80 cursor-pointer transition-colors ${
                          isSelected ? 'bg-primary/5 border-l-2 border-primary' : ''
                        }`}
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${
                              finding.severity === 'blocker'
                                ? 'bg-error/15 text-error'
                                : finding.severity === 'major'
                                ? 'bg-warning/15 text-warning'
                                : 'bg-info/15 text-info'
                            }`}
                          >
                            {sevIcon}
                            <span>{finding.severity}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-app-text max-w-md">
                          <div className="truncate">{finding.check}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-muted whitespace-nowrap">
                          {finding.file}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-muted whitespace-nowrap">
                          ~{finding.effortMinutes}m
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                              finding.status === 'Fixed'
                                ? 'text-success'
                                : finding.status === 'Open'
                                ? 'text-error'
                                : 'text-muted'
                            }`}
                          >
                            {finding.status === 'Fixed' ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <AlertCircle className="h-3.5 w-3.5" />
                            )}
                            <span>{finding.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right pr-4">
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
      </div>

      {/* Right Drawer: Finding Details with Code Diff */}
      <Drawer
        isOpen={Boolean(activeFinding)}
        onClose={() => setSelectedFindingId(null)}
        title={activeFinding?.check}
        subtitle={`Location: ${activeFinding?.file} (${activeFinding?.lineRange})`}
        width="lg"
      >
        {activeFinding && (
          <div className="space-y-5">
            {/* Severity + Status Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-xs uppercase font-bold text-accent">
                Severity: {activeFinding.severity}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant={activeFinding.status === 'Fixed' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() =>
                    updateFindingStatus(
                      activeFinding.id,
                      activeFinding.status === 'Fixed' ? 'Open' : 'Fixed'
                    )
                  }
                  icon={activeFinding.status === 'Fixed' ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                  className="text-xs"
                >
                  {activeFinding.status === 'Fixed' ? 'Mark as Open' : 'Mark as Fixed'}
                </Button>
              </div>
            </div>

            {/* Plain English / Technical Explanation */}
            <div className="rounded-md border border-border bg-surface p-4 text-xs">
              <span className="font-mono text-[10px] uppercase font-bold text-primary block mb-1">
                {isTechnicalMode ? 'Technical Root Cause Analysis:' : 'Plain English Impact:'}
              </span>
              <p className="text-app-text leading-relaxed">
                {isTechnicalMode
                  ? activeFinding.explanationTechnical
                  : activeFinding.explanationPlain}
              </p>
            </div>

            {/* Why LG Cares */}
            <div className="rounded-md border border-warning/30 bg-warning/5 p-4 text-xs">
              <span className="font-mono text-[10px] uppercase font-bold text-warning block mb-1">
                Why LG Review Bounces This:
              </span>
              <p className="text-app-text-2 leading-relaxed">{activeFinding.whyLGCares}</p>
            </div>

            {/* Code Diff Showcase */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-app-text">
                  Source Code Remediation
                </span>
                <Segmented
                  size="sm"
                  value={diffMode}
                  onChange={(val) => setDiffMode(val as 'before' | 'after')}
                  options={[
                    { value: 'before', label: 'Before Fix' },
                    { value: 'after', label: 'After Fix' },
                  ]}
                />
              </div>

              <DiffView
                beforeCode={activeFinding.beforeCode}
                afterCode={activeFinding.afterCode}
                mode={diffMode}
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
