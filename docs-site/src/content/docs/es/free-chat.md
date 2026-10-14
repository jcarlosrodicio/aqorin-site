---
title: Free chat
description: Una conversación con un runtime a través de Aqorin, como se ejecuta en su propia terminal, con sus permisos a la vista.
---

El **Free chat** es una conversación con un runtime, a través de Aqorin. Empieza uno con la primera
opción de New task, o con `c` en Runs. Elige un runtime y un modelo, y decide cómo funciona. En Pi
también se ofrecen los modelos de las conexiones de Pi que configuraste en Runtimes, como *modelo ·
conexión*: el chat se ejecuta entonces aislado sobre esa conexión, con su clave pasada por nombre.

Los Free chats no se esperan entre sí ni esperan a un workflow: puedes tener varios abiertos, y un
workflow se ejecuta a su lado. Si un mensaje falla —un error del proveedor—, el chat dice por qué con
las palabras del runtime y sigue: vuelve a enviar o termínalo. Un chat que no arranca dice por qué en un
diálogo.

## Cómo funciona

El último paso del formulario pregunta dos cosas.

**Qué puede hacer:**

| Modo | Significa |
|---|---|
| **Ask** (por defecto) | Todo lo que el runtime te preguntaría en su propia terminal, te lo pregunta aquí. |
| **Full access** | Ejecuta cualquier comando y edita cualquier archivo sin preguntar. Tú confirmas esta elección. |

**Su configuración:**

| Configuración | Significa |
|---|---|
| **Isolated** | El perfil limpio de Aqorin. |
| **Your configuration** | Tus ajustes, plugins, extensiones y servidores MCP. El runtime los lee; Aqorin nunca los escribe. Lo que ya permitan se ejecuta sin preguntar, como en tu terminal. |

### Por runtime

| Runtime | Ask | Full access | Configuración |
|---|---|---|---|
| Claude Code | Sus avisos de permiso, aquí | Sí | Isolated o la tuya |
| Codex | El valor por defecto propio de Codex; mira más abajo | Sí | El home de Codex propio de Aqorin |
| OpenCode | Sus avisos de permiso, aquí | Sí | Siempre la tuya |
| Pi | — Pi nunca pregunta antes de usar una herramienta | Siempre | Isolated o la tuya |

En un chat de Codex, **Ask** es el valor por defecto propio de Codex. El sandbox de Codex le deja
trabajar en tu proyecto sin preguntar, y pregunta antes de usar la red o una ruta fuera de sus
raíces escribibles. Ese sandbox es de Codex: Aqorin lo solicita y comprueba que Codex informa de que
está en vigor, pero no lo aplica él mismo. El chat de Codex se ejecuta en el home de Codex propio de
Aqorin, con tu inicio de sesión enlazado, nunca copiado, y nunca con tu configuración.

Un chat de OpenCode lee tu configuración de OpenCode y recibe las variables que tu
`~/.config/opencode/opencode.json`, `.jsonc` o `config.json` global nombra como `{env:NOMBRE}` —una clave de
proveedor como `NAN_API_KEY`— desde el entorno con el que se arrancó Aqorin: por nombre, nunca
guardadas y ocultas en lo que Aqorin muestra y guarda, como una credencial. No se leen para esto el
`opencode.json` de un proyecto, `OPENCODE_CONFIG` ni `OPENCODE_CONFIG_DIR`, y nunca se pasa un nombre
que una credencial no puede tener (como `PATH` u `OPENCODE_…`). Si un mensaje falla, el error dice el
motivo del proveedor.

En un chat de OpenCode, Aqorin mantiene desactivada una cosa: los subagentes de OpenCode (su
herramienta task). Sus peticiones vendrían de una sesión que el chat no sigue, así que esperarían
sin que las vieras.

## La conversación

El chat muestra:

- tus mensajes y las respuestas del runtime;
- sus herramientas, como filas de una línea;
- una caja al final donde escribes.

El marco de la caja dice de quién es el turno y qué está haciendo el agente: *Thinking…*, *Running
tool… npm test*, *Waiting for you* o *Ready*. Mientras el agente trabaja, lo que escribes se guarda
como borrador hasta que sea tu turno; no se envía nada por su cuenta. Lo que envías se muestra al
instante, marcado *sending…* hasta que el runtime lo tiene.

La cabecera muestra el modo y de quién es la configuración en uso. Para Claude Code y Codex,
muestra también cuánto de la ventana de contexto del modelo está usado.

## Permisos y preguntas

- Cuando el runtime pide permiso durante tu turno, se abre un diálogo: **Allow once** o **Deny**.
  Si encuentras una petición que ya está esperando, el chat la muestra, y respondes con `/allow` o
  `/deny`.
- Cuando el runtime hace una pregunta (Claude Code, OpenCode y Codex pueden, y también el diálogo de
  una extensión de Pi), se abre de la misma manera, y espera en el chat un `/answer <text>`.
- Las preguntas y las aprobaciones aparecen también en [Attention](../attention/).

## Comandos

| Comando | Hace |
|---|---|
| `Enter` | Enviar. `\` y luego `Enter`, o Shift+Enter, añade una línea. |
| `/interrupt` o Ctrl+C | Detener el turno, donde el runtime lo admita. |
| `/allow`, `/deny` | Responder a una petición de permiso. |
| `/answer <text>` | Responder a una pregunta. |
| `/finish` | Terminar el chat, tras preguntar. También en la paleta y en F1. |
| `/cancel` | Cancelar el Run del chat, tras preguntar: para un turno que nunca responde; `/follow-up` lo continúa después. |
| `/follow-up` | Empezar otro chat después de este. |
| Ctrl+T | Los pasos y la actividad del Run. |

```bash
aqorin conversation create --free-chat --runtime claude-code --permission-mode ask --runtime-config isolated
aqorin conversation send <conversation> "Explain src/index.ts"
aqorin conversation finish <conversation>
```
