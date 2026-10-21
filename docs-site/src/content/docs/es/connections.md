---
title: Conexiones
description: Cómo llega un runtime a un modelo, mediante su propio inicio de sesión o mediante una conexión que añades a Aqorin.
---

Claude Code, Codex y Pi tienen cada uno una **conexión nativa**. Para Claude Code y Codex es su propio inicio de
sesión, pero un paso los ejecuta en el entorno aislado de Aqorin, sin ninguno de tus ajustes: Codex en un home de Codex
de Aqorin con solo tu inicio de sesión enlazado, y Claude Code sin tus ajustes ni tus servidores MCP (un [Free
chat](../free-chat/) con **Your configuration** es el que sí los lee). Para Pi son los proveedores propios de Pi.
Aqorin ejecuta Pi **aislado**, sin tus ajustes ni tus
extensiones: un proveedor al que llegas mediante una extensión puede no existir dentro de Aqorin, y Pi, sin un modelo
nombrado, elegiría un proveedor por su cuenta. Por eso un paso en Pi necesita una de estas dos cosas antes de empezar:

- **La conexión por defecto de Pi**: una conexión de Pi tuya que hiciste su conexión por defecto —selecciónala en
  Runtimes y pulsa **Use by default** (`u`), o ejecuta `aqorin connections use <nombre>`. Un paso en Pi que no nombra
  conexión corre sobre ella, con su modelo por defecto. A diferencia de OpenCode, la única conexión de Pi no es su
  conexión por defecto hasta que la eliges.
- **Un modelo que Pi lista** entre sus propios proveedores, nombrado por la asignación del paso, el valor por defecto
  del agente o `AQORIN_PI_MODEL`. Antes del Run, Aqorin pide a Pi su lista de modelos, tal como el Run verá sus
  proveedores, y si el proveedor que lo lista tiene una credencial que Pi pueda usar (`pi auth check`). Rechaza un
  modelo que Pi no lista, uno cuyo proveedor no está listo y un id que Pi podría leer como otro modelo —uno que listan
  dos proveedores, o el `deepseek/…` de OpenRouter, cuyo prefijo también es un proveedor— (nómbralo `proveedor/id`:
  `openrouter/deepseek/…`). No se hace ninguna llamada al modelo, así que un modelo listado aún puede fallar en su
  primer turno. Con la conexión por defecto de Pi elegida, una asignación llega a los proveedores propios de Pi
  nombrando la conexión `pi`.

Sin ninguna de las dos, Aqorin se niega antes de lanzar nada y dice las dos salidas. Un Free chat sobre los proveedores propios de Pi,
`aqorin doctor --live` y el borrador de una entrega pasan la misma comprobación. Un Run que reanudas conserva el plan
con el que se hizo: si su modelo no puede correr ahora, el rechazo nombra `aqorin replan` con un modelo o una
conexión.

**OpenCode no tiene conexión nativa en Aqorin.** Todo OpenCode que lanza Aqorin —un paso de workflow, un
Free chat, una comprobación, `aqorin open opencode`— corre en el home de OpenCode propio de Aqorin, nunca
con tu configuración de OpenCode, su inicio de sesión (`opencode auth login`), el `opencode.json` de un
repositorio ni las variables que lee tu configuración, y solo ve el proveedor de la conexión sobre la que
corre. Un paso en OpenCode que no nombra conexión corre sobre la **conexión por defecto de OpenCode**: su
única conexión o, si hay varias, la que elijas: selecciónala en Runtimes y pulsa **Use by default** (`u`),
o ejecuta `aqorin connections use <nombre>`. Si no hay ninguna, Aqorin se niega antes de lanzar nada y te
dice cómo añadir una. Un modelo nombrado como lo nombra OpenCode (`nan/deepseek-v4-flash`) corre como el
modelo propio de la conexión si lo tiene. Tu OpenCode fuera de Aqorin no se toca.

**Antes de que un Run empiece sobre una de tus conexiones** (de Pi o de OpenCode), y antes de que empiece un Free
chat sobre una o `aqorin open opencode`, Aqorin pregunta a su endpoint por sus modelos —una llamada a `/models`, con la
clave solo para esa llamada—. Una clave que el proveedor rechaza, un endpoint que no responde o un modelo que la lista
no tiene lo detienen antes de crear nada; un endpoint sin lista, o uno que responde a la comprobación con una
redirección, un límite de peticiones o un error del servidor, pasa, sin que su clave quede probada; uno que responde
una lista vacía aceptó la clave, y sus modelos son los que declaraste a mano. `aqorin doctor --live` y el borrador de
una entrega preguntan lo mismo antes de su turno. **Use by
default** y `aqorin connections use` preguntan lo mismo antes de hacer de una conexión la de por defecto, no cambian
nada si falla y avisan cuando la clave no quedó probada; en una conexión sin modelo por defecto todavía, nombran los
modelos que lista su endpoint. El plan que previsualizas no pregunta: no lee ninguna clave.

