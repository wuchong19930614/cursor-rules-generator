'use client';

import { useMemo, useState, useCallback } from 'react';
import {
  generateCursorRules,
  generateProjectRules,
  generateAgentsMd,
} from '@/lib/generator/engine';
import type { GeneratorConfig, RuleFile } from '@/lib/templates/types';
import { trackGeneratorEvent } from '@/lib/analytics';

interface RulePreviewProps {
  config: GeneratorConfig;
  className?: string;
}

type CopyState = 'idle' | 'copied' | 'error';

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.setAttribute('readonly', '');
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through
  }
  return fallbackCopy(text);
}

/** 格式化 RuleFile 为完整 .mdc 文本（含 frontmatter） */
function formatMdcPreview(file: RuleFile): string {
  const lines: string[] = ['---'];
  lines.push(`description: "${file.frontmatter.description.replace(/"/g, '\\"').replace(/\\/g, '\\\\')}"`);
  if (file.frontmatter.globs && file.frontmatter.globs.length > 0) {
    lines.push(`globs: [${file.frontmatter.globs.join(', ')}]`);
  }
  if (file.frontmatter.alwaysApply !== undefined) {
    lines.push(`alwaysApply: ${file.frontmatter.alwaysApply}`);
  }
  lines.push('---');
  if (file.content) {
    lines.push('');
    lines.push(file.content);
  }
  return lines.join('\n');
}

/** 对文本行应用 frontmatter CSS 高亮 */
function renderWithHighlight(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  let inFrontmatter = false;
  let fmStart = false;

  return lines.map((line, i) => {
    if (line === '---') {
      if (!fmStart) {
        fmStart = true;
        inFrontmatter = true;
        return (
          <div key={i} className="fm-delimiter">
            {line}
          </div>
        );
      } else if (inFrontmatter) {
        inFrontmatter = false;
        return (
          <div key={i} className="fm-delimiter">
            {line}
          </div>
        );
      }
    }

    if (inFrontmatter && line.trim()) {
      return (
        <div key={i} className="fm-line">
          {line}
        </div>
      );
    }

    return <div key={i}>{line}</div>;
  });
}

export default function RulePreview({
  config,
  className = '',
}: RulePreviewProps) {
  const outputMode = config.outputMode || 'project-rules';
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // 计算输出
  const legacyOutput = useMemo(
    () => generateCursorRules(config),
    [config]
  );
  const agentsMdOutput = useMemo(
    () => generateAgentsMd(config),
    [config]
  );
  const ruleFiles = useMemo<RuleFile[]>(() => {
    if (outputMode === 'project-rules') {
      return generateProjectRules(config);
    }
    return [];
  }, [config, outputMode]);

  // 多文件预览数据
  const previewFiles = useMemo(() => {
    if (outputMode === 'project-rules' && ruleFiles.length > 0) {
      return ruleFiles.map((f) => formatMdcPreview(f));
    }
    return [];
  }, [outputMode, ruleFiles]);

  // 当前显示的文本
  const currentOutput = useMemo(() => {
    if (outputMode === 'project-rules' && previewFiles.length > 0) {
      const idx = Math.min(activeTab, previewFiles.length - 1);
      return previewFiles[idx];
    }
    if (outputMode === 'agents-md') return agentsMdOutput;
    return legacyOutput;
  }, [outputMode, previewFiles, activeTab, agentsMdOutput, legacyOutput]);

  const lineCount = useMemo(
    () => currentOutput.split('\n').length,
    [currentOutput]
  );
  const charCount = useMemo(() => currentOutput.length, [currentOutput]);

  const handleCopyAll = useCallback(async () => {
    setCopyState('idle');
    const ok = await copyToClipboard(currentOutput);
    setCopyState(ok ? 'copied' : 'error');
    if (ok) {
      trackGeneratorEvent('rules_copy', {
        output_mode: outputMode,
        selected_tag_count: config.selectedTags.length,
        file_count: Math.max(ruleFiles.length, 1),
        surface: 'generator_preview',
      });
      setShowToast(true);
      setTimeout(() => {
        setCopyState('idle');
        setShowToast(false);
      }, 2500);
    }
  }, [config.selectedTags.length, currentOutput, outputMode, ruleFiles.length]);

  const handleClickCopy = useCallback(async () => {
    await handleCopyAll();
  }, [handleCopyAll]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span>Preview</span>
          <span className="hidden sm:inline">
            {lineCount} lines &middot; {charCount.toLocaleString()} chars
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            disabled={copyState === 'copied'}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all
              bg-blue-600 text-white hover:bg-blue-700 disabled:bg-green-600 disabled:cursor-default
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Copy all rules to clipboard"
            title="Copy all rules"
          >
            {copyState === 'copied' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* 多文件 Tab */}
      {outputMode === 'project-rules' && previewFiles.length > 1 && (
        <div className="flex gap-1 overflow-x-auto pb-1">
          {previewFiles.map((_, i) => {
            const f = ruleFiles[i];
            return (
              <button
                key={f.filename}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-t-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[32px]
                  ${
                    i === activeTab
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-t border-l border-r border-zinc-200 dark:border-zinc-700'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
              >
                {f.filename}
              </button>
            );
          })}
        </div>
      )}

      <div className="relative border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900 group/preview">
        <button
          type="button"
          onClick={handleClickCopy}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-md
            bg-zinc-800/70 dark:bg-zinc-200/70 text-zinc-200 dark:text-zinc-800
            opacity-0 group-hover/preview:opacity-100 transition-opacity duration-150
            hover:bg-zinc-800 dark:hover:bg-zinc-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Click to copy rules"
          title="Click to copy"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>

        <pre
          className="p-4 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap break-words cursor-pointer"
          onClick={handleClickCopy}
          title="Click anywhere to copy all rules"
          tabIndex={0}
          role="button"
          aria-label="Click to copy all rules to clipboard"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClickCopy();
            }
          }}
        >
          <code>
            <style>{`
              .fm-delimiter { color: #6b7280; font-weight: 600; }
              .fm-line { background: #f0f0f0; color: #4b5563; }
              @media (prefers-color-scheme: dark) {
                .fm-line { background: #1f2937; color: #9ca3af; }
              }
            `}</style>
            {outputMode === 'project-rules'
              ? renderWithHighlight(currentOutput)
              : currentOutput || '# No rules generated yet.'}
          </code>
        </pre>

        {/* Line numbers overlay */}
        {currentOutput.length > 0 && (
          <div
            className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 pointer-events-none select-none"
            aria-hidden="true"
          >
            <div className="p-4 text-[10px] font-mono text-zinc-300 dark:text-zinc-600 text-right leading-relaxed">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success toast */}
      {showToast && (
        <div
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
            bg-green-600 text-white text-sm font-medium
            animate-[fadeInUp_0.2s_ease-out]"
          role="status"
          aria-live="polite"
        >
          ✓ Copied to clipboard!
        </div>
      )}
    </div>
  );
}
