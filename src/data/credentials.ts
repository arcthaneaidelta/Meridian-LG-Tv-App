export interface CredentialEntry {
  title: string;
  value: string;
  detail: string;
}

export const studioCredentials: CredentialEntry[] = [
  {
    title: 'webOS SDK & CLI Mastery',
    value: 'webOS CLI (ares-*) · Developer Mode',
    detail: 'Complete proficiency with ares-package, ares-install, ares-inspect, luna service calls, and manifest configuration.',
  },
  {
    title: 'Physical LG TV Testing Lab',
    value: 'Real hardware testing suite',
    detail: 'Physical evaluation on LG webOS Smart TVs with genuine LG Magic Remote pointer and 5-way D-pad directional controls.',
  },
  {
    title: 'LG Content Store Submission',
    value: 'Direct Seller Lounge onboarding',
    detail: 'End-to-end management of Seller Lounge metadata, IPK binary signing, QA test report responses, and revision cycles.',
  },
  {
    title: 'Review Fixes Included',
    value: '100% QA loop resolution',
    detail: 'Comprehensive post-review remediation for back-key mechanics, focus anomalies, aspect ratios, and offline edge cases.',
  },
  {
    title: 'Availability & Turnaround',
    value: 'Ready for immediate kickoff',
    detail: 'First app audit delivered in 24 hours; repeatable packaging pipeline established for batch rollouts across ~40 apps.',
  }
];

export const availabilityDates = [
  { day: 'Tomorrow', date: 'Immediate Kickoff', slots: 'Reserved for App #1 intake' },
  { day: 'In 2 Days', date: 'Mid-week Sprint', slots: 'Full review & simulator pass' },
  { day: 'Next Monday', date: 'Batch Wave 1', slots: 'Production pipeline rollout' },
];
