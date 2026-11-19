// tests/components/TerminalWidgetComponent.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class TerminalWidgetComponent {
  readonly page: Page;
  readonly widget: Locator;
  readonly replayButton: Locator;
  readonly speedToggles: Locator;
  readonly statusPill: Locator;
  readonly logOutput: Locator;
  readonly qualityGateResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.widget = page.locator('#terminal-widget');
    this.replayButton = this.widget.locator('#btn-replay-exec');
    this.speedToggles = this.widget.locator('.speed-btn');
    this.statusPill = this.widget.locator('#stat-gate');
    this.logOutput = this.widget.locator('#terminal-logs');
    this.qualityGateResult = this.widget.locator('#stat-gate');
  }

  async assertVisible(): Promise<void> {
    await expect(this.widget).toBeVisible();
  }

  async clickReplay(): Promise<void> {
    await this.replayButton.click();
  }

  async waitForExecutionComplete(timeout = 10000): Promise<void> {
    await expect(this.logOutput).toContainText('QUALITY GATE EVALUATION', { timeout });
    await expect(this.qualityGateResult).toContainText('PASSED', { timeout });
  }

  async getTerminalLogText(): Promise<string> {
    return (await this.logOutput.textContent()) || '';
  }
}
