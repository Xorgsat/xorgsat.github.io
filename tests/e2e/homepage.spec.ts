// tests/e2e/homepage.spec.ts
import { test, expect } from '../fixtures/testFixtures';

test.describe('Homepage & Engineering Highlights', () => {
  test('renders hero, headline, and verified career metrics [@smoke]', async ({
    homePage,
    consoleGuard,
  }) => {
    await homePage.navigate();

    // Verify hero typography and architectural illustration
    await homePage.assertHeroElements();

    // Verify 4-channel instrumentation dials and telemetry bar
    await homePage.assertVerifiedMetrics();

    // Ensure no unhandled errors occurred during page render
    consoleGuard.assertZeroErrors();
  });

  test('toggles theme between light and dark blueprint modes [@smoke]', async ({
    homePage,
    consoleGuard,
  }) => {
    await homePage.navigate();

    const initialTheme = await homePage.themeToggle.getActiveTheme();
    const newTheme = await homePage.themeToggle.toggleTheme();

    expect(newTheme).not.toBe(initialTheme);

    // Toggle back to verify bi-directional state
    const revertedTheme = await homePage.themeToggle.toggleTheme();
    expect(revertedTheme).toBe(initialTheme);

    consoleGuard.assertZeroErrors();
  });

  test('interacts with interactive test execution terminal simulation', async ({
    homePage,
    consoleGuard,
  }) => {
    await homePage.navigate();

    await homePage.terminalWidget.assertVisible();
    await homePage.terminalWidget.clickReplay();
    await homePage.terminalWidget.waitForExecutionComplete();

    const logText = await homePage.terminalWidget.getTerminalLogText();
    expect(logText).toContain('QUALITY GATE EVALUATION');

    consoleGuard.assertZeroErrors();
  });

  test('navigates interactive architecture topology nodes', async ({ homePage, consoleGuard }) => {
    await homePage.navigate();

    await homePage.selectTopologyNode('app');
    await homePage.selectTopologyNode('cicd');
    await homePage.selectTopologyNode('observability');

    consoleGuard.assertZeroErrors();
  });
});
