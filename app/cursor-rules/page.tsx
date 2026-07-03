import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import FadeScrollPre from "@/components/ui/fade-scroll-pre";
import TableOfContents from "@/components/ui/table-of-contents";
import { getBreadcrumbSchema, getFAQPageSchemaFromItems } from "@/lib/schema";

export const metadata: Metadata = {
  title: "What Are Cursor Rules — Complete Guide to Cursor AI Rules",
  description:
    "Learn what Cursor rules are and how they shape Cursor AI behavior. Comprehensive guide with examples for all project types.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursor-rules",
  },
};

const pageUrl = "https://www.cursorgenerator.dev/cursor-rules";

const TOC_ITEMS = [
  { id: "understanding-cursor-rules", label: "Understanding Cursor Rules" },
  { id: "types-of-cursor-rules", label: "Types of Cursor Rules" },
  { id: "what-can-cursor-rules-control", label: "What Can Cursor Rules Control?" },
  { id: "cursor-rules-vs-linters-vs-documentation", label: "Rules vs Linters vs Docs" },
  { id: "example-rule-categories", label: "Example Rule Categories" },
  { id: "next-steps", label: "Next Steps" },
  { id: "frequently-asked-questions", label: "FAQ" },
];

const faqItems = [
  {
    question: "What are Cursor rules used for?",
    answer:
      "Cursor rules give Cursor AI persistent project instructions, including style, architecture, testing, and framework-specific conventions.",
  },
  {
    question: "Do Cursor rules replace linters and formatters?",
    answer:
      "No. Linters and formatters enforce code after it is written, while Cursor rules guide AI generation before code is produced.",
  },
  {
    question: "Should Cursor rules be committed to git?",
    answer:
      "Project rules and team .cursorrules files should usually be committed so every contributor gets consistent AI behavior.",
  },
];

export default function CursorRulesPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: "https://www.cursorgenerator.dev" },
            { name: "What Are Cursor Rules", url: pageUrl },
          ])}
        />
        <JsonLd data={getFAQPageSchemaFromItems(faqItems)} />

        <div className="lg:grid lg:grid-cols-[minmax(0,42rem)_240px] lg:gap-16 lg:items-start lg:justify-center">
        <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          What Are Cursor Rules
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2
              id="understanding-cursor-rules"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
              Understanding Cursor Rules
            </h2>
            <p>
              Cursor rules are declarative configuration files that define how Cursor AI behaves within your project. They act as persistent instructions that shape every AI interaction — from code generation and refactoring to code review and debugging. Rather than repeating context in every prompt, rules encode your project&apos;s standards once and apply them automatically.
            </p>
          </section>

          <section>
            <h2
              id="types-of-cursor-rules"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
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
            <h2
              id="what-can-cursor-rules-control"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
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
            <h2
              id="cursor-rules-vs-linters-vs-documentation"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
              Cursor Rules vs Linters vs Documentation
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 dark:border-zinc-600 text-left">
                    <th className="py-3 pr-4 text-zinc-900 dark:text-zinc-50">Tool</th>
                    <th className="py-3 px-4 text-zinc-900 dark:text-zinc-50">Primary job</th>
                    <th className="py-3 pl-4 text-zinc-900 dark:text-zinc-50">When it helps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4">Cursor rules</td>
                    <td className="py-3 px-4">Guide AI generation</td>
                    <td className="py-3 pl-4">Before code is written</td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4">Linters</td>
                    <td className="py-3 px-4">Detect violations</td>
                    <td className="py-3 pl-4">After code is generated or edited</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Documentation</td>
                    <td className="py-3 px-4">Explain intent</td>
                    <td className="py-3 pl-4">For humans and onboarding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2
              id="example-rule-categories"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
              Example Rule Categories
            </h2>
            <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed mt-2">
              <code>{`## Architecture
- Keep business logic out of route handlers.
- Use services/ for integrations and lib/ for pure helpers.

## Testing
- Add unit tests for parsing and generation logic.
- Use integration tests for critical user flows.

## Code Review
- Prefer small focused changes.
- Explain trade-offs when modifying shared abstractions.`}</code>
            </FadeScrollPre>
          </section>

          <section>
            <h2
              id="next-steps"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
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

          <section>
            <h2
              id="frequently-asked-questions"
              className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 scroll-mt-24"
            >
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
