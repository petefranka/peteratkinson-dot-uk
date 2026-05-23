import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from '@/hooks/use-mobile';

const mockMatchMedia = () =>
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia() });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: originalInnerWidth });
  });

  it('returns false when viewport is >= 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true when viewport is < 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false exactly at the 768px breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 768 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
