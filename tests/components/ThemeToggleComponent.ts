// tests/components/ThemeToggleComponent.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class ThemeToggleComponent {
  readonly page: Page;
  readonly toggleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toggleButton = page.locator('#theme-toggle');
  }

  async getActiveTheme(): Promise<'light' | 'dark'> {
    const theme = await this.page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    return (theme as 'light' | 'dark') || 'light';
  }

  async getStoredTheme(): Promise<string | null> {
    return this.page.evaluate(() => localStorage.getItem('theme'));
  }

  async toggleTheme(): Promise<'light' | 'dark'> {
    const initialTheme = await this.getActiveTheme();
    await this.toggleButton.click();

    // Wait for theme attribute mutation
    await expect(this.page.locator('html')).not.toHaveAttribute('data-theme', initialTheme);
    const newTheme = await this.getActiveTheme();

    // Assert localStorage persistence
    const stored = await this.getStoredTheme();
    expect(stored).toBe(newTheme);

    return newTheme;
  }
}
