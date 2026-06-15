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

          {/* ---- Topic 1: Why Cursor Rules Matter ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Why Cursor Rules Matter
          </h2>
          <p>
            Modern AI coding assistants are powerful but generic by default.
            Without explicit guidance, they produce code in a one-size-fits-all
            style that rarely matches your project&apos;s conventions. Variables
            get named inconsistently, imports are added in random order, and
            architectural decisions deviate from your team&apos;s established
            patterns. Reviewing AI-generated code often takes longer than
            writing it from scratch — defeating the purpose of using AI
            assistance in the first place.
          </p>
          <p>
            A <code>.cursorrules</code> file solves this by giving Cursor IDE a
            permanent set of instructions that it consults on every interaction.
            Think of it as your project&apos;s constitution: a single source of
            truth for how code should be written, structured, and tested. Once
            you define your rules, every AI-generated line respects them
            automatically. The time you invest upfront in crafting good rules
            pays back exponentially through faster code reviews, fewer style
            nitpicks in PRs, and more consistent codebases that new team members
            can navigate intuitively.
          </p>
          <p>
            The challenge has always been that writing a comprehensive
            <code>.cursorrules</code> file from scratch is tedious and
            error-prone. Covering every framework, every naming convention, and
            every edge case takes hours of research and debugging. That is
            exactly why we built Cursor Rules Generator — to turn hours of
            manual configuration into a 30-second interactive workflow that
            produces expert-level rules every time.
          </p>

          {/* ---- Topic 2: Our Mission ---- */}
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
            The merging process is designed to handle real-world complexity.
            When two templates specify the same rule — for example, both React
            and TypeScript templates define naming conventions — the engine
            resolves conflicts using a priority system that favors the more
            specific framework. If you select React, TypeScript, and Tailwind
            CSS together, the output file includes a unified code style section
            derived from all three, a React-specific architectural patterns
            section, a TypeScript-specific type discipline section, and a
            Tailwind-specific styling section — all without duplication.
          </p>
          <p>
            Under the hood, each template is a TypeScript module that exports
            structured rule objects organized into categories: code style,
            naming, imports, architecture, testing, documentation, and security.
            The engine reads your selections, collects the relevant rule objects,
            normalizes them into a consistent format, resolves conflicts through
            category-aware merging, and serializes everything into a clean{" "}
            <code>.cursorrules</code> file ready for immediate use.
          </p>
          <p>
            The entire generation process happens in your browser using
            client-side JavaScript. No rules data is ever sent to a server or
            stored externally. You can see a real-time preview of your rules as
            you configure them, download the final <code>.cursorrules</code>{" "}
            file with a single click, and place it directly into your
            project&apos;s root directory. Cursor IDE picks it up instantly.
          </p>

          {/* ---- Topic: Template Quality &amp; Maintenance ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Template Quality &amp; Maintenance
          </h2>
          <p>
            Every template in our library goes through a rigorous quality review
            before being published. We research each framework&apos;s official
            style guides, community conventions, and real-world usage patterns
            from popular open-source projects. The rules we include are not
            generic suggestions — they reflect the actual coding standards that
            experienced developers follow in production. For example, our React
            template enforces functional components with explicit TypeScript
            types, our Go template mandates idiomatic error handling and package
            organization, and our Python template aligns with PEP 8 and modern
            type annotation practices. We do not simply copy-paste documentation
            into a rules file; each rule is written in clear, unambiguous
            language that Cursor IDE interprets consistently.
          </p>
          <p>
            Maintenance is an ongoing commitment. JavaScript frameworks release
            major versions with breaking changes, TypeScript introduces new
            features that shift best practices, and community conventions evolve
            as new patterns emerge. We monitor framework changelogs, community
            discussions on GitHub and Reddit, and industry blog posts to keep our
            templates current. When React 19 introduced Server Components as the
            default, we updated our React and Next.js templates to include rules
            for client and server component boundaries. When Go 1.22 changed loop
            variable semantics, our Go template followed suit. You benefit from
            this continuous maintenance automatically — simply regenerate your
            rules whenever you update your project&apos;s dependencies, and you
            will receive rules that reflect the latest ecosystem standards.
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

          {/* ---- Topic 5: Who Uses Cursor Rules Generator ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Who Uses Cursor Rules Generator
          </h2>
          <p>
            Our tool serves a diverse range of developers and teams. Solo
            developers use it to maintain personal coding standards across side
            projects without spending time manually writing rules for each
            framework. Startup teams rely on it to establish consistent
            conventions early, preventing the chaos that happens when five
            engineers write code in five different styles. Open source
            maintainers include generated <code>.cursorrules</code> files in
            their repositories so contributors automatically follow project
            conventions — reducing the cognitive load of reviewing first-time
            pull requests.
          </p>
          <p>
            Enterprise teams benefit from the template engine&apos;s ability to
            combine multiple tech stacks into a single coherent rules file. A
            team building a React frontend with a Go backend and PostgreSQL
            database can select all three frameworks and get merged rules that
            respect each ecosystem&apos;s idioms while maintaining consistent
            cross-cutting conventions like naming and error handling. The result
            is AI-generated code that looks right whether it hits the frontend,
            backend, or database layer.
          </p>
          <p>
            Educators and coding bootcamp instructors use our generator to
            create standard <code>.cursorrules</code> files that they distribute
            to students. This ensures that every student&apos;s AI assistant
            enforces the same coding standards taught in class, reinforcing
            good habits and making assignment grading more consistent.
          </p>

          {/* ---- Topic: Getting Started ---- */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Getting Started in Under a Minute
          </h2>
          <p>
            Using Cursor Rules Generator is intentionally simple. Start by
            visiting the{" "}
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              generator page
            </Link>
            , where you will see a clean interface with checkboxes for all 21
            tech stacks. Select the frameworks your project uses — you can mix
            frontend and backend stacks freely. Below the framework selector,
            choose your coding style preferences: indentation width, quote style,
            semicolon usage, and naming convention. If you have project-specific
            requirements, type them into the custom rules text area. The
            real-time preview updates instantly as you make changes, so you can
            see exactly what your rules will look like before downloading. Once
            satisfied, click the download button and save the file to your
            project root. Cursor IDE detects it on the next interaction — no
            restart required, no plugins, no accounts, and no payment of any
            kind.
          </p>

          {/* ---- Topic 6: Privacy & Data ---- */}
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
