import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use Cursor Rules — Complete Step-by-Step Guide",
  description:
    "Learn how to create, configure, and use .cursorrules files to get the most out of Cursor IDE's AI assistant. Step-by-step tutorial with examples for React, Python, Go, and more.",
  alternates: {
    canonical: "https://www.cursorgenerator.dev/guides/how-to-use-cursor-rules",
  },
};

export default function HowToUseCursorRulesPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          How to Use Cursor Rules
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
          A complete step-by-step guide to creating, configuring, and using{" "}
          <code>.cursorrules</code> files to supercharge Cursor IDE&apos;s AI
          assistant.
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {/* Prerequisites */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Before You Begin: Prerequisites
          </h2>
          <p>
            To follow this guide, you need Cursor IDE installed on your machine.
            You can download it for free from{" "}
            <a
              href="https://cursor.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              cursor.com
            </a>{" "}
            — it is available for macOS, Windows, and Linux. No account is
            required for basic usage, though signing in enables AI features
            powered by models like GPT-4 and Claude. You should also have a
            project open in Cursor — any codebase will work, whether it is a
            new project or an existing one with hundreds of files.
          </p>
          <p>
            If you are new to Cursor IDE, spend a few minutes familiarizing
            yourself with the AI features: inline code completions (triggered
            automatically as you type), the chat panel (Cmd+L / Ctrl+L), and
            the inline editor (Cmd+K / Ctrl+K). Understanding these interaction
            modes will help you appreciate how <code>.cursorrules</code>{" "}
            influences each one differently — from single-line suggestions to
            multi-file agent operations.
          </p>

          {/* Step 1 */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Step 1: Understand What .cursorrules Does
          </h2>
          <p>
            Before writing any rules, it is important to understand what a{" "}
            <code>.cursorrules</code> file actually does. In Cursor IDE, the AI
            assistant reads your project&apos;s <code>.cursorrules</code> file
            on every interaction — code completions, inline edits, chat
            messages, and agent mode actions. The file serves as a persistent
            system prompt that shapes every AI output to match your team&apos;s
            conventions. Unlike linters or formatters that only validate code
            after it is written, <code>.cursorrules</code> influences code at
            the point of generation, preventing inconsistencies before they
            happen.
          </p>
          <p>
            A well-crafted <code>.cursorrules</code> file can enforce code style
            (indentation, quotes, semicolons), naming conventions (camelCase,
            PascalCase, snake_case), architectural patterns (component
            structure, error handling idioms), testing requirements, and
            framework-specific best practices. For teams, it ensures every
            developer — and every AI interaction — produces code that looks and
            feels consistent.
          </p>

          {/* Step 2 */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Step 2: Generate Your .cursorrules File
          </h2>
          <p>
            The fastest way to create a production-ready{" "}
            <code>.cursorrules</code> file is to use our{" "}
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              interactive generator
            </Link>
            . Select your tech stack — you can pick one or combine multiple
            frameworks like React with TypeScript and Tailwind CSS. Then
            configure your style preferences: indentation (tabs or spaces, 2 or
            4 width), quote style (single or double), semicolon usage, and
            naming conventions. Finally, add any custom rules specific to your
            project, such as file structure requirements, testing mandates, or
            documentation standards.
          </p>
          <p>
            After configuring, you will see a real-time preview of your rules.
            Review it to make sure everything looks correct, then click Download
            to save the file. The generator produces a clean, well-organized{" "}
            <code>.cursorrules</code> file with sections for code style, naming
            conventions, framework-specific patterns, architecture guidelines,
            and testing requirements — all tailored to your stack.
          </p>

          {/* Step 3 */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Step 3: Place the File in Your Project
          </h2>
          <p>
            Save the downloaded <code>.cursorrules</code> file in the root
            directory of your project — the same folder that contains your{" "}
            <code>package.json</code>, <code>go.mod</code>, or{" "}
            <code>Cargo.toml</code>. The leading dot in the filename makes it a
            hidden file on macOS and Linux, keeping your workspace clean. Cursor
            IDE automatically detects the file the next time you open the
            project or reload the window.
          </p>
          <p>
            There is no configuration panel to visit and no plugin to install.
            Simply having the file in your project root is enough. If you want
            to verify that Cursor is reading your rules, open the AI chat panel
            and ask the assistant about your project conventions — it should
            reference the rules you defined.
          </p>

          {/* Step 4 */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Step 4: Test and Iterate
          </h2>
          <p>
            After placing the file, test it by asking Cursor to generate code in
            your project. Try generating a new component, function, or module
            and check whether the output follows your rules. Pay particular
            attention to indentation, quote style, naming conventions, and
            import patterns. If the AI produces code that does not match your
            expectations, review your rules and make them more specific. For
            example, instead of writing &quot;use functional components,&quot;
            write &quot;always use arrow function components with explicit
            TypeScript return types.&quot;
          </p>
          <p>
            Iteration is key. The best <code>.cursorrules</code> files evolve
            with your project. Start with the generated template, use it for a
            few days, and note any AI behaviors that still need adjustment.
            Update the file accordingly, commit the changes, and share them
            with your team. Over time, your rules will become an accurate
            reflection of your team&apos;s actual coding standards.
          </p>

          {/* Step 5 */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Step 5: Share with Your Team
          </h2>
          <p>
            Commit your <code>.cursorrules</code> file to version control so
            every team member benefits from the same AI configuration. When
            someone clones the repository and opens it in Cursor, the AI
            assistant immediately follows the team&apos;s conventions — no
            manual setup required. This is especially valuable for onboarding
            new team members, who get AI assistance that already understands
            your codebase conventions from day one.
          </p>
          <p>
            For organizations with multiple projects using different tech
            stacks, create a separate <code>.cursorrules</code> file for each
            project. Our generator makes it easy to produce unique rules for
            each codebase, ensuring that your React frontend, Go backend, and
            Python data pipeline each get AI assistance tuned to their specific
            ecosystem.
          </p>

          {/* Common Pitfalls */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Common Pitfalls to Avoid
          </h2>
          <p>
            Even experienced developers run into a few common issues when
            setting up <code>.cursorrules</code>. The most frequent mistake is
            writing rules that are too vague — statements like &quot;write clean
            code&quot; give the AI no actionable guidance. Instead, be specific:
            &quot;use 2-space indentation, single quotes, and no semicolons.&quot;
            Another common pitfall is forgetting to add rules for imports and
            file organization. AI assistants tend to add imports in random order
            unless you explicitly specify that imports should be grouped and
            sorted.
          </p>
          <p>
            Teams sometimes create a single massive <code>.cursorrules</code>{" "}
            file that covers every possible framework they might use. This
            dilutes the effectiveness of the rules because the AI spends more
            tokens processing irrelevant instructions. A better approach is to
            create focused rules for each project — a React frontend gets React
            rules, a Go backend gets Go rules, and nothing is wasted on
            irrelevant guidance. Also, do not set the strictness level too high
            during initial setup. Start with a moderate strictness level and
            increase it as you confirm the rules produce the right results.
            Overly strict settings early on can lead to AI refusals for
            legitimate code patterns.
          </p>

          {/* Advanced Tips */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Advanced Configuration Tips
          </h2>
          <p>
            Once your basic rules are in place, consider these advanced
            techniques to get even more from your <code>.cursorrules</code> file.
            Add project-specific context such as your preferred testing framework
            (Jest, Vitest, pytest), your CI pipeline requirements, and any
            internal libraries or conventions that your team relies on. You can
            also include file organization rules — for example, specifying where
            components, utilities, and tests should live in your directory
            structure. The more context you provide, the more precisely the AI
            assistant can generate code that fits your actual workflow rather
            than a generic template.
          </p>
          <p>
            For monorepos and multi-package projects, place a separate{" "}
            <code>.cursorrules</code> file in each package root. Cursor IDE reads
            the rules file closest to the file being edited, allowing each
            package to have its own conventions while sharing a common root-level
            rules file for cross-cutting standards. This layered approach gives
            you fine-grained control without duplicating shared rules across
            every package. You can also reference external documentation or style
            guides within your rules by including URLs that the AI can follow
            when generating code, though this depends on Cursor&apos;s current
            web access capabilities.
          </p>

          {/* Troubleshooting */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Troubleshooting: When Rules Do Not Work as Expected
          </h2>
          <p>
            If the AI consistently ignores certain rules, the most common cause
            is ambiguity. Vague instructions like &quot;write clean code&quot; or
            &quot;follow best practices&quot; give the AI no concrete direction. Rewrite
            the rule with explicit, measurable requirements — specify exactly
            what indentation width, what quote character, and what naming
            pattern the AI must use. If the AI still does not comply, try
            reordering your rules: Cursor processes <code>.cursorrules</code> as
            a single prompt, and instructions near the end can sometimes override
            earlier ones. Move your most important rules to the top of the file
            for maximum impact.
          </p>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700 not-prose">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                &larr; Back to Generator
              </Link>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                About Cursor Rules Generator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
