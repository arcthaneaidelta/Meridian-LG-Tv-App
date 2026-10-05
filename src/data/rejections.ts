export interface RejectionItem {
  id: string;
  title: string;
  symptom: string;
  whyLgFlags: string;
  fixSummary: string;
  codeFile: string;
  reviewerNote: string;
  rootCause: string;
  fixApplied: string;
  screenTarget: string;
}

export const rejectionScenarios: RejectionItem[] = [
  {
    id: 'rej-1',
    title: 'Back key exits app with no confirmation',
    symptom: 'Pressing Back on the top-level home screen instantly closes the app and drops the viewer back to the webOS launcher.',
    whyLgFlags: 'LG Content Store QA Section 2.1: Accidental app termination degrades the viewing experience. An explicit modal ("Are you sure you want to exit?") or two rapid Back taps within 2 seconds is mandatory.',
    fixSummary: 'Intercept hardware key code 461 and 27 on root view; display branded exit dialog focusing "Stay" by default.',
    codeFile: 'js/nav.js',
    reviewerNote: 'App terminates immediately upon pressing the remote Back button on the home screen without presenting an exit confirmation dialogue.',
    rootCause: 'Default web browser history stack pop triggered process exit signal on webOS shell container.',
    fixApplied: 'Added root route interceptor with modal confirmation prompt, retaining focus state on dismissal.',
    screenTarget: '/console/simulator',
  },
  {
    id: 'rej-2',
    title: 'Focus lost after returning from detail screen',
    symptom: 'When clicking Back from a show or channel detail view, focus disappears completely from the screen.',
    whyLgFlags: 'LG Human Interface Guidelines: Focus must never be lost. A TV user has no mouse or touch screen—if no item has the focus highlight, the interface appears completely frozen.',
    fixSummary: 'Cache last active tile ID in a view-stack registry; re-apply focus ring immediately upon route restore.',
    codeFile: 'js/app.js',
    reviewerNote: 'After returning to the main grid from the item description view, user focus is lost and remote arrow navigation becomes unresponsive.',
    rootCause: 'Dynamic DOM regeneration destroyed previous node reference without persisting active element ID.',
    fixApplied: 'Implemented focus-restoration lifecycle hook in the navigation router.',
    screenTarget: '/console/simulator',
  },
  {
    id: 'rej-3',
    title: 'App crashes on launch without network',
    symptom: 'If an LG TV is offline or experiencing DNS latency, the application displays a black screen or crashes to webOS home.',
    whyLgFlags: 'LG Technical Certification 1.4: Apps must handle offline states gracefully, displaying an offline illustration and a Retry button.',
    fixSummary: 'Wrap boot calls in network-aware promise handlers; render static zero-dependency fallback screen if navigator.onLine is false.',
    codeFile: 'index.html & js/app.js',
    reviewerNote: 'During disconnected network testing, the application fails to load and exhibits a permanent black screen without user guidance.',
    rootCause: 'Initial configuration fetch was unguarded by a catch block or timeout handler.',
    fixApplied: 'Embedded an inline offline screen with auto-reconnect polling and explicit manual retry CTA.',
    screenTarget: '/console/review',
  },
  {
    id: 'rej-4',
    title: 'Icon or background fails size/format requirements',
    symptom: 'Submission rejected during automated seller intake with asset dimension or alpha channel errors.',
    whyLgFlags: 'LG Content Store Asset Spec: App icon must be exactly 130×130 PNG, large icon 160×160, and splash backgrounds must fit safe-title boundaries.',
    fixSummary: 'Pre-flight asset dimension inspector validates pixels, aspect ratio, and file weight before seller bundle packaging.',
    codeFile: 'assets/icon.png',
    reviewerNote: 'Store icon asset (icon.png) submitted with 512×512 resolution instead of mandatory 130×130 px, resulting in launcher scaling artifacts.',
    rootCause: 'High-res master graphics were packaged directly without running build asset resizer.',
    fixApplied: 'Auto-cropped and resized icons to exact pixel dimensions with alpha transparency preserved.',
    screenTarget: '/console/assets',
  },
  {
    id: 'rej-5',
    title: 'Metadata (appinfo.json) inconsistent with store listing',
    symptom: 'Store submission is flagged because package title, version string, or package ID mismatch the Seller Lounge form entries.',
    whyLgFlags: 'LG Seller Lounge Policy: Title and version in appinfo.json must strictly match the store metadata submission form.',
    fixSummary: 'Run automated config validator against appinfo.json schema before building release IPK.',
    codeFile: 'appinfo.json',
    reviewerNote: 'appinfo.json declares version "1.0" whereas Seller Lounge submission request specifies "1.0.3". Additionally, title contains special characters.',
    rootCause: 'Manual version bumping was forgotten during the release build step.',
    fixApplied: 'Synchronized appinfo.json versioning and normalized title string in automated pre-package script.',
    screenTarget: '/console/config',
  },
  {
    id: 'rej-6',
    title: 'Pointer (Magic Remote) hover does nothing on interactive elements',
    symptom: 'When using LG Magic Remote pointer, waving the pointer over cards provides zero visual indication that the tile is clickable.',
    whyLgFlags: 'LG webOS TV UX Guidelines: Apps must support both 5-way directional keys and Magic Remote pointer hover feedback.',
    fixSummary: 'Ensure all focusable elements share identical scale and outline styles for both :focus and :hover pseudo-classes.',
    codeFile: 'css/main.css',
    reviewerNote: 'When Magic Remote pointer mode is engaged, interactive media cards do not display hover elevation or cursor change.',
    rootCause: 'CSS styles were scoped solely to custom .tv-focus-active classes without standard mouse hover bindings.',
    fixApplied: 'Unified hover and focus classes with pointer cursor styles.',
    screenTarget: '/console/simulator',
  },
];
