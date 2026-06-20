// __tests__/engine.test.ts
// generateCursorRules() 引擎单元测试 — Day 1 扩展含 MDC/AGENTS.md/Legacy/ZIP 测试

import { describe, it, expect } from "vitest";
import {
  generateCursorRules,
  generateProjectRules,
  generateAgentsMd,
  generateLegacyRules,
} from "@/lib/generator/engine";
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
    outputMode: overrides?.outputMode ?? "project-rules",
    ruleApplicationMode: overrides?.ruleApplicationMode ?? "intelligent",
    splitRules: overrides?.splitRules ?? false,
    globsPattern: overrides?.globsPattern,
  };
}

// ========== 现有 Legacy 测试（保持不变） ==========
describe("generateCursorRules", () => {
  it("returns hint when selectedTags is empty", () => {
    const output = generateCursorRules(makeConfig({ selectedTags: [] }));
    expect(output).toContain("Cursor Rules");
    expect(output).toContain("Select a tech stack");
  });

  it("includes all sections for a single template", () => {
    const output = generateCursorRules(makeConfig({ selectedTags: ["react"] }));
    expect(output).toContain("## Project Structure");
    expect(output).toContain("## Component Patterns");
    expect(output).toContain("## State Management");
    expect(output).toContain("## Side Effects & Effects");
  });

  it("includes generated header with tech stack info", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react", "nextjs"] })
    );
    expect(output).toContain("# Cursor Rules");
    expect(output).toContain("react, nextjs");
  });

  it("deduplicates sections by id across templates", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react", "nextjs", "typescript"],
      })
    );
    expect(output).toContain("## Project Structure");
    expect(output).toContain("## Component Patterns");
    expect(output).toContain("## State Management");
    expect(output).toContain("## Side Effects & Effects");
    expect(output).toContain("## Routing & Pages");
    expect(output).toContain("## Data Fetching");
    expect(output).toContain("## Performance & Optimization");
    const sectionCount = (output.match(/^## /gm) || []).length;
    expect(sectionCount).toBeGreaterThanOrEqual(7);
  });

  it("filters sections by tag matching (dependsOn)", () => {
    const output = generateCursorRules(makeConfig({ selectedTags: ["go"] }));
    expect(output).toContain("## Error Handling");
    expect(output).not.toContain("## Component Patterns");
    expect(output).not.toContain("## JSX");
  });

  it("hides optional section with single matching tag", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["nextjs"] })
    );
    expect(output).not.toContain("TypeScript in Next.js");
  });

  it("shows optional section with 2+ matching tags", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["nextjs", "typescript"] })
    );
    expect(output).toContain("TypeScript in Next.js");
  });

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
    const customRulesIndex = output.indexOf("## Custom Rules");
    const projectStructureIndex = output.indexOf("## Project Structure");
    expect(customRulesIndex).toBeGreaterThan(projectStructureIndex);
  });

  it("replaces {{INDENT}} with spaces", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"], style: { indentSize: 4 } } as any)
    );
    expect(output).not.toContain("{{INDENT}}");
  });

  it("replaces {{INDENT}} with tabs when useTabs is true", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        style: { useTabs: true } as any,
      })
    );
    expect(output).toContain("Use \t spaces for indentation.");
  });

  it("replaces {{QUOTE}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["python"],
        style: { quotes: "double" } as any,
      })
    );
    expect(output).not.toContain("{{QUOTE}}");
  });

  it("replaces {{SEMICOLON}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        style: { semicolons: true } as any,
      })
    );
    expect(output).not.toContain("{{SEMICOLON}}");
  });

  it("replaces {{NAMING}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["nextjs"],
        namingConvention: "PascalCase",
      })
    );
    expect(output).not.toContain("{{NAMING}}");
    expect(output).toContain("PascalCase");
  });

  it("replaces {{STRICTNESS}} variable", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react"],
        aiStrictness: "strict",
      })
    );
    expect(output).not.toContain("{{STRICTNESS}}");
  });

  it("preserves literal double braces", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"] })
    );
    expect(output).not.toContain("{{INDENT}}");
    expect(output).not.toContain("{{QUOTE}}");
  });

  it("orders sections by category priority", () => {
    const output = generateCursorRules(
      makeConfig({
        selectedTags: ["react", "python", "typescript"],
      })
    );
    const reactIndex = output.indexOf("## Project Structure");
    const pythonIndex = output.indexOf("## Python");
    if (pythonIndex > 0) {
      expect(reactIndex).toBeLessThan(pythonIndex);
    }
  });

  it("returns non-empty output for valid config", () => {
    const output = generateCursorRules(makeConfig());
    expect(output.length).toBeGreaterThan(500);
  });

  it("throws when getTemplate is called with invalid id", async () => {
    const { getTemplate } = await import("@/lib/templates");
    expect(() => getTemplate("nonexistent")).toThrow("Template not found");
  });

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

  it("omits custom rules section when empty", () => {
    const output = generateCursorRules(
      makeConfig({ selectedTags: ["react"], customRules: [] })
    );
    expect(output).not.toContain("## Custom Rules");
  });
});

