<!--
Constitution Sync Impact Report
Version: None → 1.0.0 (Initial Version)
Modified Principles:
- Added: Static-First
- Added: Minimal Dependencies
- Added: Build Simplicity
- Added: Performance First
- Added: Content Separation

Templates requiring updates:
⚠ .specify/templates/plan-template.md
⚠ .specify/templates/spec-template.md
⚠ .specify/templates/tasks-template.md
⚠ .specify/templates/commands/*.md

No deferred placeholders or TODOs.
-->

# Static Site Spec Constitution

## Core Principles

### I. Static-First
All content must be pre-rendered at build time. No runtime server dependencies are allowed. Pages must be pure HTML/CSS with optional vanilla JavaScript enhancements that maintain functionality without JS enabled.

### II. Minimal Dependencies
Dependencies must be explicitly justified and approved. Native HTML/CSS solutions are preferred over framework abstractions. Third-party libraries require security review and must provide significant value over built-in capabilities.

### III. Build Simplicity
Build process must be reproducible with minimal tooling. Single command build (`npm run build` or equivalent) required. Build artifacts must be deterministic - same input produces identical output.

### IV. Performance First
Performance budgets are non-negotiable: < 50KB initial HTML/CSS, < 100KB total per page. No render-blocking resources. Lighthouse performance score must exceed 90. Images require optimization and responsive variants.

### V. Content Separation
Strict separation of content from presentation. Content stored in markdown or structured data files. Templates/layouts version-controlled separately from content. No inline styles or content-specific markup in templates.

## Development Standards

- HTML must be valid and semantic
- CSS follows BEM naming convention
- JavaScript must be unobtrusive and progressive enhancement only
- Assets (images, fonts, etc.) optimized at build time
- Development server must match production static hosting
- Source maps included only in development builds

## Deployment Requirements

- Static hosting only (no server-side runtime)
- HTTPS required for all environments
- Cache policies defined per asset type
- CDN distribution mandatory for production
- Automated deployment on main branch changes
- Preview deployments for pull requests
- Backup and rollback procedures defined

## Governance

Constitution compliance is mandatory for all contributions. Changes to these principles require:
1. Written proposal with justification
2. Performance/complexity impact analysis
3. Migration plan for existing content
4. Unanimous approval from maintainers

Amendments must preserve the static-first and minimal dependency principles. Monthly audits verify continued compliance across all site sections.

**Version**: 1.0.0 | **Ratified**: 2025-10-23 | **Last Amended**: 2025-10-23
