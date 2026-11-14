# Maintenance & Extension Runbook: Senior SDET Portfolio

This runbook instructs the portfolio owner on how to manage, maintain, and extend the website independently.

---

## 1. How to Add a New Project Case Study

To add a new project, create a new Markdown file in `src/content/projects/`:

### Step 1: Create File

Name the file following the convention: `src/content/projects/<number>-<kebab-case-name>.md` (e.g. `src/content/projects/13-contract-testing-service.md`).

### Step 2: Define Valid Frontmatter

```yaml
---
title: 'Contract Testing & Consumer-Driven Verification Engine'
description: 'A 1-2 sentence executive summary of the framework.'
category: 'API & Backend Quality' # Must match valid categories in content.config.ts
projectType: 'Independent Framework' # Must match valid projectTypes
status: 'In Development' # One of: 'Completed', 'In Development', 'Planned', 'Archived'
order: 13
featured: false # Set true to display on homepage
techStack: ['Pact', 'TypeScript', 'Docker', 'Jest']
businessProblem: 'Detailed description of the business problem solved.'
engineeringFocus: 'Specific architectural highlight and patterns used.'
repositoryUrl: 'https://github.com/your-username/contract-testing-engine'
evidenceReferences:
  - 'Test Run #42: 100% contracts validated'
limitations:
  - 'Requires local Docker container for provider mock service'
---
## Project Overview
Write your detailed case study markdown here.
```

### Step 3: Validate

Run the automated validator to confirm schema compliance:

```bash
npm run test:validate
```

---

## 2. How to Publish a New Engineering Note

Create a new Markdown file in `src/content/engineering-notes/`:

```yaml
---
title: 'Demystifying Playwright Custom Fixtures for Test Isolation'
publishDate: 2026-03-01
summary: 'How custom fixtures eliminate test flakiness and manage database state.'
category: 'Automation Architecture' # One of valid article categories
tags: ['Playwright', 'Architecture', 'TypeScript']
draft: false # Set true while drafting; drafts are excluded from production builds
---
## Introduction
Write your article markdown here with full code blocks and diagrams.
```

---

## 3. How to Update Personal Information & Metrics

- **Homepage Metrics:** Edit the `metrics` array in [src/components/home/ExperienceHighlights.astro](file:///Users/satyam/Documents/Portfolio/src/components/home/ExperienceHighlights.astro).
- **Core Specialization Grid:** Edit the `capabilities` array in [src/components/home/CapabilitiesSection.astro](file:///Users/satyam/Documents/Portfolio/src/components/home/CapabilitiesSection.astro).
- **Social & Contact Links:** Update URLs in [src/components/home/HeroSection.astro](file:///Users/satyam/Documents/Portfolio/src/components/home/HeroSection.astro), [src/components/layout/SiteFooter.astro](file:///Users/satyam/Documents/Portfolio/src/components/layout/SiteFooter.astro), and [src/pages/contact.astro](file:///Users/satyam/Documents/Portfolio/src/pages/contact.astro).

---

## 4. Routine Development Commands

```bash
# Start local development server (http://localhost:4321)
npm run dev

# Run full TypeScript and Astro compile diagnostics
npm run check

# Check code formatting with Prettier
npm run format:check

# Auto-format all code
npm run format

# Run Python content schema and link graph checks
npm run test:validate

# Run Vitest unit tests
npm run test:unit

# Run Playwright E2E and Axe accessibility audits
npm run test:e2e

# Run all quality gates in sequence
npm test

# Build production static artifacts
npm run build
```

---

## 5. Dependency Maintenance

To review and update outdated packages safely:

```bash
# Check for updates
npm outdated

# Update minor and patch releases
npm update

# Verify build and test suite after updates
npm test && npm run build
```
