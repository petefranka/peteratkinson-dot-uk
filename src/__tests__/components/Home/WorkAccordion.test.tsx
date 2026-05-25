import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkAccordion from '@/components/Home/WorkAccordion';

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
  { value: 'first', title: 'First Co', date: "Jan '20 – Jan '21", children: <p>First content</p> },
  { value: 'second', title: 'Second Co', date: "Feb '21 – Feb '22", children: <p>Second content</p> },
  { value: 'third', title: 'Third Co', children: <p>Third content</p> },
];

describe('WorkAccordion', () => {
  it('renders', () => {
    render(<WorkAccordion items={items} />);
    expect(screen.getByTestId('work-accordion')).toBeInTheDocument();
  });

  it('renders all item titles', () => {
    render(<WorkAccordion items={items} />);
    expect(screen.getByText('First Co')).toBeInTheDocument();
    expect(screen.getByText('Second Co')).toBeInTheDocument();
    expect(screen.getByText('Third Co')).toBeInTheDocument();
  });

  it('renders first item content visible by default', () => {
    render(<WorkAccordion items={items} />);
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('renders content for a closed item after opening it', () => {
    render(<WorkAccordion items={items} />);
    const [, secondTrigger] = screen.getAllByTestId('work-accordion-trigger');
    fireEvent.click(secondTrigger);
    expect(screen.getByText('Second content')).toBeInTheDocument();
  });

  it('renders dates when provided', () => {
    render(<WorkAccordion items={items} />);
    expect(screen.getByText("Jan '20 – Jan '21")).toBeInTheDocument();
    expect(screen.getByText("Feb '21 – Feb '22")).toBeInTheDocument();
  });

  it('does not render a date when none is provided', () => {
    render(<WorkAccordion items={items} />);
    const triggers = screen.getAllByTestId('work-accordion-trigger');
    const thirdTrigger = triggers[2];
    expect(thirdTrigger.querySelector('span + span')).toBeNull();
  });

  it('renders only the first item open by default', () => {
    render(<WorkAccordion items={items} />);
    const [first, second, third] = screen.getAllByTestId('work-accordion-trigger');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(third).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the first item when its trigger is clicked', () => {
    render(<WorkAccordion items={items} />);
    const [firstTrigger] = screen.getAllByTestId('work-accordion-trigger');
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a closed item when its trigger is clicked', () => {
    render(<WorkAccordion items={items} />);
    const [, secondTrigger] = screen.getAllByTestId('work-accordion-trigger');
    fireEvent.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('reopens an item when its trigger is clicked twice', () => {
    render(<WorkAccordion items={items} />);
    const [firstTrigger] = screen.getAllByTestId('work-accordion-trigger');
    fireEvent.click(firstTrigger);
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('opening one item does not close another', () => {
    render(<WorkAccordion items={items} />);
    const [firstTrigger, secondTrigger] = screen.getAllByTestId('work-accordion-trigger');
    fireEvent.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the correct number of items', () => {
    render(<WorkAccordion items={items} />);
    expect(screen.getAllByTestId('work-accordion-item')).toHaveLength(3);
  });

  it('renders each trigger as a button', () => {
    render(<WorkAccordion items={items} />);
    screen.getAllByTestId('work-accordion-trigger').forEach((trigger) => {
      expect(trigger.tagName).toBe('BUTTON');
    });
  });

  it('each trigger has aria-controls pointing to a panel', () => {
    render(<WorkAccordion items={items} />);
    screen.getAllByTestId('work-accordion-trigger').forEach((trigger) => {
      const panelId = trigger.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId!)).toBeInTheDocument();
    });
  });

  it('renders an empty accordion without error', () => {
    render(<WorkAccordion items={[]} />);
    expect(screen.getByTestId('work-accordion')).toBeInTheDocument();
    expect(screen.queryAllByTestId('work-accordion-item')).toHaveLength(0);
  });

  it('renders all items open on desktop', () => {
    mockDesktop();
    render(<WorkAccordion items={items} />);
    const triggers = screen.getAllByTestId('work-accordion-trigger');
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
