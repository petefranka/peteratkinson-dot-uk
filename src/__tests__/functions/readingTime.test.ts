import { describe, it, expect } from 'vitest';
import { getReadingTime } from '@/functions';

describe('getReadingTime', () => {
  it('returns a string ending with "min read"', () => {
    const text = 'word '.repeat(200);
    expect(getReadingTime(text)).toMatch(/min read$/);
  });

  it('returns "1 min read" for very short content', () => {
    expect(getReadingTime('Hello world')).toBe('1 min read');
  });

  it('returns a longer estimate for long content', () => {
    const text = 'word '.repeat(1000);
    const result = getReadingTime(text);
    const minutes = parseInt(result);
    expect(minutes).toBeGreaterThan(1);
  });

  it('handles empty string', () => {
    expect(getReadingTime('')).toMatch(/min read$/);
  });
});
