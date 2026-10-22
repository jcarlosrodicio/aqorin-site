---
title: Varios proyectos
description: Tu lista de proyectos, cómo un comando nombra uno desde cualquier carpeta y qué es un proyecto para Aqorin.
---

**Un Aqorin. Varios proyectos. Workflows independientes.** Un solo Aqorin —una TUI, una CLI— sigue todos los
proyectos que añades: Runs de varios proyectos trabajan a la vez, cada uno con su runtime y en su repositorio, y cada
proyecto conserva sus Runs, sus worktrees, su sandbox y sus pull requests. Aceptado en vivo con Claude Code, Codex,
OpenCode y Pi en macOS 27 (Apple silicon; allí Pi con una conexión de Aqorin) y en Ubuntu 26.04 (x86_64), en macOS también tras reiniciar. Está en `master`, aún no en una versión publicada.

Aqorin guarda una lista de tus proyectos —solo los que añades— para que un comando pueda nombrar un proyecto desde
cualquier carpeta. Cada proyecto conserva sus Runs, sus chats, sus tareas, sus worktrees y su historial, exactamente como si tuviera su
propio Aqorin; tu [configuración y tu biblioteca](../configuration/) son una sola, la misma en todos los proyectos.

```bash
aqorin projects add [<ruta>] [--name <nombre>]   # la carpeta (por defecto, la tuya); no escribe nada en ella
aqorin projects                                 # cada uno con su estado y lo que hacen sus Runs
aqorin runs --project tally                     # un proyecto por su nombre, su id o una ruta, desde cualquier carpeta
aqorin projects remove tally                    # lo saca de la lista; no borra nada
aqorin projects setup tally --set npm ci        # cómo se preparan sus worktrees nuevos (--clear lo quita)
aqorin migrate                                  # el .aqorin/ antiguo de los proyectos a tu biblioteca: vista previa y luego --yes
```

## Qué es un proyecto

Un proyecto es una carpeta de tu lista —la añade `aqorin projects add`, que no escribe nada en ella— y **su identidad
es la ruta real de la carpeta**: a través de un enlace simbólico, o con otras mayúsculas en macOS, es el mismo
proyecto. Un `.aqorin/` en un repositorio no hace un proyecto; solo lo lee `aqorin migrate`.

- **Una carpeta que mueves es un proyecto nuevo.** `aqorin projects add` en su nueva ruta la añade como tal; la entrada
  antigua dice *no encontrado* y conserva su historial, y devolver la carpeta a su sitio la recupera.
- **Una carpeta borrada y clonada de nuevo en la misma ruta** dice *cambiado* hasta que la añades otra vez (en Linux
  puede decir *ok* enseguida, si la nueva carpeta recibe el inodo de la anterior); en ambos casos su historial incluye
  los Runs de la carpeta anterior.
- **Un repositorio clonado dos veces** son dos proyectos.
- **Una carpeta que no es un repositorio git** también es un proyecto, y solo admite Free chats: un workflow en ella
  (New task, `aqorin run`, `feature`) se rechaza (`project_not_git`), porque sus worktrees y su entrega necesitan git.
  Al añadirla se nombran los repositorios git que contiene: pasan a ser carpetas suyas, nunca proyectos propios. En
  Linux, el primer chat con sandbox crea en ella un `.git` vacío, que se la cierra al agente (git ignora un `.git`
  vacío, y Aqorin también).
- **Tu carpeta personal nunca es un proyecto**, ni nada por encima de ella: `aqorin projects add` y `aqorin init` la
  rechazan. Un comando de un proyecto lanzado allí, o en cualquier carpeta que no esté en ninguno de tus proyectos, se
  rechaza (`project_required`). Lánzalo en un proyecto: entra en él con `cd` o indica `--project <nombre>`.

## La lista

