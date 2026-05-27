import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MobileColourThemeToggle from '@/components/Home/MobileColourThemeToggle';
import { themes } from '@/components/Home/colourThemes';

describe('MobileColourThemeToggle', () => {
  it('renders a select element', () => {
    render(<MobileColourThemeToggle value="default" onChange={vi.fn()} />);
    expect(screen.getByTestId('mobile-colour-theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-colour-theme-toggle').tagName).toBe('SELECT');
  });

  it('has an accessible label', () => {
    render(<MobileColourThemeToggle value="default" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox', { name: 'Colour vision profile' })).toBeInTheDocument();
  });

  it('renders an option for every theme', () => {
    render(<MobileColourThemeToggle value="default" onChange={vi.fn()} />);
    themes.forEach(({ label }) => {
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument();
    });
  });

  it('reflects the active value', () => {
    render(<MobileColourThemeToggle value="night" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toHaveValue('night');
  });

  it('calls onChange with the selected theme id', () => {
    const onChange = vi.fn();
    render(<MobileColourThemeToggle value="default" onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'protanopia' } });
    expect(onChange).toHaveBeenCalledWith('protanopia');
  });

  it('calls onChange with "default" when Default is selected', () => {
    const onChange = vi.fn();
    render(<MobileColourThemeToggle value="night" onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'default' } });
    expect(onChange).toHaveBeenCalledWith('default');
  });
});
