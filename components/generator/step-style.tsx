'use client';

import { useState } from 'react';
import type { StyleDefaults } from '@/lib/templates/types';

interface StepStyleProps {
  style: StyleDefaults;
  aiStrictness: 'strict' | 'moderate' | 'relaxed';
  namingConvention: string;
  onStyleChange: (style: StyleDefaults) => void;
  onAiStrictnessChange: (strictness: 'strict' | 'moderate' | 'relaxed') => void;
  onNamingConventionChange: (convention: string) => void;
}

const INDENT_OPTIONS = [
  { value: 2, label: '2 spaces' },
  { value: 4, label: '4 spaces' },
  { value: 8, label: '8 spaces' },
];

const STRICTNESS_OPTIONS: { value: 'strict' | 'moderate' | 'relaxed'; label: string; description: string }[] = [
  { value: 'strict', label: 'Strict', description: 'Every rule enforced precisely' },
  { value: 'moderate', label: 'Moderate', description: 'Flexible with strong defaults' },
  { value: 'relaxed', label: 'Relaxed', description: 'Guidelines, not strict rules' },
];

const NAMING_CONVENTIONS = [
  'camelCase',
  'PascalCase',
  'snake_case',
  'kebab-case',
];

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: { value: T; label: string; description?: string }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            min-h-[44px] px-3 py-2
            rounded-lg border text-sm text-left
            transition-all duration-150
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            ${
              value === opt.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600'
            }
          `}
        >
          <span className="font-medium">{opt.label}</span>
          {opt.description && (
            <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
              {opt.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

const DEFAULT_STYLE: StyleDefaults = {
  indentSize: 2,
  useTabs: false,
  quotes: 'double',
  semicolons: true,
  namingConvention: 'camelCase',
};
const DEFAULT_AI_STRICTNESS = 'moderate';
const DEFAULT_NAMING = 'camelCase';

/** Check if any style option has been changed from defaults */
function isUsingDefaults(
  style: StyleDefaults,
  aiStrictness: string,
  namingConvention: string
): boolean {
  return (
    style.indentSize === DEFAULT_STYLE.indentSize &&
    style.useTabs === DEFAULT_STYLE.useTabs &&
    style.quotes === DEFAULT_STYLE.quotes &&
    style.semicolons === DEFAULT_STYLE.semicolons &&
    style.namingConvention === DEFAULT_STYLE.namingConvention &&
    aiStrictness === DEFAULT_AI_STRICTNESS &&
    namingConvention === DEFAULT_NAMING
  );
}

export default function StepStyle({
  style,
  aiStrictness,
  namingConvention,
  onStyleChange,
  onAiStrictnessChange,
  onNamingConventionChange,
}: StepStyleProps) {
  const [dismissedHint, setDismissedHint] = useState(false);

  const showDefaultHint = isUsingDefaults(style, aiStrictness, namingConvention) && !dismissedHint;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Coding Style Preferences
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Customize how your code should be formatted.
        </p>
      </div>

      {/* Empty state / default hint */}
      {showDefaultHint && (
        <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-sm text-blue-700 dark:text-blue-300">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="font-medium">Smart defaults applied</p>
            <p className="mt-0.5 text-blue-600/80 dark:text-blue-300/80">
              We&apos;ve picked sensible defaults based on your tech stack. Customize any option below to match your team&apos;s conventions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissedHint(true)}
            className="flex-shrink-0 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
            aria-label="Dismiss hint"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Indentation */}
      <fieldset>
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Indentation
        </legend>
        <SegmentedControl
          options={INDENT_OPTIONS.map((o) => ({ value: o.value.toString(), label: o.label }))}
          value={style.indentSize.toString()}
          onChange={(v) => onStyleChange({ ...style, indentSize: parseInt(v, 10) })}
          name="Indentation size"
        />
      </fieldset>

      {/* Use Tabs */}
      <fieldset className="flex items-center justify-between min-h-[44px]">
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Use tabs instead of spaces
        </legend>
        <button
          type="button"
          role="switch"
          aria-checked={style.useTabs}
          onClick={() => onStyleChange({ ...style, useTabs: !style.useTabs })}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            ${style.useTabs ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
              transition-transform duration-200
              ${style.useTabs ? 'translate-x-6' : 'translate-x-1'}
            `}
            aria-hidden="true"
          />
        </button>
      </fieldset>

      {/* Quotes */}
      <fieldset>
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Quote style
        </legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Quote style">
          {(['single', 'double'] as const).map((q) => (
            <button
              key={q}
              type="button"
              role="radio"
              aria-checked={style.quotes === q}
              onClick={() => onStyleChange({ ...style, quotes: q })}
              className={`
                flex-1 min-h-[44px] px-3 py-2 rounded-lg border text-sm
                transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                ${
                  style.quotes === q
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                }
              `}
            >
              {q === 'single' ? "'single'" : '"double"'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Semicolons */}
      <fieldset className="flex items-center justify-between min-h-[44px]">
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Use semicolons
        </legend>
        <button
          type="button"
          role="switch"
          aria-checked={style.semicolons}
          onClick={() => onStyleChange({ ...style, semicolons: !style.semicolons })}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            ${style.semicolons ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
              transition-transform duration-200
              ${style.semicolons ? 'translate-x-6' : 'translate-x-1'}
            `}
            aria-hidden="true"
          />
        </button>
      </fieldset>

      {/* Naming Convention */}
      <fieldset>
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Naming convention
        </legend>
        <SegmentedControl
          options={NAMING_CONVENTIONS.map((n) => ({ value: n, label: n }))}
          value={namingConvention}
          onChange={onNamingConventionChange}
          name="Naming convention"
        />
      </fieldset>

      {/* AI Strictness */}
      <fieldset>
        <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          AI rule strictness
        </legend>
        <SegmentedControl
          options={STRICTNESS_OPTIONS}
          value={aiStrictness}
          onChange={onAiStrictnessChange}
          name="AI strictness"
        />
      </fieldset>
    </div>
  );
}
