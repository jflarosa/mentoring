import { parseAsStringEnum, useQueryState } from 'nuqs';

export const ORIENTATIONS = ['portrait', 'landscape'] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

const orientationParser = parseAsStringEnum<Orientation>([
  ...ORIENTATIONS,
]).withDefault('portrait');

/**
 * Reads/writes the preview orientation from the `orientation` URL query param.
 */
export function useOrientation() {
  return useQueryState('orientation', orientationParser);
}
