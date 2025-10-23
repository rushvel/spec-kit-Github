import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { Habit, HabitLog } from '@/types/habits';
import { formatDate } from '@/utils/dateUtils';
import styles from '@/styles/components/HabitChart.module.css';

interface HabitChartProps {
  habit: Habit;
  logs: HabitLog[];
  period?: 'week' | 'month';
}

export default function HabitChart({
  habit,
  logs,
  period = 'week',
}: HabitChartProps) {
  const getChartData = () => {
    const today = new Date();
    const data = [];
    const numDays = period === 'week' ? 7 : 30;

    for (let i = numDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate.getTime() >= date.getTime() &&
          logDate.getTime() < new Date(date.getTime() + 24 * 60 * 60 * 1000).getTime();
      });

      const value = dayLogs.reduce((sum, log) => sum + log.value, 0);

      data.push({
        date: formatDate(date),
        value,
        target: habit.target,
      });
    }

    return data;
  };

  const chartData = getChartData();

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Progress Chart</h3>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[0, Math.max(habit.target * 1.2, ...chartData.map(d => d.value))]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={habit.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#ccc"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}