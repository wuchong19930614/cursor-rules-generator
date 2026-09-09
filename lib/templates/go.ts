// lib/templates/go.ts
// Go 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const goTemplate: CursorRuleTemplate = {
  id: 'go',
  name: 'Go',
  category: 'backend',
  tags: ['go', 'backend'],
  defaults: {
    indentSize: 0,
    useTabs: true,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'go-code-organization',
      title: 'Code Organization',
      optional: false,
      tags: ['go'],
      content: `- Keep small modules simple; use cmd/ for multiple commands and internal/ for private implementation packages when needed.
- Do not add pkg/ by default; follow the repository's existing package structure.
- Use {{NAMING}} for unexported identifiers.
- Use PascalCase for exported identifiers.
- One package per directory — avoid package sprawl.
- Keep packages focused and cohesive (single responsibility).
- Use internal/ for code that must not be imported externally.`,
    },
    {
      id: 'go-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['go'],
      content: `- Always handle errors explicitly — never ignore returned errors.
- Use if err != nil pattern consistently.
- Wrap errors with fmt.Errorf("context: %w", err) to preserve the chain.
- Use errors.Is() and errors.As() for error inspection.
- Define custom error types with Error() method.
- Return errors as the last return value.`,
    },
    {
      id: 'go-concurrency',
      title: 'Concurrency',
      optional: false,
      tags: ['go'],
      content: `- Use goroutines for concurrent operations — Go's primary concurrency primitive.
- Use channels for communication between goroutines.
- Use context.Context for cancellation and deadline propagation.
- Use sync.WaitGroup for waiting on goroutine completion.
- Use sync.Mutex or sync.RWMutex for shared state protection.
- Prefer channels over mutexes when communicating between goroutines.`,
    },
    {
      id: 'go-testing',
      title: 'Testing',
      optional: false,
      tags: ['go'],
      content: `- Use table-driven tests for comprehensive test coverage.
- Use subtests (t.Run) for organizing test cases.
- Use testify for assertions when readability benefits.
- Use test helpers with t.Helper() for better error reporting.
- Use t.TempDir() for automatically cleaned-up temporary test directories (Go 1.15+).
- Run tests with -race flag to detect data races.`,
    },
  ],
};
