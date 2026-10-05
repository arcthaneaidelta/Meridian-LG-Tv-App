import React, { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: 96 | 120;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 120,
  strokeWidth = 8,
  className = '',
  label,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Count up animation over 900ms
    const start = animatedScore;
    const end = Math.min(100, Math.max(0, score));
    const duration = 900;
    const startTime = performance.now();

    const updateScore = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        requestAnimationFrame(updateScore);
      }
    };

    requestAnimationFrame(updateScore);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const colorClass =
    animatedScore >= 90
      ? 'text-success'
      : animatedScore >= 70
      ? 'text-primary'
      : animatedScore >= 50
      ? 'text-warning'
      : 'text-error';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
      role="progressbar"
      aria-valuenow={animatedScore}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Launch Readiness Score'}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          className="opacity-40"
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-300 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-3xl font-medium tracking-tight text-app-text">
          {animatedScore}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          / 100
        </span>
      </div>
    </div>
  );
};
