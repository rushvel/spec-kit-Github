import type { Habit } from '@/types/habits';
import styles from '@/styles/components/HabitItem.module.css';

interface HabitItemProps {
  habit: Habit;
  progress: number;
  streak: number;
  onUpdate: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HabitItem({
  habit,
  progress,
  streak,
  onUpdate,
  onEdit,
  onDelete,
}: HabitItemProps) {
  const progressPercentage = Math.min((progress / habit.target) * 100, 100);

  return (
    <div className={styles.habitItem} style={{ borderColor: habit.color }}>
      <div className={styles.header}>
        <h3 className={styles.title}>{habit.name}</h3>
        <div className={styles.actions}>
          <button
            onClick={onEdit}
            className={styles.actionButton}
            title="Edit habit"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            title="Delete habit"
          >
            Delete
          </button>
        </div>
      </div>

      {habit.description && (
        <p className={styles.description}>{habit.description}</p>
      )}

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>Progress: {progress}/{habit.target} {habit.unit}</span>
          <span>Streak: {streak} {habit.frequency}</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: habit.color,
            }}
          />
        </div>
      </div>

      <button
        onClick={onUpdate}
        className={styles.updateButton}
        style={{ backgroundColor: habit.color }}
      >
        Update Progress
      </button>
    </div>
  );
}