// lib/templates/nuxt.ts
// Nuxt 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const nuxtTemplate: CursorRuleTemplate = {
  id: 'nuxt',
  name: 'Nuxt',
  category: 'fullstack',
  tags: ['nuxt', 'vue', 'fullstack', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'nuxt-auto-imports',
      title: 'Auto-Imports & Conventions',
      optional: false,
      tags: ['nuxt'],
      content: `- Leverage Nuxt auto-imports: no manual imports for composables/components.
- Use useAsyncData() and useFetch() for data fetching.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for composable and function names.
- Place composables in composables/ directory for auto-import.
- Use auto-imported ref(), computed(), watch() from Vue.`,
    },
    {
      id: 'nuxt-pages-routing',
      title: 'Pages & Routing',
      optional: false,
      tags: ['nuxt'],
      content: `- Use file-based routing under pages/ directory.
- Use [param].vue for dynamic routes.
- Use [...slug].vue for catch-all routes.
- Use definePageMeta() for per-page configuration (layout, middleware, auth).
- Use navigateTo() for programmatic navigation.
- Use middleware/ directory for route-level middleware with named exports.`,
    },
    {
      id: 'nuxt-server',
      title: 'Server & API Routes',
      optional: false,
      tags: ['nuxt'],
      content: `- Use server/api/ for API endpoints with defineEventHandler().
- Use server/middleware/ for server-level middleware.
- Use useRuntimeConfig() for environment variables and public config.
- Use server routes with proper HTTP method handling (getMethod(), readBody()).
- Use server/utils/ for shared server utilities.
- Prefer Nitro storage (useStorage()) for KV and file storage.`,
    },
    {
      id: 'nuxt-ssr-rendering',
      title: 'SSR & Rendering Modes',
      optional: false,
      tags: ['nuxt'],
      content: `- Use hybrid rendering: configure ssr per route with routeRules.
- Use <ClientOnly> for components that must not SSR.
- Use useHead() for per-page SEO meta and head management.
- Use useSeoMeta() for type-safe SEO configuration.
- Use server components (.server.vue) for server-only rendering.
- Use lazy loading with Lazy prefix for dynamic imports.`,
    },
  ],
};
