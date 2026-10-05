import React, { useRef } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface TVFrameProps {
  children: React.ReactNode;
  isCrashed?: boolean;
  onReload?: () => void;
  showSafeArea?: boolean;
  showGrid?: boolean;
  showPointerZones?: boolean;
  className?: string;
  isAutonomous?: boolean;
  hintText?: string;
}

export const TVFrame: React.FC<TVFrameProps> = ({
  children,
  isCrashed = false,
  onReload,
  showSafeArea = false,
  showGrid = false,
  showPointerZones = false,
  className = '',
  hintText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Outer TV Bezel */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-lg border-4 border-[#2A333C] bg-screen p-2 shadow-sh-3 overflow-hidden select-none"
      >
        {/* Inner Screen Display (16:9 ratio) */}
        <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-screen flex items-center justify-center">
          {isCrashed ? (
            /* Crash Screen Simulation */
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-screen p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/20 text-error mb-3">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-mono text-base font-semibold text-surface">
                Uncaught ReferenceError: lastFocusedId is not defined
              </h3>
              <p className="mt-1 font-mono text-xs text-muted max-w-md">
                webOS runtime watchdog terminated main process on route restore.
              </p>
              {onReload && (
                <div className="mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onReload}
                    icon={<RefreshCw className="h-3.5 w-3.5" />}
                  >
                    Reload TV App
                  </Button>
                </div>
              )}
            </div>
          ) : (
            children
          )}

          {/* Safe Area 5% Inset Guide Overlay */}
          {showSafeArea && !isCrashed && (
            <div className="pointer-events-none absolute inset-[5%] z-40 border-2 border-dashed border-accent/60 flex items-start justify-end p-2">
              <span className="rounded bg-accent/90 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white uppercase tracking-wider">
                Title Safe Area (90%)
              </span>
            </div>
          )}

          {/* Alignment Grid Overlay */}
          {showGrid && !isCrashed && (
            <div
              className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10%_10%]"
            />
          )}

          {/* Pointer Zones */}
          {showPointerZones && !isCrashed && (
            <div className="pointer-events-none absolute bottom-4 left-4 z-40 rounded bg-info/80 px-2 py-1 font-mono text-[11px] text-white">
              Pointer Zones: Targets ≥ 48px
            </div>
          )}
        </div>

        {/* Small subtle status LED */}
        <div className="absolute bottom-1 right-3 h-1 w-1 rounded-full bg-accent/60" />
      </div>

      {/* TV Stand Base */}
      <div className="mt-[-2px] h-2 w-28 rounded-b-md bg-[#2A333C] shadow-sm flex items-center justify-center">
        <div className="h-0.5 w-16 bg-[#1A2228] rounded-full" />
      </div>

      {hintText && (
        <p className="mt-2 text-center text-xs text-muted font-ui">{hintText}</p>
      )}
    </div>
  );
};
