'use client';

import { useState } from 'react';

interface CustomRule {
  title: string;
  content: string;
}

interface StepRulesProps {
  customRules: CustomRule[];
  onRulesChange: (rules: CustomRule[]) => void;
}

function Tooltip({ text }: { text: string }) {
  return (
    <span className="absolute left-0 -top-8 z-10 px-2 py-1 rounded text-xs bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800 shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
      {text}
      <span className="absolute left-3 top-full -mt-0.5 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-100" />
    </span>
  );
}

export default function StepRules({
  customRules,
  onRulesChange,
}: StepRulesProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addRule = () => {
    const trimmedTitle = newTitle.trim();
    const trimmedContent = newContent.trim();
    if (!trimmedTitle || !trimmedContent) return;

    onRulesChange([
      ...customRules,
      { title: trimmedTitle, content: trimmedContent },
    ]);
    setNewTitle('');
    setNewContent('');
  };

  const removeRule = (index: number) => {
    onRulesChange(customRules.filter((_, i) => i !== index));
  };

  const updateRule = (
    index: number,
    field: 'title' | 'content',
    value: string
  ) => {
    const updated = [...customRules];
    updated[index] = { ...updated[index], [field]: value };
    onRulesChange(updated);
  };

  const canAdd = newTitle.trim().length > 0 && newContent.trim().length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Custom Rules
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Add your own project-specific rules. Each rule has a title and
          description.
        </p>
      </div>

      {/* Existing rules */}
      {customRules.length > 0 && (
        <ul className="space-y-3" aria-label="Custom rules list">
          {customRules.map((rule, index) => (
            <li
              key={index}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 bg-white dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-2">
                  {/* Title field with tooltip */}
                  <div className="group relative">
                    <input
                      type="text"
                      value={rule.title}
                      onChange={(e) => updateRule(index, 'title', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      placeholder="Rule title"
                      aria-label={`Rule ${index + 1} title`}
                      title="A short, descriptive name for this custom rule (e.g., 'Commit Style', 'Testing Standards')"
                    />
                    <Tooltip text="Rule name — shown as a section heading in your .cursorrules file" />
                  </div>
                  {/* Content field with tooltip */}
                  <div className="group relative">
                    <textarea
                      value={rule.content}
                      onChange={(e) =>
                        updateRule(index, 'content', e.target.value)
                      }
                      rows={2}
                      className="w-full px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 resize-y"
                      placeholder="Rule content"
                      aria-label={`Rule ${index + 1} content`}
                      title="The specific instructions or conventions for this rule (e.g., 'Use conventional commits: feat:, fix:, chore:, docs:')"
                    />
                    <Tooltip text="Rule body — describes exactly what the AI should follow for this convention" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  aria-label={`Remove rule ${index + 1}`}
                  title="Remove this custom rule"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add new rule */}
      <div className="border border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-3 space-y-3 bg-zinc-50/50 dark:bg-zinc-800/50">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Add a custom rule
        </h3>
        <div className="group relative">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Rule title (e.g., Commit Style)"
            className="w-full px-2 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="New rule title"
            title="Give your custom rule a descriptive name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
          <Tooltip text="Short, descriptive name for this rule" />
        </div>
        <div className="group relative">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            placeholder="Rule description (e.g., Use conventional commits: feat, fix, chore...)"
            className="w-full px-2 py-1.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 resize-y"
            aria-label="New rule content"
            title="Describe what the AI should enforce for this convention"
          />
          <Tooltip text="Detailed description of what this rule enforces" />
        </div>
        <button
          type="button"
          onClick={addRule}
          disabled={!canAdd}
          className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          + Add Rule
        </button>
      </div>
    </div>
  );
}
