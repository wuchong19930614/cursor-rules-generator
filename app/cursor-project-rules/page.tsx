import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursor Project Rules — Guide to Project-Level Configuration",
  description:
    "Understand Cursor project rules (.cursor/rules). How they differ from .cursorrules. Complete configuration guide with examples.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursor-project-rules",
  },
};

export default function CursorProjectRulesPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Cursor Project Rules
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Project Rules vs. User Rules
            </h2>
            <p>
              Cursor distinguishes between two scopes of rules:{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">Project Rules</strong> (stored in your repository at{" "}
              <code>.cursor/rules/</code>) and <strong className="text-zinc-800 dark:text-zinc-200">User Rules</strong>{" "}
              (stored in your Cursor settings). Project rules travel with your codebase — every team member gets the same AI behavior. User rules are personal preferences that only affect your local Cursor instance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              The .cursor/rules Directory Structure
            </h2>
            <p>
              Project rules live in <code>.cursor/rules/</code> as <code>.mdc</code> files. Each file is a self-contained rule with frontmatter metadata:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-zinc-800 dark:text-zinc-200">globs</strong> — File patterns the rule applies to (e.g., <code>**/*.tsx</code>)</li>
              <li><strong className="text-zinc-800 dark:text-zinc-200">alwaysApply</strong> — Whether the rule is always active or opt-in</li>
              <li><strong className="text-zinc-800 dark:text-zinc-200">description</strong> — Human-readable summary of what the rule does</li>
            </ul>
            <p className="mt-3">Example rule file structure:</p>
            <pre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed mt-2">
              <code>{`---
globs: "**/*.tsx"
alwaysApply: true
description: "React component conventions"
---
Always use functional components with TypeScript interfaces.
Prefer named exports over default exports.
Use the 'use client' directive only when necessary.`}</code>
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Common Project Rule Patterns
            </h2>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              Framework-Specific Rules
            </h3>
            <p>
              Target Next.js components with glob <code>**/*.tsx</code> and specify conventions: server components by default, proper metadata exports, and App Router patterns.
            </p>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              Testing Rules
            </h3>
            <p>
              Target test files with glob <code>**/*.test.*</code> and enforce testing patterns: describe/it blocks, AAA pattern, and specific assertion library preferences.
            </p>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              Documentation Rules
            </h3>
            <p>
              Target documentation files with glob <code>**/*.md</code> and enforce standards: required sections, heading hierarchy, and code example formatting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Migration from .cursorrules to Project Rules
            </h2>
            <p>
              If you&apos;re currently using the legacy <code>.cursorrules</code> file, migrating to the directory-based approach gives you per-file targeting and better organization. Split your single file into multiple <code>.mdc</code> files, each focused on a specific concern.
            </p>
            <p className="mt-2">
              Our{" "}
              <Link href="/cursor-rules-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cursor Rules Generator
              </Link>{" "}
              can help you create properly formatted project rules. Read{" "}
              <Link href="/cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                What Are Cursor Rules
              </Link>{" "}
              for conceptual background, or browse{" "}
              <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                templates
              </Link>{" "}
              for ready-to-use rule sets.
            </p>
          </section>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Back to Generator &rarr;
              </Link>
              <Link href="/cursor-rules-generator" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Cursor Rules Generator &rarr;
              </Link>
              <Link href="/cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                What Are Cursor Rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
