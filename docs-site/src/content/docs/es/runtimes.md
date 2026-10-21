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

- qué puede hacer Aqorin con el runtime: ejecutar pasos que editan archivos, y si aplica aquí de
  forma efectiva la restricción de los pasos de solo lectura y de revisión (si no, por qué no; esos
  pasos se ejecutan igualmente en él, con la restricción orientativa);
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

Una carpeta que tu `PATH` nombra dos veces —repetida, o `/bin` junto a `/usr/bin` en Linux— contiene una instalación, no dos.

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

**Cancel** no llama a nada. En una conexión de Pi, Validate comprueba Pi a través de esa conexión. En
un runtime que tiene conexiones, Validate pregunta primero por dónde: su propio inicio de sesión (en Pi, sus
proveedores propios, o su conexión por defecto si ya elegiste una) o una de las conexiones, porque su modelo por
defecto puede ser justo el que no tiene una clave que funcione. Antes, la comprobación pasa lo que necesita un paso: Pi
corre sobre su conexión por defecto o sobre un modelo que Pi lista, y al endpoint de una conexión se le pregunta por su
clave; cualquiera de los dos rechazos no llama a ningún modelo y dice la salida. En el TUI, el modelo de Pi es el de
`AQORIN_PI_MODEL` al arrancar aqorin.

Actualizar un runtime dentro de una versión mayor que Aqorin ya ha ejecutado no requiere nada: Aqorin
lee en local las opciones de la versión nueva, sin llamar a ningún modelo. Una versión mayor nueva (de
Pi 0.x a 1.x, por ejemplo) se señala como nueva para Aqorin en el plan, en Runtimes y en Home, pero no
cuenta como algo pendiente: se ejecuta, su primer paso comprueba lo que solo una ejecución real
muestra (el protocolo, los eventos, el final del turno) y, en cuanto un paso termina en ella, queda
registrada como verificada. Si rompe algo que Aqorin necesita, ese primer paso falla diciendo qué
falta, y el fallo se registra. Validate la comprueba ya. Si esa comprobación acaba con un error del
proveedor, no se registra nada: valídala a través de una conexión cuya clave funcione o, si ya pasó
por una, revisa la clave y el modelo por defecto de esa conexión. Una versión cuya ayuda no se puede
leer en absoluto se sigue rechazando hasta validarla.

## Cómo se ejecuta cada runtime bajo Aqorin

| Runtime | En un paso de workflow |
|---|---|
| Claude Code | Headless, bajo un perfil aislado: ninguno de tus ajustes, plugins ni servidores MCP. Se añaden las skills y los servidores MCP que das a un agente en Aqorin. |
| Codex | En el home de Codex propio de Aqorin, con la sesión iniciada con tu login o con una clave de API por referencia. |
| OpenCode | En el home de OpenCode propio de Aqorin, solo sobre una de tus [conexiones](../connections/): nunca con tu configuración ni tu inicio de sesión de OpenCode. |
| Pi | Aislado, sin tus ajustes ni extensiones: sobre la [conexión](../connections/) por defecto de Pi, o sobre un modelo que Pi lista, comprobado antes del Run. Un proveedor al que llegas mediante una extensión necesita una conexión. |

Un [Free chat](../free-chat/) puede ejecutarse, en cambio, con tu propia configuración, si eliges
eso al crearlo.

Claude Code se ejecuta bajo Aqorin en macOS con Apple silicon y en Linux en x64; en otra plataforma o arquitectura sus
pasos y chats se rechazan, y Runtimes lo dice.
