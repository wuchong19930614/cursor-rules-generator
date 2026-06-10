// lib/templates/flask.ts
// Flask 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const flaskTemplate: CursorRuleTemplate = {
  id: 'flask',
  name: 'Flask',
  category: 'backend',
  tags: ['flask', 'python', 'backend'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'snake_case',
  },
  sections: [
    {
      id: 'flask-app-factory',
      title: 'Application Factory',
      optional: false,
      tags: ['flask'],
      content: `- Use the application factory pattern (create_app()).
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variables and functions.
- Use Blueprints for modular route organization.
- Register extensions in create_app() with init_app() pattern.
- Use app.config.from_object() and from_envvar() for configuration.`,
    },
    {
      id: 'flask-routes',
      title: 'Routes & Views',
      optional: false,
      tags: ['flask'],
      content: `- Use @bp.route() decorators within Blueprints.
- Use type hints for route parameters (<int:id>, <uuid:id>).
- Use request.get_json() for JSON request bodies.
- Return proper HTTP status codes for all responses.
- Use jsonify() or return dictionaries for JSON responses.
- Use url_for() for generating URLs — never hardcode paths.`,
    },
    {
      id: 'flask-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['flask'],
      content: `- Use @bp.errorhandler() for route-level error handling.
- Use @app.errorhandler() for application-level error handlers.
- Define custom exception classes with appropriate HTTP status codes.
- Use abort() with status codes for expected error scenarios.
- Log errors with traceback information in production.
- Return structured JSON error responses for API endpoints.`,
    },
    {
      id: 'flask-database',
      title: 'Database & ORM',
      optional: false,
      tags: ['flask'],
      content: `- Use SQLAlchemy with Flask-SQLAlchemy extension.
- Define models with explicit column types and constraints.
- Use db.session for transaction management.
- Use Alembic for database migrations (Flask-Migrate).
- Use lazy loading for relationships — eager load with joinedload() when needed.
- Use connection pooling with appropriate pool_size and max_overflow.`,
    },
  ],
};
