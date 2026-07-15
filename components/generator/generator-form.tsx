'use client';

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  Suspense,
} from 'react';
import { FolderIcon, DocumentIcon, ArchiveIcon } from './format-icons';
import StepIndicator from './step-indicator';
import StepTechStack from './step-tech-stack';
import StepStyle from './step-style';
import StepRules from './step-rules';
import StepOutput from './step-output';
import RulePreview from './rule-preview';
import { useUrlState } from '@/lib/hooks/use-url-state';
import { trackGeneratorEvent } from '@/lib/analytics';
import { decodeGeneratorUrlState } from '@/lib/generator/url-state';
import type {
  GeneratorConfig,
  StyleDefaults,
  OutputMode,
  RuleApplicationMode,
} from '@/lib/templates/types';
import { templateRegistry } from '@/lib/templates';

/** Step 0 引入的索引偏移量 */
const STEP_OFFSET = 1;

const STEPS = [
  { number: 0, label: 'Output Mode', analyticsName: 'output_mode' },
  { number: 1, label: 'Tech Stack', analyticsName: 'tech_stack' },
  { number: 2, label: 'Style', analyticsName: 'style' },
  { number: 3, label: 'Custom Rules', analyticsName: 'custom_rules' },
  { number: 4, label: 'Output', analyticsName: 'output' },
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
    return decodeGeneratorUrlState(encoded);
  } catch {
    return null;
  }
}

/** Computed once per page load */
const _initialState = readInitialUrlState();

interface GeneratorFormProps {
  /** 页面级预设输出格式(如 /agents-md-generator 预设 agents-md);URL 中的状态优先 */
  presetOutputMode?: OutputMode;
  /** 页面级预选技术栈标签(如 /templates/react 预选 react);URL 中的状态优先 */
  presetTags?: string[];
}

