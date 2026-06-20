'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { GeneratorConfig } from '@/lib/templates/types';

function encodeConfig(config: GeneratorConfig): string {
  const payload: Record<string, unknown> = {
    t: config.selectedTags,
    i: config.style.indentSize,
    tb: config.style.useTabs ? 1 : 0,
    q: config.style.quotes,
    sc: config.style.semicolons ? 1 : 0,
    n: config.style.namingConvention || config.namingConvention,
    as: config.aiStrictness,
    cr: config.customRules
      .filter((r) => r.title && r.content)
      .map((r) => `${encodeURIComponent(r.title)}:${encodeURIComponent(r.content)}`),
    pt: config.projectType,
    // Day 1 新增
    om: config.outputMode,
    rm: config.ruleApplicationMode,
    sr: config.splitRules ? 1 : 0,
    gp: config.globsPattern && config.globsPattern.length > 0
      ? config.globsPattern
      : undefined,
  };
  return btoa(JSON.stringify(payload));
}

function decodeConfig(encoded: string): Partial<GeneratorConfig> | null {
  try {
    const payload = JSON.parse(atob(encoded));
    const customRules = (payload.cr || []).map((item: string) => {
      const colonIdx = item.indexOf(':');
      const title = colonIdx > -1 ? item.slice(0, colonIdx) : item;
      const content = colonIdx > -1 ? item.slice(colonIdx + 1) : '';
      return { title: decodeURIComponent(title), content: decodeURIComponent(content) };
    });

    return {
      selectedTags: payload.t || [],
      style: {
        indentSize: payload.i ?? 2,
        useTabs: payload.tb === 1,
        quotes: payload.q || 'double',
        semicolons: payload.sc === 1,
        namingConvention: payload.n || 'camelCase',
      },
      aiStrictness: payload.as || 'moderate',
      namingConvention: payload.n || 'camelCase',
      customRules,
      projectType: payload.pt || 'web',
      // Day 1 新增
      outputMode: (payload.om as GeneratorConfig['outputMode']) || 'project-rules',
      ruleApplicationMode:
        (payload.rm as GeneratorConfig['ruleApplicationMode']) || 'intelligent',
      splitRules: payload.sr === 1,
      globsPattern: Array.isArray(payload.gp) ? payload.gp : undefined,
    };
  } catch {
    return null;
  }
}

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
    return decodeConfig(encoded);
  }, [searchParams]);

  const syncToUrl = useCallback(
    (config: GeneratorConfig) => {
      try {
        const encoded = encodeConfig(config);
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
