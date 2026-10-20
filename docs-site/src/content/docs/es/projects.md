---
title: Varios proyectos
description: Tu lista de proyectos, cómo un comando nombra uno desde cualquier carpeta y qué es un proyecto para Aqorin.
---

Aqorin guarda una lista de tus proyectos —solo los que añades— para que un comando pueda nombrar un proyecto desde
cualquier carpeta. Cada proyecto conserva su configuración, sus Runs, sus worktrees y su historial, exactamente como si
tuviera su propio Aqorin.

```bash
aqorin projects add [<ruta>] [--name <nombre>]   # el proyecto en la carpeta o por encima (por defecto, la tuya)
aqorin projects                                 # cada uno con su estado
aqorin runs --project tally                     # un proyecto por su nombre, su id o una ruta, desde cualquier carpeta
aqorin projects remove tally                    # lo saca de la lista; no borra nada
```

## Qué es un proyecto

Un proyecto es una carpeta con `.aqorin/aqorin.yaml` (la crea `aqorin init`), y **su identidad es la ruta real de la
carpeta**: a través de un enlace simbólico, o con otras mayúsculas en macOS, es el mismo proyecto.

- **Una carpeta que mueves es un proyecto nuevo.** La entrada antigua dice *no encontrado* y conserva su historial;
  devolver la carpeta a su sitio lo recupera.
- **Una carpeta borrada y clonada de nuevo en la misma ruta** dice *cambiado* hasta que la añades otra vez (en Linux
  puede decir *ok* enseguida, si la nueva carpeta recibe el inodo de la anterior); en ambos casos su historial incluye
  los Runs de la carpeta anterior.
- **Un repositorio clonado dos veces** son dos proyectos.
- **Tu carpeta personal nunca es un proyecto**, ni nada por encima de ella: `aqorin init` lo rechaza, y un `.aqorin`
  allí se ignora.

## La lista

Nada entra en la lista si no lo añades. `aqorin projects add` toma el proyecto en la carpeta que indicas o por encima,
con el nombre de la carpeta salvo que `--name` le dé otro (de 1 a 64 caracteres, sin `/`, sin empezar por `.`, `~` ni
`-`, único sin distinguir mayúsculas; `--name` sobre un proyecto ya en la lista lo renombra). Rechaza una carpeta que no está en un proyecto (indica `aqorin init --project
<carpeta>`), tu carpeta personal y las carpetas propias de Aqorin, y una carpeta ya en la lista con otra ruta.

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

## Conviene saber

- La lista vive en la carpeta de configuración de Aqorin (`projects.yaml`) y describe la carpeta de datos con la que se
  lee: con otro `AQORIN_DATA_HOME`, tras renombrar tu usuario o en otra máquina, un proyecto no muestra Runs.
- Cada Run hereda el entorno del proceso que lo lanzó —el de tu shell o el de la TUI— y la entrega de todos los
  proyectos usa la misma sesión de `gh`: Aqorin no carga un entorno por proyecto.
