---
title: Instalación
description: Qué necesita Aqorin, cómo instalarlo y desinstalarlo, y dónde guarda sus archivos.
---

## Qué necesitas

- **macOS con Apple silicon (Darwin arm64), o Linux.** Linux está demostrado en Ubuntu 26.04 en x86_64 con
  Claude Code 2.1.303, Codex 0.163.0, OpenCode 1.18.25 y Pi 1.3.0 — **desde `@aqorin/cli` 0.4.0**; la 0.3.0 y las
  anteriores son previas (en Linux ejecutan un Run sin sandbox, dicho, y rechazan Claude Code). Claude Code se ejecuta
  solo en macOS con Apple silicon y en Linux en x86_64. En Linux en arm64, otra distribución o macOS en Intel no está
  demostrado; Windows no se declara.
- **En Linux, bubblewrap** — el sandbox de Aqorin, que Aqorin nunca instala: `sudo apt install bubblewrap` (Fedora:
  `sudo dnf install bubblewrap`). `aqorin doctor` dice si funciona aquí; sin él un Run de workflow se rechaza, nunca se
  ejecuta sin sandbox en silencio.
- **Node.js 24.14 o posterior de la línea 24.** Compruébalo con `node --version`.
- **Al menos un runtime**, instalado y con la sesión iniciada por su propio flujo:

  | Runtime | Inicia sesión con |
  |---|---|
  | Claude Code | `claude` |
  | Codex | `codex login` |
  | OpenCode | nada en OpenCode: dentro de Aqorin corre sobre una [conexión](../connections/) que añades |
  | Pi | `pi`, luego `/login`, o las claves de proveedor que ya usas |

Aqorin nunca inicia sesión por ti.

## Instalar

```bash
npm install -g @aqorin/cli
aqorin --version        # 0.5.0
```

`@aqorin/cli` 0.5.0 en npm es la Terminal Alpha que describen estas páginas, en macOS y Linux. La 0.4.0 trajo
Linux; la 0.3.0 es la misma Alpha solo en macOS; la 0.1.0 y la 0.2.0 son una CLI anterior, sin nada de su TUI.

Su única dependencia, `better-sqlite3`, es un addon nativo: npm descarga su binario precompilado, o
lo compila donde no lo hay (hace falta un toolchain de compilación). El paquete no incluye
`node-pty`: solo lo necesita `aqorin open` (la interfaz propia de un runtime lanzada a través de
Aqorin), que responde `pty_unavailable` hasta que `node-pty@1.2.0-beta.15` se instala en el mismo
prefijo.

Para no ponerlo en tu prefijo global, dale uno propio:

```bash
npm install -g --prefix ~/.aqorin-alpha @aqorin/cli
export PATH="$HOME/.aqorin-alpha/bin:$PATH"
```

## Desinstalar

```bash
npm uninstall -g @aqorin/cli     # con el mismo --prefix si le diste uno
```

Desinstalar deja en su sitio los archivos propios de Aqorin. Bórralos para empezar de cero:

| Qué | Dónde (macOS) | Se mueve con |
|---|---|---|
| Configuración | `~/Library/Application Support/aqorin/` | `AQORIN_CONFIG_HOME` |
| Runs y evidencia | `~/Library/Application Support/aqorin/data/` | `AQORIN_DATA_HOME` |
| Caché | `~/Library/Caches/aqorin/` | `AQORIN_CACHE_HOME` |
| La marca de un proyecto | `<project>/.aqorin/aqorin.yaml` | — |

En ningún caso se toca nada de la instalación ni de la configuración de tus runtimes.

## Comprobar la instalación

```bash
aqorin doctor                       # read-only checks, grouped, each with its next step
aqorin doctor --live --runtime pi   # one real model call; it asks first
```
