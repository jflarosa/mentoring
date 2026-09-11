import { parseAsString, useQueryState } from 'nuqs';

/**
 * Reads/writes the URL of the creative's public JS bundle from the
 * `creativeUrl` URL query param. No default — absent means no creative to
 * preview yet.
 */
export function useCreativeUrl() {
  return useQueryState('creativeUrl', parseAsString);
}
