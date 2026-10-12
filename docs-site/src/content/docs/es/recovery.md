---
title: Recuperación, reintento y replan
description: Qué ocurre cuando falla el runtime de un paso, y los tres caminos a seguir, ninguno tomado por su cuenta.
---

Cuando falla el runtime de un paso (una clave que falta, un inicio de sesión caducado, un fallo, un
timeout), el Run no adivina. Se detiene en **needs a decision** y te espera en
[Attention](../attention/). Aqorin nunca cambia de runtime por su cuenta, y nada se reintenta por su
cuenta.

Las propias palabras del turno fallido, en la transcripción del Run, dicen qué respondió el runtime.

## Los tres caminos

`r`, sobre el Run en Attention, ofrece:

| Opción | Cuándo usarla | Qué ocurre |
|---|---|---|
| **Retry same assignment** | La causa estaba fuera de Aqorin (una clave que falta, un inicio de sesión) y la has arreglado. | Aqorin comprueba de nuevo, tal como están las cosas ahora: la instalación, la conexión, las credenciales, el modelo, la elegibilidad y los recursos. Si el paso sigue sin poder ejecutarse, el reintento se rechaza. Si no, se ejecuta un intento nuevo del mismo paso. |
| **Replan to another runtime/model** | El problema es el runtime o el modelo. | El rol del paso pasa a otro runtime, conexión y modelo, con un motivo. El plan nuevo se admite como cualquier otro. |
| **Cancel Run** | Has terminado con él. | El Run termina como cancelado. |

Tras una decisión, `R` reanuda el Run.

No se ofrece un reintento para:

- fallos de validación;
- rechazos de la revisión;
- rechazos por política o por rol restringido;
- fallos de integridad;
- errores de workflow o de esquema;
- cancelación.

Eso son resultados, no accidentes.

:::caution[At least once]
Un paso que se intenta otra vez empieza de cero. No es el runtime retomando su conversación
anterior, así que el trabajo que el intento fallido ya hizo puede hacerse dos veces.
:::

## Reanudar

`aqorin resume <run>`, o `R`, continúa desde donde se detuvo un Run que fue interrumpido, o cuya
decisión está registrada. El Run conserva el runtime en el que estaba.

## Desde la CLI

```bash
aqorin replan <run> --role developer --same --reason "Key fixed"
aqorin replan <run> --role developer --runtime codex --model <model> --reason "Pi is down"
aqorin resume <run>
aqorin cancel <run>
```
