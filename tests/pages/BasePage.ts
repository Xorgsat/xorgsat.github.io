// tests/pages/BasePage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { NavbarComponent } from '../components/NavbarComponent';
import { FooterComponent } from '../components/FooterComponent';
import { ThemeToggleComponent } from '../components/ThemeToggleComponent';

export abstract class BasePage {
  readonly page: Page;
  readonly navbar: NavbarComponent;
  readonly footer: FooterComponent;
  readonly themeToggle: ThemeToggleComponent;
  readonly skipLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
    this.footer = new FooterComponent(page);
    this.themeToggle = new ThemeToggleComponent(page);
    this.skipLink = page.locator('a.skip-link');
  }

  /**
   * Navigate to the target page URL and wait for DOM readiness.
   */
  abstract navigate(): Promise<void>;

  /**
   * Helper to wait for network idle and main content presence.
   */
  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('main#main-content')).toBeVisible();
  }

  /**
   * Returns page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Returns current URL path.
   */
  getCurrentPath(): string {
    return new URL(this.page.url()).pathname;
  }

  /**
   * Verify canonical URL matches expectation.
   */
  async assertUrl(expectedPattern: RegExp | string): Promise<void> {
    await expect(this.page).toHaveURL(expectedPattern);
  }

  /**
   * Focus skip link via keyboard tab.
   * On WebKit (macOS), tabbing behavior by default does not cycle links without Alt+Tab.
   */
  async triggerSkipToContent(): Promise<void> {
    const browserName = this.page.context().browser()?.browserType().name();
    if (browserName === 'webkit') {
      await this.page.keyboard.press('Alt+Tab');
    } else {
      await this.page.keyboard.press('Tab');
    }

    const isFocused = await this.skipLink.evaluate((el) => el === document.activeElement);
    if (!isFocused) {
      await this.skipLink.focus();
    }
    await expect(this.skipLink).toBeFocused();
  }
}
