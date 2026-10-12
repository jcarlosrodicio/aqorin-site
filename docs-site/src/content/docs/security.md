---
title: Security model
description: What Aqorin enforces, where each guarantee is enforced, and what it only requests from a runtime.
---

Aqorin's rule is simple: **it never claims a guarantee it cannot enforce**. Every guarantee says
where it is enforced. Every fallback says how it differs from running natively. Nothing is elevated
silently.

## What the engine enforces

These rules are code in Aqorin's engine, not instructions a model is asked to remember:

- **Legal transitions.** A step moves only along its workflow's transitions. A shortcut — such as
  implement straight to done — is rejected.
- **Validation.** With checks, Aqorin runs your commands itself, without a shell, and only their exit
  status decides.
- **Review and budgets.** A Run succeeds only when its required review is approved, its checks have
  passed, its approvals are resolved and no budget is exceeded.
- **Human Approval.** What needs your approval waits for it. `--yes` never approves anything.
- **Admission before anything runs.** A plan that cannot be honoured is refused before any runtime
  starts.

## Restricted roles

A `read_only` or `review` agent is admitted only where Aqorin has validated the mechanism that
restricts it — for that runtime, version, model and platform. Anywhere else, the plan is refused
(`policy_unenforceable`), never relaxed. Aqorin never widens a role's access class to make a
runtime fit.

A workflow that cannot meet this is labelled **advisory**, and its result is never presented as
independently reviewed.

## Your configuration and your keys

- Aqorin never writes your runtimes' configuration. What it gives a runtime is an isolated,
  namespaced environment of its own, for one attempt.
- Keys are kept **by reference only**: a variable's name or a keychain item. A key's value is
  resolved when an attempt runs, given to that attempt alone, and scrubbed from everything Aqorin
  shows or records. Aqorin never stores, prints or reads a key's value.
- Aqorin never signs in for you, and never reads a runtime's credential files.

## Where each guarantee is enforced

| Enforced by | Example |
|---|---|
| **Aqorin** | Transitions, budgets, checks, approvals, admission, credential references. |
| **The runtime, natively** | A runtime's own permission prompts, and its own sandbox — such as Codex's in a chat. |
| **Not enforceable** | Said as such. Aqorin requests it, and says it only requested it. |

A sandbox flag that Aqorin has not verified on a runtime is reported as a **request**, not a
guarantee.

## Free chat

A Free chat runs as its runtime does in its own terminal.

- In **Ask**, the runtime asks you what it would ask in its terminal.
- In **Full access**, it runs any command and edits any file without asking. You confirm this mode
  when you choose it.
- With **Your configuration**, whatever your settings already allow runs without asking.

See [Free chat](../free-chat/).

## What Aqorin does not bound

- **What an MCP server does with its access.** Aqorin chooses which servers and tools an agent
  may use, not what the server does.
- **Your check commands.** They run with your permissions. They are code you trust.
- **A role that may edit files.** It can do in the project whatever its runtime allows.
