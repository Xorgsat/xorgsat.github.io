// tests/components/NavbarComponent.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class NavbarComponent {
  readonly page: Page;
  readonly header: Locator;
  readonly brandLink: Locator;
  readonly navLinks: Locator;
  readonly availabilityPill: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header.site-header');
    this.brandLink = page.locator('a.brand-link');
    this.navLinks = page.locator('.desktop-nav .nav-link');
    this.availabilityPill = page.locator('.availability-pill');
    this.mobileMenuButton = page.locator('#mobile-menu-btn');
    this.mobileNav = page.locator('#mobile-nav');
  }

  /**
   * Click a navigation route by label (automatically handles desktop vs mobile drawer).
   */
  async clickNavLink(
    label: 'Home' | 'Projects' | 'Engineering Notes' | 'About' | 'Contact'
  ): Promise<void> {
    const isMobile = await this.mobileMenuButton.isVisible();
    if (isMobile) {
      await this.openMobileMenu();
      await this.clickMobileNavLink(label);
    } else {
      const link = this.header
        .locator('.desktop-nav')
        .getByRole('link', { name: label, exact: true });
      await link.click();
    }
  }

  /**
   * Verify navigation link is active.
   */
  async assertNavLinkActive(label: string): Promise<void> {
    const activeLink = this.header.locator(`.desktop-nav .nav-link.active`);
    await expect(activeLink).toHaveText(label);
  }

  /**
   * Open the mobile drawer on mobile viewports.
   */
  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
    await expect(this.mobileNav).toBeVisible();
    await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
  }

  /**
   * Close the mobile drawer.
   */
  async closeMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
    await expect(this.mobileNav).not.toBeVisible();
    await expect(this.mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
  }

  /**
   * Click a link inside the mobile drawer.
   */
  async clickMobileNavLink(label: string): Promise<void> {
    const link = this.mobileNav.getByRole('link', { name: label });
    await link.click();
  }
}
