---
title: Workflows
description: Un workflow dice qué agentes se ejecutan y en qué orden, qué paso ejecuta tus comprobaciones y cuál revisa.
---

Un **workflow** dice:

- qué agentes se ejecutan, y en qué orden;
- qué paso validan tus comprobaciones;
- qué paso revisa el trabajo, y qué ocurre después de la revisión.

Un workflow no nombra ningún runtime ni ningún modelo. Eso pertenece a una
[asignación](#assignments-where-each-step-runs).

## El workflow integrado `feature`

```text
specify  →  implement  →  review  →  done
               ↑  checks      │
               └── changes ───┘   (up to 3 review cycles)
```

`feature` ejecuta tres pasos:

1. `specifier` escribe la especificación.
2. `developer` la implementa, y Aqorin valida cada intento.
3. `reviewer` decide: **approved** termina el Run, y **changes needed** devuelve el trabajo a
   `implement`.

El Run termina con éxito solo cuando la revisión está aprobada, las comprobaciones han pasado, cada
aprobación se ha resuelto y no se ha superado ningún presupuesto. Lo aplica el motor, no un prompt.

Las plantillas Portable Feature (`portable-feature-enforced`, `portable-feature-advisory`) añaden un
paso de investigación.

## La pantalla Workflows (`5`)

La pantalla lee cada workflow de arriba abajo:

- cada paso, con su agente, lo que ese agente puede hacer y dónde se ejecuta ahora;
- los dos resultados de la revisión: approved va a Done, y changes needed vuelve atrás, con cuántas
  rondas quedan;
- el paso que ejecuta las comprobaciones de tu tarea.

En el editor:

- El inspector del paso dice por qué el paso se ejecuta donde se ejecuta.
- **Add step** abre un formulario: el nombre del paso y luego su agente, con el propósito de cada
  agente junto a la lista.
- **Rename**, **Move up/down**, **Then…** (adónde va el paso a continuación) y **Remove** (que
  pregunta primero) son botones y teclas.
- `i` edita la descripción, `b` fija el presupuesto de revisión, `p` fija el paso que ejecuta las
  comprobaciones y `v` fija el paso de revisión.
- `s` guarda.

Los workflows viven en `.aqorin/workflows/<id>.workflow.yaml`. Puedes editarlos a mano;
`aqorin workflows validate <id>` dice qué está mal, con la línea.

## Enforced y advisory

Un workflow es **enforced** (aplicado por Aqorin) cuando Aqorin ha validado cómo se restringen sus
pasos de solo lectura y de revisión, para ese runtime, versión y modelo. Si no, es **advisory**
(orientativo), y lo dice. Un resultado advisory nunca se presenta como revisado de forma
independiente.

Cualquier paso puede ejecutarse en cualquier runtime. Un paso de solo lectura o de revisión en un
runtime, versión o modelo que ninguna comprobación cubre se ejecuta igualmente, con el modo de solo
lectura de su runtime y la indicación de no escribir ni ejecutar comandos, y su restricción es
**advisory**: el plan marca el paso como `advisory`, y el resultado del Run es orientativo. Mira
[Modelo de seguridad](../security/#roles-restringidos).

<a id="assignments-where-each-step-runs"></a>

## Asignaciones: dónde se ejecuta cada paso

En Workflows, **Where it runs** (`g`) abre una **asignación**. Para cada paso, `Enter` elige:

1. su runtime, juzgado según la clase de acceso del paso (`restriction enforced` o
   `restriction advisory` en un paso de solo lectura o de revisión);
2. la conexión;
3. un modelo que se le pueda dar al runtime para esa clase.

Después:

- `s` guarda la asignación en `.aqorin/assignments/<name>.profile.yaml`;
- `p` ejecuta el **preflight**: el plan que imprime `aqorin run <workflow> --assign <name> --plan-only`;
- `D` convierte la asignación en la predeterminada del workflow.

```yaml
kind: aqorin.profile
schema_version: 2
roles:
  advisory-researcher: { runtime: codex }
  advisory-specifier: { runtime: claude-code }
  developer: { runtime: pi }
  reviewer: { runtime: opencode }
```

### El preflight

Antes de que se ejecute nada, el preflight rechaza lo que no se puede cumplir:

- una skill requerida que el runtime no puede cargar;
- una conexión que no está configurada.

Por ejemplo: `Role "developer" cannot run yet. Pi connection "nan" is not configured.`

Desde un lanzamiento rechazado, `c` te lleva a la configuración de ese runtime, y `a` a la
asignación.

<a id="where-a-step-runs"></a>

### Dónde se ejecuta un paso

Aqorin lo decide en este orden, y el inspector del paso muestra qué capa decidió:

1. La asignación explícita del workflow, o un `--runtime` / `--model` explícito en la línea de
   comandos.
2. La [ejecución por defecto](../agents/#default-execution) del agente.
3. El runtime por defecto del proyecto.

Aqorin nunca cambia de runtime por su cuenta.
