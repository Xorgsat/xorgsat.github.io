---
title: 'Advanced Playwright Architecture & Reliability Engine'
description: 'Production-grade browser automation framework featuring hermetic custom fixtures, network mocking, and parallel sharding.'
category: 'UI & E2E Automation'
projectType: 'Independent Framework'
status: 'Completed'
order: 5
featured: true
techStack: ['Playwright', 'TypeScript', 'Axe-core', 'Docker', 'GitHub Actions']
businessProblem: 'Legacy Selenium test suites taking 90+ minutes in CI, suffering from 15%+ flaky test failure rates due to implicit waits and shared test state.'
engineeringFocus: 'Hermetic custom fixtures, isolated browser contexts, dynamic API-seeded authentication states, and parallel execution.'
repositoryUrl: 'https://github.com/Xorgsat/Porport-Automation'
evidenceReferences:
  - 'CI Sharding: 650 browser tests executed in 4.5 minutes across 4 shards'
  - 'Flakiness Rate: Reduced from 14.8% to 0.2%'
limitations:
  - 'Requires Chromium, Firefox, and WebKit binaries in CI containers'
---

## Project Overview

An enterprise-ready UI automation framework built on modern Playwright capabilities. Engineered to showcase state-of-the-art SDET practices: custom fixture dependency injection, zero explicit `sleep()` calls, automatic trace/video collection on failure, and built-in accessibility checks.

## Problem Statement

Teams migrating from older WebDriver tools frequently bring bad habits with them: hardcoded timeouts, fragile XPath selectors, and monolithic test scripts. This framework demonstrates how to leverage Playwright's native architecture to achieve deterministic, ultra-fast test runs.

## Engineering Objectives

1. Replace brittle login steps with reusable `storageState` authentication fixtures.
2. Intercept and stub non-essential third-party network requests (analytics, marketing pixels) to slash page load times and stabilize test runs.
3. Integrate `@axe-core/playwright` to automatically fail tests if WCAG 2.2 AA accessibility violations are detected on any rendered page.
4. Distribute test execution across parallel GitHub Actions runners using Playwright test sharding.

## Framework Architecture

- **Custom Fixtures:** Extends `@playwright/test` base with typed fixtures (`authenticatedPage`, `apiContext`, `accessibilityScanner`).
- **Component Object Pattern:** Instead of bloated 1000-line Page Objects, UI elements are broken down into self-contained components (e.g. `DataTable`, `ModalDialog`, `NavigationMenu`).
- **Actionable Artifacts:** On any failure, the framework automatically captures an interactive Playwright trace zip, screenshot, and video, making defect triage instantaneous.
