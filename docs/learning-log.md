# Engineering Learning Log: Senior SDET Portfolio

A log of architectural patterns, decisions, and quality engineering techniques implemented across all 12 development phases.

---

## 1. Completed Development Phases

- **Phase 0: Discovery & Architecture:** Established project charter, technical audience requirements, and ADRs.
- **Phase 1: Environment & Foundations:** Initialized Git, Astro 5 SSG engine, strict TypeScript, and Prettier.
- **Phase 2: Architecture & Design System:** Configured CSS design tokens, typography scale, skip links, and light/dark theme switching without FOUT.
- **Phase 3: Homepage Implementation:** Built data-driven hero, verified metrics, capabilities grid, featured projects, and engineering philosophy.
- **Phase 4: Content Architecture & Projects Directory:** Configured Astro 5 Content Layer with Zod schemas, 12 project case studies, and dynamic routing.
- **Phase 5: Technical Case Studies:** Detailed problem statements, architecture diagrams, testing strategies, trade-offs, and limitations.
- **Phase 6: Engineering Notes Hub:** Published three technical articles on test framework design, flaky test triage, and microservice contract testing.
- **Phase 7: About and Contact Pages:** Created 8-year SDET career narrative, technical inventory, and direct contact channels.
- **Phase 8: Quality Engineering:** Configured Vitest unit tests, Playwright E2E browser tests, Axe-core WCAG 2.2 AA accessibility audits, and Python CLI validators.
- **Phase 9: SEO, Performance & Sitemap:** Integrated `@astrojs/sitemap`, automated `robots.txt`, and Schema.org JSON-LD structured data.
- **Phase 10: CI/CD & Deployment:** Created GitHub Actions CI and deploy workflows with complete Cloudflare Pages & GitHub Pages guides.
- **Phase 11: Portfolio Content Verification:** Verified that all 12 project files, statuses, and links adhere to professional integrity guidelines.
- **Phase 12: Maintenance & Knowledge Handoff:** Documented maintenance runbooks and independent modification workflows.

---

## 2. Key Architectural Takeaways

1. **Static Site Generation vs. Single Page Apps:**
   - For technical content, case studies, and documentation, shipping zero client-side JavaScript by default yields instant page loads (First Contentful Paint < 200ms) and eliminates hosting costs.
2. **Schema-Driven Content Layer:**
   - Moving from arbitrary Markdown files to Zod-validated Content Collections turns content into a type-safe database at build time. Omissions and schema violations fail builds immediately.
3. **Automated Accessibility Testing in CI:**
   - Incorporating `@axe-core/playwright` into regular test runs ensures that color contrast regressions, missing ARIA labels, or accessible name mismatches are caught before code reaches production.
4. **Fast, Deterministic E2E Tests:**
   - Leveraging Playwright's parallel workers and eliminating hardcoded sleep timers allows our entire multi-viewport E2E suite to execute in under 3 seconds.
