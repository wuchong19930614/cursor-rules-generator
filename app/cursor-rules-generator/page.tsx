import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import GeneratorForm from "@/components/generator/generator-form";
import FadeScrollPre from "@/components/ui/fade-scroll-pre";
import { getBreadcrumbSchema, getFAQPageSchemaFromItems } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cursor Rules Generator — Create Custom Rules for Cursor AI",
  description:
    "Build custom Cursor rules for any project. Generate AGENTS.md, .cursorrules, and project rules from 26+ templates. Free Cursor AI rules tool.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/cursor-rules-generator",
  },
};

const pageUrl = "https://www.cursorgenerator.dev/cursor-rules-generator";

const faqItems = [
  {
    question: "What formats can the Cursor Rules Generator export?",
    answer:
      "It can export modern Project Rules (.mdc), AGENTS.md, and legacy .cursorrules from the same stack and style configuration.",
  },
  {
    question: "Can I combine multiple tech stack templates?",
    answer:
      "Yes. You can combine templates such as Next.js, TypeScript, Tailwind CSS, Docker, and Prisma into one generated rule set.",
  },
  {
    question: "Does the generator store my rules?",
    answer:
      "No. Rule generation happens in your browser, and custom project instructions are not sent to a backend.",
  },
];

export default function CursorRulesGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: "https://www.cursorgenerator.dev" },
            { name: "Cursor Rules Generator", url: pageUrl },
          ])}
        />
        <JsonLd data={getFAQPageSchemaFromItems(faqItems)} />

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Cursor Rules Generator
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Create custom Cursor AI rules right here — pick your tech stack, set
          your coding style, and export Project Rules (.mdc), AGENTS.md, or
          legacy .cursorrules.
        </p>

        <div id="generator" className="mb-12">
          <GeneratorForm />
        </div>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              What Is the Cursor Rules Generator?
            </h2>
            <p>
              The <strong className="text-zinc-800 dark:text-zinc-200">Cursor Rules Generator</strong> is a free, open-source tool that helps developers create custom Cursor AI rules for any project. Choose from 26+ pre-built templates covering popular tech stacks like Next.js, React, Vue, Python, Go, and Rust, or build your own rule set from scratch. Every generated rule follows Cursor AI conventions — compatible with both{" "}
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
              Recommended Workflow
            </h2>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>Start with one primary stack template, such as Next.js, Python, or Go.</li>
              <li>Add companion templates for cross-cutting concerns like TypeScript, Tailwind CSS, Prisma, or Docker.</li>
              <li>Pick Project Rules when a team needs per-file targeting, or AGENTS.md for a portable single-file instruction set.</li>
              <li>Add your local conventions: test commands, folder names, API boundaries, and review expectations.</li>
              <li>Commit the generated files so every teammate gets the same Cursor AI behavior.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              Example Generated Project Rule
            </h2>
            <p>
              A generated Project Rule can target only the files that need a specific
              instruction, which keeps Cursor responses more relevant:
            </p>
            <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed mt-3">
              <code>{`---
description: Next.js App Router conventions
globs:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
alwaysApply: false
---

- Prefer Server Components by default.
- Add "use client" only for interactivity, browser APIs, or client hooks.
- Use typed metadata exports on route pages.
- Keep data fetching in Server Components or Route Handlers.
- Use next/link and next/image for framework-aware navigation and media.`}</code>
            </FadeScrollPre>
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
                Generate your rules &rarr;
              </a>
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
