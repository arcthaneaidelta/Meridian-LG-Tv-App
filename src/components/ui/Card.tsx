import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'elevated' | 'screen' | 'screen-2';
  interactive?: boolean;
  selected?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  interactive = false,
  selected = false,
  className = '',
  ...props
}) => {
  const bgClasses = {
    surface: 'bg-surface text-app-text border-border',
    elevated: 'bg-elevated text-app-text border-border',
    screen: 'bg-screen text-surface border-screen-2',
    'screen-2': 'bg-screen-2 text-surface border-screen-2',
  }[variant];

  return (
    <div
      className={`rounded-md border p-5 transition-all duration-140 ${bgClasses} ${
        interactive
          ? 'cursor-pointer hover:border-secondary hover:-translate-y-0.5 hover:shadow-sh-2 active:translate-y-0'
          : 'shadow-sh-1'
      } ${selected ? 'border-primary ring-1 ring-primary' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
