import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  highlightLines = [],
  className = '',
}) => {
  const lines = code.trim().split('\n');

  return (
    <div className={`overflow-x-auto rounded-md border border-screen-2 bg-screen p-4 font-mono text-xs text-[#E2E8F0] shadow-sh-1 ${className}`}>
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightLines.includes(lineNum);
            return (
              <tr
                key={idx}
                className={isHighlighted ? 'bg-primary/25 text-white' : 'hover:bg-screen-2/40'}
              >
                <td className="w-8 select-none pr-4 text-right text-muted opacity-60">
                  {lineNum}
                </td>
                <td className="whitespace-pre font-mono">{line}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface DiffViewProps {
  beforeCode: string;
  afterCode: string;
  mode: 'before' | 'after' | 'split';
  className?: string;
}

export const DiffView: React.FC<DiffViewProps> = ({ beforeCode, afterCode, mode, className = '' }) => {
  if (mode === 'before') {
    return (
      <div className={className}>
        <div className="mb-2 flex items-center justify-between text-xs text-error font-medium">
          <span>Current Defect (Before Fix)</span>
          <span className="font-mono text-[11px] bg-error/15 px-2 py-0.5 rounded">Fails LG Review</span>
        </div>
        <CodeBlock code={beforeCode} className="border-error/30" />
      </div>
    );
  }

  if (mode === 'after') {
    return (
      <div className={className}>
        <div className="mb-2 flex items-center justify-between text-xs text-success font-medium">
          <span>Verified Remediation (After Fix)</span>
          <span className="font-mono text-[11px] bg-success/15 px-2 py-0.5 rounded">LG Store Approved</span>
        </div>
        <CodeBlock code={afterCode} className="border-success/30" />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div>
        <div className="mb-2 text-xs text-error font-medium">Before Fix (Flagged)</div>
        <CodeBlock code={beforeCode} className="border-error/30" />
      </div>
      <div>
        <div className="mb-2 text-xs text-success font-medium">After Fix (Remediated)</div>
        <CodeBlock code={afterCode} className="border-success/30" />
      </div>
    </div>
  );
};
