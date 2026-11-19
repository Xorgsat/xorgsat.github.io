// tests/pages/AboutPage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppRoutes } from '../data/routes';

export class AboutPage extends BasePage {
  readonly pageTitle: Locator;
  readonly architectureBlueprintCard: Locator;
  readonly timelineItems: Locator;
  readonly metricsSummaryCards: Locator;
  readonly frameworkTable: Locator;
  readonly categoryTable: Locator;
  readonly downloadResumeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1.page-title');
    this.architectureBlueprintCard = page.locator('.about-blueprint-card');
    this.timelineItems = page.locator('.timeline-item');
    this.metricsSummaryCards = page.locator('.summary-mini-card');
    this.frameworkTable = page.locator('table.metrics-table').first();
    this.categoryTable = page.locator('table.metrics-table').nth(1);
    this.downloadResumeBtn = page.getByRole('link', { name: /Download Resume \(PDF\)/i });
  }

  async navigate(): Promise<void> {
    await this.page.goto(AppRoutes.ABOUT);
    await this.waitForPageLoaded();
  }

  async assertTimelineCount(minItems = 4): Promise<void> {
    const count = await this.timelineItems.count();
    expect(count).toBeGreaterThanOrEqual(minItems);
  }

  async assertMetricsTablesPopulated(): Promise<void> {
    await expect(this.frameworkTable).toBeVisible();
    await expect(this.categoryTable).toBeVisible();
    await expect(this.frameworkTable.locator('tbody tr')).not.toHaveCount(0);
    await expect(this.categoryTable.locator('tbody tr')).not.toHaveCount(0);
  }
}
