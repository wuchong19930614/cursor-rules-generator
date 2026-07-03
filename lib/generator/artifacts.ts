// lib/generator/artifacts.ts
// 模板详情页服务端渲染:从单个模板的默认配置生成三种格式的完整产物

import {
  generateProjectRules,
  generateAgentsMd,
  generateLegacyRules,
  formatMdcFile,
} from './engine';
import type { CursorRuleTemplate, GeneratorConfig } from '../templates/types';

export interface RenderedRuleFile {
  filename: string;
  /** frontmatter + body 的完整 .mdc 文本 */
  text: string;
}

export interface TemplateArtifacts {
  projectRules: RenderedRuleFile[];
  agentsMd: string;
  cursorrules: string;
}

/** 模板详情页展示用的默认生成配置(与用户在生成器中只勾选该模板一致) */
export function buildDefaultConfig(template: CursorRuleTemplate): GeneratorConfig {
  return {
    selectedTags: [template.tags[0] || template.id],
    style: { ...template.defaults },
    aiStrictness: 'moderate',
    namingConvention: template.defaults.namingConvention,
    customRules: [],
    projectType: 'web',
    outputMode: 'project-rules',
    ruleApplicationMode: 'intelligent',
    splitRules: true,
  };
}

export function buildTemplateArtifacts(template: CursorRuleTemplate): TemplateArtifacts {
  const config = buildDefaultConfig(template);

  const projectRules = generateProjectRules(config).map((file) => ({
    filename: file.filename,
    text: formatMdcFile(file),
  }));

  return {
    projectRules,
    agentsMd: generateAgentsMd(config),
    cursorrules: generateLegacyRules(config),
  };
}
