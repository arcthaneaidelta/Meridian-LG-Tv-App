import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Wand2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAutoFix?: () => void;
  onReset?: () => void;
  isValid?: boolean;
  className?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  onAutoFix,
  onReset,
  isValid = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const lines = value.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col rounded-md border ${isValid ? 'border-border' : 'border-error'} bg-screen shadow-sh-2 overflow-hidden ${className}`}>
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-screen-2 bg-[#192026] px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-secondary">appinfo.json</span>
          <span className={`h-2 w-2 rounded-full ${isValid ? 'bg-success' : 'bg-error animate-pulse'}`} />
          <span className="text-[11px] text-muted">
            {isValid ? 'Valid JSON' : 'Syntax / Schema Error'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onAutoFix && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onAutoFix}
              icon={<Wand2 className="h-3.5 w-3.5 text-accent" />}
              className="text-xs h-7 py-1 px-2.5 bg-screen-2 border-screen-2 text-surface hover:bg-screen"
            >
              Auto-Fix Schema
            </Button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="rounded p-1 text-muted hover:text-surface transition-colors"
              title="Reset Sample appinfo.json"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded p-1 text-muted hover:text-surface transition-colors"
            title="Copy JSON"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body with Gutter */}
      <div className="relative flex flex-1 overflow-auto max-h-[460px] font-mono text-xs">
        {/* Line Numbers Gutter */}
        <div className="select-none bg-[#101417] px-3 py-4 text-right text-muted/60 border-r border-screen-2 min-w-[40px]">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Input */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent p-4 font-mono text-xs text-[#E2E8F0] leading-6 outline-none whitespace-pre selection:bg-primary/40"
          rows={Math.max(14, lines.length)}
          aria-label="appinfo.json editor"
        />
      </div>
    </div>
  );
};
