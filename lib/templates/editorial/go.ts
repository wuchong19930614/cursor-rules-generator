// lib/templates/editorial/go.ts
// Go 模板页人工撰写内容

import type { TemplateEditorial } from './types';

export const goEditorial: TemplateEditorial = {
  slug: 'go',
  lastUpdated: '2026-09-09',
  intro: [
    'Go looks like an easy language for Cursor to write — small grammar, one formatting style, a famously boring standard library. That surface simplicity is exactly the trap. The hard parts of Go are invisible in a single file: whether an error keeps its chain when it crosses three package boundaries, whether a goroutine started on line 40 can ever exit, whether a package belongs in internal/ or is about to become someone else\'s permanent API. Cursor gets the syntax right every time and these decisions wrong often enough to matter.',
    'This rules file covers error wrapping with %w and inspection with errors.Is/errors.As, goroutine cancellation and completion, focused packages, and table-driven tests run under -race. Start with your existing module layout; cmd/ and internal/ are useful when the project needs them, while pkg/ is not required. Copy the rules directly, or open the generator to combine them with the rest of your stack before downloading.',
  ],
  designNotes: [
    {
      heading: 'Error wrapping: why %w is a rule, not a suggestion',
      paragraphs: [
        'Returning an error unchanged preserves its chain but adds no information about the operation that failed. When callers need that context, fmt.Errorf("load configuration: %w", err) can add it while preserving the wrapped error for inspection. Choose wrapping deliberately at package boundaries because callers can depend on errors exposed through the chain.',
        'The %w verb matters as much as the message. Wrapping with %v (or building strings by hand) produces an error that looks fine in logs but breaks errors.Is and errors.As, which is why the rules pair the two: wrap with %w on the way up, inspect with errors.Is/errors.As at the decision point. Without that pairing, Cursor falls back to the pattern it sees everywhere in older training data — strings.Contains(err.Error(), "not found") — a comparison that shatters the moment anyone rewords an error message. Defining custom error types with an Error() method gives errors.As a concrete target for the cases where callers need structured data, not just a sentinel.',
      ],
    },
    {
      heading: 'Every goroutine needs an exit plan',
      paragraphs: [
        'Goroutine leaks are the signature failure of AI-written Go. Cursor loves to write `go func() { ... }()` — it looks idiomatic and concurrent — but routinely omits the two things that let that goroutine ever stop: a context.Context to observe cancellation, and a sync.WaitGroup (or errgroup) so the caller knows when work is done. A leaked goroutine costs nothing in tests, then accumulates in production until the process is holding thousands of blocked stacks and open connections. Nothing crashes; memory just climbs.',
        'The concurrency rules attack this at generation time. Requiring context.Context for cancellation and deadline propagation means generated worker functions take ctx as their first parameter and select on ctx.Done() instead of blocking forever. Requiring WaitGroup for completion means "fire and forget" has to be a deliberate choice, not the default shape. And the "prefer channels over mutexes for communication" rule steers Cursor away from its other bad habit: guarding a shared slice with a mutex and hand-rolled signaling where a channel would make ownership obvious. The testing section closes the loop by mandating -race, which turns the data races these mistakes cause into loud test failures instead of once-a-month production mysteries.',
      ],
    },
    {
      heading: 'cmd/, internal/, and one package per directory',
      paragraphs: [
        'Go does not require one directory skeleton for every project. A small module can start with its package or command in the root. For multiple commands, cmd/ separates entry points; internal/ restricts imports to the directory tree rooted at its parent. The template asks Cursor to preserve the existing structure and introduce these directories when useful, without adding pkg/ as a mandatory layer.',
        'The naming rules do double duty here. camelCase for unexported and PascalCase for exported identifiers is not just style — in Go, capitalization is the visibility system. When Cursor generates a helper as PascalCase out of habit, it has silently widened your public API. Making the convention explicit keeps generated identifiers unexported until someone decides otherwise.',
      ],
    },
    {
      heading: 'Table-driven tests, because Cursor writes tests in bulk',
      paragraphs: [
        'Ask Cursor for tests without guidance and you get a stack of near-identical functions — TestParseValid, TestParseEmpty, TestParseUnicode — each repeating the same setup with one value changed. That shape is uniquely bad for AI-assisted work: when you later ask Cursor to add a case, it clones another whole function; when behavior changes, it must edit five functions consistently and usually edits four. A table-driven test with t.Run subtests inverts this — adding a case is appending one struct literal, which is the kind of edit Cursor performs almost perfectly.',
        'The supporting rules are small but load-bearing. t.Helper() keeps failure line numbers pointing at the failing case instead of inside a shared assertion helper; t.TempDir() removes the hand-rolled cleanup code Cursor otherwise invents; and testify is permitted where it genuinely improves readability rather than mandated everywhere, so generated tests still read like Go rather than a ported JUnit suite.',
      ],
    },
  ],
  faq: [
    {
      question: 'Go already has gofmt and go vet — do I still need style rules?',
      answer:
        'gofmt settles formatting (which is why this template defaults to tabs — that argument is over) and vet catches a fixed list of mechanical mistakes. Neither has an opinion on the things these rules cover: whether an error is wrapped or swallowed, whether a goroutine can exit, where a package boundary belongs, or what shape a test takes. Rules guide what Cursor writes; gofmt only decides how it is indented afterwards.',
    },
    {
      question: 'Why do the rules prefer channels over mutexes?',
      answer:
        'The rule applies to communication between goroutines, not to all shared state — sync.Mutex and sync.RWMutex are explicitly in the template for protecting shared data. The distinction matters for AI output: when Cursor needs to hand results from workers to a collector, a channel makes ownership and completion explicit, while its mutex version tends to pair a locked slice with ad-hoc signaling that races under load. Run tests with -race and the difference stops being theoretical.',
    },
    {
      question: 'Do these rules work on older Go versions?',
      answer:
        'The standard-library APIs named here require Go 1.15 or newer: %w wrapping and errors.Is/errors.As arrived in Go 1.13, but t.TempDir() was added in Go 1.15. Check the go directive in go.mod and your supported toolchains before adopting a rule. For older projects, replace t.TempDir() with a compatible temporary-directory helper and explicit cleanup. Optional third-party dependencies such as testify have their own version requirements.',
    },
    {
      question: 'How do I add conventions for Gin, Echo, gRPC, or my ORM?',
      answer:
        'The template covers language-level Go on purpose — framework choices vary too much between teams to bake in. Generate the Go rule set, then add custom rules in the generator for your stack: for example "HTTP handlers live in internal/handler and return errors to middleware — never call log.Fatal in a handler" or "Use protovalidate for message validation." Custom rules export into every output format alongside the template sections.',
    },
  ],
  combos: [
    {
      label: 'Go + Docker',
      tags: ['go', 'docker'],
      description:
        'The standard deployable service. Docker rules keep Cursor writing multi-stage builds that compile a static Go binary into a minimal image instead of shipping the toolchain.',
    },
    {
      label: 'Go + React + TypeScript',
      tags: ['go', 'react', 'typescript'],
      description:
        'A Go API behind a typed React frontend. One rule set covers both halves of the repo, so Cursor stops applying JavaScript instincts to your Go handlers.',
    },
    {
      label: 'Go + Next.js',
      tags: ['go', 'nextjs'],
      description:
        'Go microservices behind a Next.js frontend. Keeps the boundary clean: server components fetch from the Go API, and each side follows its own conventions.',
    },
  ],
};
