// lib/templates/fastapi.ts
// FastAPI 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const fastapiTemplate: CursorRuleTemplate = {
  id: 'fastapi',
  name: 'FastAPI',
  category: 'backend',
  tags: ['fastapi', 'python', 'backend'],
  defaults: {
    indentSize: 4,
    useTabs: false,
    quotes: 'double',
    semicolons: false,
    namingConvention: 'snake_case',
  },
  sections: [
    {
      id: 'fastapi-routes',
      title: 'Routes & Endpoints',
      optional: false,
      tags: ['fastapi'],
      content: `- Use path operation decorators (@app.get, @app.post, etc.).
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for route handler functions.
- Use Pydantic models for request bodies and query parameters.
- Use path parameters with type hints for automatic validation.
- Use APIRouter for modular route organization with prefix and tags.`,
    },
    {
      id: 'fastapi-validation',
      title: 'Validation & Schemas',
      optional: false,
      tags: ['fastapi'],
      content: `- Use Pydantic v2 models for all request/response schemas.
- Use Field() with validation constraints (min_length, gt, pattern, etc.).
- Define separate schemas for input (BaseModel) and output (Response model).
- Use response_model parameter for automatic response serialization.
- Use Annotated types with Query(), Path(), Body(), Header().
- Use model_validator for cross-field validation logic.`,
    },
    {
      id: 'fastapi-deps',
      title: 'Dependency Injection',
      optional: false,
      tags: ['fastapi'],
      content: `- Use Depends() for reusable dependencies (DB sessions, auth, config).
- Use generator-based dependencies with yield for resource cleanup.
- Use dependency overrides for testing.
- Use sub-dependencies — dependencies that depend on other dependencies.
- Keep dependencies focused on a single concern.
- Use class-based dependencies via __call__ for stateful dependencies.`,
    },
    {
      id: 'fastapi-error-handling',
      title: 'Error Handling',
      optional: false,
      tags: ['fastapi'],
      content: `- Use HTTPException for standard HTTP error responses.
- Define custom exception handlers with @app.exception_handler().
- Use status_code constants from fastapi.status.
- Return structured error responses with detail and optional headers.
- Use background tasks (BackgroundTasks) for non-critical side effects.
- Log exceptions with traceback in exception handlers.`,
    },
  ],
};
