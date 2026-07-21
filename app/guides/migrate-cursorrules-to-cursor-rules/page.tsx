import Link from "next/link";
import type { Metadata } from "next";
import FadeScrollPre from "@/components/ui/fade-scroll-pre";
import TableOfContents from "@/components/ui/table-of-contents";

const PAGE_TITLE =
  ".cursorrules to Cursor Project Rules: Migration Guide (2026)";
const PAGE_DESCRIPTION =
  "Migrate .cursorrules to Cursor Project Rules (.mdc) with a six-step guide, frontmatter examples, glob patterns, testing tips, and a ready-to-use generator.";
const PAGE_URL =
  "https://www.cursorgenerator.dev/guides/migrate-cursorrules-to-cursor-rules";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: PAGE_URL,
    siteName: "Cursor Rules Generator",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Complete migration guide from .cursorrules to Project Rules (.mdc)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: PAGE_URL,
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  image: "https://www.cursorgenerator.dev/og-image.png",
  datePublished: "2026-06-24",
  dateModified: "2026-07-21",
  author: {
    "@type": "Organization",
    name: "Cursor Rules Generator",
  },
  publisher: {
    "@type": "Organization",
    name: "Cursor Rules Generator",
  },
};

const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick Answer" },
  { id: "cursorrules-status", label: "Is .cursorrules Deprecated?" },
  { id: "format-comparison", label: ".cursorrules vs .mdc" },
  { id: "understanding-project-rules", label: "Understanding Project Rules" },
  { id: "step-by-step", label: "Step-by-Step Migration" },
  { id: "before-and-after", label: "Before and After Example" },
  { id: "faq", label: "FAQ" },
];

