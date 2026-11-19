// tests/pages/EngineeringNotesPage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppRoutes } from '../data/routes';

export class EngineeringNotesPage extends BasePage {
  readonly pageTitle: Locator;
  readonly articleCards: Locator;
  readonly filterButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1.page-title');
    this.articleCards = page.locator('.article-card');
    this.filterButtons = page.locator('.filter-btn');
  }

  async navigate(): Promise<void> {
    await this.page.goto(AppRoutes.NOTES);
    await this.waitForPageLoaded();
  }

  async assertArticlesPublished(minCount = 3): Promise<void> {
    const count = await this.articleCards.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async openArticleByIndex(index = 0): Promise<void> {
    const link = this.articleCards.nth(index).locator('h2 a');
    await link.click();
  }
}
