// lib/templates/editorial/nextjs.ts
// Next.js 模板页人工撰写内容

import type { TemplateEditorial } from './types';

export const nextjsEditorial: TemplateEditorial = {
  slug: 'nextjs',
  lastUpdated: '2026-07-03',
  intro: [
    'Next.js is the framework where Cursor\'s training data hurts you the most. The model has seen years of Pages Router code, three different caching regimes, and thousands of tutorials that call useEffect inside what should be a Server Component. Without a rules file, Cursor happily writes getServerSideProps into an App Router project, accesses params synchronously when Next.js 16 makes it a Promise, and drops \'use client\' at the top of files that never needed it — code that looks plausible and fails at build time, or worse, silently opts your whole route out of static rendering.',
    'These rules pin Cursor to the current App Router model: server-first components, data fetching inside the tree instead of API round-trips, Server Actions for mutations, and the next/image, next/link, and next/font primitives instead of their raw HTML equivalents. Copy the file directly, or open the generator to combine it with TypeScript, Tailwind, or Prisma rules for your full stack.',
  ],
  designNotes: [
    {
      heading: 'Server-first by default, because Cursor defaults the other way',
      paragraphs: [
        'Every component in the app/ directory is a Server Component until a \'use client\' directive says otherwise — but Cursor\'s instincts were formed on client-side React, so it reaches for useState, onClick handlers, and even window and localStorage in files that render on the server. The result is either a runtime crash ("window is not defined") or a reflexive \'use client\' at the top of the file that quietly drags the entire subtree, its imports included, into the client bundle.',
        'The rule "prefer server components by default; add \'use client\' only when needed" flips Cursor\'s prior. In practice the winning pattern is to push the directive down: keep the page and layout on the server, and extract the interactive leaf — the search box, the like button — into its own small client file. The boundary is directional, and that is worth stating in your own custom rules too: a Server Component may render a Client Component, but a Client Component can only receive server-rendered content through children or other props, never by importing a server file.',
      ],
    },
    {
      heading: 'Data fetching lives in the tree, and the caching rules changed under Cursor\'s feet',
      paragraphs: [
        'In the App Router you fetch data by awaiting it inside an async Server Component — no getServerSideProps, no useEffect-then-setState, and no route handler that exists only so a client component can fetch from your own app. Cursor generates all three of these legacy patterns unprompted, which is why the template states the positive rule ("fetch data in server components; use async/await directly") instead of assuming the model knows the current idiom.',
        'Caching is the subtler trap. Cursor\'s training data spans the era when fetch was aggressively cached by default and the current one where it is not: in Next.js 16, an unannotated fetch blocks rendering and runs on every request. The template\'s guidance to reach for next: { revalidate }, generateStaticParams, and explicit revalidation makes Cursor declare its caching intent instead of inheriting whichever default it happens to remember. Route handlers (route.ts) remain in the rules for what they are actually for — webhooks and endpoints consumed by clients outside your Next.js app.',
      ],
    },
    {
      heading: 'Next.js 16: params is a Promise now, and Cursor does not know it',
      paragraphs: [
        'The single most common build error in AI-generated Next.js 16 code is synchronous access to params and searchParams. Cursor writes const { slug } = params because that was correct for years; since the async-params change it must be const { slug } = await params, and dynamic APIs like cookies() and headers() must be awaited too. A one-line rule fixes an error the model will otherwise reproduce in every dynamic route it touches.',
        'This is also why the template\'s TypeScript section tells Cursor to use the generated PageProps and LayoutProps helpers rather than hand-rolling prop interfaces. These globals are typed per-route (PageProps<\'/blog/[slug]\'>) and already model params as a Promise — so the type system catches the sync-access mistake even when Cursor forgets the rule. Hand-written interfaces, which Cursor loves to invent, encode the stale shape and hide the bug.',
      ],
    },
    {
      heading: 'Server Actions instead of the API-route reflex',
      paragraphs: [
        'Ask Cursor for a form and, unguided, it scaffolds the 2022 stack: an onSubmit handler, a fetch(\'/api/submit\'), a route handler, and hand-rolled loading state. The "use server actions for form mutations" rule collapses that into one function — a \'use server\' mutation passed to the form\'s action prop, with revalidatePath handling the cache afterwards. Fewer files, progressive enhancement for free, and no API surface to keep in sync with its only caller.',
        'Server Actions come with constraints Cursor must be reminded of, and a custom rule in the generator is a good place for them: every action is a public HTTP endpoint regardless of where it is defined, so it must validate its inputs and check authorization itself — never trust that "only my form calls this". The remaining optimization rules exist for the same reason as the Actions rule: plain <img>, <a>, and @font-face are what the model reaches for first, and next/image, next/link, and next/font are strictly better in a Next.js app but only get used when the rules demand them.',
      ],
    },
  ],
  faq: [
    {
      question: 'Do these rules work with the Pages Router?',
      answer:
        'They deliberately do not — the first rule tells Cursor to use the App Router for all new pages, and the data-fetching guidance (async Server Components, Server Actions) has no Pages Router equivalent. If you maintain a Pages Router codebase, replace the routing section with your own rules naming getServerSideProps/getStaticProps explicitly; otherwise Cursor will mix paradigms, and a pages/ file that imports server-only APIs is a build failure waiting to happen. For a migration in progress, scope these rules to app/**/* with a .mdc glob.',
    },
    {
      question: 'Why does Cursor keep adding \'use client\' to every component?',
      answer:
        'Because most React code in its training data is client code, and \'use client\' makes the errors go away. The directive "works" — the crash disappears — so without a rule the model treats it as a universal fix rather than a bundle-size and rendering decision. These rules invert the default, and the sharper follow-up is to require justification: add a custom rule like "before adding \'use client\', state which hook or event handler requires it, and prefer extracting that part into a leaf component".',
    },
    {
      question: 'Should I generate the React rules too, or is the Next.js template enough?',
      answer:
        'Generate both together — select the nextjs and react tags in the generator and they merge into one file. The Next.js template owns routing, the server/client boundary, and data fetching; the React template owns component design, hooks discipline, and state placement inside your client components. They are written to compose: the React rule against useEffect data fetching, for example, reinforces the Next.js rule to fetch in Server Components instead.',
    },
    {
      question: 'My Cursor-generated dynamic route fails with "params should be awaited" — what happened?',
      answer:
        'Cursor wrote Next.js 14-era code against Next.js 15+/16, where params, searchParams, cookies(), and headers() are all async. Add these rules and the model awaits them; for defense in depth, type your pages with the generated PageProps helper (available globally after next dev or next typegen), which models params as a Promise so TypeScript flags any synchronous access Cursor sneaks in.',
    },
  ],
  combos: [
    {
      label: 'Next.js + TypeScript + Tailwind CSS',
      tags: ['nextjs', 'typescript', 'tailwind'],
      description:
        'The default full-stack frontend. TypeScript rules make PageProps and route typing strict; Tailwind rules keep Cursor styling with utilities instead of scattering CSS modules across the app/ tree.',
    },
    {
      label: 'Next.js + Prisma',
      tags: ['nextjs', 'prisma'],
      description:
        'Database-backed apps. Prisma rules keep queries in Server Components and Server Actions with a singleton client — and out of anything marked \'use client\'.',
    },
    {
      label: 'Next.js + React + TypeScript',
      tags: ['nextjs', 'react', 'typescript'],
      description:
        'The complete rule set for component-heavy apps: Next.js owns the server/client boundary and data flow, React rules govern hooks and state inside your client components.',
    },
  ],
};
