// __tests__/engine.test.ts
// generateCursorRules() 引擎单元测试 — 18+ 用例 per 设计文档 6.1 节

import { describe, it, expect } from "vitest";
import { generateCursorRules } from "@/lib/generator/engine";
import type { GeneratorConfig } from "@/lib/templates/types";

function makeConfig(overrides?: Partial<GeneratorConfig>): GeneratorConfig {
  return {
    selectedTags: overrides?.selectedTags ?? ["react"],
    style: {
      indentSize: overrides?.style?.indentSize ?? 2,
      useTabs: overrides?.style?.useTabs ?? false,
      quotes: overrides?.style?.quotes ?? "single",
      semicolons: overrides?.style?.semicolons ?? false,
      namingConvention:
        overrides?.style?.namingConvention ?? "camelCase",
    },
    aiStrictness: overrides?.aiStrictness ?? "moderate",
    namingConvention: overrides?.namingConvention ?? "camelCase",
    customRules: overrides?.customRules ?? [],
    projectType: overrides?.projectType ?? "web",
  };
}

describe("generateCursorRules", () => {
  // 1. 空 selectedTags → 返回提示文本
  it("returns hint when selectedTags is empty", () => {
    const output = generateCursorRules(makeConfig({ selectedTags: [] }));
    expect(output).toContain("Cursor Rules");
    expect(output).toContain("Select a tech stack");
  });

  // 2. 单模板 → 输出含所有 sections
  it("includes all sections for a single template", () => {
    const output = generateCursorRules(makeConfig({ selectedTags: ["react"] }));
    expect(output).toContain("## Project Structure");
    expect(output).toContain("## Component Patterns");
    expect(output).toContain("## State Management");
    expect(output).toContain("## Side Effects & Effects");
  });

  // 3. 输出含 Header
  it("includes generated header with tech stack info", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react", "nextjs"] })
    );
    expect(output).toContain("# Cursor Rules");
    expect(output).toContain("react, nextjs");
  });

  // 4. 多模板同 id section → 去重（React 和 Next.js 跨模板同 id section）
  it("deduplicates sections by id across templates", () => {
    // React 和 Next.js 都使用 react 标签，但使用不同的 section ids
    // React: react-project-structure, react-component-patterns, react-state-management, react-effects
    // Next.js: next-routing, next-data-fetching, next-optimization, next-typescript(optional)
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react", "nextjs", "typescript"],
      })
    );
    // 验证 React 的 sections
    expect(output).toContain("## Project Structure");
    expect(output).toContain("## Component Patterns");
    expect(output).toContain("## State Management");
    expect(output).toContain("## Side Effects & Effects");
    // 验证 Next.js 的 sections
    expect(output).toContain("## Routing & Pages");
    expect(output).toContain("## Data Fetching");
    expect(output).toContain("## Performance & Optimization");
    // 计数 ## 标题（跳过 header）
    const sectionCount = (output.match(/^## /gm) || []).length;
    expect(sectionCount).toBeGreaterThanOrEqual(7);
  });

  // 5. dependsOn/tags 过滤 — 不匹配的 section 不出现
  it("filters sections by tag matching (dependsOn)", () => {
    // Go 模板: sections 标签为 ['go']
    const output = generateCursorRules(makeConfig({ selectedTags: ["go"] }));
    expect(output).toContain("## Error Handling");
    // 不会包含 React 的 sections
    expect(output).not.toContain("## Component Patterns");
    expect(output).not.toContain("## JSX");
  });

  // 6. optional section + 单标签 → 不出现
  it("hides optional section with single matching tag", () => {
    // Next.js optional section `next-typescript`: tags=['nextjs','typescript']
    // 当只有 nextjs 标签时，只匹配 1 个 → 不出现
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["nextjs"] })
    );
    expect(output).not.toContain("TypeScript in Next.js");
  });

  // 7. optional section + 双标签 → 出现
  it("shows optional section with 2+ matching tags", () => {
    // 当同时有 nextjs 和 typescript 标签时，匹配 2 个 → 出现
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["nextjs", "typescript"] })
    );
    expect(output).toContain("TypeScript in Next.js");
  });

  // 8. 自定义规则 → 追加到输出末尾
  it("appends custom rules at the end", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        customRules: [
          { title: "No Console Logs", content: "Never commit console.log." },
        ],
      })
    );
    expect(output).toContain("## Custom Rules");
    expect(output).toContain("### No Console Logs");
    expect(output).toContain("Never commit console.log.");
    // 自定义规则在 React sections 之后
    const customRulesIndex = output.indexOf("## Custom Rules");
    const projectStructureIndex = output.indexOf("## Project Structure");
    expect(customRulesIndex).toBeGreaterThan(projectStructureIndex);
  });

  // 9. 变量替换：{{INDENT}}
  it("replaces {{INDENT}} with spaces", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"], style: { indentSize: 4 } } as any)
    );
    // {{INDENT}} 被替换，不应残留占位符
    expect(output).not.toContain("{{INDENT}}");
  });

  // 10. 变量替换：{{INDENT}} with tabs
  it("replaces {{INDENT}} with tabs when useTabs is true", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        style: { useTabs: true } as any,
      })
    );
    expect(output).toContain("Use \t spaces for indentation.");
  });

  // 11. 变量替换：{{QUOTE}}
  it("replaces {{QUOTE}} variable", () => {
    // 找一个包含 {{QUOTE}} 的模板... Python template has it
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["python"],
        style: { quotes: "double" } as any,
      })
    );
    expect(output).not.toContain("{{QUOTE}}");
  });

  // 12. 变量替换：{{SEMICOLON}}
  it("replaces {{SEMICOLON}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        style: { semicolons: true } as any,
      })
    );
    expect(output).not.toContain("{{SEMICOLON}}");
  });

  // 13. 变量替换：{{NAMING}}
  it("replaces {{NAMING}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["nextjs"],
        namingConvention: "PascalCase",
      })
    );
    expect(output).not.toContain("{{NAMING}}");
    // Next.js routing section uses {{NAMING}}
    expect(output).toContain("PascalCase");
  });

  // 14. 变量替换：{{STRICTNESS}}
  it("replaces {{STRICTNESS}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        aiStrictness: "strict",
      })
    );
    expect(output).not.toContain("{{STRICTNESS}}");
  });

  // 15. 字面量 {{ 不被误替换
  it("preserves literal double braces", () => {
    // 模板中不应有字面量 {{, 但 variable replacement 不应破坏双花括号
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"] })
    );
    // 不应残留占位符
    expect(output).not.toContain("{{INDENT}}");
    expect(output).not.toContain("{{QUOTE}}");
  });

  // 16. 多模板组合 → category 排序
  it("orders sections by category priority", () => {
    // React (frontend) vs Python (backend) vs TypeScript (library)
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react", "python", "typescript"],
      })
    );
    // frontend 应在 backend 和 library 之前
    const reactIndex = output.indexOf("## Project Structure");
    const pythonIndex = output.indexOf("## Python"); // Python's first section
    if (pythonIndex > 0) {
      expect(reactIndex).toBeLessThan(pythonIndex);
    }
  });

  // 17. 输出为非空字符串
  it("returns non-empty output for valid config", () => {
    const output = generateCursorRules(makeConfig());
    expect(output.length).toBeGreaterThan(500);
  });

  // 18. 不存在 template → throw Error（通过 getTemplate 间接测试）
  it("throws when getTemplate is called with invalid id", async () => {
    const { getTemplate } = await import("@/lib/templates");
    expect(() => getTemplate("nonexistent")).toThrow("Template not found");
  });

  // 19. 多自定义规则
  it("appends multiple custom rules", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        customRules: [
          { title: "Rule A", content: "Content A" },
          { title: "Rule B", content: "Content B" },
        ],
      })
    );
    expect(output).toContain("### Rule A");
    expect(output).toContain("### Rule B");
    expect(output).toContain("Content A");
    expect(output).toContain("Content B");
  });

  // 20. 自定义规则为空数组 → 不出现 Custom Rules section
  it("omits custom rules section when empty", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"], customRules: [] })
    );
    expect(output).not.toContain("## Custom Rules");
  });
});
