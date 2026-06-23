import Link from "next/link";

export default function UsageGuide() {
  return (
    <section className="mt-16 mb-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
        How to Generate Your Cursor Rules
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 text-center max-w-2xl mx-auto">
        Follow these four steps to create a production-ready rules file tailored
        to your tech stack and team conventions.
      </p>

      {/* Step 1 */}
      <div className="mb-10">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5">
            1
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Select Your Tech Stack
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Choose one or more technologies from our 26+ templates — React,
              Next.js, TypeScript, Python, Go, Rust, Vue, Svelte, Node.js, and
              more. The generator intelligently combines best practices from
              each stack, ensuring your rules cover all relevant framework
              conventions. For monorepos or multi-language projects, select
              all applicable stacks and the generator produces rules for every
              part of your codebase.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-10">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5">
            2
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Configure Your Preferences
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Fine-tune how the AI generates code for your project. Set
              indentation (tabs or spaces, 2 or 4 width), quote style (single
              or double), semicolon usage, naming conventions (camelCase,
              PascalCase, snake_case), and AI strictness level. Higher
              strictness means the AI follows your rules more rigidly — ideal
              for established teams with mature conventions. Lower strictness
              gives the AI more flexibility for exploratory work.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="mb-10">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5">
            3
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Choose Your Output Format
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pick the format that fits your workflow:{" "}
              <strong>Project Rules (.mdc)</strong> for multi-file team
              workflows with glob-based targeting and frontmatter metadata;{" "}
              <strong>AGENTS.md</strong> for simple single-file setup at the
              project root; or <strong>Legacy .cursorrules</strong> for
              existing projects that already use Cursor&apos;s original format.
              You can switch formats at any time — the same configuration
              produces consistent output across all three.
            </p>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="mb-10">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center mt-0.5">
            4
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Add Custom Rules &amp; Download
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Include project-specific rules beyond the generated defaults —
              file structure conventions, testing requirements, documentation
              standards, or CI pipeline expectations. Review the real-time
              preview to confirm everything looks correct, then click
              Download. Place the file in your project root (or{" "}
              <code>.cursor/rules/</code> directory for .mdc format) and
              Cursor IDE applies your rules instantly on the next interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Format Examples */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Output Examples by Format
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* .mdc example */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
              Project Rules (.mdc)
            </h4>
            <pre className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 p-3 rounded-lg text-xs overflow-x-auto leading-relaxed">
              <code>{`---
description: React component conventions
globs:
  - "src/components/**/*.tsx"
alwaysApply: false
---

# React Component Rules
- Use functional components
  with TypeScript interfaces
- Prefer named exports
- Keep components under 200 lines
- Use Tailwind CSS for styling`}</code>
            </pre>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Multi-file with glob targeting. Best for teams and large
              projects.
            </p>
          </div>

          {/* AGENTS.md example */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
              AGENTS.md
            </h4>
            <pre className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 p-3 rounded-lg text-xs overflow-x-auto leading-relaxed">
              <code>{`# AGENTS.md

## Code Style
- Use 2-space indentation
- Single quotes, no semicolons
- Arrow functions preferred

## Naming
- camelCase for variables
- PascalCase for components
- snake_case for database fields

## Testing
- Jest with React Testing Library
- Every component needs at least
  one render test`}</code>
            </pre>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Single markdown file. Best for simple projects and open-source.
            </p>
          </div>

          {/* .cursorrules example */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
              Legacy .cursorrules
            </h4>
            <pre className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 p-3 rounded-lg text-xs overflow-x-auto leading-relaxed">
              <code>{`You are an expert React and
TypeScript developer.

Code Style:
- Use 2-space indentation
- Single quotes, no semicolons
- Arrow function components
  with explicit return types

Naming Conventions:
- camelCase for variables
- PascalCase for components
- kebab-case for file names

Testing:
- Jest + React Testing Library`}</code>
            </pre>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Original plain-text format. For backward compatibility.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Frequently Asked Questions
        </h3>
        <dl className="space-y-4">
          {[
            {
              q: "How long does it take to generate rules?",
              a: "Instant. As soon as you finish configuring your options, the preview updates in real-time. Download takes one click — no server processing, no waiting, no queues.",
            },
            {
              q: "Can I edit the generated file after downloading?",
              a: "Absolutely. The generated file is a starting point, not a locked template. Edit it freely to add project-specific conventions, remove rules that do not apply, or adjust the strictness to match your team's evolving standards.",
            },
            {
              q: "What happens if I select multiple tech stacks?",
              a: "The generator merges best practices from all selected stacks intelligently. Selecting React + TypeScript + Tailwind gives you rules covering component patterns, type safety, and utility-first styling — without duplication or conflicts.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                {q}
              </dt>
              <dd className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Related Tools */}
      <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Related Resources
        </h3>
        <ul className="space-y-1.5 text-sm">
          <li>
            <Link
              href="/guides/how-to-use-cursor-rules"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Complete Step-by-Step Guide: How to Use Cursor Rules &rarr;
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              About Cursor Rules Generator: Project Overview &amp; FAQ &rarr;
            </Link>
          </li>
          <li>
            <a
              href="https://docs.cursor.com/context/rules-for-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Cursor Official Documentation: Rules for AI &rarr;
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
