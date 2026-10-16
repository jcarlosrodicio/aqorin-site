---
title: Trace, Flow, Activity y Raw
description: La vista del desarrollador de todo lo que un Run registró, en cuatro niveles de detalle, y su workflow dibujado.
---

**Trace** (Ctrl+T en un Run) es la vista del desarrollador de lo que se registró. `[` y `]` cambian
entre cuatro niveles:

| Nivel | Muestra |
|---|---|
| **Activity** | La transcripción: mensajes, herramientas y turnos, tal como los lees en el Run. |
| **Flow** | El workflow dibujado: cada paso en una caja con su agente y su estado, flechas al siguiente, el final, y cada vuelta atrás (una revisión o una verificación que pide cambios) con cuántas veces se tomó. El paso que trabaja ahora late; tras un traspaso, un punto recorre la flecha que tomó. De izquierda a derecha cuando los pasos caben; si no, de arriba abajo. Nada se mueve con `AQORIN_TUI_MOTION=0`. |
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
