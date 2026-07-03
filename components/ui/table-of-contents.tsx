'use client';

// components/ui/table-of-contents.tsx
// 长文章页桌面端侧边"On this page"目录:sticky + 滚动高亮当前 section。
// 也顺带把宽屏留白利用起来,同时改善长页面(如模板详情页)的跳转体验。

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/** 把标题文字转成锚点 id,供动态标题(如模板名插值)复用 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function TableOfContents({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // items 引用在每次渲染时是新数组,但页面结构固定,仅需挂载时观察一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        On this page
      </p>
      <ul className="space-y-1 border-l border-zinc-200 dark:border-zinc-800">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors ${
                activeId === item.id
                  ? 'border-blue-500 font-medium text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
