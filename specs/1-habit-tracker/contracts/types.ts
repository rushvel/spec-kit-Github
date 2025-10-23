// Types for the habit tracking system

export interface Habit {
  id: string;
  title: string;
  schedule: 'daily' | 'weekly' | 'custom';
  order: number;
  createdAt: string;
  updatedAt: string;
  ratings: Rating[];
}

export interface Rating {
  id: string;
  value: number;
  createdAt: string;
}

export interface Completion {
  id: string;
  habitId: string;
  date: string;
  createdAt: string;
}

export enum AchievementType {
  STREAK_7_DAYS = 'streak_7_days',
  STREAK_30_DAYS = 'streak_30_days',
  TOTAL_100 = 'total_100',
}

export interface Achievement {
  id: string;
  habitId?: string;
  type: AchievementType;
  unlockedAt: string;
  metadata?: Record<string, any>;
}

export interface Snapshot {
  id: string;
  generatedAt: string;
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

// Context types
export interface HabitState {
  habits: Habit[];
  completions: Completion[];
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
}

export interface HabitActions {
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  reorderHabit: (id: string, newOrder: number) => Promise<void>;
  markComplete: (habitId: string, date: string) => Promise<void>;
  rateHabit: (habitId: string, rating: number) => Promise<void>;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
}

// Storage constants
export const STORAGE_KEYS = {
  HABITS: 'habits_v1',
  COMPLETIONS: 'completions_v1',
  ACHIEVEMENTS: 'achievements_v1',
  SETTINGS: 'settings_v1',
} as const;

// API Responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}