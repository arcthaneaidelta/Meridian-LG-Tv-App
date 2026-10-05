import React from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';

export interface PipelineStage {
  id: number;
  name: string;
  command: string;
}

interface PipelineProps {
  currentStage: number; // 0: idle, 1..6
  status: 'idle' | 'running' | 'done' | 'failed';
  className?: string;
}

const STAGES: PipelineStage[] = [
  { id: 1, name: 'Lint', command: 'meridian lint' },
  { id: 2, name: 'Minify', command: 'meridian minify' },
  { id: 3, name: 'Verify Config', command: 'verify appinfo.json' },
  { id: 4, name: 'Package IPK', command: 'ares-package' },
  { id: 5, name: 'Validate', command: 'meridian validate' },
  { id: 6, name: 'Ready', command: 'checksum sha256' },
];

export const Pipeline: React.FC<PipelineProps> = ({ currentStage, status, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto py-4 ${className}`}>
      <div className="flex items-center justify-between min-w-[620px] px-2">
        {STAGES.map((stage, idx) => {
          const isDone = currentStage > stage.id || (currentStage === 6 && status === 'done');
          const isActive = currentStage === stage.id && status === 'running';
          const isFailed = currentStage === stage.id && status === 'failed';
          const isPending = currentStage < stage.id && status !== 'failed';

          let stateClass = 'bg-surface text-muted border-border';
          let icon = <span className="text-xs font-mono">{stage.id}</span>;

          if (isDone) {
            stateClass = 'bg-success text-surface border-success';
            icon = <Check className="h-3.5 w-3.5" />;
          } else if (isActive) {
            stateClass = 'bg-primary text-surface border-primary ring-4 ring-primary/20 animate-pulse';
            icon = <Loader2 className="h-3.5 w-3.5 animate-spin" />;
          } else if (isFailed) {
            stateClass = 'bg-error text-surface border-error ring-4 ring-error/20';
            icon = <AlertCircle className="h-3.5 w-3.5" />;
          }

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border font-semibold shadow-sm transition-all duration-200 ${stateClass}`}
                >
                  {icon}
                </div>
                <div className="text-center">
                  <span className="block font-ui text-xs font-semibold text-app-text">
                    {stage.name}
                  </span>
                  <span className="block font-mono text-[10px] text-muted">{stage.command}</span>
                </div>
              </div>

              {/* Connecting Line */}
              {idx < STAGES.length - 1 && (
                <div className="flex-1 mx-3 mb-6 h-0.5 relative bg-border">
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      currentStage > stage.id ? 'bg-success' : 'bg-transparent'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
