import { Habit, HabitLog, Achievement } from '@/types/habits';

const STORAGE_KEYS = {
  HABITS: 'habits',
  LOGS: 'habit_logs',
  ACHIEVEMENTS: 'achievements',
} as const;

export const storage = {
  getHabits(): Habit[] {
    if (typeof window === 'undefined') return [];
    const habits = localStorage.getItem(STORAGE_KEYS.HABITS);
    return habits ? JSON.parse(habits) : [];
  },

  saveHabits(habits: Habit[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },

  getHabitLogs(): HabitLog[] {
    if (typeof window === 'undefined') return [];
    const logs = localStorage.getItem(STORAGE_KEYS.LOGS);
    return logs ? JSON.parse(logs) : [];
  },

  saveHabitLogs(logs: HabitLog[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  },

  getAchievements(): Achievement[] {
    if (typeof window === 'undefined') return [];
    const achievements = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return achievements ? JSON.parse(achievements) : [];
  },

  saveAchievements(achievements: Achievement[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.HABITS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  },
};