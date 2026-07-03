import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import GeneratorForm from "@/components/generator/generator-form";
import { getBreadcrumbSchema, getFAQPageSchemaFromItems } from "@/lib/schema";

export const metadata: Metadata = {
  title: ".cursorrules Generator — Legacy Cursor Rules Made Easy",
  description:
    "Generate .cursorrules files for your Cursor AI projects. Convert between .cursorrules and project rules formats. Free, open-source .cursorrules generator with templates.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursorrules-generator",
  },
};

const pageUrl = "https://www.cursorgenerator.dev/cursorrules-generator";

const faqItems = [
  {
    question: "Is .cursorrules still supported?",
    answer:
      "Many existing Cursor projects still use .cursorrules, but new projects usually benefit from the more flexible .cursor/rules/*.mdc Project Rules format.",
  },
  {
    question: "When should I choose .cursorrules instead of Project Rules?",
    answer:
      "Choose .cursorrules when you want one simple global instruction file or when maintaining a project that already uses the legacy format.",
  },
  {
    question: "Can I migrate a generated .cursorrules file later?",
    answer:
      "Yes. The same guidance can be split into Project Rules later so frontend, backend, testing, and documentation rules can target different file patterns.",
  },
];

export default function CursorrulesGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: "https://www.cursorgenerator.dev" },
            { name: ".cursorrules Generator", url: pageUrl },
          ])}
        />
        <JsonLd data={getFAQPageSchemaFromItems(faqItems)} />

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          .cursorrules Generator
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Generate a legacy .cursorrules file directly on this page — choose
          your tech stack and coding style, then download the result. The
          output format is preset to .cursorrules.
        </p>

        <div id="generator" className="mb-12">
          <GeneratorForm presetOutputMode="legacy" />
        </div>

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
              Common .cursorrules Mistakes
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Writing vague rules like &quot;write clean code&quot; without concrete examples.</li>
              <li>Mixing unrelated frontend, backend, and infrastructure rules without headings.</li>
              <li>Forgetting test commands, lint commands, and project-specific safety checks.</li>
              <li>Adding rules that conflict with the formatter, linter, or existing architecture.</li>
              <li>Keeping stale instructions after migrating frameworks or changing folder structure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Legacy vs Modern Cursor Rules
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 dark:border-zinc-600 text-left">
                    <th className="py-3 pr-4 text-zinc-900 dark:text-zinc-50">Need</th>
                    <th className="py-3 px-4 text-zinc-900 dark:text-zinc-50">.cursorrules</th>
                    <th className="py-3 pl-4 text-zinc-900 dark:text-zinc-50">Project Rules</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4">Simple setup</td>
                    <td className="py-3 px-4">Best</td>
                    <td className="py-3 pl-4">Good</td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4">Per-file targeting</td>
                    <td className="py-3 px-4">No</td>
                    <td className="py-3 pl-4">Yes, with globs</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Large teams or monorepos</td>
                    <td className="py-3 px-4">Limited</td>
                    <td className="py-3 pl-4">Recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.question}
                  </dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-4">
              <a href="#generator" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Generate your .cursorrules &rarr;
              </a>
              <Link href="/guides/migrate-cursorrules-to-cursor-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Migrate to Project Rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
