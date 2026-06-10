// lib/templates/angular.ts
// Angular 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const angularTemplate: CursorRuleTemplate = {
  id: 'angular',
  name: 'Angular',
  category: 'frontend',
  tags: ['angular', 'frontend', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: true,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'angular-component-architecture',
      title: 'Component Architecture',
      optional: false,
      tags: ['angular'],
      content: `- Use standalone components by default (no NgModules).
- Use the new control flow syntax (@if, @for, @switch).
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for property and method names.
- Keep components small and focused on presentation logic.
- Delegate business logic to services.`,
    },
    {
      id: 'angular-services-di',
      title: 'Services & Dependency Injection',
      optional: false,
      tags: ['angular'],
      content: `- Use providedIn: 'root' for singleton services.
- Use inject() function instead of constructor injection.
- Keep services focused on a single concern.
- Use signals (signal(), computed(), effect()) for reactive state.
- Use HttpClient with typed response generics.
- Use interceptors for cross-cutting concerns (auth, logging, error handling).`,
    },
    {
      id: 'angular-routing',
      title: 'Routing & Navigation',
      optional: false,
      tags: ['angular'],
      content: `- Use lazy loading with loadComponent for route-level code splitting.
- Use routerLink for internal navigation.
- Use route resolvers for pre-fetching data.
- Use route guards (canActivate, canDeactivate) for access control.
- Use withComponentInputBinding() for route params as component inputs.
- Define routes in a dedicated routes.ts file per feature module.`,
    },
    {
      id: 'angular-forms',
      title: 'Forms & Validation',
      optional: false,
      tags: ['angular'],
      content: `- Use Reactive Forms for complex forms with dynamic validation.
- Use Template-driven Forms for simple forms.
- Use FormBuilder to create form groups concisely.
- Implement custom validators as standalone functions.
- Use async validators for server-side validation.
- Provide clear error messages with form control state tracking.`,
    },
  ],
};
