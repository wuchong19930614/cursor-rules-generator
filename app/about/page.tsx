export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          About Cursor Rules Generator
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cursor Rules Generator is a free, open-source tool that helps
            developers create customized <code>.cursorrules</code> files for
            Cursor IDE. Our interactive wizard lets you select your tech stack,
            set coding style preferences, and generate production-ready AI rules
            in seconds.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Why We Built This
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cursor IDE's <code>.cursorrules</code> system is powerful but
            underdocumented. Most developers either don't use it or write
            minimal rules that don't capture their team's full conventions. We
            built this generator to make best-practice AI rules accessible to
            every developer.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            How It Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our generator combines 21+ framework-specific templates. When you
            select multiple tech stacks, the engine intelligently merges and
            deduplicates best practices, applies your style preferences, and
            produces a clean <code>.cursorrules</code> file.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">
            Open Source
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cursor Rules Generator is open source on{' '}
            <a
              href="https://github.com/wuchong19930614/cursor-rules-generator"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            . Template contributions welcome.
          </p>
        </div>
      </main>
    </div>
  );
}
