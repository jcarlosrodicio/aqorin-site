---
title: Limitaciones conocidas
description: Lo que la Terminal Alpha no hace, y lo que no afirma.
---

## No está en la Alpha

- **Plataformas:** demostrada solo en macOS con Apple silicon (Darwin arm64). Linux y Windows no se
  declaran.
- **Distribución:** la Alpha no está publicada en npm. `@aqorin/cli` 0.2.0 en npm es una CLI
  anterior, sin la TUI.
- **Runtimes:** Claude Code, Codex, OpenCode y Pi. Otros runtimes que el código de Aqorin conoce,
  como jcode, no forman parte de la Alpha.
- **Un Run activo por árbol de trabajo.**
- **Free chat:** no puedes elegir una conexión, y un chat de OpenCode o de Pi no muestra cuánto
  contexto usa.
- **Accesibilidad:** la TUI a pantalla completa no admite lectores de pantalla. Usa `--plain` o
  `--json`.
- **Notificaciones:** solo la campana de la terminal; no hay notificaciones del sistema operativo.

## Lo que no afirma

- **Los roles restringidos** se admiten solo donde hay un mecanismo validado para ese runtime,
  versión, modelo y plataforma. En otros sitios se rechazan, no se relajan. Hoy hay pocas
  combinaciones validadas, y `aqorin eligibility refresh` solo actualiza las de OpenCode.
- **Los `inputs` y `outputs` de un agente** se añaden a sus instrucciones, no se comprueban.
- **El modelo que atendió una petición** no se observa en todos los runtimes.
- **Un paso reintentado** empieza de cero. Es al menos una vez (*at least once*), no una
  conversación reanudada.
- **Los servidores MCP** se eligen por agente, pero lo que un servidor hace con su acceso no está
  acotado.
- **El sandbox de un runtime**, como el de Codex en un chat, es de ese runtime. Aqorin lo solicita y
  comprueba lo que el runtime informa, pero no lo aplica.

## Nunca, por diseño

- Aqorin nunca escribe la configuración de tus runtimes, y nunca carga tus plugins de Claude Code ni
  tus extensiones de Pi, salvo en un chat que crees con *Your configuration*.
- Nunca almacena ni imprime el valor de una clave, y nunca inicia sesión por ti.
- Nunca cambia de runtime, ni reintenta un paso, por su cuenta.
