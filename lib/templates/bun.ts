// lib/templates/bun.ts
// Bun 模板 — ≥3 sections，高性能 JavaScript 运行时最佳实践

import type { CursorRuleTemplate } from './types';

export const bunTemplate: CursorRuleTemplate = {
  id: 'bun',
  name: 'Bun',
  category: 'backend',
  tags: ['bun', 'javascript', 'runtime'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'bun-runtime',
      title: 'Bun Runtime Features',
      optional: false,
      tags: ['bun'],
      content: `- Use Bun's built-in APIs: Bun.file(), Bun.write(), Bun.serve() instead of Node.js equivalents.
- Use Bun's native TypeScript support — no need for ts-node or separate compilation step.
- Use Bun's built-in test runner (bun test) instead of Jest or Vitest for new projects.
- Use Bun's native SQLite client (bun:sqlite) for embedded database needs.
- Use Bun's built-in environment variable support via Bun.env instead of process.env.
- Use Bun.password for password hashing and Bun.randomUUIDv7 for unique IDs.
- Leverage Bun's fetch() built-in — no need for node-fetch or axios for HTTP.`,
    },
    {
      id: 'bun-performance',
      title: 'Performance Patterns',
      optional: false,
      tags: ['bun'],
      content: `- Use Bun's native file I/O (Bun.file, Bun.write) which is significantly faster than Node.js fs.
- Use Bun.spawn() for subprocess management — faster and simpler than child_process.
- Prefer Bun.serve() over Express or other Node HTTP frameworks for maximum throughput.
- Use Bun's built-in WebSocket support for real-time applications.
- Avoid blocking the event loop — use async/await and Bun's Promise-based APIs.
- Use Bun's bundler (Bun.build) for production builds with tree-shaking and minification.
- Leverage Bun's transpiler for JSX/TSX without additional Babel or TypeScript config.`,
    },
    {
      id: 'bun-project-structure',
      title: 'Project Structure & Configuration',
      optional: false,
      tags: ['bun'],
      content: `- Use bunfig.toml for project-level Bun configuration (install settings, lockfile path).
- Use bun.lockb as the lockfile — commit it to version control for reproducible installs.
- Use {{INDENT}} spaces for indentation in .ts/.tsx files.
- Use {{NAMING}} for variables and functions.
- Use {{QUOTES}} quotes for strings.
- Use ESM imports/exports — Bun is ESM-first.
- Organize code by feature: src/features/<feature>/ with index.ts barrel exports.
- Use bun add for package installation and bun remove for removal.`,
    },
    {
      id: 'bun-testing',
      title: 'Testing with Bun',
      optional: true,
      tags: ['bun'],
      content: `- Use describe/it/test blocks from bun:test for structuring tests.
- Use expect() assertions — Bun includes a Jest-compatible expect API.
- Use mock.module() and mock() for mocking dependencies.
- Use beforeEach/afterEach hooks for test setup and teardown.
- Run tests with bun test — it auto-discovers *.test.ts and *.spec.ts files.
- Use --coverage flag to generate code coverage reports.
- Use --timeout to set per-test timeout for async operations.`,
    },
  ],
};
