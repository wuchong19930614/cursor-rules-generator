import Link from "next/link";
import GeneratorForm from "@/components/generator/generator-form";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main id="main-content" className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cursor Rules Generator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Generate customized <code>.cursorrules</code> files for your tech
            stack in minutes. Pick your stack, set your style, and get
            production-ready AI rules.
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

        {/* Educational Content Section */}
        <section className="mt-20 mb-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          {/* What Are Cursor Rules? */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              What Are Cursor Rules?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Cursor Rules are project-level configuration files that tell
              Cursor IDE&apos;s AI assistant exactly how you want your code to
              be written. When you open a project in Cursor, the AI reads your{" "}
              <code>.cursorrules</code> file and automatically follows your
              team&apos;s conventions — from indentation and naming to
              architecture patterns and library preferences. This means every AI
              suggestion is consistent with your codebase, reducing the time
              spent fixing AI-generated code that doesn&apos;t match your
              standards.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Unlike generic AI coding assistants that produce one-size-fits-all
              output, Cursor with rules becomes a specialized team member who
              understands your stack. Whether you&apos;re building a React
              frontend, a Go microservice, or a Python data pipeline, the AI
              generates code that fits seamlessly into your existing project.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The best part? It&apos;s a single file. Drop it in your project
              root, and Cursor picks it up instantly — no plugins, no
              configuration panels, no complex setup. Just plain text rules that
              work across your entire team.
            </p>
          </div>

          {/* What is a .cursorrules File? */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              What is a <code>.cursorrules</code> File?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              A <code>.cursorrules</code> file is a plain-text configuration
              file that lives in the root directory of your project, right
              alongside files like <code>package.json</code>,{" "}
              <code>go.mod</code>, or <code>Cargo.toml</code>. When you open a
              project in Cursor IDE, the AI assistant automatically detects and
              reads this file, using it to customize every code suggestion and
              generation it produces. Think of it as a system prompt for the AI
              that&apos;s specific to your project and your team&apos;s coding
              standards.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              The file format is flexible — it uses Markdown-style headings to
              organize sections and plain text to describe rules. A typical{" "}
              <code>.cursorrules</code> file defines your preferred code style
              (indentation, quotes, semicolons), naming conventions (camelCase,
              PascalCase, snake_case), framework-specific patterns (React
              hooks rules, Go error handling, Python type hints), and
              architectural constraints (file structure, import order, testing
              requirements). The AI reads all of this context before generating
              any code, ensuring every suggestion is consistent with your
              codebase.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Crucially, the leading dot in the filename makes it a hidden file
              on Unix-based systems (macOS, Linux), keeping your workspace clean
              while still being recognized by Cursor. The file is
              project-specific — different projects can have different rule
              sets, so your React frontend can enforce JSX best practices while
              your Python backend enforces PEP 8 compliance, all without
              conflicts.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Cursor IDE introduced <code>.cursorrules</code> support to address
              a fundamental challenge with AI coding assistants: context. Even
              the most advanced models generate inconsistent code when they
              don&apos;t know your conventions. By providing explicit rules, you
              transform the AI from a generic code generator into a specialized
              team member who writes code that looks like yours — following
              your patterns, using your preferred libraries, and respecting your
              architectural decisions.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Unlike editor settings or ESLint configs that only validate code,{" "}
              <code>.cursorrules</code> actively shapes code generation. Rules
              can specify things like &quot;always use functional components with
              TypeScript interfaces&quot; for React, or &quot;prefer
              channels over mutexes for concurrent operations&quot; for Go —
              guidance that goes beyond what traditional linters can express.
              This makes it the single most impactful file for teams that
              rely on AI-assisted development.
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
                  title: "Consistent Code",
                  desc: "Ensure every AI suggestion follows your team's naming, formatting, and architectural conventions — no more fixing AI-generated code that doesn't match your standards.",
                },
                {
                  title: "Stack-Aware Rules",
                  desc: "Choose from 26+ tech stacks including React, Next.js, Vue, Python, Go, Rust, and more. Each template includes framework-specific best practices and patterns.",
                },
                {
                  title: "Zero Setup",
                  desc: "No configuration files, no dependencies, no accounts. Just pick your stack, customize your preferences, and download a ready-to-use .cursorrules file.",
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
                  Add Custom Rules
                </strong>{" "}
                — Include project-specific rules like file structure
                conventions, testing requirements, or documentation standards.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Download &amp; Use
                </strong>{" "}
                — Preview your rules in real-time, then download the{" "}
                <code>.cursorrules</code> file. Place it in your project root
                and Cursor applies it instantly.
              </li>
            </ol>
          </div>

          {/* Best Practices for Writing .cursorrules */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Best Practices for Writing .cursorrules
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Writing effective <code>.cursorrules</code> files is both an art
              and a science. The best rules are specific enough to guide the AI
              but flexible enough to avoid over-constraining it. Here are the
              key principles we follow when designing our templates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Be explicit about code style.
                </strong>{" "}
                Specify indentation (tabs vs. spaces, width), quote style
                (single vs. double), semicolon usage, and trailing commas. The
                AI is remarkably good at following these mechanical rules when
                they are clearly stated.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Define naming conventions upfront.
                </strong>{" "}
                Tell the AI whether to use camelCase, PascalCase, snake_case, or
                kebab-case for variables, functions, classes, and files.
                Consistent naming is one of the highest-ROI rules you can set.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Include framework-specific patterns.
                </strong>{" "}
                For React, specify hooks rules and component structure. For Go,
                define error handling idioms. For Python, set type hint
                expectations. The more domain-specific your rules, the better
                the AI output.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Keep rules concise and focused.
                </strong>{" "}
                A <code>.cursorrules</code> file should be comprehensive but not
                bloated. Aim for 50-150 lines. If you exceed 200 lines,
                consider whether some rules are redundant or better enforced by
                a linter.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-50">
                  Version your rules alongside your code.
                </strong>{" "}
                Commit your <code>.cursorrules</code> file to version control so
                your entire team uses the same AI configuration. Update it as
                your conventions evolve.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "Where do I place the .cursorrules file?",
                  a: "Place it in the root directory of your project — the same folder that contains your package.json, go.mod, or other project config files. Cursor IDE automatically detects and applies it when you open the project.",
                },
                {
                  q: "Can I have multiple .cursorrules files for different projects?",
                  a: "Yes! Each project gets its own .cursorrules file. This is the recommended approach since different tech stacks and teams have different conventions. Use our generator to create a unique rules file for each project.",
                },
                {
                  q: "Do .cursorrules files work with other AI coding tools?",
                  a: ".cursorrules files are designed specifically for Cursor IDE. Similar concepts exist for other tools — for example, GitHub Copilot uses .github/copilot-instructions.md. Our generated rules focus on Cursor's format and features.",
                },
                {
                  q: "Is the generator really free?",
                  a: "Yes, completely free. No sign-up, no usage limits, no hidden costs. We believe every developer should have access to well-crafted AI rules. Generate as many files as you need.",
                },
                {
                  q: "How often are templates updated?",
                  a: "Templates are maintained to reflect current best practices for each framework. As frameworks evolve and new patterns emerge, we update our templates to keep your rules relevant and effective.",
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
