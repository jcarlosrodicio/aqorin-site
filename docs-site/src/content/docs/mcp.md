---
title: MCP servers
description: An MCP server is a program Aqorin starts for an agent, with only the tools you allow and its credentials by reference.
---

An **MCP server** is a program Aqorin starts for an agent, with only the tools you allow. It lives
on **Resources** (`7`), in the MCP tab.

## Add an MCP server

**Add MCP server** is a form that asks for:

- **the command and its arguments** — the program, by absolute path;
- **its tools** — the only ones an agent may call;
- **its credentials**, by reference only:
  - `NAME=env:VAR` — a variable of Aqorin's environment;
  - `NAME=keychain:SERVICE[@ACCOUNT]` — a macOS keychain item.

Anything else is refused. While what follows `=` cannot yet be a reference, the form hides it.

The list says whether each server's credentials are set now, or *unknown* when that could not be
checked.

**Edit** reopens the same form, filled in. Aqorin writes the file anew, so comments in it are not
kept. Some servers cannot be given back through the form unchanged — for example, one with an
argument containing a space, or a keychain item containing a space or an `@`. Edit those in their
file.

**Assign**, **Unassign** and **Remove** work as they do for [skills](../skills/): the project, a
workflow or an agent; required or optional. **Remove** is refused while anything uses the server.

## The file

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
Aqorin chooses which servers and tools an agent may use. It does not limit what the server itself
does with the access you give it. A server's credential reaches the runtime's environment, so the
server can work.
:::
