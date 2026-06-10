// lib/templates/types.ts
// 按设计文档 3.3 节定义的模板系统类型

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
}

export interface GeneratorConfig {
  /** 用户选中的技术栈标签 */
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
}
