---
title: 'Enterprise HRM Workflow & RBAC Automation'
description: 'Multi-role permission testing, approval hierarchy state machines, and employee lifecycle E2E automation.'
category: 'Enterprise Systems'
projectType: 'Independent Framework'
status: 'Completed'
order: 2
featured: false
techStack: ['Python', 'Playwright', 'pytest', 'Ruff', 'Docker', 'GitHub Actions']
businessProblem: 'Complex enterprise HRM platforms with nested organizational hierarchies suffer from permission leaks and state machine deadlocks during multi-stage employee reviews and leave approvals.'
engineeringFocus: 'Role-Based Access Control (RBAC) matrix test generation, state-machine verification, and multi-actor workflow tests.'
repositoryUrl: 'https://github.com/Xorgsat/enterprise-hrm-automation'
evidenceReferences:
  - 'RBAC Test Matrix: 48 role/permission combinations verified'
  - 'Workflow E2E: 100% passing multi-role approval test runs'
limitations:
  - 'Active Directory/LDAP sync is tested using mock directory fixtures'
---

## Project Overview

This framework automates complex, multi-actor workflows inside Enterprise Human Resource Management (HRM) systems. It models approval state machines and systematically validates that security boundaries and permissions are rigorously enforced across different roles (Employee, Manager, HR Admin, Finance, Super Admin).

## Problem Statement

In enterprise HR software, workflows do not occur within a single user session. An employee submits a reimbursement; their direct manager approves it; HR audits it; Finance settles it. If permissions are improperly enforced, a manager could approve their own request or an unauthorized role could view confidential compensation data.

## Engineering Objectives

1. Model the multi-stage approval workflow using deterministic test state machines.
2. Generate an automated RBAC test matrix verifying UI element access, API route restrictions, and data payload sanitization per role.
3. Eliminate multi-actor test flakiness by switching browser authentication storage states without repeating full UI login ceremonies.

## Testing Strategy

- **Session Context Switching:** Utilizes Playwright's `browser.newContext({ storageState })` to switch between Employee, Manager, and Admin perspectives within seconds without performing repetitive UI login flows.
- **Negative Permission Testing:** Verifies that API endpoints return `HTTP 403 Forbidden` when non-admin roles attempt direct URL navigations or API mutations.
- **State Machine Auditing:** Tests invalid transitions (e.g. attempting to transition a request from `Draft` directly to `Approved` without manager review).

## Lessons Learned

Using pre-authenticated storage states reduced total workflow test execution time by 68% compared to traditional Selenium frameworks that logged in via UI for every step.
