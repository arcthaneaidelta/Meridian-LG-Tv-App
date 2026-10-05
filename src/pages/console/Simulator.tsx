import React, { useRef } from 'react';
import { useAppStore } from '../../store';
import { TVFrame } from '../../components/domain/TVFrame';
import { SampleApp } from '../../components/domain/SampleApp';
import { RemoteControl } from '../../components/domain/RemoteControl';
import { useKeyboardRemote, RemoteAction } from '../../lib/useKeyboardRemote';

export const Simulator: React.FC = () => {
  const {
    simulatorBeforeMode,
    simulatorPointerMode,
    addSimulatorKey,
    markSimulatorTest,
    hasCrashed,
    reloadSimulatorApp,
  } = useAppStore();

  const tvContainerRef = useRef<HTMLDivElement>(null);

  // Hook physical keyboard to TV actions
  useKeyboardRemote(tvContainerRef, {
    enabled: true,
    onAction: (action: RemoteAction, keyName: string, code: number) => {
      addSimulatorKey(keyName, code);
    },
  });

  const handleRemoteClick = (action: RemoteAction, keyName: string, code: number) => {
    addSimulatorKey(keyName, code);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            TV Simulator & Hardware Remote
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Verify 5-way D-pad navigation, Back-key exit intercept (code 461), and Magic Remote pointer compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">Keyboard active on TV focus</span>
        </div>
      </div>

      {/* Main 8 / 4 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: TV Frame (col 1-8) */}
        <div ref={tvContainerRef} className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full">
            <TVFrame
              isCrashed={hasCrashed}
              onReload={reloadSimulatorApp}
              hintText="Click the TV canvas or use arrow keys, Enter, Esc/Backspace to operate the remote"
            >
              <SampleApp
                beforeMode={simulatorBeforeMode}
                pointerMode={simulatorPointerMode}
                onRemoteAction={(action, key, code) => addSimulatorKey(key, code)}
                onTestTriggered={(testKey) => markSimulatorTest(testKey)}
              />
            </TVFrame>
          </div>
        </div>

        {/* Right Column: Remote Control, Tests, Log (col 9-12) */}
        <div className="lg:col-span-4 w-full">
          <RemoteControl onActionClick={handleRemoteClick} />
        </div>
      </div>
    </div>
  );
};
