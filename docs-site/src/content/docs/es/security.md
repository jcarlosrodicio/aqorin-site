---
title: Modelo de seguridad
description: Qué aplica Aqorin, dónde se aplica cada garantía y qué solo pide a un runtime.
---

La regla de Aqorin es simple: **nunca afirma una garantía que no puede aplicar**. Cada garantía dice
dónde se aplica. Cada alternativa dice en qué se diferencia de ejecutar de forma nativa. Nada se
eleva en silencio.

## Lo que aplica el motor

Estas reglas son código del motor de Aqorin, no instrucciones que a un modelo se le pida recordar:

- **Transiciones legales.** Un paso se mueve solo por las transiciones de su workflow. Un atajo,
  como pasar de implement directamente a done, se rechaza.
- **Validación.** Con comprobaciones, Aqorin ejecuta tus comandos por sí mismo, sin shell, y solo su
  código de salida decide.
- **Revisión y presupuestos.** Un Run termina con éxito solo cuando su revisión requerida está
  aprobada, sus comprobaciones han pasado, sus aprobaciones están resueltas y no se ha superado
  ningún presupuesto.
- **Human Approval (aprobación humana).** Lo que necesita tu aprobación la espera. `--yes` nunca
  aprueba nada.
- **Admisión antes de que se ejecute nada.** Un plan que no se puede cumplir (una conexión sin
  configurar, una skill obligatoria que un runtime no admite) se rechaza antes de que arranque ningún
  runtime. La restricción de un paso de solo lectura o de revisión también se evalúa antes de que se
  ejecute nada, y se indica si es efectiva u orientativa.

<a id="restricted-roles"></a>

## Roles restringidos

Cualquier agente puede ejecutarse en cualquier runtime, también los de solo lectura y los de
revisión. Lo que cambia es si su restricción (no escribir, no ejecutar comandos) es **efectiva**
(enforced) u **orientativa** (advisory).

Es **efectiva** donde Aqorin ha validado el mecanismo que la aplica, para ese runtime, versión,
modelo y plataforma. Validado hoy, en macOS arm64:

| Runtime | Versión | Modelos |
|---|---|---|
| OpenCode | 1.18.32 | `nan/glm5.3-flash` |
| Claude Code | 2.1.296 | `claude-opus-5-5`, `claude-sonnet-5-5` |

El modelo debe indicarse en la asignación: el modelo por defecto de un runtime no lo cubre ninguna
comprobación. En OpenCode, `nan/glm5.3-flash` es el modelo `glm5.3-flash` sobre una conexión de Aqorin
llamada `nan`. En Claude Code, un paso de solo lectura o de revisión solo tiene Read, Glob y Grep: ni
comandos, ni escritura, ni skills, ni servidores MCP. Cuando un runtime se actualiza,
`aqorin eligibility refresh <runtime> --model <modelo>` comprueba la nueva versión en esta máquina
(OpenCode y Claude Code; una llamada al modelo por control, preguntando antes).

En cualquier otro sitio (Codex, Pi, otro modelo u otra versión), la restricción es **orientativa**. El
paso se ejecuta con el modo de solo lectura propio de su runtime, y se le indica que no escriba ni
ejecute comandos:

| Runtime | Su modo de solo lectura |
|---|---|
| Codex | el sandbox de solo lectura, con su shell, exec y multiagente desactivados |
| Pi | solo las herramientas read, grep, find y ls; sin extensiones ni servidores MCP |
| OpenCode, Claude Code | sus permisos de solo lectura |

Nada demuestra que el paso lo respete, así que Aqorin nunca lo afirma. El plan marca el paso como
`advisory`, los selectores dicen `restriction enforced` o `restriction advisory`, y el resultado del
Run es orientativo: nunca se presenta como validado ni como revisado de forma independiente. Aqorin
nunca amplía la clase de acceso de un rol para que un runtime encaje.

**En macOS, el sandbox de Aqorin obliga a ese paso a solo leer ficheros.** Con el sandbox activo, un
paso de solo lectura o de revisión en Claude Code, OpenCode, Pi o Codex no puede escribir en ningún sitio
salvo el estado propio de su runtime, sus cachés y sus temporales —ni tu proyecto, ni su `.git`, ni tu
home—, sea cual sea el modelo: el kernel de macOS rechaza la escritura, y una comprobación en este Mac
(sin llamar a ningún modelo) lo demuestra antes de que el paso se ejecute. Codex se ejecuta ahí con su
propio sandbox desactivado, solo dentro del de Aqorin, y conserva su shell —su única forma de leer
ficheros—, así que puede ejecutar comandos que solo lean: sus escrituras en tu proyecto y tus ficheros se
rechazan, pero un comando puede leer lo que puedas leer tú y salir a la red, así que ese paso es siempre
orientativo. El plan dice entonces que **el sandbox de Aqorin
limita sus escrituras al estado propio de su runtime y que sus comandos no se verifican**: el paso sigue
siendo orientativo salvo que una comprobación cubra también sus comandos, porque si no, que no ejecute
comandos solo se le pide.

Un Run planificado con la restricción efectiva nunca se reanuda con ella orientativa: en una versión
del runtime que ninguna comprobación cubre, la reanudación se rechaza (`policy_unenforceable`).
Refresca la comprobación, o empieza un Run nuevo, cuyo plan indicará la restricción como orientativa.

