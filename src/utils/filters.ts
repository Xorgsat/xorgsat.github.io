// src/utils/filters.ts

export interface ProjectFilterItem {
  category: string;
  status: string;
  techStack: string[];
}

/**
 * Filters project list by category or returns all if 'All' is selected
 */
export function filterProjectsByCategory<T extends ProjectFilterItem>(
  items: T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory.toLowerCase() === 'all') {
    return items;
  }
  return items.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());
}

/**
 * Filters project list by technology tag
 */
export function filterProjectsByTech<T extends ProjectFilterItem>(
  items: T[],
  techTag: string
): T[] {
  if (!techTag || techTag.toLowerCase() === 'all') {
    return items;
  }
  return items.filter((item) =>
    item.techStack.some((t) => t.toLowerCase() === techTag.toLowerCase())
  );
}
