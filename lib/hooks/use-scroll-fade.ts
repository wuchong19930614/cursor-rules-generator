'use client';

// lib/hooks/use-scroll-fade.ts
// 给横向可滚动元素(代码块)加边缘渐隐提示:内容本身在可继续滚动的一侧
// 用 CSS mask 淡出,滚到底/顶时渐隐消失。用 mask 而非叠加渐变色块,
// 不需要关心元素背景色,任何背景下都生效。

import { useEffect, useRef } from 'react';

const FADE_WIDTH = '28px';

function updateMask(el: HTMLElement) {
  const { scrollLeft, scrollWidth, clientWidth } = el;
  const canScrollLeft = scrollLeft > 4;
  const canScrollRight = scrollWidth - clientWidth - scrollLeft > 4;

  if (!canScrollLeft && !canScrollRight) {
    el.style.maskImage = '';
    el.style.webkitMaskImage = '';
    return;
  }

  const left = canScrollLeft
    ? `transparent 0, black ${FADE_WIDTH}`
    : 'black 0';
  const right = canScrollRight
    ? `black calc(100% - ${FADE_WIDTH}), transparent 100%`
    : 'black 100%';
  const mask = `linear-gradient(to right, ${left}, ${right})`;
  el.style.maskImage = mask;
  el.style.webkitMaskImage = mask;
}

/** 附加到横向可滚动元素(如 <pre className="overflow-x-auto">)上的 ref */
export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = () => updateMask(el);
    handle();

    el.addEventListener('scroll', handle, { passive: true });
    const resizeObserver = new ResizeObserver(handle);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', handle);
      resizeObserver.disconnect();
    };
  }, []);

  return ref;
}
