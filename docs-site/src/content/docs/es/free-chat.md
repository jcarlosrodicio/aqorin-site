---
title: Free chat
description: Una conversación con un runtime a través de Aqorin, como se ejecuta en su propia terminal, con sus permisos a la vista.
---

El **Free chat** es una conversación con un runtime, a través de Aqorin. Empieza uno con la primera
opción de New task, o con `c` en Runs. Elige un runtime y un modelo, y decide cómo funciona. En Pi,
si configuraste conexiones de Pi en Runtimes, primero eliges **Its connection** —*None* para los
proveedores propios de Pi, o una de las tuyas, cuyos modelos se ofrecen después con el suyo por defecto
primero—: el chat se ejecuta entonces aislado sobre esa conexión, con su clave pasada por nombre. Un chat
de OpenCode siempre corre sobre una de tus conexiones de OpenCode —primero la de por defecto de OpenCode,
nunca *None*— y luego uno de sus modelos.

Los Free chats no se esperan entre sí ni esperan a un workflow: puedes tener varios abiertos, y un
workflow se ejecuta a su lado. Si un mensaje falla —un error del proveedor—, el chat dice por qué con
las palabras del runtime y sigue: vuelve a enviar o termínalo. Si el proceso que envió un turno termina
antes que él —se cerró la terminal, se mató `aqorin conversation send`—, el turno aparece como *Turn failed*,
con lo que había hecho, y se acepta el siguiente mensaje; el chat no se
cancela. Un chat que no arranca dice por qué en un diálogo.

## Cómo funciona

El último paso del formulario pregunta tres cosas.

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

**Esfuerzo (*Effort*):** cuánto razona el modelo, en los niveles propios del runtime. **Default** lo deja al
runtime.

| Runtime | Niveles | El control del runtime |
|---|---|---|
| Claude Code | low, medium, high, xhigh, max | `--effort` |
| Codex | minimal, low, medium, high, xhigh | `model_reasoning_effort` |
| Pi | off, minimal, low, medium, high, xhigh, max | `--thinking` |
| OpenCode | — | su esfuerzo es una variante del modelo de su proveedor, y las conexiones de Aqorin no declaran ninguna |

En el chat, `/effort <nivel>` (o `/effort`, para elegirlo; `/effort default`) lo cambia desde tu siguiente
mensaje; la cabecera del chat lo muestra. Es una petición: el modelo aplica lo que admite. Un chat de Pi con
*Your configuration* mantiene el nivel una vez elegido (Pi conserva el nivel de una sesión, y su valor por defecto
es el de tus ajustes): elige otro nivel en lugar de Default. Lo mismo un chat de Codex cuyo modelo no tiene un esfuerzo
por defecto que Codex indique: Codex conserva el último nivel, y el mensaje se rechaza
(`codex_effort_default_unknown`): elige un nivel.

### Por runtime

| Runtime | Ask | Full access | Configuración |
|---|---|---|---|
| Claude Code | Sus avisos de permiso, aquí | Sí | Isolated o la tuya |
| Codex | El valor por defecto propio de Codex; mira más abajo | Sí | El home de Codex propio de Aqorin |
| OpenCode | Sus avisos de permiso, aquí | Sí | Siempre aislado, sobre una conexión |
| Pi | — Pi nunca pregunta antes de usar una herramienta | Siempre | Isolated o la tuya |

En un chat de Codex, **Ask** es el valor por defecto propio de Codex. El sandbox de Codex le deja
trabajar en tu proyecto sin preguntar, y pregunta antes de usar la red o una ruta fuera de sus
raíces escribibles. Ese sandbox es de Codex: Aqorin lo solicita y comprueba que Codex informa de que
está en vigor, pero no lo aplica él mismo. El chat de Codex se ejecuta en el home de Codex propio de
Aqorin, con tu inicio de sesión enlazado, nunca copiado, y nunca con tu configuración.

En macOS, un chat de Claude Code, OpenCode o Pi se ejecuta en el sandbox de Aqorin, sea cual sea su modo:
escribe en tu proyecto y fuera de él, nunca en el `.git` o el `.aqorin` del repositorio, en los worktrees de
otros Runs, en los archivos de Aqorin ni en tus claves y ajustes. Un chat de Pi con *Your configuration* no
puede ejecutarse en él. Mira [Seguridad](../security/).

Un chat de OpenCode corre en el home de OpenCode propio de Aqorin y solo sobre su conexión: nunca con tu
configuración de OpenCode, su inicio de sesión, el `opencode.json` de un repositorio ni las variables que
lee tu configuración. La clave de la conexión le llega por nombre, nunca se guarda y se oculta en lo que
Aqorin muestra y guarda. Si no tienes ninguna conexión de OpenCode, el chat no empieza y Aqorin te dice
cómo añadir una. Si un mensaje falla, el error dice el motivo del proveedor. Un chat empezado antes de
esta versión no tiene conexión: empieza uno nuevo.

