// tests/e2e/accessibility-audit.spec.ts
import { test } from '../fixtures/testFixtures';

test.describe('WCAG 2.2 Level AA Dual-Theme Accessibility Audits [@a11y]', () => {
  test('audits Homepage across Light and Dark Blueprint themes', async ({
    homePage,
    a11yAuditor,
    consoleGuard,
  }) => {
    await homePage.navigate();
    await a11yAuditor.assertDualThemeCompliant();
    consoleGuard.assertZeroErrors();
  });

  test('audits Projects Directory across Light and Dark Blueprint themes', async ({
    projectsPage,
    a11yAuditor,
    consoleGuard,
  }) => {
    await projectsPage.navigate();
    await a11yAuditor.assertDualThemeCompliant();
    consoleGuard.assertZeroErrors();
  });

  test('audits Case Study Blueprint page across Light and Dark Blueprint themes', async ({
    projectDetailPage,
    a11yAuditor,
    consoleGuard,
  }) => {
    await projectDetailPage.navigateToSlug('banking-quality-engineering');
    await a11yAuditor.assertDualThemeCompliant();
    consoleGuard.assertZeroErrors();
  });

  test('audits About page with telemetry tables across Light and Dark Blueprint themes', async ({
    aboutPage,
    a11yAuditor,
    consoleGuard,
  }) => {
    await aboutPage.navigate();
    await a11yAuditor.assertDualThemeCompliant();
    consoleGuard.assertZeroErrors();
  });

  test('audits Contact page across Light and Dark Blueprint themes', async ({
    contactPage,
    a11yAuditor,
    consoleGuard,
  }) => {
    await contactPage.navigate();
    await a11yAuditor.assertDualThemeCompliant();
    consoleGuard.assertZeroErrors();
  });
});
