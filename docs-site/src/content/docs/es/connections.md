---
title: Conexiones
description: Cómo llega un runtime a un modelo, mediante su propio inicio de sesión o mediante una conexión que añades a Aqorin.
---

Cada runtime tiene una **conexión nativa**: su propio inicio de sesión y su propia configuración,
exactamente como cuando lo ejecutas tú.

Aqorin ejecuta Pi y OpenCode **aislados**, sin tus extensiones ni plugins. Por eso, un proveedor al
que llegas de forma nativa mediante una extensión puede no existir dentro de Aqorin. En ese caso, o
para usar una clave de API en lugar de un inicio de sesión, añade una **conexión** propia de
Aqorin.

## Añadir una conexión

En Runtimes (`6`), selecciona el runtime y pulsa **Add connection** (`a`). El formulario tiene
cuatro pasos, y no se guarda nada hasta el último:

1. **Name**: cómo elegirás la conexión.
2. **Endpoint o inicio de sesión:**
   - **Pi y OpenCode** piden un endpoint: la URL base de un endpoint compatible con OpenAI, y dónde
     está su clave. La URL es `https://…`, o `http://` solo hacia esta máquina. La clave se nombra
     con el **nombre** de una variable de entorno, o como un elemento del llavero de macOS.
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
