import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGENTS.md Generator — AI Agent Instructions for Any Project",
  description:
    "Generate AGENTS.md files for Cursor, Codex, Copilot, and other AI coding assistants. Choose from templates or build custom agent instructions. Free, open-source tool.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/agents-md-generator",
  },
};

export default function AgentsMdGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          AGENTS.md Generator
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What Is AGENTS.md?
            </h2>
            <p>
              <strong className="text-zinc-800 dark:text-zinc-200">AGENTS.md</strong> is a markdown file placed in your project root that provides instructions to AI coding assistants. It tells AI tools how to work with your codebase — coding conventions, architectural decisions, testing requirements, and workflow preferences. Unlike Cursor-specific rules, AGENTS.md is designed to be portable across multiple AI tools including Cursor, Codex, GitHub Copilot, and Windsurf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Why Use AGENTS.md?
            </h2>
            <p>
              A well-crafted AGENTS.md file eliminates repetitive prompting. Instead of explaining your project conventions in every AI session, encode them once in AGENTS.md and let the AI reference them automatically. This is especially valuable for teams — everyone gets consistent AI behavior without manual coordination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              AGENTS.md vs. Cursor Rules
            </h2>
            <p>
              While Cursor rules (<code>.cursor/rules/</code>) are Cursor-specific, AGENTS.md works across multiple tools. Many projects use both: AGENTS.md for portable, high-level instructions and Cursor rules for Cursor-specific behaviors like per-file glob matching.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What to Include in AGENTS.md
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Project overview and tech stack</li>
              <li>Coding conventions and style guides</li>
              <li>Architecture patterns and design decisions</li>
              <li>Testing framework and expectations</li>
              <li>Build and deployment instructions</li>
              <li>File naming and directory structure conventions</li>
              <li>External dependencies and API documentation references</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Related Tools
            </h2>
            <p>
              Generate complete rule sets with the{" "}
              <Link href="/cursor-rules-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cursor Rules Generator
              </Link>
              . Learn about the{" "}
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                project rules format
              </Link>{" "}
              or browse{" "}
              <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                templates
              </Link>{" "}
              for pre-built configurations. Also check out the{" "}
              <Link href="/cursorrules-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                .cursorrules generator
              </Link>{" "}
              for the legacy format.
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
              <Link href="/cursorrules-generator" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                .cursorrules Generator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
