// __tests__/editorial.test.ts
// editorial 内容完整性校验:所有条目必须结构完整、引用的 slug/tags 真实存在

import { describe, it, expect } from 'vitest';
import { editorialRegistry, getEditorial } from '../lib/templates/editorial';
import { templateRegistry } from '../lib/templates';

const allTemplateTags = new Set(
  Object.values(templateRegistry).flatMap((t) => t.tags)
);

describe('editorialRegistry', () => {
  it('至少包含 react 条目(首批范例)', () => {
    expect(editorialRegistry.react).toBeDefined();
  });

  it('每个条目的 slug 对应真实模板且与注册键一致', () => {
    for (const [slug, editorial] of Object.entries(editorialRegistry)) {
      expect(editorial.slug).toBe(slug);
      expect(templateRegistry[slug], `模板 ${slug} 不存在`).toBeDefined();
    }
  });

  it('每个条目内容完整:intro、designNotes、faq 非空,lastUpdated 是合法日期', () => {
    for (const [slug, editorial] of Object.entries(editorialRegistry)) {
      expect(editorial.intro.length, `${slug} intro`).toBeGreaterThan(0);
      expect(editorial.designNotes.length, `${slug} designNotes`).toBeGreaterThanOrEqual(2);
      expect(editorial.faq.length, `${slug} faq`).toBeGreaterThanOrEqual(3);
      expect(Number.isNaN(new Date(editorial.lastUpdated).getTime())).toBe(false);
      for (const note of editorial.designNotes) {
        expect(note.heading.length, `${slug} designNote heading`).toBeGreaterThan(0);
        expect(note.paragraphs.join('').length, `${slug} designNote body`).toBeGreaterThan(100);
      }
    }
  });

  it('combos 引用的 tags 都是真实存在的模板标签', () => {
    for (const [slug, editorial] of Object.entries(editorialRegistry)) {
      for (const combo of editorial.combos) {
        for (const tag of combo.tags) {
          expect(allTemplateTags.has(tag), `${slug} combo tag "${tag}" 不存在`).toBe(true);
        }
      }
    }
  });

  it('getEditorial 对无 editorial 的模板返回 null', () => {
    expect(getEditorial('zig-nonexistent')).toBeNull();
  });
});
