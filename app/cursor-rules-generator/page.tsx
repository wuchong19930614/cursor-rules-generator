import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursor Rules Generator — Create Custom Rules for Cursor AI",
  description:
    "Build custom Cursor rules for any project. Generate AGENTS.md, .cursorrules, and project rules from 28+ templates. Free Cursor AI rules tool.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursor-rules-generator",
  },
};

export default function CursorRulesGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Cursor Rules Generator
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What Is the Cursor Rules Generator?
            </h2>
            <p>
              The <strong className="text-zinc-800 dark:text-zinc-200">Cursor Rules Generator</strong> is a free, open-source tool that helps developers create custom Cursor AI rules for any project. Choose from 28+ pre-built templates covering popular tech stacks like Next.js, React, Vue, Python, Go, and Rust, or build your own rule set from scratch. Every generated rule follows the official Cursor AI conventions — compatible with both{" "}
              <code>.cursor/rules</code> directory-based project rules and legacy{" "}
              <code>.cursorrules</code> single-file format.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              How It Works
            </h2>
            <p>
              Select your tech stack from the template library, customize the AI behavior directives (coding style, response tone, allowed/disallowed patterns), and download your generated rule files. The generator supports three output formats:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-zinc-800 dark:text-zinc-200">AGENTS.md</strong> — A high-level agent instruction file compatible with multiple AI coding assistants.</li>
              <li><strong className="text-zinc-800 dark:text-zinc-200">.cursorrules</strong> — The legacy single-file format used by older Cursor versions.</li>
              <li><strong className="text-zinc-800 dark:text-zinc-200">.cursor/rules/*.mdc</strong> — The modern directory-based project rules format with per-file pattern matching.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Why Use Custom Cursor Rules?
            </h2>
            <p>
              Cursor AI becomes significantly more productive when it understands your project&apos;s conventions. Custom rules tell Cursor about your preferred patterns, naming conventions, testing frameworks, and architectural constraints. Instead of repeatedly correcting the AI in each session, encode your preferences once as rules and enjoy consistent AI-assisted coding across your entire team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Get Started
            </h2>
            <p>
              Browse our{" "}
              <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                template library
              </Link>{" "}
              to find your tech stack, or read our{" "}
              <Link href="/cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                guide on Cursor rules
              </Link>{" "}
              to understand the fundamentals. Ready to dive deeper? Check out the{" "}
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                project rules guide
              </Link>{" "}
              for advanced configuration patterns.
            </p>
          </section>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Back to Generator &rarr;
              </Link>
              <Link href="/cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                What Are Cursor Rules &rarr;
              </Link>
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Cursor Project Rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
