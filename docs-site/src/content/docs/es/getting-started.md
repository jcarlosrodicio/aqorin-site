---
title: Primeros pasos
description: Para qué sirve Aqorin y tu primer Run, desde un proyecto vacío hasta un Run terminado.
---

Aqorin es un plano de control para agentes de programación. Escribes el workflow una vez, como
agentes y pasos, y un paso puede ejecutarse en Claude Code, Codex, OpenCode o Pi sin que el workflow
cambie.

- **Agente, runtime y modelo son independientes.** Un agente es un rol, como desarrollador o
  revisor. Dónde se ejecuta es otra decisión: su runtime, su conexión y su modelo.
- **El motor aplica las reglas, no un prompt.** Aqorin comprueba en código el orden de los pasos, el
  presupuesto de revisión, tus comprobaciones y tus aprobaciones.
- **Tu configuración sigue siendo tuya.** Aqorin nunca escribe la configuración de tus runtimes.
  Puedes seguir ejecutando `claude`, `codex`, `opencode` o `pi` exactamente como antes.

## Antes de empezar

- macOS con Apple silicon — o Linux como dice [Instalación](../installation/) (Ubuntu en x86_64, bubblewrap, desde
  la 0.4.0) — y Node.js 24.14 o posterior de la línea 24.
- Al menos uno de los cuatro runtimes, instalado y con la sesión iniciada por su propio flujo. Mira
  [Instalación](../installation/).
- Un proyecto que sea un árbol de trabajo de git.

## Los primeros diez minutos

1. **Abre la TUI** en tu proyecto:

   ```bash
   cd your-project
   aqorin
   ```

2. **Home es una lista de comprobación** hasta que el proyecto está listo para ejecutar. Avanza por
   ella:
   - configura Aqorin en este proyecto (escribe `.aqorin/` y nada más);
   - elige una instalación, para cualquier runtime que se encuentre más de una vez;
   - elige el **runtime por defecto**: dónde se ejecuta un paso cuando nada más lo dice.

   El panel de la derecha explica la fila resaltada. **Enter** la ejecuta.
3. **Mira tus runtimes** (`6`). Cada uno muestra su versión, cómo inicia sesión y sus modelos.
   **Validate** (`v`) hace una llamada real a un modelo para comprobarlo, y antes te pregunta.
   Mira [Runtimes](../runtimes/).
4. **Empieza un Free chat** (`2` Runs, luego `c`). Elige un runtime y un modelo, y habla con él como
   lo harías en su propia terminal. Mira [Free chat](../free-chat/).
5. **Ejecuta un workflow** (`2` Runs, luego `n`). Elige un workflow —[Engineering change](../workflows/#los-workflows-integrados)
   va el primero—, di qué hacer y, si quieres, qué
   comandos deben pasar, como `npm test`. El plan dice dónde se ejecuta cada paso, y nada se
   ejecuta hasta que pulsas Enter. Mira [Nueva tarea](../new-task/).
6. **Síguelo** en la vista del Run, y **responde** lo que pregunte en [Attention](../attention/)
   (`3`).

Salir de la TUI (`q`) no detiene un Run. Ejecuta `aqorin` otra vez para retomarlo.

## Todo es también un comando

Cada acción de la TUI es también un verbo de la CLI, con las mismas palabras y los mismos rechazos.
Añade `--json` a cualquier comando para usarlo en scripts. Mira [CLI reference](../cli-reference/).

```bash
aqorin runtimes                                   # what is installed
aqorin tasks new "Add a --dry-run flag" --check-command "npm test"
aqorin run engineering-change --task-file <the task file it wrote>
aqorin logs <run> --follow
```
