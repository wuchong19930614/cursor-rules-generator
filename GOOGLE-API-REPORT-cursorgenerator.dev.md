# Search and analytics review — 2026-09-09

Sources: authenticated Search Console and GA4 Data API connectors, property `sc-domain:cursorgenerator.dev` and GA4 `541062383`. No dashboard settings were changed.

## Search performance

Final GSC web data, 2026-08-10–2026-09-06 versus 2026-07-13–2026-08-09:

| Metric | Previous 28 days | Recent 28 days |
| --- | ---: | ---: |
| Clicks | 5 | 12 |
| Impressions | 2,209 | 5,809 |
| CTR | 0.226% | 0.207% |
| Average position | 30.75 | 44.63 |

Clicks rose 140% and impressions rose 163% from a small base. A worse aggregate position does not establish that existing queries lost rank: the mix of queries and pages can change.

Priority pages (page-level aggregation differs from property totals):

| Page | Clicks | Impressions | Position | Next action |
| --- | ---: | ---: | ---: | --- |
| /guides/migrate-cursorrules-to-cursor-rules | 0 | 1,487 | 7.75 | Investigate device/country and search appearance before a title experiment |
| /templates/go | 3 | 143 | 11.45 | Best existing click signal; review Go-specific queries and landing experience |
| /templates/docker | 0 | 53 | 16.09 | Secondary opportunity; sample too small for a confident CTR conclusion |

Migration guide query-only report returned 9 visible queries totaling 13 impressions. Most page impressions are not represented in the query report; do not extrapolate intent from those 9 queries. Several include “official docs,” while this site is an independent guide. No title change was made without stronger evidence.

## GA4: local traffic contamination

GA4 window: 2026-08-12–2026-09-08, property timezone Asia/Shanghai. The most recent day may still receive processing updates. GA4 and GSC dates and metrics are not directly interchangeable.

| Event | All hostnames | 127.0.0.1 | www.cursorgenerator.dev |
| --- | ---: | ---: | ---: |
| page_view | 227 | 92 | 135 |
| generator_start | 65 | 54 | 11 |
| generator_complete | 69 | 63 | 6 |
| rules_download | 41 | 40 | 1 |

40/41 downloads and 63/69 completions came from local tests. These counts cannot support a product conversion claim. Production counts can still include manual production acceptance tests; no precise visitor funnel or abandonment rate is established by aggregate event counts.

Production-host filtered sessions: Direct 94, Organic Search 19, AI Assistant 6, Referral 3 (122 summed across these channels). Previous equal GA4 window, 2026-07-15–2026-08-11: Direct 30, Organic Search 14, Referral 11, AI Assistant 1. Organic Search sessions increased from 14 to 19; volume remains small.

## Implemented improvement

GA4 and Clarity script loading and the manual event boundary now allow only the exact HTTPS production origins (www and apex). Localhost, loopback, preview URLs and unrelated domains do not initialize these scripts or enqueue/send events. Client-side checking retains static rendering and handles production builds served locally.

Tests cover blocked origins, production event behavior, and a complete local generator journey with no GA4/Clarity requests. Historical records remain in GA4; filter `hostName = www.cursorgenerator.dev` when comparing past periods. Online manual tests remain a known limitation.

Yesterday's Next.js template fix was confirmed in production HTML: `page.tsx` and the corrected special-file guidance are present.

## Work order

1. Publish the analytics isolation fix and confirm production tracking still receives real page views. This review does not deploy changes.
2. Use production-host filters for existing GA4 reports; assess new data after a complete comparable period rather than daily feature changes.
3. Investigate the migration guide exposure and Go query opportunity. Make one evidence-backed content experiment once query/device context is sufficient.

Report generated with the seo-google workflow; API responses were used directly instead of requiring duplicate local credentials.

## Follow-through on 2026-09-09

Analytics isolation was published in commit `252fbd8`; GitHub CI and Vercel both reported success.

The Go page's query report returned only `go/cursorattestation` (10 impressions), `procedi` (1), and `rules_go` (1), all with zero clicks. The three page-level clicks are not attributable to a visible query in this report. This is insufficient evidence for a keyword-focused rewrite.

Instead, the Go template and its explanatory copy were corrected: use the testing method `t.TempDir()` (available since Go 1.15), remove the universal `cmd/internal/pkg` layout requirement, and clarify that returning an error unchanged preserves its chain. Sources: [Go module organization](https://go.dev/doc/modules/layout), [testing.T.TempDir](https://pkg.go.dev/testing#T.TempDir). The FAQ now distinguishes standard-library minimum versions from third-party dependency requirements. These are content-correctness improvements, not a claim of a measured SEO uplift.
