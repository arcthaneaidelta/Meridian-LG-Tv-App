import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CornerDownLeft,
  Undo2,
  Home,
  MousePointer,
  RotateCcw,
  CheckCircle2,
  Circle,
  Tv,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusPill } from '../ui/StatusPill';
import { Segmented } from '../ui/Segmented';
import { useAppStore } from '../../store';
import { RemoteAction } from '../../lib/useKeyboardRemote';

interface RemoteControlProps {
  onActionClick: (action: RemoteAction, keyName: string, code: number) => void;
  className?: string;
}

export const RemoteControl: React.FC<RemoteControlProps> = ({ onActionClick, className = '' }) => {
  const {
    simulatorBeforeMode,
    setSimulatorBeforeMode,
    simulatorDevice,
    setSimulatorDevice,
    simulatorPointerMode,
    setSimulatorPointerMode,
    simulatorKeyLog,
    simulatorTestsPassed,
    resetSimulatorTests,
    triggerCrashSimulation,
    hasCrashed,
  } = useAppStore();

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const triggerKey = (action: RemoteAction, label: string, code: number) => {
    setActiveKey(action);
    setTimeout(() => setActiveKey(null), 180);
    onActionClick(action, label, code);
  };

  const devices = [
    'LG OLED C2 55" (webOS 22)',
    'LG QNED 65" (webOS 23)',
    'LG UHD 50" (webOS 6.0)',
    'webOS TV Emulator (Official)',
  ];

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Before / After Defect Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-md border border-border bg-surface p-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            QA Mode
          </span>
          <p className="text-xs text-app-text-2">
            {simulatorBeforeMode
              ? 'Simulating unhandled Back key & lost focus defect'
              : 'All webOS focus & navigation handlers active'}
          </p>
        </div>
        <Segmented
          size="sm"
          value={simulatorBeforeMode ? 'before' : 'after'}
          onChange={(val) => setSimulatorBeforeMode(val === 'before')}
          options={[
            { value: 'before', label: 'Before fix (Defects)' },
            { value: 'after', label: 'After fix (Store-ready)' },
          ]}
        />
      </div>

      {/* Device Selector & Pointer Mode */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Tv className="h-4 w-4 text-muted" />
          <select
            value={simulatorDevice}
            onChange={(e) => setSimulatorDevice(e.target.value)}
            className="rounded border border-border bg-elevated px-2.5 py-1 text-xs text-app-text outline-none hover:border-muted focus:border-primary"
          >
            {devices.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setSimulatorPointerMode(!simulatorPointerMode)}
          className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium transition-all ${
            simulatorPointerMode
              ? 'border-primary bg-primary text-surface'
              : 'border-border bg-elevated text-app-text hover:bg-surface'
          }`}
          title="Toggle LG Magic Remote Air-Mouse Pointer"
        >
          <MousePointer className="h-3.5 w-3.5" />
          <span>Magic Remote Pointer</span>
        </button>
      </div>

      {/* Visual Remote Control Unit */}
      <div className="mx-auto w-full max-w-[280px] rounded-2xl border-2 border-border bg-[#161D22] p-5 shadow-sh-2 text-surface">
        <div className="text-center pb-3 border-b border-[#2A3742] flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider text-[#8FA79F] uppercase">
            webOS Remote
          </span>
          <span className="h-2 w-2 rounded-full bg-accent/80 animate-pulse" />
        </div>

        {/* Home & Back Row */}
        <div className="mt-4 flex items-center justify-between px-2">
          <button
            onClick={() => triggerKey('BACK', 'Back', 461)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#2E3E4C] bg-[#1E2831] text-[#CBD5E1] transition-all active:scale-95 ${
              activeKey === 'BACK' ? 'bg-accent text-white scale-95' : 'hover:bg-[#2A3845]'
            }`}
            title="webOS Back Key (Code 461 / ESC)"
            aria-label="Back"
          >
            <Undo2 className="h-5 w-5" />
          </button>
          <span className="text-[11px] font-mono text-muted">D-PAD</span>
          <button
            onClick={() => triggerKey('BACK', 'Home', 36)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#2E3E4C] bg-[#1E2831] text-[#CBD5E1] transition-all active:scale-95 ${
              activeKey === 'HOME' ? 'bg-primary text-white scale-95' : 'hover:bg-[#2A3845]'
            }`}
            title="webOS Home Key"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </button>
        </div>

        {/* 5-Way Directional D-Pad */}
        <div className="my-5 flex flex-col items-center">
          {/* UP */}
          <button
            onClick={() => triggerKey('UP', 'Up', 38)}
            className={`flex h-12 w-14 items-center justify-center rounded-t-xl border-t border-x border-[#334454] bg-[#222E38] text-white transition-all active:bg-accent ${
              activeKey === 'UP' ? 'bg-accent scale-95' : 'hover:bg-[#2C3B47]'
            }`}
            aria-label="Up"
          >
            <ArrowUp className="h-5 w-5" />
          </button>

          {/* LEFT - OK - RIGHT */}
          <div className="flex items-center">
            <button
              onClick={() => triggerKey('LEFT', 'Left', 37)}
              className={`flex h-14 w-12 items-center justify-center rounded-l-xl border-l border-y border-[#334454] bg-[#222E38] text-white transition-all active:bg-accent ${
                activeKey === 'LEFT' ? 'bg-accent scale-95' : 'hover:bg-[#2C3B47]'
              }`}
              aria-label="Left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* OK Button */}
            <button
              onClick={() => triggerKey('OK', 'OK', 13)}
              className={`flex h-14 w-14 items-center justify-center border border-[#3E5265] bg-[#182128] font-bold text-sm tracking-wide text-white transition-all active:scale-95 ${
                activeKey === 'OK' ? 'bg-accent scale-95' : 'hover:bg-[#24313C]'
              }`}
              aria-label="OK"
            >
              OK
            </button>

            <button
              onClick={() => triggerKey('RIGHT', 'Right', 39)}
              className={`flex h-14 w-12 items-center justify-center rounded-r-xl border-r border-y border-[#334454] bg-[#222E38] text-white transition-all active:bg-accent ${
                activeKey === 'RIGHT' ? 'bg-accent scale-95' : 'hover:bg-[#2C3B47]'
              }`}
              aria-label="Right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* DOWN */}
          <button
            onClick={() => triggerKey('DOWN', 'Down', 40)}
            className={`flex h-12 w-14 items-center justify-center rounded-b-xl border-b border-x border-[#334454] bg-[#222E38] text-white transition-all active:bg-accent ${
              activeKey === 'DOWN' ? 'bg-accent scale-95' : 'hover:bg-[#2C3B47]'
            }`}
            aria-label="Down"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>

        {/* Dedicated Color Keys */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-[#2A3742]">
          <button
            onClick={() => triggerKey('RED', 'Red', 403)}
            className="h-5 w-9 rounded-sm bg-red-600 hover:brightness-110 active:scale-95 transition-transform"
            title="Red Key (403)"
            aria-label="Red"
          />
          <button
            onClick={() => triggerKey('GREEN', 'Green', 404)}
            className="h-5 w-9 rounded-sm bg-emerald-600 hover:brightness-110 active:scale-95 transition-transform"
            title="Green Key (404)"
            aria-label="Green"
          />
          <button
            onClick={() => triggerKey('YELLOW', 'Yellow', 405)}
            className="h-5 w-9 rounded-sm bg-amber-500 hover:brightness-110 active:scale-95 transition-transform"
            title="Yellow Key (405)"
            aria-label="Yellow"
          />
          <button
            onClick={() => triggerKey('BLUE', 'Blue', 406)}
            className="h-5 w-9 rounded-sm bg-blue-600 hover:brightness-110 active:scale-95 transition-transform"
            title="Blue Key (406)"
            aria-label="Blue"
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Cheat Chips */}
      <div className="rounded-md border border-border bg-surface p-3 text-xs">
        <span className="font-semibold text-app-text-2 uppercase text-[10px] tracking-wider block mb-2">
          Physical Keyboard Controls
        </span>
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          <span className="rounded bg-elevated px-2 py-0.5 border border-border">↑ ↓ ← → D-Pad</span>
          <span className="rounded bg-elevated px-2 py-0.5 border border-border">Enter : OK</span>
          <span className="rounded bg-elevated px-2 py-0.5 border border-border">Esc/Bksp : Back (461)</span>
          <span className="rounded bg-elevated px-2 py-0.5 border border-border">R / G / Y / B : Color</span>
        </div>
      </div>

      {/* Navigation Tests Verification Checklist */}
      <div className="rounded-md border border-border bg-elevated p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-ui text-sm font-semibold text-app-text">
            Navigation Test Suite
          </h4>
          <button
            onClick={resetSimulatorTests}
            className="text-xs text-muted hover:text-app-text flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
        <ul className="space-y-2 text-xs">
          {[
            { key: 'moveDpad', label: 'Move focus in all 4 directions' },
            { key: 'openDetail', label: 'Open item detail view (OK)' },
            { key: 'pressBackToReturn', label: 'Press Back to return to Home' },
            { key: 'pressBackOnHomeExit', label: 'Press Back on Home shows exit modal' },
            { key: 'noFocusLost', label: 'No focus lost after route change' },
            { key: 'pointerFocus', label: 'Pointer mode focuses interactive elements' },
          ].map((test) => {
            const passed = simulatorTestsPassed[test.key as keyof typeof simulatorTestsPassed];
            return (
              <li key={test.key} className="flex items-center gap-2">
                {passed ? (
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-border shrink-0" />
                )}
                <span className={passed ? 'text-app-text font-medium' : 'text-muted'}>
                  {test.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Key Event Log */}
      <div className="rounded-md border border-border bg-screen p-3 font-mono text-[11px] text-surface">
        <div className="flex items-center justify-between pb-1.5 border-b border-screen-2 text-[#8FA79F]">
          <span>webOS Key Event Stream</span>
          <span className="text-[10px]">Last 10 events</span>
        </div>
        <div className="mt-2 space-y-1 max-h-28 overflow-y-auto">
          {simulatorKeyLog.length === 0 ? (
            <p className="text-muted italic text-[10px]">No key events yet. Press any remote key.</p>
          ) : (
            simulatorKeyLog.map((k) => (
              <div key={k.id} className="flex justify-between items-center text-[#B0C0CE]">
                <span>
                  Key <span className="text-accent">{k.key}</span> (code: {k.code})
                </span>
                <span className="text-[9px] text-muted">{k.time}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Crash Simulation Trigger */}
      <div className="pt-2 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={triggerCrashSimulation}
          className="text-xs text-error hover:bg-error/10"
        >
          Simulate Unhandled Crash
        </Button>
      </div>
    </div>
  );
};
