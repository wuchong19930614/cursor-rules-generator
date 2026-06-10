// lib/templates/react.ts
// React 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const reactTemplate: CursorRuleTemplate = {
  id: 'react',
  name: 'React',
  category: 'frontend',
  tags: ['react', 'frontend', 'javascript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'react-project-structure',
      title: 'Project Structure',
      optional: false,
      tags: ['react'],
      content: `- Organize components by feature, not by file type.
- Use {{INDENT}} spaces for indentation.
- Group related components in a shared directory.
- Keep components small and focused on a single responsibility.
- Use PascalCase for component filenames and component names.`,
    },
    {
      id: 'react-component-patterns',
      title: 'Component Patterns',
      optional: false,
      tags: ['react'],
      content: `- Prefer functional components with hooks over class components.
- Use React.memo for performance optimization when needed.
- Extract reusable logic into custom hooks.
- Keep JSX readable: break complex expressions into variables.
- Use TypeScript for type safety.
- Always define prop types or interfaces for components.`,
    },
    {
      id: 'react-state-management',
      title: 'State Management',
      optional: false,
      tags: ['react'],
      content: `- Use useState for local component state.
- Use useContext + useReducer for shared state.
- Lift state up only when necessary.
- Avoid prop drilling by using composition or context.
- Use useCallback/useMemo sparingly — only when profiling shows a need.
- Prefer controlled components for form inputs.`,
    },
    {
      id: 'react-effects',
      title: 'Side Effects & Effects',
      optional: false,
      tags: ['react'],
      content: `- Use useEffect for side effects like data fetching.
- Always provide cleanup functions for subscriptions.
- Use the dependency array correctly: include all referenced values.
- Avoid useEffect for derived state: compute values during render instead.
- Use AbortController for fetch cleanup.`,
    },
  ],
};
