---
title: Runs
description: Un Run es una ejecución duradera de un workflow, que se sigue en vivo, se responde, se reanuda y queda registrada.
---

Un **Run** es una ejecución de un workflow. Su estado pertenece a Aqorin, no a ninguna sesión de
runtime, así que un runtime que se cae no borra lo que ocurrió.

## Los Runs van desacoplados

Un Run se ejecuta en su propio worker. Salir de la TUI, o cerrar la terminal, lo deja ejecutándose.
Ejecuta `aqorin` otra vez, o `aqorin logs <run> --follow`, para seguirlo.

## Varios workflows a la vez

El primer workflow trabaja en la carpeta de tu proyecto. Uno que lances mientras otro sigue sin terminar
ahí se ejecuta en **un worktree de git propio**: fuera de tu repositorio, en la carpeta de datos de
Aqorin, en una rama nueva `aqorin/<tarea>-<id>` desde tu último commit. El plan lo dice antes de
ejecutarse, y avisa si tu carpeta tiene cambios sin commit (no están en el worktree). Sus checks, su
revisión y sus cambios son suyos, y Runs lo marca con `⎇`.

Un worktree nuevo no tiene nada instalado. Para prepararlo, pon `worktree_setup` en
`.aqorin/aqorin.yaml` (mira [Configuración](../configuration/)); sin él no se prepara nada, y el plan
lo dice.

Como mucho cuatro workflows van en worktrees a la vez; un quinto lanzamiento se rechaza y los nombra.

Cuando ese Run termina, su Result dice qué pasó con su worktree, y decides tú — nada ocurre solo, y
cada decisión queda registrada en el Run (`aqorin logs <run>` la muestra):

| Tecla | Qué hace |
|---|---|
| `I` | **Integrar**: sus cambios se confirman en la rama y se fusionan en la rama desde la que se creó el worktree. Se rechaza, sin cambiar nada, si tu carpeta está en otra rama, tiene cambios sin commit o un workflow en marcha; un conflicto no fusiona nada y nombra los ficheros. |
| `U` | **Deshacer** una integración, tras preguntar: un commit nuevo revierte la fusión; tu historia no se reescribe. |
| `K` | **Conservar la rama**, para un pull request; el worktree se borra. |
| `X` | **Descartar** el worktree y la rama, tras preguntar. |

Desde la CLI: `aqorin worktree list`, `aqorin worktree integrate|keep|undo <run>`, `aqorin worktree
discard <run> --yes`. `aqorin status`, `runs` e `inspect` dicen qué Runs trabajan en un worktree y qué
pasó con él. Una decisión que empezó y no terminó aparece como *interrumpida*; decide de nuevo.

Un lanzamiento que se paró antes de que existiera su Run puede dejar un worktree. `aqorin worktree list`
lo nombra como no registrado por ningún Run, y `aqorin worktree discard <rama> --yes` lo borra.

Un worktree separa los checks, la revisión y los cambios de cada Run. En macOS, el sandbox de Aqorin además
mantiene a sus agentes fuera de la carpeta de tu proyecto y de los worktrees de otros Runs — mira
[Seguridad](../security/). Con `sandbox: off` no es un muro: un agente puede escribir donde puedas tú.

Un proyecto que no es un repositorio git ejecuta un workflow cada vez. Los Free chats nunca cuentan.

## La pantalla Runs (`2`)

Cada Run y chat de este proyecto aparece con su estado y cuándo empezó. Un chat abierto dice
*chat open*. `/` filtra la lista, `n` empieza una [nueva tarea](../new-task/) y `c` empieza un
[Free chat](../free-chat/).

## La vista de un Run

La vista de un Run es un panel:

- **A la izquierda**, los pasos: el nombre de cada uno con el símbolo de su estado, su estado y su
  tiempo a la derecha, qué agente lo ejecuta y dónde (agente · runtime), y su intento a partir del segundo.
  Debajo, *Review loop 1 of 3* cuando una revisión ha pedido cambios, y *Checks* cuando la tarea tiene
  comprobaciones.
- **En el centro**, el trabajo del paso seleccionado. Una línea dice qué está haciendo ahora
  (*Thinking…*, *Running tool… npm test*, *Waiting for you*). Un paso que falló dice por qué, con las últimas palabras de su runtime. Un
  paso que se ejecuta de nuevo con tu respuesta a sus preguntas muestra antes el intento que preguntó:
  lo que dijo, sus preguntas y lo que respondiste. Luego vienen sus mensajes, bajo quién los dice —*◆ el agente*, *› you* para tus respuestas, *? Asked*
  para sus preguntas, *◈ Aqorin · verdict* para el veredicto con que acaba un paso de revisión,
  verificación o comprobación (su decisión y sus hallazgos, en palabras)—, cada intento bajo su propia línea, con el Markdown del
  agente formateado si tu terminal tiene color (títulos, negrita y cursiva, listas, citas, bloques de código, tablas; sin color, tal cual). Las llamadas a herramientas entre dos mensajes se
  pliegan en una sola línea atenuada, con cuántas son y las que fallaron: `t` las muestra una a una, las de un subagente bajo la llamada que lo lanzó.
  Debajo, siempre a la vista aunque se desplacen: quién ejecuta el paso, con el modelo que informa el
  runtime, el contexto que lleva usado donde el runtime lo dice (en Claude Code, de su ventana al
  terminar el paso; en Pi y OpenCode, el de la última petición) y los tokens gastados, de entrada y de
  salida.
