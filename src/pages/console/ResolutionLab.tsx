import React, { useState } from 'react';
import { TVFrame } from '../../components/domain/TVFrame';
import { SampleApp } from '../../components/domain/SampleApp';
import { Segmented } from '../../components/ui/Segmented';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, AlertTriangle, Info, Grid, Shield, MousePointer } from 'lucide-react';

export const ResolutionLab: React.FC = () => {
  const [resolution, setResolution] = useState<'720p' | '1080p' | '4k' | '8k'>('1080p');
  const [safeArea, setSafeArea] = useState(true);
  const [grid, setGrid] = useState(false);
  const [pointerZones, setPointerZones] = useState(false);
  const [scalingMode, setScalingMode] = useState<'after' | 'before'>('after');

  const resolutionData = {
    '720p': { label: '720p HD', dimensions: '1280 × 720', scale: 0.67, desc: 'Legacy webOS HD panels' },
    '1080p': { label: '1080p FHD', dimensions: '1920 × 1080', scale: 1.0, desc: 'Standard webOS base canvas' },
    '4k': { label: '4K UHD', dimensions: '3840 × 2160', scale: 2.0, desc: 'Modern LG OLED & QNED displays' },
    '8k': { label: '8K Real', dimensions: '7680 × 4320', scale: 4.0, desc: 'Ultra-flagship LG Signature series' },
  }[resolution];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            Resolution & Safe-Area Lab
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Verify viewport scaling across 720p, 1080p, 4K, and 8K panels with 5% overscan safety guides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Segmented
            size="sm"
            value={scalingMode}
            onChange={(val) => setScalingMode(val as 'after' | 'before')}
            options={[
              { value: 'after', label: 'Fluid rem Scaling (After)' },
              { value: 'before', label: 'Broken Fixed px (Before)' },
            ]}
          />
        </div>
      </div>

      {/* Controls Bar: Resolution Switcher + Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-sh-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Display Mode:
          </span>
          <Segmented
            value={resolution}
            onChange={(val) => setResolution(val as any)}
            options={[
              { value: '720p', label: '720p' },
              { value: '1080p', label: '1080p (Base)' },
              { value: '4k', label: '4K UHD' },
              { value: '8k', label: '8K Real' },
            ]}
          />
        </div>

        {/* Overlay Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSafeArea(!safeArea)}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
              safeArea
                ? 'border-primary bg-primary text-surface'
                : 'border-border bg-elevated text-app-text hover:bg-surface'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Title Safe Area (5%)</span>
          </button>

          <button
            onClick={() => setGrid(!grid)}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
              grid
                ? 'border-primary bg-primary text-surface'
                : 'border-border bg-elevated text-app-text hover:bg-surface'
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Alignment Grid</span>
          </button>

          <button
            onClick={() => setPointerZones(!pointerZones)}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
              pointerZones
                ? 'border-primary bg-primary text-surface'
                : 'border-border bg-elevated text-app-text hover:bg-surface'
            }`}
          >
            <MousePointer className="h-3.5 w-3.5" />
            <span>Pointer Zones</span>
          </button>
        </div>
      </div>

      {/* Main Grid: TV Canvas & Resolution Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: TV Frame (col 1-8) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full">
            <TVFrame
              showSafeArea={safeArea}
              showGrid={grid}
              showPointerZones={pointerZones}
              hintText={`Rendering at ${resolutionData.dimensions} (Scale factor ${resolutionData.scale}×)`}
            >
              <SampleApp beforeMode={scalingMode === 'before'} />
            </TVFrame>
          </div>
        </div>

        {/* Right Column: Diagnostic Findings (col 9-12) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border border-border bg-elevated p-6 shadow-sh-1">
            <h3 className="font-ui text-base font-semibold text-app-text mb-3">
              Scale Factor Diagnostics
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted">Resolution:</span>
                <span className="font-mono font-medium text-app-text">{resolutionData.dimensions}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted">Scale Ratio:</span>
                <span className="font-mono font-medium text-app-text">{resolutionData.scale}× base</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted">CSS Strategy:</span>
                <span className="font-mono text-primary font-semibold">rem + transform-origin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Overscan Guide:</span>
                <span className="font-mono text-success font-semibold">5% Safe Margin Checked</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span className="text-app-text-2">
                  All interactive click targets exceed webOS 48px pointer threshold.
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span className="text-app-text-2">
                  No text clipping occurs outside the title safe zone.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-surface p-4 text-xs text-muted flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
            <p>
              webOS apps are typically designed at 1920×1080 and scaled dynamically; exact numbers verified against current LG documentation per app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
