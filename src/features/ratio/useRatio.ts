import { parseAsStringEnum, useQueryState } from 'nuqs';

// Ratios only — orientation-agnostic. Always expressed as long:short (the
// `orientation` feature separately decides whether that's rendered as
// landscape or portrait), so `16:9` and `9:16` are the same entry here.
export const RATIOS = ['16:9', '4:3', '5:4', '1:1'] as const;
export type Ratio = (typeof RATIOS)[number];

const ratioParser = parseAsStringEnum<Ratio>([...RATIOS]).withDefault('16:9');

/**
 * Reads/writes the preview aspect ratio (orientation-agnostic) from the
 * `ratio` URL query param.
 */
export function useRatio() {
  return useQueryState('ratio', ratioParser);
}
