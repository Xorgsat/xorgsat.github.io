// src/utils/dates.ts

/**
 * Formats a Date object to English long date format (e.g. 'January 15, 2026')
 */
export function formatPublicationDate(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Estimates reading time in minutes assuming 200 words per minute
 */
export function estimateReadingTime(content: string): number {
  if (!content || !content.trim()) return 1;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}
