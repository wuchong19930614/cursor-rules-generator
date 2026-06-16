// lib/templates/index.ts
// 模板注册表 — 按设计文档 3.4 节实现（26 个模板）

import type { CursorRuleTemplate } from './types';
import { reactTemplate } from './react';
import { nextjsTemplate } from './nextjs';
import { vueTemplate } from './vue';
import { typescriptTemplate } from './typescript';
import { pythonTemplate } from './python';
import { svelteTemplate } from './svelte';
import { angularTemplate } from './angular';
import { astroTemplate } from './astro';
import { remixTemplate } from './remix';
import { nuxtTemplate } from './nuxt';
import { goTemplate } from './go';
import { rustTemplate } from './rust';
import { nodeTemplate } from './node';
import { djangoTemplate } from './django';
import { flaskTemplate } from './flask';
import { fastapiTemplate } from './fastapi';
import { reactNativeTemplate } from './react-native';
import { flutterTemplate } from './flutter';
import { tailwindTemplate } from './tailwind';
import { prismaTemplate } from './prisma';
import { dockerTemplate } from './docker';
import { electronTemplate } from './electron';
import { tauriTemplate } from './tauri';
import { bunTemplate } from './bun';
import { zigTemplate } from './zig';
import { solidjsTemplate } from './solidjs';

/** 模板注册表（26 个模板） */
export const templateRegistry: Record<string, CursorRuleTemplate> = {
  // Frontend
  react: reactTemplate,
  nextjs: nextjsTemplate,
  vue: vueTemplate,
  svelte: svelteTemplate,
  angular: angularTemplate,
  astro: astroTemplate,
  tailwind: tailwindTemplate,
  // Fullstack
  remix: remixTemplate,
  nuxt: nuxtTemplate,
  // Backend
  go: goTemplate,
  rust: rustTemplate,
  node: nodeTemplate,
  python: pythonTemplate,
  django: djangoTemplate,
  flask: flaskTemplate,
  fastapi: fastapiTemplate,
  // Mobile
  'react-native': reactNativeTemplate,
  flutter: flutterTemplate,
  // Library / Infrastructure
  typescript: typescriptTemplate,
  prisma: prismaTemplate,
  docker: dockerTemplate,
  // Desktop
  electron: electronTemplate,
  tauri: tauriTemplate,
  // Runtime
  bun: bunTemplate,
  // Systems
  zig: zigTemplate,
  // Frontend
  solidjs: solidjsTemplate,
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
