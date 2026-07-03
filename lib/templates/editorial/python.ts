// lib/templates/editorial/python.ts
// Python 模板页人工撰写内容

import type { TemplateEditorial } from './types';

export const pythonEditorial: TemplateEditorial = {
  slug: 'python',
  lastUpdated: '2026-07-03',
  intro: [
    'Python tolerates almost anything, which is exactly the problem when an AI writes it. Cursor will happily produce a function with no type hints, a bare except that swallows a KeyboardInterrupt, a mutable default argument that leaks state between calls, and a print() where a log line belongs — and every one of those runs without complaint until it fails in production. Other languages have a compiler to catch AI sloppiness; in Python, your rules file is the compiler.',
    'This template encodes the modern Python baseline: PEP 8 with Black\'s 88-character line, type hints on every signature, src-layout with pyproject.toml, and exception handling that names what it catches. The rules are framework-agnostic — they hold whether the file is a Django view, a FastAPI route, or a one-off data script. Copy them directly, or open the generator to adjust indentation, quotes, and naming before you export.',
  ],
  designNotes: [
    {
      heading: 'Type hints are context for the AI, not just for mypy',
      paragraphs: [
        'The template requires type hints on all function signatures, and the payoff is bigger for Cursor than for human readers. In an untyped codebase, Cursor guesses what a parameter is from its name — user could be an ORM object, a dict, or an ID — and it will confidently call methods that do not exist. Every annotated signature it can see is one less hallucinated attribute. Typed code makes the next generation of AI edits more accurate; untyped code compounds the guessing.',
        'The specific choices matter too. The rules push collections.abc types (Iterable, Sequence, Mapping) for parameters so Cursor writes functions that accept any conforming input rather than demanding a concrete list. TypedDict and dataclasses replace the anonymous dict-shaped blobs Cursor otherwise passes between functions, and Protocol gives its duck-typed interfaces a name that mypy can actually check. The Optional[T] rule keeps signatures valid on Python 3.9 — if your floor is 3.10+, swap it for T | None with a custom rule.',
      ],
    },
    {
      heading: 'src-layout exists because "it imported fine locally" is a lie',
      paragraphs: [
        'The flat layout — package directory sitting next to your tests at the repo root — has a trap that AI assistance makes worse: Python puts the working directory on sys.path, so imports resolve against your checkout instead of the installed package. Tests pass locally, then the published wheel is missing a module. Cursor falls into this constantly, because flat-layout repos dominate its training data and it cannot tell the accidental import from the intentional one.',
        'Moving code under src/ makes the package importable only when properly installed, so broken packaging fails immediately instead of at release. The companion rules — pyproject.toml as the single configuration file, tests/ mirroring the source tree, explicit __init__.py boundaries — give Cursor an unambiguous answer to "where does this file go", which is otherwise the question it answers most randomly in Python projects.',
        'One thing the template deliberately does not pick: your installer. uv, Poetry, and plain pip all read pyproject.toml. But Cursor defaults to suggesting pip install in chat, so if you use uv or Poetry, add a custom rule like "This project uses uv; never suggest pip install or requirements.txt" — otherwise its setup instructions will drift from your lockfile.',
      ],
    },
    {
      heading: 'Bare except and print(): the two habits worth a hard ban',
      paragraphs: [
        'Ask Cursor to "make this more robust" and it will wrap the body in try: ... except: pass. That bare except catches SystemExit and KeyboardInterrupt along with the error it meant to handle, turning a crash you would have seen into silence you will not. The rules require naming the exception type, and offer contextlib.suppress for the genuinely-expected-failure case — which reads as intent instead of negligence.',
        'The print() ban is the same fight at a different layer. Cursor reaches for print because it appears in millions of tutorials, but print gives you no level, no timestamp, and no way to silence it without editing code. Requiring the logging module — with traceback info on error paths, per the rules — means the diagnostics Cursor adds while "debugging" are still useful after deploy instead of polluting stdout.',
        'A related default worth adding as a custom rule if it bites you: mutable default arguments (def f(items=[])). Cursor still generates them under pressure, and the shared-state bug they cause only appears on the second call. The dataclass rule reduces the surface area, but an explicit "default to None, create inside the function" line closes it completely.',
      ],
    },
    {
      heading: 'Why 88 characters and double quotes are the right defaults to hand an AI',
      paragraphs: [
        'The style section pins Black\'s conventions: 88-character lines, double quotes, four spaces, snake_case. None of these is objectively better than the alternatives — the point is that they are the settings Black and Ruff apply without configuration, so Cursor\'s output and your formatter never disagree. When rules and formatter conflict, every AI-generated file produces a noisy reformat diff, and reviewers stop being able to see the actual change.',
        'If your team standardizes on something else — 79-character lines for strict PEP 8, single quotes — change it in the generator rather than editing the exported file, so the quote and indent placeholders stay consistent across every section. The one rule to keep regardless: PascalCase for classes, snake_case for everything else. Cursor ports camelCase into Python whenever it has recently been editing JavaScript in the same session.',
      ],
    },
  ],
  faq: [
    {
      question: 'Do these rules replace Ruff, Black, or mypy?',
      answer:
        'No — they sit upstream of them. Linters and formatters fix code after it is written; Cursor rules change what gets written. The template intentionally matches Black and Ruff defaults (88 characters, double quotes) so the two layers agree. Keep mypy in CI too: type hints in the rules make Cursor write annotations, mypy is what verifies they are true.',
    },
    {
      question: 'Which Python versions do the generated rules assume?',
      answer:
        'The rules are written to be safe from Python 3.8 upward — that is why they prefer Optional[T] over the T | None syntax introduced in 3.10. If your project floor is 3.10 or later, add a custom rule stating your minimum version and telling Cursor to use the modern union syntax; everything else in the template is version-neutral.',
    },
    {
      question: 'I use uv (or Poetry). Will Cursor respect that with these rules?',
      answer:
        'The template mandates pyproject.toml, which all three tools share, but it does not name an installer — so Cursor will default to suggesting pip commands. Add one custom rule in the generator, for example "Use uv for all dependency and environment management; never suggest pip install or edit requirements.txt". That single line stops Cursor from generating setup steps that bypass your lockfile.',
    },
    {
      question: 'Should Python rules go in .cursor/rules or AGENTS.md?',
      answer:
        'For a pure-Python repository, a Project Rule (.mdc) with a **/*.py glob is the better default — the conventions load only when Cursor touches Python files. In a polyglot repo (Python API plus JavaScript frontend), scoped globs matter even more, since you do not want snake_case rules active while Cursor edits TypeScript. Choose AGENTS.md when teammates use Codex, Copilot, or other agents that read the portable format.',
    },
  ],
  combos: [
    {
      label: 'Python + FastAPI',
      tags: ['python', 'fastapi'],
      description:
        'The modern API stack. FastAPI rules add async endpoint, Pydantic model, and dependency-injection conventions on top of the core Python baseline.',
    },
    {
      label: 'Python + Django',
      tags: ['python', 'django'],
      description:
        'For full-stack Django work. Django rules cover models, views, and ORM query patterns so Cursor follows framework conventions instead of reinventing them.',
    },
    {
      label: 'Python + Docker',
      tags: ['python', 'docker'],
      description:
        'For containerized deployment. Docker rules keep Cursor writing multi-stage builds and sane images instead of copying the whole repo into python:latest.',
    },
  ],
};
