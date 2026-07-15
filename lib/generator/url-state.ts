import type { GeneratorConfig } from '@/lib/templates/types';

type EncodedGeneratorState = {
  t?: string[];
  i?: number;
  tb?: number;
  q?: GeneratorConfig['style']['quotes'];
  sc?: number;
  n?: string;
  as?: GeneratorConfig['aiStrictness'];
  pt?: string;
  om?: GeneratorConfig['outputMode'];
  rm?: GeneratorConfig['ruleApplicationMode'];
  sr?: number;
  gp?: string[];
};

function parseEncodedState(encoded: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(atob(encoded));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function toShareableState(
  state: Record<string, unknown>
): EncodedGeneratorState {
  return {
    t: Array.isArray(state.t)
      ? state.t.filter((value): value is string => typeof value === 'string')
      : [],
    i: typeof state.i === 'number' ? state.i : 2,
    tb: state.tb === 1 ? 1 : 0,
    q: state.q === 'single' ? 'single' : 'double',
    sc: state.sc === 1 ? 1 : 0,
    n: typeof state.n === 'string' ? state.n : 'camelCase',
    as:
      state.as === 'strict' || state.as === 'relaxed'
        ? state.as
        : 'moderate',
    pt: typeof state.pt === 'string' ? state.pt : 'web',
    om:
      state.om === 'agents-md' || state.om === 'legacy'
        ? state.om
        : 'project-rules',
    rm:
      state.rm === 'always-apply' ||
      state.rm === 'file-specific' ||
      state.rm === 'manual'
        ? state.rm
        : 'intelligent',
    sr: state.sr === 1 ? 1 : 0,
    gp: Array.isArray(state.gp)
      ? state.gp.filter((value): value is string => typeof value === 'string')
      : undefined,
  };
}

function encodeState(state: EncodedGeneratorState): string {
  return btoa(JSON.stringify(state));
}

/**
 * URL state is intentionally limited to non-sensitive configuration.
 * Custom rule titles/content and unknown fields must never enter a URL.
 */
export function encodeGeneratorUrlState(config: GeneratorConfig): string {
  return encodeState({
    t: config.selectedTags,
    i: config.style.indentSize,
    tb: config.style.useTabs ? 1 : 0,
    q: config.style.quotes,
    sc: config.style.semicolons ? 1 : 0,
    n: config.style.namingConvention || config.namingConvention,
    as: config.aiStrictness,
    pt: config.projectType,
    om: config.outputMode,
    rm: config.ruleApplicationMode,
    sr: config.splitRules ? 1 : 0,
    gp:
      config.globsPattern && config.globsPattern.length > 0
        ? config.globsPattern
        : undefined,
  });
}

export function decodeGeneratorUrlState(
  encoded: string
): Partial<GeneratorConfig> | null {
  const parsed = parseEncodedState(encoded);
  if (!parsed) return null;

  const state = toShareableState(parsed);
  return {
    selectedTags: state.t ?? [],
    style: {
      indentSize: state.i ?? 2,
      useTabs: state.tb === 1,
      quotes: state.q ?? 'double',
      semicolons: state.sc === 1,
      namingConvention:
        state.n === 'PascalCase' || state.n === 'snake_case'
          ? state.n
          : 'camelCase',
    },
    aiStrictness: state.as ?? 'moderate',
    namingConvention: state.n ?? 'camelCase',
    customRules: [],
    projectType: state.pt ?? 'web',
    outputMode: state.om ?? 'project-rules',
    ruleApplicationMode: state.rm ?? 'intelligent',
    splitRules: state.sr === 1,
    globsPattern: state.gp,
  };
}

/**
 * Rebuilds legacy URL state from an allowlist. This removes custom rules (`cr`)
 * and any unknown fields before analytics scripts can observe the page URL.
 */
export function sanitizeEncodedGeneratorState(encoded: string): string | null {
  const parsed = parseEncodedState(encoded);
  if (!parsed) return null;
  return encodeState(toShareableState(parsed));
}
