export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  target: number;
  unit?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  value: number;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitProgress {
  habit: Habit;
  logs: HabitLog[];
  progress: number;
  streak: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  type: 'streak' | 'completion' | 'milestone';
}

export interface HabitSnapshot {
  date: Date;
  habits: HabitProgress[];
  achievements: Achievement[];
}

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface DateRange {
  start: Date;
  end: Date;
}