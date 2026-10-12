---
title: Aqorin documentation
description: Aqorin runs coding work as workflows of agents on Claude Code, Codex, OpenCode and Pi.
---

Aqorin runs coding work as **workflows of agents** on the coding runtimes you already use —
**Claude Code, Codex, OpenCode and Pi**. You choose each step's runtime and model. Commands you
trust validate the work. A review step reviews it, where the workflow declares one.

Aqorin does not replace those runtimes. You keep using them natively, and Aqorin never changes
their configuration.

:::caution[Terminal Alpha]
These pages describe the Terminal Alpha: a full-screen TUI (`aqorin`) and a CLI that does everything
the TUI does.

- **Platform:** shown on **macOS on Apple silicon (Darwin arm64)** only. Linux and Windows are not
  claimed.
- **Availability:** the Alpha is not distributed publicly yet, on npm or elsewhere. The `@aqorin/cli` package on npm (0.2.0)
  predates it and has no TUI.
:::

## Where to start

- [Getting started](getting-started/) — what Aqorin is for and the first ten minutes.
- [Installation](installation/) — what you need, and how to install, uninstall and start fresh.
- [The TUI](tui/) and [Keyboard and navigation](keyboard/) — find your way around the screen.
- [Security model](security/) — what Aqorin enforces, and what it only asks for.
- [Known limitations](limitations/) — what this Alpha does not do.

## Words used on these pages

| Word | Meaning |
|---|---|
| **Runtime** | A coding agent you have installed: Claude Code, Codex, OpenCode or Pi. |
| **Connection** | How a runtime reaches a model: its own login, or a provider you add to Aqorin, with the key by reference. |
| **Agent** | A role, such as specifier, developer or reviewer: what it does and what it may do. An agent names no runtime and no model. |
| **Workflow** | Which agents run, in what order, which step runs your checks and which step reviews. |
| **Assignment** | Where each step of a workflow runs: a runtime, a connection and a model. |
| **Run** | One execution of a workflow, durable and recorded, that you can follow, answer and resume. |
| **Free chat** | A conversation with one runtime, through Aqorin. |
