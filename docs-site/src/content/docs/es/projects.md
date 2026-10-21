---
title: Varios proyectos
description: Tu lista de proyectos, cómo un comando nombra uno desde cualquier carpeta y qué es un proyecto para Aqorin.
---

**Un Aqorin. Varios proyectos. Workflows independientes.** Un solo Aqorin —una TUI, una CLI— sigue todos los
proyectos que añades: Runs de varios proyectos trabajan a la vez, cada uno con su runtime y en su repositorio, y cada
proyecto conserva sus Runs, sus worktrees, su sandbox y sus pull requests. Aceptado en vivo con Claude Code, Codex,
OpenCode y Pi en macOS 27 (Apple silicon; allí Pi con una conexión de Aqorin) y en Ubuntu 26.04 (x86_64), en macOS también tras reiniciar. Está en `master`, aún no en una versión publicada.

Aqorin guarda una lista de tus proyectos —solo los que añades— para que un comando pueda nombrar un proyecto desde
cualquier carpeta. Cada proyecto conserva su configuración, sus Runs, sus worktrees y su historial, exactamente como si
tuviera su propio Aqorin.

```bash
aqorin projects add [<ruta>] [--name <nombre>]   # el proyecto en la carpeta o por encima (por defecto, la tuya)
aqorin projects                                 # cada uno con su estado y lo que hacen sus Runs
aqorin runs --project tally                     # un proyecto por su nombre, su id o una ruta, desde cualquier carpeta
aqorin projects remove tally                    # lo saca de la lista; no borra nada
```

## Qué es un proyecto

Un proyecto es una carpeta con `.aqorin/aqorin.yaml` (la crea `aqorin init`), y **su identidad es la ruta real de la
carpeta**: a través de un enlace simbólico, o con otras mayúsculas en macOS, es el mismo proyecto.

- **Una carpeta que mueves es un proyecto nuevo.** `aqorin projects add` en su nueva ruta la añade como tal; la entrada
  antigua dice *no encontrado* y conserva su historial, y devolver la carpeta a su sitio la recupera.
- **Una carpeta borrada y clonada de nuevo en la misma ruta** dice *cambiado* hasta que la añades otra vez (en Linux
  puede decir *ok* enseguida, si la nueva carpeta recibe el inodo de la anterior); en ambos casos su historial incluye
  los Runs de la carpeta anterior.
- **Un repositorio clonado dos veces** son dos proyectos.
- **Tu carpeta personal nunca es un proyecto**, ni nada por encima de ella: `aqorin init` lo rechaza, y un `.aqorin`
  allí se ignora. `aqorin run`, `feature` y `conversation create` se rechazan allí, y en cualquier carpeta que no es
  un proyecto pero contiene alguno de tus proyectos: un Run allí escribiría en ellos como en su propia carpeta. Lánzalo
  en un proyecto: entra en él con `cd` o indica `--project <nombre>`.

## La lista

Nada entra en la lista si no lo añades. `aqorin projects add` toma el proyecto en la carpeta que indicas o por encima,
con el nombre de la carpeta salvo que `--name` le dé otro (de 1 a 64 caracteres, sin `/`, sin empezar por `.`, `~` ni
`-`, único sin distinguir mayúsculas; `--name` sobre un proyecto ya en la lista lo renombra). Rechaza una carpeta que no está en un proyecto (indica `aqorin init --project
<carpeta>`), tu carpeta personal y las carpetas propias de Aqorin, una carpeta ya en la lista con otra ruta, y una ruta con un salto
de línea (ningún sandbox puede nombrarla).

`aqorin projects` lista cada proyecto con su estado:

| Estado | Significa |
|---|---|
| ok | listo para usar |
| not found | su carpeta ya no está |
| changed | hay otra carpeta en su ruta |
| not initialized | su `.aqorin/aqorin.yaml` ya no está |
| invalid | su configuración no es válida |

