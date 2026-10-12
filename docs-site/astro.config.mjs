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
      // the landing's cookieless PostHog, the same file it loads
      head: [{ tag: "script", attrs: { src: "/assets/analytics.js", defer: true } }],
      lastUpdated: false,
      pagination: true,
      sidebar: [
        group("Start", "Empezar", ["getting-started", "installation"]),
        group("The TUI", "La TUI", ["tui", "keyboard"]),
        group("Set up", "Configurar", ["runtimes", "connections", "models", "agents", "workflows", "skills", "mcp", "credentials"]),
        group("Work", "Trabajar", ["new-task", "runs", "free-chat", "attention", "recovery", "trace"]),
        group("Reference", "Referencia", ["cli-reference", "configuration", "security", "troubleshooting", "limitations"]),
      ],
    }),
  ],
});
