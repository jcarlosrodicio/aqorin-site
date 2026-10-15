---
title: Attention
description: La bandeja de lo que te espera, aprobaciones, preguntas y decisiones, que se resuelve donde lo ves.
---

**Attention** (`3`) es una bandeja de todo lo que te espera, agrupado por tipo. Cada elemento dice
dónde está, por qué te necesita y qué teclas lo resuelven allí.

## Human Approvals

Una aprobación humana (*Human Approval*) muestra lo que se pide, su alcance, su riesgo y su
consecuencia.

- `y` aprueba, tras una confirmación.
- `x` rechaza, con un motivo opcional.

## Preguntas

Cuando el runtime de una conversación pregunta algo, `a` lo responde.

Cuando pregunta un **paso de un workflow** (uno de [Engineering change](../workflows/#un-paso-puede-preguntarte),
por ejemplo), el elemento muestra sus preguntas. `a` —aquí, o en el Run abierto, que dice *press a to
answer*— ofrece **Accept** (sí, adelante), **Reject** (no, sigue sin ello) o **Write an answer…**; la
respuesta se registra y el Run se reanuda: el paso se ejecuta de nuevo con ella. Desde la CLI, `aqorin answer <run> <text>`
y luego `aqorin resume <run>`.

## Decisiones

Cuando falla el runtime de un paso, el Run te espera, tras hasta dos reintentos automáticos si el
fallo era transitorio (un límite de uso, una sobrecarga, un fallo de red; mira
[Reintentos automáticos](../recovery/#reintentos-automáticos)). `R` (**Retry**) reintenta el paso con la misma
asignación y reanuda el Run, con una sola tecla, cuando ya arreglaste lo que fallaba o el proveedor
ha vuelto. `r` (**Replan · Cancel…**) ofrece tres caminos a seguir, explicados
en [Recuperación, reintento y replan](../recovery/):

- **Retry same assignment**, con tu propio motivo;
- **Replan to another runtime/model**;
- **Cancel Run**.

`R` reanuda un Run cuya decisión ya está registrada. `Enter` abre el Run.

## Lo oirás

La campana de la terminal suena cuando un Run o una conversación empieza a esperarte; define
`AQORIN_TUI_BELL=0` para silenciarla. La barra de estado siempre dice qué espera.

```bash
aqorin approvals
aqorin approve <approval-id>
aqorin reject <approval-id> --reason "Not on main"
```
