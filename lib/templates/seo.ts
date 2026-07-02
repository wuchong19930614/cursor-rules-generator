import type { CursorRuleTemplate } from "./types";

export const CATEGORY_LABELS: Record<CursorRuleTemplate["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
  mobile: "Mobile",
  library: "Library",
};

export const TEMPLATE_DESCRIPTIONS: Record<string, string> = {
  react: "Component-based UI library with hooks, virtual DOM, and a vast ecosystem.",
  nextjs: "React framework with SSR, SSG, API routes, App Router, and file-based routing.",
  vue: "Progressive JavaScript framework with reactive data binding and composable APIs.",
  svelte: "Compile-time framework that converts declarative components into lean JavaScript.",
  angular: "Full-featured TypeScript framework with dependency injection, RxJS, and strong conventions.",
  astro: "Content-first web framework with island architecture and zero-JS defaults.",
  tailwind: "Utility-first CSS framework for rapid UI development with design tokens.",
  remix: "Full-stack React framework with nested routes, loaders, actions, and web standards.",
  nuxt: "Vue meta-framework with auto-imports, file-based routing, and server routes.",
  go: "Statically typed compiled language with goroutines, channels, and built-in tooling.",
  rust: "Systems language with ownership, zero-cost abstractions, and fearless concurrency.",
  node: "JavaScript runtime built on V8 with event-driven, non-blocking I/O.",
  python: "High-level language with dynamic typing, extensive standard library, and broad ecosystem.",
  django: "Python web framework with ORM, admin, auth, and batteries-included conventions.",
  flask: "Lightweight Python micro-framework with Jinja templates and Werkzeug routing.",
  fastapi: "Modern Python async web framework with OpenAPI docs and Pydantic validation.",
  "react-native": "React-based mobile framework for building native iOS and Android apps.",
  flutter: "Dart-based UI toolkit with hot reload, Material Design, and native compilation.",
  typescript: "Typed superset of JavaScript with interfaces, generics, and advanced tooling.",
  prisma: "Type-safe ORM with schema-first design and generated database clients.",
  docker: "Container platform for packaging apps and dependencies into portable runtimes.",
  electron: "Desktop app framework using Chromium and Node.js with native OS integration.",
  tauri: "Lightweight desktop framework with a Rust backend and web frontend.",
  bun: "All-in-one JavaScript runtime with bundler, test runner, and TypeScript support.",
  zig: "Systems programming language with comptime, no hidden control flow, and C ABI interop.",
  solidjs: "Reactive UI library with fine-grained reactivity and no virtual DOM overhead.",
};

export const TEMPLATE_SEARCH_INTENTS: Record<string, string[]> = {
  react: ["react cursor rules", "react .cursorrules", "react AGENTS.md"],
  nextjs: ["nextjs cursor rules", "next.js project rules", "nextjs .cursorrules"],
  vue: ["vue cursor rules", "vue .cursorrules", "vue AGENTS.md"],
  svelte: ["svelte cursor rules", "svelte project rules", "svelte .cursorrules"],
  angular: ["angular cursor rules", "angular .cursorrules", "angular AGENTS.md"],
  astro: ["astro cursor rules", "astro project rules", "astro .cursorrules"],
  tailwind: ["tailwind cursor rules", "tailwind css .cursorrules", "tailwind AGENTS.md"],
  remix: ["remix cursor rules", "remix project rules", "remix .cursorrules"],
  nuxt: ["nuxt cursor rules", "nuxt project rules", "nuxt .cursorrules"],
  go: ["go cursor rules", "golang .cursorrules", "go AGENTS.md"],
  rust: ["rust cursor rules", "rust .cursorrules", "rust AGENTS.md"],
  node: ["node cursor rules", "node.js .cursorrules", "node AGENTS.md"],
  python: ["python cursor rules", "python .cursorrules", "python AGENTS.md"],
  django: ["django cursor rules", "django .cursorrules", "django AGENTS.md"],
  flask: ["flask cursor rules", "flask .cursorrules", "flask AGENTS.md"],
  fastapi: ["fastapi cursor rules", "fastapi .cursorrules", "fastapi AGENTS.md"],
  "react-native": ["react native cursor rules", "react native .cursorrules", "react native AGENTS.md"],
  flutter: ["flutter cursor rules", "flutter .cursorrules", "flutter AGENTS.md"],
  typescript: ["typescript cursor rules", "typescript .cursorrules", "typescript AGENTS.md"],
  prisma: ["prisma cursor rules", "prisma .cursorrules", "prisma AGENTS.md"],
  docker: ["docker cursor rules", "docker .cursorrules", "docker AGENTS.md"],
  electron: ["electron cursor rules", "electron .cursorrules", "electron AGENTS.md"],
  tauri: ["tauri cursor rules", "tauri .cursorrules", "tauri AGENTS.md"],
  bun: ["bun cursor rules", "bun .cursorrules", "bun AGENTS.md"],
  zig: ["zig cursor rules", "zig .cursorrules", "zig AGENTS.md"],
  solidjs: ["solidjs cursor rules", "solid.js .cursorrules", "solidjs AGENTS.md"],
};

export function getTemplateDescription(template: CursorRuleTemplate): string {
  return (
    TEMPLATE_DESCRIPTIONS[template.id] ||
    `${template.name} Cursor rules template with framework-specific conventions and AI coding guidance.`
  );
}

export function getTemplateSearchIntents(template: CursorRuleTemplate): string[] {
  return (
    TEMPLATE_SEARCH_INTENTS[template.id] || [
      `${template.name.toLowerCase()} cursor rules`,
      `${template.name.toLowerCase()} .cursorrules`,
      `${template.name.toLowerCase()} AGENTS.md`,
    ]
  );
}

export function formatRuleContent(template: CursorRuleTemplate, content: string): string {
  return content
    .replaceAll("{{INDENT}}", String(template.defaults.indentSize))
    .replaceAll("{{NAMING}}", template.defaults.namingConvention)
    .replaceAll("{{QUOTES}}", template.defaults.quotes)
    .replaceAll("{{SEMICOLONS}}", template.defaults.semicolons ? "use semicolons" : "omit semicolons");
}

export function buildTemplateFaq(template: CursorRuleTemplate) {
  return [
    {
      question: `What does the ${template.name} Cursor rules template include?`,
      answer: `It includes ${template.sections.length} rule sections covering ${template.sections
        .slice(0, 3)
        .map((section) => section.title.toLowerCase())
        .join(", ")} and other ${template.name} development conventions.`,
    },
    {
      question: `Can I generate ${template.name} Project Rules and AGENTS.md from the same template?`,
      answer:
        "Yes. The generator can export the same stack-specific guidance as modern Project Rules (.mdc), AGENTS.md, or a legacy .cursorrules file.",
    },
    {
      question: `Should I combine ${template.name} with other Cursor rules templates?`,
      answer: `Yes. You can combine ${template.name} with related templates such as TypeScript, Tailwind CSS, Docker, or backend frameworks when your project uses multiple technologies.`,
    },
  ];
}
