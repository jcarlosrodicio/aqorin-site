---
title: Skills
description: Una skill es un directorio de instrucciones y archivos que Aqorin fija y entrega a los agentes que elijas.
---

Una **skill** es un directorio con un `SKILL.md`, más los archivos que usa. Amplía lo que un agente
sabe más allá de sus propias instrucciones.

## Añadir una skill

Las skills viven en **Resources** (`7`); `[` y `]` cambian entre las pestañas Skills y MCP. **Add
skill** pide el directorio de la skill (uno relativo se lee desde la carpeta del proyecto, `~/` desde tu carpeta personal). Aqorin copia el directorio en `.aqorin/skills/` y fija su
contenido, de modo que un Run usa siempre exactamente lo que añadiste.

## Asignarla

**Assign** da una skill a uno de tres ámbitos:

| Ámbito | Quién la recibe |
|---|---|
| El proyecto | Todos los agentes de todos los Runs de este proyecto. |
| Un workflow | Todos los pasos de ese workflow. |
| Un agente | Ese agente, dondequiera que se ejecute. |

Una asignación es **required** (requerida) u **optional** (opcional):

- **Required:** un runtime que no puede cargar la skill se rechaza en el preflight.
- **Optional:** la skill se deja fuera, de forma visible, donde el runtime no pueda cargarla.

**Unassign** retira la skill. **Remove** pregunta primero, y se rechaza mientras algo use la skill.

## Cómo la recibe cada runtime

Aqorin escribe la skill en el entorno aislado del runtime para el intento, nunca en tu propia
configuración. Se registra si el runtime la carga. Aqorin no afirma que la skill sea lo único que
carga el runtime.

```bash
aqorin skills add ./my-skill --id house-style
aqorin skills assign house-style --scope workflow:feature
aqorin skills assign house-style --scope agent:reviewer --optional
aqorin skills list
```