En un chat de OpenCode, Aqorin mantiene desactivada una cosa: los subagentes de OpenCode (su
herramienta task). Sus peticiones vendrían de una sesión que el chat no sigue, así que esperarían
sin que las vieras.

## La conversación

El chat muestra:

- tus mensajes, tras una barra a la izquierda, y las respuestas del runtime;
- sus herramientas, como filas grises de una línea con su ✓ o ✗ en color — si hay cinco o más
  seguidas, se ven las tres últimas bajo una línea que resume las anteriores (*✓ 9 earlier tools:
  shell ×8, apply_patch*; la actividad de la Run, Ctrl+T, las lista todas);
- una caja al final donde escribes, con el cursor ya en ella.

Todo se lee en el orden en que pasó: el texto y las herramientas de la respuesta, por turnos, y una
respuesta tuya, o un mensaje que envías durante el turno, entre las partes de la respuesta que vinieron
antes y después, también mientras el turno sigue en marcha. Un enlace de la respuesta se ve como su
texto y a dónde apunta: una ruta relativa al proyecto (`~` fuera de él). `aqorin conversation inspect`
lista los mensajes en ese mismo orden.

El marco de la caja dice de quién es el turno y qué está haciendo el agente: *Thinking…*, *Running
tool… npm test*, *Waiting for you* o *Ready*. Lo que envías se muestra al
instante, marcado *sending…* hasta que el runtime lo tiene. La respuesta aparece según la escribe el
modelo, en todos los runtimes; la última palabra de una línea puede esperar al siguiente espacio,
porque Aqorin solo muestra el texto donde ningún secreto puede quedar partido en dos.

La cabecera muestra el modo y de quién es la configuración en uso. Para Claude Code y Codex,
muestra también cuánto de la ventana de contexto del modelo está usado.

## Escribir mientras el agente trabaja

- **Enter lo pone en cola**: se muestra debajo como *queued* y se envía como el siguiente mensaje
  cuando el turno acaba con una respuesta; varios mensajes en cola van juntos, en orden. Si el turno
  acaba de otra forma (te espera una pregunta, falló, lo interrumpiste), no se envía nada por su
  cuenta: lo que tenías en cola vuelve a la caja.
- **Tab lo envía ya**, dentro del turno en curso, donde el runtime acepta un mensaje mientras
  trabaja: Codex, Pi y OpenCode, cada uno en su siguiente paso —tras las herramientas en marcha,
  antes de que el modelo vuelva a escribir—, nunca a mitad de frase. Claude Code no acepta ninguno,
  así que sus mensajes van a la cola. Si el runtime no lo acepta, o el turno acaba antes, queda en
  cola y el chat lo dice.
- La cola vive en esa ventana: si sales con algo en cola, se te avisa de que no se envía.

## Permisos y preguntas

- Cuando el runtime pide permiso durante tu turno, se abre un diálogo: **Allow once** o **Deny**.
  Si encuentras una petición que ya está esperando, el chat la muestra, y respondes con `/allow` o
  `/deny`.
- Cuando el runtime hace una pregunta (Claude Code, OpenCode y Codex pueden, y también el diálogo de
  una extensión de Pi), se abre de la misma manera, y espera en el chat un `/answer <text>`.
- Las preguntas y las aprobaciones aparecen también en [Attention](../attention/).

## Comandos

Escribe `/` al principio de un mensaje y el chat lista sus comandos, cada uno con lo que hace: ↑↓ para elegir,
**Enter** lo ejecuta, **Tab** lo escribe en tu mensaje (para añadir su texto, como `/answer <text>`), Esc cierra
la lista.

| Comando | Hace |
|---|---|
| `Enter` | Enviar; mientras el agente trabaja, lo pone en cola para el siguiente turno. `\` y luego `Enter`, o Shift+Enter, añade una línea. |
| `Tab` | Mientras el agente trabaja, enviarlo ya, dentro del turno en curso (Codex, Pi, OpenCode). |
| `/interrupt` o Ctrl+C | Detener el turno, donde el runtime lo admita. |
| `/allow`, `/deny` | Responder a una petición de permiso. |
| `/answer <text>` | Responder a una pregunta. |
| `/effort <level>` | El esfuerzo del modelo desde tu siguiente mensaje (`default`: el del runtime). |
| `/finish` | Terminar el chat, tras preguntar, y volver a Runs. También en la paleta y en F1. |
| `/cancel` | Cancelar el Run del chat, tras preguntar: para un turno que nunca responde, que el chat señala; `/follow-up` lo continúa después. También *Cancel the chat…* en el pie, la paleta y F1. |
| `/follow-up` | Empezar otro chat después de este. |
| Ctrl+T | Los pasos y la actividad del Run. |

```bash
aqorin conversation create --free-chat --runtime claude-code --permission-mode ask --runtime-config isolated
aqorin conversation send <conversation> "Explain src/index.ts"
aqorin conversation send <conversation> --effort high -- "Now refactor it"
aqorin conversation finish <conversation>
```
