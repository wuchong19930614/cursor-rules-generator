// __tests__/templates.test.ts
// 模板注册表完整性 + 字段验证 — Day 1 扩展含 frontmatter 适配测试

import { describe, it, expect } from "vitest";
import {
  templateRegistry,
  getTemplate,
  getTemplatesByTags,
} from "@/lib/templates";
import type { CursorRuleTemplate, RuleSection } from "@/lib/templates/types";

describe("templateRegistry", () => {
  it("contains 20+ templates", () => {
    const count = Object.keys(templateRegistry).length;
    expect(count).toBeGreaterThanOrEqual(20);
  });

  it("has unique template ids", () => {
    const ids = Object.values(templateRegistry).map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has >= 3 sections per template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(
        template.sections.length,
        `${template.id}: expected >= 3 sections, got ${template.sections.length}`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("has non-empty name for every template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(template.name.length).toBeGreaterThan(0);
    }
  });

  it("has valid category for every template", () => {
    const validCategories = [
      "frontend",
      "backend",
      "fullstack",
      "mobile",
      "library",
    ];
    for (const template of Object.values(templateRegistry)) {
      expect(validCategories).toContain(template.category);
    }
  });

  it("has unique section ids within each template", () => {
    for (const template of Object.values(templateRegistry)) {
      const ids = template.sections.map((s) => s.id);
      expect(
        new Set(ids).size,
        `${template.id}: duplicate section ids found`
      ).toBe(ids.length);
    }
  });

  it("has non-empty title for every section", () => {
    for (const template of Object.values(templateRegistry)) {
      for (const section of template.sections) {
        expect(
          section.title.length,
          `${template.id}/${section.id}: empty title`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("has non-empty content for every section", () => {
    for (const template of Object.values(templateRegistry)) {
      for (const section of template.sections) {
        expect(
          section.content.length,
          `${template.id}/${section.id}: empty content`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("has at least one tag per template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(
        template.tags.length,
        `${template.id}: expected >= 1 tag`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("has valid defaults for every template", () => {
    for (const template of Object.values(templateRegistry)) {
      const d = template.defaults;
      expect([0, 2, 4]).toContain(d.indentSize);
      expect(typeof d.useTabs).toBe("boolean");
      expect(["single", "double"]).toContain(d.quotes);
      expect(typeof d.semicolons).toBe("boolean");
      expect(["camelCase", "PascalCase", "snake_case"]).toContain(
        d.namingConvention
      );
    }
  });

  it("has tags array for every section", () => {
    for (const template of Object.values(templateRegistry)) {
      for (const section of template.sections) {
        expect(
          Array.isArray(section.tags),
          `${template.id}/${section.id}: tags is not an array`
        ).toBe(true);
      }
    }
  });

  it("has boolean optional for every section", () => {
    for (const template of Object.values(templateRegistry)) {
      for (const section of template.sections) {
        expect(
          typeof section.optional,
          `${template.id}/${section.id}: optional not boolean`
        ).toBe("boolean");
      }
    }
  });

  it("getTemplate returns correct template", () => {
    const t = getTemplate("react");
    expect(t.id).toBe("react");
    expect(t.name).toBe("React");
    expect(t.category).toBe("frontend");
  });

  it("getTemplate throws for missing template", () => {
    expect(() => getTemplate("nonexistent")).toThrow("Template not found");
  });

  it("getTemplatesByTags returns matching templates", () => {
    const results = getTemplatesByTags(["react"]);
    const ids = results.map((t) => t.id);
    expect(ids).toContain("react");
    expect(ids).toContain("nextjs");
  });

  it("getTemplatesByTags returns empty for no match", () => {
    const results = getTemplatesByTags(["nonexistent-tag"]);
    expect(results).toHaveLength(0);
  });

  it("template id matches registry key", () => {
    for (const [key, template] of Object.entries(templateRegistry)) {
      expect(template.id).toBe(key);
    }
  });

  it("contains key templates", () => {
    const ids = Object.keys(templateRegistry);
    const required = [
      "react",
      "nextjs",
      "vue",
      "typescript",
      "python",
      "go",
      "rust",
      "node",
      "django",
      "fastapi",
    ];
    for (const id of required) {
      expect(ids).toContain(id);
    }
  });
});

// ========== Day 1 新增：frontmatter 适配测试 ==========
describe("template frontmatter defaults", () => {
  it("every template has a valid id matching registry key", () => {
    for (const [key, template] of Object.entries(templateRegistry)) {
      expect(template.id).toBe(key);
    }
  });

  it("defaultGlobs is undefined or Record<string, string[]>", () => {
    for (const template of Object.values(templateRegistry)) {
      if (template.defaultGlobs !== undefined) {
        expect(typeof template.defaultGlobs).toBe("object");
        for (const [key, val] of Object.entries(template.defaultGlobs!)) {
          expect(Array.isArray(val)).toBe(true);
          for (const item of val) {
            expect(typeof item).toBe("string");
          }
        }
      }
    }
  });

  it("defaultAlwaysApply is undefined or boolean", () => {
    for (const template of Object.values(templateRegistry)) {
      if (template.defaultAlwaysApply !== undefined) {
        expect(typeof template.defaultAlwaysApply).toBe("boolean");
      }
    }
  });

  it("all sections have non-empty title for description generation", () => {
    for (const template of Object.values(templateRegistry)) {
      for (const section of template.sections) {
        expect(section.title.length).toBeGreaterThan(0);
      }
    }
  });

  it("all 26 templates generate without error in project-rules mode", async () => {
    const { generateProjectRules } = await import("@/lib/generator/engine");
    for (const key of Object.keys(templateRegistry)) {
      const tpl = getTemplate(key);
      const config = {
        selectedTags: [key],
        style: tpl.defaults,
        aiStrictness: "moderate" as const,
        namingConvention: tpl.defaults.namingConvention,
        customRules: [] as { title: string; content: string }[],
        projectType: "web",
        outputMode: "project-rules" as const,
        ruleApplicationMode: "intelligent" as const,
        splitRules: false,
      };
      const files = generateProjectRules(config);
      expect(files.length).toBeGreaterThanOrEqual(1);
      expect(files[0].frontmatter.description.length).toBeGreaterThan(0);
    }
  });

  it("all 26 templates generate without error in agents-md mode", async () => {
    const { generateAgentsMd } = await import("@/lib/generator/engine");
    for (const key of Object.keys(templateRegistry)) {
      const tpl = getTemplate(key);
      const config = {
        selectedTags: [key],
        style: tpl.defaults,
        aiStrictness: "moderate" as const,
        namingConvention: tpl.defaults.namingConvention,
        customRules: [] as { title: string; content: string }[],
        projectType: "web",
        outputMode: "agents-md" as const,
        ruleApplicationMode: "intelligent" as const,
        splitRules: false,
      };
      const output = generateAgentsMd(config);
      expect(output.length).toBeGreaterThan(100);
      expect(output).toContain("# Cursor Rules");
    }
  });

  it("all 26 templates generate without error in legacy mode", async () => {
    const { generateLegacyRules } = await import("@/lib/generator/engine");
    for (const key of Object.keys(templateRegistry)) {
      const tpl = getTemplate(key);
      const config = {
        selectedTags: [key],
        style: tpl.defaults,
        aiStrictness: "moderate" as const,
        namingConvention: tpl.defaults.namingConvention,
        customRules: [] as { title: string; content: string }[],
        projectType: "web",
        outputMode: "legacy" as const,
        ruleApplicationMode: "intelligent" as const,
        splitRules: false,
      };
      const output = generateLegacyRules(config);
      expect(output.length).toBeGreaterThan(100);
      expect(output).toContain("## ");
    }
  });
});
