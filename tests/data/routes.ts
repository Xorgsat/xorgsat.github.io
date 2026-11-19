// tests/data/routes.ts

export const AppRoutes = {
  HOME: '/',
  PROJECTS: '/projects',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOTES: '/engineering-notes',
  CASE_STUDY: (slug: string) => `/projects/${slug}`,
  NOTE_DETAIL: (slug: string) => `/engineering-notes/${slug}`,
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
