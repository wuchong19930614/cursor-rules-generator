// lib/templates/editorial/index.ts
// editorial 注册表:有人工内容的模板在此注册,其余模板页回退到默认展示

import type { TemplateEditorial } from './types';
import { reactEditorial } from './react';
import { nextjsEditorial } from './nextjs';
import { pythonEditorial } from './python';
import { typescriptEditorial } from './typescript';
import { goEditorial } from './go';
import { tailwindEditorial } from './tailwind';

export type {
  TemplateEditorial,
  EditorialSection,
  EditorialFaqItem,
  ComboSuggestion,
} from './types';

export const editorialRegistry: Record<string, TemplateEditorial> = {
  react: reactEditorial,
  nextjs: nextjsEditorial,
  python: pythonEditorial,
  typescript: typescriptEditorial,
  go: goEditorial,
  tailwind: tailwindEditorial,
};

export function getEditorial(slug: string): TemplateEditorial | null {
  return editorialRegistry[slug] ?? null;
}
