// lib/templates/editorial/types.ts
// 模板详情页人工撰写内容的类型定义
// 原则:每个框架的内容必须是该框架特有的,不允许换名词复用的骨架文案

export interface EditorialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EditorialFaqItem {
  question: string;
  answer: string;
}

export interface ComboSuggestion {
  /** 展示名,如 "React + TypeScript + Tailwind" */
  label: string;
  /** 生成器预选标签,必须是 templateRegistry 中真实存在的 tags */
  tags: string[];
  description: string;
}

export interface TemplateEditorial {
  /** 必须与 templateRegistry 的键一致 */
  slug: string;
  /** ISO 日期,页面 "Last updated" 显示 + sitemap lastmod */
  lastUpdated: string;
  /** 替换页面顶部插值首段的独特介绍 */
  intro: string[];
  /** "Why these rules" —— 框架特有的设计说明 */
  designNotes: EditorialSection[];
  /** 替换程序化 FAQ 的真实问答 */
  faq: EditorialFaqItem[];
  /** 常见技术栈组合建议 */
  combos: ComboSuggestion[];
}
