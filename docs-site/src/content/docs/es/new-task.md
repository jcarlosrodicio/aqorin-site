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
5. **Agent check:** No por defecto. **Yes** pide al runtime del paso que compruebe también el trabajo.

## Comprobaciones

- **Con comprobaciones**, **Plan** escribe la tarea en `.aqorin/tasks/`, con un nombre sacado de tu
  petición. Aqorin ejecuta las comprobaciones por sí mismo, con tus permisos, y solo su código de
  salida decide la validación.
- **Sin comprobaciones**, no se escribe ningún archivo de tarea. Nada comprueba el trabajo: el paso
  sigue enseguida, sus comprobaciones dicen *not checked* y el Run es *advisory* (orientativo). El
  plan lo dice.
- **Agent check** (desactivado por defecto) pide al runtime del paso que compruebe también el trabajo
  tras el paso. El runtime elige qué ejecutar (tests, linters…), lo que puede tardar, y su veredicto
  es *advisory*: deciden tus comandos, si declaraste alguno. Para que un agente pruebe el trabajo
  como un paso propio, añade un nodo al workflow.

## El plan

El plan muestra si la tarea puede ejecutarse y dónde se ejecuta cada paso. Nada se ejecuta hasta que
pulsas `Enter`.

- `w` cambia dónde se ejecuta la tarea: una asignación guardada, o **New assignment…**, que abre el
  editor para este workflow. Cuando la guardas (`s`), Esc vuelve al plan con ella; tu tarea se
  conserva.
- Cuando un paso no puede ejecutarse donde está asignado (por ejemplo, una conexión sin
  configurar), el plan dice qué agente, por qué y dónde puede ejecutarse en su lugar. `a` asigna el
  paso allí; pregunta primero y vuelve a planificar.
- Un paso de revisión o de solo lectura en un runtime, versión o modelo que ninguna comprobación de
  esta máquina cubre se ejecuta igualmente, con la restricción **advisory** (orientativa): el plan
  dice `Ready, advisory`, marca el paso como `advisory` e indica dónde la restricción sería
  efectiva. El resultado del Run es orientativo. Mira
  [Modelo de seguridad](../security/#roles-restringidos).
- Cuando la versión de un runtime es una versión mayor nueva para Aqorin (de Pi 0.x a 1.x, por
  ejemplo), el plan también lo dice. Se ejecuta igualmente: su primer paso comprueba lo que solo una
  ejecución real muestra, y en cuanto un paso termina en ella queda registrada como verificada. `v`
  la comprueba ya, con una llamada a un modelo, y pregunta primero.

Mientras el resumen dice por qué se rechaza un plan, el texto completo del plan (lo que imprime
`--plan-only`) queda plegado; `d` lo muestra. Un plan rechazado no crea ningún Run. Si se escribió un
archivo de tarea, se conserva para la próxima vez.

Home también te avisa con antelación cuando tu runtime por defecto ejecuta aquí los pasos de revisión
y de solo lectura con una restricción orientativa, y dice qué runtime la aplica de forma efectiva.

## Desde la CLI

```bash
aqorin tasks new "Add a --dry-run flag" --check-command "npm test" --check-command "npm run lint"
aqorin run feature --task-file <task file> --plan-only     # the plan, nothing runs
aqorin run feature --task-file <task file>                 # launch
aqorin run feature "Add a --dry-run flag"                  # no checks: advisory
aqorin run feature "Add a --dry-run flag" --agent-check    # the step's runtime checks the work
```
