---
title: 'Finosauras Mobile Test Automation Framework'
description: 'Production Java + Appium 2.x + TestNG automated testing architecture for Flutter mobile applications.'
category: 'Mobile Automation'
projectType: 'Independent Framework'
status: 'Completed'
order: 6
featured: false
techStack: ['Java', 'Appium 2.x', 'TestNG', 'Maven', 'Android', 'Flutter']
businessProblem: 'Ensuring regression stability across complex mobile fintech workflows, dynamic Flutter UI elements, and asynchronous transaction states.'
engineeringFocus: 'Page Object patterns, Appium 2.x driver lifecycle management, TestNG test suites (smoke, regression, negative, discovery), and Maven builds.'
repositoryUrl: 'https://github.com/Xorgsat/Java-appium-atomation'
evidenceReferences:
  - 'TestNG Suites: Comprehensive Positive, Negative, E2E, and Discovery execution XMLs'
  - 'Multi-environment configuration supporting local emulators and physical devices'
limitations:
  - 'Requires local Android SDK, Appium 2.x server, and Flutter app package'
---

## Project Overview

A robust mobile test automation framework engineered in **Java 17+ and Appium 2.x with TestNG and Maven**, specifically designed for testing the **Finosauras Flutter mobile application**.

## Problem Statement

Mobile automation for Flutter applications is frequently challenged by dynamic widget trees, accessibility locator mapping, device capability differences, and deep transaction flows. This framework establishes resilient Page Object abstractions and modular TestNG suites to provide rapid quality feedback.

## Engineering Architecture & Suite Structure

- **Java + Appium 2.x:** Modern Appium client with explicit WebDriverWait synchronization.
- **Modular TestNG Suites:** Dedicated suites for Smoke (`testng-positive.xml`), Edge Cases (`testng-negative.xml`), Full E2E (`testng-e2e.xml`), and Diagnostic discovery (`testng-diagnostic.xml`).
- **Build & Execution Automation:** Automated scripts with Maven (`mvn test`, `run-all-tests.cmd`) and CI/CD-ready execution reporting.

## Engineering Objectives

1. Develop a unified locator strategy using Accessibility IDs across iOS and Android.
2. Automate complex touch interactions: horizontal carousel swipes, pinch-to-zoom, and biometric prompt bypasses.
3. Support deep-linking to launch mobile apps directly into specific screens, bypassing repetitive onboarding and navigation screens.

## Technical Architecture

- **Driver Factory:** Dynamically initializes UIAutomator2 for Android or XCUITest for iOS based on environment configurations.
- **Capabilities Configurator:** Isolates device capabilities, UDIDs, and app packages into external YAML configuration files.
