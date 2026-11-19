// tests/fixtures/consoleGuard.ts
import type { Page } from '@playwright/test';

export interface ConsoleGuardOptions {
  ignorePatterns?: RegExp[];
}

export class ConsoleGuard {
  private errors: string[] = [];
  private page: Page;
  private ignorePatterns: RegExp[];

  constructor(page: Page, options: ConsoleGuardOptions = {}) {
    this.page = page;
    this.ignorePatterns = options.ignorePatterns || [];
    this.attachListeners();
  }

  private attachListeners(): void {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        const shouldIgnore = this.ignorePatterns.some((pattern) => pattern.test(text));
        if (!shouldIgnore) {
          this.errors.push(`[Console Error] ${text}`);
        }
      }
    });

    this.page.on('pageerror', (err) => {
      const message = err.message;
      const shouldIgnore = this.ignorePatterns.some((pattern) => pattern.test(message));
      if (!shouldIgnore) {
        this.errors.push(`[Unhandled Page Error] ${message}`);
      }
    });
  }

  public getErrors(): string[] {
    return [...this.errors];
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public assertZeroErrors(): void {
    if (this.hasErrors()) {
      throw new Error(
        `ConsoleGuard detected ${this.errors.length} unhandled client-side error(s):\n` +
          this.errors.map((e) => `  • ${e}`).join('\n')
      );
    }
  }

  public clear(): void {
    this.errors = [];
  }
}
