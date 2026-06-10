'use client';

import { useState, useCallback, useMemo } from 'react';
import StepIndicator from './step-indicator';
import StepTechStack from './step-tech-stack';
import StepStyle from './step-style';
import StepRules from './step-rules';
import StepOutput from './step-output';
import RulePreview from './rule-preview';
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

/** 根据选中的 tags 推导默认风格（取第一个匹配模板的 defaults） */
function getDefaultStyle(selectedTags: string[]): StyleDefaults {
  for (const tag of selectedTags) {
    const tpl = Object.values(templateRegistry).find((t) =>
      t.tags.includes(tag)
    );
    if (tpl) return { ...tpl.defaults };
  }
  return { ...DEFAULT_STYLE };
}

/** 根据选中的 tags 推导命名约定 */
function getDefaultNaming(selectedTags: string[]): string {
  const style = getDefaultStyle(selectedTags);
  return style.namingConvention;
}

export default function GeneratorForm() {
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [style, setStyle] = useState<StyleDefaults>(DEFAULT_STYLE);
  const [aiStrictness, setAiStrictness] = useState<'strict' | 'moderate' | 'relaxed'>('moderate');
  const [namingConvention, setNamingConvention] = useState('camelCase');
  const [customRules, setCustomRules] = useState<
    { title: string; content: string }[]
  >([]);
  const [projectType, setProjectType] = useState('web');

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

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      // When tags change, update default style/naming based on selections
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
              transition-colors"
          >
            ← Previous
          </button>

          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Step {step} of 4
          </span>

          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceed}
            className="min-h-[44px] px-6 py-2 rounded-lg text-sm font-medium
              bg-blue-600 text-white
              hover:bg-blue-700
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors shadow-sm"
          >
            {step === 3 ? 'Generate' : 'Next →'}
          </button>
        </div>
      )}

      {/* Always-visible preview (v1.1: rule-preview 接收 config prop 触发重新生成) */}
      {selectedTags.length > 0 && (
        <RulePreview config={config} className="mt-4" />
      )}
    </div>
  );
}
