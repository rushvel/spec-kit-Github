import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import type { Achievement } from '@/types/habits';
import AchievementNotification from '../common/AchievementNotification';
import type { Habit, HabitProgress } from '@/types/habits';
import { habitService } from '@/lib/habits/habitService';
import { achievementService } from '@/lib/achievements/achievementService';
import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import styles from '@/styles/components/HabitDashboard.module.css';

export default function HabitDashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitProgress, setHabitProgress] = useState<HabitProgress[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const loadedHabits = habitService.getAllHabits();
    setHabits(loadedHabits);
    updateProgress(loadedHabits);
  }, []);

  const updateProgress = (currentHabits: Habit[]) => {
    const progress = habitService.getAllHabitsProgress();
    setHabitProgress(progress);
  };

  const handleCreateHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newHabit = habitService.createHabit(habitData);
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    updateProgress(updatedHabits);
    setIsFormVisible(false);

    const logs = storage.getHabitLogs();
    const newAchievements = achievementService.checkAndUnlockAchievements(updatedHabits, logs);

    if (newAchievements.length > 0) {
      setAchievements(newAchievements);
    }
  };

  const handleUpdateProgress = (habitId: string) => {
    // TODO: Show LogEntryForm dialog
  };

  const handleEditHabit = (habitId: string) => {
    // TODO: Show HabitForm dialog with initial values
  };

  const handleDeleteHabit = (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      habitService.deleteHabit(habitId);
      const updatedHabits = habits.filter(h => h.id !== habitId);
      setHabits(updatedHabits);
      updateProgress(updatedHabits);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>My Habits</h2>
        <button 
          className={styles.addButton}
          onClick={() => setIsFormVisible(true)}
        >
          Add New Habit
        </button>
      </div>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <HabitForm 
            onSubmit={handleCreateHabit}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      )}

      <div className={styles.habitList}>
        {habitProgress.map(({ habit, progress, streak }) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            progress={progress}
            streak={streak}
            onUpdate={() => handleUpdateProgress(habit.id)}
            onEdit={() => handleEditHabit(habit.id)}
            onDelete={() => handleDeleteHabit(habit.id)}
          />
        ))}

        {habitProgress.length === 0 && !isFormVisible && (
          <div className={styles.emptyState}>
            <p>You haven't created any habits yet.</p>
            <button 
              className={styles.addButton}
              onClick={() => setIsFormVisible(true)}
            >
              Create Your First Habit
            </button>
          </div>
        )}
      </div>

      {achievements.length > 0 && (
        <AchievementNotification
          achievement={achievements[0]}
          onClose={() => setAchievements(prevAchievements => prevAchievements.slice(1))}
        />
      )}
    </div>
  );
}