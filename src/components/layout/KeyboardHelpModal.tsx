import React from 'react';
import { Modal } from '../ui/Modal';
import { useAppStore } from '../../store';

export const KeyboardHelpModal: React.FC = () => {
  const { isKeyboardHelpOpen, setKeyboardHelpOpen } = useAppStore();

  const shortcuts = [
    { group: 'TV Remote Controls (When TV is focused)', items: [
      { key: '↑ ↓ ← →', desc: '5-Way Directional D-Pad traversal' },
      { key: 'Enter', desc: 'OK / Select button (keyCode 13)' },
      { key: 'Backspace / Esc', desc: 'webOS Hardware Back Key (keyCode 461)' },
      { key: 'R / G / Y / B', desc: 'LG Remote Dedicated Color Keys (403-406)' },
    ]},
    { group: 'Global Console Shortcuts', items: [
      { key: 'Cmd / Ctrl + K', desc: 'Open Command Palette' },
      { key: 'Esc', desc: 'Close dialogs, drawers, and exit TV focus' },
      { key: '?', desc: 'Open this keyboard reference' },
    ]},
  ];

  return (
    <Modal
      isOpen={isKeyboardHelpOpen}
      onClose={() => setKeyboardHelpOpen(false)}
      title="Keyboard Controls & Shortcuts"
      description="Meridian maps physical desktop keyboards to LG webOS remote hardware events."
      maxWidth="md"
    >
      <div className="space-y-6">
        {shortcuts.map((section) => (
          <div key={section.group}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
              {section.group}
            </h4>
            <div className="divide-y divide-border rounded-md border border-border bg-surface text-xs">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3">
                  <span className="text-app-text font-medium">{item.desc}</span>
                  <kbd className="rounded border border-border bg-elevated px-2 py-1 font-mono text-[11px] text-primary shadow-sh-1">
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
