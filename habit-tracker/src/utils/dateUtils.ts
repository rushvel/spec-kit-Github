import { type Period, type DateRange, type Habit, type HabitLog } from '@/types/habits';

export function getDateRange(period: Period, date: Date = new Date()): DateRange {
  const start = new Date(date);
  const end = new Date(date);

  switch (period) {
    case 'daily':
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'weekly':
      start.setDate(date.getDate() - date.getDay());
      start.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    case 'monthly':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(date.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'yearly':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      break;
  }

  return { start, end };
}

export function calculateStreak(habit: Habit, logs: HabitLog[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedLogs = logs
    .filter(log => log.habitId === habit.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (sortedLogs.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const range = getDateRange(habit.frequency, currentDate);
    const periodLogs = sortedLogs.filter(
      log => log.date >= range.start && log.date <= range.end
    );

    const totalProgress = periodLogs.reduce((sum, log) => sum + log.value, 0);

    if (totalProgress >= habit.target) {
      streak++;
      switch (habit.frequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() - 1);
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() - 7);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() - 1);
          break;
      }
    } else {
      break;
    }
  }

  return streak;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function generateRandomColor(): string {
  const colors = [
    '#3498db', // blue
    '#2ecc71', // green
    '#e74c3c', // red
    '#f1c40f', // yellow
    '#9b59b6', // purple
    '#e67e22', // orange
    '#1abc9c', // turquoise
    '#34495e', // navy
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}