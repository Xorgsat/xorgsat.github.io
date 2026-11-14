// tests/e2e/projects.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Projects Directory & Case Studies', () => {
  test('renders all 12 portfolio projects', async ({ page }) => {
    await page.goto('/projects');

    const projectCards = page.locator('.project-card');
    await expect(projectCards).toHaveCount(12);
  });

  test('filters projects dynamically by domain category', async ({ page }) => {
    await page.goto('/projects');

    // Click 'API & Backend Quality' filter button
    const apiFilterBtn = page.getByRole('button', { name: 'API & Backend Quality' });
    await apiFilterBtn.click();

    // Verify matching cards are visible and non-matching are hidden
    const visibleCards = page.locator('.project-card:not([hidden])');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(12);

    // Click 'All' to restore all 12
    const allFilterBtn = page.getByRole('button', { name: 'All' });
    await allFilterBtn.click();
    await expect(page.locator('.project-card:not([hidden])')).toHaveCount(12);
  });

  test('navigates to individual case study page with complete metadata', async ({ page }) => {
    await page.goto('/projects');

    // Click into Banking Quality Engineering case study
    await page
      .getByRole('heading', { name: 'Banking & Financial Transaction Quality Engine' })
      .getByRole('link')
      .click();

    await expect(page).toHaveURL(/\/projects\/banking-quality-engineering/);
    await expect(page.locator('h1')).toContainText(
      'Banking & Financial Transaction Quality Engine'
    );

    // Verify metadata sections render
    await expect(page.getByText('Business Problem')).toBeVisible();
    await expect(page.getByText('Engineering Focus')).toBeVisible();
    await expect(page.getByRole('link', { name: /Inspect Repository/i })).toBeVisible();

    // Verify back navigation works
    await page.getByRole('link', { name: /Back to 12 Projects Directory/i }).click();
    await expect(page).toHaveURL('/projects');
  });

  test('passes WCAG 2.2 AA accessibility audit on Projects Directory', async ({ page }) => {
    await page.goto('/projects');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
