---
title: Solución de problemas
description: Las situaciones que es más probable que encuentres, qué dice Aqorin y qué hacer.
---

Empieza con `aqorin doctor`. Ejecuta comprobaciones de solo lectura, incluida la instalación de cada
runtime. La mayoría de los rechazos nombran el siguiente paso, en la TUI y en `--json`
(`safe_next`).

## No se encuentra un runtime

El runtime no está en tu `PATH`, o la ruta que conoce Aqorin ya no existe. Instala el runtime, o
indica a Aqorin dónde está:

```bash
aqorin runtimes                          # what Aqorin sees
aqorin runtimes select pi /path/to/pi    # choose an installation
```

## Varias instalaciones, o hay que volver a elegir

Aqorin encontró más de una instalación, o la que elegiste cambió o desapareció. No adivina. Usa
**Choose installation** en Home o en Runtimes, o `aqorin runtimes select`. Mira
[Runtimes](../runtimes/#several-installations).

## Una clave no está definida

Una conexión, un proveedor de OpenCode o un servidor MCP nombra una clave que no se resuelve ahora.
El inspector dice cuál, por su nombre. Define la variable en el entorno en que se ejecuta Aqorin, o
arregla el elemento del llavero, y vuelve a comprobar en [Credenciales](../credentials/) (`8`).

Si un Run falló por eso, arregla la clave y luego **Retry same assignment**. Mira
[Recuperación](../recovery/).

## El plan se rechaza

El plan dice quién no puede ejecutarse dónde, y por qué. Las causas habituales:

- **Abriste Aqorin dentro de su propio repositorio.** Un workflow nunca se ejecuta sobre el
  repositorio de Aqorin, ni sobre una carpeta dentro de él, ni en, dentro o alrededor de una carpeta
  protegida. Abre Aqorin en el proyecto en el que
  quieres que trabaje (`cd` a él y luego `aqorin`).
- **Una conexión que no está configurada.** `c` abre la configuración del runtime.
- **Una skill o un servidor MCP requeridos que el runtime no puede cargar.** Hazlo opcional, o
  asigna el paso a otro sitio.
- **Una versión de runtime que Aqorin no puede comprobar en absoluto** (no se puede leer su ayuda).
  `v` la valida, con una llamada a un modelo. Una versión mayor nueva cuya ayuda lista lo que Aqorin
  necesita no se rechaza: se ejecuta, y su primer paso la comprueba.
- **Una reanudación tras actualizar un runtime.** Un Run planificado con la restricción de un paso
  efectiva no se reanuda en una versión que ninguna comprobación cubre. Refresca la comprobación
  (`aqorin eligibility refresh <runtime>`), o crea un Run nuevo.

## El plan dice que un paso es advisory

Un paso de solo lectura o de revisión en un runtime, versión o modelo que ninguna comprobación de
esta máquina cubre se ejecuta igualmente, con la restricción **advisory** (orientativa): se le indica
que no escriba ni ejecute comandos, con el modo de solo lectura de su runtime, y nada demuestra que
lo haya respetado. El resultado del Run es orientativo. Para que la restricción sea efectiva, asigna
el paso a un runtime y un modelo validados; el plan los indica. Mira
[Modelo de seguridad](../security/#roles-restringidos).

## El paso siguiente no empieza

Tras un paso cuyo trabajo se comprueba, el Run ejecuta sus comprobaciones antes de seguir, y los
pasos muestran **checking**. Aqorin ejecuta las comprobaciones de la tarea; si la tarea pidió el
agent check, antes el runtime del paso comprueba el trabajo (de forma orientativa): elige qué
ejecutar, y pasar todos los tests del proyecto puede llevar minutos. Si es demasiado lento, lanza la
tarea sin **Agent check**. El paso siguiente (el revisor, por ejemplo) empieza cuando responden. El trabajo del paso
muestra qué están haciendo mientras lo hacen. Mira
[Runs](../runs/#la-vista-de-un-run).

## Un Run cada vez

Hay un Run de workflow a la vez en la carpeta de tu proyecto (los Free chats no cuentan); en un
repositorio git, un segundo workflow se ejecuta en un worktree propio (mira [Runs](../runs/)). Fuera de
git, termina, cancela o reanuda el Run abierto (`2` Runs). Un
Run cuyo driver murió aparece como **stale**. Ábrelo, y luego reanúdalo o cancélalo.

Como mucho cuatro workflows van en worktrees a la vez: un quinto se rechaza y los nombra — espera a que
acabe uno, o cancela uno.

## Un worktree no se integra

Integrar solo va a la rama desde la que se creó el worktree: si tu carpeta está en otra rama, haz
`git checkout` de esa y vuelve a integrar — o conserva la rama para un pull request. También se rechaza
mientras tu carpeta tenga cambios sin commit o un workflow en marcha, y cuando la fusión choca (no se
fusiona nada; se nombran los ficheros). Una integración de la que te arrepientes se deshace con `U`
(`aqorin worktree undo <run>`).

## El almacén de estado es más nuevo que este Aqorin

Un Aqorin más nuevo escribió el almacén de estado. Actualiza Aqorin; un binario más antiguo se niega
a abrirlo en lugar de dañarlo.

## La marca se ve distinta

La marca `◈` está en Menlo. Con una fuente de terminal que no la tenga, la fuente de reemplazo puede
dibujarla de otra manera. Usa Menlo, o define `AQORIN_TUI_ASCII=1`.

## Códigos de salida

| Código | Significado |
|---:|---|
| 0 | Éxito. |
| 1 | Fallo genérico o interno. |
| 2 | Uso incorrecto de la CLI o entrada no válida. |
| 3 | Conflicto de configuración o selección necesaria, incluido un Run que necesita una decisión. |
| 4 | Runtime ausente o incompatible. |
| 5 | Requisito de capacidad o de política no cumplido. |
| 6 | La validación falló. |
| 7 | Revisión no aprobada; se requieren cambios. |
| 8 | Se requiere Human Approval. |
| 9 | Interrumpido, o un Run incompleto que se puede reanudar. |
| 10 | Cancelado. |
| 11 | Fallo de estado, de migración o de recuperación. |
