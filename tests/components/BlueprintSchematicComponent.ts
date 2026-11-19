// tests/components/BlueprintSchematicComponent.ts
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class BlueprintSchematicComponent {
  readonly page: Page;
  readonly component: Locator;
  readonly drawingCode: Locator;
  readonly modeButtons: Locator;
  readonly svgCanvas: Locator;
  readonly telemetryFooter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator('#project-blueprint-schematic');
    this.drawingCode = this.component.locator('.dwg-code');
    this.modeButtons = this.component.locator('.mode-btn');
    this.svgCanvas = this.component.locator('.blueprint-svg');
    this.telemetryFooter = this.component.locator('#schematic-telemetry-text');
  }

  async assertVisible(): Promise<void> {
    await expect(this.component).toBeVisible();
    await expect(this.svgCanvas).toBeVisible();
  }

  async switchPerspective(mode: 'system' | 'problem' | 'harness'): Promise<void> {
    const btn = this.component.locator(`.mode-btn[data-mode="${mode}"]`);
    await btn.click();
    await expect(btn).toHaveClass(/active/);
    await expect(btn).toHaveAttribute('aria-selected', 'true');
  }

  async getDrawingNumber(): Promise<string> {
    return (await this.drawingCode.textContent()) || '';
  }

  async getProblemStatementText(): Promise<string> {
    return (await this.telemetryFooter.textContent()) || '';
  }
}
