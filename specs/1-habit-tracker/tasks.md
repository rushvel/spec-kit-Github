# Tasks: Habit Tracker

**Input**: Design documents from `/specs/1-habit-tracker/`
**Prerequisites**: All design documents available and validated

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1-5)
- Include exact file paths in descriptions

## Phase 1: Project Setup

**Purpose**: Initialize project structure and core configuration

- [x] T001 Create Next.js project with TypeScript: `npm create next-app@latest habit-tracker --typescript`
- [x] T002 [P] Configure project settings in `package.json` and `tsconfig.json`
- [x] T003 [P] Set up CSS Modules configuration in `next.config.js`
- [x] T004 [P] Initialize Jest and React Testing Library in `jest.config.js`
- [ ] T005 [P] Create base directory structure per plan.md
- [ ] T006 [P] Set up ESLint and Prettier configuration
- [ ] T007 Install core dependencies:
  ```json
  {
    "recharts": "latest",
    "html2canvas": "latest"
  }
  ```
- [ ] T008 [P] Create global styles in `src/styles/global.css`
- [ ] T009 [P] Set up test environment in `tests/setup.ts`

## Phase 2: Foundation

**Purpose**: Core functionality required by all user stories

- [ ] T010 Create LocalStorage wrapper in `src/lib/storage/localStorage.ts`
- [ ] T011 [P] Implement base types in `src/types/index.ts`
- [ ] T012 [P] Create constants file in `src/constants/index.ts`
- [ ] T013 Create React Context for habits in `src/lib/context/HabitContext.tsx`
- [ ] T014 [P] Set up base layout component in `src/components/common/Layout.tsx`
- [ ] T015 Implement storage initialization in `src/lib/storage/init.ts`

## Phase 3: User Story 1 - Create & Manage Habits

**Purpose**: Core habit management functionality (P1)

- [ ] T016 [US1] Create Habit type definitions in `src/types/habit.ts`
- [ ] T017 [P] [US1] Create HabitList component in `src/components/habits/HabitList.tsx`
- [ ] T018 [P] [US1] Create HabitForm component in `src/components/habits/HabitForm.tsx`
- [ ] T019 [US1] Implement habit storage operations in `src/lib/storage/habits.ts`
- [ ] T020 [US1] Create habit management page in `src/pages/habits/index.tsx`
- [ ] T021 [P] [US1] Implement drag-and-drop reordering in `src/components/habits/HabitListItem.tsx`
- [ ] T022 [US1] Add habit deletion confirmation modal in `src/components/habits/DeleteModal.tsx`

## Phase 4: User Story 2 - Track Progress & Milestones

**Purpose**: Habit tracking and achievements (P1)

- [ ] T023 [US2] Create Achievement types in `src/types/achievement.ts`
- [ ] T024 [P] [US2] Implement streak calculation in `src/lib/habits/streaks.ts`
- [ ] T025 [P] [US2] Create achievement system in `src/lib/achievements/index.ts`
- [ ] T026 [US2] Add progress tracking UI in `src/components/habits/Progress.tsx`
- [ ] T027 [P] [US2] Create achievement display in `src/components/achievements/AchievementList.tsx`
- [ ] T028 [US2] Implement milestone checks in `src/lib/achievements/milestones.ts`
- [ ] T029 [US2] Add achievements page in `src/pages/achievements/index.tsx`

## Phase 5: User Story 3 - Dashboard & Graphs

**Purpose**: Data visualization and overview (P2)

- [ ] T030 [US3] Set up Recharts wrapper in `src/components/charts/ChartWrapper.tsx`
- [ ] T031 [P] [US3] Create completion chart in `src/components/charts/CompletionChart.tsx`
- [ ] T032 [P] [US3] Implement streak histogram in `src/components/charts/StreakHistogram.tsx`
- [ ] T033 [US3] Create dashboard statistics in `src/lib/dashboard/stats.ts`
- [ ] T034 [US3] Build main dashboard in `src/pages/index.tsx`
- [ ] T035 [P] [US3] Add performance metrics display in `src/components/dashboard/Metrics.tsx`

## Phase 6: User Story 4 - Rate Habits

**Purpose**: Habit rating functionality (P3)

- [ ] T036 [US4] Create rating types in `src/types/rating.ts`
- [ ] T037 [P] [US4] Implement rating component in `src/components/habits/Rating.tsx`
- [ ] T038 [US4] Add rating storage in `src/lib/storage/ratings.ts`
- [ ] T039 [US4] Update habit list to show ratings in `src/components/habits/HabitListItem.tsx`
- [ ] T040 [P] [US4] Add rating statistics to dashboard in `src/components/dashboard/RatingStats.tsx`

## Phase 7: User Story 5 - Share Snapshot

**Purpose**: Export and sharing functionality (P3)

- [ ] T041 [US5] Create snapshot types in `src/types/snapshot.ts`
- [ ] T042 [P] [US5] Implement html2canvas wrapper in `src/lib/export/canvas.ts`
- [ ] T043 [US5] Create JSON export utility in `src/lib/export/json.ts`
- [ ] T044 [US5] Add share button component in `src/components/common/ShareButton.tsx`
- [ ] T045 [US5] Implement snapshot generation in `src/lib/export/snapshot.ts`

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and optimization

- [ ] T046 [P] Add error boundaries in `src/components/common/ErrorBoundary.tsx`
- [ ] T047 [P] Implement loading states and spinners
- [ ] T048 Performance optimization and lazy loading
- [ ] T049 [P] Add PWA support
- [ ] T050 Complete documentation in README.md
- [ ] T051 Final accessibility review
- [ ] T052 Cross-browser testing

## Dependencies & Execution Order

### Phase Dependencies
1. Setup (Phase 1) - No dependencies
2. Foundation (Phase 2) - Depends on Setup
3. User Stories (Phases 3-7):
   - All depend on Foundation
   - Can be implemented independently
   - Natural order: US1 → US2 → US3 → US4 → US5
4. Polish (Phase 8) - After core stories complete

### User Story Dependencies
- US1 (Habit Management): Foundation only
- US2 (Progress): Requires US1
- US3 (Dashboard): Enhanced by US1+US2 but can work independently
- US4 (Ratings): Enhanced by US1 but can work independently
- US5 (Sharing): Enhanced by all but can work independently

### Parallel Opportunities
1. Setup phase: Most tasks marked [P]
2. Foundation: Type definitions and components
3. Per Story:
   - Component creation
   - Type definitions
   - Independent features

## Implementation Strategy

### MVP Approach (P1 Stories)
1. Complete Setup
2. Complete Foundation
3. Implement US1 (Habit Management)
4. Implement US2 (Progress Tracking)
5. Basic dashboard (subset of US3)
6. VALIDATE and potentially release

### Full Implementation
1. Complete MVP
2. Enhance dashboard (full US3)
3. Add ratings (US4)
4. Add sharing (US5)
5. Polish and optimize

### Parallel Team Strategy
With multiple developers:
1. Team completes Setup + Foundation
2. Then split:
   - Dev A: US1 + US2 (core features)
   - Dev B: US3 (dashboard)
   - Dev C: US4 + US5 (enhancements)

## Notes
- Each task includes specific file paths
- [P] markers indicate parallel-safe tasks
- User Story markers [US1-5] for tracking
- Heavy use of TypeScript for type safety
- CSS Modules for style isolation
- Local storage for persistence
- Progressive enhancement approach