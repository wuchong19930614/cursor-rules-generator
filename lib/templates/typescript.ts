// lib/templates/typescript.ts
// TypeScript 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const typescriptTemplate: CursorRuleTemplate = {
  id: 'typescript',
  name: 'TypeScript',
  category: 'library',
  tags: ['typescript', 'javascript', 'frontend', 'backend'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'ts-type-system',
      title: 'Type System',
      optional: false,
      tags: ['typescript'],
      content: `- Prefer interfaces over type aliases for object shapes.
- Use type aliases for unions, intersections, and mapped types.
- Enable strict mode in tsconfig.json.
- Avoid using any — use unknown and type guards instead.
- Use generics for reusable, type-safe patterns.
- Use satisfies for type validation without widening.`,
    },
    {
      id: 'ts-naming',
      title: 'Naming Conventions',
      optional: false,
      tags: ['typescript'],
      content: `- Use {{NAMING}} for variables and functions.
- Use PascalCase for types, interfaces, and enums.
- Use UPPER_CASE for constants.
- Prefix boolean variables with is/has/should.
- Use descriptive names — avoid single-letter variables except in loops.
- Suffix event handlers with Handler (e.g., onClickHandler).`,
    },
    {
      id: 'ts-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['typescript'],
      content: `- Use discriminated unions for error states (Result<T, E> pattern).
- Create custom error classes extending Error.
- Use type guards for narrowing error types in catch blocks.
- Avoid throwing non-Error values.
- Use try/catch only where errors are expected and recoverable.
- Log errors with context (message, stack, metadata).`,
    },
    {
      id: 'ts-module-organization',
      title: 'Module Organization',
      optional: true,
      tags: ['typescript'],
      content: `- Use barrel exports (index.ts) for clean imports.
- Prefer named exports over default exports for better tree-shaking.
- Keep files focused: one main concept per file.
- Use path aliases (@/components, @/lib) for clean imports.
- Organize by feature, not by type.
- Export types separately with 'export type' when needed.`,
    },
  ],
};
