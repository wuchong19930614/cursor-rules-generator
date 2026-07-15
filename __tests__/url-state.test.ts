import { describe, expect, it } from 'vitest';
import {
  decodeGeneratorUrlState,
  encodeGeneratorUrlState,
  sanitizeEncodedGeneratorState,
} from '@/lib/generator/url-state';
import type { GeneratorConfig } from '@/lib/templates/types';

const config: GeneratorConfig = {
  selectedTags: ['nextjs', 'typescript'],
  style: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  aiStrictness: 'strict',
  namingConvention: 'camelCase',
  customRules: [
    {
      title: 'Internal API',
      content: 'Never expose SECRET_PROJECT_TOKEN.',
    },
  ],
  projectType: 'web',
  outputMode: 'project-rules',
  ruleApplicationMode: 'intelligent',
  splitRules: true,
};

describe('generator URL state privacy', () => {
  it('never serializes custom rule titles or content', () => {
    const encoded = encodeGeneratorUrlState(config);
    const payload = JSON.parse(atob(encoded)) as Record<string, unknown>;

    expect(payload).not.toHaveProperty('cr');
    expect(atob(encoded)).not.toContain('Internal API');
    expect(atob(encoded)).not.toContain('SECRET_PROJECT_TOKEN');
    expect(decodeGeneratorUrlState(encoded)?.customRules).toEqual([]);
  });

  it('removes legacy custom rules and unknown fields before analytics loads', () => {
    const legacy = btoa(
      JSON.stringify({
        t: ['react'],
        om: 'agents-md',
        cr: ['Private%20rule:Do%20not%20share'],
        unexpectedPrivateField: 'sensitive',
      })
    );

    const sanitized = sanitizeEncodedGeneratorState(legacy);
    expect(sanitized).not.toBeNull();

    const payload = JSON.parse(atob(sanitized!)) as Record<string, unknown>;
    expect(payload.t).toEqual(['react']);
    expect(payload.om).toBe('agents-md');
    expect(payload).not.toHaveProperty('cr');
    expect(payload).not.toHaveProperty('unexpectedPrivateField');
  });

  it('rejects invalid state instead of leaving it in the URL', () => {
    expect(sanitizeEncodedGeneratorState('not-base64')).toBeNull();
    expect(decodeGeneratorUrlState('not-base64')).toBeNull();
  });
});
