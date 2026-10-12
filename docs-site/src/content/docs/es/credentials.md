---
title: Credenciales
description: Aqorin guarda referencias a tus claves, el nombre de una variable o un elemento del llavero, nunca sus valores.
---

Aqorin nunca almacena, imprime ni lee el valor de una clave. Guarda una **referencia** a dónde está
la clave:

| Referencia | Significa |
|---|---|
| `env:VAR` | La variable de entorno `VAR`, tal como la tiene el propio entorno de Aqorin. |
| `keychain:SERVICE[@ACCOUNT]` | Un elemento del llavero de macOS. |

La clave se resuelve solo cuando se ejecuta un intento. Se le da únicamente a ese intento, y se borra
de todo lo que Aqorin muestra o registra.

## La pantalla Credentials (`8`)

La pantalla lista cada referencia una vez:

- tus claves de proveedor de OpenCode;
- las claves de tus conexiones;
- las variables de tus servidores MCP.

De cada una muestra si la clave está definida ahora y qué la usa.

- **Add reference** define una clave de proveedor de OpenCode, en un formulario.
- **Edit reference** y **Remove** la cambian. **Remove** pregunta primero; el valor en sí nunca se
  toca.
- Una referencia que pertenece a una conexión o a un servidor MCP se cambia allí. **Open** te lleva
  hasta ella.

Si escribes un valor donde va un nombre, el formulario lo oculta y te lo dice.

## Inicios de sesión de los runtimes

Los inicios de sesión propios de los runtimes no son credenciales de Aqorin. Claude Code, Codex,
OpenCode y Pi guardan sus inicios de sesión a su manera, y Aqorin nunca inicia sesión por ti ni lee
sus archivos de credenciales.

```bash
aqorin credentials list
aqorin credentials set opencode ANTHROPIC_API_KEY=env:MY_ANTHROPIC_KEY
aqorin credentials unset opencode ANTHROPIC_API_KEY
```
