'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { templateRegistry } from '@/lib/templates';
import type { CursorRuleTemplate } from '@/lib/templates/types';
import {
  CATEGORY_LABELS,
  TEMPLATE_DESCRIPTIONS,
} from '@/lib/templates/seo';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Fullstack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'library', label: 'Library' },
] as const;

type CategoryValue = (typeof CATEGORIES)[number]['value'];

const TEMPLATES = Object.values(templateRegistry);

function encodeBase64(value: string): string {
  if (typeof window !== 'undefined') return window.btoa(value);

  const globalWithBuffer = globalThis as typeof globalThis & {
    Buffer?: {
      from: (input: string) => {
        toString: (encoding: 'base64') => string;
      };
    };
  };

  return globalWithBuffer.Buffer?.from(value).toString('base64') ?? '';
}

function buildPreSelectUrl(template: CursorRuleTemplate): string {
  const tag = template.tags[0] || template.id;
  const payload = JSON.stringify({ t: [tag] });
  const encoded = encodeBase64(payload);
  return `/?s=${encoded}`;
}

function TemplatesHubInner() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get('q') ?? '';
  const [activeCategory, setActiveCategory] = useState<CategoryValue>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      const matchCategory =
        activeCategory === 'all' || tpl.category === activeCategory;
      if (!matchCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = tpl.name.toLowerCase().includes(q);
        const descMatch = (TEMPLATE_DESCRIPTIONS[tpl.id] || '').toLowerCase().includes(q);
        const tagMatch = tpl.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!nameMatch && !descMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: TEMPLATES.length };
    for (const cat of CATEGORIES) {
      if (cat.value === 'all') continue;
      counts[cat.value] = TEMPLATES.filter((t) => t.category === cat.value).length;
    }
    return counts;
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Templates Hub — {TEMPLATES.length}+ Tech Stacks
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Browse all available Cursor Rules templates. Select a tech stack to
            generate customized AI rules for your project in Project Rules (.mdc),
            AGENTS.md, or legacy .cursorrules format.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all min-h-[44px]
                ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900'
                }
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-70">
                ({countByCategory[cat.value]})
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search templates by name, tag, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 text-center">
          Showing {filteredTemplates.length} of {TEMPLATES.length} templates
          {searchQuery && (
            <>
              {' '}matching &ldquo;{searchQuery}&rdquo;
            </>
          )}
        </p>

        {/* Template Cards Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
            <p className="text-lg">No templates match your search.</p>
            <p className="text-sm mt-2">
              Try a different keyword or clear the category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                id={`template-${tpl.id}`}
                className="group rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600 transition-all scroll-mt-20"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {CATEGORY_LABELS[tpl.category] || tpl.category}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {tpl.sections.length} sections
                  </span>
                </div>

                {/* Template Name */}
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  <Link
                    href={`/templates/${tpl.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tpl.name}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {TEMPLATE_DESCRIPTIONS[tpl.id] || 'Cursor AI rules template with best practices and conventions.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tpl.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {tpl.tags.length > 5 && (
                    <span className="text-xs px-2 py-0.5 text-zinc-400">
                      +{tpl.tags.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/templates/${tpl.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    View Template
                  </Link>
                  <Link
                    href={buildPreSelectUrl(tpl)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Generate Rules
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Ready to generate your rules?
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go to Generator &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function TemplatesHub() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
          <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
            <div className="h-10 w-64 rounded-lg bg-zinc-100 dark:bg-zinc-800 mx-auto animate-pulse" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-48 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 animate-pulse"
                />
              ))}
            </div>
          </main>
        </div>
      }
    >
      <TemplatesHubInner />
    </Suspense>
  );
}
