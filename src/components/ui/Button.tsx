import React, { forwardRef, useState } from 'react';
import { Loader2, Check } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isSuccess = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs gap-1.5 min-h-[36px]',
      md: 'h-10 px-4 text-sm gap-2 min-h-[44px]',
      lg: 'h-12 px-6 text-base gap-2.5 min-h-[48px]',
    }[size];

    const variantClasses = {
      primary:
        'bg-primary text-surface hover:bg-primary-hover active:bg-primary-active border border-primary/20 shadow-sh-1',
      secondary:
        'bg-surface text-app-text border border-border hover:border-app-text/60 active:bg-elevated shadow-sh-1',
      ghost:
        'bg-transparent text-app-text hover:bg-primary/5 active:bg-primary/10 border border-transparent',
      danger:
        'bg-error text-elevated hover:bg-error/90 active:bg-error/80 border border-transparent shadow-sh-1',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-medium font-ui rounded-md transition-all duration-140 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none group ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Loading...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-4 h-4 text-success" />
            <span>Success</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform duration-140 group-hover:translate-x-[-1px]">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-140 group-hover:translate-x-[2px]">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
