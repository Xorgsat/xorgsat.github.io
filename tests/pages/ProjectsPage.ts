// tests/pages/ProjectsPage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppRoutes } from '../data/routes';
import type { ProjectCategory } from '../data/categories';

export class ProjectsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly filterButtons: Locator;
  readonly filterCountBadge: Locator;
  readonly projectCards: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1.page-title');
    this.filterButtons = page.locator('.filter-btn');
    this.filterCountBadge = page.locator('#filter-count');
    this.projectCards = page.locator('.project-card');
  }

  async navigate(): Promise<void> {
    await this.page.goto(AppRoutes.PROJECTS);
    await this.waitForPageLoaded();
  }

  async filterByCategory(category: ProjectCategory): Promise<void> {
    const btn = this.page.getByRole('button', { name: category, exact: true });
    await btn.click();
    await expect(btn).toHaveClass(/active/);
  }

  async getVisibleProjectCount(): Promise<number> {
    return this.page.locator('.project-card:not([hidden])').count();
  }

  async assertTotalProjectCount(expected = 12): Promise<void> {
    await expect(this.projectCards).toHaveCount(expected);
  }

  async openProjectByTitle(title: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: title });
    await heading.getByRole('link').click();
  }
}
