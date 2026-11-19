// tests/pages/ContactPage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppRoutes } from '../data/routes';

export class ContactPage extends BasePage {
  readonly pageTitle: Locator;
  readonly emailLink: Locator;
  readonly linkedinLink: Locator;
  readonly githubLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1.page-title');
    this.emailLink = page.locator('a.email-btn');
    this.linkedinLink = page.locator('a.profile-item:has-text("LinkedIn")');
    this.githubLink = page.locator('a.profile-item:has-text("GitHub")');
  }

  async navigate(): Promise<void> {
    await this.page.goto(AppRoutes.CONTACT);
    await this.waitForPageLoaded();
  }

  async assertDirectChannelsVisible(): Promise<void> {
    await expect(this.emailLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.githubLink).toBeVisible();
  }
}
