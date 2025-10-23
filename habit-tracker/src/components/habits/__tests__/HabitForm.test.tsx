import { render, screen, fireEvent } from '@testing-library/react';
import HabitForm from '@/components/habits/HabitForm';

describe('HabitForm', () => {
  const mockOnSubmit = jest.fn();
  const initialValues = {
    name: 'Exercise',
    description: 'Daily workout routine',
    frequency: 'daily',
    target: 30,
    unit: 'minutes',
    color: '#3498db',
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders with default values', () => {
    render(<HabitForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/habit name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/frequency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/unit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save habit/i })).toBeInTheDocument();
  });

  it('renders with initial values', () => {
    render(<HabitForm onSubmit={mockOnSubmit} initialValues={initialValues} />);

    expect(screen.getByLabelText(/habit name/i)).toHaveValue(initialValues.name);
    expect(screen.getByLabelText(/description/i)).toHaveValue(initialValues.description);
    expect(screen.getByLabelText(/frequency/i)).toHaveValue(initialValues.frequency);
    expect(screen.getByLabelText(/target/i)).toHaveValue(initialValues.target);
    expect(screen.getByLabelText(/unit/i)).toHaveValue(initialValues.unit);
    expect(screen.getByLabelText(/color/i)).toHaveValue(initialValues.color);
  });

  it('submits form with entered values', () => {
    render(<HabitForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText(/habit name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const frequencySelect = screen.getByLabelText(/frequency/i);
    const targetInput = screen.getByLabelText(/target/i);
    const unitInput = screen.getByLabelText(/unit/i);
    const colorInput = screen.getByLabelText(/color/i);

    fireEvent.change(nameInput, { target: { value: 'Exercise' } });
    fireEvent.change(descriptionInput, { target: { value: 'Daily workout' } });
    fireEvent.change(frequencySelect, { target: { value: 'daily' } });
    fireEvent.change(targetInput, { target: { value: '30' } });
    fireEvent.change(unitInput, { target: { value: 'minutes' } });
    fireEvent.change(colorInput, { target: { value: '#3498db' } });

    fireEvent.click(screen.getByRole('button', { name: /save habit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Exercise',
      description: 'Daily workout',
      frequency: 'daily',
      target: 30,
      unit: 'minutes',
      color: '#3498db',
    });
  });

  it('requires necessary fields', () => {
    render(<HabitForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /save habit/i }));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});