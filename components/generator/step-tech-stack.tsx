'use client';

import { useState, useMemo } from 'react';
import { templateRegistry } from '@/lib/templates';
import type { CursorRuleTemplate } from '@/lib/templates/types';

interface StepTechStackProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

/** 从模板注册表提取所有唯一标签，排除泛用性太强的 */
function getAvailableTags(): { tag: string; templates: CursorRuleTemplate[] }[] {
  const tagMap = new Map<string, CursorRuleTemplate[]>();

  for (const template of Object.values(templateRegistry)) {
    for (const tag of template.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }
      tagMap.get(tag)!.push(template);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, templates]) => ({ tag, templates }))
    .sort((a, b) => {
      // Sort by template count desc, then alpha
      const diff = b.templates.length - a.templates.length;
      return diff !== 0 ? diff : a.tag.localeCompare(b.tag);
    });
}

export default function StepTechStack({
  selectedTags,
  onTagsChange,
}: StepTechStackProps) {
  const [search, setSearch] = useState('');

  const availableTags = useMemo(() => getAvailableTags(), []);

  const filteredTags = useMemo(() => {
    if (!search.trim()) return availableTags;
    const q = search.toLowerCase();
    return availableTags.filter(
      (t) =>
        t.tag.toLowerCase().includes(q) ||
        t.templates.some(
          (tmpl) =>
            tmpl.name.toLowerCase().includes(q) ||
            tmpl.category.toLowerCase().includes(q)
        )
    );
  }, [availableTags, search]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Select Your Tech Stack
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Choose one or more technologies. We&apos;ll generate rules tailored to
          your stack.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tech stacks..."
          className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Search technology stacks"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 self-center mr-1">
            Selected:
          </span>
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
            >
              {tag}
              <button
                type="button"
                onClick={() => toggleTag(tag)}
                className="p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                aria-label={`Remove ${tag}`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available tags grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredTags.map(({ tag, templates }) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`
                flex flex-col items-start gap-0.5
                min-h-[44px] px-3 py-2
                rounded-lg border text-left text-sm
                transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }
              `}
              aria-pressed={isSelected}
            >
              <span className="font-medium">{tag}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                {templates.length} template{templates.length !== 1 ? 's' : ''}
              </span>
            </button>
          );
        })}
      </div>

      {filteredTags.length === 0 && (
        <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center py-4">
          No tech stacks match your search.
        </p>
      )}
    </div>
  );
}
