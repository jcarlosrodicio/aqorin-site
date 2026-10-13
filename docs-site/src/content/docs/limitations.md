---
title: Known limitations
description: What the Terminal Alpha does not do, and what it does not claim.
---

## Not in the Alpha

- **Platforms:** shown on macOS on Apple silicon (Darwin arm64) only. Linux and Windows are not
  claimed.
- **Distribution:** the Alpha is not published on npm. `@aqorin/cli` 0.2.0 on npm is an earlier
  CLI, without the TUI.
- **Runtimes:** Claude Code, Codex, OpenCode and Pi. Other runtimes that Aqorin's code knows, such
  as jcode, are not part of the Alpha.
- **One active Run per working tree.**
- **Free chat:** you cannot choose a connection, and an OpenCode or Pi chat does not show how much
  context it uses.
- **Accessibility:** the full-screen TUI does not support screen readers. Use `--plain` or `--json`.
- **Notifications:** only the terminal bell; no OS notifications.

## What it does not claim

- **Restricted roles** are admitted only where a mechanism is validated for that runtime, version,
  model and platform. Elsewhere they are refused, not relaxed. Today a few combinations are
  validated (OpenCode and Claude Code, each with named models), and `aqorin eligibility refresh`
  refreshes those two runtimes only.
- **An agent's `inputs` and `outputs`** are added to its instructions, not checked.
- **The model that served a request** is not observed on every runtime.
- **A retried step** starts over. It is at least once, not a resumed conversation.
- **MCP servers** are chosen per agent, but what a server does with its access is not bounded.
- **A runtime's sandbox** — such as Codex's in a chat — is that runtime's. Aqorin requests it and
  checks what the runtime reports, but does not enforce it.

## Never, by design

- Aqorin never writes your runtimes' configuration, and never loads your Claude Code plugins or Pi
  extensions — except in a chat you create with *Your configuration*.
- It never stores or prints a key's value, and never signs in for you.
- It never switches runtime, or retries a step, on its own.
