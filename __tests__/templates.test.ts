// __tests__/templates.test.ts
// 模板注册表完整性 + 字段验证 — per 设计文档 6.1 节

import { describe, it, expect } from "vitest";
import {
  templateRegistry,
  getTemplate,
  getTemplatesByTags,
} from "@/lib/templates";
import type { CursorRuleTemplate, RuleSection } from "@/lib/templates/types";

describe("templateRegistry", () => {
  // 1. 注册表 ≥ 20 模板
  it("contains 20+ templates", () => {
    const count = Object.keys(templateRegistry).length;
    expect(count).toBeGreaterThanOrEqual(20);
  });

  // 2. 所有模板有唯一 id
  it("has unique template ids", () => {
    const ids = Object.values(templateRegistry).map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // 3. 所有模板至少 3 个 sections
  it("has >= 3 sections per template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(
        template.sections.length,
        `${template.id}: expected >= 3 sections, got ${template.sections.length}`
      ).toBeGreaterThanOrEqual(3);
    }
  });

  // 4. 所有模板有非空 name
  it("has non-empty name for every template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(template.name.length).toBeGreaterThan(0);
    }
  });

  // 5. 所有模板 category 有效
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

  // 6. Section id 在模板内唯一
  it("has unique section ids within each template", () => {
    for (const template of Object.values(templateRegistry)) {
      const ids = template.sections.map((s) => s.id);
      expect(
        new Set(ids).size,
        `${template.id}: duplicate section ids found`
      ).toBe(ids.length);
    }
  });

  // 7. Section 有非空 title
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

  // 8. Section 有非空 content
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

  // 9. 所有模板有 ≥ 1 个 tag
  it("has at least one tag per template", () => {
    for (const template of Object.values(templateRegistry)) {
      expect(
        template.tags.length,
        `${template.id}: expected >= 1 tag`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  // 10. defaults 字段有效
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

  // 11. 每个 section 有 tags 字段（至少为空数组）
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

  // 12. optional 是 boolean
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

  // 13. getTemplate 正常情况
  it("getTemplate returns correct template", () => {
    const t = getTemplate("react");
    expect(t.id).toBe("react");
    expect(t.name).toBe("React");
    expect(t.category).toBe("frontend");
  });

  // 14. getTemplate 不存在 → throw
  it("getTemplate throws for missing template", () => {
    expect(() => getTemplate("nonexistent")).toThrow("Template not found");
  });

  // 15. getTemplatesByTags 匹配
  it("getTemplatesByTags returns matching templates", () => {
    const results = getTemplatesByTags(["react"]);
    const ids = results.map((t) => t.id);
    expect(ids).toContain("react");
    expect(ids).toContain("nextjs"); // nextjs has 'react' tag
  });

  // 16. getTemplatesByTags 不匹配
  it("getTemplatesByTags returns empty for no match", () => {
    const results = getTemplatesByTags(["nonexistent-tag"]);
    expect(results).toHaveLength(0);
  });

  // 17. 所有模板 id 匹配注册表 key
  it("template id matches registry key", () => {
    for (const [key, template] of Object.entries(templateRegistry)) {
      expect(template.id).toBe(key);
    }
  });

  // 18. 关键模板存在
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
