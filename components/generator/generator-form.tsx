'use client';

import { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import StepIndicator from './step-indicator';
import StepTechStack from './step-tech-stack';
import StepStyle from './step-style';
import StepRules from './step-rules';
import StepOutput from './step-output';
import RulePreview from './rule-preview';
import { useUrlState } from '@/lib/hooks/use-url-state';
import type { GeneratorConfig, StyleDefaults } from '@/lib/templates/types';
import { templateRegistry } from '@/lib/templates';

const STEPS = [
  { number: 1, label: 'Tech Stack' },
  { number: 2, label: 'Style' },
  { number: 3, label: 'Custom Rules' },
  { number: 4, label: 'Output' },
];

const DEFAULT_STYLE: StyleDefaults = {
  indentSize: 2,
  useTabs: false,
  quotes: 'double',
  semicolons: true,
  namingConvention: 'camelCase',
};

function getDefaultStyle(selectedTags: string[]): StyleDefaults {
  for (const tag of selectedTags) {
    const tpl = Object.values(templateRegistry).find((t) =>
      t.tags.includes(tag)
    );
    if (tpl) return { ...tpl.defaults };
  }
  return { ...DEFAULT_STYLE };
}

function getDefaultNaming(selectedTags: string[]): string {
  const style = getDefaultStyle(selectedTags);
  return style.namingConvention;
}

/** Read URL state outside React lifecycle (safe in client components) */
function readInitialUrlState(): Partial<GeneratorConfig> | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('s');
    if (!encoded) return null;
    const payload = JSON.parse(atob(encoded));
    const customRules = (payload.cr || []).map((item: string) => {
      const colonIdx = item.indexOf(':');
      const title = colonIdx > -1 ? item.slice(0, colonIdx) : item;
      const content = colonIdx > -1 ? item.slice(colonIdx + 1) : '';
      return { title: decodeURIComponent(title), content: decodeURIComponent(content) };
    });
    return {
      selectedTags: payload.t || [],
      style: {
        indentSize: payload.i ?? 2,
        useTabs: payload.tb === 1,
        quotes: payload.q || 'double',
        semicolons: payload.sc === 1,
        namingConvention: payload.n || 'camelCase',
      },
      aiStrictness: payload.as || 'moderate',
      namingConvention: payload.n || 'camelCase',
      customRules,
      projectType: payload.pt || 'web',
    };
  } catch {
    return null;
  }
}

/** Computed once per page load */
const _initialState = readInitialUrlState();

function GeneratorFormInner() {
  const { syncToUrl } = useUrlState();

  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    _initialState?.selectedTags ?? []
  );
  const [style, setStyle] = useState<StyleDefaults>(
    _initialState?.style ?? DEFAULT_STYLE
  );
  const [aiStrictness, setAiStrictness] = useState<'strict' | 'moderate' | 'relaxed'>(
    _initialState?.aiStrictness ?? 'moderate'
  );
  const [namingConvention, setNamingConvention] = useState(
    _initialState?.namingConvention ?? 'camelCase'
  );
  const [customRules, setCustomRules] = useState<
    { title: string; content: string }[]
  >(_initialState?.customRules ?? []);
  const [projectType, setProjectType] = useState(
    _initialState?.projectType ?? 'web'
  );

  const config: GeneratorConfig = useMemo(
    () => ({
      selectedTags,
      style,
      aiStrictness,
      namingConvention,
      customRules,
      projectType,
    }),
    [selectedTags, style, aiStrictness, namingConvention, customRules, projectType]
  );

  // Sync state to URL (debounced), skip initial hydration render
  useEffect(() => {
    if (selectedTags.length === 0) return;
    const timer = setTimeout(() => {
      syncToUrl(config);
    }, 500);
    return () => clearTimeout(timer);
  }, [config, syncToUrl, selectedTags.length]);

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      if (tags.length > 0 && selectedTags.length === 0) {
        setStyle(getDefaultStyle(tags));
        setNamingConvention(getDefaultNaming(tags));
      }
      setSelectedTags(tags);
    },
    [selectedTags]
  );

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return selectedTags.length > 0;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  }, [step, selectedTags]);

  const nextStep = () => {
    if (step < 4 && canProceed) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const restart = () => {
    setStep(1);
    setSelectedTags([]);
    setStyle(DEFAULT_STYLE);
    setAiStrictness('moderate');
    setNamingConvention('camelCase');
    setCustomRules([]);
    setProjectType('web');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={step} steps={STEPS} />

      {/* Current Step */}
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 sm:p-6 bg-white dark:bg-zinc-900 shadow-sm">
        {step === 1 && (
          <StepTechStack
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
        )}
        {step === 2 && (
          <StepStyle
            style={style}
            aiStrictness={aiStrictness}
            namingConvention={namingConvention}
            onStyleChange={setStyle}
            onAiStrictnessChange={setAiStrictness}
            onNamingConventionChange={setNamingConvention}
          />
        )}
        {step === 3 && (
          <StepRules
            customRules={customRules}
            onRulesChange={setCustomRules}
          />
        )}
        {step === 4 && (
          <StepOutput
            config={config}
            onBack={prevStep}
            onRestart={restart}
          />
        )}
      </div>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium
              text-zinc-600 dark:text-zinc-400
              enabled:hover:text-zinc-900 dark:enabled:hover:text-zinc-100
              enabled:hover:bg-zinc-100 dark:enabled:hover:bg-zinc-800
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceed}
            className="min-h-[44px] px-6 py-2 rounded-lg text-sm font-medium
              bg-blue-600 text-white
              hover:bg-blue-700
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors shadow-sm
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            {step === 3 ? 'Generate' : 'Next →'}
          </button>
        </div>
      )}

      {/* Always-visible preview */}
      {selectedTags.length > 0 && (
        <RulePreview config={config} className="mt-4" />
      )}
    </div>
  );
}

export default function GeneratorForm() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
          <div className="h-64 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>
    }>
      <GeneratorFormInner />
    </Suspense>
  );
}
