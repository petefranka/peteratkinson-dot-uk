import { describe, it, expect } from 'vitest';
import { slugifyTitle } from '@/lib/slug';

describe('slugifyTitle', () => {
  it('lowercases text', () => {
    expect(slugifyTitle('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugifyTitle('foo bar baz')).toBe('foo-bar-baz');
  });

  it('removes special characters', () => {
    expect(slugifyTitle('Hello, World!')).toBe('hello-world');
  });

  it('collapses multiple non-alphanumeric chars into a single hyphen', () => {
    expect(slugifyTitle('hello -- world')).toBe('hello-world');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugifyTitle(' hello ')).toBe('hello');
    expect(slugifyTitle('!hello!')).toBe('hello');
  });

  it('handles an empty string', () => {
    expect(slugifyTitle('')).toBe('');
  });

  it('preserves numbers', () => {
    expect(slugifyTitle('Top 10 Tips')).toBe('top-10-tips');
  });

  it('handles apostrophes', () => {
    expect(slugifyTitle("it's a test")).toBe('it-s-a-test');
  });
});
