import React from 'react';
import { Check, Clock, AlertTriangle, PlayCircle, Award, Radio } from 'lucide-react';

export type SubmissionStage = 'Prepared' | 'Submitted' | 'In QA' | 'Changes requested' | 'Approved' | 'Live';

interface StepperProps {
  currentStage: SubmissionStage;
  className?: string;
}

const STAGES: { stage: SubmissionStage; label: string; desc: string }[] = [
  { stage: 'Prepared', label: '1. Prepared', desc: 'Pre-flight passed' },
  { stage: 'Submitted', label: '2. Submitted', desc: 'Seller intake' },
  { stage: 'In QA', label: '3. In QA', desc: 'LG verification' },
  { stage: 'Changes requested', label: '4. QA Review', desc: 'Triage loop' },
  { stage: 'Approved', label: '5. Approved', desc: 'Store cleared' },
  { stage: 'Live', label: '6. Live', desc: 'Content Store' },
];

export const Stepper: React.FC<StepperProps> = ({ currentStage, className = '' }) => {
  const stageOrder: SubmissionStage[] = ['Prepared', 'Submitted', 'In QA', 'Changes requested', 'Approved', 'Live'];
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <nav aria-label="LG Content Store Submission Progress" className={`w-full ${className}`}>
      <ol className="flex items-center justify-between overflow-x-auto pb-2">
        {STAGES.map((s, idx) => {
          const isCurrent = currentStage === s.stage;
          const isDone =
            (currentStage === 'Live' && idx <= 5) ||
            (currentStage === 'Approved' && idx <= 4 && s.stage !== 'Changes requested') ||
            (currentStage === 'In QA' && idx <= 2) ||
            (currentStage === 'Submitted' && idx <= 1) ||
            (currentStage === 'Prepared' && idx === 0);
          const isChanges = currentStage === 'Changes requested' && s.stage === 'Changes requested';

          let stateClass = 'border-border bg-surface text-muted';
          let icon = <Clock className="h-4 w-4" />;

          if (isChanges) {
            stateClass = 'border-warning bg-warning text-surface ring-2 ring-warning/30';
            icon = <AlertTriangle className="h-4 w-4 text-surface" />;
          } else if (isCurrent) {
            stateClass = 'border-primary bg-primary text-surface ring-2 ring-primary/30';
            icon = <PlayCircle className="h-4 w-4 text-surface" />;
          } else if (isDone) {
            stateClass = 'border-success bg-success text-surface';
            icon = <Check className="h-4 w-4 text-surface" />;
          }

          if (s.stage === 'Live' && currentStage === 'Live') {
            stateClass = 'border-accent bg-accent text-surface ring-2 ring-accent/30';
            icon = <Award className="h-4 w-4" />;
          }

          return (
            <li
              key={s.stage}
              aria-current={isCurrent ? 'step' : undefined}
              className="flex-1 flex flex-col items-center min-w-[100px] text-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold shadow-sm transition-all duration-200 ${stateClass}`}
              >
                {icon}
              </div>
              <span className={`mt-2 font-ui text-xs font-semibold ${isCurrent ? 'text-primary' : 'text-app-text'}`}>
                {s.label}
              </span>
              <span className="text-[11px] text-muted">{s.desc}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
