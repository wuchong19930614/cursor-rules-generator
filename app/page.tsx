import GeneratorForm from '@/components/generator/generator-form';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cursor Rules Generator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Generate customized .cursorrules files for your tech stack in minutes.
            Pick your stack, set your style, and get production-ready AI rules.
          </p>
        </div>

        {/* Generator Form */}
        <GeneratorForm />

        {/* Educational section (placeholder) */}
        <section className="mt-20 mb-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              What are Cursor Rules?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Cursor Rules (.cursorrules) are project-level instructions that
              guide Cursor&apos;s AI to follow your team&apos;s conventions,
              coding style, and best practices — giving you consistent,
              high-quality AI-generated code for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: 'Consistent Code',
                desc: 'Ensure every AI suggestion follows your team\'s naming, formatting, and architectural conventions.',
              },
              {
                title: 'Stack-Aware Rules',
                desc: 'Choose from 21+ tech stacks — each template includes framework-specific best practices and patterns.',
              },
              {
                title: 'Zero Setup',
                desc: 'No configuration files, no dependencies. Just pick your stack, customize, copy, and paste into your project.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
