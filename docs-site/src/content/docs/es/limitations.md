---
title: Limitaciones conocidas
description: Lo que la Terminal Alpha no hace, y lo que no afirma.
---

## No está en la Alpha

- **Plataformas:** macOS con Apple silicon (Darwin arm64) y Linux tal como se demostró — Ubuntu 26.04 en x86_64,
  desde la 0.4.0 (la 0.3.0 es anterior). No demostrado: Linux en arm64, otras distribuciones, macOS en
  Intel. Windows no se declara. En Linux un paso de solo lectura o de revisión en Claude Code es advisory, y unos
  pocos nombres protegidos de `~/.claude` que aún no existen no se pueden cerrar.
- **Distribución:** solo npm (`@aqorin/cli` 0.5.0); ningún otro gestor de paquetes ni descarga.
  La 0.4.0 trajo Linux; la 0.3.0 es solo de macOS; la 0.1.0 y la 0.2.0 son una CLI anterior, sin la TUI.
- **Runtimes:** Claude Code, Codex, OpenCode y Pi. Otros runtimes que el código de Aqorin conoce,
  como jcode, no forman parte de la Alpha.
- **Varios workflows en una carpeta:** uno trabaja en la carpeta; los demás, en worktrees de git
  propios, como mucho cuatro a la vez. Fuera de git, uno cada vez. En macOS (y Linux) el sandbox de Aqorin mantiene
  a los agentes de un Run fuera de las carpetas de los demás; un Free chat escribe en la carpeta del proyecto,
  donde puede trabajar uno de ellos; con `sandbox: off` o en Codex más allá de su propio sandbox, nada lo hace.
- **Sandbox:** solo escrituras — las lecturas y la red no se limitan. En Linux necesita bubblewrap;
  mientras un paso se ejecuta no se crea nada en la raíz de tu home, de `~/.config` ni de `~/.local`; un
  fichero protegido en `~/.claude` que aún no existe se nombra como no cerrado en vez de afirmarse.
- **OpenCode:** solo proveedores compatibles con OpenAI, como conexiones de Aqorin. Los proveedores
  integrados de OpenCode (una clave de Anthropic u OpenAI) y sus inicios de sesión (OpenCode Go, Copilot,
  xAI) no son accesibles desde Aqorin.
- **Free chat:** solo en Pi y en OpenCode puedes elegir una conexión, y un chat de OpenCode o de Pi no muestra cuánto
  contexto usa.
- **Accesibilidad:** la TUI a pantalla completa no admite lectores de pantalla. Usa `--plain` o
  `--json`.
- **Notificaciones:** solo la campana de la terminal; no hay notificaciones del sistema operativo.

## Lo que no afirma

- **La restricción de los roles restringidos** solo es efectiva donde hay un mecanismo validado para
  ese runtime, versión, modelo y plataforma. En otros sitios se ejecutan con una restricción
  orientativa: se les indica que no escriban ni ejecuten comandos, con el modo de solo lectura del
  propio runtime, y nada demuestra que lo hayan respetado. Hoy hay unas pocas combinaciones validadas
  (OpenCode y Claude Code, cada uno con modelos concretos), y `aqorin eligibility refresh` solo
  actualiza esos dos runtimes. En macOS y Linux con el sandbox activo, el sandbox de Aqorin impone que no
  escriban ficheros en todos los runtimes salvo jcode; que no ejecuten comandos, no.
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
- Nunca cambia de runtime por su cuenta, y solo reintenta un paso por su cuenta tras un fallo
  transitorio (un límite de uso, una sobrecarga, un fallo de red), dos veces, si el proyecto no cambió.
