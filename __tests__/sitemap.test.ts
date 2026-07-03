// __tests__/sitemap.test.ts
// sitemap lastModified 必须反映各页面真实更新日期,不能全站共用一个硬编码日期

import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';

const baseUrl = 'https://www.cursorgenerator.dev';

function getEntry(url: string) {
  const entry = sitemap().find((item) => item.url === url);
  expect(entry, `sitemap 缺少 ${url}`).toBeDefined();
  return entry!;
}

function isoDate(value: string | Date | undefined): string {
  return new Date(value!).toISOString().slice(0, 10);
}

describe('sitemap lastModified', () => {
  it('about 页使用其真实最后修改日期', () => {
    expect(isoDate(getEntry(`${baseUrl}/about`).lastModified)).toBe('2026-06-16');
  });

  it('两篇指南使用其真实最后修改日期', () => {
    expect(
      isoDate(getEntry(`${baseUrl}/guides/how-to-use-cursor-rules`).lastModified)
    ).toBe('2026-06-24');
    expect(
      isoDate(
        getEntry(`${baseUrl}/guides/migrate-cursorrules-to-cursor-rules`).lastModified
      )
    ).toBe('2026-06-24');
  });

  it('lastModified 不是全站统一的同一个日期', () => {
    const dates = new Set(sitemap().map((item) => isoDate(item.lastModified)));
    expect(dates.size).toBeGreaterThan(1);
  });

  it('每个条目都有 lastModified', () => {
    for (const item of sitemap()) {
      expect(item.lastModified, `${item.url} 缺少 lastModified`).toBeDefined();
    }
  });
});
