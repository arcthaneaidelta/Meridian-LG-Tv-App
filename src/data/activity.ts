export type ActivityCategory = 'All' | 'Fixes' | 'Builds' | 'Review';

export interface ActivityItem {
  id: string;
  category: 'Fixes' | 'Builds' | 'Review';
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  user: string;
}

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    category: 'Fixes',
    title: 'Fixed focus restore on Detail view return',
    description: 'Hooked router view-stack restore so active tile ID reclaims focus ring on back navigation.',
    timestamp: '2026-10-05T12:00:00Z',
    timeAgo: '2 hours ago',
    user: 'Lead Engineer',
  },
  {
    id: 'act-2',
    category: 'Builds',
    title: 'Build 1.0.3 packaged as release IPK',
    description: 'Generated com.harbormedia.harbortv_1.0.3_all.ipk (1.8 MB) with sample production signing keys.',
    timestamp: '2026-10-04T16:30:00Z',
    timeAgo: 'Yesterday',
    user: 'CI / Pipeline',
  },
  {
    id: 'act-3',
    category: 'Fixes',
    title: 'Icon replaced to 130×130 PNG spec',
    description: 'Exported raster with proper alpha transparency and verified against Seller Lounge asset scanner.',
    timestamp: '2026-10-03T11:15:00Z',
    timeAgo: '2 days ago',
    user: 'QA Specialist',
  },
  {
    id: 'act-4',
    category: 'Review',
    title: 'Automated code review completed (14 checks)',
    description: '11 checks passed, 3 blockers flagged (Back key, focus retention, 1920px container sizing).',
    timestamp: '2026-10-03T09:40:00Z',
    timeAgo: '2 days ago',
    user: 'Meridian Linter',
  },
  {
    id: 'act-5',
    category: 'Fixes',
    title: 'Swapped window.open for webOS applicationManager luna call',
    description: 'Prevented popup sandboxing rejection on webOS 5.x and 6.x firmware.',
    timestamp: '2026-10-02T14:20:00Z',
    timeAgo: '3 days ago',
    user: 'Lead Engineer',
  },
  {
    id: 'act-6',
    category: 'Builds',
    title: 'Dry-run package validation passed',
    description: 'ares-package simulated check confirmed all static assets within 20 MB budget.',
    timestamp: '2026-10-01T17:00:00Z',
    timeAgo: '4 days ago',
    user: 'CI / Pipeline',
  },
  {
    id: 'act-7',
    category: 'Review',
    title: 'Physical TV testing on LG OLED C2 completed',
    description: 'Magic Remote pointer accuracy verified; D-pad 5-way responsiveness verified.',
    timestamp: '2026-09-30T15:00:00Z',
    timeAgo: '5 days ago',
    user: 'QA Specialist',
  },
  {
    id: 'act-8',
    category: 'Fixes',
    title: 'Added offline fallback screen with manual retry',
    description: 'Resolved offline launch crash check and verified retry timeout behavior.',
    timestamp: '2026-09-29T10:10:00Z',
    timeAgo: '6 days ago',
    user: 'Lead Engineer',
  },
  {
    id: 'act-9',
    category: 'Review',
    title: 'appinfo.json resolution tag verified',
    description: 'Added 1920x1080 native canvas declaration to enable smooth system DPI scaling.',
    timestamp: '2026-09-28T11:45:00Z',
    timeAgo: '1 week ago',
    user: 'Meridian Linter',
  },
  {
    id: 'act-10',
    category: 'Builds',
    title: 'Minification pass reduced JS payload by 38%',
    description: 'Dead code elimination and symbol compression reduced bundle size to 1.8 MB.',
    timestamp: '2026-09-27T16:20:00Z',
    timeAgo: '1 week ago',
    user: 'CI / Pipeline',
  },
  {
    id: 'act-11',
    category: 'Review',
    title: 'Initial intake audit created for Harbor TV',
    description: 'Ingested project repository, parsed manifest, initiated baseline quality scan.',
    timestamp: '2026-09-26T09:00:00Z',
    timeAgo: '2 weeks ago',
    user: 'System',
  },
  {
    id: 'act-12',
    category: 'Fixes',
    title: 'Sanitized HTTP asset links to secure HTTPS',
    description: 'Prevented mixed-content blocking on modern LG WebKit browser engines.',
    timestamp: '2026-09-25T13:30:00Z',
    timeAgo: '2 weeks ago',
    user: 'Lead Engineer',
  },
];
