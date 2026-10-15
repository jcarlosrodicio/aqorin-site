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

## Los workflows integrados

Aqorin trae una biblioteca de workflows para el desarrollo de cada día. Ninguno nombra un runtime,
una conexión ni un modelo: cada paso se ejecuta donde dicen su asignación, el valor por defecto de su
agente o el runtime por defecto del proyecto.

| Workflow | Flujo | Úsalo para |
| --- | --- | --- |
| **Engineering change** (`engineering-change`) | Research → Plan → Implement → Verify → Review → Docs | una funcionalidad o un cambio sustancial, hecho como el proyecto dice que se hacen los cambios. New task lo ofrece el primero. |
| **Quick change** (`quick-change`) | Implement → Review | un cambio pequeño y claro |
| **Bug fix** (`bug-fix`) | Diagnose → Implement → Verify → Review | un defecto que reproducir, corregir y demostrar corregido |
| **Investigate** (`investigate`) | Investigate | una pregunta sobre el código, respondida con un informe; a su agente se le indica no cambiar nada (puede ejecutar comandos, así que no se impone) |
| **Code review** (`code-review`) | Review | un informe sobre los cambios actuales; no aprueba nada, y a su agente se le indica no cambiar nada (no se impone) |
| **Docs change** (`docs-change`) | Docs → Review | solo documentación |

### Engineering change

```text
research → plan → implement → verify → review → docs → done
                     ↑  checks   │         │
                     └─ changes ─┴─────────┘   (up to 3 rounds each)
```

1. `researcher` lee la petición y el proyecto, empezando por sus instrucciones.
2. `planner` escribe el plan, y los documentos de planificación que el proyecto exige (OpenSpec, por
   ejemplo), solo donde el proyecto los pide.
3. `developer` lo implementa; las comprobaciones de tu tarea se ejecutan tras este paso.
4. `verifier` ejecuta la verificación propia del proyecto y prueba el cambio: **passed** sigue
   adelante, **needs changes** devuelve el trabajo a `implement` con lo que encontró.
5. `reviewer` lo juzga de forma independiente: **approved** sigue, **changes needed** vuelve atrás.
6. `documenter` actualiza la documentación y entrega el resultado. Se ejecuta tras la aprobación: lo que
   escribe lo comprueban las comprobaciones de tu tarea, no la revisión.

### Siguen tu proyecto

Sus agentes leen primero las instrucciones del proyecto —`AGENTS.md` o su equivalente, un harness,
OpenSpec si el proyecto lo usa— y las siguen. Donde el proyecto no tiene ninguna, no se inventa nada.

### Un paso puede preguntarte

Cuando la petición deja algo que solo tú puedes decidir, un paso (Research, Plan, Diagnose…) termina
con sus preguntas en lugar de adivinar, cada una con las respuestas que propone cuando puede. El Run
espera en [Attention](../attention/): `a` te las hace de una en una (elige una respuesta o escribe la
tuya), y el paso se ejecuta de nuevo con tus respuestas. Desde la CLI:

```bash
aqorin answer <run> "También decimales; mantén la API antigua."
aqorin answer <run> -- "-5 a 5"       # una respuesta que empieza por guion
aqorin resume <run>
```

### Verify, las comprobaciones y la revisión son tres cosas

- **Tus comprobaciones** —los comandos de la tarea, como `npm test`— se ejecutan tras el paso marcado
  para ellas (Implement), en cualquier workflow. Las ejecuta Aqorin; deciden si el trabajo del paso
  pasa.
- **Verify** es un paso. Su agente ejecuta la verificación propia del proyecto y prueba el cambio, y
  decide *passed* o *needs changes*, con su propio presupuesto de rondas. Puede ejecutar comandos, así
  que podría cambiar archivos: que no lo haga es una instrucción, dicha en el plan, no algo que se
  imponga; por eso tus comprobaciones vuelven a ejecutarse tras él, antes de la revisión.
- **Review** es el juicio independiente posterior, y el único que aprueba el Run.

La comprobación del agente (`--agent-check`) es otra cosa más, desactivada por defecto.

### `feature` y las plantillas

`feature` (specify → implement → review) y las plantillas Portable Feature
(`portable-feature-enforced`, `portable-feature-advisory`, que añaden un paso de investigación) se
mantienen, marcadas como **advanced**.

El Run termina con éxito solo cuando la revisión está aprobada (o, en un workflow sin ella, sus
comprobaciones han pasado), cada aprobación se ha resuelto y no se ha superado ningún presupuesto. Lo
aplica el motor, no un prompt.

## La pantalla Workflows (`5`)

La lista nombra cada workflow con sus pasos, su garantía y su origen: **built-in** (viene con Aqorin),
**project** (un archivo en `.aqorin/workflows/`) o **advanced**. El inspector de uno integrado empieza
por para qué sirve, su flujo y sus agentes. **Customize…** (`d`) lo copia al proyecto con un nombre
libre; la copia es tuya para editarla, y el integrado queda como está.

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
- `i` edita la descripción, `b` fija el presupuesto de revisión (y las rondas de verificación, si un
  paso verifica), `p` fija el paso que ejecuta las
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
