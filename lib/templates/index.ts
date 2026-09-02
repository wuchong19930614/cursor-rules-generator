// lib/templates/index.ts
// 模板注册表 — 按设计文档 3.4 节实现（26 个模板）

export type {
  GeneratorConfig,
  CursorRuleTemplate,
  RuleSection,
  StyleDefaults,
  OutputMode,
  RuleApplicationMode,
  MdcFrontmatter,
  RuleFile,
} from './types';

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
import {
  getDefaultGlobsForTemplates,
  withDefaultGlobs,
} from './default-globs';

/** 模板注册表（26 个模板） */
export const templateRegistry: Record<string, CursorRuleTemplate> = {
  // Frontend
  react: withDefaultGlobs(reactTemplate),
  nextjs: withDefaultGlobs(nextjsTemplate),
  vue: withDefaultGlobs(vueTemplate),
  svelte: withDefaultGlobs(svelteTemplate),
  angular: withDefaultGlobs(angularTemplate),
  astro: withDefaultGlobs(astroTemplate),
  tailwind: withDefaultGlobs(tailwindTemplate),
  // Fullstack
  remix: withDefaultGlobs(remixTemplate),
  nuxt: withDefaultGlobs(nuxtTemplate),
  // Backend
  go: withDefaultGlobs(goTemplate),
  rust: withDefaultGlobs(rustTemplate),
  node: withDefaultGlobs(nodeTemplate),
  python: withDefaultGlobs(pythonTemplate),
  django: withDefaultGlobs(djangoTemplate),
  flask: withDefaultGlobs(flaskTemplate),
  fastapi: withDefaultGlobs(fastapiTemplate),
  // Mobile
  'react-native': withDefaultGlobs(reactNativeTemplate),
  flutter: withDefaultGlobs(flutterTemplate),
  // Library / Infrastructure
  typescript: withDefaultGlobs(typescriptTemplate),
  prisma: withDefaultGlobs(prismaTemplate),
  docker: withDefaultGlobs(dockerTemplate),
  // Desktop
  electron: withDefaultGlobs(electronTemplate),
  tauri: withDefaultGlobs(tauriTemplate),
  // Runtime
  bun: withDefaultGlobs(bunTemplate),
  // Systems
  zig: withDefaultGlobs(zigTemplate),
  // Frontend
  solidjs: withDefaultGlobs(solidjsTemplate),
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

export function getDefaultGlobsByTags(tags: string[]): string[] {
  return getDefaultGlobsForTemplates(getTemplatesByTags(tags));
}
