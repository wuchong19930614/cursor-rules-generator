// lib/templates/editorial/tailwind.ts
// Tailwind CSS 模板页人工撰写内容

import type { TemplateEditorial } from './types';

export const tailwindEditorial: TemplateEditorial = {
  slug: 'tailwind',
  lastUpdated: '2026-07-03',
  intro: [
    "Tailwind is the framework where unguided AI assistance degrades fastest. Cursor knows utility classes, but under any friction it falls back on what most of its training data does: a quick style attribute here, a new .card class in globals.css there, an @apply block to \"clean things up\". Each fallback looks harmless in the diff. Three weeks later you have two styling systems in one codebase — utilities that the compiler tracks, and a shadow stylesheet nobody remembers writing — and every visual change requires checking both.",
    'These rules keep Cursor inside a single system: utilities in markup, variants through CVA, tokens in your theme configuration, and class names the compiler can statically see. Copy the rule set as-is, or open the generator to combine it with your framework template and adjust formatting defaults first.',
  ],
  designNotes: [
    {
      heading: 'One styling system, enforced at generation time',
      paragraphs: [
        'The first rule — utilities in markup, no separate CSS files, no @apply — is the load-bearing one. Tailwind\'s core trade is that styles live next to the elements they affect, so deleting markup deletes its styles and the compiler can prune everything unused. Every escape hatch Cursor takes breaks that trade: an inline style silently wins every specificity fight against utilities and ignores your theme, a hand-written class in a CSS file survives after its markup is gone, and an @apply block is a CSS class wearing a utility costume — it recreates the naming, indirection, and dead-code problems Tailwind exists to remove.',
        'A human developer takes these escape hatches occasionally and remembers where. Cursor takes them constantly and remembers nothing — each generation is a fresh decision, so without a rule the codebase drifts toward a random mix of the two systems. Stating the boundary once in a rules file means every generated component lands on the same side of it. The rule still leaves room for genuinely global CSS (resets, font-face, keyframes) via @layer, which the performance section covers.',
      ],
    },
    {
      heading: 'When a long class string should become a component (and when it should not)',
      paragraphs: [
        'AI-generated Tailwind produces long class strings, and the reflex — Cursor\'s included — is to "clean them up" into an @apply abstraction the third time they appear. The rules point that reflex somewhere better: repetition gets extracted into a component, and variation within a component gets modeled with class-variance-authority. A CVA definition gives a button its base classes plus named intent and size variants in one typed structure, which is exactly the shape Cursor reproduces reliably — ask it for a destructive variant and it extends the variant map instead of forking a near-duplicate class string somewhere else in the tree.',
        'The corollary is that duplication below that threshold is fine. Two cards sharing "rounded-lg border p-4" do not need an abstraction, and the rules explicitly prefer repeating utilities over inventing one. Premature extraction is worse with an AI in the loop than without, because Cursor will dutifully thread props through whatever abstraction exists rather than questioning it. For conditional styling, the clsx/cn() rule matters for a subtle reason: cn() resolves conflicts when classes merge (the later px-6 actually beats the earlier px-4), whereas naive string concatenation ships both and leaves the winner to stylesheet order.',
      ],
    },
    {
      heading: 'Class names must survive static analysis',
      paragraphs: [
        'Tailwind does not parse your code — it scans files for strings that look like class names and generates CSS only for what it finds. That makes one habit fatal: dynamically built class names. When Cursor writes `text-${color}-500`, no complete class name ever appears in the source, the compiler generates nothing, and the element renders unstyled — with no error at build time or runtime. It is the most common Tailwind bug in AI-generated code because template literals are exactly how a model "helpfully" generalizes repeated code.',
        'The rules attack this from three sides: never construct class names dynamically (map props to complete strings instead — a lookup object or a CVA variant both work), keep content paths in your config accurate so the scanner sees every file that holds classes, and treat safelist as a last resort for names that truly arrive at runtime, such as from a CMS. If Cursor reaches for safelist during ordinary component work, that is the signal it is routing around the real rule.',
      ],
    },
    {
      heading: 'Tokens in the theme, and variants applied consistently',
      paragraphs: [
        'The theming rules exist because Cursor, asked for "a slightly darker blue", will happily write bg-[#1e40af] — a one-off arbitrary value that no design-token change will ever reach. The rules push every recurring color, spacing step, and font into the theme as named tokens on a numeric scale (primary-50 through primary-950), extending Tailwind\'s defaults rather than overriding them so the standard utilities keep working. Once tokens exist, Cursor uses them: it completes bg-primary-600 like any built-in utility. Arbitrary values stay legal for genuine one-offs, which is the right ratio.',
        'Where those tokens live depends on your Tailwind version. In v3 they go in the extend section of tailwind.config.ts; Tailwind 4 moved to CSS-first configuration, where tokens are declared as CSS variables in an @theme block in your stylesheet. The principle the rules encode — one named source of truth, extended not replaced, with CSS custom properties for values that change at runtime — is identical in both, so tell Cursor which version you run and it will write to the right file.',
        'The same discipline applies to variant prefixes. The rules fix a single direction — base styles are mobile, sm:/md:/lg: only add up — because the one thing worse than either convention is Cursor alternating between mobile-first and desktop-first across components, which it will do if half your existing code leans each way. Dark mode follows suit: every dark: override sits beside the utility it modifies, in the same class list, rather than in a stylesheet Cursor cannot see when it edits the markup.',
      ],
    },
  ],
  faq: [
    {
      question: 'My codebase already uses @apply heavily. Should I still adopt the no-@apply rule?',
      answer:
        'Yes, and treat it as a ratchet rather than a rewrite. The rule stops Cursor from adding new @apply blocks; your existing ones keep working untouched. Migrate them opportunistically — when a component gets meaningful edits, inline its @apply class back into utilities or promote it to a CVA-based component. If a few blocks are staying long-term (say, styles for markdown output you do not control), add a custom rule naming that exception so Cursor stops trying to "fix" it.',
    },
    {
      question: 'Do these rules work with Tailwind CSS v4?',
      answer:
        'Almost all of them, unchanged: utility-first, no dynamic class names, mobile-first prefixes, dark: variants, and CVA are version-independent. Two lines need translating — v4 uses CSS-first configuration, so "extend the theme in tailwind.config.ts" becomes "define tokens in the @theme block of your stylesheet", and content paths are auto-detected so that rule becomes a no-op. Add a custom rule in the generator stating your version ("This project uses Tailwind CSS v4 with @theme in app/globals.css") and Cursor will target the right file.',
    },
    {
      question: 'Should the rules also enforce a class ordering, like layout before color?',
      answer:
        'No — ordering is a job for a formatter, not for the AI. prettier-plugin-tailwindcss sorts classes into Tailwind\'s canonical order deterministically on every save, which no prose rule can match; asking Cursor to hand-sort classes burns attention on something the toolchain does for free. Keep the rules focused on decisions only the AI makes (which classes, which abstractions) and note that ordering is one Tailwind convention worth having, just enforced one layer down.',
    },
    {
      question: 'Cursor wrote classes like bg-{color}-500 and the styles never show up. Why?',
      answer:
        "Because Tailwind's compiler scans source files for complete class-name strings and generates CSS only for those — an interpolated fragment matches nothing, so the CSS is never emitted and the element renders unstyled without any error. This exact failure is why the rules ban dynamic class construction. Have Cursor refactor to a lookup that maps each prop value to a full literal class name (or a CVA variant map); reach for safelist only when the class names genuinely originate outside your source, like from a CMS.",
    },
  ],
  combos: [
    {
      label: 'React + TypeScript + Tailwind CSS',
      tags: ['react', 'typescript', 'tailwind'],
      description:
        'The standard component stack. React rules keep components small and focused, which is precisely what makes utility-class markup readable, and TypeScript types your CVA variant props.',
    },
    {
      label: 'Next.js + Tailwind CSS',
      tags: ['nextjs', 'tailwind'],
      description:
        'The create-next-app default pairing. Next.js rules handle the server/client component boundary while Tailwind styles both sides with zero runtime CSS-in-JS cost.',
    },
    {
      label: 'Vue + Tailwind CSS',
      tags: ['vue', 'tailwind'],
      description:
        'Utilities in Vue templates instead of scoped style blocks. The combined rules stop Cursor from splitting styling between class attributes and <style scoped> sections in the same SFC.',
    },
  ],
};
