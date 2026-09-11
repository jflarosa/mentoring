import { describe, expect, it } from 'vitest';

import { orientRatio } from './orientRatio';

describe('orientRatio', () => {
  it('keeps a landscape ratio as long:short', () => {
    expect(orientRatio('16:9', 'landscape')).toEqual([16, 9]);
  });

  it('flips a ratio to short:long in portrait', () => {
    expect(orientRatio('16:9', 'portrait')).toEqual([9, 16]);
  });

  it('leaves a square ratio unchanged in either orientation', () => {
    expect(orientRatio('1:1', 'landscape')).toEqual([1, 1]);
    expect(orientRatio('1:1', 'portrait')).toEqual([1, 1]);
  });

  it('flips every ratio in RATIOS consistently', () => {
    expect(orientRatio('4:3', 'portrait')).toEqual([3, 4]);
    expect(orientRatio('5:4', 'portrait')).toEqual([4, 5]);
  });
});
