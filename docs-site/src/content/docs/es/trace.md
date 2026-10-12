---
title: Trace, Activity y Raw
description: La vista del desarrollador de todo lo que un Run registró, en tres niveles de detalle.
---

**Trace** (Ctrl+T en un Run) es la vista del desarrollador de lo que se registró. `[` y `]` cambian
entre tres niveles:

| Nivel | Muestra |
|---|---|
| **Activity** | La transcripción: mensajes, herramientas y turnos, tal como los lees en el Run. |
| **Trace** | Cada entrada registrada, con su tipo, dónde ocurrió y qué dice. La entrada seleccionada se muestra tal como está almacenada. |
| **Raw** | Los registros tal como están almacenados, con su hora canónica en UTC marcada con `Z`. |

## Teclas

| Tecla | Hace |
|---|---|
| `/` | Buscar. |
| `n` | Ir a la siguiente coincidencia. |
| `e` | Ir al siguiente error. |
| `f` | Seguir el Run en vivo, o pausar. |
| `[` `]` | Cambiar de nivel. |

Las horas en Activity y Trace usan tu propio reloj. Raw conserva UTC.

## Lo que no muestra

- **El razonamiento privado de un modelo.** Aqorin registra que el modelo estaba razonando, nunca lo
  que razonó.
- **La pregunta de un runtime.** Las preguntas están en el chat y en [Attention](../attention/).
- **Cada token.** El texto en streaming se agrupa en entradas.
- **El modelo que atendió la petición, donde el runtime no lo informa.** Aqorin lo dice, en lugar de
  suponerlo.

## Desde la CLI

```bash
aqorin logs <run> --follow             # the Run's events as they happen
aqorin logs <run> --json-events        # the same, one JSON object per line
aqorin inspect <run>                   # the whole recorded Run
```
