// lib/templates/astro.ts
// Astro 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const astroTemplate: CursorRuleTemplate = {
  id: 'astro',
  name: 'Astro',
  category: 'frontend',
  tags: ['astro', 'frontend', 'javascript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'astro-component-model',
      title: 'Component Model',
      optional: false,
      tags: ['astro'],
      content: `- Use .astro files for static/server-rendered components.
- Use framework components (React, Vue, Svelte) only for interactive islands.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variable and function names.
- Keep component scripts (--- fences) server-side only.
- Use client:* directives only when client interactivity is needed.`,
    },
    {
      id: 'astro-content-collections',
      title: 'Content & Data',
      optional: false,
      tags: ['astro'],
      content: `- Use Content Collections for type-safe markdown/MDX content.
- Define collection schemas with Zod in src/content/config.ts.
- Use getCollection() for fetching content with filtering and sorting.
- Use getEntry() for single content items.
- Use Astro.glob() for non-collection file imports.
- Prefer static generation with getStaticPaths() for content pages.`,
    },
    {
      id: 'astro-performance',
      title: 'Performance & Islands',
      optional: false,
      tags: ['astro'],
      content: `- Ship zero JavaScript by default — add only where needed.
- Use client:load for immediately interactive components.
- Use client:idle for deferring to browser idle time.
- Use client:visible for lazy-loaded interactive components.
- Use client:media for media-query-driven hydration.
- Use client:only when a component must skip SSR entirely.`,
    },
    {
      id: 'astro-routing',
      title: 'Routing & Pages',
      optional: false,
      tags: ['astro'],
      content: `- Use file-based routing under src/pages/.
- Use [...slug].astro for dynamic routes.
- Use Astro.props to access page props.
- Use Astro.url for URL information in server context.
- Use Astro.redirect() for server-side redirects.
- Use middleware (src/middleware.ts) for request interception.`,
    },
  ],
};
