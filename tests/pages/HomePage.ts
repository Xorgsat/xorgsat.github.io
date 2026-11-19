// tests/pages/HomePage.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TerminalWidgetComponent } from '../components/TerminalWidgetComponent';
import { AppRoutes } from '../data/routes';

export class HomePage extends BasePage {
  readonly heroHeadline: Locator;
  readonly heroRoleKicker: Locator;
  readonly heroIllustration: Locator;
  readonly exploreCaseStudiesCta: Locator;
  readonly viewGithubCta: Locator;
  readonly terminalWidget: TerminalWidgetComponent;
  readonly metricCards: Locator;
  readonly telemetryDistributionBar: Locator;
  readonly featuredProjectsHeading: Locator;
  readonly topologySection: Locator;
  readonly methodologySection: Locator;
  readonly contactSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heroHeadline = page.locator('h1.hero-title .hero-core-headline');
    this.heroRoleKicker = page.locator('.hero-role-kicker');
    this.heroIllustration = page.locator('.hero-visual svg.architecture-svg');
    this.exploreCaseStudiesCta = page.getByRole('link', { name: /Explore Case Studies/i });
    this.viewGithubCta = page.getByRole('link', { name: /View GitHub/i });
    this.terminalWidget = new TerminalWidgetComponent(page);
    this.metricCards = page.locator('.metric-card');
    this.telemetryDistributionBar = page.locator('.distribution-bar');
    this.featuredProjectsHeading = page.getByRole('heading', {
      name: 'Featured Engineering Projects',
    });
    this.topologySection = page.locator('#arch-interactive-diagram');
    this.methodologySection = page.locator('.methodology-section');
    this.contactSection = page.locator('.contact-cta-section');
  }

  async navigate(): Promise<void> {
    await this.page.goto(AppRoutes.HOME);
    await this.waitForPageLoaded();
  }

  async assertHeroElements(): Promise<void> {
    await expect(this.heroRoleKicker).toContainText('Senior SDET');
    await expect(this.heroRoleKicker).toContainText('Quality Engineering Architect');
    await expect(this.heroHeadline).toContainText('I engineer confidence into software');
    await expect(this.heroIllustration).toBeVisible();
    await expect(this.exploreCaseStudiesCta).toBeVisible();
  }

  async assertVerifiedMetrics(): Promise<void> {
    await expect(this.page.getByText('8+ Years')).toBeVisible();
    await expect(this.page.getByText('12', { exact: true })).toBeVisible();
    await expect(this.page.getByText('13,000+')).toBeVisible();
    await expect(this.page.getByText('89.6%', { exact: true })).toBeVisible();
    await expect(this.telemetryDistributionBar).toBeVisible();
  }

  async selectTopologyNode(nodeId: string): Promise<void> {
    const tab = this.topologySection.locator(`button[data-id="${nodeId}"]`);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }
}
