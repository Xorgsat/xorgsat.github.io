# Architecture Decision Records (ADRs)

## ADR-001: Selection of Astro 5 for Portfolio Architecture

- **Date:** 2026-11-14
- **Status:** Accepted

### Context

A Senior SDET portfolio needs to communicate deep technical expertise, load instantaneously, render complex technical case studies (with diagrams and code blocks), and exhibit pristine software engineering practices.

### Decision

Use **Astro 5** as the primary framework in Static Site Generation (SSG) mode.

### Alternatives Considered

1. _Next.js 14/15:_ Rejected. Overkill for static content; introduces client-side hydration overhead, server-side runtime requirements, and unnecessary complexity.
2. _Vite + React SPA:_ Rejected. Renders an empty HTML shell initially; poor SEO out-of-the-box, requires client-side markdown parsing libraries, and increases bundle size.
3. _Plain HTML/CSS:_ Considered. While lightweight, it lacks type-safe content management, build-time schema validation for 12 case studies, and reusable component abstractions.

### Consequences

- **Positive:** Default zero JavaScript footprint, sub-second load times, built-in Markdown/MDX parsing, and strict compile-time Zod schema validation via Astro's Content Layer API.
- **Negative:** Interactive client-side components require explicit client directives (e.g. `client:visible`), but our site needs minimal client-side scripting.

---

## ADR-002: Scoped CSS and CSS Custom Properties over Utility Frameworks (Tailwind)

- **Date:** 2026-11-14
- **Status:** Accepted

### Context

The visual system must convey technical maturity, precision, and restrained elegance, while keeping build times minimal and code auditability high.

### Decision

Use native **CSS Custom Properties** (Design Tokens) and Astro's built-in **scoped `<style>` blocks**.

### Alternatives Considered

1. _Tailwind CSS:_ Rejected for initial baseline. Adds build tooling overhead, clutters HTML markup with long utility classes, and obscures semantic structure.
2. _CSS-in-JS (Styled Components / Emotion):_ Rejected. Adds runtime JavaScript overhead, contrary to our zero-JS principle.

### Consequences

- **Positive:** Zero external CSS dependencies, crystal-clear semantic HTML tags, standard web specifications, and easy maintenance of light/dark design tokens.
- **Negative:** Requires disciplined structuring of design tokens (`tokens.css`, `typography.css`, `global.css`), which we will establish in Phase 2.

---

## ADR-003: Dual-Layer Validation (Compile-Time Zod + Python 3 CLI)

- **Date:** 2026-11-14
- **Status:** Accepted

### Context

As an SDET portfolio, content accuracy and link integrity are critical. Broken links or malformed metadata immediately undermine engineering credibility.

### Decision

Implement a dual validation strategy:

1. **Zod schemas inside Astro:** Validates frontmatter types, required fields, date formats, and enums at compile time.
2. **Python 3 scripts (`scripts/`):** Validates external repository availability, internal link graph integrity, and checks for placeholder omissions prior to commits and in CI.

### Consequences

- **Positive:** Leverages the owner's multi-language background (TypeScript + Python) practically without introducing a bloated Python web backend.
- **Negative:** Requires Python 3 to be present in local development and CI environments (already verified: Python 3.9.6 is installed locally).
