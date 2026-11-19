// tests/pages/ProjectDetailPage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { BlueprintSchematicComponent } from '../components/BlueprintSchematicComponent';
import { AppRoutes } from '../data/routes';

export class ProjectDetailPage extends BasePage {
  readonly backToProjectsLink: Locator;
  readonly projectTitle: Locator;
  readonly categoryBadge: Locator;
  readonly statusPill: Locator;
  readonly inspectRepoBtn: Locator;
  readonly blueprintSchematic: BlueprintSchematicComponent;
  readonly businessProblemText: Locator;
  readonly engineeringFocusText: Locator;
  readonly caseStudyProse: Locator;

  constructor(page: Page) {
    super(page);
    this.backToProjectsLink = page.getByRole('link', { name: /Back to 12 Projects Directory/i });
    this.projectTitle = page.locator('h1.project-title');
    this.categoryBadge = page.locator('.project-category');
    this.statusPill = page.locator('.status-pill');
    this.inspectRepoBtn = page.getByRole('link', { name: /Inspect Repository/i });
    this.blueprintSchematic = new BlueprintSchematicComponent(page);
    this.businessProblemText = page.locator('.meta-item:has-text("Business Problem") .meta-value');
    this.engineeringFocusText = page.locator(
      '.meta-item:has-text("Engineering Focus") .meta-value'
    );
    this.caseStudyProse = page.locator('article.case-study-content');
  }

  async navigateToSlug(slug: string): Promise<void> {
    await this.page.goto(AppRoutes.CASE_STUDY(slug));
    await this.waitForPageLoaded();
  }

  async navigate(): Promise<void> {
    await this.navigateToSlug('banking-quality-engineering');
  }

  async clickBackToProjects(): Promise<void> {
    await this.backToProjectsLink.click();
  }

  async assertMetadataRendered(): Promise<void> {
    await expect(this.projectTitle).toBeVisible();
    await expect(this.businessProblemText).toBeVisible();
    await expect(this.engineeringFocusText).toBeVisible();
    await expect(this.inspectRepoBtn).toBeVisible();
    await this.blueprintSchematic.assertVisible();
  }
}