Nada entra en la lista si no lo añades, y nada se añade solo. `aqorin projects add` toma la carpeta que indicas —por
defecto, la tuya— y no escribe nada en ella: una carpeta dentro de uno de tus proyectos es ese proyecto; una carpeta
dentro de un repositorio git añade la raíz del repositorio; cualquier otra se añade tal cual, y no es git. Toma el
nombre de la carpeta salvo que `--name` le dé otro (de 1 a 64 caracteres, sin `/`, sin empezar por `.`, `~` ni `-`,
único sin distinguir mayúsculas; `--name` sobre un proyecto ya en la lista lo renombra). Rechaza tu carpeta personal
y lo que está por encima, las carpetas propias de Aqorin, una carpeta ya en la lista con otra ruta, una carpeta que
contiene alguno de tus proyectos, o cuyo repositorio lo contiene (`project_nested`), y una ruta con un salto de línea (ningún sandbox
puede nombrarla).

`aqorin init` es `aqorin projects add` para la carpeta en la que estás (o `--project <ruta>`), y lo dice. Si no tienes
runtime por defecto, además fija uno —con `--runtime`, o eligiéndolo en una terminal—; sin ninguno de los dos, añade
la carpeta e indica `aqorin use <runtime>`. Un `init` rechazado —un runtime desconocido, una ruta que no existe— no
añade nada.

`aqorin projects` lista cada proyecto con su estado:

| Estado | Significa |
|---|---|
| ok | listo para usar |
| not found | su carpeta ya no está |
| changed | hay otra carpeta en su ruta |

**Quitar un proyecto no borra nada** —ni su carpeta, ni sus Runs, ni sus tareas, ni sus worktrees, ni sus ramas— y se rechaza
mientras uno de sus Runs no ha terminado o se está lanzando: cancélalo o deja que termine. Añadirlo de nuevo muestra
todo su historial.

**Lo que es de un proyecto, y guarda Aqorin**: sus Runs, chats y worktrees, sus [tareas](../new-task/) (en la carpeta
de datos de Aqorin, nunca en el repositorio) y su **preparación de worktrees**: el comando que se ejecuta en cada
worktree nuevo de un workflow antes de su primer paso, que se pone con `aqorin projects setup <proyecto> --set <comando>…`
(una lista de argumentos, nunca una línea de shell; `--clear` lo quita), se guarda en tu lista y nunca se lee del
repositorio.

