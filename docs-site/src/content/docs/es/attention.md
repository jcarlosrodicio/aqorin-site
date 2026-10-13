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

## Decisiones

Cuando falla el runtime de un paso, el Run te espera. `r` ofrece tres caminos a seguir, explicados
en [Recuperación, reintento y replan](../recovery/):

- **Retry same assignment**;
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
