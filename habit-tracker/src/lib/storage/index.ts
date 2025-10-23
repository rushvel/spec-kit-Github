import { Habit, HabitLog, Achievement } from '@/types/habits';

const STORAGE_KEYS = {
  HABITS: 'habits',
  LOGS: 'habit_logs',
  ACHIEVEMENTS: 'achievements',
} as const;

export const storage = {
  getHabits(): Habit[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (!data) return [];

    try {
      const habits = JSON.parse(data);
      return habits.map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
        updatedAt: new Date(habit.updatedAt),
      }));
    } catch (error) {
      console.error('Error parsing habits:', error);
      return [];
    }
  },

  saveHabits(habits: Habit[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },

  getHabitLogs(): HabitLog[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!data) return [];

    try {
      const logs = JSON.parse(data);
      return logs.map((log: any) => ({
        ...log,
        date: new Date(log.date),
        createdAt: new Date(log.createdAt),
        updatedAt: new Date(log.updatedAt),
      }));
    } catch (error) {
      console.error('Error parsing habit logs:', error);
      return [];
    }
  },

  saveHabitLogs(logs: HabitLog[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  },

  getAchievements(): Achievement[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!data) return [];

    try {
      const achievements = JSON.parse(data);
      return achievements.map((achievement: any) => ({
        ...achievement,
        unlockedAt: new Date(achievement.unlockedAt),
      }));
    } catch (error) {
      console.error('Error parsing achievements:', error);
      return [];
    }
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