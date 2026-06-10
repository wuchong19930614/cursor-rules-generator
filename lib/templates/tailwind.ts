// lib/templates/tailwind.ts
// Tailwind CSS 模板 — ≥3 sections，含 tags、category、style defaults

import type { CursorRuleTemplate } from './types';

export const tailwindTemplate: CursorRuleTemplate = {
  id: 'tailwind',
  name: 'Tailwind CSS',
  category: 'frontend',
  tags: ['tailwind', 'css', 'frontend'],
  defaults: {
    indentSize: 2,
    useTabs: false,
    quotes: 'single',
    semicolons: false,
    namingConvention: 'camelCase',
  },
  sections: [
    {
      id: 'tailwind-utility-first',
      title: 'Utility-First Principles',
      optional: false,
      tags: ['tailwind'],
      content: `- Use Tailwind utility classes directly in JSX/HTML — no separate CSS files.
- Use {{INDENT}} spaces for indentation.
- Avoid @apply — prefer composing components or repeating utilities.
- Use the class-variance-authority (CVA) pattern for component variants.
- Use clsx or cn() utility for conditional class merging.
- Extract repeated patterns into components, not CSS abstractions.`,
    },
    {
      id: 'tailwind-responsive',
      title: 'Responsive Design',
      optional: false,
      tags: ['tailwind'],
      content: `- Use mobile-first responsive prefixes (sm:, md:, lg:, xl:, 2xl:).
- Design for the smallest screen first, then add breakpoints for larger.
- Use container with mx-auto for centered content widths.
- Use flexbox (flex, grid) for layouts — avoid float and position hacks.
- Use hidden/md:block pattern for responsive visibility.
- Test layouts at all defined breakpoints.`,
    },
    {
      id: 'tailwind-theming',
      title: 'Theming & Customization',
      optional: false,
      tags: ['tailwind'],
      content: `- Extend the default theme in tailwind.config.ts — don't override.
- Use CSS custom properties for dynamic theme values.
- Use dark: prefix for dark mode variants.
- Define design tokens (colors, spacing, fonts) in the extend section.
- Use arbitrary values [value] sparingly — prefer predefined tokens.
- Group related colors with numeric scale (primary-50 through primary-950).`,
    },
    {
      id: 'tailwind-performance',
      title: 'Performance',
      optional: false,
      tags: ['tailwind'],
      content: `- Use the content paths in tailwind.config.ts to limit the CSS bundle.
- Use @layer base/components/utilities for custom styles.
- Avoid dynamic class construction — Tailwind needs complete class names at build time.
- Use safelist only when absolutely necessary.
- Use JIT mode (default in Tailwind v3+) for on-demand generation.
- Purge unused styles with purge options in production builds.`,
    },
  ],
};
