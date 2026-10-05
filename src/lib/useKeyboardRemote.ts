import { useEffect } from 'react';

export type RemoteAction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'OK' | 'BACK' | 'RED' | 'GREEN' | 'YELLOW' | 'BLUE';

interface RemoteHandlerOptions {
  enabled: boolean;
  onAction: (action: RemoteAction, rawKey: string, code: number) => void;
}

export function useKeyboardRemote(
  containerRef: React.RefObject<HTMLElement | null>,
  { enabled, onAction }: RemoteHandlerOptions
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if container or its descendant has focus or if container has mouse inside
      const container = containerRef.current;
      if (!container) return;

      const isFocusedWithin = container.contains(document.activeElement);
      if (!isFocusedWithin) return;

      let action: RemoteAction | null = null;
      let webOsCode = e.keyCode;

      switch (e.key) {
        case 'ArrowUp':
          action = 'UP';
          webOsCode = 38;
          break;
        case 'ArrowDown':
          action = 'DOWN';
          webOsCode = 40;
          break;
        case 'ArrowLeft':
          action = 'LEFT';
          webOsCode = 37;
          break;
        case 'ArrowRight':
          action = 'RIGHT';
          webOsCode = 39;
          break;
        case 'Enter':
          action = 'OK';
          webOsCode = 13;
          break;
        case 'Backspace':
        case 'Escape':
          action = 'BACK';
          webOsCode = 461; // LG webOS Back key
          break;
        case 'r':
        case 'R':
          action = 'RED';
          webOsCode = 403; // webOS Red
          break;
        case 'g':
        case 'G':
          action = 'GREEN';
          webOsCode = 404; // webOS Green
          break;
        case 'y':
        case 'Y':
          action = 'YELLOW';
          webOsCode = 405; // webOS Yellow
          break;
        case 'b':
        case 'B':
          action = 'BLUE';
          webOsCode = 406; // webOS Blue
          break;
      }

      if (action) {
        // Prevent default window scrolling with arrow keys
        e.preventDefault();
        e.stopPropagation();
        onAction(action, e.key, webOsCode);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [containerRef, enabled, onAction]);
}
