// src/utils/slugs.ts

/**
 * Strips leading numeric prefixes (e.g. '01-banking-quality-engineering.md' -> 'banking-quality-engineering')
 */
export function getCleanSlug(id: string): string {
  if (!id) return '';
  return id
    .replace(/^[0-9]+-/, '')
    .replace(/\.mdx?$/, '')
    .trim();
}

/**
 * Converts a kebab-case slug to human-readable title casing
 */
export function formatSlugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
