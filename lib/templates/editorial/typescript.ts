// lib/templates/editorial/typescript.ts
// TypeScript 模板页人工撰写内容

import type { TemplateEditorial } from './types';

export const typescriptEditorial: TemplateEditorial = {
  slug: 'typescript',
  lastUpdated: '2026-07-03',
  intro: [
    'TypeScript gives Cursor a compiler that argues back — and Cursor has learned every trick for making the argument go away. Faced with a red squiggle, an unguided AI reaches for any, slaps an as assertion on the mismatch, or adds a non-null ! and moves on. The code compiles, the type error is gone, and so is every guarantee you adopted TypeScript for. A TypeScript rules file exists to close those escape hatches at generation time.',
    'The rules below do two jobs. They forbid the shortcuts that silently erase type safety (any, careless assertions, throwing raw strings), and they settle the coin-flip conventions — interface vs type, named vs default exports, naming casing — that Cursor otherwise decides differently in every file. Copy the rules as-is, or open the generator to match your indentation, quote style, and naming convention first.',
  ],
  designNotes: [
    {
      heading: 'any is how Cursor deletes your type errors',
      paragraphs: [
        'When Cursor generates code that does not type-check, the cheapest fix available to it is widening something to any — and because any propagates, one any parameter can un-type an entire call chain before a human notices. This is the single most damaging habit in AI-written TypeScript: the diff looks fine, tsc passes, and the error surfaces months later at runtime.',
        'The rule pair "avoid any, use unknown and type guards" changes what Cursor does when it hits a type it cannot name. unknown is deliberately inconvenient: you cannot touch the value until you narrow it, so Cursor is forced to generate the typeof check, the in check, or the custom guard function that documents what the value actually is. That inconvenience is the feature — the narrowing code the rule extracts from Cursor is exactly the validation a careful human would have written.',
      ],
    },
    {
      heading: 'interface vs type: an arbitrary choice worth writing down',
      paragraphs: [
        'Reasonable teams disagree about interface versus type, and the language mostly does not care. Cursor, however, mirrors whatever file it happens to have in context — so a codebase without a written convention drifts into a mix, and every AI-generated PR reopens the style debate. The template picks the mainstream split: interfaces for object shapes, type aliases for unions, intersections, and mapped types.',
        'The split is not purely cosmetic. Interfaces produce better error messages and support declaration merging, which matters when Cursor augments third-party types; unions and mapped types simply cannot be expressed as interfaces, so the alias half of the rule tells Cursor where the boundary sits instead of letting it force object-shape syntax onto things that are not object shapes. If your team standardized on type for everything, flip the rule — the value is in having a written answer, not in this particular one.',
      ],
    },
    {
      heading: 'Typed errors: why catch blocks get their own section',
      paragraphs: [
        'Under strict tsconfig settings a catch variable is unknown, and this is where AI-generated TypeScript most often cheats: Cursor will write catch (e: any) or e as Error to reach .message, reintroducing the exact unsafety strict mode exists to prevent. The error-handling rules make the honest version the default — narrow with instanceof or a type guard, and never throw non-Error values, so there is always something meaningful to narrow to.',
        'The Result<T, E> discriminated-union rule goes a step further: for expected failures, the error becomes part of the return type instead of an invisible throw. This suits AI-assisted work unusually well, because Cursor cannot see which functions in your codebase throw — but it can see a return type. When failure is in the signature, the compiler forces every AI-generated call site to handle it, no code review required.',
      ],
    },
    {
      heading: 'satisfies over as: keeping assertions honest',
      paragraphs: [
        'as is a promise to the compiler with no evidence attached, and Cursor makes that promise freely — especially on config objects, JSON parses, and test fixtures. An as Config assertion both silences excess-property errors and widens the value, so typos in keys survive and literal types are lost.',
        'The template steers Cursor to satisfies for these cases: the value is checked against the target type but keeps its own narrower inferred type, so a misspelled property is a compile error and downstream code still sees the exact literals. Assertions do not disappear entirely — DOM casts and deliberate test doubles remain legitimate — but with satisfies named in the rules, Cursor stops reaching for as as the default way to make a type complaint go quiet.',
      ],
    },
  ],
  faq: [
    {
      question: 'Do these rules replace strict mode in tsconfig.json?',
      answer:
        'No — they assume it. The rules tell Cursor to enable strict mode, but the flags themselves live in tsconfig.json and are enforced by the compiler, not the AI. The two layers cover each other: strict, noUncheckedIndexedAccess, and friends catch what Cursor gets wrong, while the rules stop Cursor from writing the any and as escapes that would neutralize those flags.',
    },
    {
      question: 'My codebase is full of any already. Will these rules cause problems?',
      answer:
        'They apply to code Cursor writes going forward, not retroactively. New and edited code will use unknown, guards, and proper generics even while legacy any remains. If you want Cursor to help migrate, add a custom rule like "When touching a function typed with any, replace it with a precise type as part of the change" — incremental cleanup without a big-bang refactor.',
    },
    {
      question: 'Are the rules different for frontend and backend TypeScript?',
      answer:
        'The core type-system, naming, and error-handling rules are runtime-agnostic and work in both. What differs is the surrounding stack: combine this template with React or Next.js rules for frontend work, or with Node and Prisma rules for a server, and each layer adds its own conventions on top of the shared TypeScript base.',
    },
    {
      question: 'We use type aliases for everything, not interfaces. Can I change that?',
      answer:
        'Yes — the interface-vs-type split is the most legitimately contested rule in the set. Generate the template, then either edit the Type System bullet directly or add a custom rule in the generator ("Use type aliases for all type definitions; do not use interface"). Consistency is what stops Cursor from flip-flopping; which side you standardize on matters far less.',
    },
  ],
  combos: [
    {
      label: 'TypeScript + React',
      tags: ['typescript', 'react'],
      description:
        'The most common pairing. React rules govern components and hooks while the TypeScript layer keeps props, state, and event handlers strictly typed instead of any.',
    },
    {
      label: 'TypeScript + Next.js',
      tags: ['typescript', 'nextjs'],
      description:
        'For App Router projects. Next.js rules handle Server/Client Component boundaries and routing; TypeScript rules keep server actions and route handlers honestly typed.',
    },
    {
      label: 'TypeScript + Node + Prisma',
      tags: ['typescript', 'node', 'prisma'],
      description:
        'A typed backend stack. Prisma generates the database types; these rules make Cursor actually use them — Result-style error handling at the API edge instead of untyped throws.',
    },
  ],
};
