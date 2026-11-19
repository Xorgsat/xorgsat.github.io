// tests/utils/AccessibilityAuditor.ts
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export interface AuditOptions {
  includeTags?: string[];
  excludeRules?: string[];
}

export class AccessibilityAuditor {
  private page: Page;
  private defaultTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Run an automated accessibility scan using axe-core.
   * Returns violations array (empty if fully compliant).
   */
  public async runAudit(options: AuditOptions = {}) {
    const tags = options.includeTags || this.defaultTags;
    let builder = new AxeBuilder({ page: this.page }).withTags(tags);

    if (options.excludeRules && options.excludeRules.length > 0) {
      builder = builder.disableRules(options.excludeRules);
    }

    const results = await builder.analyze();
    return results.violations;
  }

  /**
   * Asserts zero WCAG 2.2 Level AA violations on the current page view.
   */
  public async assertCompliant(options: AuditOptions = {}): Promise<void> {
    const violations = await this.runAudit(options);
    if (violations.length > 0) {
      const formatted = violations
        .map(
          (v) =>
            `[WCAG Violation] ${v.id} (${v.impact?.toUpperCase()}): ${v.help}\n` +
            `  Help URL: ${v.helpUrl}\n` +
            `  Nodes affected:\n` +
            v.nodes
              .map((n) => `    - Target: ${n.target.join(' ')}\n      HTML: ${n.html}`)
              .join('\n')
        )
        .join('\n\n');

      throw new Error(
        `AccessibilityAuditor detected ${violations.length} WCAG violation(s):\n${formatted}`
      );
    }
  }

  /**
   * Audits both Light and Dark themes sequentially on the current route.
   */
  public async assertDualThemeCompliant(): Promise<void> {
    // 1. Audit in current theme
    await this.assertCompliant();

    // 2. Toggle theme and audit in alternate theme
    const themeToggle = this.page.locator('#theme-toggle');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await this.page.waitForTimeout(100); // Allow CSS custom properties to repaint
      await this.assertCompliant();
    }
  }
}
