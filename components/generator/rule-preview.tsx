'use client';

import { useMemo } from 'react';
import { generateCursorRules } from '@/lib/generator/engine';
import type { GeneratorConfig } from '@/lib/templates/types';

interface RulePreviewProps {
  config: GeneratorConfig;
  className?: string;
}

export default function RulePreview({ config, className = '' }: RulePreviewProps) {
  const output = useMemo(() => generateCursorRules(config), [config]);

  const lineCount = useMemo(
    () => output.split('\n').length,
    [output]
  );

  const charCount = useMemo(() => output.length, [output]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
        <span>Preview</span>
        <span>
          {lineCount} lines · {charCount.toLocaleString()} chars
        </span>
      </div>

      <div className="relative border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <pre className="p-4 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap break-words">
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
    </div>
  );
}