**Quitar un proyecto no borra nada** —ni su `.aqorin`, ni sus Runs, ni sus worktrees, ni sus ramas— y se rechaza
mientras uno de sus Runs no ha terminado o se está lanzando: cancélalo o deja que termine. Añadirlo de nuevo muestra
todo su historial.

## Nombrar un proyecto: `--project`

`--project` acepta una **ruta** (cualquier cosa con `/`, o que empiece por `.` o `~`: el proyecto en ella o por
encima) o el **nombre o id** de un proyecto que has añadido.

- Un nombre que además es una carpeta donde estás, de otro proyecto, se rechaza: indica el id (`./<nombre>` es el
  proyecto que contiene esa carpeta).
- Un valor vacío se rechaza; nunca se toma como la carpeta en la que estás. Igual tu carpeta personal si no hay un
  proyecto en ella.
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

## Global: todos los proyectos en la TUI

`aqorin` abre el proyecto en el que estás, como antes; en un repositorio git que aún no es un proyecto, su Setup; en
cualquier otro sitio —tu carpeta personal incluida— **Global**. En un proyecto, `0` (o `Esc` en su nivel superior)
muestra Global; la barra lateral lo tiene encima de Home. Su cabecera dice *all projects*, no el proyecto en el que
abriste la TUI.

- Global lista **primero lo que te espera, de todos los proyectos**, cada elemento con el nombre de su proyecto;
  después los Runs trabajando, esperando, fallidos o bloqueados y terminados hace poco (los tres últimos de cada
  proyecto); después cada proyecto con sus cuentas, o su estado y qué hacer.
- El proyecto en el que abriste la TUI, si no está en tu lista, aparece como *not added*: `a` lo añade. Sin ningún
  proyecto en la lista, Global dice cómo añadir uno.
- **`Enter`** abre el elemento en su propio proyecto. Un Run del proyecto en el que estás se abre ahí; un Run o un
  proyecto de otro cierra las pantallas de este proyecto y abre las de aquel —`Esc` y `0` vuelven a Global. Cada
  acción allí actúa solo sobre ese proyecto.
- Antes de salir del proyecto, Aqorin dice lo que queda en él: un turno de chat que está enviando sigue hasta su
  final, sin que lo veas hasta que vuelvas (salir de Aqorin antes de que acabe lo avisa primero); un mensaje en cola para él no se envía; un mensaje de chat que no has
  enviado se pierde. La misma tecla otra vez sale.
- **`n`** en Global pregunta primero el proyecto y después abre New task en él.
- Un proyecto que no está *ok* no se abre: su fila dice qué hacer, y Global dice por qué si dejó de estar *ok* desde que
  se leyó. Global lee cada proyecto sin cambiarlo, y solo
  mientras se muestra.

## Separados

- Un Run o un chat en el sandbox de Aqorin no puede escribir en tus otros proyectos (ver [Seguridad](../security/)),
  salvo uno que añadiste dentro de su propia carpeta, que forma parte de aquello en lo que trabaja.
- Una entrega solo hace commit de la carpeta de su proyecto, nunca de un proyecto que añadiste dentro de ella, y abre
  el pull request en el repositorio que nombra su `origin`.
- `GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_*`, `GH_REPO` y las demás variables que dirigen git o `gh` a otro
  repositorio se quitan antes de que Aqorin ejecute nada; tu identidad de git, SSH y tu sesión de `gh` se mantienen.

## Conviene saber

- La lista vive en la carpeta de configuración de Aqorin (`projects.yaml`) y describe la carpeta de datos con la que se
  lee: con otro `AQORIN_DATA_HOME`, tras renombrar tu usuario o en otra máquina, un proyecto no muestra Runs.
- Cada Run hereda el entorno del proceso que lo lanzó —el de tu shell o el de la TUI— y la entrega de todos los
  proyectos usa la misma sesión de `gh`: Aqorin no carga un entorno por proyecto.
