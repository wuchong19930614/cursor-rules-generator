// lib/templates/editorial/react.ts
// React 模板页人工撰写内容 —— 作为首批 editorial 的质量范例

import type { TemplateEditorial } from './types';

export const reactEditorial: TemplateEditorial = {
  slug: 'react',
  lastUpdated: '2026-07-03',
  intro: [
    'Cursor is remarkably good at writing React — and remarkably confident when it writes React badly. Left unguided, it will reach for patterns that were idiomatic in 2020: class components in older codebases it half-remembers, useEffect chains for data fetching, prop drilling where a context or a custom hook belongs. A React rules file is how you pin Cursor to the way React is actually written today.',
    'The rules below encode the conventions that keep AI-generated React maintainable: feature-based file organization, functional components with hooks, and state that lives at the right distance from the components that read it. Copy them as-is, or open the generator to adjust style details like quotes and semicolons before downloading.',
  ],
  designNotes: [
    {
      heading: 'Why the rules ban useEffect for data fetching',
      paragraphs: [
        'The single most common failure mode of AI-generated React is the useEffect-plus-useState fetch: no request cancellation, no cache, a loading flag that goes stale on unmount, and a dependency array that either over-fires or silently under-fires. The React team itself now steers developers away from effects for data loading.',
        'Telling Cursor to route data fetching through your query layer (React Query, SWR, or a framework loader) eliminates the whole bug class at generation time instead of in code review. If your project genuinely needs a raw effect — subscribing to a browser API, syncing with a non-React widget — the rule still allows it; it targets data fetching specifically.',
      ],
    },
    {
      heading: 'Hooks rules exist because Cursor cannot see your render tree',
      paragraphs: [
        'Cursor reasons file-by-file. It does not know that the component it is editing re-renders forty times a second because of a parent, which is why unguided suggestions sprinkle React.memo and useCallback everywhere or nowhere. The template takes a position: extract reusable logic into custom hooks, memoize only at measured hot spots, and keep effects small enough that their dependency arrays stay honest.',
        'The dependency-array rule matters more than it looks. When Cursor generates an effect with a missing dependency, the bug ships silently — nothing crashes, the UI just goes subtly stale. Making "exhaustive deps, no eslint-disable" an explicit rule means Cursor restructures the code instead of suppressing the linter.',
      ],
    },
    {
      heading: 'Feature folders over type folders',
      paragraphs: [
        'The template organizes code by feature (a folder owns its components, hooks, and tests) rather than by file type (a global components/ bucket). For AI-assisted work this is not just taste: when Cursor opens a feature folder, everything relevant to the change sits inside its context window. Type-based layouts scatter one feature across four directories, and Cursor will confidently edit three of them while missing the fourth.',
      ],
    },
    {
      heading: 'What changed with React 19',
      paragraphs: [
        'If you are on React 19, two defaults in older community rules files are now wrong. First, forwardRef is legacy — ref is a regular prop, and rules that tell Cursor to wrap components in forwardRef generate noise. Second, the compiler makes most manual useMemo/useCallback unnecessary, so the template treats memoization as an opt-in optimization rather than a default.',
        'Server Components are the other line to draw. This template covers client-side React. If you use React through Next.js App Router, generate the combined React + Next.js rule set instead — the boundary rules ("use client" placement, what may import what) live in the Next.js template.',
      ],
    },
  ],
  faq: [
    {
      question: 'Will these rules conflict with my ESLint or Prettier setup?',
      answer:
        'No — they operate at a different layer. ESLint and Prettier correct code after it exists; Cursor rules shape what the AI writes in the first place. Keep both. If your ESLint config disagrees with a style detail here (say, semicolons), set the same preference in the generator so the two never fight.',
    },
    {
      question: 'Do I need different rules for React 18 and React 19?',
      answer:
        'The core rules are identical. On React 19 you can drop forwardRef guidance and rely on the compiler instead of manual memoization; on React 18 keep React.memo advice for measured hot paths. The generated file works on both — delete the memoization bullet if the compiler handles it for you.',
    },
    {
      question: 'Should the rules go in .cursor/rules or AGENTS.md for a React project?',
      answer:
        'For a React-only repository, Project Rules (.mdc) with a glob like src/**/*.tsx is the better default: component conventions then load only when Cursor touches component files, keeping the rest of your context window free. Choose AGENTS.md when teammates also use Codex, Copilot, or other agents that read the portable format.',
    },
    {
      question: 'How do I add my own state-management conventions?',
      answer:
        'Generate the React rule set, then add a custom rule in step 4 of the generator — for example "Global state lives in Zustand stores under src/stores; never introduce Redux". Custom rules export into every output format alongside the template rules.',
    },
  ],
  combos: [
    {
      label: 'React + TypeScript',
      tags: ['react', 'typescript'],
      description:
        'The default for new projects. Adds strict-mode typing rules so Cursor writes typed props and avoids any.',
    },
    {
      label: 'React + TypeScript + Tailwind CSS',
      tags: ['react', 'typescript', 'tailwind'],
      description:
        'The common SPA stack. Tailwind rules keep Cursor using utility classes and design tokens instead of ad-hoc CSS files.',
    },
    {
      label: 'React + Vite + Node API',
      tags: ['react', 'node'],
      description:
        'Full-stack JavaScript without a meta-framework. Node rules cover the API side so one rule set serves the whole repo.',
    },
  ],
};
