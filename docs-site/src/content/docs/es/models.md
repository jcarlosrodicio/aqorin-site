---
title: Modelos
description: De dónde vienen las opciones de modelo de Aqorin y dónde se elige cada una.
---

En Aqorin, un modelo se elige siempre junto con un runtime y una conexión: en una asignación, o como
ejecución por defecto opcional de un agente. La definición de un agente y un workflow no nombran
ninguno. Un agente dice *qué* se hace; la asignación, o si no la ejecución por defecto, dice *dónde*.

## De dónde vienen los modelos

- **El catálogo propio de un runtime:** los modelos que el runtime ofrece mediante su conexión
  nativa. Runtimes (`6`) los muestra, y también `aqorin runtimes inspect <runtime> --models`.
- **Los modelos de una conexión:** los que descubriste o escribiste. Cada conexión tiene un modelo
  por defecto, que se usa cuando un paso no nombra ninguno. Mira [Conexiones](../connections/).

## Dónde eliges uno

| Dónde | Qué eliges |
|---|---|
| La **ejecución por defecto** de un agente | Un runtime, una conexión (o la propia del runtime) y un modelo. Mira [Agentes](../agents/). |
| La **asignación** de un workflow | Para cada paso: un runtime, luego la conexión, luego un modelo que se le pueda dar al runtime para la clase de acceso de ese paso. Mira [Workflows](../workflows/). |
| Un **Free chat** | Un runtime y un modelo de su catálogo. Mira [Free chat](../free-chat/). |
| Un **replan** | Otro runtime, conexión y modelo para un paso fallido. Mira [Recuperación](../recovery/). |

## Modelos y roles restringidos

Un paso de solo lectura o de revisión necesita algo más que un modelo que responda. Aqorin lo admite
solo donde ha validado el mecanismo que restringe ese rol, para ese **runtime, versión y modelo**.
Un modelo sin esa validación se rechaza para esos pasos, y el plan lo dice: indica el modelo en la
asignación. En Claude Code todos los pasos de un Run usan un mismo modelo, así que uno validado sirve
para todos. Los pasos que editan archivos no se restringen de esta manera. Qué runtimes y modelos
están validados: [Modelo de seguridad](../security/#roles-restringidos).

```bash
aqorin eligibility list        # the validation records for this machine
```

## Qué observa Aqorin

Aqorin registra el modelo que **pidió**. Algunos runtimes no informan de qué modelo atendió
realmente la petición. Donde Aqorin no puede observarlo, lo dice en lugar de suponerlo.
