---
title: Conexiones
description: Cómo llega un runtime a un modelo, mediante su propio inicio de sesión o mediante una conexión que añades a Aqorin.
---

Claude Code, Codex y Pi tienen cada uno una **conexión nativa**: su propio inicio de sesión y su propia
configuración, exactamente como cuando los ejecutas tú. Aqorin ejecuta Pi **aislado**, sin tus
extensiones: un proveedor al que llegas mediante una extensión puede no existir dentro de Aqorin.

**OpenCode no tiene conexión nativa en Aqorin.** Todo OpenCode que lanza Aqorin —un paso de workflow, un
Free chat, una comprobación, `aqorin open opencode`— corre en el home de OpenCode propio de Aqorin, nunca
con tu configuración de OpenCode, su inicio de sesión (`opencode auth login`), el `opencode.json` de un
repositorio ni las variables que lee tu configuración, y solo ve el proveedor de la conexión sobre la que
corre. Un paso en OpenCode que no nombra conexión corre sobre la **conexión por defecto de OpenCode**: su
única conexión o, si hay varias, la que elijas: selecciónala en Runtimes y pulsa **Use by default** (`u`),
o ejecuta `aqorin connections use <nombre>`. Si no hay ninguna, Aqorin se niega antes de lanzar nada y te
dice cómo añadir una. Un modelo nombrado como lo nombra OpenCode (`nan/deepseek-v4-flash`) corre como el
modelo propio de la conexión si lo tiene. Tu OpenCode fuera de Aqorin no se toca.

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
aqorin connections                  # the list, with whether each key resolves now
aqorin doctor --live --runtime pi --connection nan
```
