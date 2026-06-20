'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import RulePreview from './rule-preview';
import {
  generateCursorRules,
  generateProjectRules,
  generateAgentsMd,
  generateLegacyRules,
  generateZipBlob,
} from '@/lib/generator/engine';
import type { GeneratorConfig, RuleFile } from '@/lib/templates/types';

interface StepOutputProps {
  config: GeneratorConfig;
  onBack: () => void;
  onRestart: () => void;
}

type CopyState = 'idle' | 'copied' | 'error';

/** 检测是否为 iOS */
function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/** fallback: execCommand('copy') via hidden textarea */
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
    // Fall through to execCommand
  }
  return fallbackCopy(text);
}

function downloadBlob(blob: Blob, filename: string): boolean {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

export default function StepOutput({
  config,
  onBack,
  onRestart,
}: StepOutputProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [downloadState, setDownloadState] = useState<
    'idle' | 'downloaded' | 'loading'
  >('idle');
  const [zipError, setZipError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const outputMode = config.outputMode || 'project-rules';

  // 计算输出
  const legacyContent = useMemo(
    () => generateLegacyRules(config),
    [config]
  );
  const agentsMdContent = useMemo(
    () => generateAgentsMd(config),
    [config]
  );
  const ruleFiles = useMemo<RuleFile[]>(() => {
    if (outputMode === 'project-rules') {
      return generateProjectRules(config);
    }
    return [];
  }, [config, outputMode]);

  // 获取当前模式下的文本内容
  const content = useMemo(() => {
    switch (outputMode) {
      case 'agents-md':
        return agentsMdContent;
      case 'legacy':
        return legacyContent;
      default:
        return ruleFiles.length > 0
          ? ruleFiles
              .map(
                (f) =>
                  `---\ndescription: "${f.frontmatter.description.replace(/"/g, '\\"')}"\n---\n\n${f.content}`
              )
              .join('\n\n')
          : '# No rules generated yet.';
    }
  }, [outputMode, legacyContent, agentsMdContent, ruleFiles]);

  // 单文件总行数（用于拆分提醒）
  const totalLines = useMemo(() => {
    if (outputMode !== 'project-rules') return 0;
    return ruleFiles.reduce((sum, f) => sum + f.content.split('\n').length, 0);
  }, [outputMode, ruleFiles]);

  const showSplitBanner =
    outputMode === 'project-rules' &&
    !config.splitRules &&
    ruleFiles.length === 1 &&
    totalLines > 500;

  const handleCopy = useCallback(async () => {
    setCopyState('idle');
    const ok = await copyToClipboard(content);
    setCopyState(ok ? 'copied' : 'error');
    if (ok) {
      setTimeout(() => setCopyState('idle'), 2500);
    }
  }, [content]);

  const handleDownloadSingle = useCallback(
    (filename: string, text: string) => {
      const ios = isIOS();
      if (ios) {
        copyToClipboard(text).then((ok) => {
          setCopyState(ok ? 'copied' : 'error');
          if (ok) {
            alert(
              'Copied to clipboard! On iOS, please paste and save the file manually.'
            );
            setTimeout(() => setCopyState('idle'), 2500);
          }
        });
        return;
      }
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      downloadBlob(blob, filename);
      setDownloadState('downloaded');
      setTimeout(() => setDownloadState('idle'), 2500);
    },
    []
  );

  const handleDownloadZip = useCallback(async () => {
    setZipError(false);
    setDownloadState('loading');
    const blob = await generateZipBlob(ruleFiles);
    if (blob) {
      const projectName = config.projectType || 'project';
      downloadBlob(blob, `${projectName}-cursor-rules.zip`);
      setDownloadState('downloaded');
      setTimeout(() => setDownloadState('idle'), 2500);
    } else {
      setZipError(true);
      setDownloadState('idle');
    }
  }, [ruleFiles, config.projectType]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          e.preventDefault();
          handleCopy();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCopy]);

  const outputLabel = useMemo(() => {
    switch (outputMode) {
      case 'project-rules':
        return 'Project Rules';
      case 'agents-md':
        return 'AGENTS.md';
      case 'legacy':
        return '.cursorrules';
    }
  }, [outputMode]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Your {outputLabel} is Ready!
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Review your generated rules, then copy or download.
        </p>
      </div>

      {/* Split 提醒 */}
      {showSplitBanner && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span className="text-amber-500 text-sm">⚠️</span>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            This file has {totalLines} lines. Consider enabling <strong>Split Rules</strong> in Step 0 for better organization. You can still use the merged file, or go back to enable splitting.
          </p>
        </div>
      )}

      {/* Preview */}
      <RulePreview config={config} />

      {/* ZIP error fallback */}
      {zipError && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <span className="text-red-500 text-sm">⚠️</span>
          <div>
            <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">
              ZIP packaging is unavailable. Please use individual .mdc downloads below.
            </p>
            {ruleFiles.map((f) => (
              <button
                key={f.filename}
                type="button"
                onClick={() =>
                  handleDownloadSingle(
                    f.filename,
                    `---\ndescription: "${f.frontmatter.description.replace(/"/g, '\\"')}"\n---\n\n${f.content}`
                  )
                }
                className="block mt-1 text-xs text-blue-600 dark:text-blue-400 underline hover:no-underline"
              >
                Download {f.filename}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* File list (project-rules multi-file) */}
      {outputMode === 'project-rules' && config.splitRules && ruleFiles.length > 1 && (
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Files ({ruleFiles.length})
          </h3>
          <div className="max-h-40 overflow-y-auto space-y-0.5">
            {ruleFiles.map((f) => (
              <div
                key={f.filename}
                className="flex items-center justify-between px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-xs"
              >
                <span className="font-mono text-zinc-700 dark:text-zinc-300 truncate mr-2">
                  {f.filename}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadSingle(
                      f.filename,
                      `---\ndescription: "${f.frontmatter.description.replace(/"/g, '\\"')}"\n---\n\n${f.content}`
                    )
                  }
                  className="text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          disabled={copyState === 'copied'}
          className="min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2
            bg-blue-600 text-white hover:bg-blue-700 disabled:bg-green-600 disabled:cursor-default shadow-sm"
          aria-label="Copy rules to clipboard"
        >
          {copyState === 'copied'
            ? '✓ Copied!'
            : copyState === 'error'
              ? '⚠ Copy failed'
              : 'Copy to Clipboard'}
        </button>

        {/* Download dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2
              border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300
              hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm"
          >
            {downloadState === 'downloaded'
              ? '✓ Downloaded'
              : downloadState === 'loading'
                ? '⏳ Loading...'
                : 'Download'}
          </button>

          {showDropdown && (
            <div
              className="absolute bottom-full mb-1 left-0 w-56 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg z-30"
              role="menu"
            >
              {outputMode === 'project-rules' && (
                <>
                  {config.splitRules && ruleFiles.length > 1 && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setShowDropdown(false);
                        handleDownloadZip();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      Download ZIP (.zip)
                    </button>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setShowDropdown(false);
                      const filename =
                        ruleFiles.length > 0
                          ? ruleFiles[0].filename
                          : 'cursor-rules.mdc';
                      const text =
                        ruleFiles.length > 0
                          ? `---\ndescription: "${ruleFiles[0].frontmatter.description.replace(/"/g, '\\"')}"\n---\n\n${ruleFiles[0].content}`
                          : '# No rules generated yet.';
                      handleDownloadSingle(filename, text);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    Download .mdc
                  </button>
                </>
              )}
              {outputMode === 'agents-md' && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setShowDropdown(false);
                    handleDownloadSingle('AGENTS.md', agentsMdContent);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Download AGENTS.md
                </button>
              )}
              {outputMode === 'legacy' && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setShowDropdown(false);
                    handleDownloadSingle('.cursorrules', legacyContent);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Download .cursorrules
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* iOS hint */}
      {isIOS() && (
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          On iOS: Download copies to clipboard. Paste and save manually.
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
