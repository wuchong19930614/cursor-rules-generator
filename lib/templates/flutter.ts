// lib/templates/flutter.ts
// Flutter 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const flutterTemplate: CursorRuleTemplate = {
  id: 'flutter',
  name: 'Flutter',
  category: 'mobile',
  tags: ['flutter', 'dart', 'mobile'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'flutter-widget-structure',
      title: 'Widget Structure',
      optional: false,
      tags: ['flutter'],
      content: `- Use composition over inheritance — prefer StatelessWidget and StatefulWidget.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variables and methods.
- Extract reusable widgets into separate files.
- Use const constructors for compile-time constant widgets.
- Keep build methods clean — extract complex UI into helper methods.`,
    },
    {
      id: 'flutter-state-management',
      title: 'State Management',
      optional: false,
      tags: ['flutter'],
      content: `- Use setState for simple local state within a single widget.
- Use Provider or Riverpod for dependency injection and state propagation.
- Use Bloc/Cubit for complex business logic with event-driven patterns.
- Keep business logic out of widgets — use controllers or blocs.
- Use ValueNotifier and ValueListenableBuilder for single-value state.
- Avoid rebuilding the entire widget tree — use const and selective rebuilds.`,
    },
    {
      id: 'flutter-layout',
      title: 'Layout & Styling',
      optional: false,
      tags: ['flutter'],
      content: `- Use layout widgets (Row, Column, Stack, Expanded, Flexible).
- Use SizedBox and Spacer for spacing — avoid hardcoded padding.
- Use MediaQuery and LayoutBuilder for responsive layouts.
- Use Theme and ThemeData for consistent styling.
- Use Theme.of(context) to access theme values.
- Define text styles, colors, and spacing in a centralized theme.`,
    },
    {
      id: 'flutter-navigation',
      title: 'Navigation & Routing',
      optional: false,
      tags: ['flutter'],
      content: `- Use GoRouter for declarative routing with deep linking.
- Use Navigator 2.0 patterns for complex navigation.
- Pass arguments with typed route parameters.
- Use named routes for clarity and maintainability.
- Handle back navigation with proper state management.
- Use route guards for authentication flows.`,
    },
  ],
};
