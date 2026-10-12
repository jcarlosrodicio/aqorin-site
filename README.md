# aqorin-site

Landing page and documentation for [Aqorin](https://aqorin.rcuadrado.es/) — a
runtime-agnostic orchestration layer for coding agents. The landing is static HTML
with no build step; the documentation at `/docs` is built with Astro Starlight.

## Layout

| Path | What |
|---|---|
| `index.html` | English page (default, `x-default`) |
| `es/index.html` | Spanish page |
| `assets/` | Shared CSS, JS and favicon; `assets/brand/` the brand's files, copied from the product's `assets/brand/` |
| `docs-site/` | Source of the documentation (Astro Starlight, English and Spanish) |
| `docs/` | The documentation as built from `docs-site/` — generated, committed so Pages serves it |
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

## Documentation

```sh
cd docs-site
npm ci
npm run build      # writes ../docs
npm run dev        # http://localhost:4321/docs/
```

The CLI reference is generated in the product repository from `aqorin help`
(`docs/cli-reference.md`, held to the help by a test there). Copy it here after the
help changes, and check the copy before building:

```sh
npm run cli-reference -- <aqorin checkout>
npm run cli-reference -- <aqorin checkout> --check
```

A page in English with no Spanish file is served in English on the Spanish side
(Starlight's fallback); the CLI reference is English only, as the CLI prints it.

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
