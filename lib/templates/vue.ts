// lib/templates/vue.ts
// Vue.js 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const vueTemplate: CursorRuleTemplate = {
  id: 'vue',
  name: 'Vue.js',
  category: 'frontend',
  tags: ['vue', 'frontend', 'javascript'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'vue-project-structure',
      title: 'Project Structure',
      optional: false,
      tags: ['vue'],
      content: `- Use the Composition API with <script setup> syntax.
- Organize components by feature, not by file type.
- Use {{INDENT}} spaces for indentation.
- Use {{NAMING}} for component names.
- Keep Single-File Components (SFCs) focused and small.
- Group related composables in a composables/ directory.`,
    },
    {
      id: 'vue-component-patterns',
      title: 'Component Patterns',
      optional: false,
      tags: ['vue'],
      content: `- Use defineProps with TypeScript generics for type safety.
- Use defineEmits for event declarations.
- Extract reusable logic into composables (useXxx convention).
- Use provide/inject for deep component communication.
- Prefer v-model for two-way binding on form components.
- Use defineExpose sparingly — prefer props and emits.`,
    },
    {
      id: 'vue-reactivity',
      title: 'Reactivity',
      optional: false,
      tags: ['vue'],
      content: `- Use ref() for primitive values and reactive() for objects.
- Use computed() for derived state.
- Use watch() or watchEffect() for side effects with cleanup.
- Use shallowRef/shallowReactive for large datasets.
- Avoid mutating props directly — use emits or v-model.
- Use toRefs() when destructuring reactive objects.`,
    },
    {
      id: 'vue-routing',
      title: 'Routing',
      optional: false,
      tags: ['vue'],
      content: `- Use Vue Router 4 with composition API.
- Define routes with lazy loading for code splitting.
- Use route params and query with useRoute().
- Use navigation guards (beforeEach) for auth and redirects.
- Use RouterLink for internal navigation.
- Use named routes for maintainable navigation.`,
    },
  ],
};
