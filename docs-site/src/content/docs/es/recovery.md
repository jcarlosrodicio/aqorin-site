---
title: Recuperación, reintento y replan
description: Qué ocurre cuando falla el runtime de un paso, y los tres caminos a seguir, ninguno tomado por su cuenta.
---

Cuando falla el runtime de un paso (una clave que falta, un inicio de sesión caducado, un proveedor
caído o un modelo saturado, un fallo, un timeout), el Run no adivina, sea quien sea quien eligió dónde
se ejecuta. Se detiene en **needs a decision** y te espera en
[Attention](../attention/). Aqorin nunca cambia de runtime por su cuenta, y solo reintenta por su
cuenta un fallo transitorio (más abajo).

El paso dice qué respondió el runtime, con sus últimas palabras.

## Los tres caminos

`r`, sobre el Run en Attention, ofrece:

| Opción | Cuándo usarla | Qué ocurre |
|---|---|---|
| **Retry same assignment** | La causa estaba fuera de Aqorin (una clave que falta, un inicio de sesión) y la has arreglado. | Aqorin comprueba de nuevo, tal como están las cosas ahora: la instalación, la conexión, las credenciales, el modelo, la elegibilidad y los recursos. Si el paso sigue sin poder ejecutarse, el reintento se rechaza. Si no, se ejecuta un intento nuevo del mismo paso. |
| **Replan to another runtime/model** | El problema es el runtime o el modelo. | El rol del paso pasa a otro runtime, conexión y modelo, con un motivo. El plan nuevo se admite como cualquier otro. |
| **Cancel Run** | Has terminado con él. | El Run termina como cancelado. |

Tras una decisión, `R` reanuda el Run. Antes de ella, `R` es el atajo de **Retry same assignment**:
registra el reintento (con el motivo «retried with R in the TUI») y reanuda, con una sola tecla.

## Reintentos automáticos

Un fallo **transitorio** no te espera de entrada. Cuando el error del runtime dice que es un límite de
uso (429), una sobrecarga o un 5xx del proveedor, o un fallo de red, y el intento dejó tu proyecto como
estaba, Aqorin ejecuta otra vez el mismo paso con la misma asignación: a los 30 s y, después, a los 2 min.
Mientras tanto el paso dice *retrying in N s (1 of 2)*; `c` cancela el Run. Cada reintento cuenta como
un intento.

Nunca se reintenta solo: un error de autenticación, clave, cuota, facturación o modelo; el timeout propio
de Aqorin; un intento que cambió archivos. Tras el segundo reintento, o en esos casos, el Run espera una
decisión, y la decisión dice por qué. Nunca se cambia de runtime ni de modelo por su cuenta. Aqorin
reconoce estos fallos por las palabras del runtime: un mensaje que no conoce te espera.

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
decisión está registrada, en el runtime de su asignación actual: el que eligió un replan, si lo
hubo.

## Desde la CLI

```bash
aqorin replan <run> --role developer --same --reason "Key fixed"
aqorin replan <run> --role developer --runtime codex --model <model> --reason "Pi is down"
aqorin resume <run>
aqorin cancel <run>
```
