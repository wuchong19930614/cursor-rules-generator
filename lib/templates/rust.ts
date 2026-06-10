// lib/templates/rust.ts
// Rust 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const rustTemplate: CursorRuleTemplate = {
  id: 'rust',
  name: 'Rust',
  category: 'backend',
  tags: ['rust', 'backend', 'systems'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: true,
    namingConvention: 'snake_case',
  },
  sections: [
    {
      id: 'rust-ownership',
      title: 'Ownership & Borrowing',
      optional: false,
      tags: ['rust'],
      content: `- Prefer borrowing (&T, &mut T) over taking ownership when possible.
- Use {{NAMING}} for variables, functions, and methods.
- Use PascalCase for types, traits, and enums.
- Use SCREAMING_SNAKE_CASE for constants and statics.
- Clone only when ownership transfer is unavoidable.
- Use references with explicit lifetimes only when the compiler requires them.`,
    },
    {
      id: 'rust-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['rust'],
      content: `- Use Result<T, E> for fallible operations — no exceptions.
- Use the ? operator for error propagation.
- Use thiserror for custom error types with derive macros.
- Use anyhow for application-level error handling.
- Use Option<T> instead of null — never use unwrap() in production code.
- Use expect() with descriptive messages during development only.`,
    },
    {
      id: 'rust-modules',
      title: 'Modules & Crates',
      optional: false,
      tags: ['rust'],
      content: `- Use mod declarations to organize code into modules.
- Use pub to control visibility — keep internals private by default.
- Use use statements for imports at the top of each file.
- Use pub(crate) for internal visibility within the crate.
- Use workspace for multi-crate projects.
- Keep module files focused: one primary concern per module.`,
    },
    {
      id: 'rust-patterns',
      title: 'Idiomatic Patterns',
      optional: false,
      tags: ['rust'],
      content: `- Use match for exhaustive pattern matching.
- Use if let for single-pattern matching when fallback isn't needed.
- Use iterators (map, filter, collect) over explicit loops.
- Use derive macros (Debug, Clone, PartialEq) for boilerplate.
- Use impl Trait for return types when the concrete type is complex.
- Use trait bounds with where clauses for readability.`,
    },
  ],
};
