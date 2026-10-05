import { create } from 'zustand';
import { initialProject, ProjectInfo } from '../data/project';
import { initialFindings, Finding, FindingStatus } from '../data/findings';
import { initialStoreAssets, StoreAsset, AssetStatus } from '../data/assets';
import { initialActivities, ActivityItem } from '../data/activity';
import { initialPortfolioApps, PortfolioApp, AppStatus, AppCategory } from '../data/apps';
import { rejectionScenarios, RejectionItem } from '../data/rejections';
import { delay, shouldSimulateFailure } from '../api/delay';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface SubmissionTimelineEvent {
  id: string;
  stage: string;
  title: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface AppState {
  // UI & Global Options
  isTechnicalMode: boolean;
  toggleTechnicalMode: () => void;
  isTourOpen: boolean;
  tourStep: number;
  openTour: () => void;
  closeTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  isKeyboardHelpOpen: boolean;
  setKeyboardHelpOpen: (open: boolean) => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resetDemo: () => void;

  // Project Slice
  project: ProjectInfo;
  activities: ActivityItem[];
  runAllChecksAsync: () => Promise<boolean>;

  // Findings Slice
  findings: Finding[];
  selectedFindingId: string | null;
  findingFilterSeverity: string;
  findingFilterFile: string;
  findingSearchQuery: string;
  setSelectedFindingId: (id: string | null) => void;
  setFindingFilterSeverity: (sev: string) => void;
  setFindingFilterFile: (file: string) => void;
  setFindingSearchQuery: (query: string) => void;
  updateFindingStatus: (id: string, status: FindingStatus) => void;

  // TV Simulator Slice
  simulatorBeforeMode: boolean;
  setSimulatorBeforeMode: (before: boolean) => void;
  simulatorDevice: string;
  setSimulatorDevice: (device: string) => void;
  simulatorPointerMode: boolean;
  setSimulatorPointerMode: (pointer: boolean) => void;
  simulatorKeyLog: { id: string; key: string; code: number; time: string }[];
  addSimulatorKey: (key: string, code: number) => void;
  simulatorTestsPassed: {
    moveDpad: boolean;
    openDetail: boolean;
    pressBackToReturn: boolean;
    pressBackOnHomeExit: boolean;
    noFocusLost: boolean;
    pointerFocus: boolean;
  };
  markSimulatorTest: (test: keyof AppState['simulatorTestsPassed']) => void;
  resetSimulatorTests: () => void;
  hasCrashed: boolean;
  triggerCrashSimulation: () => void;
  reloadSimulatorApp: () => void;

  // Config Validator Slice
  configJsonText: string;
  setConfigJsonText: (text: string) => void;
  autoFixConfigJson: () => void;
  resetConfigJson: () => void;

  // Build Pipeline Slice
  buildStage: number; // 0: idle, 1: lint, 2: minify, 3: verify, 4: package, 5: validate, 6: done
  buildStatus: 'idle' | 'running' | 'done' | 'failed';
  buildLogs: string[];
  simulatedBuildError: string | null;
  setSimulatedBuildError: (err: string | null) => void;
  startBuildAsync: () => Promise<void>;
  cancelBuild: () => void;
  resetBuild: () => void;

  // Store Assets Slice
  storeAssets: StoreAsset[];
  updateAssetStatus: (id: string, status: AssetStatus, message?: string) => void;
  cropAssetToSpec: (id: string) => void;
  resetAssets: () => void;

  // Submission Slice
  submissionStage: 'Prepared' | 'Submitted' | 'In QA' | 'Changes requested' | 'Approved' | 'Live';
  submissionSpeed: number; // 1, 5, 20
  setSubmissionSpeed: (speed: number) => void;
  activeRejection: RejectionItem | null;
  submissionTimeline: SubmissionTimelineEvent[];
  submitToLGAsync: () => Promise<boolean>;
  simulateRejection: () => void;
  resolveRejectionAndResubmit: () => void;
  advanceSubmissionStep: () => void;
  resetSubmission: () => void;

  // Portfolio Slice
  portfolioApps: PortfolioApp[];
  portfolioSearch: string;
  portfolioStatusFilter: AppStatus | 'All';
  portfolioCategoryFilter: AppCategory | 'All';
  selectedAppIds: string[];
  setPortfolioSearch: (query: string) => void;
  setPortfolioStatusFilter: (status: AppStatus | 'All') => void;
  setPortfolioCategoryFilter: (category: AppCategory | 'All') => void;
  toggleSelectApp: (id: string) => void;
  selectAllFilteredApps: (ids: string[]) => void;
  clearAppSelection: () => void;
  isBulkRunning: boolean;
  bulkProgress: { completed: number; total: number; successCount: number; warnCount: number } | null;
  runBulkChecksAsync: () => Promise<void>;
  applyTemplateFixAsync: () => Promise<void>;
  activeDrawerAppId: string | null;
  setActiveDrawerAppId: (id: string | null) => void;
  switchCurrentProject: (app: PortfolioApp) => void;
}

const INITIAL_CONFIG_JSON = `{
  "id": "Harbor TV",
  "version": "1.0",
  "vendor": "Harbor Media",
  "type": "web",
  "main": "index.html",
  "title": "Harbor TV",
  "icon": "icon.png",
  "largeIcon": "largeIcon.png"
}`;

const FIXED_CONFIG_JSON = `{
  "id": "com.harbormedia.harbortv",
  "version": "1.0.3",
  "vendor": "Harbor Media",
  "type": "web",
  "main": "index.html",
  "title": "Harbor TV",
  "icon": "icon.png",
  "largeIcon": "largeIcon.png",
  "resolution": "1920x1080",
  "splashBackground": "splash.png",
  "bgImage": "bgImage.png"
}`;

const INITIAL_TIMELINE: SubmissionTimelineEvent[] = [
  {
    id: 'tl-1',
    stage: 'Prepared',
    title: 'Pre-flight validation complete',
    timestamp: 'Today, 10:15 AM',
    actor: 'Meridian Console',
    note: 'Code review and assets verified against LG Content Store specifications.',
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  // UI Options
  isTechnicalMode: false,
  toggleTechnicalMode: () => set((state) => ({ isTechnicalMode: !state.isTechnicalMode })),
  isTourOpen: false,
  tourStep: 1,
  openTour: () => set({ isTourOpen: true, tourStep: 1 }),
  closeTour: () => set({ isTourOpen: false }),
  nextTourStep: () => set((state) => ({ tourStep: Math.min(state.tourStep + 1, 7) })),
  prevTourStep: () => set((state) => ({ tourStep: Math.max(state.tourStep - 1, 1) })),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  isNotificationsOpen: false,
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
  isKeyboardHelpOpen: false,
  setKeyboardHelpOpen: (open) => set({ isKeyboardHelpOpen: open }),

  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts.slice(-2), { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  resetDemo: () => {
    set({
      project: initialProject,
      findings: initialFindings,
      storeAssets: initialStoreAssets,
      activities: initialActivities,
      portfolioApps: initialPortfolioApps,
      selectedAppIds: [],
      configJsonText: INITIAL_CONFIG_JSON,
      buildStage: 0,
      buildStatus: 'idle',
      buildLogs: [],
      simulatedBuildError: null,
      submissionStage: 'Prepared',
      activeRejection: null,
      submissionTimeline: INITIAL_TIMELINE,
      simulatorBeforeMode: false,
      simulatorKeyLog: [],
      simulatorTestsPassed: {
        moveDpad: false,
        openDetail: false,
        pressBackToReturn: false,
        pressBackOnHomeExit: false,
        noFocusLost: false,
        pointerFocus: false,
      },
      hasCrashed: false,
      bulkProgress: null,
    });
    get().addToast('Demo data restored to initial state', 'info');
  },

  // Project
  project: initialProject,
  activities: initialActivities,
  runAllChecksAsync: async () => {
    await delay(1200);
    if (shouldSimulateFailure()) {
      get().addToast('Failed to reach validation service (?fail=1 active). Try again.', 'error');
      return false;
    }

    set((state) => {
      // Fix 2 blockers automatically on 'Run all checks'
      const updatedFindings = state.findings.map((f) => {
        if (f.id === 'f-1' || f.id === 'f-2') {
          return { ...f, status: 'Fixed' as FindingStatus };
        }
        return f;
      });
      const passed = updatedFindings.filter((f) => f.status === 'Fixed').length;
      const open = updatedFindings.filter((f) => f.status === 'Open').length;
      const newScore = Math.min(100, Math.round((passed / 14) * 100));

      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        category: 'Fixes',
        title: 'Batch resolved 2 blockers (Back Key & Focus Restoration)',
        description: 'Auto-applied recommended webOS handlers. Readiness score raised.',
        timestamp: new Date().toISOString(),
        timeAgo: 'Just now',
        user: 'Meridian Auto-Fixer',
      };

      return {
        findings: updatedFindings,
        activities: [newActivity, ...state.activities],
        project: {
          ...state.project,
          readinessScore: newScore,
          passedChecks: passed,
          openIssuesCount: open,
        },
      };
    });

    get().addToast('2 blocking issues resolved. Readiness score updated.', 'success');
    return true;
  },

  // Findings
  findings: initialFindings,
  selectedFindingId: null,
  findingFilterSeverity: 'all',
  findingFilterFile: 'all',
  findingSearchQuery: '',
  setSelectedFindingId: (id) => set({ selectedFindingId: id }),
  setFindingFilterSeverity: (sev) => set({ findingFilterSeverity: sev }),
  setFindingFilterFile: (file) => set({ findingFilterFile: file }),
  setFindingSearchQuery: (query) => set({ findingSearchQuery: query }),
  updateFindingStatus: (id, status) => {
    set((state) => {
      const updated = state.findings.map((f) => (f.id === id ? { ...f, status } : f));
      const passed = updated.filter((f) => f.status === 'Fixed').length;
      const open = updated.filter((f) => f.status === 'Open').length;
      const newScore = Math.min(100, Math.round((passed / 14) * 100));

      return {
        findings: updated,
        project: {
          ...state.project,
          readinessScore: newScore,
          passedChecks: passed,
          openIssuesCount: open,
        },
      };
    });
    get().addToast(`Check marked as ${status}`, 'success');
  },

  // Simulator
  simulatorBeforeMode: false,
  setSimulatorBeforeMode: (before) => set({ simulatorBeforeMode: before }),
  simulatorDevice: 'LG OLED C2 55" (webOS 22)',
  setSimulatorDevice: (device) => set({ simulatorDevice: device }),
  simulatorPointerMode: false,
  setSimulatorPointerMode: (pointer) => set({ simulatorPointerMode: pointer }),
  simulatorKeyLog: [],
  addSimulatorKey: (key, code) => {
    const time = new Date().toLocaleTimeString();
    set((state) => ({
      simulatorKeyLog: [{ id: Math.random().toString(), key, code, time }, ...state.simulatorKeyLog.slice(0, 9)],
    }));
  },
  simulatorTestsPassed: {
    moveDpad: false,
    openDetail: false,
    pressBackToReturn: false,
    pressBackOnHomeExit: false,
    noFocusLost: false,
    pointerFocus: false,
  },
  markSimulatorTest: (testKey) => {
    const current = get().simulatorTestsPassed;
    if (current[testKey]) return; // already passed

    set((state) => {
      const updatedTests = { ...state.simulatorTestsPassed, [testKey]: true };
      const allPassed = Object.values(updatedTests).every(Boolean);

      let updatedScore = state.project.readinessScore;
      if (allPassed && updatedScore < 95) {
        updatedScore = Math.min(100, updatedScore + 12);
      }

      return {
        simulatorTestsPassed: updatedTests,
        project: {
          ...state.project,
          readinessScore: updatedScore,
        },
      };
    });

    const labels: Record<keyof AppState['simulatorTestsPassed'], string> = {
      moveDpad: 'Moved focus in 4 directions',
      openDetail: 'Opened item detail view',
      pressBackToReturn: 'Back-key returned cleanly',
      pressBackOnHomeExit: 'Exit confirmation invoked',
      noFocusLost: 'Focus retained after navigation',
      pointerFocus: 'Magic Remote pointer activated',
    };
    get().addToast(`Verified: ${labels[testKey]}`, 'info');
  },
  resetSimulatorTests: () => {
    set({
      simulatorTestsPassed: {
        moveDpad: false,
        openDetail: false,
        pressBackToReturn: false,
        pressBackOnHomeExit: false,
        noFocusLost: false,
        pointerFocus: false,
      },
    });
    get().addToast('Simulator navigation tests reset', 'info');
  },
  hasCrashed: false,
  triggerCrashSimulation: () => {
    set({ hasCrashed: true });
    get().addToast('Simulated unhandled webOS crash runtime', 'error');
  },
  reloadSimulatorApp: () => {
    set({ hasCrashed: false });
    get().addToast('App reloaded and booted cleanly', 'success');
  },

  // Config Validator
  configJsonText: INITIAL_CONFIG_JSON,
  setConfigJsonText: (text) => set({ configJsonText: text }),
  autoFixConfigJson: () => {
    set({ configJsonText: FIXED_CONFIG_JSON });
    get().addToast('Auto-fixed 3 appinfo.json schema rules', 'success');
  },
  resetConfigJson: () => {
    set({ configJsonText: INITIAL_CONFIG_JSON });
    get().addToast('Reset appinfo.json to initial sample', 'info');
  },

  // Build Pipeline
  buildStage: 0,
  buildStatus: 'idle',
  buildLogs: [],
  simulatedBuildError: null,
  setSimulatedBuildError: (err) => set({ simulatedBuildError: err }),
  startBuildAsync: async () => {
    set({ buildStatus: 'running', buildStage: 1, buildLogs: ['$ meridian-packager v2.4.0 initiating build...'] });
    const stages = [
      { num: 1, name: 'Lint', log: '$ meridian lint ........................ ok (0 errors, 1 warning)' },
      { num: 2, name: 'Minify', log: '$ meridian minify ...................... ok (-38% js, -22% css)' },
      { num: 3, name: 'Verify config', log: '$ meridian verify appinfo.json ......... ok (12/12 rules passed)' },
      { num: 4, name: 'Package IPK', log: '$ ares-package (simulated) ............. ok  → 1.8 MB release bundle' },
      { num: 5, name: 'Validate', log: '$ meridian validate .................... ok (14/14 certification checks)' },
      { num: 6, name: 'Ready for upload', log: '✓ Build complete. Release artifact SHA-256: d8f3a9e...4b81' },
    ];

    const simErr = get().simulatedBuildError;

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      await delay(700);

      // Check simulated error
      if (simErr) {
        if (simErr === 'Invalid version' && stage.num === 3) {
          set((s) => ({
            buildStatus: 'failed',
            buildStage: 3,
            buildLogs: [...s.buildLogs, '$ meridian verify appinfo.json ......... FAILED: version "1.0" violates semver format (expected x.y.z)'],
          }));
          get().addToast('Build failed at stage 3: Invalid version schema', 'error');
          return;
        }
        if (simErr === 'Missing icon' && stage.num === 3) {
          set((s) => ({
            buildStatus: 'failed',
            buildStage: 3,
            buildLogs: [...s.buildLogs, '$ meridian verify appinfo.json ......... FAILED: icon.png not found in packaged directory'],
          }));
          get().addToast('Build failed: icon.png missing from manifest', 'error');
          return;
        }
        if (simErr === 'Signing mismatch' && stage.num === 4) {
          set((s) => ({
            buildStatus: 'failed',
            buildStage: 4,
            buildLogs: [...s.buildLogs, '$ ares-package .......................... FAILED: developer certificate mismatch with app ID'],
          }));
          get().addToast('Build failed at stage 4: Signing mismatch', 'error');
          return;
        }
      }

      set((s) => ({
        buildStage: stage.num,
        buildLogs: [...s.buildLogs, stage.log],
      }));
    }

    set({ buildStatus: 'done' });
    get().addToast('Production IPK package generated successfully (Demo)', 'success');
  },
  cancelBuild: () => {
    set({ buildStatus: 'idle', buildStage: 0, buildLogs: ['$ Build operation cancelled by user.'] });
    get().addToast('Build cancelled', 'info');
  },
  resetBuild: () => {
    set({ buildStatus: 'idle', buildStage: 0, buildLogs: [], simulatedBuildError: null });
  },

  // Store Assets
  storeAssets: initialStoreAssets,
  updateAssetStatus: (id, status, message) => {
    set((state) => ({
      storeAssets: state.storeAssets.map((a) => (a.id === id ? { ...a, status, statusMessage: message || a.statusMessage } : a)),
    }));
  },
  cropAssetToSpec: (id) => {
    set((state) => ({
      storeAssets: state.storeAssets.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status: 'pass',
            currentInfo: {
              ...a.currentInfo,
              dimensions: a.expectedSpec.dimensions,
              width: a.expectedSpec.width,
              height: a.expectedSpec.height,
            },
            statusMessage: 'Cropped to exact store aspect ratio and dimension spec.',
          };
        }
        return a;
      }),
    }));
    get().addToast('Asset cropped to exact LG Content Store spec', 'success');
  },
  resetAssets: () => {
    set({ storeAssets: initialStoreAssets });
    get().addToast('Store assets reset to sample state', 'info');
  },

  // Submission Slice
  submissionStage: 'Prepared',
  submissionSpeed: 1,
  setSubmissionSpeed: (speed) => set({ submissionSpeed: speed }),
  activeRejection: null,
  submissionTimeline: INITIAL_TIMELINE,
  submitToLGAsync: async () => {
    const blockers = get().findings.filter((f) => f.severity === 'blocker' && f.status === 'Open');
    if (blockers.length > 0) {
      get().addToast(`Cannot submit: Fix ${blockers.length} blocker(s) first.`, 'error');
      return false;
    }

    await delay(800);
    const newEvent: SubmissionTimelineEvent = {
      id: `tl-${Date.now()}`,
      stage: 'Submitted',
      title: 'Submitted to LG Content Store (Demo)',
      timestamp: 'Just now',
      actor: 'Seller Lounge API',
      note: 'Application package com.harbormedia.harbortv_1.0.3_all.ipk entered intake queue.',
    };

    set((state) => ({
      submissionStage: 'Submitted',
      submissionTimeline: [newEvent, ...state.submissionTimeline],
      project: { ...state.project, reviewStage: 'Submitted' },
    }));

    get().addToast('Submitted to LG Content Store review pipeline (Demo)', 'success');

    // Auto progress to In QA
    setTimeout(() => {
      set((state) => {
        if (state.submissionStage !== 'Submitted') return state;
        const qaEvent: SubmissionTimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: 'In QA',
          title: 'Assigned to LG Certification Team',
          timestamp: 'Just now',
          actor: 'LG Seller Lounge QA',
          note: 'Automated scans passed. Manual physical remote testing in progress.',
        };
        return {
          submissionStage: 'In QA',
          submissionTimeline: [qaEvent, ...state.submissionTimeline],
          project: { ...state.project, reviewStage: 'In QA' },
        };
      });
    }, 2000 / get().submissionSpeed);

    return true;
  },
  simulateRejection: () => {
    const rej = rejectionScenarios[0]; // Back key rejection
    const event: SubmissionTimelineEvent = {
      id: `tl-${Date.now()}`,
      stage: 'Changes requested',
      title: 'QA Review Issue: Back-key exit without confirmation',
      timestamp: 'Just now',
      actor: 'LG Certification Reviewer',
      note: rej.reviewerNote,
    };
    set((state) => ({
      submissionStage: 'Changes requested',
      activeRejection: rej,
      submissionTimeline: [event, ...state.submissionTimeline],
      project: { ...state.project, reviewStage: 'Changes requested' },
    }));
    get().addToast('Simulated LG QA rejection notice received', 'error');
  },
  resolveRejectionAndResubmit: () => {
    const event: SubmissionTimelineEvent = {
      id: `tl-${Date.now()}`,
      stage: 'In QA',
      title: 'Resubmitted with Back-key fix and test evidence',
      timestamp: 'Just now',
      actor: 'Meridian Engineer',
      note: 'Provided simulator execution log and hardware trace.',
    };
    set((state) => ({
      submissionStage: 'In QA',
      activeRejection: null,
      submissionTimeline: [event, ...state.submissionTimeline],
      project: { ...state.project, reviewStage: 'In QA' },
    }));
    get().addToast('Fix applied and resubmitted to LG QA', 'success');

    // Auto advance to Approved -> Live
    setTimeout(() => {
      set((state) => {
        const approvedEvent: SubmissionTimelineEvent = {
          id: `tl-${Date.now()}`,
          stage: 'Approved',
          title: 'Certification Passed: Ready for Store Publication',
          timestamp: 'Just now',
          actor: 'LG Seller Lounge',
          note: 'All technical and UX checklist requirements verified.',
        };
        return {
          submissionStage: 'Approved',
          submissionTimeline: [approvedEvent, ...state.submissionTimeline],
          project: { ...state.project, reviewStage: 'Approved' },
        };
      });

      setTimeout(() => {
        set((state) => {
          const liveEvent: SubmissionTimelineEvent = {
            id: `tl-${Date.now()}`,
            stage: 'Live',
            title: 'Live in LG Content Store!',
            timestamp: 'Just now',
            actor: 'LG Content Store Production',
            note: 'Available for download across worldwide webOS smart TVs.',
          };
          return {
            submissionStage: 'Live',
            submissionTimeline: [liveEvent, ...state.submissionTimeline],
            project: { ...state.project, reviewStage: 'Live' },
          };
        });
        get().addToast('App is now LIVE in the LG Content Store! (Demo)', 'success');
      }, 1500 / get().submissionSpeed);
    }, 1500 / get().submissionSpeed);
  },
  advanceSubmissionStep: () => {
    const sequence: ('Prepared' | 'Submitted' | 'In QA' | 'Changes requested' | 'Approved' | 'Live')[] = [
      'Prepared',
      'Submitted',
      'In QA',
      'Approved',
      'Live',
    ];
    const currentIndex = sequence.indexOf(get().submissionStage);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextStage = sequence[currentIndex + 1];
      const event: SubmissionTimelineEvent = {
        id: `tl-${Date.now()}`,
        stage: nextStage,
        title: `Stage advanced to ${nextStage}`,
        timestamp: 'Just now',
        actor: 'Demo Controller',
      };
      set((state) => ({
        submissionStage: nextStage,
        submissionTimeline: [event, ...state.submissionTimeline],
        project: { ...state.project, reviewStage: nextStage },
      }));
      get().addToast(`Advanced to ${nextStage}`, 'info');
    }
  },
  resetSubmission: () => {
    set({
      submissionStage: 'Prepared',
      activeRejection: null,
      submissionTimeline: INITIAL_TIMELINE,
      project: { ...get().project, reviewStage: 'Prepared' },
    });
    get().addToast('Submission tracker reset to Prepared state', 'info');
  },

  // Portfolio Slice
  portfolioApps: initialPortfolioApps,
  portfolioSearch: '',
  portfolioStatusFilter: 'All',
  portfolioCategoryFilter: 'All',
  selectedAppIds: [],
  setPortfolioSearch: (query) => set({ portfolioSearch: query }),
  setPortfolioStatusFilter: (status) => set({ portfolioStatusFilter: status }),
  setPortfolioCategoryFilter: (category) => set({ portfolioCategoryFilter: category }),
  toggleSelectApp: (id) =>
    set((state) => ({
      selectedAppIds: state.selectedAppIds.includes(id)
        ? state.selectedAppIds.filter((item) => item !== id)
        : [...state.selectedAppIds, id],
    })),
  selectAllFilteredApps: (ids) => set({ selectedAppIds: ids }),
  clearAppSelection: () => set({ selectedAppIds: [] }),
  isBulkRunning: false,
  bulkProgress: null,
  runBulkChecksAsync: async () => {
    const selected = get().selectedAppIds;
    if (selected.length === 0) return;

    set({ isBulkRunning: true, bulkProgress: { completed: 0, total: selected.length, successCount: 0, warnCount: 0 } });

    for (let i = 0; i < selected.length; i++) {
      await delay(120);
      set((s) => {
        const completed = i + 1;
        const app = s.portfolioApps.find((a) => a.id === selected[i]);
        const isWarn = app?.status === 'Blocked';
        return {
          bulkProgress: {
            completed,
            total: selected.length,
            successCount: (s.bulkProgress?.successCount || 0) + (isWarn ? 0 : 1),
            warnCount: (s.bulkProgress?.warnCount || 0) + (isWarn ? 1 : 0),
          },
        };
      });
    }

    set({ isBulkRunning: false });
    get().addToast(`Batch checks complete for ${selected.length} apps.`, 'success');
  },
  applyTemplateFixAsync: async () => {
    const selected = get().selectedAppIds;
    if (selected.length === 0) return;

    await delay(600);
    set((state) => {
      const updated = state.portfolioApps.map((app) => {
        if (selected.includes(app.id) && app.status === 'Blocked') {
          return {
            ...app,
            status: 'In progress' as AppStatus,
            readinessScore: 92,
            checksPassed: 13,
            hasTemplateDefect: false,
          };
        }
        return app;
      });
      return { portfolioApps: updated, selectedAppIds: [] };
    });

    get().addToast(`Template fix applied across selected apps! Blockers cleared.`, 'success');
  },
  activeDrawerAppId: null,
  setActiveDrawerAppId: (id) => set({ activeDrawerAppId: id }),
  switchCurrentProject: (app) => {
    set((state) => ({
      project: {
        ...state.project,
        id: app.id,
        appId: app.bundleId,
        name: app.name,
        version: app.version,
        category: app.category,
        readinessScore: app.readinessScore,
        passedChecks: app.checksPassed,
        openIssuesCount: app.totalChecks - app.checksPassed,
      },
      activeDrawerAppId: null,
    }));
    get().addToast(`Active project switched to "${app.name}"`, 'success');
  },
}));
