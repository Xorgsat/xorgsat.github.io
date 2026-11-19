// tests/data/categories.ts

export const ProjectCategories = [
  'All',
  'UI & E2E Automation',
  'API & Backend Quality',
  'Mobile Automation',
  'Performance Engineering',
  'Test Infrastructure',
  'Enterprise Systems',
  'Commercial Project',
] as const;

export type ProjectCategory = (typeof ProjectCategories)[number];

export const VerifiedMetrics = {
  EXPERIENCE_YEARS: '8+ Years',
  FRAMEWORKS_COUNT: '12',
  AUTOMATED_TESTS: '13,000+',
  REGRESSION_REDUCTION: '89.6%',
  TOTAL_TESTS_HANDLED: '28,000+',
} as const;
