'use client';

import { useEffect, useRef, useState } from 'react';
import { trackGeneratorEvent } from '@/lib/analytics';
import { copyTextToClipboard } from '@/lib/browser/clipboard';
import { buildGeneratorShareUrl } from '@/lib/generator/url-state';
import type { GeneratorConfig } from '@/lib/templates/types';

type ShareState = 'idle' | 'copied' | 'error';

export default function ShareButton({ config }: { config: GeneratorConfig }) {
  const [shareState, setShareState] = useState<ShareState>('idle');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  const handleShare = async () => {
    const shareUrl = buildGeneratorShareUrl(config, window.location.href);
    const copied = await copyTextToClipboard(shareUrl);
    setShareState(copied ? 'copied' : 'error');

    if (copied) {
      trackGeneratorEvent('generator_share', {
        output_mode: config.outputMode,
        selected_tag_count: config.selectedTags.length,
      });
    }

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setShareState('idle'), 2500);
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
        aria-label="Copy a shareable configuration link"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          />
        </svg>
        {shareState === 'copied'
          ? 'Link copied'
          : shareState === 'error'
            ? 'Copy failed'
            : 'Copy share link'}
      </button>
      <p className="text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
        {shareState === 'copied'
          ? 'Configuration link copied. Custom rules stay private.'
          : 'Custom rules are excluded for privacy.'}
      </p>
    </div>
  );
}
