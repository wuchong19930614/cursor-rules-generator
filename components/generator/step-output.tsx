'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import RulePreview from './rule-preview';
import { generateCursorRules } from '@/lib/generator/engine';
import type { GeneratorConfig } from '@/lib/templates/types';

interface StepOutputProps {
  config: GeneratorConfig;
  onBack: () => void;
  onRestart: () => void;
}

type CopyState = 'idle' | 'copied' | 'error';

/** 检测是否为 iOS */
function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
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

export default function StepOutput({ config, onBack, onRestart }: StepOutputProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [downloadState, setDownloadState] = useState<'idle' | 'downloaded'>('idle');

  const content = useMemo(() => generateCursorRules(config), [config]);

  const handleCopy = useCallback(async () => {
    setCopyState('idle');
    const ok = await copyToClipboard(content);
    setCopyState(ok ? 'copied' : 'error');
    if (ok) {
      setTimeout(() => setCopyState('idle'), 2500);
    }
  }, [content]);

  const handleDownload = useCallback(() => {
    const ios = isIOS();
    if (ios) {
      // iOS fallback: copy to clipboard with instructions
      copyToClipboard(content).then((ok) => {
        setCopyState(ok ? 'copied' : 'error');
        if (ok) {
          alert('Copied to clipboard! On iOS, please paste and save as .cursorrules file manually.');
          setTimeout(() => setCopyState('idle'), 2500);
        }
      });
      return;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.cursorrules';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadState('downloaded');
    setTimeout(() => setDownloadState('idle'), 2500);
  }, [content]);

  // Keyboard shortcut: Ctrl/Cmd+C copies preview content
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        // Only intercept when no text is selected (user intends to copy the rule)
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Your .cursorrules is Ready!
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Review your generated rules, then copy or download the file.
        </p>
      </div>

      {/* Preview */}
      <RulePreview config={config} />

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
          {copyState === 'copied' ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : copyState === 'error' ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Copy failed
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2
            border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300
            hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm"
          aria-label="Download .cursorrules file"
        >
          {downloadState === 'downloaded' ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Downloaded!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .cursorrules
            </>
          )}
        </button>
      </div>

      {/* iOS hint */}
      {isIOS() && (
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          On iOS: Download copies to clipboard. Paste and save as .cursorrules
          manually.
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
