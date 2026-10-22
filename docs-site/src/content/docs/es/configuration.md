---
title: Configuración
description: Los archivos que posee Aqorin —una configuración y una biblioteca para todos los proyectos—, qué contienen, cómo pasa a ellos el .aqorin/ antiguo de un proyecto y las variables de entorno que lee Aqorin.
---

Aqorin escribe solo sus propios archivos. Nunca escribe la configuración de tus runtimes. Todo lo
que sigue lo escribe la TUI o la CLI a través de un único escritor qTu configuración y tu biblioteca son tuyas, no de un proyecto: todos los proyectos que añades usan las mismas.
La carpeta de un proyecto solo guarda `.aqorin/aqorin.yaml`, la marca que escribe `aqorin init`.

## Dónde guarda Aqorin sus archivos

| | macOS | Linux |
|---|---|---|
| Configuración y biblioteca | `~/Library/Application Support/aqorin/` | `~/.config/aqorin/` (o `$XDG_CONFIG_HOME/aqorin/`) |
| Runs, evidencia y tareas | `~/Library/Application Support/aqorin/data/` | `~/.local/share/aqorin/` (o `$XDG_DATA_HOME/aqorin/`) |
| Caché | `~/Library/Caches/aqorin/` | `~/.cache/aqorin/` (o `$XDG_CACHE_HOME/aqorin/`) |

En la carpeta de configuración:

