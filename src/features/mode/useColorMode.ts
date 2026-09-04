import { parseAsStringEnum, useQueryState } from 'nuqs';

export const COLOR_MODES = ['light', 'dark'] as const;
export type ColorMode = (typeof COLOR_MODES)[number];

const colorModeParser = parseAsStringEnum<ColorMode>([
  ...COLOR_MODES,
]).withDefault('light');

/**
 * Reads/writes the preview color mode (dark/light) from the `mode` URL query param.
 */
export function useColorMode() {
  return useQueryState('mode', colorModeParser);
}