- **A la derecha**, el Run en pocas líneas, una por dato: su estado, workflow, tarea, tiempo, cambios,
  handoffs, los **Tokens** del Run (los de entrada y salida de todos sus intentos, también los de la
  comprobación de un agente, tal como los informó cada runtime; Claude Code y Codex, al terminar cada intento) el **Context** del paso que trabaja
  (los Runs de Codex no lo informan) y su **Run id**. `d` muestra los detalles del paso seleccionado (su asignación, versión e intentos). Lo
  que Aqorin quiere que sepas (por qué el Run es orientativo, qué dice de sus flags la versión de un
  runtime) no se repite ahí: `!` muestra los **notices** en su lugar. Lo que falla y lo que te espera
  se muestra siempre.

Tras un paso cuyo trabajo se comprueba, los pasos muestran **checking** hasta que las comprobaciones
responden: Aqorin ejecuta las comprobaciones de la tarea, después de que el runtime del paso
compruebe el trabajo (de forma orientativa) si la tarea pidió el [agent check](../new-task/#comprobaciones).
Sin comprobaciones ni agent check no se ejecuta nada: el paso sigue y sus comprobaciones dicen
*not checked*. El paso siguiente las espera, así que un revisor que
todavía no ha empezado suele estar esperando a estas comprobaciones. Mientras tanto, el trabajo del
paso muestra qué hacen: los mensajes y llamadas a herramientas del runtime y, después, cada
comprobación de la tarea mientras se ejecuta; cuando responden, quedan bajo **Checks**.

La selección sigue al paso que se ejecuta: al abrir un Run queda seleccionado, y cuando termina se
selecciona el siguiente, salvo que te hayas movido a otro paso para leerlo, que sigue seleccionado hasta
que vuelvas al que se está ejecutando.

`Tab` a los pasos, y luego `↑` `↓` elige uno. `y` envía los mensajes del paso seleccionado al
portapapeles de tu terminal, si la terminal lo permite (no puede confirmarlo). Una selección con el
ratón coge líneas enteras de todos los paneles: `z` muestra solo el panel enfocado, para que coja solo
sus líneas, y `z` otra vez los muestra todos. `c` `c` cancela el Run. Ctrl+T abre el [Trace](../trace/).

## El resultado

Un Run terminado se abre en su **Result** (uno que sigues hasta el final pasa a él solo), que muestra:

- cómo terminó, y por qué;
- la revisión;
- la verificación, si el workflow tiene una, dicha aparte: nunca aprueba el Run;
- las comprobaciones;
- los cambios;
- su **garantía** (*assurance*). Un Run es *advisory* (orientativo) cuando su workflow dice que lo
  es, no tiene ningún paso que ejecute comprobaciones o ningún paso de revisión, cuando la tarea no
  tenía comprobaciones, o cuando un paso de solo lectura o de revisión se ejecutó con una
  restricción orientativa. Si no, es *enforced* (aplicado por Aqorin). Un éxito advisory dice
  "completed — advisory": nunca se muestra como validado ni como aprobado de forma independiente.
  El Result afirma que se alcanzó la garantía solo para un Run que tuvo éxito.

## Commit y pull request

Un Run que tuvo éxito y dejó cambios ofrece **Commit and PR…** (`P`) en su Result. El runtime y el modelo del
paso de revisión del Run redactan el mensaje del commit y el pull request, en un turno en un directorio desechable al
que se le pide que no use herramientas. Ese turno recibe la tarea, lo que dijeron los pasos, la revisión y los ficheros
cambiados, no el diff. Ves el plan y el borrador (adónde se sube, todos los ficheros y los que parecen una clave
o un fichero de entorno), con lo que parezca un secreto ya redactado. Puedes editar el mensaje del commit o el
pull request, y confirmas; si el árbol cambió entretanto, no se entrega nada.

Después, Aqorin:

- hace commit de todos los cambios del árbol de trabajo, también los que no hizo el Run (lo avisa antes de que
  confirmes), en una rama nueva `aqorin/<tarea>-<id>`, en la que se queda tu carpeta (un Run en su propio
  worktree, en su rama);
- la sube a `origin`;
- abre el pull request con `gh` contra la rama de la que partió, con tu identidad de git y tu sesión de gh.

Nunca lo fusiona. Para un Run que trabajó en el sandbox de Aqorin no se ejecuta ningún hook de git; si no, git
se comporta como lo hace contigo.

Antes de redactar nada comprueba que puede entregarlo: un repositorio git en una rama, cambios que confirmar, un
remoto `origin` que tenga la rama base, `gh` instalado y con sesión iniciada (`gh auth login`), y ningún otro
workflow sin terminar en la carpeta. Una entrega que se quedó a medias (por ejemplo, un push rechazado) sigue
desde donde se paró al volver a pulsar `P`. El Result dice entonces
**Delivered**, con el pull request. Desde el CLI: `aqorin deliver <run> --draft` y luego
`aqorin deliver <run> --yes`, o `--from <borrador.json> --yes` con un borrador tuyo.

## Desde la CLI

```bash
aqorin runs
aqorin status <run>
aqorin inspect <run>
aqorin logs <run> --follow [--json-events]
aqorin cancel <run>
aqorin resume <run>
```

Ctrl+C sobre un Run de la CLI lo interrumpe en el siguiente límite de paso, y se puede reanudar. Un
segundo Ctrl+C deja de esperar, pero la interrupción se produce igualmente.
