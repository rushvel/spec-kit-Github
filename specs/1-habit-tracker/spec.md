# Feature Specification: Habit Tracker

**Feature Branch**: `1-habit-tracker`  
**Created**: 2025-10-23  
**Status**: Draft  
**Input**: User description: "Habit tracker app. Let's use dummy data for habits. I should be able to add a habit, mark its progress - it should be gamified (e.g., achievements for hitting milestones). Landing page with dashboard and graphs. Ability to rate habits. Add/delete/re-order habits. Share a snapshot with friends."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create & manage habits (Priority: P1)

As a user, I want to add new habits, delete existing habits, and reorder them so I can organize what I'm tracking.

Why this priority: Core app functionality - without adding and managing habits the product is unusable.

Independent Test: Using the UI, add a new habit with a title and schedule, verify it appears in the list, delete it, and reorder items via drag/drop or move controls.

Acceptance Scenarios:

1. **Given** an empty account, **When** the user adds a habit named "Daily Walk" with frequency "daily", **Then** the habit appears in the list and is persisted in dummy storage.
2. **Given** multiple habits, **When** the user drags "Meditation" above "Reading" (or uses move-up/move-down), **Then** the new order is saved and reflected on the dashboard.
3. **Given** a habit, **When** the user deletes it, **Then** it is removed from the list and not shown in snapshots.

---

### User Story 2 - Track progress & milestones (Priority: P1)

As a user, I want to mark progress for a habit (complete a day/session), see streaks and achievements when I hit milestones so that I feel motivated.

Why this priority: Core to habit formation and the gamification promise.

Independent Test: Mark progress on a habit multiple times; verify streaks increment and achievements unlock at configured thresholds.

Acceptance Scenarios:

1. **Given** a habit "Exercise", **When** the user marks completion for 7 consecutive days, **Then** a "7-day streak" achievement is awarded and visible on the habit card.
2. **Given** thresholds at 7/30/100 completes, **When** thresholds reached, **Then** achievement displayed and available in achievements list.

---

### User Story 3 - Dashboard with graphs (Priority: P2)

As a user, I want a landing dashboard that summarizes my habits, shows progress graphs, streaks, and a leaderboard of personal bests so I can quickly assess my performance.

Why this priority: Improves engagement and gives user insights; can follow core features.

Independent Test: Load the landing page with dummy data and verify graphs render (weekly completion chart, streak histogram), summary stats, and recent achievements.

Acceptance Scenarios:

1. **Given** sample data of habit completions over 30 days, **When** user visits dashboard, **Then** a line chart showing completion count per day is visible.
2. **Given** multiple habits with completion rates, **When** user views dashboard, **Then** top-performing habit and overall completion percentage are displayed.

---

### User Story 4 - Rate habits (Priority: P3)

As a user, I want to rate habits (1-5) so I can annotate which habits feel most helpful.

Why this priority: Adds nuance to habit evaluation but optional for MVP.

Independent Test: Rate a habit and verify rating persists and shows in habit summary.

Acceptance Scenarios:

1. **Given** a habit, **When** user selects 4 stars, **Then** habit shows average rating and recent rating in the feed.

---

### User Story 5 - Share snapshot (Priority: P3)

As a user, I want to share a snapshot of my progress (image or link) with friends so they can see my achievements.

Why this priority: Social feature to boost engagement; not required for core tracking.

Independent Test: Generate a snapshot for the current dashboard and verify a shareable link or image is created. With dummy data, confirm the exported snapshot contains summary stats and achievements.

Acceptance Scenarios:

1. **Given** a dashboard state, **When** user clicks "Share snapshot", **Then** a downloadable image or shareable link is generated that includes percentage completion, active streaks, and unlocked achievements.

---

### Edge Cases

- Adding a habit with the same name: App should allow duplicates but surface a confirmation or suggestion to rename.
- Reordering when only one habit exists: No-op and does not error.
- Marking progress multiple times in same day: Only one completion per day counts toward streak (configurable via assumptions).
- Offline interactions: With dummy/local storage, operations should work offline and sync is out of scope for MVP.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to create a habit with at least a title and optional schedule (daily/weekly/custom).
- **FR-002**: Users MUST be able to delete a habit.
- **FR-003**: Users MUST be able to reorder habits with drag/drop or move controls and the order MUST persist.
- **FR-004**: Users MUST be able to mark progress for a habit for a given day/session.
- **FR-005**: The system MUST compute streaks and milestone achievements (e.g., 7/30/100 completions).
- **FR-006**: Landing page MUST provide a dashboard with graphs (daily completions line chart, streaks, achievement list).
- **FR-007**: Users MUST be able to rate habits on a 1-5 scale; average rating displayed.
- **FR-008**: Users MUST be able to export/share a snapshot of the dashboard as an image or shareable link.
- **FR-009**: The feature MUST use dummy/local data storage for prototype (no external auth or backend required).
- **FR-010**: UI interactions MUST be testable via manual UI tests and automated unit tests where applicable.

### Assumptions

- Authentication and multi-user sync are out of scope for this spec. Sharing will produce a static snapshot (image or exportable JSON) rather than a public persistent link.
- One completion per habit per calendar day counts toward streaks by default.
- Achievements thresholds: 7-day, 30-day, and 100 total completions (configurable later).
- Dummy data will be sufficient for graphs and initial demos.

### Non-Functional Requirements

- **NFR-001**: Dashboard graphs MUST render quickly on modern browsers.
- **NFR-002**: UI MUST be responsive (mobile and desktop layouts).
- **NFR-003**: All dates MUST be ISO-8601 formatted in storage and exports.

### Key Entities *(include if feature involves data)*

- Habit
  - id: string
  - title: string
  - schedule: enum [daily, weekly, custom]
  - order: integer
  - ratings: list of rating entries
  - createdAt, updatedAt: ISO date
- Completion
  - id
  - habitId
  - date: ISO date
- Achievement
  - id
  - habitId (optional)
  - type (streak, milestone)
  - unlockedAt
- Snapshot
  - id
  - generatedAt
  - payload (image or JSON)

## Success Criteria *(mandatory)*

- **SC-001**: Users can add, delete, and reorder habits in under 2 minutes (manual verification).
- **SC-002**: Users can mark daily progress; streak calculation is correct for 7-day streaks in test data.
- **SC-003**: Dashboard loads with dummy data and displays graphs within 1 second on desktop.
- **SC-004**: Achievements are awarded at the 7/30/100 thresholds and visible on the dashboard.
- **SC-005**: Snapshot export produces an image or JSON containing overview stats, and the file is downloadable within 5 seconds.

## Implementation Notes & Constraints

- Prototype will use local/dummy storage (e.g., in-memory or browser-local storage). No backend implementation required.
- For graphs, prefer lightweight, dependency-minimal implementations (custom SVG or small chart helpers). Avoid heavy frameworks.
- Sharing will create an export (image via HTML-to-canvas or JSON export) rather than a public URL.


---

**End of spec**
