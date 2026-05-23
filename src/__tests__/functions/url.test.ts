import { describe, it, expect } from 'vitest';
import { isExternalHref } from '@/functions/url';

describe('isExternalHref', () => {
  it('returns true for http URLs', () => {
    expect(isExternalHref('http://example.com')).toBe(true);
  });

  it('returns true for https URLs', () => {
    expect(isExternalHref('https://example.com')).toBe(true);
  });

  it('returns false for absolute internal paths', () => {
    expect(isExternalHref('/about')).toBe(false);
  });

  it('returns false for relative paths', () => {
    expect(isExternalHref('about')).toBe(false);
  });

  it('returns false for mailto links', () => {
    expect(isExternalHref('mailto:hello@example.com')).toBe(false);
  });

  it('returns false for hash-only links', () => {
    expect(isExternalHref('#section')).toBe(false);
  });

  it('returns false for protocol-relative URLs', () => {
    expect(isExternalHref('//example.com')).toBe(false);
  });
});