## Comandos que puede ejecutar un paso

Un paso que edita archivos puede también ejecutar comandos, donde su runtime lo permite. En Claude
Code, todo agente de la clase *edita archivos* —el developer incluido— tiene la shell: puede ejecutar
los tests, linters y scripts del proyecto, con tus permisos, como harías tú al usar Claude Code. La
shell no está limitada a la carpeta del proyecto, y Aqorin no limita qué comandos ejecuta; el plan lo
dice en cada paso así. Un paso de solo lectura o de revisión nunca la tiene.

## Tu configuración y tus claves

- Aqorin nunca escribe la configuración de tus runtimes. Lo que le da a un runtime en un paso de
  workflow es un entorno aislado, con espacio de nombres propio, para un intento.
- Las claves se guardan **solo por referencia**: el nombre de una variable o un elemento del llavero
  de macOS. El valor de una clave se resuelve cuando se ejecuta un intento, se le da únicamente a
  ese intento, y se borra de todo lo que Aqorin muestra o registra. Aqorin nunca almacena ni
  imprime el valor de una clave.
- Aqorin nunca inicia sesión por ti, y nunca lee los archivos de credenciales de un runtime.

## Dónde se aplica cada garantía

| Aplicada por | Ejemplo |
|---|---|
| **Aqorin** | Transiciones, presupuestos, comprobaciones, aprobaciones, admisión, referencias de credenciales. |
| **El kernel de macOS** | El sandbox de Aqorin alrededor de Claude Code, OpenCode y Pi en un Run de workflow o en un Free chat: las escrituras de abajo, rechazadas. |
| **El runtime, de forma nativa** | Los avisos de permiso propios de un runtime, y su propio sandbox, como el de Codex. |
| **No aplicable** | Se dice como tal. Aqorin lo solicita, y dice que solo lo solicitó. |

Una marca de sandbox que Aqorin no ha verificado en un runtime se informa como una **petición**, no
como una garantía.

## El sandbox alrededor de un Run de workflow

En macOS, Claude Code, OpenCode y Pi en un Run de workflow se ejecutan en el sandbox de Aqorin
(Seatbelt). Sus agentes escriben en la carpeta o el worktree del propio Run y en cualquier sitio fuera de tu
proyecto. Estas escrituras fallan con `Operation not permitted`:

- las demás carpetas del repositorio, su `.git` y su `.aqorin` — así un agente no puede hacer commit, mover
  una rama, añadir un hook en `.git` ni apagar el sandbox; Aqorin hace el commit cuando integras un worktree;
- los worktrees de otros Runs, y los ficheros del propio Aqorin — incluido su registro de tus Runs;
- tus claves, credenciales de la nube y configuración de git y de la shell (`~/.ssh`, `~/.aws`,
  `~/.gitconfig`, `~/.zshrc`…, y el fichero al que apunta uno enlazado);
- la configuración propia de los agentes (`~/.claude/settings.json`, `~/.codex`, `~/.config/opencode`,
  `~/.pi`…) y los ejecutables de tu PATH (`~/.local/bin`, los de Homebrew).

Ninguno de ellos, ni ninguna carpeta por encima, se puede renombrar para apartarlo. Los checks del Run también
se ejecutan en el sandbox, e integrar el worktree de un Run con sandbox no ejecuta ningún hook de git — sus
agentes podrían haberlo escrito. Las lecturas y la red no se limitan. Codex conserva su propio sandbox; el de Claude Code se apaga dentro del
de Aqorin para ese Run, sin cambiar tu configuración. Donde el sandbox no se puede montar, el Run se rechaza.
`sandbox: off` en `.aqorin/aqorin.yaml` ejecuta sin él, y cada Run lo dice.

Un Free chat en Claude Code, OpenCode o Pi se ejecuta en el mismo sandbox y escribe en la carpeta de tu
proyecto: su sandbox se decide al empezar (o continuar) el chat, y cada turno se ejecuta en ese. Un chat
empezado antes de esto se ejecuta sin él, y lo dice. Un chat de Pi con *Your configuration* no puede ejecutarse
en él —Pi escribe en `~/.pi`, que sigue cerrado—, así que usa la configuración de Aqorin, o `sandbox: off`.

## Free chat

Un Free chat se ejecuta como lo hace su runtime en su propia terminal.

- En **Ask**, el runtime te pregunta lo que te preguntaría en su terminal.
- En **Full access**, ejecuta cualquier comando y edita cualquier archivo sin preguntar. Tú
  confirmas este modo al elegirlo.
- Con **Your configuration**, todo lo que tus ajustes ya permitan se ejecuta sin preguntar.

Mira [Free chat](../free-chat/).

## Lo que Aqorin no acota

- **Lo que hace un servidor MCP con su acceso.** Aqorin elige qué servidores y herramientas puede
  usar un agente, no lo que hace el servidor.
- **Tus comandos de comprobación.** Se ejecutan con tus permisos. Son código en el que confías.
- **Un rol que puede editar archivos.** Puede hacer en su propia carpeta todo lo que su runtime permita —
  y, con `sandbox: off`, en cualquier sitio donde puedas tú.
- **Lo que lee un agente con sandbox,** y adónde se conecta.
