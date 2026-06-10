// lib/templates/node.ts
// Node.js 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const nodeTemplate: CursorRuleTemplate = {
  id: 'node',
  name: 'Node.js',
  category: 'backend',
  tags: ['node', 'javascript', 'backend'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'node-project-structure',
      title: 'Project Structure',
      optional: false,
      tags: ['node'],
      content: `- Use ES modules ("type": "module" in package.json).
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variables and functions.
- Organize code by feature, not by file type.
- Use src/ for source code, tests/ for tests.
- Use barrel exports (index.js) for clean API surfaces.`,
    },
    {
      id: 'node-async',
      title: 'Async Patterns',
      optional: false,
      tags: ['node'],
      content: `- Use async/await over callbacks and raw promises.
- Use try/catch for error handling in async functions.
- Use Promise.all() for parallel independent operations.
- Use Promise.allSettled() when partial failures are acceptable.
- Avoid blocking the event loop — don't use sync file/network operations.
- Use AbortController for cancellable async operations.`,
    },
    {
      id: 'node-streams',
      title: 'Streams & Buffers',
      optional: false,
      tags: ['node'],
      content: `- Use streams for processing large data sets (pipeline pattern).
- Use stream.pipeline() or pipeline() from stream/promises.
- Use Transform streams for data transformation.
- Handle backpressure with proper stream consumption.
- Use Buffer for binary data — prefer Buffer.from() over new Buffer().
- Use Readable.from() for converting iterables to streams.`,
    },
    {
      id: 'node-security',
      title: 'Security',
      optional: false,
      tags: ['node'],
      content: `- Never use eval() or Function() with user input.
- Use helmet or equivalent for HTTP security headers.
- Use input validation libraries (zod, joi) for all user input.
- Use parameterized queries or ORM to prevent SQL injection.
- Use crypto.randomUUID() for generating unique IDs.
- Keep dependencies updated — run npm audit regularly.`,
    },
  ],
};
