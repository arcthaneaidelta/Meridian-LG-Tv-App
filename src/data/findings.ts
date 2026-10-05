export type FindingSeverity = 'blocker' | 'major' | 'minor';
export type FindingStatus = 'Open' | 'Fixed' | 'Won\'t fix';

export interface Finding {
  id: string;
  check: string;
  severity: FindingSeverity;
  file: string;
  lineRange: string;
  status: FindingStatus;
  effortMinutes: number;
  explanationTechnical: string;
  explanationPlain: string;
  whyLGCares: string;
  beforeCode: string;
  afterCode: string;
  affectsReadiness: boolean;
}

export const initialFindings: Finding[] = [
  {
    id: 'f-1',
    check: 'Missing webOS Back key (keyCode 461) handler on root view',
    severity: 'blocker',
    file: 'js/nav.js',
    lineRange: 'L42-L58',
    status: 'Open',
    effortMinutes: 15,
    explanationTechnical: 'The keydown listener fails to intercept webOS hardware back key event (keyCode 461). Default browser behavior triggers an instant process exit or history drop without app state cleanup.',
    explanationPlain: 'When a viewer presses the Back button on their LG remote on the home screen, the app suddenly vanishes without asking for confirmation, causing an immediate LG QA rejection.',
    whyLGCares: 'LG Review Requirement 2.1: The Back key must navigate up the view stack or show a standard exit confirmation dialog before terminating.',
    beforeCode: `// Missing keyCode 461 intercept
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) { // Only checking ESC
    history.back();
  }
});`,
    afterCode: `// Fixed: Intercept webOS keyCode 461 & 27 with exit modal
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 461 || e.keyCode === 27) {
    e.preventDefault();
    if (Router.isRoot()) {
      Modal.confirmExit();
    } else {
      Router.back();
    }
  }
});`,
    affectsReadiness: true,
  },
  {
    id: 'f-2',
    check: 'Focus lost after navigating back from detail route',
    severity: 'blocker',
    file: 'js/app.js',
    lineRange: 'L118-L135',
    status: 'Open',
    effortMinutes: 20,
    explanationTechnical: 'DOM reconstruction on route change discards document.activeElement reference without storing lastFocusedElementId, causing the remote cursor to reset to body.',
    explanationPlain: 'When returning from a video or detail screen, the focus box disappears. The viewer presses arrow keys and nothing moves because no item is highlighted.',
    whyLGCares: 'LG UX Guideline 4.3: Every screen must possess at least one distinctly focused item at all times when operated via 5-way D-pad.',
    beforeCode: `function onRoutePop() {
  renderView(views.home);
  // Defect: no focus re-assignment
}`,
    afterCode: `function onRoutePop() {
  renderView(views.home);
  const target = document.getElementById(lastActiveId) || document.querySelector('.tv-tile');
  target?.focus();
  target?.classList.add('tv-focus-active');
}`,
    affectsReadiness: true,
  },
  {
    id: 'f-3',
    check: 'Hard-coded 1920px container widths break 4K/8K auto-scaling',
    severity: 'major',
    file: 'css/main.css',
    lineRange: 'L12-L24',
    status: 'Open',
    effortMinutes: 15,
    explanationTechnical: 'Container width locked to max-width: 1920px with margin: 0 auto; on 4K/8K panels running at native resolution, the viewport is letterboxed into the top-left quadrant.',
    explanationPlain: 'On newer 4K and 8K LG TVs, the app displays tiny in the corner instead of filling the whole screen smoothly.',
    whyLGCares: 'LG Technical QA: Apps must adapt fluidly or declare appropriate resolution tag in appinfo.json with viewport scaling meta.',
    beforeCode: `.app-container {
  width: 1920px;
  max-width: 1920px;
  height: 1080px;
  overflow: hidden;
}`,
    afterCode: `.app-container {
  width: 100vw;
  height: 100vh;
  transform-origin: top left;
  /* webOS base 1080p scaled proportionally */
}`,
    affectsReadiness: true,
  },
  {
    id: 'f-4',
    check: 'Deprecated window.open() used for external terms link',
    severity: 'major',
    file: 'js/app.js',
    lineRange: 'L210-L215',
    status: 'Fixed',
    effortMinutes: 10,
    explanationTechnical: 'window.open() without webOS service bridge results in silent pop-up blocking or browser tab decoupling on webOS 4.x/5.x runtimes.',
    explanationPlain: 'Clicking the terms of service button does nothing or crashes the web view on older LG TVs.',
    whyLGCares: 'External links must invoke the webOS system browser via webOS.service.request("luna://com.webos.applicationManager", ...).',
    beforeCode: `function openTerms() {
  window.open('https://harbormedia.tv/terms', '_blank');
}`,
    afterCode: `function openTerms() {
  if (window.webOS) {
    webOS.service.request('luna://com.webos.applicationManager', {
      method: 'open',
      parameters: { target: 'https://harbormedia.tv/terms' }
    });
  }
}`,
    affectsReadiness: false,
  },
  {
    id: 'f-5',
    check: 'Blocking synchronous XMLHttpRequest on initial boot',
    severity: 'major',
    file: 'js/app.js',
    lineRange: 'L34-L45',
    status: 'Fixed',
    effortMinutes: 25,
    explanationTechnical: 'Synchronous XMLHttpRequest(..., false) blocks UI thread during cold boot, triggering webOS watchdog termination if network latency exceeds 3000ms.',
    explanationPlain: 'If Wi-Fi is slow on launch, the TV thinks the app froze and shuts it down before the logo even appears.',
    whyLGCares: 'Launch watchdog limits initial thread block to under 5 seconds before killing the process.',
    beforeCode: `const xhr = new XMLHttpRequest();
xhr.open('GET', '/config.json', false); // Sync call!
xhr.send();`,
    afterCode: `fetch('/config.json')
  .then(res => res.json())
  .then(applyConfig)
  .catch(handleOfflineFallback);`,
    affectsReadiness: false,
  },
  {
    id: 'f-6',
    check: 'Missing offline fallback screen when network drops',
    severity: 'blocker',
    file: 'index.html',
    lineRange: 'L78-L92',
    status: 'Fixed',
    effortMinutes: 30,
    explanationTechnical: 'Absence of window offline event listener results in infinite spinner and unhandled fetch exceptions when TV disconnects from Wi-Fi.',
    explanationPlain: 'If the user disconnects their internet, the app stays stuck on a blank loading wheel with no message or retry button.',
    whyLGCares: 'Store Review Requirement: An explicit connection error screen with a "Retry" button is mandatory.',
    beforeCode: `<!-- No offline fallback element in DOM -->`,
    afterCode: `<div id="offline-screen" class="hidden tv-error-view">
  <h2>No Internet Connection</h2>
  <p>Please check your network settings and try again.</p>
  <button id="retry-btn" class="tv-btn">Retry Connection</button>
</div>`,
    affectsReadiness: false,
  },
  {
    id: 'f-7',
    check: 'Missing required "resolution" property in appinfo.json',
    severity: 'major',
    file: 'appinfo.json',
    lineRange: 'L7-L14',
    status: 'Fixed',
    effortMinutes: 5,
    explanationTechnical: 'appinfo.json lacks the "resolution": "1920x1080" declaration, resulting in undefined raster DPI on webOS 6+ 4K TVs.',
    explanationPlain: 'Without this configuration line, the TV does not know the native canvas size of your UI.',
    whyLGCares: 'LG Seller Lounge validator checks resolution field for rendering engine scale factor assignment.',
    beforeCode: `{\n  "id": "com.harbormedia.harbortv",\n  "version": "1.0.3"\n}`,
    afterCode: `{\n  "id": "com.harbormedia.harbortv",\n  "version": "1.0.3",\n  "resolution": "1920x1080"\n}`,
    affectsReadiness: false,
  },
  {
    id: 'f-8',
    check: 'Mixed content: Non-HTTPS CDN asset in index.html',
    severity: 'major',
    file: 'index.html',
    lineRange: 'L18-L20',
    status: 'Fixed',
    effortMinutes: 5,
    explanationTechnical: 'Font asset referenced via http:// protocol instead of https://, triggering mixed-content security block in modern webOS Chromium container.',
    explanationPlain: 'One font file was loading over insecure HTTP, which modern LG TVs block automatically.',
    whyLGCares: 'LG Content Store strictly rejects any app loading unencrypted remote web assets.',
    beforeCode: `<link rel="stylesheet" href="http://fonts.cdn.com/css/sans.css">`,
    afterCode: `<link rel="stylesheet" href="https://fonts.cdn.com/css/sans.css">`,
    affectsReadiness: false,
  },
  {
    id: 'f-9',
    check: 'Oversized splash asset exceeding 2 MB upload threshold',
    severity: 'minor',
    file: 'assets/splash.png',
    lineRange: 'binary',
    status: 'Fixed',
    effortMinutes: 10,
    explanationTechnical: 'splash.png is uncompressed RGBA 3.4 MB. Exceeds recommended asset weight and creates 400ms memory spike during launch.',
    explanationPlain: 'The startup background image is too heavy and slows down TV boot time.',
    whyLGCares: 'Seller Lounge enforces asset file size limits and monitors launch memory footprint.',
    beforeCode: `splash.png (3.4 MB PNG-32)`,
    afterCode: `splash.png (480 KB PNG-24 optimized)`,
    affectsReadiness: false,
  },
  {
    id: 'f-10',
    check: 'Unhandled promise rejection in telemetry initialize call',
    severity: 'minor',
    file: 'js/app.js',
    lineRange: 'L145-L155',
    status: 'Fixed',
    effortMinutes: 10,
    explanationTechnical: 'Analytics ping fails without .catch(), producing unhandledrejection event on webOS runtime.',
    explanationPlain: 'An optional analytics call failed silently and logged errors to the background console.',
    whyLGCares: 'Zero fatal console errors allowed on production launch.',
    beforeCode: `initAnalytics().then(() => console.log('Ready'));`,
    afterCode: `initAnalytics().catch(err => console.warn('Telemetry skipped:', err));`,
    affectsReadiness: false,
  },
  {
    id: 'f-11',
    check: 'Remote key navigation handled on keydown but not keyup',
    severity: 'minor',
    file: 'js/nav.js',
    lineRange: 'L88-L102',
    status: 'Fixed',
    effortMinutes: 15,
    explanationTechnical: 'Failure to manage keyup prevents continuous D-pad scrolling debounce and causes key-repeat stutter on older LG Magic Remotes.',
    explanationPlain: 'Holding down an arrow key on the remote stuttered or skipped past tiles uncontrollably.',
    whyLGCares: 'Smooth 60fps focus transition is verified during LG QA human evaluation.',
    beforeCode: `// keydown only, no debounce or repeat prevention`,
    afterCode: `// Debounced keydown with clean keyup release state`,
    affectsReadiness: false,
  },
  {
    id: 'f-12',
    check: 'LG Magic Remote pointer hover lacks custom pointer focus ring',
    severity: 'minor',
    file: 'css/main.css',
    lineRange: 'L140-L155',
    status: 'Fixed',
    effortMinutes: 10,
    explanationTechnical: 'Missing :hover state on interactive elements prevents cursor feedback when user switches from D-pad to LG Magic Remote air-mouse pointer.',
    explanationPlain: 'Waving the LG pointer over tiles didn’t show any highlight effect until clicked.',
    whyLGCares: 'LG webOS mandates seamless dual-mode navigation (D-pad and Magic Remote pointer).',
    beforeCode: `.tile:focus { outline: 4px solid var(--accent); }`,
    afterCode: `.tile:focus, .tile:hover { outline: 4px solid var(--accent); }`,
    affectsReadiness: false,
  },
  {
    id: 'f-13',
    check: 'Potential memory leak in unbounded virtual grid history',
    severity: 'minor',
    file: 'js/nav.js',
    lineRange: 'L190-L205',
    status: 'Fixed',
    effortMinutes: 20,
    explanationTechnical: 'Array push in tile selection history is unbounded, causing continuous heap allocation over long binge-watching sessions.',
    explanationPlain: 'Browsing through hundreds of channel tiles gradually piled up memory until the TV ran out of RAM.',
    whyLGCares: 'LG 24-hour endurance test flags unbounded memory growth.',
    beforeCode: `navHistory.push(currentTileId);`,
    afterCode: `navHistory.push(currentTileId); if (navHistory.length > 50) navHistory.shift();`,
    affectsReadiness: false,
  },
  {
    id: 'f-14',
    check: 'Console debug logging left enabled in production build',
    severity: 'minor',
    file: 'js/app.js',
    lineRange: 'L5-L10',
    status: 'Fixed',
    effortMinutes: 5,
    explanationTechnical: 'Verbose console.log() statements active on production bundle degrade webOS WebKit performance on lower-tier hardware.',
    explanationPlain: 'Leftover debugging lines clutter the TV logs and waste processing power.',
    whyLGCares: 'Clean production logs are evaluated in automated store scans.',
    beforeCode: `console.log('Fetching channel playlist...', playlist);`,
    afterCode: `if (window.DEBUG_MODE) console.log('Playlist:', playlist);`,
    affectsReadiness: false,
  }
];
