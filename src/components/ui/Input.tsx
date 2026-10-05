import React, { forwardRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, helperText, id, className = '', value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '' && String(value).length > 0;
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="relative w-full text-left">
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`w-full rounded-md border bg-elevated px-3.5 pt-5 pb-2 text-sm text-app-text transition-all duration-140 outline-none placeholder-transparent ${
              error
                ? 'border-error ring-1 ring-error'
                : success
                ? 'border-success'
                : 'border-border hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/20'
            } ${className}`}
            placeholder={label || 'Input'}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={`pointer-events-none absolute left-3.5 transition-all duration-140 ${
                isFocused || hasValue
                  ? 'top-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted'
                  : 'top-3.5 text-sm text-app-text-2'
              }`}
            >
              {label}
            </label>
          )}
          {error ? (
            <AlertCircle className="absolute right-3 top-3.5 h-4 w-4 text-error" />
          ) : success ? (
            <CheckCircle2 className="absolute right-3 top-3.5 h-4 w-4 text-success" />
          ) : null}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-error">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
