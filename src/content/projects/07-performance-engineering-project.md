---
title: 'QuickPizza Distributed Performance Engineering Framework'
description: 'Production-grade workload modeling (Little’s Law), automated k6 load generation, statistical percentile gates, and Prometheus/Grafana/Tempo telemetry correlation.'
category: 'Performance Engineering'
projectType: 'Independent Framework'
status: 'Completed'
order: 7
featured: false
techStack:
  - 'k6'
  - 'Python'
  - 'Docker'
  - 'Grafana'
  - 'Prometheus'
  - 'OpenTelemetry'
  - 'Tempo'
businessProblem: 'Applications experiencing severe latency spikes, connection pool exhaustion, and memory leaks under sudden traffic bursts without automated telemetry correlation or percentile gates in CI.'
engineeringFocus: 'Code-as-test load modeling in k6, mathematical pacing (Little’s Law), p90/p95/p99 latency regressions, and deep Grafana/Tempo trace telemetry.'
repositoryUrl: 'https://github.com/Xorgsat/K6-Automation'
evidenceReferences:
  - 'Multi-Tier Load Profiles: Smoke, Average Load, Stress, Spike, Soak, and Breakpoint models'
  - 'Automated Regression Engine: Statistical percentile analysis against historical baselines'
limitations:
  - 'Requires local Docker Compose environment or Kubernetes cluster running Grafana QuickPizza and telemetry stack'
---

## Project Overview

The **QuickPizza Performance Engineering Framework** is an enterprise-ready, evidence-driven performance testing system built to assess, monitor, and gate the reliability, latency profiles, throughput limits, and resource utilization of [Grafana QuickPizza](https://github.com/grafana/quickpizza).

Moving far beyond trivial load scripts, this framework implements rigorous SDET and Performance Architecture principles:

- **Mathematical Workload Modeling:** Little's Law, open vs. closed workload models, Poisson arrival rates, and realistic think-time distributions.
- **Controlled Multi-Tier Execution:** Sanity smoke, steady-state load, progressive stress, sudden spike, long-term soak, and breakpoint suites.
- **Automated Regression Engine:** Statistical percentile analysis (`p50`, `p90`, `p95`, `p99`), variance and noise thresholds, automated baseline storage, and pass/fail gate evaluation.
- **Deep Observability:** Integration with Prometheus metrics, Grafana dashboards, OpenTelemetry traces, and Tempo distributed tracing.

## Problem Statement

Traditional load testing tools are often treated as disconnected black-box scripts executed manually right before releases. They produce static summaries without correlating application-layer performance regressions against system-level saturation (CPU throttling, database lock waits, thread pool exhaustion) or distributed service hops.

## Engineering Architecture & Workload Profiles

1. **Smoke Profile:** Minimal concurrent users to validate test script integrity and target service endpoints.
2. **Average-Load Profile:** Simulates standard production traffic with ramp-up, steady-state plateau, and graceful ramp-down.
3. **Stress Profile:** Pushes system beyond normal operational boundaries to identify bottleneck breaking points.
4. **Spike Profile:** Introduces rapid step-function traffic surges to assess auto-scaling elasticity and rate-limiting safeguards.
5. **Soak Profile:** Sustains moderate load over extended durations to uncover slow memory leaks, thread starvation, and connection pool leaks.
