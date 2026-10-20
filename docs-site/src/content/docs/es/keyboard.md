---
title: Teclado y navegación
description: Las teclas que funcionan en todas las pantallas, y las propias de un Run, un editor y un chat.
---

`?` (o F1) muestra siempre las teclas de la pantalla que tienes delante. Cada tecla de ahí es
también un botón o un comando de la paleta.

## Todas las pantallas

| Tecla | Hace |
|---|---|
| `↑` `↓` o `j` `k` | Moverte por la lista que tienes delante. |
| `←` `→` o `Tab` | Moverte entre el rail, la lista, y el inspector y sus botones. |
| `Enter` | Abrir el elemento, o pulsar el botón con el foco. |
| `Esc` | Volver un nivel. Nunca sale. |
| `0` | Global: todos los proyectos de tu lista. Ver [Varios proyectos](../projects/). |
| `1`–`9` | Home, Runs, Attention, Agents, Workflows, Runtimes, Resources, Credentials, Settings. |
| `/` | Filtrar la lista: Runs, Agents, Workflows y Resources. `Esc` borra el filtro. |
| `:` o Ctrl+P | La paleta de comandos. |
| `?` o F1 | La ayuda de esta pantalla. |
| `q` | Salir. Un Run continúa, y Aqorin nunca sale con cambios sin guardar. |

## La paleta de comandos

`:` o Ctrl+P abre la paleta, que lista:

- lo que puede hacer la pantalla que tienes delante, con su tecla;
- todas las secciones;
- lo que funciona en cualquier sitio.

Escribe unas pocas palabras para acotarla y pulsa `Enter` para ejecutar la seleccionada. Una acción
que no se puede realizar ahora aparece atenuada, con el motivo. La paleta también se abre mientras
escribes en un chat, pero no sobre un formulario o un selector abierto.

## Filtrar una lista

En Runs, Agents, Workflows y Resources, `/` conserva solo las filas que contienen todas las
palabras que escribes. El título del panel muestra el filtro y cuántas filas coinciden. `Esc` lo
borra.

## El ratón

Un clic hace lo que hace una tecla:

- una sección del raíl la abre;
- una fila de una lista queda seleccionada, y un clic en la fila ya seleccionada la abre, como `Enter` (así que un doble clic abre una fila);
- un paso de un Run queda seleccionado;
- un botón, una tecla del pie, una pestaña de Resources o un nivel de traza en el borde de un panel del Run hace lo
  que hace su tecla;
- en un selector, la paleta, una confirmación o un formulario, un clic en una opción la elige y un clic en un botón
  lo pulsa.

La rueda mueve la selección de una lista, desplaza el panel de la derecha y mueve la lista de un selector. Sobre un diálogo abierto o la ayuda, nada de lo que hay detrás responde a un clic (la rueda aún puede desplazar el texto de detrás). Arrastrar sobre cualquier otra cosa selecciona su
texto, y al soltar se copia al portapapeles donde el terminal lo permite. La selección propia del terminal sigue ahí,
normalmente manteniendo Shift (Option en algunos terminales de macOS) mientras arrastras. Las listas de campos y
nodos de un editor, las entradas de Trace, el compositor del chat y la ayuda son solo teclado.

## En un Run

| Tecla | Hace |
|---|---|
| `Tab`, luego `↑` `↓` | Elegir un paso. |
| PgUp / PgDn | Desplazar la actividad. Ctrl+End vuelve a seguir su final. |
| `t` | Mostrar cada llamada a herramienta, o volver a plegarlas entre los mensajes. |
| `d` | Mostrar u ocultar, a la derecha, los detalles del paso seleccionado y los motivos de un Run orientativo. |
| `!` | Mostrar los notices (lo que Aqorin quiere que sepas del Run, del plan o, en Home, del proyecto) en lugar del panel; `!` otra vez vuelve. |
| `z` | Mostrar solo el panel enfocado, para que una selección con el ratón coja solo sus líneas; `z` otra vez los muestra todos. |
| `y` | Enviar los mensajes del paso seleccionado al portapapeles de la terminal, si la terminal lo permite (no puede confirmarlo). |
| Ctrl+T | [Trace](../trace/): Activity, Flow, Trace y Raw. |
| `f` | Flow: el workflow dibujado (otra vez: vuelta al Run). |
| `c` `c` | Cancelar el Run. |
| `I` `K` `X` `U` | Un Run terminado en un worktree propio: integrarlo, conservar la rama, descartarlo o deshacer una integración — cada una tras preguntar, y solo cuando se puede hacer. Mira [Runs](../runs/). |

## En un editor

| Tecla | Hace |
|---|---|
| `s` | Guardar. |
| `Esc` dos veces | Descartar los cambios. |

El editor de workflows tiene más teclas: `i` edita la descripción, `b` el presupuesto de revisión,
`p` fija el paso que ejecuta las comprobaciones y `v` el paso de revisión. Mira
[Workflows](../workflows/).

## En un chat

| Tecla | Hace |
|---|---|
| `Enter` | Enviar; mientras el agente trabaja, lo pone en cola para el siguiente turno. |
| `Tab` | Mientras el agente trabaja, enviarlo ya, dentro del turno en curso (Codex, Pi, OpenCode). |
| `\` y luego `Enter`, o Shift+Enter | Una línea nueva. |
| `/` | Al principio de un mensaje, los comandos del chat: `Enter` ejecuta uno, `Tab` lo escribe, `Esc` cierra la lista. |
| Ctrl+C o `/interrupt` | Detener el turno, donde el runtime lo admita. |
| Ctrl+T | El Run del chat: su actividad a todo lo ancho y una ficha corta (Flow, Trace y Raw con `[` `]`). |

Mira [Free chat](../free-chat/) para los comandos con barra del chat.
