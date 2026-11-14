// tests/unit/slugs.test.ts
import { describe, it, expect } from 'vitest';
import { getCleanSlug, formatSlugToTitle } from '../../src/utils/slugs';

describe('getCleanSlug', () => {
  it('strips leading numeric prefixes from file ids', () => {
    expect(getCleanSlug('01-banking-quality-engineering.md')).toBe('banking-quality-engineering');
    expect(getCleanSlug('12-commercial-performance-suite.md')).toBe('commercial-performance-suite');
  });

  it('handles ids without numeric prefixes', () => {
    expect(getCleanSlug('advanced-playwright-framework.md')).toBe('advanced-playwright-framework');
  });

  it('handles mdx extensions', () => {
    expect(getCleanSlug('05-advanced-playwright.mdx')).toBe('advanced-playwright');
  });

  it('handles empty input gracefully', () => {
    expect(getCleanSlug('')).toBe('');
  });
});

describe('formatSlugToTitle', () => {
  it('converts kebab-case to Title Case words', () => {
    expect(formatSlugToTitle('banking-quality-engineering')).toBe('Banking Quality Engineering');
    expect(formatSlugToTitle('playwright-test')).toBe('Playwright Test');
  });

  it('handles empty input gracefully', () => {
    expect(formatSlugToTitle('')).toBe('');
  });
});
