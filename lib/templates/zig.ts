// lib/templates/zig.ts
// Zig 模板 — ≥3 sections，系统编程最佳实践

import type { CursorRuleTemplate } from './types';

export const zigTemplate: CursorRuleTemplate = {
  id: 'zig',
  name: 'Zig',
  category: 'backend',
  tags: ['zig', 'systems', 'compiled'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'zig-code-style',
      title: 'Code Style & Conventions',
      optional: false,
      tags: ['zig'],
      content: `- Use {{INDENT}} spaces for indentation — follow the official Zig style guide.
- Use snake_case for function names, variable names, and file names.
- Use PascalCase for type names (structs, enums, unions).
- Use descriptive variable names — avoid single-letter names except for loop indices.
- Use {{QUOTES}} quotes for string literals.
- Use const by default — only use var when mutability is required.
- Group imports: standard library first, then third-party, then local modules.`,
    },
    {
      id: 'zig-error-handling',
      title: 'Error Handling & Memory',
      optional: false,
      tags: ['zig'],
      content: `- Use explicit error unions (Error!T) for functions that can fail — never use unreachable for expected errors.
- Use try/catch for error propagation at the call site.
- Use errdefer for cleanup on error paths — it runs only when the enclosing scope exits with an error.
- Prefer stack allocation over heap allocation when possible.
- Use allocator.alloc() and allocator.free() for heap memory — always pair allocations with frees.
- Use defer for resource cleanup: defer allocator.free(buffer).
- Use ArenaAllocator for short-lived allocations, GeneralPurposeAllocator for general use.
- Use @intCast, @floatCast, @truncate for explicit numeric conversions — avoid implicit casts.`,
    },
    {
      id: 'zig-build-system',
      title: 'Build System & Project Structure',
      optional: false,
      tags: ['zig'],
      content: `- Use build.zig for project configuration — define executables, libraries, tests, and dependencies.
- Use build.zig.zon for package manager dependencies.
- Organize source in src/ with main.zig as the entry point.
- Use modules for logical grouping: pub const module_name = @import("module.zig").
- Use the Zig standard library (@import("std")) for cross-platform abstractions.
- Enable full optimizations in ReleaseSafe mode for production builds.
- Use ReleaseFast for maximum performance, ReleaseSmall for minimal binary size.
- Use Debug mode during development for safety checks and stack traces.`,
    },
    {
      id: 'zig-testing',
      title: 'Testing',
      optional: false,
      tags: ['zig'],
      content: `- Write tests inline with test blocks: test "description" { ... }.
- Use std.testing.expect(), expectEqual(), expectError() for assertions.
- Use std.testing.allocator for test allocations — it detects leaks automatically.
- Run tests with zig build test to execute all test blocks.
- Place tests close to the code they test — inline tests are idiomatic in Zig.
- Use std.testing.refAllDecls(@This()) to recursively test all declarations in a module.
- Test edge cases explicitly: null values, empty inputs, boundary conditions.`,
    },
  ],
};