**Un proyecto configurado antes de esta versión** guarda sus agentes, workflows, ajustes y tareas en su propio
`.aqorin/`, que Aqorin ya no lee para trabajo nuevo: un Run, un chat o una tarea nuevos en él se rechazan
(`migration_pending`) hasta que `aqorin migrate` lo importa a tu biblioteca; mira
[Configuración](../configuration/#pasar-el-aqorin-de-un-proyecto-a-tu-biblioteca). No se cambia nada en el repositorio.

## Nombrar un proyecto: `--project`

Los comandos de un proyecto —`run`, `feature`, `conversation …`, `tasks`, `worktree`, `deliver`, `open`, `runs`,
`status`, `inspect`, `logs`, `cancel`, `resume`, `answer`, `replan`, las aprobaciones…— actúan sobre `--project`; si
no, sobre el proyecto de tu lista en la carpeta en la que estás o por encima; si no, dado el id de un Run, sobre el
proyecto cuyos Runs lo tienen (un id que coincide con Runs de dos proyectos se rechaza, `run_ambiguous`); si no, se
rechazan (`project_required`) e indican `aqorin projects add <carpeta>`. Tus propios comandos, los mismos en todos los
proyectos —`agents`, `workflows`, `skills`, `mcp`, `use`, `runtimes`, `connections`, `credentials`, `config`,
`doctor`, `capabilities`—, rechazan `--project`; `aqorin migrate --project` nombra el proyecto que importar.

`--project` acepta una **ruta** (cualquier cosa con `/`, o que empiece por `.` o `~`: el proyecto de tu lista en ella
o por encima) o el **nombre o id** de un proyecto que has añadido.

- Un nombre que además es una carpeta donde estás, de otro proyecto, se rechaza: indica el id (`./<nombre>` es el
  proyecto que contiene esa carpeta).
- Un valor vacío se rechaza; nunca se toma como la carpeta en la que estás. Igual una ruta que no está en ninguno de
  tus proyectos (`project_required`).
- Un proyecto cuyo estado no es *ok* se rechaza para trabajar; sus Runs se pueden seguir listando, inspeccionando y
  cancelando por su id (`aqorin runs --project <id>`).
- El worker de un Run arranca en la carpeta de su proyecto, con las rutas que escribiste convertidas en absolutas: desde
  dónde lo lanzaste deja de importar una vez que corre.

## Qué hace cada proyecto

`aqorin projects` lee el registro de cada proyecto sin cambiarlo y dice, por proyecto, cuántos Runs están trabajando,
esperándote, fallidos o bloqueados, terminados, y sus chats; lo que te espera, con el comando que lo responde
(`--project <nombre>` incluido); y sus Runs trabajando y fallidos y los tres últimos terminados. Un registro que no
puede leer —dañado, o escrito por un Aqorin más nuevo— dice *unreadable*; los demás proyectos se siguen listando.
`--json` da lo mismo.

## Una sola app sobre todos los proyectos

La TUI es la misma dondequiera que la abras: Home, Runs y Attention cubren todos los proyectos de tu lista, cada fila
con el nombre de su proyecto, y **Projects** (`0`, la última sección del rail) lista los proyectos mismos —cada uno con
su estado y sus Runs trabajando, esperando, fallidos y terminados, sus chats abiertos y terminados (`no Runs yet` sin
ninguno; `no git` para una carpeta que no es un repositorio git), y al lado del seleccionado su carpeta, id, estado, si es git, sus Runs y su preparación de worktrees, o qué
hacer—. Sin ningún proyecto en la lista, dice cómo añadir uno, y `Enter` añade uno. La carpeta en la que abres Aqorin solo decide qué proyecto
ofrecen primero New task y Free chat; en un repositorio git que no está en tu lista, Home ofrece *Add ~/esa/carpeta*,
que `a` añade (no se escribe nada en él).

- **`Enter`** en un Run o un chat de cualquier proyecto lo abre aquí, sin relanzar nada. Cada acción sobre él
  —responder, aprobar, cancelar, reanudar, la decisión de un worktree, una entrega— actúa sobre ese proyecto, como el
  propio comando de la CLI con `--project`. Un comando que la TUI ofrece para copiar nombra su proyecto (`--project
  <nombre>`), así que funciona desde cualquier carpeta.
- Un turno de chat enviado en un proyecto sigue mientras miras otro; lo que dejaste en cola para él se envía allí
  cuando termina. Salir mientras se envía un turno lo avisa primero.
- **`n`** y **`c`** preguntan primero el proyecto, como primer paso del formulario: primero el de la carpeta en la que
  empezaste, ya elegido (también una vez que la `a` de Home la añadió), después el último que usaste, después los demás por nombre. Escribe para acotarlo por nombre
  o por carpeta (`work/no`); la línea dice cuántos coinciden. Un proyecto que no está *ok* aparece en gris, con su
  estado, y no se puede elegir. Uno que no es un repositorio git sí: el Free chat funciona allí, y *Run a workflow*
  dice que un workflow necesita git antes de planificar nada. La última entrada es **Add a folder…**: abre Add project
  y vuelve al formulario con todo lo que rellenaste, la carpeta añadida elegida; `Esc` vuelve sin cambiar nada. Sin
  ningún proyecto en tu lista, `n` y `c` se abren en Add a folder…. El título del formulario y la cabecera del plan
  nombran el proyecto.
- La TUI lee el registro de cada proyecto en solo lectura, cada dos segundos mientras está abierta: nunca migra ni
  escribe uno. Un registro escrito por un Aqorin más nuevo, o por uno más antiguo, no se lee —Runs dice cuál, y qué
  hacer (cualquier comando `aqorin` en ese proyecto pone al día uno antiguo). Una lista que no se puede leer se dice
  en Runs, Attention y Home, nunca como que nada espera.
- **Projects también cambia la lista**, cada cambio con el propio comando `aqorin projects`, así que dice y rechaza
  exactamente lo mismo que la CLI:
  - **`a` — Add project.** Escribe una carpeta: `~` es tu carpeta personal, una ruta relativa parte de la carpeta en la
    que abriste Aqorin, y `Tab` completa el nombre de una carpeta (dos veces, lista las que coinciden; en una carpeta de más de 200
    entradas avisa de que solo se leyeron las 200 primeras). Bajo la línea,
    Aqorin dice qué añadiría `Enter` —la raíz del repositorio git para una carpeta dentro de uno, la carpeta real a
    través de un enlace— o por qué no: tu carpeta personal o algo por encima, las carpetas propias de Aqorin, ya es un
    proyecto tuyo, está dentro de uno de tus proyectos, no es una carpeta. Un rechazo se queda en la línea con lo que
    escribiste. Debajo, como mucho 20 sugerencias: el repositorio git en el que abriste Aqorin cuando no es ninguno de
    tus proyectos, los repositorios git junto a las carpetas de tus proyectos y las carpetas que quitaste desde que lo
    abriste; `↑`/`↓` eligen una y `Enter` la pone en la línea.
  - **`e` — Rename** renombra un proyecto *ok*; uno cuya carpeta ya no está no se puede renombrar: quítalo, o añade la
    carpeta donde esté ahora.
  - **`x` — Remove** pregunta una vez, nombrando el proyecto y lo que se queda: su carpeta, sus Runs y sus worktrees.
    Su preparación de worktrees se olvida con él. Un proyecto con un Run sin terminar no se quita: Projects dice qué
    Runs lo retienen y cómo hacer avanzar cada uno.
  - **`s` — Worktree setup**: el único comando que se ejecuta en cada worktree nuevo de un proyecto git antes del
    primer paso de un workflow, escrito en una línea —palabras y comillas, nunca un shell, así que `&&`, `|` o `$` se
    rechazan salvo entre comillas (pon varios comandos en un script). Una línea vacía lo borra. Una preparación fijada con `aqorin projects setup`
    que tenga lo que una línea no puede mostrar —un salto de línea, un tabulador— no se ofrece en la línea, así que
    guardarla nunca la cambia.

## Separados

- Un Run o un chat en el sandbox de Aqorin no puede escribir en tus otros proyectos (ver [Seguridad](../security/)),
  salvo uno que añadiste dentro de su propia carpeta (solo posible en una lista escrita antes de que añadir lo rechazara), que forma
  parte de aquello en lo que trabaja.
- Una entrega solo hace commit de la carpeta de su proyecto, nunca de un proyecto que añadiste dentro de ella, y abre
  el pull request en el repositorio que nombra su `origin`.
- `GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_*`, `GH_REPO` y las demás variables que dirigen git o `gh` a otro
  repositorio se quitan antes de que Aqorin ejecute nada; tu identidad de git, SSH y tu sesión de `gh` se mantienen.

## Conviene saber

- La lista vive en la carpeta de configuración de Aqorin (`projects.yaml`) y describe la carpeta de datos con la que se
  lee: con otro `AQORIN_DATA_HOME`, tras renombrar tu usuario o en otra máquina, un proyecto no muestra Runs.
- Cada Run hereda el entorno del proceso que lo lanzó —el de tu shell o el de la TUI— y la entrega de todos los
  proyectos usa la misma sesión de `gh`: Aqorin no carga un entorno por proyecto.
