// tests/e2e/projects.spec.ts
import { test, expect } from '../fixtures/testFixtures';

test.describe('Projects Directory & Catalog', () => {
  test('renders all 12 portfolio projects with blueprint banners [@smoke]', async ({
    projectsPage,
    consoleGuard,
  }) => {
    await projectsPage.navigate();
    await projectsPage.assertTotalProjectCount(12);

    consoleGuard.assertZeroErrors();
  });

  test('filters projects dynamically by domain category [@regression]', async ({
    projectsPage,
    consoleGuard,
  }) => {
    await projectsPage.navigate();

    // Filter by API & Backend Quality
    await projectsPage.filterByCategory('API & Backend Quality');
    let count = await projectsPage.getVisibleProjectCount();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(12);

    // Filter by Performance Engineering
    await projectsPage.filterByCategory('Performance Engineering');
    count = await projectsPage.getVisibleProjectCount();
    expect(count).toBeGreaterThan(0);

    // Restore to All
    await projectsPage.filterByCategory('All');
    count = await projectsPage.getVisibleProjectCount();
    expect(count).toBe(12);

    consoleGuard.assertZeroErrors();
  });

  test('navigates to individual case study page with complete metadata', async ({
    projectsPage,
    projectDetailPage,
    consoleGuard,
  }) => {
    await projectsPage.navigate();

    // Click into Banking Quality Engineering
    await projectsPage.openProjectByTitle('Banking & Financial Transaction Quality Engine');

    await projectDetailPage.assertUrl(/\/projects\/banking-quality-engineering/);
    await projectDetailPage.assertMetadataRendered();

    // Verify back navigation
    await projectDetailPage.clickBackToProjects();
    await projectsPage.assertUrl('/projects');

    consoleGuard.assertZeroErrors();
  });
});
