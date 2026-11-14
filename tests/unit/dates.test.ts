// tests/unit/dates.test.ts
import { describe, it, expect } from 'vitest';
import { formatPublicationDate, estimateReadingTime } from '../../src/utils/dates';

describe('formatPublicationDate', () => {
  it('formats dates to Month Day, Year', () => {
    const testDate = new Date('2026-01-15T00:00:00Z');
    expect(formatPublicationDate(testDate)).toBe('January 15, 2026');
  });

  it('handles invalid date objects gracefully', () => {
    expect(formatPublicationDate(new Date('invalid'))).toBe('Invalid Date');
  });
});

describe('estimateReadingTime', () => {
  it('calculates 1 minute for short content', () => {
    expect(estimateReadingTime('This is a short post.')).toBe(1);
  });

  it('calculates proportional reading time for longer text', () => {
    // 450 words should be Math.ceil(450 / 200) = 3 minutes
    const words = new Array(450).fill('word').join(' ');
    expect(estimateReadingTime(words)).toBe(3);
  });

  it('handles empty content gracefully', () => {
    expect(estimateReadingTime('')).toBe(1);
  });
});