| Ruta | Contiene |
|---|---|
| `config.yaml` | Tu configuración (más abajo). |
| `library/agents/<id>.agent.yaml` | Tus [agentes](../agents/). |
| `library/workflows/<id>.workflow.yaml` | Tus [workflows](../workflows/). |
| `library/assignments/<name>.profile.yaml` | Dónde se ejecuta cada paso: [asignaciones](../workflows/#assignments-where-each-step-runs). |
| `library/skills/<id>/` | Copias fijadas de tus [skills](../skills/). |
| `library/mcp/<id>.mcp.yaml` | Tus [servidores MCP](../mcp/), con las credenciales solo por referencia. |
| `projects.yaml` | Tu lista de [proyectos](../projects/), cada uno con su preparación de worktrees. |

Lo que sigue siendo de un proyecto —sus Runs, chats, worktrees y [tareas](../new-task/)— se guarda en la carpeta de
datos, bajo el id del proyecto, nunca en el repositorio. Los directorios se crean con `0700`; `config.yaml` tiene `0600`.

## `config.yaml`

```yaml
kind: aqorin.global_config
schema_version: 2
default_runtime: claude-code
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
workflow_defaults:
  portable-feature-advisory: four-runtimes     # el nombre de una asignación
agent_defaults:
  developer: { connection: nan, model: glm }   # tu ejecución por defecto para un agente incluido
  reviewer: { runtime: codex }
sandbox: off                # solo para ejecutar sin el sandbox de Aqorin; cada Run y Free chat lo dice
resources:                  # lo que recibe cada Run
  skills:
    - id: house-style
    - id: house-notes
      required: false
  mcp:
    - id: github
```

Guarda tu runtime por defecto (`aqorin use <runtime>`), las instalaciones que has elegido (cada una identificada por
su ruta y el SHA-256 de sus bytes), tus [conexiones](../connections/) y las referencias a tus claves de proveedor de
OpenCode ([Credenciales](../credentials/)), los valores por defecto de agentes y workflows, los workflows ocultos, los
recursos que recibe cada Run y el sandbox. `aqorin use --global` se sigue aceptando durante una versión y no hace
falta: solo hay un ámbito.

Aqorin lo escribe con **un único escritor que toma un bloqueo**: si dos comandos lo cambian a la vez, los dos
conservan su cambio. Mantiene tus comentarios y el orden de las claves, escribe solo las claves que cambia y nunca
escribe un archivo que no puede leer: el comando se rechaza y el archivo queda como estaba. La primera vez que escribe
un archivo de la versión anterior (`schema_version: 1`), guarda ese archivo a su lado como `config.v1.yaml`, para que
puedas volver atrás.

## La preparación de los worktrees de un proyecto

Un worktree nuevo de un workflow no tiene nada instalado. `aqorin projects setup <proyecto> --set npm ci` le da al
proyecto el comando que Aqorin ejecuta en cada worktree nuevo antes del primer paso (una lista de argumentos, nunca una
línea de shell; `--set -- <comando>` cuando lleva opciones; `--clear` lo quita). Se guarda en `projects.yaml`, solo lo
pones tú y nunca se lee del repositorio.

## Pasar el `.aqorin/` de un proyecto a tu biblioteca

Los proyectos configurados antes de esta versión guardaban sus agentes, workflows, asignaciones, skills, servidores
MCP, ajustes y tareas en su propio `.aqorin/`. Aqorin ya no los lee para trabajo nuevo: hasta que se importan los de un
proyecto, un Run, un chat o una tarea nuevos en él se rechazan (`migration_pending`), Home lo dice, los comandos de la
biblioteca dicen cuántos proyectos esperan y `aqorin projects add` lo dice al añadir uno. Lo que ya está en marcha o
esperando sigue.

```bash
aqorin migrate                                  # lo que importaría; no escribe nada
aqorin migrate --yes                            # lo importa
aqorin migrate --yes --rename agent:critic-api=api-critic --with-setup api
```

- **La vista previa** muestra cada entrada con lo que puede actuar (la clase de acceso de un agente, el comando de un
  servidor MCP y los secretos que recibiría —qué variable o qué elemento del llavero, nunca un valor—, los archivos de
  una skill), cada ajuste con su valor y si tu `config.yaml` ya tiene uno, las tareas y lo que se omite (un enlace, un
  archivo o carpeta que no se puede leer o no valida, y un ajuste que nombra algo omitido). Una carpeta suya (`skills/`,
  `tasks/`…) con más de 512 archivos no se lee, y se dice.
- **Un conflicto** —el mismo id con otro contenido en dos proyectos, o en un proyecto y tu biblioteca— conserva el id
  para el de tu biblioteca y, si no, para el del primer proyecto de tu lista; los demás pasan a `<id>-<proyecto>`
  (`-2`, `-3` si ya existe) y se reescribe cada referencia a ellos en lo que se importa. `--rename <tipo>:<id>=<nuevo>`
  elige el nombre. La versión propia de un workflow integrado que tenía un proyecto lo cambiaba solo en ese proyecto: se
  importa con su propio nombre, porque en tu biblioteca cambiaría el integrado en todos los proyectos.
- **Los ajustes** se importan solo donde tu `config.yaml` no tiene ninguno, del primer proyecto que los define; la
  vista previa dice, para cada proyecto con un valor distinto, de qué proyecto es el valor que se importa. `sandbox:
  off`, la ruta de un runtime y la autenticación de Codex **nunca** se importan. El `worktree_setup` de un proyecto solo
  se importa con `--with-setup <proyecto>`; una vez importado el proyecto, lo fija `aqorin projects setup`.
- **No se escribe, mueve ni borra nada en un repositorio**: su `.aqorin/` sigue ahí hasta que lo quites tú. Un archivo
  que ya está en tu biblioteca con el mismo contenido se deja como está; uno con otro contenido nunca se sobrescribe.
  Una ejecución cortada a medias se completa al repetirla; una segunda ejecución no cambia nada. `--project <proyecto>`
  la limita a un proyecto.
- **`--yes` vuelve a leer los proyectos** e importa lo que ve, y luego lo muestra todo: ejecútalo justo después de la
  vista previa, porque un `.aqorin/` que cambie entre medias se importa como esté entonces.
- Un proyecto cuyo `.aqorin/` cambia después de importarlo (un `git pull`) se vuelve a ofrecer, y lo que cambió se
  importa junto a lo anterior con otro nombre; nada espera por él.
- Un Run creado antes de la importación se reanuda y se replanifica como antes: sus skills y servidores MCP salen de tu
  biblioteca o, si no están ahí con el mismo contenido, del `.aqorin/` del repositorio, solo si el hash coincide; si no,
  se rechaza.

pi.example.com/v1
    credential_ref: { env: EXAMPLE_API_KEY }
    default_model: some-model
```

## Variables de entorno

| Variable | Efecto |
|---|---|
| `AQORIN_CONFIG_HOME` | Dónde viven la configuración y la biblioteca. |
| `AQORIN_DATA_HOME` | Dónde viven los Runs, la evidencia y las tareas. |
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
