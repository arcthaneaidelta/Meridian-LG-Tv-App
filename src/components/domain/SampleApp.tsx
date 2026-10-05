import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Plus, Tv, Film, Compass, Settings, AlertCircle, ArrowRight } from 'lucide-react';
import { RemoteAction } from '../../lib/useKeyboardRemote';

export interface SampleAppProps {
  isAutonomous?: boolean;
  beforeMode?: boolean;
  pointerMode?: boolean;
  onRemoteAction?: (action: RemoteAction, keyName: string, code: number) => void;
  onTestTriggered?: (testKey: 'moveDpad' | 'openDetail' | 'pressBackToReturn' | 'pressBackOnHomeExit' | 'noFocusLost' | 'pointerFocus') => void;
  onFocusChange?: (tileId: string) => void;
  resolutionScale?: number; // for resolution lab
}

interface TileItem {
  id: string;
  title: string;
  badge: string;
  color: string;
  duration?: string;
  description: string;
}

const ROWS: { title: string; tiles: TileItem[] }[] = [
  {
    title: 'Featured Channels',
    tiles: [
      { id: 'tile-0-0', title: 'Tidepool Live 4K', badge: 'Live', color: '#2F4A47', duration: 'Channel 101', description: 'Continuous deep ocean coral monitoring and maritime weather stream.' },
      { id: 'tile-0-1', title: 'Harbor Dispatch', badge: 'HD', color: '#3A5A56', duration: 'Channel 102', description: 'Port operations, container vessel tracking, and coastal updates.' },
      { id: 'tile-0-2', title: 'Lighthouse Beacon', badge: '4K HDR', color: '#4F6F8F', duration: 'Channel 103', description: 'Panoramic aerial telemetry from historic Pacific Northwest beacons.' },
      { id: 'tile-0-3', title: 'Sound & Solitude', badge: 'Audio', color: '#223735', duration: 'Channel 104', description: 'Binaural wave sounds, marine wildlife calls, and coastal ambience.' },
      { id: 'tile-0-4', title: 'Pacific Current', badge: 'Doc', color: '#1E252B', duration: 'Channel 105', description: 'Explorations into underwater kelp forests and marine conservation.' },
    ],
  },
  {
    title: 'Coastal Documentaries',
    tiles: [
      { id: 'tile-1-0', title: 'The Puget Sound Story', badge: 'Doc', color: '#4F6F8F', duration: '48m', description: 'Chronicle of glacial fjords and maritime industrial history.' },
      { id: 'tile-1-1', title: 'Deep Drift Explorers', badge: '4K', color: '#2F4A47', duration: '1h 12m', description: 'Submersible research into continental shelf trenches.' },
      { id: 'tile-1-2', title: 'Fog & Horn', badge: 'Film', color: '#3A5A56', duration: '34m', description: 'The keepers of Point Reyes lighthouse through winter gale season.' },
      { id: 'tile-1-3', title: 'Archipelago Birds', badge: 'Nature', color: '#8FA79F', duration: '52m', description: 'Migratory flyways across San Juan Island sanctuary.' },
      { id: 'tile-1-4', title: 'Trawler Winter Run', badge: '4K', color: '#14181C', duration: '1h 05m', description: 'High-seas king crab fleet maneuvering Bering Sea swells.' },
    ],
  },
  {
    title: 'Ambient & Audio Feeds',
    tiles: [
      { id: 'tile-2-0', title: 'Rain on Cedar Shingles', badge: 'Audio', color: '#1E252B', duration: 'Loop', description: 'Relaxing hydrophone and rainfall binaural capture.' },
      { id: 'tile-2-1', title: 'Driftwood Dusk Camp', badge: 'Live', color: '#2F4A47', duration: 'Loop', description: 'Dusk shoreline bonfire view from Olympic Peninsula.' },
      { id: 'tile-2-2', title: 'Tidal Basin Rhythms', badge: 'HD', color: '#4F6F8F', duration: 'Loop', description: 'High-tide surges and bird refuge feeding grounds.' },
      { id: 'tile-2-3', title: 'Harbor Mist Ambient', badge: 'Audio', color: '#223735', duration: 'Loop', description: 'Subtle foghorn calls and gentle sea swell audio.' },
      { id: 'tile-2-4', title: 'Pacific Horizon Sunset', badge: '4K', color: '#3A5A56', duration: 'Loop', description: 'Uncut golden hour over open ocean horizons.' },
    ],
  },
];

