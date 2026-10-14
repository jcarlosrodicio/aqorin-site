---
title: La TUI
description: Cómo está organizada la interfaz de terminal a pantalla completa de Aqorin y cómo se adapta a tu terminal.
---

Ejecuta `aqorin` en un proyecto y se abre la TUI. `aqorin --plain` da una vista de líneas en su
lugar, y `--json` o una tubería dan la salida propia de la CLI.

## La disposición

- **La cabecera** muestra la marca de Aqorin (`◈`, o `<>` en ASCII), dónde estás y el proyecto.
- **El rail** de la izquierda lista las nueve secciones. `1`–`9` saltan directamente a una.
- **La lista** del centro contiene los elementos de la sección.
- **El inspector** de la derecha explica el elemento seleccionado. Contiene las acciones de ese
  elemento como botones.
- **El pie** muestra las teclas de la pantalla que tienes delante. `?` abre su ayuda completa.
- **La barra de estado** dice qué Run se está moviendo y qué te espera a ti. Su glifo gira mientras
  un Run trabaja.

| Tecla | Sección | Qué contiene |
|---|---|---|
| `1` | Home | La lista de comprobación del primer uso y, después, el plano de control. |
| `2` | Runs | Todos los Runs y chats de este proyecto. `n` empieza una tarea nueva, `c` un Free chat. |
| `3` | Attention | Lo que te espera: aprobaciones, preguntas y decisiones. |
| `4` | Agents | Los roles que usa un workflow: los integrados, las plantillas y los tuyos. |
| `5` | Workflows | Los grafos de pasos y dónde se ejecuta cada paso. |
| `6` | Runtimes | Los cuatro runtimes tal como se encuentran en esta máquina, y tus conexiones. |
| `7` | Resources | Las skills y los servidores MCP que pueden usar tus agentes. |
| `8` | Credentials | Las referencias a tus claves, nunca un valor. |
| `9` | Settings | La configuración del proyecto, su runtime por defecto, la apariencia y dónde guarda Aqorin sus archivos. |

## Home

Hasta que el proyecto está listo para ejecutar, Home es una lista de comprobación. Cuando está
listo, Home es el plano de control: los cuatro runtimes, el Run que se está moviendo, lo que te
espera y los Runs recientes. Cuando Aqorin tiene algo que contarte del proyecto —por ejemplo, que tu
runtime por defecto ejecuta los pasos de revisión y de solo lectura con una restricción advisory—, la
línea Status muestra `! 1 notice`; `!` lo lee y Esc lo pliega.

En el primer uso, el wordmark en bloques de Aqorin encabeza la pantalla, tras la misma marca.

## Cada acción está en tres sitios

En una lista, cada acción del elemento seleccionado aparece de tres maneras:

- como un botón en el inspector;
- como una tecla en el pie;
- como una línea en `?`, la ayuda de la pantalla que tienes delante.

La **paleta de comandos** (`:` o Ctrl+P) lista las mismas acciones, además de todas las secciones.
Una acción que no se puede realizar ahora aparece atenuada, con el motivo.

## Tamaños

- **100 columnas o más:** el rail, la lista y el inspector, uno junto a otro.
- **80–99 columnas:** la lista ocupa todo el ancho. `←` muestra el rail.
- **Menos de 80 columnas o 24 filas:** un panel cada vez.

## Apariencia

| Ajuste | Efecto |
|---|---|
| `NO_COLOR=1` | Sin color. La marca conserva su glifo. |
| `AQORIN_TUI_ASCII=1` | Solo glifos ASCII (también con `TERM=dumb`). |
| `AQORIN_TUI_MOTION=0` | El glifo de la barra de estado se queda quieto. |
| `AQORIN_TUI_BELL=0` | Silencia la campana que suena cuando un Run o una conversación empieza a esperarte. Aqorin lo comprueba cada dos segundos. |

Aqorin usa 256 colores cuando la terminal dice que los tiene, y 16 en caso contrario.

Las horas en pantalla usan tu propio reloj. Lo que Aqorin registra se queda en UTC, y el nivel Raw
del Trace lo muestra así, marcado con `Z`.

:::note
La marca `◈` está en Menlo. SF Mono y Monaco no la tienen, así que tu terminal recurre a otra
fuente para dibujarla.
:::

Los lectores de pantalla no son compatibles con la TUI a pantalla completa. Usa `--plain` o `--json`
en su lugar.
