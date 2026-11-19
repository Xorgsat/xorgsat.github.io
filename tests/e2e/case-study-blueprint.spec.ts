// tests/e2e/case-study-blueprint.spec.ts
import { test, expect } from '../fixtures/testFixtures';

test.describe('Case Study Interactive Blueprint Schematics', () => {
  test('renders drawing sheet header, SVG canvas, and telemetry callout [@regression]', async ({
    projectDetailPage,
    consoleGuard,
  }) => {
    await projectDetailPage.navigateToSlug('banking-quality-engineering');

    const blueprint = projectDetailPage.blueprintSchematic;
    await blueprint.assertVisible();

    const dwgCode = await blueprint.getDrawingNumber();
    expect(dwgCode).toContain('DWG-SPEC-BANKING');

    const telemetry = await blueprint.getProblemStatementText();
    expect(telemetry).toContain('PROBLEM STATEMENT');
    expect(telemetry).toContain('ENGINEERING DEFENSE');

    consoleGuard.assertZeroErrors();
  });

  test('switches perspective modes between system, problem, and test harness [@regression]', async ({
    projectDetailPage,
    consoleGuard,
  }) => {
    await projectDetailPage.navigateToSlug('enterprise-hrm-automation');

    const blueprint = projectDetailPage.blueprintSchematic;
    await blueprint.assertVisible();

    // 1. Switch to Problem & Failure Vectors
    await blueprint.switchPerspective('problem');

    // 2. Switch to Test Harness & Invariants
    await blueprint.switchPerspective('harness');

    // 3. Revert to System Architecture Overview
    await blueprint.switchPerspective('system');

    consoleGuard.assertZeroErrors();
  });
});
