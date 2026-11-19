// tests/e2e/navigation.spec.ts
import { test } from '../fixtures/testFixtures';

test.describe('Navigation Graph & Shell Integrity', () => {
  test('traverses seamlessly across primary navigation routes [@smoke]', async ({
    homePage,
    projectsPage,
    aboutPage,
    contactPage,
    notesPage,
    consoleGuard,
  }) => {
    // 1. Home
    await homePage.navigate();
    await homePage.assertUrl('/');

    // 2. Navigate to Projects
    await homePage.navbar.clickNavLink('Projects');
    await projectsPage.assertUrl('/projects');
    await projectsPage.assertTotalProjectCount(12);

    // 3. Navigate to Engineering Notes
    await projectsPage.navbar.clickNavLink('Engineering Notes');
    await notesPage.assertUrl('/engineering-notes');
    await notesPage.assertArticlesPublished();

    // 4. Navigate to About
    await notesPage.navbar.clickNavLink('About');
    await aboutPage.assertUrl('/about');
    await aboutPage.assertTimelineCount();

    // 5. Navigate to Contact
    await aboutPage.navbar.clickNavLink('Contact');
    await contactPage.assertUrl('/contact');
    await contactPage.assertDirectChannelsVisible();

    consoleGuard.assertZeroErrors();
  });

  test('skip to main content link becomes focused on tab navigation', async ({
    homePage,
    consoleGuard,
  }) => {
    await homePage.navigate();
    await homePage.triggerSkipToContent();

    consoleGuard.assertZeroErrors();
  });

  test('mobile navigation drawer opens and closes correctly on mobile viewport', async ({
    page,
    homePage,
    consoleGuard,
  }) => {
    // Only execute drawer test if viewport is mobile-sized
    const viewport = page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await homePage.navigate();
      await homePage.navbar.openMobileMenu();
      await homePage.navbar.closeMobileMenu();
    }

    consoleGuard.assertZeroErrors();
  });
});
