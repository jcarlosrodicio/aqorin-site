---
title: Solución de problemas
description: Las situaciones que es más probable que encuentres, qué dice Aqorin y qué hacer.
---

Empieza con `aqorin doctor`. Ejecuta comprobaciones de solo lectura, incluida la instalación de cada
runtime. Cada rechazo nombra el siguiente paso, en la TUI y en `--json` (`safe_next`).

## No se encuentra un runtime

El runtime no está en tu `PATH`, o la ruta que conoce Aqorin ya no existe. Instala el runtime, o
indica a Aqorin dónde está:

```bash
aqorin runtimes                          # what Aqorin sees
aqorin runtimes select pi /path/to/pi    # choose an installation
```

## "Several installations" o "choose again"

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

- **Un paso de solo lectura o de revisión en un runtime sin mecanismo validado.** `a` asigna el
  paso donde pueda ejecutarse. Mira [Modelo de seguridad](../security/#restricted-roles).
- **Una conexión que no está configurada.** `c` abre la configuración del runtime.
- **Una skill o un servidor MCP requeridos que el runtime no puede cargar.** Hazlo opcional, o
  asigna el paso a otro sitio.
- **Una versión de runtime nueva para Aqorin.** `v` la valida, con una llamada a un modelo.

## "Another Run is unfinished"

Hay un Run a la vez por árbol de trabajo. Termina, cancela o reanuda el Run abierto (`2` Runs). Un
Run cuyo driver murió aparece como **stale**. Ábrelo, y luego reanúdalo o cancélalo.

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