export default function MigrateGuidePage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,42rem)_240px] lg:gap-16 lg:items-start lg:justify-center">
        <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance text-zinc-900 dark:text-zinc-50 mb-4">
          Migrate .cursorrules to Cursor Project Rules (.mdc)
        </h1>
        <p className="max-w-[68ch] text-lg text-pretty text-zinc-600 dark:text-zinc-400 mb-8">
          Move your existing <code>.cursorrules</code> instructions into scoped,
          version-controlled Cursor Project Rules. This guide shows the exact
          folder structure, frontmatter, glob patterns, and validation steps.
        </p>

        <section
          id="quick-answer"
          aria-labelledby="quick-answer-heading"
          className="not-prose mb-10 rounded-xl bg-blue-50 px-5 py-6 text-blue-950 dark:bg-blue-950/40 dark:text-blue-50 sm:px-6"
        >
          <h2
            id="quick-answer-heading"
            className="text-xl font-semibold text-balance"
          >
            The short answer
          </h2>
          <p className="mt-3 max-w-[68ch] leading-7 text-blue-900 dark:text-blue-100">
            Cursor labels <code>.cursorrules</code> as a legacy format. It still
            works, but Project Rules in <code>.cursor/rules/*.mdc</code> are the
            recommended replacement because they support scoped, reusable rules.
          </p>
          <ol className="mt-4 grid gap-2 text-sm leading-6 text-blue-900 dark:text-blue-100 sm:grid-cols-3">
            <li className="rounded-lg bg-white/70 px-3 py-2 dark:bg-blue-950/60">
              <strong className="block text-blue-950 dark:text-blue-50">1. Back up</strong>
              Preserve your current file in git.
            </li>
            <li className="rounded-lg bg-white/70 px-3 py-2 dark:bg-blue-950/60">
              <strong className="block text-blue-950 dark:text-blue-50">2. Split and scope</strong>
              Create focused <code>.mdc</code> rules.
            </li>
            <li className="rounded-lg bg-white/70 px-3 py-2 dark:bg-blue-950/60">
              <strong className="block text-blue-950 dark:text-blue-50">3. Test and switch</strong>
              Remove the legacy file after validation.
            </li>
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/#generator"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Generate Project Rules
            </Link>
            <a
              href="https://docs.cursor.com/context/rules"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-medium text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
            >
              Verify in Cursor&apos;s official rules documentation ↗
            </a>
          </div>
        </section>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {/* Legacy status */}
          <h2
            id="cursorrules-status"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            Is .cursorrules Deprecated?
          </h2>
          <p>
            Yes. Cursor&apos;s documentation identifies <code>.cursorrules</code>{" "}
            as legacy and recommends Project Rules for new work. The old file is
            still supported, so this is a controlled migration rather than an
            emergency removal: keep it while you test the new rules, then delete
            it after the <code>.mdc</code> files behave as expected.
          </p>
          <p>
            Project Rules (<code>.mdc</code>) solves these problems with a
            modern, multi-file architecture. Instead of one file, you create a{" "}
            <code>.cursor/rules/</code> directory containing as many{" "}
            <code>.mdc</code> files as your project needs. Each file has YAML
            frontmatter with a <code>description</code> for human readability,{" "}
            <code>globs</code> for targeting specific file patterns,{" "}
            and <code>alwaysApply</code> to control whether the rule runs globally.
            This means your React
            component rules only apply when editing <code>.tsx</code> files,
            your Go backend rules only fire in <code>.go</code> files, and your
            universal testing standards can be flagged to apply everywhere with{" "}
            <code>alwaysApply: true</code>. The result is more relevant AI
            output, lower token usage on irrelevant rules, and a codebase that
            is easier for new team members to navigate.
          </p>

          <h2
            id="format-comparison"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            .cursorrules vs .mdc Project Rules
          </h2>
          <p>
            Both formats provide persistent instructions to Cursor, but Project
            Rules add metadata and scope so Cursor can load the right guidance
            for the current file or task.
          </p>
          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of legacy .cursorrules and Cursor Project Rules
              </caption>
              <thead className="bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Capability</th>
                  <th scope="col" className="px-4 py-3 font-semibold">.cursorrules</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Project Rules (.mdc)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700 dark:divide-zinc-700 dark:text-zinc-300">
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">Location</th>
                  <td className="px-4 py-3">Project root</td>
                  <td className="px-4 py-3"><code>.cursor/rules/*.mdc</code></td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">Structure</th>
                  <td className="px-4 py-3">One plain-text file</td>
                  <td className="px-4 py-3">Multiple focused files</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">File targeting</th>
                  <td className="px-4 py-3">No glob scope</td>
                  <td className="px-4 py-3"><code>globs</code> can auto-attach rules</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">Application</th>
                  <td className="px-4 py-3">Global legacy instructions</td>
                  <td className="px-4 py-3">Always, auto-attached, agent-requested, or manual</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">Recommended use</th>
                  <td className="px-4 py-3">Existing projects during migration</td>
                  <td className="px-4 py-3">New rules and long-term maintenance</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Understanding Project Rules */}
          <h2
            id="understanding-project-rules"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            Understanding Project Rules: Cursor Rules V2
          </h2>
          <p>
            Before you start migrating, it helps to understand the core concepts
            of Project Rules. Every <code>.mdc</code> file lives inside the{" "}
            <code>.cursor/rules/</code> directory and consists of two parts:
            YAML frontmatter and a markdown body. The frontmatter is metadata
            that tells Cursor when and where to apply the rules. The body is the
            actual rule content — the same kind of instructions you already have
            in your <code>.cursorrules</code> file, but now organized by domain.
          </p>
          <p>
            The three core frontmatter fields are: <strong>description</strong> (a
            human-readable summary shown in Cursor&apos;s rules panel),{" "}
            <strong>globs</strong> (an array of file-matching patterns like{" "}
            <code>&quot;src/components/**/*.tsx&quot;</code> that limit where
            the rule applies — leave empty for global application),{" "}
            <strong>alwaysApply</strong> (a boolean; when <code>true</code>,
            Cursor includes these rules in every AI interaction regardless of
            which file you are editing — ideal for universal conventions like
            code style and testing requirements). Different combinations of
            these fields produce Cursor&apos;s Always, Auto Attached, Agent
            Requested, and Manual rule types.
          </p>
          <p>
            Cursor IDE also supports <strong>AGENTS.md</strong>, a single
            markdown file at your project root that is simpler than Project
            Rules — no frontmatter, no glob targeting, no file splitting — but
            excellent for small projects and quick onboarding. The three formats
            can coexist: you can have <code>.cursor/rules/</code> for team
            domain rules, an <code>AGENTS.md</code> for contributor onboarding,
            and even keep a legacy <code>.cursorrules</code> for backward
            compatibility during a gradual migration. Avoid defining the same
            instruction differently in multiple files, then remove the legacy
            file once the new rules are verified.
          </p>

          {/* Step-by-Step Migration */}
          <h2
            id="step-by-step"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            Step-by-Step Migration Guide
          </h2>

          {/* Step 1 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 1: Back Up Your Existing .cursorrules
          </h3>
          <p>
            Before making any changes, create a backup of your current{" "}
            <code>.cursorrules</code> file. You can simply copy it to a safe
            location or commit the current state to version control. This
            ensures you can always revert if something goes wrong during the
            migration. Since <code>.cursorrules</code> is a hidden file, use{" "}
            <code>cp .cursorrules .cursorrules.backup</code> or stash it in a
            separate branch. If your project uses git, run{" "}
            <code>git add .cursorrules && git commit -m &quot;backup: snapshot
            .cursorrules before migration&quot;</code> so the original state is
            preserved in your commit history.
          </p>

          {/* Step 2 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 2: Create the .cursor/rules/ Directory
          </h3>
          <p>
            Project Rules live in a dedicated directory under your project root.
            Create it with <code>mkdir -p .cursor/rules</code>. This directory
            will hold all your <code>.mdc</code> files. Cursor IDE automatically
            scans this directory when you open the project — there is no
            configuration panel to visit and no plugin to install. The directory
            name starts with a dot, making it hidden on macOS and Linux, which
            keeps your workspace clean while still being visible in your editor
            and version control. Keep project-wide rules in this directory. In
            a monorepo, you can also place additional <code>.cursor/rules/</code>{" "}
            directories inside subprojects so those rules stay scoped to their
            part of the repository.
          </p>

          {/* Step 3 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 3: Split Rules by Domain
          </h3>
          <p>
            This is the core of the migration. Open your backup{" "}
            <code>.cursorrules</code> and identify logical domains — look for
            sections about code style, naming conventions, framework-specific
            patterns, testing requirements, and architectural guidelines. Create
            a separate <code>.mdc</code> file for each domain. For example, a
            React + Go monorepo might produce:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>
              <code>code-style.mdc</code> — indentation, quotes, semicolons
              (applies everywhere)
            </li>
            <li>
              <code>react-components.mdc</code> — component patterns, hooks
              conventions, JSX rules
            </li>
            <li>
              <code>go-backend.mdc</code> — error handling, package structure,
              naming idioms
            </li>
            <li>
              <code>testing-standards.mdc</code> — test framework, coverage
              expectations, mock patterns
            </li>
          </ul>
          <p>
            The goal is separation of concerns: each file should contain only
            rules relevant to its domain. This keeps files short and focused,
            making them easier to maintain and review. If you are unsure where
            to start, begin with three files — code style, framework-specific
            rules, and testing — then iterate as you discover more natural
            groupings.
          </p>

          {/* Step 4 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 4: Add MDC Frontmatter to Each File
          </h3>
          <p>
            Every <code>.mdc</code> file must start with YAML frontmatter
            delimited by <code>---</code> on its own line at the top and bottom
            of the metadata block. At minimum, include a{" "}
            <code>description</code> field so teammates can understand what each
            file covers without opening it. For domain-specific rules, add{" "}
            <code>globs</code> to target the right files. For universal rules
            like code style, set <code>alwaysApply: true</code>. Here is a
            minimal frontmatter for a React component rules file:
          </p>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`---
description: React component conventions for the frontend team
globs:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
alwaysApply: false
---

# React Component Rules

- Use functional components with TypeScript interfaces for props
- Prefer named exports over default exports
- Keep components under 200 lines; extract hooks and utilities
- Use Tailwind CSS for styling — no inline styles or CSS modules`}</code>
          </FadeScrollPre>
          <p>
            The <code>globs</code> field accepts standard glob patterns. You can
            target specific directories, file extensions, or even individual
            files. Multiple globs in the array are combined with OR logic — the
            rule fires if any pattern matches. For testing standards that should
            apply everywhere, simply set <code>alwaysApply: true</code> and omit
            or leave <code>globs</code> empty. Track changes through git history
            and pull-request review rather than adding undocumented frontmatter
            fields.
          </p>

          {/* Step 5 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 5: Configure Application Mode (alwaysApply / globs)
          </h3>
          <p>
            The power of Project Rules comes from controlling when rules are
            active. There are four supported patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">
                Always-on rules
              </strong>{" "}
              — Set <code>alwaysApply: true</code> for conventions that should
              influence every AI interaction: code style (indentation, quotes,
              semicolons), naming patterns, and universal testing standards.
              These rules are always in the AI&apos;s context.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">
                Domain-targeted rules
              </strong>{" "}
              — Set <code>alwaysApply: false</code> and define{" "}
              <code>globs</code> for framework-specific rules. Your React rules
              only activate when editing <code>.tsx</code> files; your Go rules
              only fire for <code>.go</code> files. This keeps the AI&apos;s
              context lean and relevant.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">
                Agent-requested rules
              </strong>{" "}
              — Provide a clear <code>description</code> without making the rule
              always-on. Cursor can include it when the current task is relevant.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">
                Manual rules
              </strong>{" "}
              — Keep the rule available for explicit invocation with{" "}
              <code>@ruleName</code> when you want full control over when it is
              added to context.
            </li>
          </ul>
          <p>
            Choose your pattern based on team size and project structure. Small
            single-framework projects can get by with one or two always-on
            files. Large monorepos benefit most from domain-targeted rules that
            keep irrelevant context out of every AI call — this also reduces
            token usage and improves response quality since the AI is not
            processing instructions meant for a different part of the codebase.
          </p>

          {/* Step 6 */}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Step 6: Test Your Migration and Iterate
          </h3>
          <p>
            After creating your <code>.mdc</code> files, test them by asking
            Cursor to generate code in different parts of your project. Open a
            frontend component file and ask the AI to create a new component —
            it should follow your React rules. Open a backend file and ask for
            a new function — it should follow your Go or Python rules. Open any
            file and check that code style conventions (indentation, quotes,
            semicolons) are consistently applied. If the AI produces output that
            does not match your expectations, review the relevant{" "}
            <code>.mdc</code> file and make the rules more specific.
          </p>
          <p>
            You can keep your old <code>.cursorrules</code> file in place during
            testing, but avoid duplicating the same instruction across formats.
            Once you are confident the migration is working correctly, remove
            or archive the old <code>.cursorrules</code> file
            and commit the new <code>.cursor/rules/</code> directory. Notify
            your team so everyone knows the new rule files are the source of
            truth. As your project evolves, iterate on your rules: split files
            that grow too large, add new domains as you add new technologies,
            and review significant changes through version control.
          </p>

          {/* Before/After Comparison */}
          <h2
            id="before-and-after"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            Migration Example: Before and After
          </h2>
          <p>
            Here is a real-world example showing how a typical{" "}
            <code>.cursorrules</code> file for a React + Go project transforms
            into Project Rules. The original file is a single document mixing
            frontend, backend, and general conventions. After migration, the
            same rules are split into focused <code>.mdc</code> files, each
            targeting only the relevant files.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            Before: Single .cursorrules File
          </h3>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`You are an expert React, TypeScript, and Go developer.

Code Style:
- Use 2-space indentation
- Single quotes, no semicolons
- Arrow functions with explicit return types

React Components:
- Use functional components with TypeScript interfaces
- Prefer named exports
- Keep components under 200 lines
- Use Tailwind CSS for styling

Go Backend:
- Always handle errors explicitly
- Use context.Context as first parameter
- Follow standard library naming conventions
- Package names should be short and lowercase

Testing:
- Jest + React Testing Library for frontend
- Go testing package for backend
- Every component needs at least one render test
- Backend functions must have table-driven tests

Architecture:
- Frontend in src/ directory
- Backend in cmd/ and internal/ directories
- Use React Query for server state
- Use gorilla/mux for HTTP routing`}</code>
          </FadeScrollPre>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-2">
            After: Organized .cursor/rules/ Directory
          </h3>
          <p>
            The same rules, now split into domain-specific <code>.mdc</code>{" "}
            files with proper frontmatter. Each file is short, focused, and
            applies only where relevant.
          </p>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-1">
            .cursor/rules/code-style.mdc
          </h4>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`---
description: Universal code style conventions
alwaysApply: true
---

# Code Style

- Use 2-space indentation
- Single quotes, no semicolons
- Arrow functions with explicit return types
- Follow language-specific naming conventions`}</code>
          </FadeScrollPre>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-1">
            .cursor/rules/react-components.mdc
          </h4>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`---
description: React component conventions
globs:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
alwaysApply: false
---

# React Component Rules

- Use functional components with TypeScript interfaces
- Prefer named exports over default exports
- Keep components under 200 lines; extract hooks and utilities
- Use Tailwind CSS for styling — no inline styles or CSS modules
- Use React Query (TanStack Query) for server state`}</code>
          </FadeScrollPre>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-1">
            .cursor/rules/go-backend.mdc
          </h4>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`---
description: Go backend conventions
globs:
  - "cmd/**/*.go"
  - "internal/**/*.go"
alwaysApply: false
---

# Go Backend Rules

- Always handle errors explicitly — never ignore them
- Use context.Context as the first parameter in all functions
- Follow standard library naming conventions
- Package names should be short, lowercase, single-word
- Use gorilla/mux for HTTP routing`}</code>
          </FadeScrollPre>

          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-1">
            .cursor/rules/testing-standards.mdc
          </h4>
          <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed">
            <code>{`---
description: Testing requirements across the entire codebase
alwaysApply: true
---

# Testing Standards

- Frontend: Jest + React Testing Library
- Every component needs at least one render test
- Backend: Go standard testing package
- Backend functions must use table-driven tests
- Aim for meaningful coverage over percentage targets`}</code>
          </FadeScrollPre>

          <p>
            The migrated structure is cleaner, more maintainable, and more
            efficient. When a developer edits a React component, Cursor only
            injects <code>code-style.mdc</code>,{" "}
            <code>react-components.mdc</code>, and{" "}
            <code>testing-standards.mdc</code> — the Go backend rules are
            completely excluded. This keeps the AI context focused, reduces
            token costs, and eliminates the risk of backend conventions leaking
            into frontend code generation.
          </p>

          <section className="not-prose my-10 rounded-xl bg-zinc-900 px-5 py-6 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6">
            <div>
              <h2 className="text-xl font-semibold text-balance">
                Skip the boilerplate and generate the files
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-6 text-zinc-300 dark:text-zinc-700">
                Choose your stack and download ready-to-edit Project Rules with
                valid frontmatter, file targeting, and split-file output.
              </p>
            </div>
            <Link
              href="/#generator"
              className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 sm:mt-0"
            >
              Open the generator
            </Link>
          </section>

          {/* FAQ */}
          <h2
            id="faq"
            className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3 scroll-mt-24"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Is .cursorrules deprecated, and does it still work?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Cursor identifies <code>.cursorrules</code> as legacy and
                recommends Project Rules, but the old file is still supported.
                Keep it during validation, migrate one domain at a time, and
                remove it once the new <code>.mdc</code> rules produce the
                expected behavior.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                What is the difference between .md and .mdc files?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A <code>.md</code> file is a general Markdown document. An{" "}
                <code>.mdc</code> file is a Cursor rule: it combines a Markdown
                instruction body with YAML frontmatter such as{" "}
                <code>description</code>, <code>globs</code>, and{" "}
                <code>alwaysApply</code>. Use <code>AGENTS.md</code> for portable
                repository guidance and <code>.mdc</code> when you need
                Cursor-specific scoping and rule modes.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Where should Cursor Project Rules be stored?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Store project-wide rules as <code>.mdc</code> files in{" "}
                <code>.cursor/rules/</code>. For a monorepo, you can add another{" "}
                <code>.cursor/rules/</code> directory inside a subproject so its
                rules stay scoped to that part of the repository.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Can I mix .cursorrules and .mdc files in the same project?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Absolutely. This is actually the recommended approach during
                migration. Keep your existing <code>.cursorrules</code> for
                rules you have not yet migrated, and add{" "}
                <code>.mdc</code> files for the ones you have. Avoid duplicating
                an instruction across formats because conflicting guidance can
                produce inconsistent behavior. For a clean setup, complete the
                migration and remove the old file.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Can AGENTS.md and Project Rules coexist?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, they serve different purposes and complement each other
                well. Use <strong>Project Rules (.mdc)</strong> for
                domain-specific AI behavior — code style per directory,
                framework-specific patterns, testing requirements with glob
                targeting. Use <strong>AGENTS.md</strong> for contributor-facing
                documentation: project overview, onboarding instructions,
                architectural decisions, and conventions that human developers
                need to read. AGENTS.md is also visible to Cursor&apos;s AI, so
                it doubles as both human documentation and AI context. For
                open-source projects especially, AGENTS.md is valuable because
                every contributor sees it immediately at the repo root.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Is there any risk in migrating?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The migration itself is low-risk because you can keep your old{" "}
                <code>.cursorrules</code> file active during the entire process.
                The main risk is introducing inconsistencies if you accidentally
                define the same rule differently across multiple{" "}
                <code>.mdc</code> files. To mitigate this, migrate one domain
                at a time, test each new <code>.mdc</code> file in isolation,
                and remove the corresponding rules from{" "}
                <code>.cursorrules</code> only after confirming they work. Also,
                commit your <code>.cursor/rules/</code> directory to version
                control so you can track changes and revert if needed. There is
                no data loss risk — your rules are just moving from one file
                format to another.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                How should teams coordinate migration?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                For team migrations, designate one person to create the initial{" "}
                <code>.cursor/rules/</code> structure and draft the{" "}
                <code>.mdc</code> files. Open a pull request so the team can
                review the proposed split and frontmatter configuration before
                merging. During the review period, everyone continues using the
                existing <code>.cursorrules</code> file. After the PR is merged,
                announce the migration in your team channel with a link to the
                new directory. Schedule a brief window (a few days to a week)
                where both formats coexist so any issues surface before the old
                file is removed. Finally, delete <code>.cursorrules</code> in a
                follow-up PR and mark the migration as complete. For large teams,
                consider adding a <code>README.md</code> inside{" "}
                <code>.cursor/rules/</code> explaining the file organization
                so new contributors can quickly understand the structure.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                Can I use the Cursor Rules Generator to create .mdc files?
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes! Our{" "}
                <Link
                  href="/#generator"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  interactive generator
                </Link>{" "}
                supports all three formats — Project Rules (.mdc), AGENTS.md,
                and legacy .cursorrules. Select your tech stack, configure your
                preferences, choose Project Rules as the output format, and the
                generator produces properly structured <code>.mdc</code> files
                with correct frontmatter. This is the fastest way to create your
                initial <code>.cursor/rules/</code> directory, especially if you
                are starting fresh or want to replace hand-written rules with
                generator-optimized versions. You can then customize the
                generated files to add project-specific conventions.
              </dd>
            </div>
          </dl>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700 not-prose">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                &larr; Back to Generator
              </Link>
              <Link
                href="/guides/how-to-use-cursor-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                How to Use Cursor Rules: Step-by-Step Guide &rarr;
              </Link>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                About Cursor Rules Generator &rarr;
              </Link>
            </div>
          </div>
        </div>
        </div>

          <TableOfContents
            items={TOC_ITEMS}
            className="sticky top-24 hidden lg:block"
          />
        </div>
      </main>
    </div>
  );
}
