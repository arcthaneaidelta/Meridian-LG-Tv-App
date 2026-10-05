import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'block' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'line' }) => {
  const variantClass = {
    line: 'h-4 w-full rounded',
    block: 'h-24 w-full rounded-md',
    circle: 'h-10 w-10 rounded-full',
  }[variant];

  return <div className={`animate-pulse bg-border/60 ${variantClass} ${className}`} />;
};
