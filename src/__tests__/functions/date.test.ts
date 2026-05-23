import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatDate, getAgeInMonths, formatArticleAge } from '@/functions/date';

describe('formatDate', () => {
  it('formats with short month, day, and year by default', () => {
    expect(formatDate('2026-01-15')).toBe('15 Jan 2026');
  });

  it('accepts custom options — long month', () => {
    expect(formatDate('2026-01-15', { month: 'long', day: 'numeric', year: 'numeric' })).toBe('15 January 2026');
  });

  it('accepts custom options — month and year only', () => {
    expect(formatDate('2026-01-15', { month: 'short', year: 'numeric' })).toBe('Jan 2026');
  });

  it('returns an empty string for an empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('returns the original string when the date is unparseable', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('getAgeInMonths', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-23'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 for the current month', () => {
    expect(getAgeInMonths('2026-05-01')).toBe(0);
  });

  it('returns 6 for a date 6 months ago', () => {
    expect(getAgeInMonths('2025-11-23')).toBe(6);
  });

  it('returns 12 for a date exactly 1 year ago', () => {
    expect(getAgeInMonths('2025-05-23')).toBe(12);
  });

  it('returns 24 for a date exactly 2 years ago', () => {
    expect(getAgeInMonths('2024-05-23')).toBe(24);
  });

  it('counts partial months based on calendar month boundary, not day', () => {
    // Nov → May crosses 6 month boundaries regardless of day
    expect(getAgeInMonths('2025-11-30')).toBe(6);
  });
});

describe('formatArticleAge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-23'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns months for an article under a year old', () => {
    expect(formatArticleAge('2025-11-23')).toBe('6 months');
  });

  it('returns "1 year" (singular) for an article exactly 1 year old', () => {
    expect(formatArticleAge('2025-05-23')).toBe('1 year');
  });

  it('returns "2 years" (plural) for an article 2 years old', () => {
    expect(formatArticleAge('2024-05-23')).toBe('2 years');
  });

  it('returns "3 years" for an article 3 years old', () => {
    expect(formatArticleAge('2023-05-23')).toBe('3 years');
  });

  it('switches from months to years at exactly 12 months', () => {
    expect(formatArticleAge('2025-05-23')).toBe('1 year');
  });
});
