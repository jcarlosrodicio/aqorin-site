---
title: Servidores MCP
description: Un servidor MCP es un programa que Aqorin arranca para un agente, solo con las herramientas que permites y con sus credenciales por referencia.
---

Un **servidor MCP** es un programa que Aqorin arranca para un agente, solo con las herramientas que
permites. Vive en **Resources** (`7`), en la pestaña MCP.

## Añadir un servidor MCP

**Add MCP server** es un formulario que pide:

- **el comando y sus argumentos**: el programa, con ruta absoluta;
- **sus herramientas**: las únicas que un agente puede llamar;
- **sus credenciales**, solo por referencia:
  - `NAME=env:VAR`: una variable del entorno de Aqorin;
  - `NAME=keychain:SERVICE[@ACCOUNT]`: un elemento del llavero de macOS.

Cualquier otra cosa se rechaza. Mientras lo que sigue a `=` aún no puede ser una referencia, el
formulario lo oculta.

La lista dice si las credenciales de cada servidor están definidas ahora, o *unknown* (desconocido)
cuando no se pudo comprobar.

**Edit** reabre el mismo formulario, rellenado. Aqorin escribe el archivo de nuevo, así que los
comentarios que tenga no se conservan. Algunos servidores no se pueden devolver tal cual a través
del formulario, por ejemplo uno con un argumento que contiene un espacio, o un elemento del llavero
que contiene un espacio o una `@`. Edítalos en su archivo.

**Assign**, **Unassign** y **Remove** funcionan como en las [skills](../skills/): todos los Runs, un
workflow o un agente; requerida u opcional. **Remove** se rechaza mientras algo use el servidor.

## El archivo

```yaml
kind: aqorin.mcp_server
schema_version: 1
id: github
transport: stdio
command: /opt/homebrew/bin/github-mcp-server
args: [stdio]
env:
  GITHUB_PERSONAL_ACCESS_TOKEN: { env: GITHUB_TOKEN }
  # or: { keychain: { service: github-mcp, account: me } }
tools: [get_me, get_issue]
```

```bash
aqorin mcp add github --command /opt/homebrew/bin/github-mcp-server --arg stdio \
  --tool get_me --tool get_issue --env GITHUB_PERSONAL_ACCESS_TOKEN=env:GITHUB_TOKEN
aqorin mcp assign github --scope agent:developer
```

:::caution
Aqorin elige qué servidores y herramientas puede usar un agente. No limita lo que el propio
servidor hace con el acceso que le das. La credencial de un servidor llega al entorno del runtime,
para que el servidor pueda funcionar.
:::
