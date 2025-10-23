import { v4 as uuidv4 } from 'uuid';
import type { Achievement, Habit, HabitLog } from '@/types/habits';
import { storage } from '@/lib/storage';

const ACHIEVEMENTS = {
  FIRST_HABIT: {
    title: 'Getting Started',
    description: 'Created your first habit',
    icon: '🌟',
    type: 'milestone',
  },
  FIRST_LOG: {
    title: 'First Step',
    description: 'Logged your first habit progress',
    icon: '👣',
    type: 'milestone',
  },
  STREAK_7_DAYS: {
    title: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    type: 'streak',
  },
  STREAK_30_DAYS: {
    title: 'Monthly Master',
    description: 'Maintained a 30-day streak',
    icon: '⭐',
    type: 'streak',
  },
  STREAK_100_DAYS: {
    title: 'Century Club',
    description: 'Maintained a 100-day streak',
    icon: '🏆',
    type: 'streak',
  },
  ALL_HABITS_COMPLETE: {
    title: 'Perfect Day',
    description: 'Completed all habits in one day',
    icon: '✨',
    type: 'completion',
  },
} as const;

export const achievementService = {
  checkAndUnlockAchievements(habits: Habit[], logs: HabitLog[]): Achievement[] {
    const existingAchievements = storage.getAchievements();
    const newAchievements: Achievement[] = [];
    const now = new Date();

    // First habit achievement
    if (habits.length === 1 && !this._hasAchievement(ACHIEVEMENTS.FIRST_HABIT.title)) {
      newAchievements.push(this._createAchievement(ACHIEVEMENTS.FIRST_HABIT));
    }

    // First log achievement
    if (logs.length === 1 && !this._hasAchievement(ACHIEVEMENTS.FIRST_LOG.title)) {
      newAchievements.push(this._createAchievement(ACHIEVEMENTS.FIRST_LOG));
    }

    // Streak achievements
    habits.forEach(habit => {
      const habitLogs = logs.filter(log => log.habitId === habit.id);
      const streakDays = this._calculateStreakDays(habit, habitLogs);

      if (streakDays >= 100 && !this._hasAchievement(ACHIEVEMENTS.STREAK_100_DAYS.title)) {
        newAchievements.push(this._createAchievement(ACHIEVEMENTS.STREAK_100_DAYS));
      } else if (streakDays >= 30 && !this._hasAchievement(ACHIEVEMENTS.STREAK_30_DAYS.title)) {
        newAchievements.push(this._createAchievement(ACHIEVEMENTS.STREAK_30_DAYS));
      } else if (streakDays >= 7 && !this._hasAchievement(ACHIEVEMENTS.STREAK_7_DAYS.title)) {
        newAchievements.push(this._createAchievement(ACHIEVEMENTS.STREAK_7_DAYS));
      }
    });

    // Perfect day achievement
    if (this._checkPerfectDay(habits, logs) && !this._hasAchievement(ACHIEVEMENTS.ALL_HABITS_COMPLETE.title)) {
      newAchievements.push(this._createAchievement(ACHIEVEMENTS.ALL_HABITS_COMPLETE));
    }

    if (newAchievements.length > 0) {
      storage.saveAchievements([...existingAchievements, ...newAchievements]);
    }

    return newAchievements;
  },

  _hasAchievement(title: string): boolean {
    const achievements = storage.getAchievements();
    return achievements.some(a => a.title === title);
  },

  _createAchievement(template: typeof ACHIEVEMENTS[keyof typeof ACHIEVEMENTS]): Achievement {
    return {
      id: uuidv4(),
      title: template.title,
      description: template.description,
      icon: template.icon,
      type: template.type,
      unlockedAt: new Date(),
    };
  },

  _calculateStreakDays(habit: Habit, logs: HabitLog[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyProgress = new Map<string, number>();

    logs.forEach(log => {
      const dateString = log.date.toISOString().split('T')[0];
      const currentValue = dailyProgress.get(dateString) || 0;
      dailyProgress.set(dateString, currentValue + log.value);
    });

    let streakDays = 0;
    let currentDate = today;

    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      const progress = dailyProgress.get(dateString) || 0;

      if (progress >= habit.target) {
        streakDays++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streakDays;
  },

  _checkPerfectDay(habits: Habit[], logs: HabitLog[]): boolean {
    if (habits.length === 0) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];

    return habits.every(habit => {
      const habitLogs = logs.filter(log => 
        log.habitId === habit.id && 
        log.date.toISOString().split('T')[0] === todayString
      );
      
      const progress = habitLogs.reduce((sum, log) => sum + log.value, 0);
      return progress >= habit.target;
    });
  },
};