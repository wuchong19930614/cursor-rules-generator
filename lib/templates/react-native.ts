// lib/templates/react-native.ts
// React Native 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const reactNativeTemplate: CursorRuleTemplate = {
  id: 'react-native',
  name: 'React Native',
  category: 'mobile',
  tags: ['react-native', 'react', 'mobile', 'typescript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'rn-component-structure',
      title: 'Component Structure',
      optional: false,
      tags: ['react-native'],
      content: `- Use functional components with hooks.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for variables and functions.
- Use StyleSheet.create() for static styles.
- Keep platform-specific code isolated with Platform.OS checks.
- Use .native.tsx and .web.tsx extensions for platform-specific files.`,
    },
    {
      id: 'rn-performance',
      title: 'Performance',
      optional: false,
      tags: ['react-native'],
      content: `- Use FlatList instead of ScrollView for long lists.
- Implement getItemLayout for fixed-height list items.
- Use React.memo and useCallback for expensive re-renders.
- Use InteractionManager for heavy operations after animations.
- Optimize images: use proper dimensions and caching.
- Use Hermes engine for better startup performance.`,
    },
    {
      id: 'rn-navigation',
      title: 'Navigation',
      optional: false,
      tags: ['react-native'],
      content: `- Use React Navigation for screen-based navigation.
- Use Stack Navigator for push/pop navigation flows.
- Use Tab Navigator for bottom tab navigation.
- Use type-safe navigation with TypeScript generics.
- Pass minimal data through route params — use context or state management.
- Handle deep linking with linking configuration.`,
    },
    {
      id: 'rn-state-management',
      title: 'State Management',
      optional: false,
      tags: ['react-native'],
      content: `- Use React Context for simple shared state.
- Use Zustand or Redux Toolkit for complex global state.
- Use React Query (TanStack Query) for server state.
- Use MMKV for fast local key-value storage.
- Persist important state with AsyncStorage or MMKV.
- Handle app state changes (foreground/background) with AppState API.`,
    },
  ],
};
