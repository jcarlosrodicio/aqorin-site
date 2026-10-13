---
title: Nueva tarea
description: Un formulario que va de una petición a un plan, y nada se ejecuta hasta que pulsas Enter.
---

**New task** (`n` en Runs) es un formulario, que se rellena en este orden:

1. **What to do:** un [Free chat](../free-chat/), o un workflow.
2. **Which workflow, and where it runs.**
3. **What the agents are asked to do:** tu petición.
4. **Checks (optional):** comandos que deben pasar, como `npm test`. Aqorin los ejecuta sin shell.
   Un `&&`, `|` o `>` sin comillas se rechaza allí donde lo escribes.

## Comprobaciones

- **Con comprobaciones**, **Plan** escribe la tarea en `.aqorin/tasks/`, con un nombre sacado de tu
  petición. Aqorin ejecuta las comprobaciones por sí mismo, con tus permisos, y solo su código de
  salida decide la validación.
- **Sin comprobaciones**, no se escribe ningún archivo de tarea. La validación es la palabra del
  propio runtime, que es *advisory* (orientativa), y el plan lo dice.

## El plan

El plan muestra si la tarea puede ejecutarse y dónde se ejecuta cada paso. Nada se ejecuta hasta que
pulsas `Enter`.

- `w` cambia dónde se ejecuta la tarea.
- Cuando un paso no puede ejecutarse donde está asignado, el plan dice qué agente, por qué y dónde
  puede ejecutarse en su lugar, por ejemplo un paso de revisión o de solo lectura en un runtime que
  ninguna comprobación de esta máquina cubre, o uno sin modelo indicado. `a` asigna el paso allí;
  pregunta primero y vuelve a planificar. Si el propio runtime del paso está validado con otro
  modelo, esa opción va primero: en Claude Code, `a` deja el paso allí con un modelo validado, y los
  demás pasos del Run en Claude Code usan ese mismo modelo (Claude Code usa un modelo por Run).
- Cuando la versión de un runtime es nueva para Aqorin, el plan también lo dice. `v` la valida con
  una llamada a un modelo, y pregunta primero.

Mientras el resumen dice por qué se rechaza un plan, el texto completo del plan (lo que imprime
`--plan-only`) queda plegado; `d` lo muestra. Un plan rechazado no crea ningún Run. Si se escribió un
archivo de tarea, se conserva para la próxima vez.

Home también te avisa con antelación cuando tu runtime por defecto no puede ejecutar aquí pasos de
revisión y de solo lectura, y dice qué runtimes sí pueden.

## Desde la CLI

```bash
aqorin tasks new "Add a --dry-run flag" --check-command "npm test" --check-command "npm run lint"
aqorin run feature --task-file <task file> --plan-only     # the plan, nothing runs
aqorin run feature --task-file <task file>                 # launch
aqorin run feature "Add a --dry-run flag"                  # no checks: advisory
```
