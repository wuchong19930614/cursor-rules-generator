import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import GeneratorForm from "@/components/generator/generator-form";
import FadeScrollPre from "@/components/ui/fade-scroll-pre";
import { getBreadcrumbSchema, getFAQPageSchemaFromItems } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AGENTS.md Generator — AI Agent Instructions for Any Project",
  description:
    "Generate AGENTS.md instructions for Cursor, Codex, Copilot, and other AI coding tools. Choose a stack template, customize the rules, and download the file free.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/agents-md-generator",
  },
};

const pageUrl = "https://www.cursorgenerator.dev/agents-md-generator";

const faqItems = [
  {
    question: "Where should AGENTS.md live?",
    answer:
      "Place AGENTS.md in the project root so AI coding assistants can discover the repository-level instructions.",
  },
  {
    question: "Is AGENTS.md a replacement for Cursor Project Rules?",
    answer:
      "Not always. AGENTS.md is ideal for portable high-level guidance, while Cursor Project Rules are better for file-specific behavior with globs and frontmatter.",
  },
  {
    question: "What should an AGENTS.md generator include?",
    answer:
      "It should include project context, tech stack, commands, coding conventions, testing expectations, review rules, and boundaries for safe changes.",
  },
];

export default function AgentsMdGeneratorPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: "https://www.cursorgenerator.dev" },
            { name: "AGENTS.md Generator", url: pageUrl },
          ])}
        />
        <JsonLd data={getFAQPageSchemaFromItems(faqItems)} />

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          AGENTS.md Generator
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Build an AGENTS.md file for your project right here — pick your tech
          stack, set your conventions, and download the result. The output
          format is preset to AGENTS.md.
        </p>

        <div id="generator" className="mb-12">
          <GeneratorForm presetOutputMode="agents-md" />
        </div>

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
              Example AGENTS.md Structure
            </h2>
            <p>
              A useful AGENTS.md file gives AI tools the same context a new
              contributor would need before changing code:
            </p>
            <FadeScrollPre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed mt-3">
              <code>{`# AGENTS.md

## Project Overview
This repository is a Next.js application using TypeScript and Tailwind CSS.

## Commands
- npm run lint
- npm run test
- npm run build

## Coding Rules
- Prefer Server Components unless client interactivity is required.
- Keep shared UI in components/.
- Use named exports for reusable utilities.

## Testing
- Add tests for business logic and generated output.
- Run lint and build before proposing large changes.`}</code>
            </FadeScrollPre>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
              When AGENTS.md Works Best
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Open-source repositories where contributors use different AI coding tools.</li>
              <li>Small projects that do not need per-directory Cursor rules yet.</li>
              <li>Teams that want one readable source of truth for AI coding behavior.</li>
              <li>Repos that already have Project Rules but need a tool-agnostic overview.</li>
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
                Generate your AGENTS.md &rarr;
              </a>
              <Link href="/cursor-project-rules" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                Learn about Project Rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
