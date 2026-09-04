import { parseAsStringEnum, useQueryState } from 'nuqs';

export const RATIOS = ['16:9', '9:16', '4:3', '3:4', '1:1'] as const;
export type Ratio = (typeof RATIOS)[number];

const ratioParser = parseAsStringEnum<Ratio>([...RATIOS]).withDefault('16:9');

/**
 * Reads/writes the preview aspect ratio from the `ratio` URL query param.
 */
export function useRatio() {
  return useQueryState('ratio', ratioParser);
}
