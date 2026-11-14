# Senior SDET Engineering Portfolio

> **Live Portfolio:** [https://xorgsat.github.io](https://xorgsat.github.io)  
> **Owner:** [Satyam Tiwari](https://github.com/Xorgsat) (Senior SDET & Quality Engineering Architect)

A production-grade personal engineering portfolio and technical architecture showcase built for an experienced Senior Software Development Engineer in Test (SDET).

Designed to demonstrate automation architecture, test isolation, framework engineering, and quality engineering strategy.

---

## 🛠 Technology Stack

- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** CSS Custom Properties (Design Tokens) & Scoped CSS
- **Content Validation:** Astro Content Layer + [Zod](https://zod.dev/) schemas
- **Unit Testing:** [Vitest](https://vitest.dev/)
- **E2E & Accessibility Testing:** [Playwright](https://playwright.dev/) + [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- **Repository Automation:** Python 3.9+ Link & Metadata Validators
- **CI/CD:** GitHub Actions

---

## 📁 Repository Structure

```text
├── docs/               # System architecture, ADRs, and project charter
├── public/             # Static assets (favicons, robots.txt)
├── scripts/            # Python CLI utilities for metadata and link validation
├── src/
│   ├── components/     # Reusable UI, layout, and domain components
│   ├── content/        # Markdown/MDX case studies and engineering notes
│   ├── layouts/        # Page layout templates
│   ├── pages/          # File-based routing
│   ├── styles/         # Global design tokens and typography
│   └── content.config.ts # Content Layer schemas
└── tests/              # Vitest unit tests & Playwright E2E suites
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Active LTS recommended, verified on Node v26)
- npm 10+
- Python 3.9+ (for validation scripts)

### Installation

```bash
npm install
```

### Development Server

Starts the local development server at `http://localhost:4321`:

```bash
npm run dev
```

### Production Build

Type-checks and compiles the static site into `dist/`:

```bash
npm run build
```

### Preview Production Build

Serves the generated static build locally:

```bash
npm run preview
```

---

## 🧪 Testing and Quality Verification

```bash
# Type check without emitting files
npm run check

# Code formatting check
npm run format:check
```

---

## 📄 Documentation Links

- [Project Charter](docs/charter.md)
- [System Architecture](docs/architecture.md)
- [Architecture Decision Records](docs/design-decisions.md)
