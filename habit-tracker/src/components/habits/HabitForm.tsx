import { useState } from 'react';
import type { Habit } from '@/types/habits';
import styles from '@/styles/components/HabitForm.module.css';

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialValues?: Partial<Habit>;
}

export default function HabitForm({ onSubmit, onCancel, initialValues }: HabitFormProps) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    frequency: initialValues?.frequency || 'daily',
    target: initialValues?.target || 1,
    unit: initialValues?.unit || '',
    color: initialValues?.color || '#3498db',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'target' ? Number(value) : value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Habit Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Exercise"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your habit..."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="frequency">Frequency *</label>
        <select
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="target">Target *</label>
        <input
          type="number"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="unit">Unit</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="e.g., minutes, times"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save Habit
        </button>
      </div>
    </form>
  );
}