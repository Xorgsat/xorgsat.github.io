// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation & Console Integrity', () => {
  test('navigates seamlessly across primary navigation routes with zero console errors', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const routes = ['/', '/projects', '/engineering-notes', '/about', '/contact'];

    for (const route of routes) {
      await page.goto(route);
      await expect(page).toHaveURL(route);
      await expect(page.locator('main')).toBeVisible();
    }

    // Assert zero critical browser console errors occurred
    expect(consoleErrors).toEqual([]);
  });

  test('skip to main content link becomes focused on tab navigation', async ({ page }) => {
    await page.goto('/');

    // Tab once to focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    expect(await skipLink.getAttribute('href')).toBe('#main-content');
  });

  test('mobile navigation drawer opens and closes correctly on mobile viewport', async ({
    page,
  }) => {
    // Set mobile viewport width
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuBtn = page.locator('#mobile-menu-btn');
    const mobileNav = page.locator('#mobile-nav');

    await expect(menuBtn).toBeVisible();
    await expect(mobileNav).toBeHidden();

    // Open mobile menu
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileNav).toBeVisible();

    // Close mobile menu
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileNav).toBeHidden();
  });
});
