---
title: Credentials
description: Aqorin keeps references to your keys — a variable's name or a keychain item — never their values.
---

Aqorin never stores or prints the value of a key. It keeps a **reference** to where the key lives,
and reads the value only when an attempt runs, to hand it to that attempt:

| Reference | Means |
|---|---|
| `env:VAR` | The environment variable `VAR`, as Aqorin's own environment has it. |
| `keychain:SERVICE[@ACCOUNT]` | A macOS keychain item. |

The key is resolved only when an attempt runs. It is given to that attempt alone, and scrubbed from
everything Aqorin shows or records.

## The Credentials screen (`8`)

The screen lists every reference once:

- your OpenCode provider keys;
- your connections' keys;
- your MCP servers' variables.

For each one, it shows whether the key is set now, and what uses it.

- **Add reference** sets an OpenCode provider key, in a form.
- **Edit reference** and **Remove** change it. **Remove** asks first; the value itself is never
  touched.
- A reference that belongs to a connection or an MCP server is changed there. **Open** takes you to
  it.

If you type a value where a name belongs, the form hides it and says so.

## Runtime logins

The runtimes' own logins are not Aqorin credentials. Claude Code, Codex, OpenCode and Pi keep their
logins in their own way, and Aqorin never signs in for you or reads their credential files.

```bash
aqorin credentials list
aqorin credentials set opencode ANTHROPIC_API_KEY=env:MY_ANTHROPIC_KEY
aqorin credentials unset opencode ANTHROPIC_API_KEY
```
