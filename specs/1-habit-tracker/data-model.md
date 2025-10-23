# Data Model

## Core Types

### Habit

```typescript
interface Habit {
  id: string;           // UUID
  title: string;        // Display name
  schedule: 'daily' | 'weekly' | 'custom';
  order: number;        // For sorting
  createdAt: string;    // ISO date
  updatedAt: string;    // ISO date
  ratings: Rating[];    // User ratings
}
```

### Rating

```typescript
interface Rating {
  id: string;           // UUID
  value: number;        // 1-5
  createdAt: string;    // ISO date
}
```

### Completion

```typescript
interface Completion {
  id: string;           // UUID
  habitId: string;      // Reference to habit
  date: string;         // ISO date
  createdAt: string;    // ISO date
}
```

### Achievement

```typescript
interface Achievement {
  id: string;           // UUID
  habitId?: string;     // Optional - some achievements are global
  type: AchievementType;
  unlockedAt: string;   // ISO date
  metadata?: Record<string, any>; // Optional achievement-specific data
}

enum AchievementType {
  STREAK_7_DAYS = 'streak_7_days',
  STREAK_30_DAYS = 'streak_30_days',
  TOTAL_100 = 'total_100',
  // Extensible for future achievements
}
```

### Snapshot

```typescript
interface Snapshot {
  id: string;           // UUID
  generatedAt: string;  // ISO date
  stats: {
    totalHabits: number;
    activeStreaks: number;
    completionRate: number;
    achievements: number;
  };
  habits: Array<{
    id: string;
    title: string;
    streak: number;
    completionRate: number;
    achievements: Achievement[];
  }>;
}
```

## LocalStorage Schema

Data will be stored in localStorage using the following keys:

```typescript
const STORAGE_KEYS = {
  HABITS: 'habits_v1',      // Habit[]
  COMPLETIONS: 'completions_v1', // Completion[]
  ACHIEVEMENTS: 'achievements_v1', // Achievement[]
  SETTINGS: 'settings_v1',   // UserSettings
} as const;
```

## State Management

React Context will manage the following slices:

```typescript
interface HabitState {
  habits: Habit[];
  completions: Completion[];
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

interface HabitActions {
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  reorderHabit: (id: string, newOrder: number) => Promise<void>;
  markComplete: (habitId: string, date: string) => Promise<void>;
  rateHabit: (habitId: string, rating: number) => Promise<void>;
}

interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
  // Extensible for future settings
}
```

## Data Validation

Client-side validation rules:

1. Habit title: Required, 1-100 characters
2. Rating value: 1-5 integer
3. Dates: Valid ISO format
4. Order: Non-negative integer
5. IDs: Valid UUID v4

## Migration Strategy

Version numbers in storage keys (`_v1`) allow for future schema migrations. Migration logic will run on app load to update data structures if needed.

## Performance Considerations

1. Indexes:
   - Completions indexed by habitId + date
   - Achievements indexed by type
   - Habits indexed by order

2. Memory Usage:
   - Pagination for long history (> 100 items)
   - Lazy loading of charts
   - Cleanup of old data (> 1 year)

3. Storage Limits:
   - Monitor localStorage usage
   - Implement cleanup when approaching limits
   - Export old data functionality