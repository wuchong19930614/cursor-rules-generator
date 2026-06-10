// lib/templates/nextjs.ts
// Next.js 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const nextjsTemplate: CursorRuleTemplate = {
  id: 'nextjs',
  name: 'Next.js',
  category: 'frontend',
  tags: ['nextjs', 'react', 'frontend', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'next-routing',
      title: 'Routing & Pages',
      optional: false,
      tags: ['nextjs'],
      content: `- Use the App Router for all new pages.
- Place page components in app/ directory with page.{{NAMING}} naming.
- Use layout.tsx for shared layouts.
- Use loading.tsx for loading states (Suspense boundaries).
- Use error.tsx for error boundaries per route segment.
- Prefer server components by default; add 'use client' only when needed.`,
    },
    {
      id: 'next-data-fetching',
      title: 'Data Fetching',
      optional: false,
      tags: ['nextjs'],
      content: `- Fetch data in server components when possible.
- Use async/await in server components directly.
- Use route handlers (route.ts) for API endpoints.
- Use revalidate or generateStaticParams for static generation.
- Prefer fetch with next: { revalidate } for incremental static regeneration.
- Handle loading and error states in client components.`,
    },
    {
      id: 'next-optimization',
      title: 'Performance & Optimization',
      optional: false,
      tags: ['nextjs'],
      content: `- Use next/image for all images with explicit width/height.
- Use next/link for client-side navigation.
- Use next/font for font optimization.
- Implement dynamic imports with next/dynamic for heavy components.
- Use server actions for form mutations.
- Keep bundle size in check: analyze with @next/bundle-analyzer.`,
    },
    {
      id: 'next-typescript',
      title: 'TypeScript in Next.js',
      optional: true,
      tags: ['nextjs', 'typescript'],
      content: `- Use TypeScript for all pages, components, and utilities.
- Define proper types for page props (searchParams, params).
- Use the PageProps and LayoutProps types from Next.js.
- Type API route handlers with NextRequest and NextResponse.
- Use satisfies for route segment config validation.`,
    },
  ],
};
