import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { JsonEditor } from '../../components/domain/JsonEditor';
import { validateAppInfo, ValidationRule } from '../../lib/validateAppInfo';
import { CheckCircle2, AlertTriangle, AlertCircle, Wand2, RotateCcw, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ConfigValidator: React.FC = () => {
  const { configJsonText, setConfigJsonText, autoFixConfigJson, resetConfigJson } = useAppStore();
  const [rules, setRules] = useState<ValidationRule[]>([]);
  const [isValidJson, setIsValidJson] = useState(true);

  // Debounced live validation (200ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      const res = validateAppInfo(configJsonText);
      setIsValidJson(res.isValidJson);
      setRules(res.rules);
    }, 200);

    return () => clearTimeout(handler);
  }, [configJsonText]);

  const passedCount = rules.filter((r) => r.status === 'pass').length;
  const failCount = rules.filter((r) => r.status === 'fail').length;
  const warnCount = rules.filter((r) => r.status === 'warn').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            appinfo.json Config Validator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Audit manifest schema rules: reverse-domain ID, semver versioning, resolution, and asset declarations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={autoFixConfigJson}
            icon={<Wand2 className="h-3.5 w-3.5 text-accent" />}
          >
            Auto-Fix All Rules
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetConfigJson}
            icon={<RotateCcw className="h-3.5 w-3.5 text-muted" />}
          >
            Reset Sample
          </Button>
        </div>
      </div>

      {/* 2-Column Layout: Left Editor, Right Live Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editable JSON */}
        <div className="lg:col-span-6 w-full">
          <JsonEditor
            value={configJsonText}
            onChange={setConfigJsonText}
            onAutoFix={autoFixConfigJson}
            onReset={resetConfigJson}
            isValid={isValidJson}
          />
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted font-mono">
            <span>Encoding: UTF-8 · Strict JSON schema</span>
            <span>Target: webOS 4.x - 24 compatible</span>
          </div>
        </div>

        {/* Right Column: 12 Live Validation Rules */}
        <div className="lg:col-span-6 rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
          {/* Rules Summary Header */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <h3 className="font-ui text-base font-semibold text-app-text">
              Manifest Rules Engine
            </h3>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-success font-semibold">{passedCount} Passed</span>
              {failCount > 0 && <span className="text-error font-semibold">{failCount} Failed</span>}
              {warnCount > 0 && <span className="text-warning font-semibold">{warnCount} Warn</span>}
            </div>
          </div>

          {/* Rules List */}
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {rules.map((rule) => {
              const icon =
                rule.status === 'pass' ? (
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                ) : rule.status === 'warn' ? (
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-error shrink-0" />
                );

              const borderClass =
                rule.status === 'pass'
                  ? 'border-border bg-surface/50'
                  : rule.status === 'warn'
                  ? 'border-warning/30 bg-warning/5'
                  : 'border-error/40 bg-error/5';

              return (
                <div
                  key={rule.id}
                  className={`rounded-md border p-3 text-xs transition-colors duration-140 ${borderClass}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 font-semibold text-app-text">
                      {icon}
                      <span>{rule.name}</span>
                    </div>
                    <span
                      className={`font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        rule.status === 'pass'
                          ? 'bg-success/15 text-success'
                          : rule.status === 'warn'
                          ? 'bg-warning/15 text-warning'
                          : 'bg-error/15 text-error'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-app-text-2 pl-6">{rule.message}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-[11px] text-muted">
            <Info className="h-3.5 w-3.5 shrink-0" />
            <span>Exact manifest parameters verified against current LG Seller Lounge guidelines.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
