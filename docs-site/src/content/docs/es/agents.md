---
title: Agentes
description: Un agente es un rol, lo que hace y lo que puede hacer, independiente del runtime y del modelo que lo ejecutan.
---

Un **agente** es un rol:

- lo que hace (sus instrucciones);
- lo que puede hacer (su clase de acceso);
- lo que recibe y lo que entrega;
- sus skills y servidores MCP.

La definición de un agente no nombra ningún runtime ni ningún modelo. Eso pertenece a una
asignación, o a la ejecución por defecto del agente: una preferencia opcional, y una asignación
prevalece sobre ella.

## Clases de acceso

| Clase de acceso | Se muestra como | Qué puede hacer |
|---|---|---|
| `read_only` | *read only* | Leer el proyecto, sin cambiarlo. |
| `workspace_write` | *edits files* | Cambiar archivos del proyecto. |
| `review` | *reviews* | Leer el trabajo y decidir: aprobado, o cambios necesarios. |

Aqorin nunca amplía una clase de acceso para que un runtime encaje. Un agente de solo lectura o de
revisión se ejecuta en cualquier runtime: donde Aqorin puede aplicar su restricción, es *efectiva*;
en cualquier otro sitio se ejecuta con el modo de solo lectura de su runtime y se le indica que no
escriba ni ejecute comandos, y la restricción se presenta como *advisory* (orientativa), igual que el
resultado del Run. Mira [Modelo de seguridad](../security/#roles-restringidos).

## La pantalla Agents (`4`)

Cada agente aparece con lo que puede hacer y su **ejecución por defecto**. El inspector dice:

- para qué sirve el agente y qué puede hacer;
- dónde se ejecuta en cada workflow que lo usa, y qué capa lo decidió.

Sus acciones:

- **New** y **Duplicate** abren un formulario. Un agente integrado no se puede editar, así que
  duplícalo para hacer tu propia versión.
- **Edit** abre los campos de un agente del proyecto y los edita en su sitio. El archivo conserva
  tus comentarios.
- **Delete** pregunta primero, y dice qué usa el agente.

<a id="default-execution"></a>

## Ejecución por defecto

La **ejecución por defecto** de un agente es un runtime, una conexión (o la propia del runtime), un
modelo y el esfuerzo del modelo. Es tu preferencia: los agentes que Aqorin incluye vienen sin ninguna.

- **Configure default** (`c`) la elige. El modelo se escoge entre los de la conexión, o entre los
  que lista el runtime (también los de Claude Code y Codex), o con **Another model id…** si no está
  en la lista. Para un agente
  integrado, se guarda en la configuración de
  este proyecto; para un agente tuyo, en el archivo del agente.
- **Effort**, en el mismo formulario, es cuánto razona el modelo en los pasos que coloca esta ejecución
  por defecto, en los niveles propios del runtime. **Default** lo deja en manos del runtime.

  | Runtime | Niveles |
  |---|---|
  | Claude Code | low, medium, high, xhigh, max |
  | Codex | minimal, low, medium, high, xhigh |
  | Pi | off, minimal, low, medium, high, xhigh, max |
  | OpenCode | ninguno: su esfuerzo es una variante que declara su proveedor, y las conexiones de Aqorin no declaran ninguna |

  Cada intento de esos pasos se ejecuta con él, y el Run lo conserva al reanudarse. Un paso colocado por
  una asignación explícita usa el esfuerzo por defecto de su runtime.
- **Clear default** la quita.

## Agentes integrados

`specifier`, `developer` y `reviewer` son los roles del workflow integrado `feature`. Las
plantillas Portable Feature añaden `researcher`, `advisory-researcher` y `advisory-specifier`.

## El archivo

Tus agentes viven en `.aqorin/agents/<id>.agent.yaml`. Puedes editarlos a mano:

```yaml
kind: aqorin.agent
schema_version: 2
id: doc-writer
description: Writes the user-facing documentation for a change.
access_class: workspace_write
instructions: |-
  Update the documentation under docs/ for the change you are handed.
inputs:
  - the developer's summary (handoff)
outputs:
  - the updated pages, and a summary in the final message
```

Aqorin añade `inputs` y `outputs` al texto de la tarea del agente, pero en la Alpha no los
comprueba.

```bash
aqorin agents list
aqorin agents new doc-writer --access-class workspace_write --description "Writes the docs"
aqorin agents validate doc-writer     # what is wrong, with file:line:column
```
