'use client';

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

export default function StepStyle({
  style,
  aiStrictness,
  namingConvention,
  onStyleChange,
  onAiStrictnessChange,
  onNamingConventionChange,
}: StepStyleProps) {
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
