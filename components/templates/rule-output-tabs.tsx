'use client';

// components/templates/rule-output-tabs.tsx
// 模板详情页:三格式完整产物的 tab 切换展示,每块带一键复制

import { useState } from 'react';
import type { TemplateArtifacts } from '@/lib/generator/artifacts';

type TabKey = 'project-rules' | 'agents-md' | 'cursorrules';

const TABS: { key: TabKey; label: string; hint: string }[] = [
  { key: 'project-rules', label: 'Project Rules (.mdc)', hint: '.cursor/rules/' },
  { key: 'agents-md', label: 'AGENTS.md', hint: 'project root' },
  { key: 'cursorrules', label: '.cursorrules', hint: 'legacy, project root' },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="rounded-md border border-zinc-600 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

function CodeBlock({ filename, text }: { filename: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
        <span className="font-mono text-xs text-zinc-400">{filename}</span>
        <CopyButton text={text} label={filename} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{text}</code>
      </pre>
    </div>
  );
}

export default function RuleOutputTabs({
  artifacts,
}: {
  artifacts: TemplateArtifacts;
}) {
  const [active, setActive] = useState<TabKey>('project-rules');

  return (
    <div>
      <div role="tablist" aria-label="Output format" className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors min-h-[44px] ${
              active === tab.key
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
            }`}
          >
            {tab.label}
            <span className="ml-2 hidden text-xs text-zinc-400 sm:inline">
              {tab.hint}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {active === 'project-rules' &&
          artifacts.projectRules.map((file) => (
            <CodeBlock
              key={file.filename}
              filename={`.cursor/rules/${file.filename}`}
              text={file.text}
            />
          ))}
        {active === 'agents-md' && (
          <CodeBlock filename="AGENTS.md" text={artifacts.agentsMd} />
        )}
        {active === 'cursorrules' && (
          <CodeBlock filename=".cursorrules" text={artifacts.cursorrules} />
        )}
      </div>
    </div>
  );
}
