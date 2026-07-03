'use client';

// components/ui/fade-scroll-pre.tsx
// 横向可滚动的 <pre>,滚动方向用内容渐隐提示可继续滑动。
// 独立成 Client Component,方便在 Server Component 页面里直接替换原生 <pre>。

import type { ReactNode } from 'react';
import { useScrollFade } from '@/lib/hooks/use-scroll-fade';

interface FadeScrollPreProps {
  className?: string;
  children: ReactNode;
}

export default function FadeScrollPre({ className, children }: FadeScrollPreProps) {
  const ref = useScrollFade<HTMLPreElement>();
  return (
    <pre ref={ref} className={className}>
      {children}
    </pre>
  );
}
