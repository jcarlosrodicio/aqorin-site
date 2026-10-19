---
title: Credentials
description: Aqorin keeps references to your keys — a variable's name or a keychain item — never their values.
---

Aqorin never stores or prints the value of a key. It keeps a **reference** to where the key lives,
and reads the value only when it is used — when an attempt runs, to hand it to that attempt, or for a
check you ask for, such as **Discover** or **Validate**:

| Reference | Means |
|---|---|
| `env:VAR` | The environment variable `VAR`, as Aqorin's own environment has it. |
| `keychain:SERVICE[@ACCOUNT]` | A macOS keychain item. On Linux it never resolves — Aqorin says so where you write it and where a Run needs it; use `env:VAR` there. |

The key is resolved only when an attempt runs. It is given to that attempt alone, and scrubbed from
everything Aqorin shows or records.

## The Credentials screen (`8`)

The screen lists every reference once:

- your connections' keys;
- your MCP servers' variables;
- any OpenCode provider key you set before, shown as *not used*.

For each one, it shows whether the key is set now, and what uses it.

- OpenCode provider keys are retired: OpenCode runs only on Aqorin's [connections](../connections/),
  so a key set here would reach no OpenCode. **Add reference** and **Edit reference** say so and point
  you to Runtimes; give the key to an OpenCode connection instead. A reference only an MCP server uses
  is never offered as a connection's key.
- **Use in a connection…** (`u`) opens a Pi or OpenCode connection's form with the key — and the
  endpoint and models of the one OpenAI-compatible connection that already uses it, when there is one.
  It is not offered for an MCP server's variable.
- **Remove** takes a reference away. It asks first; the value itself is never touched.
- A reference that belongs to a connection or an MCP server is changed there. **Open** takes you to
  it.

A connection's key field asks for the **name of the variable that holds it**. If you type or paste a
value where a name belongs, the form hides it, stores nothing, and says so in one warning.

## Runtime logins

The runtimes' own logins are not Aqorin credentials. Claude Code, Codex and Pi keep their logins in
their own way, and Aqorin never signs in for you or reads their credential files. Inside Aqorin,
OpenCode does not use its own login at all: it runs on Aqorin's connections.

```bash
aqorin credentials list
aqorin credentials unset opencode ANTHROPIC_API_KEY   # a key set before; set opencode is refused
```
