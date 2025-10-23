import { useState } from 'react';
import styles from '@/styles/components/LogEntryForm.module.css';

interface LogEntryFormProps {
  initialValue?: number;
  unit?: string;
  onSubmit: (value: number, note?: string) => void;
  onCancel: () => void;
}

export default function LogEntryForm({
  initialValue = 0,
  unit,
  onSubmit,
  onCancel,
}: LogEntryFormProps) {
  const [value, setValue] = useState(initialValue);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value, note || undefined);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="value">Value</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min="0"
            step="1"
            required
          />
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your progress..."
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save Progress
        </button>
      </div>
    </form>
  );
}