export const SampleApp: React.FC<SampleAppProps> = ({
  isAutonomous = false,
  beforeMode = false,
  pointerMode = false,
  onRemoteAction,
  onTestTriggered,
  onFocusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<'home' | 'detail' | 'exitDialog'>('home');
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const [focusedTile, setFocusedTile] = useState<TileItem>(ROWS[0].tiles[0]);
  const [lastActiveId, setLastActiveId] = useState<string>('tile-0-0');
  const [isFocusLost, setIsFocusLost] = useState<boolean>(false);
  const [scaleFactor, setScaleFactor] = useState(0.5);

  // Directional movement tracking for tests
  const directionsMoved = useRef(new Set<string>());

  // Measure container and scale 1920x1080 canvas
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const pWidth = parent.clientWidth;
        const pHeight = parent.clientHeight;
        const sX = pWidth / 1920;
        const sY = pHeight / 1080;
        setScaleFactor(Math.min(sX, sY));
      }
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Handle autonomous animation loop for Hero
  const autoStepRef = useRef(0);
  useEffect(() => {
    if (!isAutonomous) return;

    const autonomousScript = [
      { action: 'RIGHT' as RemoteAction, key: 'ArrowRight', code: 39 },
      { action: 'RIGHT' as RemoteAction, key: 'ArrowRight', code: 39 },
      { action: 'DOWN' as RemoteAction, key: 'ArrowDown', code: 40 },
      { action: 'RIGHT' as RemoteAction, key: 'ArrowRight', code: 39 },
      { action: 'OK' as RemoteAction, key: 'Enter', code: 13 },
      { action: 'BACK' as RemoteAction, key: 'Escape', code: 461 },
    ];

    const timer = setInterval(() => {
      const step = autonomousScript[autoStepRef.current % autonomousScript.length];
      autoStepRef.current += 1;
      executeAction(step.action, step.key, step.code);
    }, 1800);

    return () => clearInterval(timer);
  }, [isAutonomous]);

  // Remote Action Dispatcher
  const executeAction = useCallback(
    (action: RemoteAction, keyName: string, code: number) => {
      onRemoteAction?.(action, keyName, code);

      if (currentView === 'exitDialog') {
        if (action === 'BACK' || action === 'LEFT' || action === 'RIGHT' || action === 'OK') {
          // Close exit dialog
          setCurrentView('home');
          setIsFocusLost(false);
          return;
        }
      }

      if (currentView === 'detail') {
        if (action === 'BACK') {
          if (beforeMode) {
            // DEFECT 1: In before mode, returning from detail loses focus!
            setCurrentView('home');
            setIsFocusLost(true);
          } else {
            // FIXED: Focus restored cleanly
            setCurrentView('home');
            setIsFocusLost(false);
            onTestTriggered?.('noFocusLost');
          }
          onTestTriggered?.('pressBackToReturn');
          return;
        }
        return;
      }

      // Home view navigation
      if (currentView === 'home') {
        if (action === 'BACK') {
          if (beforeMode) {
            // DEFECT 2: In before mode, Back on root exits instantly with no modal confirmation
            onTestTriggered?.('pressBackOnHomeExit');
            // Flash screen to indicate abrupt exit
            setIsFocusLost(true);
            setTimeout(() => setIsFocusLost(false), 800);
          } else {
            // FIXED: Shows Exit confirmation dialog
            setCurrentView('exitDialog');
            onTestTriggered?.('pressBackOnHomeExit');
          }
          return;
        }

        if (action === 'OK') {
          if (!isFocusLost) {
            setLastActiveId(`tile-${selectedRow}-${selectedCol}`);
            setCurrentView('detail');
            onTestTriggered?.('openDetail');
          }
          return;
        }

        // D-Pad traversal
        let newRow = selectedRow;
        let newCol = selectedCol;

        if (action === 'UP') {
          newRow = Math.max(0, selectedRow - 1);
          directionsMoved.current.add('UP');
        } else if (action === 'DOWN') {
          newRow = Math.min(ROWS.length - 1, selectedRow + 1);
          directionsMoved.current.add('DOWN');
        } else if (action === 'LEFT') {
          newCol = Math.max(0, selectedCol - 1);
          directionsMoved.current.add('LEFT');
        } else if (action === 'RIGHT') {
          // In Before mode: row 1, col 3 traps focus on right
          if (beforeMode && selectedRow === 1 && selectedCol === 3) {
            // Defect: focus trapped!
          } else {
            newCol = Math.min(ROWS[newRow].tiles.length - 1, selectedCol + 1);
          }
          directionsMoved.current.add('RIGHT');
        }

        if (directionsMoved.current.size >= 4) {
          onTestTriggered?.('moveDpad');
        }

        setSelectedRow(newRow);
        setSelectedCol(newCol);
        setIsFocusLost(false);

        const tile = ROWS[newRow].tiles[newCol];
        setFocusedTile(tile);
        setLastActiveId(tile.id);
        onFocusChange?.(tile.id);
      }
    },
    [currentView, selectedRow, selectedCol, beforeMode, isFocusLost, onRemoteAction, onTestTriggered, onFocusChange]
  );

  // Keyboard listener attached to canvas for manual control
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let act: RemoteAction | null = null;
    let code = e.keyCode;

    if (e.key === 'ArrowUp') act = 'UP';
    else if (e.key === 'ArrowDown') act = 'DOWN';
    else if (e.key === 'ArrowLeft') act = 'LEFT';
    else if (e.key === 'ArrowRight') act = 'RIGHT';
    else if (e.key === 'Enter') act = 'OK';
    else if (e.key === 'Backspace' || e.key === 'Escape') {
      act = 'BACK';
      code = 461;
    }

    if (act) {
      e.preventDefault();
      e.stopPropagation();
      executeAction(act, e.key, code);
    }
  };

  const handlePointerEnterTile = (rIdx: number, cIdx: number) => {
    if (pointerMode) {
      setSelectedRow(rIdx);
      setSelectedCol(cIdx);
      const tile = ROWS[rIdx].tiles[cIdx];
      setFocusedTile(tile);
      setIsFocusLost(false);
      onTestTriggered?.('pointerFocus');
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label="LG TV Sample Application Canvas"
      onKeyDown={handleKeyDown}
      className="relative w-full h-full flex items-center justify-center outline-none focus:outline-none"
    >
      {/* 1920x1080 Native Canvas scaled via transform */}
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'center center',
        }}
        className="relative bg-[#0F1418] text-[#F4F1EC] select-none overflow-hidden font-ui shadow-2xl"
      >
        {/* TV App Shell */}
        {currentView === 'home' && (
          <div className="flex h-full w-full">
            {/* Left Rail Menu */}
            <aside className="w-[180px] bg-[#141B20] border-r border-[#263139] flex flex-col items-center py-10 gap-10">
              <div className="flex items-center gap-3 px-4">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-surface font-semibold text-lg">
                  H
                </div>
              </div>
              <nav className="flex flex-col gap-6 text-[#8A98A4]">
                <div className="flex flex-col items-center gap-2 p-3 text-accent font-semibold cursor-pointer">
                  <Tv className="h-8 w-8 text-accent" />
                  <span className="text-xs">Live</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 hover:text-white cursor-pointer transition-colors">
                  <Film className="h-8 w-8" />
                  <span className="text-xs">Channels</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 hover:text-white cursor-pointer transition-colors">
                  <Compass className="h-8 w-8" />
                  <span className="text-xs">Discover</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 hover:text-white cursor-pointer transition-colors mt-auto">
                  <Settings className="h-8 w-8" />
                  <span className="text-xs">Settings</span>
                </div>
              </nav>
            </aside>

            {/* Main Stage */}
            <main className="flex-1 flex flex-col p-12 overflow-hidden">
              {/* Top Hero Banner */}
              <div className="relative h-[320px] w-full rounded-xl bg-gradient-to-r from-[#172228] to-[#1F2C34] border border-[#2E3C46] p-10 flex flex-col justify-end">
                <div className="absolute top-6 right-8 rounded-full bg-accent/20 border border-accent/40 px-4 py-1 text-xs font-mono text-accent uppercase tracking-wider">
                  webOS 1080p Canvas
                </div>
                <span className="text-sm font-semibold tracking-wider text-secondary uppercase">
                  {focusedTile.duration || 'Selected Channel'}
                </span>
                <h1 className="font-display text-4xl font-medium tracking-tight text-white mt-1">
                  {focusedTile.title}
                </h1>
                <p className="mt-2 text-base text-[#9EB0BE] max-w-2xl line-clamp-2">
                  {focusedTile.description}
                </p>
              </div>

              {/* Rows of Content Tiles */}
              <div className="mt-8 flex flex-col gap-8 flex-1 overflow-hidden">
                {ROWS.map((row, rIdx) => (
                  <div key={row.title} className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-[#8FA79F] tracking-wide">
                      {row.title}
                    </h2>
                    <div className="flex gap-6">
                      {row.tiles.map((tile, cIdx) => {
                        const isFocused = !isFocusLost && selectedRow === rIdx && selectedCol === cIdx;
                        return (
                          <div
                            key={tile.id}
                            id={tile.id}
                            onClick={() => {
                              setSelectedRow(rIdx);
                              setSelectedCol(cIdx);
                              executeAction('OK', 'Enter', 13);
                            }}
                            onMouseEnter={() => handlePointerEnterTile(rIdx, cIdx)}
                            className={`relative h-[160px] w-[300px] rounded-lg p-5 flex flex-col justify-between cursor-pointer transition-all duration-140 ${
                              isFocused
                                ? 'outline outline-4 outline-accent scale-105 z-20 shadow-2xl'
                                : 'opacity-85 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: tile.color }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="rounded bg-black/40 px-2.5 py-0.5 text-xs font-mono text-white">
                                {tile.badge}
                              </span>
                              <Tv className="h-5 w-5 text-white/50" />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-white drop-shadow">
                                {tile.title}
                              </h3>
                              <span className="text-xs text-white/70">{tile.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}

        {/* Detail View */}
        {currentView === 'detail' && (
          <div className="flex h-full w-full bg-[#12171B] p-16 flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#28333D] pb-6">
              <div className="flex items-center gap-4">
                <span className="rounded-md bg-primary px-3 py-1 text-sm font-semibold text-white">
                  {focusedTile.badge}
                </span>
                <span className="text-sm font-mono text-[#8FA79F]">{focusedTile.duration}</span>
              </div>
              <span className="font-mono text-xs text-muted">Press Back (ESC) to return</span>
            </div>

            <div className="max-w-3xl my-auto">
              <h1 className="font-display text-5xl font-medium tracking-tight text-white">
                {focusedTile.title}
              </h1>
              <p className="mt-6 text-xl text-[#B0C0CE] leading-relaxed">
                {focusedTile.description}
              </p>
              <div className="mt-10 flex gap-6">
                <button className="flex items-center gap-3 rounded-lg bg-accent px-8 py-4 font-semibold text-white shadow-xl outline outline-4 outline-accent">
                  <Play className="h-6 w-6 fill-current" />
                  <span>Watch Broadcast</span>
                </button>
                <button className="flex items-center gap-3 rounded-lg bg-[#222B32] border border-[#3C4A56] px-8 py-4 font-semibold text-white hover:bg-[#2C3842]">
                  <Plus className="h-6 w-6" />
                  <span>Add to Guide</span>
                </button>
              </div>
            </div>

            <div className="text-sm font-mono text-[#6A7885]">
              LG webOS Runtime: video stream connected (1080p60 H.264)
            </div>
          </div>
        )}

        {/* Exit Confirmation Dialog */}
        {currentView === 'exitDialog' && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-8">
            <div className="w-[600px] rounded-2xl bg-[#1A2228] border-2 border-[#384652] p-10 text-center shadow-sh-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent mb-4">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl font-medium text-white">Exit Harbor TV?</h2>
              <p className="mt-3 text-base text-[#9EB0BE]">
                Are you sure you want to close the channel player and return to LG webOS launcher?
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className="rounded-lg bg-accent px-6 py-3 font-semibold text-white outline outline-4 outline-accent"
                >
                  Keep Watching
                </button>
                <button
                  onClick={() => setCurrentView('home')}
                  className="rounded-lg bg-[#28333D] px-6 py-3 font-semibold text-[#CBD5E1] hover:bg-[#34424E]"
                >
                  Exit App
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Defect Alert Overlay in Before Mode */}
        {beforeMode && isFocusLost && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-md bg-error px-4 py-2 text-sm font-semibold text-white shadow-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Defect: Focus lost! No active element outline visible.</span>
          </div>
        )}
      </div>
    </div>
  );
};
