---
title: 'Systematic Flaky Test Investigation & Elimination'
publishDate: 2026-02-02
summary: 'A disciplined methodology for diagnosing and permanently eliminating nondeterministic test failures rather than masking them with blind retries.'
category: 'Test Reliability'
tags: ['Flakiness', 'Debugging', 'Playwright', 'CI/CD', 'Root Cause Analysis']
draft: false
---

## Introduction

Flaky tests—tests that exhibit both passing and failing outcomes with identical code under identical inputs—are among the most corrosive problems in software delivery. Once a test suite exceeds a 5% flakiness threshold, engineering teams instinctively begin ignoring CI failures, rendering automated quality gates ineffective.

A common industry reaction is configuring build runners to automatically retry failed tests 2 or 3 times (`retries: 2`). While retries can temporarily prevent broken builds, they treat the symptom while actively worsening the underlying disease.

---

## 1. Categorizing Flakiness Root Causes

Flaky test failures rarely stem from "randomness." In over eight years of investigating test suites, nondeterministic failures almost always map to one of four architectural root causes:

1. **Shared State Pollution:** A preceding test mutated a database record, left an open session cookie, or modified a cache value without cleaning up.
2. **Asynchronous Race Conditions:** The test asserted DOM state before the frontend JavaScript framework completed hydration or network dispatch.
3. **Dynamic / Uncontrolled Test Data:** Assertions depending on time-based calculations (`Date.now()`), alphabetical sorting of unindexed query results, or hardcoded dates.
4. **Resource Starvation on CI:** Headless browsers running inside memory-constrained Docker containers where element animations render slower than on developer laptops.

---

## 2. The Diagnosis Protocol

To isolate and reproduce a flaky test deterministically, execute it in isolation under simulated resource pressure:

```bash
# Repeat the suspect test 50 times in headless mode with CPU throttling
npx playwright test tests/e2e/checkout.spec.ts --repeat-each=50 --workers=4
```

### Analyzing Actionable Artifacts

Ensure your test runner captures full traces on retry or failure:

- **Network HAR:** Did a background polling endpoint return an unexpected 500 error?
- **DOM Snapshots:** Was an invisible loading skeleton overlay intercepting the click target?
- **Console Logs:** Did an unhandled React runtime error throw before the component rendered?

---

## 3. Concrete Remediation Patterns

### Replacing Polling with Network Interception

Instead of waiting for a button state to flip via arbitrary intervals, await the actual API response that populates the view:

```typescript
// ❌ Brittle: Polling DOM text that updates asynchronously
await page.click('#submit-order');
await expect(page.locator('.status-badge')).toHaveText('Confirmed', { timeout: 10000 });

// ✅ Resilient: Await network completion before asserting UI
const [response] = await Promise.all([
  page.waitForResponse((res) => res.url().includes('/api/orders') && res.status() === 200),
  page.click('#submit-order'),
]);
await expect(page.locator('.status-badge')).toHaveText('Confirmed');
```

---

## Conclusion

Retrying a flaky test is a tactical triage mechanism, not a permanent fix. High-performing engineering teams maintain zero tolerance for flakiness: immediately quarantine unreliable tests, isolate the architectural root cause, and reintroduce them only after verifying determinism across repeated stress runs.