Home y Runtimes dicen dónde corre cada runtime cuando un paso no nombra conexión: OpenCode y Pi, sobre su conexión
por defecto y su modelo; Pi, si no, sobre *its own providers · a step names its model*; Claude Code y Codex, sobre
*its own login · Aqorin's isolated setup* (su propio inicio de sesión, en el entorno aislado de Aqorin).

Para cualquiera de estos casos —un proveedor para OpenCode, uno al que Pi llega mediante una extensión, o
una clave de API en lugar de un inicio de sesión— añade una **conexión** propia de Aqorin.

## Añadir una conexión

En Runtimes (`6`), selecciona el runtime y pulsa **Add connection** (`a`). Si ya hay una conexión de
Pi u OpenCode, primero ofrece **A new one** o **Like <nombre>**: el mismo endpoint, clave y modelos para
este runtime, así un proveedor que configuraste una vez se vuelve a usar. El formulario tiene cuatro
pasos, y no se guarda nada hasta el último:

1. **Name**: cómo elegirás la conexión.
2. **Endpoint o inicio de sesión:**
   - **Pi y OpenCode** piden un endpoint: la URL base de un endpoint compatible con OpenAI, y dónde
     está su clave. La URL es `https://…`, o `http://` solo hacia esta máquina. La clave se nombra
     con el **nombre** de una variable de entorno, o como un elemento del llavero de macOS (en Linux, el nombre de una variable).
   - **Codex y Claude Code** piden un inicio de sesión: tu login existente, o una clave de API por
     referencia. En Codex, la referencia es el nombre de la variable que contiene la clave.

   El campo pide el **nombre** de la variable —por ejemplo `NAN_API_KEY`, exportada en la terminal
   desde la que abres `aqorin`—, nunca la clave. Si pegas ahí el valor de una clave, el formulario lo
   oculta, no guarda nada y te lo dice en un solo aviso. Una clave que ya aparece en
   [Credentials](../credentials/) —una clave de proveedor de OpenCode o la de otra conexión, nunca una
   que solo use un servidor MCP— se ofrece por su nombre y por lo que la usa. Si es la única clave de una conexión al mismo host, una conexión
   nueva a ese host empieza en ella: la clave que añadiste una vez se vuelve a usar, sin escribirla otra vez. Si hay varias, no se
   elige ninguna por ti. Codex solo admite variables de entorno.
3. **Models:** **Discover** los descubre (una llamada al `/models` del proveedor, hecha solo porque
   lo pediste), escríbelos, o añádelos más tarde. En **Claude Code y Codex**, el paso ofrece además
   **sus modelos**: los que el runtime lista para tu propio inicio de sesión, tal como los leyó
   Runtimes, sin ninguna llamada al modelo. Con una API key, su cuenta puede ofrecer otros:
   escríbelos.
4. **Default model:** el modelo que recibe un paso cuando no nombra ninguno. Este paso muestra lo que
   se va a escribir.

## Después de añadirla

La conexión aparece bajo su runtime. Su inspector muestra:

- dónde está su clave, y si está definida ahora, comprobado por su nombre; la comprobación no lee el
  valor;
- sus modelos y su modelo por defecto;
- **who uses it** (quién la usa).

Sus acciones:

- **Edit** reabre el mismo formulario, rellenado.
- **Models** convierte un modelo en el predeterminado, quita uno o añade uno a mano; en Claude Code
  y Codex, también desde la propia lista del runtime.
- **Discover** vuelve a pedir sus modelos al proveedor.
- **Delete** pregunta primero y dice qué usa la conexión. La clave se queda donde está.

Aqorin resuelve la clave solo cuando un intento se ejecuta en la conexión. Le da la clave a ese
intento únicamente, y la borra de todo lo que Aqorin muestra o guarda.

## Desde la CLI

```bash
aqorin connections add nan --runtime pi --provider openai-compatible \
  --base-url https://api.example.com/v1 --credential env:EXAMPLE_API_KEY
aqorin connections discover nan
aqorin connections default nan some-model
aqorin connections use nan          # la de por defecto de Pi (de OpenCode, si es suya), si su endpoint responde
aqorin connections use --clear --runtime pi   # Pi vuelve a no tener conexión por defecto
aqorin connections                  # the list, with whether each key resolves now
aqorin doctor --live --runtime pi --connection nan
```
