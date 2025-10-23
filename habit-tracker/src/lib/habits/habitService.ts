import { v4 as uuidv4 } from 'uuid';
import type { Habit, HabitLog, HabitProgress } from '@/types/habits';
import { storage } from '@/lib/storage';
import { calculateStreak } from '@/utils/dateUtils';

export const habitService = {
  createHabit(data: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Habit {
    const now = new Date();
    const habit: Habit = {
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    const habits = storage.getHabits();
    storage.saveHabits([...habits, habit]);

    return habit;
  },

  updateHabit(id: string, data: Partial<Habit>): Habit {
    const habits = storage.getHabits();
    const index = habits.findIndex(h => h.id === id);

    if (index === -1) {
      throw new Error(`Habit with ID ${id} not found`);
    }

    const updatedHabit: Habit = {
      ...habits[index],
      ...data,
      updatedAt: new Date(),
    };

    habits[index] = updatedHabit;
    storage.saveHabits(habits);

    return updatedHabit;
  },

  deleteHabit(id: string): void {
    const habits = storage.getHabits();
    const logs = storage.getHabitLogs();

    storage.saveHabits(habits.filter(h => h.id !== id));
    storage.saveHabitLogs(logs.filter(l => l.habitId !== id));
  },

  getHabit(id: string): Habit | undefined {
    const habits = storage.getHabits();
    return habits.find(h => h.id === id);
  },

  getAllHabits(): Habit[] {
    return storage.getHabits();
  },

  logProgress(habitId: string, value: number, date: Date = new Date(), note?: string): HabitLog {
    const habits = storage.getHabits();
    const habit = habits.find(h => h.id === habitId);

    if (!habit) {
      throw new Error(`Habit with ID ${habitId} not found`);
    }

    const now = new Date();
    const log: HabitLog = {
      id: uuidv4(),
      habitId,
      date,
      value,
      note,
      createdAt: now,
      updatedAt: now,
    };

    const logs = storage.getHabitLogs();
    storage.saveHabitLogs([...logs, log]);

    return log;
  },

  getHabitProgress(habit: Habit): HabitProgress {
    const logs = storage.getHabitLogs();
    const habitLogs = logs.filter(l => l.habitId === habit.id);
    const streak = calculateStreak(habit, habitLogs);
    
    const progress = habitLogs.reduce((sum, log) => sum + log.value, 0);
    const completed = progress >= habit.target;

    return {
      habit,
      logs: habitLogs,
      progress,
      streak,
      completed,
    };
  },

  getAllHabitsProgress(): HabitProgress[] {
    const habits = this.getAllHabits();
    return habits.map(habit => this.getHabitProgress(habit));
  },
};