export interface ProjectInfo {
  id: string;
  appId: string;
  name: string;
  version: string;
  vendor: string;
  category: string;
  type: string;
  main: string;
  readinessScore: number;
  totalChecks: number;
  passedChecks: number;
  openIssuesCount: number;
  assetsValidCount: number;
  totalAssetsCount: number;
  reviewStage: 'Prepared' | 'Submitted' | 'In QA' | 'Changes requested' | 'Approved' | 'Live';
  lastBuildIpK?: string;
  lastBuildTime?: string;
  deviceTested: string;
}

export const initialProject: ProjectInfo = {
  id: 'harbor-tv',
  appId: 'com.harbormedia.harbortv',
  name: 'Harbor TV',
  version: '1.0.3',
  vendor: 'Harbor Media',
  category: 'Entertainment',
  type: 'web',
  main: 'index.html',
  readinessScore: 78,
  totalChecks: 14,
  passedChecks: 11,
  openIssuesCount: 3,
  assetsValidCount: 5,
  totalAssetsCount: 7,
  reviewStage: 'Prepared',
  lastBuildIpK: 'com.harbormedia.harbortv_1.0.3_all.ipk',
  lastBuildTime: 'Today, 11:24 AM',
  deviceTested: 'LG OLED C2 55" (webOS 22)',
};
