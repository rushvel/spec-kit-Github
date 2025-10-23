import html2canvas from 'html2canvas';
import type { HabitSnapshot } from '@/types/habits';

export const exportService = {
  async exportAsImage(elementId: string): Promise<string> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id '${elementId}' not found`);
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  },

  exportAsJSON(data: HabitSnapshot): string {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error generating JSON:', error);
      throw new Error('Failed to generate JSON');
    }
  },

  exportAsCSV(data: HabitSnapshot): string {
    try {
      const headers = ['Habit Name', 'Progress', 'Target', 'Streak', 'Completed'];
      const rows = data.habits.map(habitProgress => [
        habitProgress.habit.name,
        habitProgress.progress.toString(),
        habitProgress.habit.target.toString(),
        habitProgress.streak.toString(),
        habitProgress.completed ? 'Yes' : 'No',
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(',')),
      ].join('\n');

      return csvContent;
    } catch (error) {
      console.error('Error generating CSV:', error);
      throw new Error('Failed to generate CSV');
    }
  },

  downloadFile(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};