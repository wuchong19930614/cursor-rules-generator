// lib/templates/svelte.ts
// Svelte 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const svelteTemplate: CursorRuleTemplate = {
  id: 'svelte',
  name: 'Svelte',
  category: 'frontend',
  tags: ['svelte', 'frontend', 'javascript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'svelte-component-structure',
      title: 'Component Structure',
      optional: false,
      tags: ['svelte'],
      content: `- Use Svelte 5 runes ($state, $derived, $effect) for reactivity.
- Keep script, template, and style sections in each .svelte file.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variable and function names.
- Keep components focused on a single responsibility.
- Extract reusable logic into .svelte.js modules.`,
    },
    {
      id: 'svelte-reactivity',
      title: 'Reactivity & State',
      optional: false,
      tags: ['svelte'],
      content: `- Use $state() for reactive local state.
- Use $derived() for computed values — no manual invalidation.
- Use $effect() for side effects with automatic cleanup.
- Use $props() for component props with destructuring.
- Use $bindable() for two-way bindable props.
- Avoid overusing stores — prefer runes for local state.`,
    },
    {
      id: 'svelte-styling',
      title: 'Styling & Scoped CSS',
      optional: false,
      tags: ['svelte'],
      content: `- Use scoped <style> blocks in .svelte files.
- Use CSS custom properties for theme values.
- Use :global() modifier sparingly and only when necessary.
- Use class:directive for conditional classes.
- Prefer Tailwind CSS for utility-first styling when using SvelteKit.
- Keep styles co-located with components.`,
    },
    {
      id: 'svelte-routing',
      title: 'Routing (SvelteKit)',
      optional: true,
      tags: ['svelte', 'sveltekit'],
      content: `- Use file-based routing with +page.svelte and +layout.svelte.
- Use +page.server.ts for server-side data loading.
- Use +server.ts for API route handlers.
- Use form actions for mutations with progressive enhancement.
- Use preload functions for data dependencies.
- Handle errors with +error.svelte per route segment.`,
    },
  ],
};
