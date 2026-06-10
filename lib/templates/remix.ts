// lib/templates/remix.ts
// Remix 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const remixTemplate: CursorRuleTemplate = {
  id: 'remix',
  name: 'Remix',
  category: 'fullstack',
  tags: ['remix', 'react', 'fullstack', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'remix-routing',
      title: 'Routing & Data Loading',
      optional: false,
      tags: ['remix'],
      content: `- Use file-based routing with flat route convention.
- Use loader() for server-side data fetching on every route.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for function and variable names.
- Return typed JSON responses from loaders.
- Use useLoaderData() for type-safe access to loader data.`,
    },
    {
      id: 'remix-forms-actions',
      title: 'Forms & Actions',
      optional: false,
      tags: ['remix'],
      content: `- Use <Form> component for all mutations (no client-side fetch).
- Use action() functions for form submissions.
- Use useActionData() for validation errors and feedback.
- Use useNavigation() to show loading states during form submissions.
- Implement progressive enhancement with vanilla HTML forms.
- Use useFetcher() for non-navigation mutations.`,
    },
    {
      id: 'remix-error-handling',
      title: 'Error & Boundary Handling',
      optional: false,
      tags: ['remix'],
      content: `- Use ErrorBoundary exports for route-level error UI.
- Catch errors in loaders and actions with structured error responses.
- Use useRouteError() to access error details in error boundaries.
- Provide user-friendly error messages — never expose stack traces.
- Use isRouteErrorResponse() to distinguish route errors from unexpected errors.
- Log errors server-side with proper context.`,
    },
    {
      id: 'remix-sessions',
      title: 'Sessions & Cookies',
      optional: true,
      tags: ['remix', 'backend'],
      content: `- Use createCookieSessionStorage for session management.
- Store session data server-side — keep cookies small.
- Use flash messages for one-time notifications after redirects.
- Set proper cookie security attributes (HttpOnly, Secure, SameSite).
- Use commitSession() and destroySession() for session lifecycle.
- Implement CSRF protection for mutation endpoints.`,
    },
  ],
};
