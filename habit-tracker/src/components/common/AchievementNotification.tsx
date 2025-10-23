import type { Achievement } from '@/types/habits';
import styles from '@/styles/components/AchievementNotification.module.css';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementNotification({
  achievement,
  onClose,
}: AchievementNotificationProps) {
  return (
    <div className={styles.notification}>
      <div className={styles.content}>
        <span className={styles.icon}>{achievement.icon}</span>
        <div className={styles.details}>
          <h4 className={styles.title}>{achievement.title}</h4>
          <p className={styles.description}>{achievement.description}</p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}