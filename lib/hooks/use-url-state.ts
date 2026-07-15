'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { GeneratorConfig } from '@/lib/templates/types';
import {
  decodeGeneratorUrlState,
  encodeGeneratorUrlState,
} from '@/lib/generator/url-state';

/**
 * URL-based state persistence for GeneratorConfig.
 * Serializes to ?s=<base64> on change, reads on mount.
 */
export function useUrlState(): {
  restoreFromUrl: () => Partial<GeneratorConfig> | null;
  syncToUrl: (config: GeneratorConfig) => void;
  hasUrlState: boolean;
} {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasUrlState = useMemo(() => searchParams?.has('s') ?? false, [searchParams]);

  const restoreFromUrl = useCallback((): Partial<GeneratorConfig> | null => {
    const encoded = searchParams?.get('s');
    if (!encoded) return null;
    return decodeGeneratorUrlState(encoded);
  }, [searchParams]);

  const syncToUrl = useCallback(
    (config: GeneratorConfig) => {
      try {
        const encoded = encodeGeneratorUrlState(config);
        const url = new URL(window.location.href);
        url.searchParams.set('s', encoded);
        router.replace(url.pathname + url.search, { scroll: false });
      } catch {
        // Silently ignore encoding failures
      }
    },
    [router]
  );

  return { restoreFromUrl, syncToUrl, hasUrlState };
}
