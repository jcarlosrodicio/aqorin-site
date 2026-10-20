---
title: Documentación de Aqorin
description: Aqorin ejecuta trabajo de programación como workflows de agentes sobre Claude Code, Codex, OpenCode y Pi.
---

Aqorin ejecuta trabajo de programación como **workflows de agentes** sobre los runtimes de código que
ya usas: **Claude Code, Codex, OpenCode y Pi**. Tú eliges el runtime y el modelo de cada paso. Los
comandos de confianza validan el trabajo. Un paso de revisión lo revisa, cuando el workflow declara
uno.

Aqorin no sustituye a esos runtimes. Sigues usándolos de forma nativa, y Aqorin nunca cambia su
configuración.

:::caution[Terminal Alpha]
Estas páginas describen la Terminal Alpha: una TUI a pantalla completa (`aqorin`) y una CLI que hace
todo lo que hace la TUI.

- **Plataforma:** **macOS con Apple silicon (Darwin arm64)** y **Linux** — Linux demostrado en Ubuntu 26.04 en
  x86_64 con bubblewrap, desde la 0.4.0 (ver [Instalación](../installation/)). Windows no se declara.
- **Disponibilidad:** en npm como `@aqorin/cli` 0.5.0 (`npm install -g @aqorin/cli`). La 0.4.0 trajo Linux; la
  0.3.0 es solo de macOS; la 0.1.0 y la 0.2.0 no tienen TUI.
:::

## Por dónde empezar

- [Primeros pasos](getting-started/) — para qué sirve Aqorin y los primeros diez minutos.
- [Instalación](installation/) — qué necesitas y cómo instalar, desinstalar y empezar de cero.
- [La TUI](tui/) y [Teclado y navegación](keyboard/) — para orientarte en la pantalla.
- [Modelo de seguridad](security/) — qué aplica Aqorin y qué solo pide.
- [Limitaciones conocidas](limitations/) — lo que esta Alpha no hace.

## Palabras que se usan en estas páginas

| Palabra | Significado |
|---|---|
| **Runtime** | Un agente de programación que tienes instalado: Claude Code, Codex, OpenCode o Pi. |
| **Conexión** | Cómo un runtime llega a un modelo: su propio inicio de sesión, o un proveedor que añades a Aqorin, con la clave por referencia. |
| **Agente** | Un rol, como especificador, desarrollador o revisor: lo que hace y lo que puede hacer. Su definición no nombra ningún runtime ni ningún modelo. |
| **Workflow** | Qué agentes se ejecutan, en qué orden, qué paso ejecuta tus comprobaciones y qué paso revisa. |
| **Asignación** | Dónde se ejecuta cada paso de un workflow: un runtime, una conexión y un modelo. |
| **Run** | Una ejecución de un workflow, duradera y registrada, que puedes seguir, responder y reanudar. |
| **Free chat** | Una conversación con un runtime, a través de Aqorin. |
