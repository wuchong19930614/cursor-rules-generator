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
      "Free online tool to generate customized .cursorrules files for Cursor IDE. Choose from 21+ tech stack templates and download production-ready AI rules.",
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
      "Generate customized .cursorrules files for your tech stack. 21+ templates with real-time preview.",
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
      "Free online .cursorrules file generator for Cursor IDE. Interactive wizard with 21+ tech stack templates.",
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
        name: "What is a .cursorrules file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A .cursorrules file is a project-level configuration file that provides custom instructions to Cursor IDE's AI assistant. It tells the AI how to format code, which conventions to follow, and what best practices to apply for your specific tech stack.",
        },
      },
      {
        "@type": "Question",
        name: "Where do I place the .cursorrules file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Place the .cursorrules file in the root directory of your project (same level as package.json or go.mod). Cursor IDE automatically detects and applies the rules when you open the project.",
        },
      },
      {
        "@type": "Question",
        name: "How do I use this generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Select your tech stack (you can choose multiple), set your coding style preferences (indentation, quotes, naming conventions), add any custom rules, then preview and download your .cursorrules file. Place it in your project root and Cursor IDE will apply the rules automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Is Cursor Rules Generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Cursor Rules Generator is completely free. No sign-up required, no usage limits. Generate as many .cursorrules files as you need for all your projects.",
        },
      },
      {
        "@type": "Question",
        name: "Which tech stacks are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support 21+ tech stacks including React, Next.js, Vue, Svelte, Angular, TypeScript, Python, Go, Rust, Django, FastAPI, Flask, Node.js, Flutter, React Native, Tailwind CSS, Prisma, Docker, and more. You can select multiple stacks to combine their best practices.",
        },
      },
    ],
  };
}
