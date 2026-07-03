import { Buffer } from "node:buffer";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/json-ld";
import GeneratorForm from "@/components/generator/generator-form";
import RuleOutputTabs from "@/components/templates/rule-output-tabs";
import {
  getBreadcrumbSchema,
  getFAQPageSchemaFromItems,
  getTemplateWebPageSchema,
} from "@/lib/schema";
import { templateRegistry } from "@/lib/templates";
import type { CursorRuleTemplate } from "@/lib/templates/types";
import { buildTemplateArtifacts } from "@/lib/generator/artifacts";
import { getEditorial } from "@/lib/templates/editorial";
import {
  CATEGORY_LABELS,
  buildTemplateFaq,
  getTemplateDescription,
  getTemplateSearchIntents,
} from "@/lib/templates/seo";

const siteUrl = "https://www.cursorgenerator.dev";

type TemplatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(templateRegistry).map((slug) => ({ slug }));
}

function getTemplate(slug: string): CursorRuleTemplate | null {
  return templateRegistry[slug] || null;
}

/** 多标签组合的生成器预选 URL(指向首页生成器) */
function buildComboUrl(tags: string[]): string {
  const encoded = Buffer.from(JSON.stringify({ t: tags })).toString("base64");
  return `/?s=${encoded}`;
}

function getRelatedTemplates(template: CursorRuleTemplate): CursorRuleTemplate[] {
  const sameCategory = Object.values(templateRegistry)
    .filter((item) => item.id !== template.id && item.category === template.category)
    .slice(0, 4);

  if (sameCategory.length >= 4) return sameCategory;

  const sharedTags = Object.values(templateRegistry).filter(
    (item) =>
      item.id !== template.id &&
      !sameCategory.some((related) => related.id === item.id) &&
      item.tags.some((tag) => template.tags.includes(tag))
  );

  return [...sameCategory, ...sharedTags].slice(0, 4);
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};

  const description = `Complete ${template.name} Cursor rules — copy the full Project Rules (.mdc), AGENTS.md, or .cursorrules file, or customize it in the generator. ${getTemplateDescription(template)}`;
  const url = `${siteUrl}/templates/${template.id}`;

  return {
    title: `${template.name} Cursor Rules — Full Template (.mdc, AGENTS.md & .cursorrules)`,
    description,
    alternates: {
      canonical: url,
    },
    keywords: [
      ...getTemplateSearchIntents(template),
      `${template.name} project rules`,
      `${template.name} cursor ai rules`,
    ],
    openGraph: {
      type: "website",
      url,
      title: `${template.name} Cursor Rules — Full Template`,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${template.name} Cursor rules template`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} Cursor Rules — Full Template`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const description = getTemplateDescription(template);
  const searchIntents = getTemplateSearchIntents(template);
  const relatedTemplates = getRelatedTemplates(template);
  const editorial = getEditorial(template.id);
  const faqItems = editorial ? editorial.faq : buildTemplateFaq(template);
  const canonicalUrl = `${siteUrl}/templates/${template.id}`;
  const artifacts = buildTemplateArtifacts(template);
  const presetTags = [template.tags[0] || template.id];
  const requiredSections = template.sections.filter((section) => !section.optional);
  const optionalSections = template.sections.filter((section) => section.optional);
  const lastUpdated = editorial?.lastUpdated;

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Templates", url: `${siteUrl}/templates` },
            { name: `${template.name} Cursor Rules Template`, url: canonicalUrl },
          ])}
        />
        <JsonLd data={getFAQPageSchemaFromItems(faqItems)} />
        <JsonLd
          data={getTemplateWebPageSchema({
            name: `${template.name} Cursor Rules Template`,
            description: `Complete ${template.name} Cursor rules for Project Rules, AGENTS.md, and .cursorrules.`,
            url: canonicalUrl,
            templateName: template.name,
            keywords: searchIntents,
          })}
        />

        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
          <Link href="/templates" className="hover:text-blue-600 dark:hover:text-blue-400">
            Templates
          </Link>
          <span className="px-2">/</span>
          <span>{template.name}</span>
        </nav>

        {/* Header */}
        <section className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {CATEGORY_LABELS[template.category]}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {template.sections.length} sections
            </span>
            {lastUpdated && (
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                · Last updated{" "}
                <time dateTime={lastUpdated}>{lastUpdated}</time>
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {template.name} Cursor Rules Template
          </h1>
          {editorial ? (
            <div className="mt-4 space-y-4">
              {editorial.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Generate production-ready {template.name} Cursor rules for Project Rules (.mdc),
              AGENTS.md, or legacy .cursorrules. This template encodes stack-specific
              conventions for projects using {template.name}. {description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#full-rules"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Copy the Full Rules
            </a>
            <a
              href="#customize"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              Customize &amp; Download
            </a>
          </div>
        </section>

        {/* Full rules in all three formats */}
        <section id="full-rules" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            The Complete {template.name} Cursor Rules
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            The full rule set in all three formats Cursor understands — copy the one
            your project uses. Project Rules (.mdc) load per-file via globs, AGENTS.md
            is portable across AI tools, and .cursorrules is the legacy single-file
            format.
          </p>
          <div className="mt-6">
            <RuleOutputTabs artifacts={artifacts} />
          </div>
        </section>

        {/* Embedded generator preselected to this stack */}
        <section id="customize" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Customize These Rules
          </h2>
          <p className="mt-3 mb-6 text-zinc-600 dark:text-zinc-400">
            The generator below is preloaded with the {template.name} template.
            Adjust indentation, quotes, naming, add your own rules, then download —
            no need to start from scratch on the homepage.
          </p>
          <GeneratorForm presetTags={presetTags} />
        </section>

        {/* What the template covers (real template data) */}
        <section className="mb-12 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            What This Template Covers
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Required guidance</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {requiredSections.map((section) => (
                  <li key={section.id}>- {section.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Default style</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>- Indentation: {template.defaults.useTabs ? "tabs" : `${template.defaults.indentSize} spaces`}</li>
                <li>- Quotes: {template.defaults.quotes}</li>
                <li>- Semicolons: {template.defaults.semicolons ? "enabled" : "disabled"}</li>
                <li>- Naming: {template.defaults.namingConvention}</li>
              </ul>
            </div>
          </div>
          {optionalSections.length > 0 && (
            <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
              Optional sections: {optionalSections.map((section) => section.title).join(", ")}.
            </p>
          )}
        </section>

        {/* Editorial: why these rules */}
        {editorial && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Why These Rules
            </h2>
            <div className="mt-6 space-y-8">
              {editorial.designNotes.map((note) => (
                <div key={note.heading}>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {note.heading}
                  </h3>
                  <div className="mt-3 space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {note.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  {note.bullets && note.bullets.length > 0 && (
                    <ul className="mt-3 list-disc pl-6 space-y-1 text-zinc-600 dark:text-zinc-400">
                      {note.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 40)}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Editorial: common stack combos */}
        {editorial && editorial.combos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Common {template.name} Stack Combinations
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Real projects rarely use {template.name} alone. Each combination below
              opens the generator with the matching templates preselected, merged and
              deduplicated into one rule set.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {editorial.combos.map((combo) => (
                <Link
                  key={combo.label}
                  href={buildComboUrl(combo.tags)}
                  className="rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-700"
                >
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {combo.label}
                  </span>
                  <span className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400">
                    {combo.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Frequently Asked Questions
          </h2>
          <dl className="mt-5 space-y-5">
            {faqItems.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.question}
                </dt>
                <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {relatedTemplates.length > 0 && (
          <section className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Related Cursor Rules Templates
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedTemplates.map((related) => (
                <Link
                  key={related.id}
                  href={`/templates/${related.id}`}
                  className="rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-blue-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-700"
                >
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {related.name}
                  </span>
                  <span className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400">
                    {getTemplateDescription(related)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
