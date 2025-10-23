# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Static-First Principle
- [ ] All content pre-rendered at build time
- [ ] No runtime server dependencies
- [ ] Pages functional without JavaScript
- [ ] Pure HTML/CSS with optional JS enhancements

### Minimal Dependencies
- [ ] Each dependency explicitly justified below
- [ ] Native HTML/CSS solutions explored first
- [ ] Security review completed for third-party libraries
- [ ] Value proposition documented for each external package

### Build Simplicity
- [ ] Single command build process
- [ ] Deterministic build artifacts
- [ ] Minimal toolchain requirements
- [ ] Reproducible build environment

### Performance Budgets
- [ ] Initial HTML/CSS < 50KB
- [ ] Total page size < 100KB
- [ ] No render-blocking resources
- [ ] Lighthouse score > 90
- [ ] Image optimization workflow defined

### Content Separation
- [ ] Content stored in markdown/structured data
- [ ] Templates separate from content
- [ ] No inline styles
- [ ] No content-specific markup in templates

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Expand with real paths as needed.
-->

```text
# Static Site Structure
src/
├── content/           # Markdown/structured content files
│   ├── pages/        # Main page content
│   ├── posts/        # Blog posts or similar
│   └── data/         # Structured data (JSON, YAML)
├── layouts/          # Page templates and layouts
│   ├── base/         # Base templates
│   └── partials/     # Reusable template parts
├── styles/           # CSS/SCSS files
│   ├── components/   # Component styles
│   └── utilities/    # Utility classes
├── scripts/         # Optional vanilla JS enhancements
│   └── modules/     # JS modules if needed
└── static/          # Static assets
    ├── images/      # Original images
    ├── fonts/       # Web fonts
    └── generated/   # Build-time generated assets

tests/
├── content/         # Content validation tests
├── performance/     # Performance budget tests
└── accessibility/   # A11y compliance tests

public/             # Build output directory
└── [generated site structure]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
