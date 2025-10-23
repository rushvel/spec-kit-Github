import { habitService } from '@/lib/habits/habitService';
import { storage } from '@/lib/storage';

// Mock the storage module
jest.mock('@/lib/storage', () => ({
  storage: {
    getHabits: jest.fn(),
    saveHabits: jest.fn(),
    getHabitLogs: jest.fn(),
    saveHabitLogs: jest.fn(),
  },
}));

describe('habitService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storage.getHabits as jest.Mock).mockReturnValue([]);
    (storage.getHabitLogs as jest.Mock).mockReturnValue([]);
  });

  describe('createHabit', () => {
    it('creates a new habit with generated id and timestamps', () => {
      const habitData = {
        name: 'Exercise',
        description: 'Daily workout',
        frequency: 'daily',
        target: 30,
        unit: 'minutes',
      } as const;

      const habit = habitService.createHabit(habitData);

      expect(habit).toEqual({
        ...habitData,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(storage.saveHabits).toHaveBeenCalledWith([habit]);
    });
  });

  describe('updateHabit', () => {
    it('updates an existing habit', () => {
      const existingHabit = {
        id: '123',
        name: 'Exercise',
        description: 'Daily workout',
        frequency: 'daily',
        target: 30,
        unit: 'minutes',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (storage.getHabits as jest.Mock).mockReturnValue([existingHabit]);

      const updatedData = {
        name: 'Updated Exercise',
        target: 45,
      };

      const updatedHabit = habitService.updateHabit('123', updatedData);

      expect(updatedHabit).toEqual({
        ...existingHabit,
        ...updatedData,
        updatedAt: expect.any(Date),
      });

      expect(storage.saveHabits).toHaveBeenCalledWith([updatedHabit]);
    });

    it('throws an error if habit is not found', () => {
      expect(() => habitService.updateHabit('non-existent', {}))
        .toThrow('Habit with ID non-existent not found');
    });
  });

  describe('deleteHabit', () => {
    it('deletes a habit and its logs', () => {
      const habits = [
        { id: '123', name: 'Exercise' },
        { id: '456', name: 'Reading' },
      ];
      const logs = [
        { id: 'log1', habitId: '123' },
        { id: 'log2', habitId: '456' },
      ];

      (storage.getHabits as jest.Mock).mockReturnValue(habits);
      (storage.getHabitLogs as jest.Mock).mockReturnValue(logs);

      habitService.deleteHabit('123');

      expect(storage.saveHabits).toHaveBeenCalledWith([habits[1]]);
      expect(storage.saveHabitLogs).toHaveBeenCalledWith([logs[1]]);
    });
  });

  describe('getHabitProgress', () => {
    it('calculates habit progress correctly', () => {
      const habit = {
        id: '123',
        name: 'Exercise',
        target: 30,
        frequency: 'daily',
      } as any;

      const logs = [
        { habitId: '123', value: 10 },
        { habitId: '123', value: 15 },
      ];

      (storage.getHabitLogs as jest.Mock).mockReturnValue(logs);

      const progress = habitService.getHabitProgress(habit);

      expect(progress).toEqual({
        habit,
        logs,
        progress: 25,
        streak: expect.any(Number),
        completed: false,
      });
    });
  });
});