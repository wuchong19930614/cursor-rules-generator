import Link from "next/link";
import GeneratorForm from "@/components/generator/generator-form";
import UsageGuide from "@/components/generator/usage-guide";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main id="main-content" className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Customize Cursor AI Behavior — Generate Project Rules in Seconds
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Define exactly how Cursor IDE&apos;s AI writes code for your project.
            Choose your tech stack, set your conventions, and get a complete rules
            configuration in <strong>Project Rules</strong> (.mdc), <strong>AGENTS.md</strong>,
            or legacy <strong>.cursorrules</strong> format — instantly.
          </p>
          <div className="mt-4">
            <Link
              href="/guides/how-to-use-cursor-rules"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              New to Cursor Rules? Read our step-by-step guide &rarr;
            </Link>
          </div>
        </div>

        {/* Generator Form (Client Component) */}
        <GeneratorForm />

        {/* Usage Guide */}
        <UsageGuide />

        {/* Format Comparison + MDC Example */}
        <section className="mt-20 mb-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          {/* Format Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Which Format Should You Choose?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Cursor IDE supports three formats for customizing AI behavior. Pick the
              one that fits your workflow and team structure.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300 dark:border-zinc-600 text-left">
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">Feature</th>
                    <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">Project Rules (.mdc)</th>
                    <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-50">AGENTS.md</th>
                    <th className="py-3 pl-4 font-semibold text-zinc-900 dark:text-zinc-50">Legacy (.cursorrules)</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">File Location</td>
                    <td className="py-3 px-4"><code>.cursor/rules/</code> directory</td>
                    <td className="py-3 px-4">Project root</td>
                    <td className="py-3 pl-4">Project root</td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">Split Rules</td>
                    <td className="py-3 px-4">
                      <span className="text-green-700 dark:text-green-400 font-medium">Yes</span>
                      {" "}— multiple .mdc files per concern
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-amber-700 dark:text-amber-400 font-medium">Single file</span>
                      {" "}— one AGENTS.md per repo
                    </td>
                    <td className="py-3 pl-4">
                      <span className="text-amber-700 dark:text-amber-400 font-medium">Single file</span>
                      {" "}— one .cursorrules
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">Glob Targeting</td>
                    <td className="py-3 px-4">
                      <span className="text-green-700 dark:text-green-400 font-medium">Built-in</span>
                      {" "}— <code>globs</code> in frontmatter
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-red-700 dark:text-red-400 font-medium">Not supported</span>
                    </td>
                    <td className="py-3 pl-4">
                      <span className="text-red-700 dark:text-red-400 font-medium">Not supported</span>
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">Always Apply</td>
                    <td className="py-3 px-4">
                      <span className="text-green-700 dark:text-green-400 font-medium">Configurable</span>
                      {" "}— per-file via frontmatter
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-blue-700 dark:text-blue-400 font-medium">Always on</span>
                      {" "}— whole file applies
                    </td>
                    <td className="py-3 pl-4">
                      <span className="text-blue-700 dark:text-blue-400 font-medium">Always on</span>
                      {" "}— whole file applies
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">Best For</td>
                    <td className="py-3 px-4">Large projects, monorepos, team conventions per domain</td>
                    <td className="py-3 px-4">Simple projects, open-source repos, quick setup</td>
                    <td className="py-3 pl-4">Existing Cursor users, backward compatibility</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-zinc-800 dark:text-zinc-200">Frontmatter Metadata</td>
                    <td className="py-3 px-4">
                      <span className="text-green-700 dark:text-green-400 font-medium">Full</span>
                      {" "}— description, globs, alwaysApply, version
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-red-700 dark:text-red-400 font-medium">None</span>
                      {" "}— plain markdown only
                    </td>
                    <td className="py-3 pl-4">
                      <span className="text-red-700 dark:text-red-400 font-medium">None</span>
                      {" "}— plain text only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MDC Example */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Project Rules (.mdc) Example
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Project Rules use YAML frontmatter to attach metadata like target file
              patterns and application mode. Here is what a typical .mdc rule file
              looks like:
            </p>
            <pre className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed">
              <code>{`---
description: React component conventions for the frontend team
globs:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
alwaysApply: false
---

# React Component Rules

- Use functional components with TypeScript interfaces for props
- Prefer named exports over default exports
- Keep components under 200 lines; extract hooks and utilities
- Use Tailwind CSS for styling — no inline styles or CSS modules
- Every component file must include a JSDoc description

## State Management

- Use React Context + useReducer for shared state
- Avoid prop drilling beyond 2 levels
- Server state goes through React Query (TanStack Query)`}</code>
            </pre>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-3">
              The frontmatter tells Cursor to apply these rules only to{" "}
              <code>src/components/**/*.tsx</code> and{" "}
              <code>src/pages/**/*.tsx</code> files, not globally. Set{" "}
              <code>alwaysApply: true</code> for conventions that should apply
              everywhere.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
              Why Use Our Generator?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Multi-Format Output",
                  desc: "Generate Project Rules (.mdc), AGENTS.md, or legacy .cursorrules from the same configuration. Switch formats anytime — your rules adapt automatically.",
                },
                {
                  title: "Stack-Aware Rules",
                  desc: (
                    <>
                      Choose from{' '}
                      <Link href="/templates" className="text-blue-600 dark:text-blue-400 hover:underline">
                        26+ tech stacks
                      </Link>{' '}
                      including React, Next.js, Vue, Python, Go, Rust, and more. Each template includes framework-specific best practices and patterns.
                    </>
                  ),
                },
                {
                  title: "Zero Setup",
                  desc: "No configuration files, no dependencies, no accounts. Just pick your stack, customize your preferences, and download ready-to-use rules instantly.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Select Your Tech Stack
                </strong>{" "}
                — Choose one or more technologies from our 26+ templates. The
                generator combines best practices from each stack.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Set Your Style
                </strong>{" "}
                — Configure indentation, quotes, semicolons, naming conventions,
                and AI strictness level to match your team&apos;s preferences.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Pick Your Format
                </strong>{" "}
                — Choose Project Rules (.mdc) for multi-file team workflows,
                AGENTS.md for simple single-file setup, or legacy .cursorrules
                for existing projects.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Add Custom Rules
                </strong>{" "}
                — Include project-specific rules like file structure
                conventions, testing requirements, or documentation standards.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Download &amp; Use
                </strong>{" "}
                — Preview your rules in real-time, then download. Place the file
                in your project and Cursor IDE applies it instantly.
              </li>
            </ol>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What is the difference between Project Rules, AGENTS.md, and .cursorrules?",
                  a: "Project Rules (.mdc) is the modern format with frontmatter metadata, glob-based file targeting, and support for splitting rules into multiple files. AGENTS.md is a single markdown file at the project root — simpler but without glob targeting or metadata. Legacy .cursorrules is Cursor's original plain-text format, still supported but less flexible than Project Rules.",
                },
                {
                  q: "Which format should I use for my project?",
                  a: "Use Project Rules (.mdc) if you work in a team with multiple domains (frontend, backend, infra) and want per-directory rules. Use AGENTS.md for small projects, open-source repos, or when you want a single file that new contributors can read immediately. Use legacy .cursorrules if you are maintaining an existing project that already uses it.",
                },
                {
                  q: "Where do I place the generated files?",
                  a: "Project Rules (.mdc) go in the .cursor/rules/ directory. AGENTS.md and .cursorrules go in your project root directory. Cursor IDE automatically detects all three formats when you open the project.",
                },
                {
                  q: "Can I switch formats later?",
                  a: "Yes! You can regenerate your rules in any format at any time. The same configuration produces consistent output across all three formats — only the file structure and metadata differ.",
                },
                {
                  q: "Is the generator really free?",
                  a: "Yes, completely free. No sign-up, no usage limits, no hidden costs. We believe every developer should have access to well-crafted AI rules. Generate as many files as you need.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    {q}
                  </dt>
                  <dd className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/templates"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Browse all 26+ tech stack templates &rarr;
              </Link>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Learn more about this project &rarr;
              </Link>
              <Link
                href="/guides/how-to-use-cursor-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                How to Use Cursor Rules: Step-by-Step Guide &rarr;
              </Link>
              <Link
                href="/guides/migrate-cursorrules-to-cursor-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Migrate .cursorrules to Project Rules &rarr;
              </Link>
              <Link
                href="/cursor-rules-generator"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Cursor Rules Generator &rarr;
              </Link>
              <Link
                href="/cursor-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                What Are Cursor Rules &rarr;
              </Link>
              <Link
                href="/cursor-project-rules"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Cursor Project Rules &rarr;
              </Link>
              <Link
                href="/agents-md-generator"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                AGENTS.md Generator &rarr;
              </Link>
              <Link
                href="/cursorrules-generator"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                .cursorrules Generator &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
