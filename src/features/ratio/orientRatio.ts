import type { Orientation } from '@features/orientation/useOrientation';

import type { Ratio } from './useRatio';

/**
 * Splits a canonical (long:short) ratio into [width, height] for a given
 * orientation — landscape keeps long:short, portrait flips it.
 */
export function orientRatio(
  ratio: Ratio,
  orientation: Orientation,
): [width: number, height: number] {
  const [long, short] = ratio.split(':').map(Number);
  return orientation === 'portrait' ? [short, long] : [long, short];
}
