import Link from "next/link";
import type { Metadata } from "next";
import { getAboutFAQPageSchema, getBreadcrumbSchema } from "@/lib/schema";

const siteUrl = "https://www.cursorgenerator.dev";
const aboutBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: siteUrl },
  { name: "About", url: `${siteUrl}/about` },
]);

export const metadata: Metadata = {
  title: "About Cursor Rules Generator — Free .cursorrules Tool",
  description:
    "Learn about Cursor Rules Generator — a free, open-source tool for creating .cursorrules files. 21+ framework templates, zero-setup, fully client-side with no data collection.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const frameworkList = [
  { name: "React", key: "react" },
  { name: "Next.js", key: "nextjs" },
  { name: "Vue", key: "vue" },
  { name: "Svelte", key: "svelte" },
  { name: "Angular", key: "angular" },
  { name: "Astro", key: "astro" },
  { name: "Remix", key: "remix" },
  { name: "Nuxt", key: "nuxt" },
  { name: "React Native", key: "react-native" },
  { name: "Flutter", key: "flutter" },
  { name: "TypeScript", key: "typescript" },
  { name: "Tailwind CSS", key: "tailwind" },
  { name: "Python", key: "python" },
  { name: "Go", key: "go" },
  { name: "Rust", key: "rust" },
  { name: "Node.js", key: "node" },
  { name: "Django", key: "django" },
  { name: "Flask", key: "flask" },
  { name: "FastAPI", key: "fastapi" },
  { name: "Prisma", key: "prisma" },
  { name: "Docker", key: "docker" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getAboutFAQPageSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutBreadcrumb),
          }}
        />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          About Cursor Rules Generator
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {/* ---- Intro ---- */}
          <p>
            Cursor Rules Generator is a free, open-source tool that helps
            developers create customized <code>.cursorrules</code> files for
            Cursor IDE. Our interactive wizard lets you select your tech stack,
            set coding style preferences, and generate production-ready AI rules
            in seconds. Whether you are a solo developer working on a side
            project or part of a large engineering team maintaining multiple
            codebases, our generator gives you consistent, high-quality rules
            that make Cursor&apos;s AI assistant work exactly the way you want.
          </p>
          <p>
            Since our launch, thousands of developers have used Cursor Rules
            Generator to create <code>.cursorrules</code> files for projects
            ranging from small React components to enterprise Go microservices.
            The tool runs entirely in your browser — no accounts, no server-side
            processing, and no data collection — so you can generate rules
            instantly, privately, and as many times as you need.
          </p>

          {/* ---- Topic 1: Our Mission ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Our Mission
          </h2>
          <p>
            Cursor IDE&apos;s <code>.cursorrules</code> system is one of the
            most powerful features in AI-assisted development, but it is also
            one of the most underutilized. Most developers either do not use it
            at all or write minimal rules that fail to capture their team&apos;s
            full conventions. The result is AI-generated code that is
            inconsistent, hard to review, and requires substantial rework.
          </p>
          <p>
            We believe every developer — regardless of experience level or team
            size — deserves first-class AI assistance that respects their unique
            coding standards. Our mission is to make best-practice{" "}
            <code>.cursorrules</code> configuration accessible, fast, and free
            for everyone. By providing expertly crafted templates for 21+ tech
            stacks, we eliminate the guesswork and let you focus on building
            great software instead of tweaking AI instructions.
          </p>
          <p>
            We are committed to keeping this tool free forever. There are no
            premium tiers, no usage limits, and no plans to monetize. If you
            find Cursor Rules Generator useful, the best way to support us is
            to share it with your team and contribute template improvements on
            GitHub.
          </p>

          {/* ---- Topic 2: How It Works ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            How the Generator Works
          </h2>
          <p>
            Our generator uses a modular template engine that combines
            framework-specific best practices with your personal coding
            preferences. Each of our 21 templates is a carefully researched
            collection of rules covering code style, naming conventions,
            architectural patterns, testing requirements, and
            framework-specific idioms. When you select multiple stacks, the
            engine intelligently merges the templates, deduplicates overlapping
            guidance, and applies your chosen style preferences — indentation,
            quote style, semicolon usage, naming conventions, and AI strictness
            level.
          </p>
          <p>
            The entire generation process happens in your browser using
            client-side JavaScript. No rules data is ever sent to a server or
            stored externally. You can see a real-time preview of your rules as
            you configure them, download the final <code>.cursorrules</code>{" "}
            file with a single click, and place it directly into your
            project&apos;s root directory. Cursor IDE picks it up instantly.
          </p>

          {/* ---- Topic 3: Supported Tech Stacks ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Supported Tech Stacks
          </h2>
          <p>
            We currently support {frameworkList.length} tech stacks across
            frontend, backend, fullstack, mobile, and infrastructure categories.
            Each template is maintained to reflect current best practices for
            its framework, and we regularly update them as ecosystems evolve.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 not-prose">
            {frameworkList.map((fw) => (
              <div
                key={fw.key}
                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300"
              >
                {fw.name}
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
            {frameworkList.length} templates total — select one or combine
            multiple for full-stack projects.
          </p>

          {/* ---- Topic 4: Open Source ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Open Source &amp; Community
          </h2>
          <p>
            Cursor Rules Generator is fully open source under the MIT license.
            The complete source code — including the template engine, all 21
            framework templates, and the Next.js frontend — is available on{" "}
            <a
              href="https://github.com/wuchong19930614/cursor-rules-generator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            . We welcome contributions of all kinds: new framework templates,
            improvements to existing rules, bug fixes, documentation
            enhancements, and feature suggestions.
          </p>
          <p>
            If you have expertise in a framework that is not yet covered or
            notice that a template could better reflect current best practices,
            please open an issue or submit a pull request. Community
            contributions are what keep our templates accurate and
            comprehensive. We review contributions promptly and value every
            submission, whether it is a single rule correction or an entirely
            new template.
          </p>

          {/* ---- Topic 5: Privacy & Data ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Privacy &amp; Data
          </h2>
          <p>
            Privacy is a core design principle of Cursor Rules Generator. The
            entire tool runs client-side in your browser. We do not collect,
            store, or transmit any of the following: your tech stack selections,
            your style preferences, your custom rules content, any generated{" "}
            <code>.cursorrules</code> output, your IP address, or any
            personally identifiable information. There is no backend server
            processing your rules data at any point in the workflow.
          </p>
          <p>
            We use Microsoft Clarity and Google Analytics solely to understand
            aggregate usage patterns — such as which pages are most visited and
            how users discover the tool. These services do not capture any
            content you type or generate. No third party has access to your
            rules data because it never leaves your browser. If you prefer
            complete isolation, you can clone the repository and run the
            generator entirely offline.
          </p>

          {/* ---- Navigation ---- */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700 not-prose">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                &larr; Back to Generator
              </Link>
              <Link
                href="/guides/how-to-use-cursor-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                How to Use Cursor Rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
