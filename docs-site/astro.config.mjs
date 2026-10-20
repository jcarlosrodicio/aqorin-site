// The documentation at aqorin.rcuadrado.es/docs. Built into ../docs and committed, so GitHub Pages
// keeps serving the repository as it is: the landing at /, the docs at /docs.
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const group = (label, es, items) => ({ label, translations: { es }, items });

export default defineConfig({
  site: "https://aqorin.rcuadrado.es",
  base: "/docs",
  outDir: "../docs",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Aqorin docs",
      description: "Run coding work as workflows of agents on Claude Code, Codex, OpenCode and Pi.",
      logo: {
        light: "./src/assets/aqorin-lockup-light.svg",
        dark: "./src/assets/aqorin-lockup-dark.svg",
        alt: "Aqorin",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        es: { label: "Español", lang: "es" },
      },
      customCss: ["./src/styles/brand.css"],
      // the landing's cookieless PostHog, the same file it loads; the landing's two faces
      head: [
        { tag: "script", attrs: { src: "/assets/analytics.js", defer: true } },
        { tag: "link", attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" } },
        { tag: "link", attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true } },
        { tag: "link", attrs: { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Manrope:wght@400;500;600;700;800&display=swap" } },
      ],
      expressiveCode: {
        styleOverrides: {
          borderRadius: "10px",
          borderColor: "var(--sl-color-gray-5)",
          codeFontFamily: "var(--sl-font-mono)",
          uiFontFamily: "var(--sl-font)",
          codeFontSize: "0.8125rem",
          codeLineHeight: "1.65",
        },
      },
      lastUpdated: false,
      pagination: true,
      sidebar: [
        group("Start", "Empezar", ["getting-started", "installation"]),
        group("The TUI", "La TUI", ["tui", "keyboard"]),
        group("Set up", "Configurar", ["runtimes", "connections", "models", "agents", "workflows", "skills", "mcp", "credentials"]),
        group("Work", "Trabajar", ["new-task", "runs", "free-chat", "attention", "recovery", "trace", "projects"]),
        group("Reference", "Referencia", ["cli-reference", "configuration", "security", "troubleshooting", "limitations"]),
      ],
    }),
  ],
});