function GeneratorFormInner({ presetOutputMode, presetTags }: GeneratorFormProps) {
  const { syncToUrl } = useUrlState();
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const completedStepsRef = useRef(new Set<number>());

  // 页面已预选技术栈(如模板详情页)且非分享链接恢复时,跳过 Output Mode/Tech
  // Stack 两步,直接进入 Style —— 避免用户重新选一遍已经确定的内容
  const skipToStyle = !_initialState && !!presetTags && presetTags.length > 0;
  const [step, setStep] = useState(skipToStyle ? 2 : 0);
  const [outputMode, setOutputMode] = useState<OutputMode>(
    _initialState?.outputMode ?? presetOutputMode ?? 'project-rules'
  );
  const [ruleApplicationMode, setRuleApplicationMode] =
    useState<RuleApplicationMode>(
      _initialState?.ruleApplicationMode ?? 'intelligent'
    );
  const [splitRules, setSplitRules] = useState(
    _initialState?.splitRules ?? false
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    _initialState?.selectedTags ?? presetTags ?? []
  );
  const [style, setStyle] = useState<StyleDefaults>(
    _initialState?.style ??
      (presetTags && presetTags.length > 0
        ? getDefaultStyle(presetTags)
        : DEFAULT_STYLE)
  );
  const [aiStrictness, setAiStrictness] = useState<
    'strict' | 'moderate' | 'relaxed'
  >(_initialState?.aiStrictness ?? 'moderate');
  const [namingConvention, setNamingConvention] = useState(
    _initialState?.namingConvention ??
      (presetTags && presetTags.length > 0
        ? getDefaultNaming(presetTags)
        : 'camelCase')
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
      outputMode,
      ruleApplicationMode,
      splitRules,
    }),
    [
      selectedTags,
      style,
      aiStrictness,
      namingConvention,
      customRules,
      projectType,
      outputMode,
      ruleApplicationMode,
      splitRules,
    ]
  );

  // Sync state to URL (debounced), skip initial hydration render
  useEffect(() => {
    if (selectedTags.length === 0) return;
    const timer = setTimeout(() => {
      syncToUrl(config);
    }, 500);
    return () => clearTimeout(timer);
  }, [config, syncToUrl, selectedTags.length]);

  const trackStart = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackGeneratorEvent('generator_start', {
      entry_step: step + STEP_OFFSET,
      output_mode: outputMode,
      selected_tag_count: selectedTags.length,
      surface: 'generator',
    });
  }, [outputMode, selectedTags.length, step]);

  const handleOutputModeChange = useCallback(
    (nextMode: OutputMode) => {
      trackStart();
      if (nextMode !== outputMode) {
        trackGeneratorEvent('output_mode_select', {
          output_mode: nextMode,
          previous_output_mode: outputMode,
        });
      }
      setOutputMode(nextMode);
    },
    [outputMode, trackStart]
  );

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      trackStart();
      const added = tags.find((tag) => !selectedTags.includes(tag));
      const removed = selectedTags.find((tag) => !tags.includes(tag));
      const changedTag = added ?? removed;
      if (changedTag) {
        trackGeneratorEvent('template_select', {
          selection_action: added ? 'select' : 'remove',
          selected_tag_count: tags.length,
        });
      }
      if (tags.length > 0 && selectedTags.length === 0) {
        setStyle(getDefaultStyle(tags));
        setNamingConvention(getDefaultNaming(tags));
      }
      setSelectedTags(tags);
    },
    [selectedTags, trackStart]
  );

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return true; // Step 0 总可继续
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

  const totalSteps = 5; // 0-4
  const nextStep = () => {
    if (step >= totalSteps - 1 || !canProceed) return;

    trackStart();
    if (!completedStepsRef.current.has(step)) {
      completedStepsRef.current.add(step);
      trackGeneratorEvent('generator_step_complete', {
        step_number: step + STEP_OFFSET,
        step_name: STEPS[step].analyticsName,
        output_mode: outputMode,
        selected_tag_count: selectedTags.length,
      });
    }

    if (step === 3 && !completedRef.current) {
      completedRef.current = true;
      trackGeneratorEvent('generator_complete', {
        output_mode: outputMode,
        selected_tag_count: selectedTags.length,
        custom_rule_count: customRules.length,
        split_rules: splitRules ? 1 : 0,
      });
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    startedRef.current = false;
    completedRef.current = false;
    completedStepsRef.current.clear();
    setStep(skipToStyle ? 2 : 0);
    setOutputMode(presetOutputMode ?? 'project-rules');
    setRuleApplicationMode('intelligent');
    setSplitRules(false);
    setSelectedTags(presetTags ?? []);
    setStyle(
      presetTags && presetTags.length > 0
        ? getDefaultStyle(presetTags)
        : DEFAULT_STYLE
    );
    setAiStrictness('moderate');
    setNamingConvention(
      presetTags && presetTags.length > 0
        ? getDefaultNaming(presetTags)
        : 'camelCase'
    );
    setCustomRules([]);
    setProjectType('web');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 min-h-[500px]">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={step + STEP_OFFSET}
        steps={STEPS.map((s, i) => ({ number: i + 1, label: s.label }))}
      />

      {/* Current Step */}
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 sm:p-6 bg-white dark:bg-zinc-900 shadow-sm transition-opacity duration-200">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Choose Output Format
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Select the format for your generated Cursor rules.
              </p>
            </div>

            {/* Output Mode Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  {
                    value: 'project-rules' as OutputMode,
                    label: 'Project Rules',
                    desc: '.mdc files in .cursor/rules/',
                    Icon: FolderIcon,
                  },
                  {
                    value: 'agents-md' as OutputMode,
                    label: 'AGENTS.md',
                    desc: 'Single markdown file',
                    Icon: DocumentIcon,
                  },
                  {
                    value: 'legacy' as OutputMode,
                    label: 'Legacy',
                    desc: '.cursorrules (classic)',
                    Icon: ArchiveIcon,
                  },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => handleOutputModeChange(mode.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all min-h-[44px]
                    ${
                      outputMode === mode.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                >
                  <mode.Icon
                    className={`h-6 w-6 mb-1.5 ${
                      outputMode === mode.value
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  />
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {mode.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {mode.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Project Rules 次级选项 */}
            {outputMode === 'project-rules' && (
              <div className="space-y-4 pl-1 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                <div>
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">
                    Application Mode
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        {
                          value: 'always-apply' as RuleApplicationMode,
                          label: 'Always Apply',
                        },
                        {
                          value: 'intelligent' as RuleApplicationMode,
                          label: 'Intelligent',
                        },
                        {
                          value: 'file-specific' as RuleApplicationMode,
                          label: 'File Specific',
                        },
                        {
                          value: 'manual' as RuleApplicationMode,
                          label: 'Manual',
                        },
                      ] as const
                    ).map((am) => (
                      <button
                        key={am.value}
                        type="button"
                        onClick={() => setRuleApplicationMode(am.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all min-h-[44px]
                          ${
                            ruleApplicationMode === am.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                          }
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                      >
                        {am.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Split into multiple files
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={splitRules}
                    onClick={() => setSplitRules(!splitRules)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${
                        splitRules
                          ? 'bg-blue-600'
                          : 'bg-zinc-200 dark:bg-zinc-700'
                      }
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${splitRules ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
            disabled={step === 0}
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

      {/* 实时预览:Output 步骤(4)已经在 StepOutput 内自带预览,这里不重复渲染 */}
      {selectedTags.length > 0 && step !== 4 && (
        <RulePreview config={config} className="mt-4" />
      )}
    </div>
  );
}

export default function GeneratorForm({
  presetOutputMode,
  presetTags,
}: GeneratorFormProps = {}) {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
            <div className="h-64 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      }
    >
      <GeneratorFormInner
        presetOutputMode={presetOutputMode}
        presetTags={presetTags}
      />
    </Suspense>
  );
}
