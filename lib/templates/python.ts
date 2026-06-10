// lib/templates/python.ts
// Python 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const pythonTemplate: CursorRuleTemplate = {
  id: 'python',
  name: 'Python',
  category: 'backend',
  tags: ['python', 'backend', 'data-science'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'snake_case',
  },
  sections: [
    {
      id: 'python-style',
      title: 'Code Style',
      optional: false,
      tags: ['python'],
      content: `- Follow PEP 8 conventions.
- Use {{INDENT}} spaces for indentation (no tabs).
- Use {{QUOTE}} quotes for strings consistently.
- Maximum line length: 88 characters (Black default).
- Use {{NAMING}} for variables, functions, and methods.
- Use PascalCase for class names.`,
    },
    {
      id: 'python-typing',
      title: 'Type Hints',
      optional: false,
      tags: ['python'],
      content: `- Use type hints for all function signatures.
- Use Optional[T] instead of T | None for Python < 3.10 compatibility.
- Use collections.abc types for interfaces (Iterable, Sequence, Mapping).
- Use typing.TypedDict for structured dictionaries.
- Use dataclasses for data containers.
- Use Protocol for duck-typing interfaces.`,
    },
    {
      id: 'python-project-structure',
      title: 'Project Structure',
      optional: false,
      tags: ['python'],
      content: `- Use src-layout: put source code under src/ directory.
- Use pyproject.toml for project configuration.
- Separate tests in a tests/ directory mirroring the source tree.
- Use __init__.py files (even if empty) for explicit package boundaries.
- Use relative imports within packages where appropriate.
- Keep modules focused and under 500 lines.`,
    },
    {
      id: 'python-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['python'],
      content: `- Use specific exception types — never use bare except.
- Create custom exception classes inheriting from Exception.
- Use contextlib.suppress for expected errors.
- Use try/finally or context managers for resource cleanup.
- Use logging instead of print for production code.
- Include traceback information when logging errors.`,
    },
  ],
};
