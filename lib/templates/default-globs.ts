import type { CursorRuleTemplate } from './types';

/**
 * Template-wide source patterns used to scope File Specific project rules.
 * Every section receives the same baseline; users can override it in the generator.
 */
const TEMPLATE_GLOB_PATTERNS: Record<string, string[]> = {
  react: ['src/**/*.{js,jsx,ts,tsx}'],
  nextjs: [
    'app/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  vue: ['src/**/*.vue', 'src/**/*.{js,ts}'],
  svelte: ['src/**/*.svelte', 'src/**/*.{js,ts}'],
  angular: ['src/**/*.{ts,html,css,scss}'],
  astro: ['src/**/*.{astro,js,jsx,ts,tsx}'],
  tailwind: ['**/*.{html,css,js,jsx,ts,tsx,vue,svelte,astro}'],
  remix: ['app/**/*.{js,jsx,ts,tsx}'],
  nuxt: [
    'app/**/*.{vue,js,ts}',
    'pages/**/*.vue',
    'components/**/*.vue',
    'server/**/*.{js,ts}',
  ],
  go: ['**/*.go'],
  rust: ['src/**/*.rs', 'tests/**/*.rs'],
  node: ['src/**/*.{js,ts,mjs,cjs}', 'test/**/*.{js,ts,mjs,cjs}'],
  python: ['**/*.py'],
  django: ['**/*.py', 'templates/**/*.html'],
  flask: ['**/*.py', 'templates/**/*.html'],
  fastapi: ['**/*.py'],
  'react-native': ['**/*.{js,jsx,ts,tsx}'],
  flutter: ['lib/**/*.dart', 'test/**/*.dart'],
  typescript: ['**/*.{ts,tsx}'],
  prisma: ['**/*.prisma'],
  docker: [
    '**/Dockerfile',
    '**/Dockerfile.*',
    '**/docker-compose*.{yml,yaml}',
  ],
  electron: ['src/**/*.{js,jsx,ts,tsx}'],
  tauri: ['src/**/*.{js,jsx,ts,tsx}', 'src-tauri/**/*.rs'],
  bun: ['**/*.{js,jsx,ts,tsx}'],
  zig: ['src/**/*.zig', 'build.zig'],
  solidjs: ['src/**/*.{js,jsx,ts,tsx}'],
};

export function withDefaultGlobs(
  template: CursorRuleTemplate
): CursorRuleTemplate {
  const patterns = TEMPLATE_GLOB_PATTERNS[template.id];
  if (!patterns) {
    throw new Error(`Default globs not found for template: ${template.id}`);
  }

  return {
    ...template,
    defaultGlobs: Object.fromEntries(
      template.sections.map((section) => [section.id, [...patterns]])
    ),
  };
}

export function getDefaultGlobsForTemplates(
  templates: CursorRuleTemplate[]
): string[] {
  return Array.from(
    new Set(
      templates.flatMap((template) => TEMPLATE_GLOB_PATTERNS[template.id] ?? [])
    )
  );
}
