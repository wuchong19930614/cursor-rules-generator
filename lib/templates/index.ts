// lib/templates/index.ts
// 模板注册表 — 按设计文档 3.4 节实现

import type { CursorRuleTemplate } from './types';
import { reactTemplate } from './react';
import { nextjsTemplate } from './nextjs';
import { vueTemplate } from './vue';
import { typescriptTemplate } from './typescript';
import { pythonTemplate } from './python';

/** 模板注册表 */
export const templateRegistry: Record<string, CursorRuleTemplate> = {
  react: reactTemplate,
  nextjs: nextjsTemplate,
  vue: vueTemplate,
  typescript: typescriptTemplate,
  python: pythonTemplate,
};

/**
 * 根据 id 获取模板
 * 不存在则抛出明确的 Error
 */
export function getTemplate(id: string): CursorRuleTemplate {
  const t = templateRegistry[id];
  if (!t) throw new Error(`Template not found: ${id}`);
  return t;
}

/**
 * 根据标签获取匹配的模板列表
 * 模板的 tags 与输入标签有任一交集即匹配
 */
export function getTemplatesByTags(tags: string[]): CursorRuleTemplate[] {
  return Object.values(templateRegistry).filter((t) =>
    t.tags.some((tag) => tags.includes(tag))
  );
}
