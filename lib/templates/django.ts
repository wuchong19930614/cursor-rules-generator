// lib/templates/django.ts
// Django 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const djangoTemplate: CursorRuleTemplate = {
  id: 'django',
  name: 'Django',
  category: 'backend',
  tags: ['django', 'python', 'backend', 'fullstack'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'snake_case',
  },
  sections: [
    {
      id: 'django-project-structure',
      title: 'Project Structure',
      optional: false,
      tags: ['django'],
      content: `- Follow Django's app-based modular structure.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variables, functions, and methods.
- Keep business logic in models, managers, and services — not in views.
- Use class-based views for common patterns, function-based for simple ones.
- Organize templates by app under templates/<app_name>/.`,
    },
    {
      id: 'django-models',
      title: 'Models & ORM',
      optional: false,
      tags: ['django'],
      content: `- Define models with explicit field types and constraints.
- Use Meta class for ordering, indexes, and constraints.
- Use related_name explicitly for ForeignKey and ManyToManyField.
- Use model managers for reusable queryset logic.
- Use select_related() and prefetch_related() to avoid N+1 queries.
- Use migrations for all schema changes — never alter tables manually.`,
    },
    {
      id: 'django-views',
      title: 'Views & APIs',
      optional: false,
      tags: ['django'],
      content: `- Use Django REST Framework for API endpoints.
- Use ModelSerializer for CRUD serializers.
- Use ViewSets with routers for standard REST patterns.
- Use permission_classes for access control on every endpoint.
- Use @action decorator for custom non-CRUD endpoints.
- Use pagination for list endpoints with reasonable defaults.`,
    },
    {
      id: 'django-testing',
      title: 'Testing',
      optional: false,
      tags: ['django'],
      content: `- Use pytest-django for test discovery and fixtures.
- Use Django's TestCase or APITestCase for integration tests.
- Use factory_boy or model_bakery for test data generation.
- Test models, views, and serializers independently.
- Use transactional tests (TestCase wraps in a transaction).
- Mock external services — don't hit real APIs in tests.`,
    },
  ],
};
