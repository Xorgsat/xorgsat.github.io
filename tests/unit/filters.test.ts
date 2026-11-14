// tests/unit/filters.test.ts
import { describe, it, expect } from 'vitest';
import {
  filterProjectsByCategory,
  filterProjectsByTech,
  type ProjectFilterItem,
} from '../../src/utils/filters';

const mockProjects: ProjectFilterItem[] = [
  {
    category: 'UI & E2E Automation',
    status: 'In Development',
    techStack: ['Playwright', 'TypeScript'],
  },
  {
    category: 'API & Backend Quality',
    status: 'Completed',
    techStack: ['Python', 'Requests', 'Pytest'],
  },
  {
    category: 'Enterprise Systems',
    status: 'Completed',
    techStack: ['Playwright', 'Docker'],
  },
];

describe('filterProjectsByCategory', () => {
  it('returns all items when "All" is selected', () => {
    const result = filterProjectsByCategory(mockProjects, 'All');
    expect(result.length).toBe(3);
  });

  it('filters accurately by category', () => {
    const result = filterProjectsByCategory(mockProjects, 'UI & E2E Automation');
    expect(result.length).toBe(1);
    expect(result[0].category).toBe('UI & E2E Automation');
  });

  it('handles case-insensitive category matching', () => {
    const result = filterProjectsByCategory(mockProjects, 'api & backend quality');
    expect(result.length).toBe(1);
    expect(result[0].category).toBe('API & Backend Quality');
  });

  it('returns empty array when no matches exist', () => {
    const result = filterProjectsByCategory(mockProjects, 'Non-existent Category');
    expect(result.length).toBe(0);
  });
});

describe('filterProjectsByTech', () => {
  it('filters items containing the specified technology tag', () => {
    const result = filterProjectsByTech(mockProjects, 'Playwright');
    expect(result.length).toBe(2);
  });

  it('handles case-insensitive tech matching', () => {
    const result = filterProjectsByTech(mockProjects, 'python');
    expect(result.length).toBe(1);
  });

  it('returns all items when techTag is "All" or empty', () => {
    expect(filterProjectsByTech(mockProjects, 'All').length).toBe(3);
    expect(filterProjectsByTech(mockProjects, '').length).toBe(3);
  });
});
