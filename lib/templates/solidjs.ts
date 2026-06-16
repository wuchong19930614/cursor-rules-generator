// lib/templates/solidjs.ts
// SolidJS 模板 — ≥3 sections，响应式 UI 框架最佳实践

import type { CursorRuleTemplate } from './types';

export const solidjsTemplate: CursorRuleTemplate = {
  id: 'solidjs',
  name: 'SolidJS',
  category: 'frontend',
  tags: ['solidjs', 'javascript', 'reactivity'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'solidjs-reactivity',
      title: 'Reactivity Model',
      optional: false,
      tags: ['solidjs'],
      content: `- Use createSignal() for reactive state — signals auto-track in reactive contexts.
- Use createEffect() for side effects that depend on reactive state — it auto-subscribes.
- Use createMemo() for derived values that should be cached and only recompute when dependencies change.
- Use createResource() for async data fetching with built-in Suspense integration.
- Never destructure props — use props.propertyName directly to preserve reactivity.
- Use splitProps() when you need to separate props into groups while maintaining reactivity.
- Remember that components run ONCE — the function body is not reactive; use JSX bindings for updates.`,
    },
    {
      id: 'solidjs-components',
      title: 'Component Patterns',
      optional: false,
      tags: ['solidjs'],
      content: `- Use {{NAMING}} for function and variable names, PascalCase for component names.
- Use {{INDENT}} spaces for indentation.
- Use {{QUOTES}} quotes for strings.
- Use function declarations for components: export default function MyComponent(props) { ... }.
- Use <Show>, <For>, <Switch>/<Match>, and <Index> control flow components instead of JavaScript operators.
- Use <Show when={condition}> instead of {condition && <div>} for conditional rendering.
- Use <For each={list}> for list rendering with efficient keyed updates.
- Keep components focused — extract reusable logic into custom primitives (create* functions).
- Use children prop for slot-like content — it's a function in SolidJS: props.children.`,
    },
    {
      id: 'solidjs-state-management',
      title: 'State Management',
      optional: false,
      tags: ['solidjs'],
      content: `- Use createStore() for nested reactive objects and arrays — it provides fine-grained reactivity.
- Use produce() from solid-js/store for immutable-style updates to stores.
- Use createContext() and useContext() for dependency injection across the component tree.
- Keep state as close to where it's used as possible — lift only when needed.
- For global state, create a store in a separate file and export it, or use SolidJS Context.
- Use batch() to group multiple state updates into a single reactive notification.
- Use onCleanup() for cleanup in effects and lifecycle — it prevents memory leaks.`,
    },
    {
      id: 'solidjs-routing',
      title: 'Routing & SSR',
      optional: true,
      tags: ['solidjs'],
      content: `- Use @solidjs/router for client-side routing with <Router>, <Route>, and <A>.
- Use createAsync() or resource-based data loading for route data.
- Use <Suspense> for loading states during async data fetching.
- Use SolidStart for full-stack applications with SSR, file-based routing, and API routes.
- Use server$() in SolidStart to define server-only functions callable from the client.
- Use useLocation() and useNavigate() for programmatic navigation.
- Use <HttpStatusCode> and <HttpHeader> in SolidStart for SEO-friendly SSR responses.`,
    },
  ],
};
