export type AppStatus = 'Live' | 'In review' | 'In progress' | 'Blocked';
export type AppCategory = 'Channels' | 'News' | 'Fitness' | 'Kids' | 'Radio' | 'Learning';

export interface PortfolioApp {
  id: string;
  name: string;
  bundleId: string;
  category: AppCategory;
  version: string;
  readinessScore: number;
  checksPassed: number;
  totalChecks: number;
  status: AppStatus;
  lastActivity: string;
  iconBg: string;
  hasTemplateDefect?: boolean;
}

export const initialPortfolioApps: PortfolioApp[] = [
  // 1. Primary
  { id: 'harbor-tv', name: 'Harbor TV', bundleId: 'com.harbormedia.harbortv', category: 'Channels', version: '1.0.3', readinessScore: 78, checksPassed: 11, totalChecks: 14, status: 'In progress', lastActivity: '2 hours ago', iconBg: '#2F4A47' },
  // Channels
  { id: 'horizon-cinema', name: 'Horizon Cinema', bundleId: 'com.streamgrid.horizon', category: 'Channels', version: '1.2.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 day ago', iconBg: '#3A5A56' },
  { id: 'beacon-streams', name: 'Beacon Streams', bundleId: 'com.beacon.tv', category: 'Channels', version: '1.1.4', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '3 days ago', iconBg: '#4F6F8F' },
  { id: 'north-coast-maritime', name: 'North Coast Maritime', bundleId: 'com.maritime.tv', category: 'Channels', version: '1.0.0', readinessScore: 57, checksPassed: 8, totalChecks: 14, status: 'Blocked', lastActivity: '4 days ago', iconBg: '#223735', hasTemplateDefect: true },
  { id: 'summit-broadcast', name: 'Summit Broadcast', bundleId: 'com.summit.network', category: 'Channels', version: '1.4.1', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '5 days ago', iconBg: '#1E252B' },
  { id: 'driftwood-live', name: 'Driftwood Live', bundleId: 'com.driftwood.ott', category: 'Channels', version: '1.0.2', readinessScore: 85, checksPassed: 12, totalChecks: 14, status: 'In review', lastActivity: '6 days ago', iconBg: '#2F4A47' },
  { id: 'timberline-tv', name: 'Timberline TV', bundleId: 'com.timberline.media', category: 'Channels', version: '1.0.1', readinessScore: 64, checksPassed: 9, totalChecks: 14, status: 'Blocked', lastActivity: '1 week ago', iconBg: '#4A545E', hasTemplateDefect: true },

  // News
  { id: 'daybreak-news', name: 'Daybreak News', bundleId: 'com.daybreak.news24', category: 'News', version: '2.0.1', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 days ago', iconBg: '#4F6F8F' },
  { id: 'brightfield-weather', name: 'Brightfield Weather', bundleId: 'com.brightfield.forecast', category: 'News', version: '1.3.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '4 days ago', iconBg: '#3A5A56' },
  { id: 'metro-dispatch', name: 'Metro Dispatch', bundleId: 'com.metro.daily', category: 'News', version: '1.1.2', readinessScore: 92, checksPassed: 13, totalChecks: 14, status: 'In review', lastActivity: '1 week ago', iconBg: '#223735' },
  { id: 'global-digest', name: 'Global Digest', bundleId: 'com.digest.tv', category: 'News', version: '1.0.4', readinessScore: 78, checksPassed: 11, totalChecks: 14, status: 'In progress', lastActivity: '1 week ago', iconBg: '#14181C' },
  { id: 'capital-bulletin', name: 'Capital Bulletin', bundleId: 'com.capital.live', category: 'News', version: '1.2.1', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 week ago', iconBg: '#2F4A47' },
  { id: 'frontier-wire', name: 'Frontier Wire', bundleId: 'com.frontier.wire', category: 'News', version: '1.0.0', readinessScore: 85, checksPassed: 12, totalChecks: 14, status: 'In review', lastActivity: '2 weeks ago', iconBg: '#4F6F8F' },
  { id: 'agri-pulse', name: 'AgriPulse Network', bundleId: 'com.agripulse.tv', category: 'News', version: '1.1.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 weeks ago', iconBg: '#3A5A56' },

  // Fitness
  { id: 'pinewood-fitness', name: 'Pinewood Fitness', bundleId: 'com.pinewood.workout', category: 'Fitness', version: '1.1.5', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 day ago', iconBg: '#2F4A47' },
  { id: 'solstice-yoga', name: 'Solstice Yoga', bundleId: 'com.solstice.flow', category: 'Fitness', version: '1.0.8', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '3 days ago', iconBg: '#8FA79F' },
  { id: 'peak-climbing', name: 'Peak Endurance', bundleId: 'com.peak.motion', category: 'Fitness', version: '1.0.2', readinessScore: 85, checksPassed: 12, totalChecks: 14, status: 'In review', lastActivity: '5 days ago', iconBg: '#223735' },
  { id: 'tempo-cardio', name: 'Tempo Cardio', bundleId: 'com.tempo.intervals', category: 'Fitness', version: '1.2.2', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 week ago', iconBg: '#4F6F8F' },
  { id: 'meadow-meditation', name: 'Meadow Mindful', bundleId: 'com.meadow.calm', category: 'Fitness', version: '1.0.1', readinessScore: 71, checksPassed: 10, totalChecks: 14, status: 'In progress', lastActivity: '2 weeks ago', iconBg: '#3A5A56' },
  { id: 'iron-stride', name: 'Iron Stride Gym', bundleId: 'com.ironstride.wod', category: 'Fitness', version: '1.0.0', readinessScore: 57, checksPassed: 8, totalChecks: 14, status: 'Blocked', lastActivity: '2 weeks ago', iconBg: '#14181C', hasTemplateDefect: true },

  // Kids
  { id: 'lantern-kids', name: 'Lantern Kids', bundleId: 'com.lantern.playhouse', category: 'Kids', version: '1.4.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 days ago', iconBg: '#C9794F' },
  { id: 'storybook-tales', name: 'Storybook Tales', bundleId: 'com.storybook.animation', category: 'Kids', version: '1.2.1', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '4 days ago', iconBg: '#8FA79F' },
  { id: 'whistle-stop-toons', name: 'Whistlestop Toons', bundleId: 'com.whistlestop.kids', category: 'Kids', version: '1.0.3', readinessScore: 92, checksPassed: 13, totalChecks: 14, status: 'In review', lastActivity: '6 days ago', iconBg: '#4F6F8F' },
  { id: 'curious-sprouts', name: 'Curious Sprouts', bundleId: 'com.sprouts.learning', category: 'Kids', version: '1.1.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 week ago', iconBg: '#3A5A56' },
  { id: 'pocket-pals', name: 'Pocket Pals Adventures', bundleId: 'com.pocketpals.tv', category: 'Kids', version: '1.0.1', readinessScore: 78, checksPassed: 11, totalChecks: 14, status: 'In progress', lastActivity: '2 weeks ago', iconBg: '#2F4A47' },
  { id: 'starling-rhymes', name: 'Starling Nursery', bundleId: 'com.starling.singalong', category: 'Kids', version: '1.3.2', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '3 weeks ago', iconBg: '#C9794F' },

  // Radio & Audio
  { id: 'tidepool-radio', name: 'Tidepool Radio', bundleId: 'com.tidepool.fm', category: 'Radio', version: '1.1.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 days ago', iconBg: '#4F6F8F' },
  { id: 'echo-jazz', name: 'Echo Jazz Club', bundleId: 'com.echojazz.stream', category: 'Radio', version: '1.0.6', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '5 days ago', iconBg: '#223735' },
  { id: 'pulse-edm', name: 'Pulse Dance Wave', bundleId: 'com.pulsedance.audio', category: 'Radio', version: '1.0.2', readinessScore: 85, checksPassed: 12, totalChecks: 14, status: 'In review', lastActivity: '1 week ago', iconBg: '#3A5A56' },
  { id: 'amber-acoustic', name: 'Amber Acoustic Sessions', bundleId: 'com.amber.unplugged', category: 'Radio', version: '1.2.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 weeks ago', iconBg: '#C9794F' },
  { id: 'ambient-slate', name: 'Ambient Slate', bundleId: 'com.ambientslate.sleep', category: 'Radio', version: '1.0.0', readinessScore: 78, checksPassed: 11, totalChecks: 14, status: 'In progress', lastActivity: '2 weeks ago', iconBg: '#14181C' },
  { id: 'classical-forum', name: 'Classical Forum', bundleId: 'com.classicalforum.tv', category: 'Radio', version: '1.1.3', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '3 weeks ago', iconBg: '#2F4A47' },

  // Learning
  { id: 'alder-learning', name: 'Alder Documentaries', bundleId: 'com.alder.academy', category: 'Learning', version: '1.0.5', readinessScore: 92, checksPassed: 13, totalChecks: 14, status: 'In review', lastActivity: '3 days ago', iconBg: '#3A5A56' },
  { id: 'nova-science', name: 'Nova Science Weekly', bundleId: 'com.novascience.lab', category: 'Learning', version: '1.3.1', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '4 days ago', iconBg: '#4F6F8F' },
  { id: 'copperline-cooking', name: 'Copperline Cooking', bundleId: 'com.copperline.culinary', category: 'Learning', version: '1.2.0', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 week ago', iconBg: '#C9794F' },
  { id: 'atelier-craft', name: 'Atelier Artisan Workshop', bundleId: 'com.atelier.maker', category: 'Learning', version: '1.0.2', readinessScore: 85, checksPassed: 12, totalChecks: 14, status: 'In review', lastActivity: '1 week ago', iconBg: '#223735' },
  { id: 'greenhouse-botany', name: 'Greenhouse Flora', bundleId: 'com.greenhouse.plants', category: 'Learning', version: '1.0.0', readinessScore: 71, checksPassed: 10, totalChecks: 14, status: 'In progress', lastActivity: '2 weeks ago', iconBg: '#3A5A56' },
  { id: 'atlas-geography', name: 'Atlas Expeditions', bundleId: 'com.atlas.world', category: 'Learning', version: '1.1.4', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '2 weeks ago', iconBg: '#2F4A47' },
  { id: 'deep-blue-ocean', name: 'Deep Blue Explorers', bundleId: 'com.deepblue.diving', category: 'Learning', version: '1.0.1', readinessScore: 92, checksPassed: 13, totalChecks: 14, status: 'In review', lastActivity: '3 weeks ago', iconBg: '#4F6F8F' },
  { id: 'astronomy-now', name: 'Cosmos & Astronomy', bundleId: 'com.cosmos.stargaze', category: 'Learning', version: '1.2.3', readinessScore: 100, checksPassed: 14, totalChecks: 14, status: 'Live', lastActivity: '1 month ago', iconBg: '#14181C' },
];
