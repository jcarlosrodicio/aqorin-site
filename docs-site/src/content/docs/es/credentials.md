---
title: Credenciales
description: Aqorin guarda referencias a tus claves, el nombre de una variable o un elemento del llavero, nunca sus valores.
---

Aqorin nunca almacena ni imprime el valor de una clave. Guarda una **referencia** a dónde está la
clave, y lee el valor solo cuando se usa: cuando se ejecuta un intento, para dárselo a ese intento, o
para una comprobación que pides, como **Discover** o **Validate**:

| Referencia | Significa |
|---|---|
| `env:VAR` | La variable de entorno `VAR`, tal como la tiene el propio entorno de Aqorin. |
| `keychain:SERVICE[@ACCOUNT]` | Un elemento del llavero de macOS. En Linux nunca se resuelve — Aqorin lo dice donde lo escribes y donde un Run lo necesita; usa `env:VAR` allí. |

La clave se resuelve solo cuando se ejecuta un intento. Se le da únicamente a ese intento, y se borra
de todo lo que Aqorin muestra o registra.

## La pantalla Credentials (`8`)

La pantalla lista cada referencia una vez:

- las claves de tus conexiones;
- las variables de tus servidores MCP;
- cualquier clave de proveedor de OpenCode que definieras antes, marcada como *not used*.

De cada una muestra si la clave está definida ahora y qué la usa.

- Las claves de proveedor de OpenCode están retiradas: OpenCode solo corre sobre las
  [conexiones](../connections/) de Aqorin, así que una clave definida aquí no llegaría a ningún OpenCode.
  **Add reference** y **Edit reference** lo dicen y te llevan a Runtimes: dale la clave a una conexión de
  OpenCode. Una referencia que solo usa un servidor MCP nunca se ofrece como clave de una conexión.
- **Use in a connection…** (`u`) abre el formulario de una conexión de Pi u OpenCode con la clave, y
  con el endpoint y los modelos de la única conexión compatible con OpenAI que ya la usa, si la hay. No
  se ofrece para la variable de un servidor MCP.
- **Remove** quita una referencia. Pregunta primero; el valor en sí nunca se toca.
- Una referencia que pertenece a una conexión o a un servidor MCP se cambia allí. **Open** te lleva
  hasta ella.

El campo de clave de una conexión pide el **nombre de la variable que la guarda**. Si escribes o pegas
un valor donde va un nombre, el formulario lo oculta, no guarda nada y te lo dice en un solo aviso.

## Inicios de sesión de los runtimes

Los inicios de sesión propios de los runtimes no son credenciales de Aqorin. Claude Code, Codex y Pi
guardan sus inicios de sesión a su manera, y Aqorin nunca inicia sesión por ti ni lee sus archivos de
credenciales. Dentro de Aqorin, OpenCode no usa su inicio de sesión: corre sobre las conexiones de Aqorin.

```bash
aqorin credentials list
aqorin credentials unset opencode ANTHROPIC_API_KEY   # una clave de antes; set opencode se rechaza
```
