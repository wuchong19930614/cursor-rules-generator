// lib/templates/prisma.ts
// Prisma 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const prismaTemplate: CursorRuleTemplate = {
  id: 'prisma',
  name: 'Prisma',
  category: 'backend',
  tags: ['prisma', 'database', 'backend', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'double',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'prisma-schema-design',
      title: 'Schema Design',
      optional: false,
      tags: ['prisma'],
      content: `- Use singular model names (User, not Users).
- Use {{NAMING}} for model field names.
- Use @@map and @map for consistent database naming when needed.
- Define explicit relation fields on both sides for bidirectional relations.
- Use enums for fixed sets of values.
- Use @@index and @@unique for performance and data integrity.`,
    },
    {
      id: 'prisma-queries',
      title: 'Query Patterns',
      optional: false,
      tags: ['prisma'],
      content: `- Use include for eager loading related records.
- Use select for partial object queries to minimize data transfer.
- Use where with typed filter conditions.
- Use pagination with take, skip, and cursor for large datasets.
- Use transactions ($transaction) for atomic multi-operation writes.
- Use interactive transactions for dependent operations.`,
    },
    {
      id: 'prisma-migrations',
      title: 'Migrations',
      optional: false,
      tags: ['prisma'],
      content: `- Use prisma migrate dev for development migrations.
- Use prisma migrate deploy for production deployments.
- Always review migration SQL before applying in production.
- Use prisma migrate reset for development database resets.
- Use seed files for reproducible test and development data.
- Keep migrations small and focused — one logical change per migration.`,
    },
    {
      id: 'prisma-middleware',
      title: 'Middleware & Extensions',
      optional: true,
      tags: ['prisma', 'backend'],
      content: `- Use Prisma middleware for cross-cutting concerns (logging, soft delete).
- Use client extensions ($extends) for computed fields and custom methods.
- Implement soft delete with middleware that filters deleted records.
- Add timestamp middleware for automatic createdAt/updatedAt tracking.
- Use result extensions for computed properties like fullName.
- Keep middleware focused and test each middleware independently.`,
    },
  ],
};
