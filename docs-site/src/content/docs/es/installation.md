---
title: Instalación
description: Qué necesita Aqorin, cómo instalarlo y desinstalarlo, y dónde guarda sus archivos.
---

## Qué necesitas

- **macOS con Apple silicon (Darwin arm64).** Es la única plataforma en la que se ha demostrado la
  Alpha. Linux y Windows no se declaran.
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

:::caution
La Terminal Alpha no está publicada en npm. El paquete `@aqorin/cli` 0.2.0 de npm es una CLI
anterior, sin nada de la TUI que describen estas páginas. Ambos muestran la versión 0.2.0, pero son
compilaciones distintas.
:::

La Alpha todavía no se distribuye públicamente: no hay descarga pública. Quien tenga su tarball
empaquetado lo instala en un prefijo propio:

```bash
npm install -g --prefix ~/.aqorin-alpha ./aqorin-cli-<version>.tgz
export PATH="$HOME/.aqorin-alpha/bin:$PATH"
aqorin --version
```

## Desinstalar

```bash
npm uninstall -g --prefix ~/.aqorin-alpha @aqorin/cli
```

Desinstalar deja en su sitio los archivos propios de Aqorin. Bórralos para empezar de cero:

| Qué | Dónde (macOS) | Se mueve con |
|---|---|---|
| Configuración | `~/Library/Application Support/aqorin/` | `AQORIN_CONFIG_HOME` |
| Runs y evidencia | `~/Library/Application Support/aqorin/data/` | `AQORIN_DATA_HOME` |
| Caché | `~/Library/Caches/aqorin/` | `AQORIN_CACHE_HOME` |
| Los archivos propios de un proyecto | `<project>/.aqorin/` | — |

En ningún caso se toca nada de la instalación ni de la configuración de tus runtimes.

## Comprobar la instalación

```bash
aqorin doctor                       # read-only checks, every runtime's installation included
aqorin doctor --live --runtime pi   # one real model call; it asks first
```
