---
title: Configuración
description: Los archivos que posee Aqorin, por proyecto y globales, qué contienen y las variables de entorno que lee.
---

Aqorin escribe solo sus propios archivos. Nunca escribe la configuración de tus runtimes. Todo lo
que sigue lo escribe la TUI o la CLI a través de un único escritor que conserva tus comentarios y el
orden de las claves. También puedes editar los archivos a mano.

## En un proyecto: `.aqorin/`

| Ruta | Contiene |
|---|---|
| `.aqorin/aqorin.yaml` | La configuración del proyecto (más abajo). |
| `.aqorin/agents/<id>.agent.yaml` | Tus [agentes](../agents/). |
| `.aqorin/workflows/<id>.workflow.yaml` | Tus [workflows](../workflows/). |
| `.aqorin/assignments/<name>.profile.yaml` | Dónde se ejecuta cada paso: [asignaciones](../workflows/#assignments-where-each-step-runs). |
| `.aqorin/tasks/` | Tareas con sus comprobaciones, escritas por [Nueva tarea](../new-task/). |
| `.aqorin/skills/<id>/` | Copias fijadas de tus [skills](../skills/). |
| `.aqorin/mcp/<id>.mcp.yaml` | Tus [servidores MCP](../mcp/), con las credenciales solo por referencia. |

`aqorin init` (o la lista de comprobación de Home) crea `.aqorin/`. Los directorios se crean con
`0700` y los archivos con `0600`.

```yaml
kind: aqorin.project_config
schema_version: 1
default_runtime: claude-code
workflow_defaults:
  portable-feature-advisory: four-runtimes     # an assignment's name
agent_defaults:
  developer: { connection: nan, model: glm }   # your default execution for a built-in agent
  reviewer: { runtime: codex }
worktree_setup: [npm, ci]   # run in each new worktree of a workflow (an argv, no shell)
sandbox: off                # solo para ejecutar sin el sandbox de Aqorin (macOS); cada Run lo dice
resources:
  skills:
    - id: house-style
    - id: house-notes
      required: false
  mcp:
    - id: github
```

## Global

| | macOS |
|---|---|
| Configuración | `~/Library/Application Support/aqorin/config.yaml` |
| Runs y evidencia | `~/Library/Application Support/aqorin/data/` |
| Caché | `~/Library/Caches/aqorin/` |

La configuración global contiene:

- el runtime por defecto global (`aqorin use <runtime> --global`);
- las instalaciones que has elegido, cada una identificada por su ruta y el SHA-256 de sus bytes;
- tus [conexiones](../connections/);
- las referencias a tus claves de proveedor de OpenCode ([Credenciales](../credentials/)).

La configuración del proyecto siempre prevalece sobre la global.

```yaml
kind: aqorin.global_config
schema_version: 1
default_runtime: pi
runtimes:
  codex:
    selection:
      path: /Users/me/.local/bin/codex
      sha256: 61b0194f…
connections:
  - id: nan
    runtime: pi
    auth: credential_ref
    provider: openai_compatible
    base_url: https://api.example.com/v1
    credential_ref: { env: EXAMPLE_API_KEY }
    default_model: some-model
```

## Variables de entorno

| Variable | Efecto |
|---|---|
| `AQORIN_CONFIG_HOME` | Dónde vive la configuración global. |
| `AQORIN_DATA_HOME` | Dónde viven los Runs y la evidencia. |
| `AQORIN_CACHE_HOME` | Dónde vive la caché. |
| `NO_COLOR` | Sin color. |
| `AQORIN_TUI_ASCII=1` | Solo glifos ASCII. |
| `AQORIN_TUI_MOTION=0` | Sin movimiento en la barra de estado. |
| `AQORIN_TUI_BELL=0` | Sin campana cuando algo empieza a esperarte. |

Aqorin se niega a escribir a través de un `AQORIN_CONFIG_HOME` o un `AQORIN_DATA_HOME` que sea un
enlace simbólico.

```bash
aqorin config effective     # the configuration in effect here
```
