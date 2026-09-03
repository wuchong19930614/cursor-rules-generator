# Cursor Rules Generator

[![CI](https://github.com/wuchong19930614/cursor-rules-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/wuchong19930614/cursor-rules-generator/actions/workflows/ci.yml)

A free, browser-based generator for creating stack-aware instructions for Cursor and other AI coding tools. Configure a technology stack and coding conventions, preview the result, and download ready-to-use Project Rules (`.mdc`), `AGENTS.md`, or legacy `.cursorrules` files.

**Live site:** [cursorgenerator.dev](https://www.cursorgenerator.dev)

## Features

- Three output formats from one configuration
- 26 technology templates, including React, Next.js, Vue, Python, Go, Rust, Docker, and Flutter
- Intelligent template merging and duplicate-section removal
- File-specific Project Rules with stack-aware default glob patterns
- Split `.mdc` output with ZIP download
- Shareable configuration links that exclude custom rule content
- Real-time preview and client-side file generation
- Static pages for every template, with metadata, JSON-LD, sitemap, and `llms.txt`

The generator runs locally in the browser. It has no application database or account system, and generated rule content is not sent to a backend.

## Output formats

| Format | Location | Best suited for |
| --- | --- | --- |
| Project Rules (`.mdc`) | `.cursor/rules/` | Scoped rules, larger projects, and multi-file configurations |
| `AGENTS.md` | Project root | Portable instructions shared across AI coding tools |
| `.cursorrules` | Project root | Existing projects using Cursor's legacy format |

Browsers rewrite direct downloads whose filename begins with a dot. For that reason, legacy output is delivered as `cursorrules.zip`, containing a correctly named `.cursorrules` file.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Vitest for unit tests
- Playwright for browser end-to-end tests
- JSZip for client-side archives
- Vercel Speed Insights, Google Analytics, and Microsoft Clarity

## Architecture

```text
app/                          Static pages and App Router routes
components/generator/         Generator wizard, preview, and downloads
components/seo/               JSON-LD rendering
lib/generator/                Rule generation, serialization, and URL state
lib/templates/                Template registry, rules, and default globs
lib/templates/editorial/      Curated template-page content
__tests__/                    Vitest unit tests
e2e/                          Playwright browser tests
```

The main product flow is:

```text
GeneratorForm → GeneratorConfig → template registry → generator engine
              → RuleFile/string → preview → copy/download
```

All `.mdc` delivery paths use the same serializer so previews, clipboard output, individual downloads, and ZIP archives remain consistent.

## Local development

### Requirements

- Node.js 20.9 or newer
- npm

### Setup

```bash
git clone https://github.com/wuchong19930614/cursor-rules-generator.git
cd cursor-rules-generator
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create and type-check the production build |
| `npm start` | Serve an existing production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run all Vitest tests once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run Playwright browser tests |

Install Playwright's Chromium runtime once before running E2E tests:

```bash
npx playwright install chromium
npm run test:e2e
```

To use a locally installed Google Chrome instead, run:

```bash
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

## Adding or updating a template

1. Add or edit the template module in `lib/templates/`.
2. Register new templates in `lib/templates/index.ts`.
3. Add stack-appropriate patterns to `lib/templates/default-globs.ts`.
4. Add curated landing-page content under `lib/templates/editorial/` when needed.
5. Run the complete local quality suite.

```bash
npm run lint
npm test
npm run build
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

Template sections support these placeholders:

- `{{INDENT}}`
- `{{QUOTE}}`
- `{{SEMICOLON}}`
- `{{NAMING}}`
- `{{STRICTNESS}}`
- `{{PROJECT_TYPE}}`

Section IDs must be unique because the generator uses them to remove duplicate guidance when several stacks are combined.

## Shared links and privacy

Generator settings are encoded in the `s` query parameter. The allowlist includes stack selection, formatting preferences, output mode, application mode, split-file preference, and glob patterns.

Custom rule titles and content are intentionally excluded from shared URLs. Analytics events contain only allowlisted aggregate metadata and receive a URL with generator state and transient authorization parameters removed.

## Continuous integration

The GitHub Actions workflow in `.github/workflows/ci.yml` runs on pushes to `main` and on pull requests:

- ESLint
- Unit tests
- Next.js production build
- Playwright E2E tests in Chromium

Failed browser jobs upload Playwright screenshots, reports, and traces for seven days. Configure the `quality` and `e2e` jobs as required status checks in GitHub branch protection if merges must be blocked until CI passes.

## Deployment

The application is designed for Vercel Git deployments. Connect the repository to Vercel and use the standard framework settings; no application-specific environment variables are required for the generator itself.

Before promoting a release, verify:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

## Contributing

Keep changes focused and include regression coverage for generation or download behavior. Before opening a pull request, run the quality commands above and confirm that generated `.mdc` frontmatter remains valid YAML.
