---
title: Runs
description: Un Run es una ejecución duradera de un workflow, que se sigue en vivo, se responde, se reanuda y queda registrada.
---

Un **Run** es una ejecución de un workflow. Su estado pertenece a Aqorin, no a ninguna sesión de
runtime, así que un runtime que se cae no borra lo que ocurrió.

## Los Runs van desacoplados

Un Run se ejecuta en su propio worker. Salir de la TUI, o cerrar la terminal, lo deja ejecutándose.
Ejecuta `aqorin` otra vez, o `aqorin logs <run> --follow`, para seguirlo.

Hay **un Run a la vez por árbol de trabajo**. Un Run o un chat nuevo se rechaza mientras otro esté
sin terminar.

## La pantalla Runs (`2`)

Cada Run y chat de este proyecto aparece con su estado y cuándo empezó. Un chat abierto dice
*chat open*. `/` filtra la lista, `n` empieza una [nueva tarea](../new-task/) y `c` empieza un
[Free chat](../free-chat/).

## La vista de un Run

La vista de un Run es un panel:

- **A la izquierda**, los pasos: el estado de cada uno, su tiempo, qué agente lo ejecuta y dónde
  (agente · runtime), y su intento.
- **En el centro**, el trabajo del paso seleccionado. Una línea dice qué está haciendo ahora
  (*Thinking…*, *Running tool… npm test*, *Waiting for you*) y luego vienen sus mensajes, con una
  fila por herramienta.
- **A la derecha**, el Run en pocas líneas.

`Tab` a los pasos, y luego `↑` `↓` elige uno. `c` `c` cancela el Run. Ctrl+T abre el
[Trace](../trace/).

## El resultado

Un Run terminado se abre en su **Result**, que muestra:

- cómo terminó, y por qué;
- la revisión;
- las comprobaciones;
- los cambios;
- su **garantía** (*assurance*). Un Run es *advisory* (orientativo) cuando su workflow dice que lo
  es, no tiene ningún paso que ejecute comprobaciones o ningún paso de revisión, o cuando la tarea
  no tenía comprobaciones. Si no, es *enforced* (aplicado por Aqorin). Un éxito advisory dice
  "completed — advisory": nunca se muestra como validado ni como aprobado de forma independiente.
  El Result afirma que se alcanzó la garantía solo para un Run que tuvo éxito.

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
