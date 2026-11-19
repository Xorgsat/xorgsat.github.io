// tests/components/FooterComponent.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;
  readonly footer: Locator;
  readonly directoryLinks: Locator;
  readonly resumeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer.site-footer');
    this.directoryLinks = this.footer.locator('.directory-list a');
    this.resumeLink = this.footer.getByRole('link', { name: /Resume \(PDF\)/i });
  }

  async assertVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async clickFooterLink(label: string): Promise<void> {
    const link = this.footer.getByRole('link', { name: label });
    await link.click();
  }
}
