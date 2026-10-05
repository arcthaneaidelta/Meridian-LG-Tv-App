export type AssetStatus = 'pass' | 'warn' | 'fail';

export interface StoreAsset {
  id: string;
  name: string;
  fileName: string;
  expectedSpec: {
    dimensions: string;
    width: number;
    height: number;
    format: string;
    maxWeight: string;
    maxWeightKb: number;
    required: boolean;
  };
  currentInfo: {
    dimensions: string;
    width: number;
    height: number;
    format: string;
    weight: string;
    weightKb: number;
  };
  status: AssetStatus;
  statusMessage?: string;
  isTitleSafeSupported?: boolean;
}

export const initialStoreAssets: StoreAsset[] = [
  {
    id: 'asset-icon',
    name: 'App Icon',
    fileName: 'icon.png',
    expectedSpec: {
      dimensions: '130 × 130 px',
      width: 130,
      height: 130,
      format: 'PNG',
      maxWeight: '≤ 100 KB',
      maxWeightKb: 100,
      required: true,
    },
    currentInfo: {
      dimensions: '130 × 130 px',
      width: 130,
      height: 130,
      format: 'PNG',
      weight: '34 KB',
      weightKb: 34,
    },
    status: 'pass',
    statusMessage: 'Matches exact LG Store dimension and alpha requirements.',
  },
  {
    id: 'asset-large-icon',
    name: 'Large Icon (Seller Lounge)',
    fileName: 'largeIcon.png',
    expectedSpec: {
      dimensions: '160 × 160 px',
      width: 160,
      height: 160,
      format: 'PNG',
      maxWeight: '≤ 200 KB',
      maxWeightKb: 200,
      required: true,
    },
    currentInfo: {
      dimensions: '160 × 160 px',
      width: 160,
      height: 160,
      format: 'PNG',
      weight: '62 KB',
      weightKb: 62,
    },
    status: 'pass',
    statusMessage: 'Verified crisp edge anti-aliasing on dark & light launcher tiles.',
  },
  {
    id: 'asset-splash',
    name: 'Splash Background',
    fileName: 'splash.png',
    expectedSpec: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'PNG / JPG',
      maxWeight: '≤ 2.0 MB',
      maxWeightKb: 2048,
      required: true,
    },
    currentInfo: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'PNG',
      weight: '480 KB',
      weightKb: 480,
    },
    status: 'pass',
    statusMessage: 'Clean resolution, well inside the 2.0 MB boot memory budget.',
    isTitleSafeSupported: true,
  },
  {
    id: 'asset-launcher-bg',
    name: 'Launcher Background (Recents)',
    fileName: 'bgImage.png',
    expectedSpec: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'PNG',
      maxWeight: '≤ 1.5 MB',
      maxWeightKb: 1536,
      required: false,
    },
    currentInfo: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'PNG',
      weight: '820 KB',
      weightKb: 820,
    },
    status: 'pass',
    statusMessage: 'Subtle contrast ratio verified behind system recent-bar cards.',
    isTitleSafeSupported: true,
  },
  {
    id: 'asset-screenshot-1',
    name: 'Store Screenshot 1 (Home)',
    fileName: 'screen1.jpg',
    expectedSpec: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'JPG / PNG',
      maxWeight: '≤ 3.0 MB',
      maxWeightKb: 3072,
      required: true,
    },
    currentInfo: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'JPG',
      weight: '1.1 MB',
      weightKb: 1120,
    },
    status: 'pass',
    statusMessage: 'Clear 16:9 capture without desktop OS chrome or watermarks.',
    isTitleSafeSupported: true,
  },
  {
    id: 'asset-screenshot-2',
    name: 'Store Screenshot 2 (Detail View)',
    fileName: 'screen2.jpg',
    expectedSpec: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'JPG / PNG',
      maxWeight: '≤ 3.0 MB',
      maxWeightKb: 3072,
      required: true,
    },
    currentInfo: {
      dimensions: '1920 × 1080 px',
      width: 1920,
      height: 1080,
      format: 'JPG',
      weight: '980 KB',
      weightKb: 980,
    },
    status: 'pass',
    statusMessage: 'Passes content clarity standards.',
    isTitleSafeSupported: true,
  },
  {
    id: 'asset-promo',
    name: 'Store Promo Banner',
    fileName: 'banner.png',
    expectedSpec: {
      dimensions: '400 × 270 px',
      width: 400,
      height: 270,
      format: 'PNG',
      maxWeight: '≤ 300 KB',
      maxWeightKb: 300,
      required: false,
    },
    currentInfo: {
      dimensions: '450 × 300 px',
      width: 450,
      height: 300,
      format: 'PNG',
      weight: '340 KB',
      weightKb: 340,
    },
    status: 'warn',
    statusMessage: 'Aspect ratio is 3:2 instead of 40:27; needs crop to prevent store letterboxing.',
  },
];
