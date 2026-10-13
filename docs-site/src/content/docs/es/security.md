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
comprobación. En Claude Code, un paso de solo lectura o de revisión solo tiene Read, Glob y Grep: ni
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

Un Run planificado con la restricción efectiva nunca se reanuda con ella orientativa: en una versión
del runtime que ninguna comprobación cubre, la reanudación se rechaza (`policy_unenforceable`).
Refresca la comprobación, o replanifica el paso, lo que deja constancia del cambio.

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
| **El runtime, de forma nativa** | Los avisos de permiso propios de un runtime, y su propio sandbox, como el de Codex en un chat. |
| **No aplicable** | Se dice como tal. Aqorin lo solicita, y dice que solo lo solicitó. |

Una marca de sandbox que Aqorin no ha verificado en un runtime se informa como una **petición**, no
como una garantía.

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
- **Un rol que puede editar archivos.** Puede hacer en el proyecto todo lo que su runtime permita.
