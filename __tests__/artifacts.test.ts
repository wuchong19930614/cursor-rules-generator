// __tests__/artifacts.test.ts
// buildTemplateArtifacts:模板详情页服务端渲染用的三格式完整产物

import { describe, it, expect } from 'vitest';
import { buildTemplateArtifacts } from '../lib/generator/artifacts';
import { templateRegistry } from '../lib/templates';

const react = templateRegistry.react;
const go = templateRegistry.go;

describe('buildTemplateArtifacts', () => {
  it('生成 Project Rules 完整 .mdc 文本(frontmatter + body)', () => {
    const { projectRules } = buildTemplateArtifacts(react);
    expect(projectRules.length).toBeGreaterThan(0);
    for (const file of projectRules) {
      expect(file.filename).toMatch(/\.mdc$/);
      expect(file.text.startsWith('---\ndescription:')).toBe(true);
      expect(file.text).toContain('---');
    }
  });

  it('生成的 AGENTS.md 包含模板全部非 optional section 标题', () => {
    const { agentsMd } = buildTemplateArtifacts(react);
    for (const section of react.sections.filter((s) => !s.optional)) {
      expect(agentsMd).toContain(`## ${section.title}`);
    }
  });

  it('生成的 .cursorrules 以 header 注释开头', () => {
    const { cursorrules } = buildTemplateArtifacts(react);
    expect(cursorrules.startsWith('# Cursor Rules')).toBe(true);
  });

  it('所有产物中的 {{VARIABLE}} 占位符已按模板默认风格替换', () => {
    for (const template of [react, go]) {
      const { projectRules, agentsMd, cursorrules } = buildTemplateArtifacts(template);
      const all = [agentsMd, cursorrules, ...projectRules.map((f) => f.text)].join('\n');
      expect(all).not.toMatch(/\{\{[A-Z_]+\}\}/);
    }
  });

  it('不同模板生成不同的产物', () => {
    expect(buildTemplateArtifacts(react).agentsMd).not.toBe(
      buildTemplateArtifacts(go).agentsMd
    );
  });

  it('对全部 26 个模板都能生成非空产物', () => {
    for (const template of Object.values(templateRegistry)) {
      const artifacts = buildTemplateArtifacts(template);
      expect(artifacts.projectRules.length, template.id).toBeGreaterThan(0);
      expect(artifacts.agentsMd.length, template.id).toBeGreaterThan(50);
      expect(artifacts.cursorrules.length, template.id).toBeGreaterThan(50);
    }
  });

  it('全部 26 个模板的文件名都不重复拼接模板前缀', () => {
    for (const template of Object.values(templateRegistry)) {
      const { projectRules } = buildTemplateArtifacts(template);
      const slug = template.id.toLowerCase();
      for (const file of projectRules) {
        expect(
          file.filename,
          `${template.id} 产出了重复前缀的文件名`
        ).not.toMatch(new RegExp(`^${slug}-${slug}-`));
      }
    }
  });
});
