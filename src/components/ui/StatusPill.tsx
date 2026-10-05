import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Clock, PlayCircle } from 'lucide-react';

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'live' | 'blocked' | 'in-progress' | 'in-review';

interface StatusPillProps {
  status: StatusVariant | string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  size = 'md',
  className = '',
  interactive = false,
  selected = false,
  onClick,
}) => {
  const normStatus = status.toLowerCase();

  let icon = <Info className="w-3.5 h-3.5" />;
  let colorClass = 'bg-surface text-app-text-2 border-border';
  let displayLabel = label || status;

  if (normStatus === 'live' || normStatus === 'success' || normStatus === 'passed' || normStatus === 'pass' || normStatus === 'approved') {
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />;
    colorClass = 'bg-success/10 text-success border-success/30';
  } else if (normStatus === 'in review' || normStatus === 'in-review' || normStatus === 'warn' || normStatus === 'warning' || normStatus === 'changes requested') {
    icon = <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />;
    colorClass = 'bg-warning/10 text-warning border-warning/30';
  } else if (normStatus === 'blocked' || normStatus === 'error' || normStatus === 'fail' || normStatus === 'failed') {
    icon = <AlertCircle className="w-3.5 h-3.5 text-error shrink-0" />;
    colorClass = 'bg-error/10 text-error border-error/30';
  } else if (normStatus === 'in progress' || normStatus === 'in-progress' || normStatus === 'submitted') {
    icon = <PlayCircle className="w-3.5 h-3.5 text-info shrink-0" />;
    colorClass = 'bg-info/10 text-info border-info/30';
  } else if (normStatus === 'prepared' || normStatus === 'neutral') {
    icon = <Clock className="w-3.5 h-3.5 text-muted shrink-0" />;
    colorClass = 'bg-border/30 text-muted border-border';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs gap-1' : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`inline-flex items-center rounded-pill border select-none transition-colors duration-140 ${sizeClass} ${colorClass} ${
        interactive ? 'cursor-pointer hover:border-primary/50' : ''
      } ${selected ? 'ring-2 ring-primary ring-offset-1 font-semibold' : ''} ${className}`}
    >
      {icon}
      <span>{displayLabel}</span>
    </span>
  );
};
