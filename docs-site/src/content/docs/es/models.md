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
  - **Claude Code:** los modelos que ofrece a tu sesión, leídos del propio Claude Code (sin
    llamar a ningún modelo), con su nombre completo, y sus alias (`opus`, `sonnet`…), cada uno
    diciendo a qué modelo apunta.
  - **Codex:** el catálogo de tu cuenta, tal como Codex lo actualiza con tu sesión; un modelo que
    Codex oculta para tu cuenta no se ofrece.
  - **Pi:** los modelos de los proveedores para los que tiene clave.
  - **OpenCode:** los modelos de sus conexiones; dentro de Aqorin no tiene proveedores propios.
- **Los modelos de una conexión:** los que descubriste, escribiste o —en Claude Code y Codex—
  tomaste de la propia lista del runtime. Siempre que eliges un modelo de una de esas listas (un
  nodo, el predeterminado de un agente, un replan, un Free chat), **Another model id…** te deja
  escribir uno que no aparece. Una lista larga (doce o más) se busca: escribe parte del nombre y se
  queda con los modelos que lo contienen, con el primero seleccionado; Retroceso la amplía y, vacía,
  devuelve lo que estaba elegido antes. El espacio y los dígitos se escriben en la búsqueda; si nada
  coincide, Enter no elige nada. El predeterminado y **Another model id…** siguen ofrecidos. Cada conexión tiene un modelo
  por defecto, que se usa cuando un paso no nombra ninguno. Mira [Conexiones](../connections/).

## Dónde eliges uno

| Dónde | Qué eliges |
|---|---|
| La **ejecución por defecto** de un agente | Un runtime, una conexión (o la propia del runtime) y un modelo. Mira [Agentes](../agents/). |
| La **asignación** de un workflow | Para cada paso: un runtime, luego la conexión, luego un modelo que se le pueda dar al runtime para la clase de acceso de ese paso. Mira [Workflows](../workflows/). |
| Un **Free chat** | Un runtime y un modelo de su catálogo. Mira [Free chat](../free-chat/). |
| Un **replan** | Otro runtime, conexión y modelo para un paso fallido. Mira [Recuperación](../recovery/). |

## Modelos y roles restringidos

A un paso de solo lectura o de revisión se le puede dar cualquier modelo. Su restricción solo es
**efectiva** donde Aqorin ha validado el mecanismo que restringe ese rol, para ese **runtime, versión
y modelo**: indica el modelo en la asignación. Con cualquier otro modelo el paso se ejecuta igual,
con la restricción **orientativa**: el selector de modelos dice `restriction enforced` o
`restriction advisory` junto a cada modelo, y el plan también lo dice. En Claude Code todos los
pasos de un Run usan un mismo modelo, así que uno validado sirve para todos. Los pasos que editan archivos no se restringen de esta manera. Qué runtimes y modelos
están validados: [Modelo de seguridad](../security/#roles-restringidos).

```bash
aqorin eligibility list        # the validation records for this machine
```

## Qué observa Aqorin

Aqorin registra el modelo que **pidió**. Algunos runtimes no informan de qué modelo atendió
realmente la petición. Donde Aqorin no puede observarlo, lo dice en lugar de suponerlo.
