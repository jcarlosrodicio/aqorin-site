# aqorin-site

Landing page for [Aqorin](https://aqorin.rcuadrado.es/) — a runtime-agnostic
orchestration layer for coding agents. Static HTML, no build step.

## Layout

| Path | What |
|---|---|
| `index.html` | English page (default, `x-default`) |
| `es/index.html` | Spanish page |
| `assets/` | Shared CSS, JS and favicon |
| `og.png`, `es/og.png` | Social cards (1200×630), rendered from `tools/og.html` |
| `sitemap.xml`, `robots.txt` | Search engines; the sitemap carries the `hreflang` pairs |
| `CNAME` | Custom domain for GitHub Pages |

English always comes first. A new language is a new `<lang>/index.html`, plus its
`hreflang` line in every page's `<head>`, in `sitemap.xml`, and a link in the
language switch.

## Content rule

The page follows the product repository's rule: never claim a capability or a
platform that has not been demonstrated. Anything that is a goal is labelled
(`target · TV5`), anything illustrative says so, and the principles are presented as
design rules, not as guarantees. The status section says where the project is
heading at the level of the Thesis Validation Track, without per-runtime detail;
keep it in step with the product's `docs/exits/README.md`.

## Local preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Paths are root-absolute (`/assets/...`), so serve from the repository root.

## Social cards

```sh
./tools/og.sh
```

Needs Google Chrome (override with `CHROME=/path/to/chrome`).

## Deploy

GitHub Pages, branch `main`, folder `/`. DNS: a `CNAME` record for `aqorin` in the
`rcuadrado.es` zone pointing to `jcarlosrodicio.github.io`. Enforce HTTPS in the
Pages settings once the certificate is issued.

## License

MIT.
