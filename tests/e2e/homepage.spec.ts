// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage & Accessibility', () => {
  test('renders hero, headline, and verified metrics', async ({ page }) => {
    await page.goto('/');

    // Verify main headline and role
    await expect(page.locator('h1')).toContainText('Senior SDET');
    await expect(page.locator('h1')).toContainText('Quality Engineering Architect');

    // Verify verified metrics cards
    await expect(page.getByText('8+ Years')).toBeVisible();
    await expect(page.getByText('12', { exact: true })).toBeVisible();
    await expect(page.getByText('13,000+')).toBeVisible();

    // Verify featured projects section exists
    await expect(
      page.getByRole('heading', { name: 'Featured Engineering Projects' })
    ).toBeVisible();
  });

  test('toggles theme between light and dark mode', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();

    // Click to toggle theme
    const initialTheme = await page.evaluate(
      () => document.documentElement.getAttribute('data-theme') || 'light'
    );
    await themeToggle.click();

    const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage persistence
    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe(newTheme);
  });

  test('passes WCAG 2.2 Level AA accessibility audit', async ({ page }) => {
    await page.goto('/');

    // Inject and run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