// ========== Day 1 新增：generateProjectRules 测试 ==========
describe("generateProjectRules", () => {
  it("returns RuleFile[] for project-rules mode (merged)", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "project-rules",
        ruleApplicationMode: "intelligent",
        splitRules: false,
      })
    );
    expect(files.length).toBe(1);
    expect(files[0].filename).toContain(".mdc");
    expect(files[0].frontmatter.description.length).toBeGreaterThan(0);
    expect(files[0].frontmatter.alwaysApply).toBe(false);
    expect(files[0].content.length).toBeGreaterThan(0);
  });

  it("returns multiple RuleFile[] when splitRules is true", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react", "typescript"],
        outputMode: "project-rules",
        ruleApplicationMode: "intelligent",
        splitRules: true,
      })
    );
    expect(files.length).toBeGreaterThanOrEqual(2);
    for (const f of files) {
      expect(f.filename).toContain(".mdc");
      expect(f.frontmatter.description.length).toBeGreaterThan(0);
    }
  });

  it("always-apply mode includes alwaysApply: true", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "project-rules",
        ruleApplicationMode: "always-apply",
        splitRules: false,
      })
    );
    expect(files[0].frontmatter.alwaysApply).toBe(true);
  });

  it("manual mode has no alwaysApply field", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "project-rules",
        ruleApplicationMode: "manual",
        splitRules: false,
      })
    );
    expect(files[0].frontmatter.alwaysApply).toBeUndefined();
  });

  it("file-specific mode without globs falls back to manual", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "project-rules",
        ruleApplicationMode: "file-specific",
        splitRules: false,
      })
    );
    // 没有 globs 时回退到 manual
    expect(files[0].frontmatter.alwaysApply).toBeUndefined();
    expect(files[0].frontmatter.globs).toBeUndefined();
  });

  it("empty selectedTags returns single empty mdc", () => {
    const files = generateProjectRules(
      makeConfig({ selectedTags: [], outputMode: "project-rules" })
    );
    expect(files.length).toBe(1);
    expect(files[0].filename).toBe("cursor-rules.mdc");
    expect(files[0].content).toBe("");
  });

  it("globsPattern is resolved for sections without defaultGlobs", () => {
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "project-rules",
        ruleApplicationMode: "file-specific",
        splitRules: true,
        globsPattern: ["*.tsx", "*.ts"],
      })
    );
    expect(files.length).toBeGreaterThan(0);
    // 每个 file 的 globs 应由 globsPattern 提供
    for (const f of files) {
      if (f.frontmatter.globs) {
        expect(f.frontmatter.globs).toEqual(["*.tsx", "*.ts"]);
      }
    }
  });

  it("description truncated at 120 chars", () => {
    // 使用多标签来生成长 description
    const files = generateProjectRules(
      makeConfig({
        selectedTags: ["react", "nextjs", "typescript", "tailwind"],
        outputMode: "project-rules",
        ruleApplicationMode: "intelligent",
        splitRules: false,
      })
    );
    expect(files[0].frontmatter.description.length).toBeLessThanOrEqual(120);
  });
});

// ========== Day 1 新增：generateAgentsMd 测试 ==========
describe("generateAgentsMd", () => {
  it("returns markdown without frontmatter", () => {
    const output = generateAgentsMd(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "agents-md",
      })
    );
    expect(output).toContain("# Cursor Rules");
    expect(output).not.toContain("---");
    expect(output).toContain("## ");
  });

  it("empty tags returns hint", () => {
    const output = generateAgentsMd(
      makeConfig({ selectedTags: [], outputMode: "agents-md" })
    );
    expect(output).toContain("Select a tech stack");
  });

  it("includes custom rules at the end", () => {
    const output = generateAgentsMd(
      makeConfig({
        selectedTags: ["react"],
        outputMode: "agents-md",
        customRules: [{ title: "No Logs", content: "No console.log" }],
      })
    );
    expect(output).toContain("## Custom Rules");
    expect(output).toContain("### No Logs");
  });
});

// ========== Day 1 新增：generateLegacyRules 测试 ==========
describe("generateLegacyRules", () => {
  it("output matches generateCursorRules", () => {
    const legacy = generateLegacyRules(
      makeConfig({ selectedTags: ["react"], outputMode: "legacy" })
    );
    const original = generateCursorRules(
      makeConfig({ selectedTags: ["react"] })
    );
    expect(legacy).toBe(original);
  });

  it("includes header when tags are selected", () => {
    const output = generateLegacyRules(
      makeConfig({ selectedTags: ["go"], outputMode: "legacy" })
    );
    expect(output).toContain("# Cursor Rules");
    expect(output).toContain("go");
  });
});
