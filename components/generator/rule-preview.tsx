'use client';

import { useMemo, useState, useCallback } from 'react';
import { generateCursorRules } from '@/lib/generator/engine';
import type { GeneratorConfig } from '@/lib/templates/types';

interface RulePreviewProps {
  config: GeneratorConfig;
  className?: string;
}

type CopyState = 'idle' | 'copied' | 'error';
type DownloadState = 'idle' | 'downloaded';

/** 检测是否为 iOS */
function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

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

export default function RulePreview({ config, className = '' }: RulePreviewProps) {
  const output = useMemo(() => generateCursorRules(config), [config]);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const [showToast, setShowToast] = useState(false);

  const lineCount = useMemo(() => output.split('\n').length, [output]);
  const charCount = useMemo(() => output.length, [output]);

  const handleCopyAll = useCallback(async () => {
    setCopyState('idle');
    const ok = await copyToClipboard(output);
    setCopyState(ok ? 'copied' : 'error');
    if (ok) {
      setShowToast(true);
      setTimeout(() => {
        setCopyState('idle');
        setShowToast(false);
      }, 2500);
    }
  }, [output]);

  const handleClickCopy = useCallback(async () => {
    // Same as copy all — copies entire content on click
    await handleCopyAll();
  }, [handleCopyAll]);

  const handleDownload = useCallback(() => {
    const ios = isIOS();
    if (ios) {
      copyToClipboard(output).then((ok) => {
        if (ok) {
          setCopyState('copied');
          setShowToast(true);
          setTimeout(() => {
            setCopyState('idle');
            setShowToast(false);
          }, 2500);
        }
      });
      return;
    }

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
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
  }, [output]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span>Preview</span>
          <span className="hidden sm:inline">
            {lineCount} lines &middot; {charCount.toLocaleString()} chars
          </span>
        </div>

        {/* Action buttons */}
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
            {copyState === 'copied' ? (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all
              border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400
              hover:bg-zinc-50 dark:hover:bg-zinc-800
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Download .cursorrules file"
            title="Download as .cursorrules"
          >
            {downloadState === 'downloaded' ? (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Done
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </>
            )}
          </button>
        </div>
      </div>

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
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
          <code>{output || '# No rules generated yet.'}</code>
        </pre>

        {/* Line numbers overlay on larger screens */}
        {output.length > 0 && (
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
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
