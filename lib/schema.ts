// lib/schema.ts
// JSON-LD Schema 工厂函数 — 5 套，按设计文档 4.5 节

const baseUrl = "https://www.cursorgenerator.dev";

/** Organization Schema — 全局站点发布者信息 */
export function getOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cursor Rules Generator",
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    sameAs: ["https://github.com/wuchong19930614/cursor-rules-generator"],
    description:
      "Free online tool to generate customized .cursorrules files for Cursor IDE. Choose from 26+ tech stack templates and download production-ready AI rules.",
  };
}

/** FAQPage Schema — About 页面结构化数据 */
export function getAboutFAQPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Cursor Rules Generator choose best practices for each framework?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our templates are researched and maintained by developers with real-world experience in each framework. We follow official style guides, community conventions, and modern best practices. Templates are regularly updated as frameworks evolve and new patterns emerge.",
        },
      },
      {
        "@type": "Question",
        name: "Can I contribute a new template or improve an existing one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! The project is open source under the MIT license on GitHub. You can submit pull requests for new framework templates, improvements to existing rules, bug fixes, or documentation updates. All contributions are reviewed and appreciated.",
        },
      },
      {
        "@type": "Question",
        name: "Does Cursor Rules Generator collect my data or generated rules?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The generator runs entirely in your browser. Your tech stack selections, style preferences, custom rules, and generated output never leave your device. We do not store, transmit, or have any access to your rules data. We only use anonymous analytics to understand aggregate traffic patterns.",
        },
      },
      {
        "@type": "Question",
        name: "What happens when I combine multiple tech stacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you select multiple stacks, our template engine intelligently merges the best practices from each, deduplicates overlapping guidance, and applies your style preferences uniformly across all rules. For example, selecting React, TypeScript, and Tailwind CSS produces rules covering JSX conventions, TypeScript strictness, and Tailwind utility-first patterns in a single cohesive file.",
        },
      },
      {
        "@type": "Question",
        name: "Is Cursor Rules Generator affiliated with Cursor IDE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, Cursor Rules Generator is an independent community project and is not officially affiliated with Cursor IDE or Anysphere. We built this tool to help the developer community get more value from Cursor's .cursorrules feature, which we believe is one of the most impactful capabilities in AI-assisted coding.",
        },
      },
    ],
  };
}

/** WebSite Schema — 搜索框标记 */
export function getWebSiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cursor Rules Generator",
    url: baseUrl,
    description:
      "Generate customized .cursorrules files for your tech stack. 26+ templates with real-time preview.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** WebApplication Schema — 工具类站点标记 */
export function getWebApplicationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cursor Rules Generator",
    url: baseUrl,
    description:
      "Free online .cursorrules file generator for Cursor IDE. Interactive wizard with 26+ tech stack templates.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript",
  };
}

/** BreadcrumbList Schema — 页面路径标记 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQPage Schema — 首页 FAQ 结构化数据 */
export function getFAQPageSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between Project Rules, AGENTS.md, and .cursorrules?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project Rules (.mdc) is the modern format with frontmatter metadata, glob-based file targeting, and support for splitting rules into multiple files. AGENTS.md is a single markdown file at the project root — simpler but without glob targeting or metadata. Legacy .cursorrules is Cursor's original plain-text format, still supported but less flexible than Project Rules.",
        },
      },
      {
        "@type": "Question",
        name: "Which format should I use for my project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Project Rules (.mdc) if you work in a team with multiple domains (frontend, backend, infra) and want per-directory rules. Use AGENTS.md for small projects, open-source repos, or when you want a single file that new contributors can read immediately. Use legacy .cursorrules if you are maintaining an existing project that already uses it.",
        },
      },
      {
        "@type": "Question",
        name: "Where do I place the generated files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project Rules (.mdc) go in the .cursor/rules/ directory. AGENTS.md and .cursorrules go in your project root directory. Cursor IDE automatically detects all three formats when you open the project.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch formats later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can regenerate your rules in any format at any time. The same configuration produces consistent output across all three formats — only the file structure and metadata differ.",
        },
      },
      {
        "@type": "Question",
        name: "Is Cursor Rules Generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Cursor Rules Generator is completely free. No sign-up required, no usage limits. Generate as many rule files as you need for all your projects in any format.",
        },
      },
      {
        "@type": "Question",
        name: "Which tech stacks are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support 26+ tech stacks including React, Next.js, Vue, Svelte, Angular, SolidJS, TypeScript, Python, Go, Rust, Bun, Zig, Django, FastAPI, Flask, Node.js, Flutter, React Native, Tailwind CSS, Prisma, Docker, and more. You can select multiple stacks to combine their best practices.",
        },
      },
    ],
  };
}
