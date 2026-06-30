import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Are Cursor Rules — Complete Guide to Cursor AI Rules",
  description:
    "Learn what Cursor rules are and how they shape Cursor AI behavior. Comprehensive guide with examples for all project types.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursor-rules",
  },
};

export default function CursorRulesPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          What Are Cursor Rules
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Understanding Cursor Rules
            </h2>
            <p>
              Cursor rules are declarative configuration files that define how Cursor AI behaves within your project. They act as persistent instructions that shape every AI interaction — from code generation and refactoring to code review and debugging. Rather than repeating context in every prompt, rules encode your project&apos;s standards once and apply them automatically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Types of Cursor Rules
            </h2>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              1. Project Rules (.cursor/rules/)
            </h3>
            <p>
              The modern approach uses a <code>.cursor/rules/</code> directory containing{" "}
              <code>.mdc</code> files. Each rule file can target specific file patterns (globs), apply conditionally, and describe exactly when and how Cursor should apply the instruction. This is the recommended format for new projects.
            </p>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              2. Legacy .cursorrules
            </h3>
            <p>
              The older <code>.cursorrules</code> file is a single markdown document in the project root. It applies globally to all interactions within the project. While supported for backward compatibility, it lacks per-file targeting.
            </p>

            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4 mb-2">
              3. AGENTS.md
            </h3>
            <p>
              <code>AGENTS.md</code> is an emerging standard for AI coding assistant instructions. It serves a similar purpose to Cursor rules but is designed to be portable across different AI tools (Cursor, Codex, Copilot, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What Can Cursor Rules Control?
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Coding style and conventions (indentation, naming, patterns)</li>
              <li>Framework and library preferences</li>
              <li>Testing requirements (framework, coverage expectations)</li>
              <li>Documentation standards</li>
              <li>Security and performance constraints</li>
              <li>Project architecture and file organization rules</li>
              <li>Response format and tone preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Next Steps
            </h2>
            <p>
              Ready to create your own rules? Use the{" "}
              <Link href="/cursor-rules-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cursor Rules Generator
              </Link>{" "}
              to build rules from templates, or read our{" "}
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                project rules guide
              </Link>{" "}
              for detailed configuration examples. Browse{" "}
              <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                templates
              </Link>{" "}
              to find pre-built rule sets for your tech stack.
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
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Project Rules Guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
