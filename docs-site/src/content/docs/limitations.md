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
- **Several workflows in one folder:** one works in the folder; the others run in git worktrees of
  their own, at most four at once. Outside git, one at a time. On macOS Aqorin's sandbox keeps a Run's
  agents out of the others' folders; a Free chat writes in the project folder, where one of them may work;
  with `sandbox: off` or on Codex beyond its own sandbox, nothing does.
- **Sandbox:** writes only — reads and the network are not limited.
- **Free chat:** a connection can be chosen on Pi and OpenCode only, and an OpenCode or Pi chat does not
  show how much context it uses.
- **OpenCode:** only OpenAI-compatible providers, as Aqorin connections. OpenCode's built-in providers
  (an Anthropic or OpenAI key) and its logins (OpenCode Go, Copilot, xAI) are not reachable from Aqorin.
- **Accessibility:** the full-screen TUI does not support screen readers. Use `--plain` or `--json`.
- **Notifications:** only the terminal bell; no OS notifications.

## What it does not claim

- **Restricted roles** are enforced only where a mechanism is validated for that runtime, version,
  model and platform. Elsewhere they run with an advisory restriction: told not to write or run
  commands, with the runtime's own read-only setting, and nothing shows they held to it. Today a few
  combinations are validated (OpenCode and Claude Code, each with named models), and
  `aqorin eligibility refresh` refreshes those two runtimes only. On macOS with the sandbox on, their
  file writes are enforced by Aqorin's sandbox on every runtime but jcode; their commands are not.
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
- It never switches runtime on its own, and retries a step on its own only after a transient failure
  (a rate limit, an overload, a network fault), twice, while the project is unchanged.
