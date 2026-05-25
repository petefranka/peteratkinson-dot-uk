import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ValuesAccordion from '@/components/Home/ValuesAccordion';

function mockDesktop() {
  vi.mocked(window.matchMedia).mockReturnValue({
    matches: true,
    media: '(min-width: 1024px)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList);
}

const items = [
  { value: 'first', title: 'First Item', children: <p>First content</p> },
  { value: 'second', title: 'Second Item', children: <p>Second content</p> },
  { value: 'third', title: 'Third Item', children: <p>Third content</p> },
];

describe('ValuesAccordion', () => {
  it('renders', () => {
    render(<ValuesAccordion items={items} />);
    expect(screen.getByTestId('values-accordion')).toBeInTheDocument();
  });

  it('renders all item titles', () => {
    render(<ValuesAccordion items={items} />);
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('renders first item content visible by default', () => {
    render(<ValuesAccordion items={items} />);
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('renders content for a closed item after opening it', () => {
    render(<ValuesAccordion items={items} />);
    const [, secondTrigger] = screen.getAllByTestId('accordion-trigger');
    fireEvent.click(secondTrigger);
    expect(screen.getByText('Second content')).toBeInTheDocument();
  });

  it('renders only the first item open by default', () => {
    render(<ValuesAccordion items={items} />);
    const [first, second, third] = screen.getAllByTestId('accordion-trigger');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(third).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the first item when its trigger is clicked', () => {
    render(<ValuesAccordion items={items} />);
    const [firstTrigger] = screen.getAllByTestId('accordion-trigger');
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('reopens an item when its trigger is clicked again', () => {
    render(<ValuesAccordion items={items} />);
    const [firstTrigger] = screen.getAllByTestId('accordion-trigger');
    fireEvent.click(firstTrigger);
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('opening one item does not affect another', () => {
    render(<ValuesAccordion items={items} />);
    const [firstTrigger, secondTrigger] = screen.getAllByTestId('accordion-trigger');
    fireEvent.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('each trigger has aria-controls pointing to a panel', () => {
    render(<ValuesAccordion items={items} />);
    const triggers = screen.getAllByTestId('accordion-trigger');
    triggers.forEach((trigger) => {
      const panelId = trigger.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId!)).toBeInTheDocument();
    });
  });

  it('renders the correct number of accordion items', () => {
    render(<ValuesAccordion items={items} />);
    expect(screen.getAllByTestId('accordion-item')).toHaveLength(3);
  });

  it('renders trigger as a button', () => {
    render(<ValuesAccordion items={items} />);
    screen.getAllByTestId('accordion-trigger').forEach((trigger) => {
      expect(trigger.tagName).toBe('BUTTON');
    });
  });

  it('renders all items open on desktop', () => {
    mockDesktop();
    render(<ValuesAccordion items={items} />);
    const triggers = screen.getAllByTestId('accordion-trigger');
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
