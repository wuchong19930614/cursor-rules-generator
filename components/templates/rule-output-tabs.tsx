'use client';

// components/templates/rule-output-tabs.tsx
// 模板详情页:三格式完整产物的 tab 切换展示,每块带一键复制

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import FadeScrollPre from '@/components/ui/fade-scroll-pre';
import type { TemplateArtifacts } from '@/lib/generator/artifacts';
import type { OutputMode } from '@/lib/templates/types';
import { trackGeneratorEvent } from '@/lib/analytics';
import { copyTextToClipboard } from '@/lib/browser/clipboard';

type TabKey = 'project-rules' | 'agents-md' | 'cursorrules';

const TABS: { key: TabKey; label: string; hint: string }[] = [
  { key: 'project-rules', label: 'Project Rules (.mdc)', hint: '.cursor/rules/' },
  { key: 'agents-md', label: 'AGENTS.md', hint: 'project root' },
  { key: 'cursorrules', label: '.cursorrules', hint: 'legacy, project root' },
];

function CopyButton({
  text,
  label,
  outputMode,
}: {
  text: string;
  label: string;
  outputMode: OutputMode;
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const copy = async () => {
    const copied = await copyTextToClipboard(text);
    if (copied) {
      trackGeneratorEvent('rules_copy', {
        output_mode: outputMode,
        selected_tag_count: 1,
        file_count: 1,
        surface: 'template_detail',
      });
    }
    setCopyState(copied ? 'copied' : 'error');
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={
        copyState === 'copied'
          ? `${label} copied`
          : copyState === 'error'
            ? `Failed to copy ${label}`
            : `Copy ${label}`
      }
      aria-live="polite"
      className="min-h-11 rounded-md border border-zinc-600 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
    >
      {copyState === 'copied'
        ? 'Copied ✓'
        : copyState === 'error'
          ? 'Copy failed'
          : 'Copy'}
    </button>
  );
}

function CodeBlock({
  filename,
  text,
  outputMode,
}: {
  filename: string;
  text: string;
  outputMode: OutputMode;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
        <span className="font-mono text-xs text-zinc-400">{filename}</span>
        <CopyButton text={text} label={filename} outputMode={outputMode} />
      </div>
      <FadeScrollPre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{text}</code>
      </FadeScrollPre>
    </div>
  );
}

export default function RuleOutputTabs({
  artifacts,
}: {
  artifacts: TemplateArtifacts;
}) {
  const [active, setActive] = useState<TabKey>('project-rules');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    }
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = TABS.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setActive(TABS[nextIndex].key);
    tabRefs.current[nextIndex]?.focus();
  };

  const activeTabId = `output-tab-${active}`;
  const activePanelId = `output-panel-${active}`;

  return (
    <div>
      <div role="tablist" aria-label="Output format" className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`output-tab-${tab.key}`}
            aria-controls={`output-panel-${tab.key}`}
            aria-selected={active === tab.key}
            tabIndex={active === tab.key ? 0 : -1}
            ref={(element) => {
              tabRefs.current[TABS.indexOf(tab)] = element;
            }}
            onClick={() => setActive(tab.key)}
            onKeyDown={(event) => handleTabKeyDown(event, TABS.indexOf(tab))}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors min-h-[44px] ${
              active === tab.key
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
            }`}
          >
            {tab.label}
            <span className="ml-2 hidden text-xs text-zinc-600 dark:text-zinc-400 sm:inline">
              {tab.hint}
            </span>
          </button>
        ))}
      </div>

      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className="mt-4 space-y-4"
      >
        {active === 'project-rules' &&
          artifacts.projectRules.map((file) => (
            <CodeBlock
              key={file.filename}
              filename={`.cursor/rules/${file.filename}`}
              text={file.text}
              outputMode="project-rules"
            />
          ))}
        {active === 'agents-md' && (
          <CodeBlock
            filename="AGENTS.md"
            text={artifacts.agentsMd}
            outputMode="agents-md"
          />
        )}
        {active === 'cursorrules' && (
          <CodeBlock
            filename=".cursorrules"
            text={artifacts.cursorrules}
            outputMode="legacy"
          />
        )}
      </div>
    </div>
  );
}
