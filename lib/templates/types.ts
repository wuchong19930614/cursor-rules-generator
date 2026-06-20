// lib/templates/types.ts
// 按设计文档 3.3 节定义的模板系统类型
// Day 1: 扩展为支持 Cursor Project Rules 多格式输出

export interface StyleDefaults {
  indentSize: number;
  useTabs: boolean;
  quotes: 'single' | 'double';
  semicolons: boolean;
  namingConvention: 'camelCase' | 'PascalCase' | 'snake_case';
}

export interface RuleSection {
  /** 唯一标识，用于去重 */
  id: string;
  /** Section 标题 */
  title: string;
  /** 模板内容，含 {{VARIABLE}} 占位符 */
  content: string;
  /** 是否为可选 section */
  optional: boolean;
  /** 此 section 适用的技术栈标签，用于 dependsOn 过滤 */
  tags: string[];
}

// === Day 1 新增类型 ===

/** 输出模式 */
export type OutputMode = 'project-rules' | 'agents-md' | 'legacy';

/** 规则应用模式 */
export type RuleApplicationMode = 'always-apply' | 'intelligent' | 'file-specific' | 'manual';

/** MDC Frontmatter — YAML 序列化策略：多行/含冒号文本使用 quoted scalar */
export interface MdcFrontmatter {
  /** 必填，写入 YAML 时自动转义（quoted scalar 包裹） */
  description: string;
  /** 可选，YAML 数组格式 [*.tsx, *.ts]；非逗号分隔字符串 */
  globs?: string[];
  /** true = Always Apply, false = Intelligent, 无此字段 = Manual */
  alwaysApply?: boolean;
}

/** 规则文件（一个 section 对应一个 .mdc 文件） */
export interface RuleFile {
  /** 文件名，如 "react-patterns.mdc" */
  filename: string;
  /** YAML frontmatter */
  frontmatter: MdcFrontmatter;
  /** markdown body */
  content: string;
}

export interface CursorRuleTemplate {
  /** 模板唯一标识 */
  id: string;
  /** 模板显示名称 */
  name: string;
  /** 模板分类 */
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'library';
  /** 模板中的 sections */
  sections: RuleSection[];
  /** 默认风格设置 */
  defaults: StyleDefaults;
  /** 技术栈标签 */
  tags: string[];
  /** Day 1 新增: sectionId → 推荐 globs 数组 */
  defaultGlobs?: Record<string, string[]>;
  /** Day 1 新增: 默认应用模式 */
  defaultAlwaysApply?: boolean;
}

export interface GeneratorConfig {
  /** 用户选中的技术栈标签（保留 selectedTags 不改名） */
  selectedTags: string[];
  /** 编码风格设置 */
  style: StyleDefaults;
  /** AI 严格程度 */
  aiStrictness: 'strict' | 'moderate' | 'relaxed';
  /** 命名约定 */
  namingConvention: string;
  /** 结构化自定义规则 */
  customRules: { title: string; content: string }[];
  /** 项目类型 */
  projectType: string;
  /** Day 1 新增: 输出模式 */
  outputMode: OutputMode;
  /** Day 1 新增: 规则应用模式 */
  ruleApplicationMode: RuleApplicationMode;
  /** Day 1 新增: 是否拆分为多个 .mdc */
  splitRules: boolean;
  /** Day 1 新增: file-specific 模式下全局 globs（可选覆盖/追加） */
  globsPattern?: string[];
}
