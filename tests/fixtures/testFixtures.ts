// tests/fixtures/testFixtures.ts
import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { EngineeringNotesPage } from '../pages/EngineeringNotesPage';
import { AccessibilityAuditor } from '../utils/AccessibilityAuditor';
import { ConsoleGuard } from './consoleGuard';

export type PortfolioFixtures = {
  homePage: HomePage;
  projectsPage: ProjectsPage;
  projectDetailPage: ProjectDetailPage;
  aboutPage: AboutPage;
  contactPage: ContactPage;
  notesPage: EngineeringNotesPage;
  a11yAuditor: AccessibilityAuditor;
  consoleGuard: ConsoleGuard;
};

export const test = baseTest.extend<PortfolioFixtures>({
  consoleGuard: async ({ page }, use) => {
    const guard = new ConsoleGuard(page);
    await use(guard);
    // Automatically assert zero unhandled console errors upon test completion
    guard.assertZeroErrors();
  },

  a11yAuditor: async ({ page }, use) => {
    const auditor = new AccessibilityAuditor(page);
    await use(auditor);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  projectsPage: async ({ page }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },

  projectDetailPage: async ({ page }, use) => {
    const detailPage = new ProjectDetailPage(page);
    await use(detailPage);
  },

  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await use(aboutPage);
  },

  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },

  notesPage: async ({ page }, use) => {
    const notesPage = new EngineeringNotesPage(page);
    await use(notesPage);
  },
});

export { expect };
