---
title: 'Microservices Quality Engineering & Fault Injection Framework'
description: 'Distributed systems quality engineering demonstrating service-level gRPC testing, Protobuf contract validation, multi-service integration, and controlled resilience fault injection against Google Cloud Online Boutique.'
category: 'API & Backend Quality'
projectType: 'Demonstration Architecture'
status: 'Completed'
order: 10
featured: false
techStack:
  - 'Kubernetes'
  - 'gRPC'
  - 'Protobuf v3'
  - 'Playwright'
  - 'Python'
  - 'pytest'
  - 'Docker'
  - 'Kind'
businessProblem: 'Distributed microservice architectures frequently break due to untyped RPC contract mutations, unhandled network latency spikes, and cascade failures across dependent services under partial outages.'
engineeringFocus: 'gRPC service-level automation, Protobuf contract enforcement, ephemeral Kubernetes (Kind) integration environments, and Chaos resilience engineering with controlled fault injection.'
repositoryUrl: 'https://github.com/Xorgsat/Micro-Services-Automation'
evidenceReferences:
  - 'Contract Testing: 100% passing Protobuf v3 schema compatibility validations across 11 microservices'
  - 'Fault Injection Scenarios: Chaos testing verifying circuit breakers and graceful frontend degradation'
limitations:
  - 'Requires local Docker and Kind (Kubernetes-in-Docker) or remote cluster to run full 11-microservice topology'
---

## Project Overview

An advanced, production-grade distributed systems quality engineering framework demonstrating **service-level testing**, **Protobuf contract testing**, **multi-service integration**, **controlled resilience engineering & fault injection**, and **distributed diagnostics** using **Google Cloud's Online Boutique** application as the system under test.

## Problem Statement

Microservices distributed across containers and clusters introduce failure modes that monolithic test suites cannot detect: deserialization contract mismatches across polyglot services (Go, Python, Java, C#, Node.js), cascading timeout failures when downstream caches die, and silent data drop during asynchronous message passing.

## Engineering Architecture & Testing Capabilities

1. **Protobuf Contract Testing:** Automates compile-time and runtime validation of `.proto` contracts across client stubs and server implementations, preventing breaking schema evolutions.
2. **Ephemeral Kubernetes Cluster Orchestration:** Automatically provisions an isolated, multi-node Kubernetes cluster via **Kind** in CI to deploy and validate all 11 microservices in realistic cloud environments.
3. **Controlled Resilience & Fault Injection:** Programmatically introduces artificial packet drops, connection delays, and CPU throttles into target pods to verify that circuit breakers, retries, and fallback fallbacks behave deterministically.
4. **End-to-End User Journey Verification:** Employs Playwright (TypeScript) to execute complete cross-service purchase and checkout flows while asserting backend ledger invariants.
