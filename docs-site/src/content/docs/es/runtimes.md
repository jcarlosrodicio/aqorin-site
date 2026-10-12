---
title: Runtimes
description: Los cuatro runtimes de la Alpha, cómo los encuentra Aqorin y qué puede hacer con cada uno.
---

Un runtime es un agente de programación que tienes instalado. La Alpha funciona con cuatro:
**Claude Code**, **Codex**, **OpenCode** y **Pi**. Aqorin los encuentra y sondea lo que pueden
hacer. Nunca inicia sesión por ti, nunca lee un archivo de credenciales y nunca cambia la
configuración de un runtime.

## La pantalla Runtimes (`6`)

Cada runtime aparece con su versión, su estado, y la conexión y el modelo con los que se ejecuta.
Tus [conexiones](../connections/) aparecen debajo.

El inspector dice:

- qué puede hacer Aqorin con el runtime: ejecutar pasos que editan archivos, y pasos de solo
  lectura y de revisión (y si no, por qué no);
- dónde está instalado;
- cómo inicia sesión;
- su catálogo de modelos.

**Details** muestra la inspección completa: cada capacidad, y de dónde viene ese conocimiento:
verificado en esta máquina, compatible o desconocido.

<a id="several-installations"></a>

## Varias instalaciones

A veces un runtime está instalado más de una vez, por ejemplo dos instalaciones de Codex, una de
npm y otra bajo otra versión de Node. Aqorin no elige entre ellas por su cuenta. El runtime aparece
como que necesita una elección, y **Choose installation** (en Home o en Runtimes) lista cada una
por versión y ruta.

Aqorin guarda tu elección solo en su propia configuración. Tu `PATH`, tus enlaces y la configuración
del runtime se quedan como están. A partir de entonces, Aqorin usa exactamente esa instalación.

Si la instalación elegida desaparece, o el archivo de esa ruta cambia, Aqorin te lo vuelve a
preguntar en lugar de elegir otra. Una actualización suele reemplazar el archivo; una actualización
que lo deja idéntico byte a byte no se detecta. Con una elección que funciona, **Change
installation** la cambia.

```bash
aqorin runtimes                                 # the inventory
aqorin runtimes inspect codex --models          # one runtime, with its models
aqorin runtimes select codex /path/to/codex     # choose the installation
```

## El runtime por defecto

El **runtime por defecto** del proyecto es donde se ejecuta un paso de workflow cuando nada más dice
dónde. Lo eliges en la lista de comprobación de Home o en Settings (`9`); `aqorin use <runtime>`
hace lo mismo. [Where a step runs](../workflows/#where-a-step-runs) explica el orden en que Aqorin
lo decide.

## Validate

**Validate** (`v`) comprueba que Aqorin puede ejecutar el runtime en esta máquina, con una llamada
real a un modelo. Es la misma comprobación que `aqorin doctor --live`. Antes de la llamada, dice:

- por dónde pasa la llamada;
- que nada de la configuración propia del runtime cambia;
- que tu proveedor puede facturar la llamada.

**Cancel** no llama a nada. En una conexión de Pi, Validate comprueba Pi a través de esa conexión.

Una versión de runtime nueva para Aqorin se señala. Valídala antes de fiarte de ella.

## Cómo se ejecuta cada runtime bajo Aqorin

| Runtime | En un paso de workflow |
|---|---|
| Claude Code | Headless, bajo un perfil aislado: ninguno de tus ajustes, plugins ni servidores MCP. Se añaden las skills y los servidores MCP que das a un agente en Aqorin. |
| Codex | En el home de Codex propio de Aqorin, con la sesión iniciada con tu login o con una clave de API por referencia. |
| OpenCode | Aislado, sin tus plugins. Las claves de proveedor llegan por referencia ([Credenciales](../credentials/)). |
| Pi | Aislado, sin tus extensiones. Un proveedor al que llegas mediante una extensión necesita una [conexión](../connections/). |

Un [Free chat](../free-chat/) puede ejecutarse, en cambio, con tu propia configuración, si eliges
eso al crearlo.
