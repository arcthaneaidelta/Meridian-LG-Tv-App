import React, { useState } from 'react';
import { rejectionScenarios } from '../../data/rejections';
import { Accordion } from '../../components/ui/Accordion';
import { Segmented } from '../../components/ui/Segmented';
import { ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RejectionLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState<Record<string, 'before' | 'after'>>({});

  const getMode = (id: string) => toggleState[id] || 'after';
  const setMode = (id: string, mode: 'before' | 'after') => {
    setToggleState((prev) => ({ ...prev, [id]: mode }));
  };

  const accordionItems = rejectionScenarios.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: `Target: ${item.codeFile}`,
    content: (
      <div className="space-y-4">
        {/* Symptom & LG Reason */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-surface p-3.5">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase text-error mb-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Symptom in Review
            </span>
            <p className="text-xs text-app-text-2 leading-relaxed">{item.symptom}</p>
          </div>

          <div className="rounded-md border border-border bg-surface p-3.5">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase text-warning mb-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Why LG Flags It
            </span>
            <p className="text-xs text-app-text-2 leading-relaxed">{item.whyLgFlags}</p>
          </div>
        </div>

        {/* The Fix & Before/After Toggle */}
        <div className="rounded-md border border-border bg-elevated p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase text-success flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Meridian Remediation Plan
              </span>
              <p className="mt-0.5 text-xs text-app-text-2">{item.fixSummary}</p>
            </div>

            <Segmented
              size="sm"
              value={getMode(item.id)}
              onChange={(val) => setMode(item.id, val as 'before' | 'after')}
              options={[
                { value: 'before', label: 'Before Fix' },
                { value: 'after', label: 'After Fix' },
              ]}
            />
          </div>

          <div className="rounded border border-screen-2 bg-screen p-3 font-mono text-xs text-surface overflow-x-auto">
            <div className="text-[10px] text-muted uppercase mb-1">
              {getMode(item.id) === 'before' ? 'Flagged Code State:' : 'Verified Implementation:'}
            </div>
            <pre className="text-xs text-[#E2E8F0] whitespace-pre-wrap">
              {getMode(item.id) === 'before' ? item.rootCause : item.fixApplied}
            </pre>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => navigate(item.screenTarget)}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <span>Test this scenario in console</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="rejections" className="py-24 border-b border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            Rejection Knowledge Base
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-app-text tracking-tight">
            Six ways LG review bounces an app. And how each is resolved.
          </h2>
          <p className="mt-3 text-base text-app-text-2">
            The #1 fear in webOS publishing is review bounce loops. Having solved these exact failure modes repeatedly means your submission clears the first time.
          </p>
        </div>

        <Accordion items={accordionItems} defaultOpenId="rej-1" className="max-w-4xl" />
      </div>
    </section>
  );
};
