import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: ".cursorrules Generator — Legacy Cursor Rules Made Easy",
  description:
    "Generate .cursorrules files for your Cursor AI projects. Convert between .cursorrules and project rules formats. Free, open-source .cursorrules generator with templates.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursorrules-generator",
  },
};

export default function CursorrulesGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          .cursorrules Generator
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What Is .cursorrules?
            </h2>
            <p>
              <code>.cursorrules</code> is the legacy configuration file format for Cursor AI. Placed in your project root, it provides global instructions that Cursor applies to every AI interaction within the project. While Cursor now recommends the directory-based <code>.cursor/rules/</code> approach, many existing projects and tutorials still reference the <code>.cursorrules</code> format.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Why This Generator Exists
            </h2>
            <p>
              Despite being the older format, <code>.cursorrules</code> remains widely used because of its simplicity — a single file, no directory structure, no glob patterns. This generator helps you create valid, well-structured <code>.cursorrules</code> files from templates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              .cursorrules File Structure
            </h2>
            <p>A typical <code>.cursorrules</code> file contains markdown-formatted instructions:</p>
            <pre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed mt-2">
              <code>{`# Project: My Next.js App
# Tech Stack: Next.js 16, TypeScript, Tailwind CSS

## Coding Conventions
- Use functional components with TypeScript interfaces
- Prefer server components unless client interactivity is needed
- Use named exports for components

## Testing
- Write tests using Vitest
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for 80%+ coverage on business logic

## Documentation
- Document all public APIs with JSDoc
- Keep README.md up to date`}</code>
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Migration Path
            </h2>
            <p>
              If you decide to upgrade to the modern <code>.cursor/rules/</code> format later, our{" "}
              <Link href="/cursor-rules-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cursor Rules Generator
              </Link>{" "}
              supports both formats and can help with migration. Learn more in our{" "}
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                project rules guide
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Related Tools
            </h2>
            <p>
              Browse{" "}
              <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                templates
              </Link>{" "}
              for pre-built configurations. Generate{" "}
              <Link href="/agents-md-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                AGENTS.md
              </Link>{" "}
              files for cross-tool compatibility. Read{" "}
              <Link href="/cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline">
                What Are Cursor Rules
              </Link>{" "}
              for a comprehensive overview.
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
              <Link href="/agents-md-generator" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                AGENTS.md Generator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
