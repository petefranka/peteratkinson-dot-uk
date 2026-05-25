import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatRelativeDate } from '@/functions';

const NOW = new Date('2026-05-25T12:00:00Z');

function minutesAgo(n: number) {
  return new Date(NOW.getTime() - n * 60_000).toISOString();
}
function hoursAgo(n: number) {
  return new Date(NOW.getTime() - n * 3_600_000).toISOString();
}
function daysAgo(n: number) {
  return new Date(NOW.getTime() - n * 86_400_000).toISOString();
}
function monthsAgo(n: number) {
  return new Date(NOW.getTime() - n * 30.44 * 86_400_000).toISOString();
}
function yearsAgo(n: number) {
  return new Date(NOW.getTime() - n * 365.25 * 86_400_000).toISOString();
}

describe('formatRelativeDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty string for empty input', () => {
    expect(formatRelativeDate('')).toBe('');
  });

  it('returns original string for invalid date', () => {
    expect(formatRelativeDate('not-a-date')).toBe('not-a-date');
  });

  it('returns "Just posted" for 0 minutes ago', () => {
    expect(formatRelativeDate(NOW.toISOString())).toBe('Just posted');
  });

  it('returns "Just posted" for 4 minutes ago', () => {
    expect(formatRelativeDate(minutesAgo(4))).toBe('Just posted');
  });

  it('returns minutes ago for 10 minutes ago', () => {
    expect(formatRelativeDate(minutesAgo(10))).toBe('10 minutes ago');
  });

  it('returns hours ago for 3 hours ago', () => {
    expect(formatRelativeDate(hoursAgo(3))).toBe('3 hours ago');
  });

  it('returns singular hour for 1 hour ago', () => {
    expect(formatRelativeDate(hoursAgo(1))).toBe('1 hour ago');
  });

  it('returns days ago for 5 days ago', () => {
    expect(formatRelativeDate(daysAgo(5))).toBe('5 days ago');
  });

  it('returns singular day for 1 day ago', () => {
    expect(formatRelativeDate(daysAgo(1))).toBe('1 day ago');
  });

  it('returns months ago for 2 months ago', () => {
    expect(formatRelativeDate(monthsAgo(2))).toBe('2 months ago');
  });

  it('returns singular month for 1 month ago', () => {
    expect(formatRelativeDate(monthsAgo(1))).toBe('1 month ago');
  });

  it('returns years ago for 2 years ago', () => {
    expect(formatRelativeDate(yearsAgo(2))).toBe('2 years ago');
  });

  it('returns singular year for 1 year ago', () => {
    expect(formatRelativeDate(yearsAgo(1))).toBe('1 year ago');
  });

  it('handles date-only strings like "2024-01-15"', () => {
    const result = formatRelativeDate('2024-01-15');
    expect(result).toMatch(/ago$/);
  });
});
