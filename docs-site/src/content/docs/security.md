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
- **Admission before anything runs.** A plan that cannot be honoured — a connection that is not
  configured, a required skill a runtime cannot take — is refused before any runtime starts. A
  read-only or review step's restriction is judged before anything runs too, and said as enforced or
  advisory.

## Restricted roles

Any agent can run on any runtime, read-only and review agents included. What differs is whether
their restriction — no writes, no commands — is **enforced** or **advisory**.

It is **enforced** where Aqorin has validated the mechanism that restricts it — for that runtime,
version, model and platform. Validated today, on macOS arm64:

| Runtime | Version | Models |
|---|---|---|
| OpenCode | 1.18.32 | `nan/glm5.3-flash` |
| Claude Code | 2.1.296 | `claude-opus-5-5`, `claude-sonnet-5-5` |

The model must be named in the assignment: a runtime's own default is not one a check covered. On
Claude Code, a read-only or review step has only Read, Glob and Grep — no command, no write, no skill,
no MCP server. After a runtime updates, `aqorin eligibility refresh <runtime> --model <model>` checks
the new version on this machine (OpenCode and Claude Code; one model call per control, asked first).

Anywhere else — Codex, Pi, another model or version — the restriction is **advisory**. The step runs
with its runtime's own read-only setting, and is told not to write or run commands:

| Runtime | Its read-only setting |
|---|---|
| Codex | the read-only sandbox, with its shell, exec and multi-agent features off |
| Pi | only the read, grep, find and ls tools; no extensions, no MCP server |
| OpenCode, Claude Code | their read-only permissions |

Nothing shows the step holds to it, so Aqorin never says it does. The plan marks the step
`advisory`, the pickers say `restriction enforced` or `restriction advisory`, and the Run's result is
advisory: never presented as validated or independently reviewed. Aqorin never widens a role's access
class to make a runtime fit.

A Run planned with the restriction enforced is never resumed with it advisory: on a runtime version
no check covers, the resume is refused (`policy_unenforceable`). Refresh the check, or start a new
Run, whose plan says the restriction advisory.

## Commands a step can run

A step that edits files may also run commands where its runtime lets it. On Claude Code, every
agent of the *edits files* class — the developer included — gets the shell: it can run the project's
tests, linters and scripts, with your permissions, as you would running Claude Code yourself. The
shell is not confined to the project folder, and Aqorin does not limit which commands it runs; the
plan says so for each such step. A read-only or review step never gets it.

## Your configuration and your keys

- Aqorin never writes your runtimes' configuration. What it gives a runtime in a workflow step is an
  isolated, namespaced environment of its own, for one attempt.
- Keys are kept **by reference only**: a variable's name or a keychain item. A key's value is
  resolved when an attempt runs, given to that attempt alone, and scrubbed from everything Aqorin
  shows or records. Aqorin never stores or prints a key's value.
- Aqorin never signs in for you, and never reads a runtime's credential files.

## Where each guarantee is enforced

| Enforced by | Example |
|---|---|
| **Aqorin** | Transitions, budgets, checks, approvals, admission, credential references. |
| **The macOS kernel** | Aqorin's sandbox around a workflow Run's or a Free chat's Claude Code, OpenCode and Pi: the writes below, refused. |
| **The runtime, natively** | A runtime's own permission prompts, and its own sandbox — such as Codex's. |
| **Not enforceable** | Said as such. Aqorin requests it, and says it only requested it. |

A sandbox flag that Aqorin has not verified on a runtime is reported as a **request**, not a
guarantee.

## The sandbox around a workflow Run

On macOS, a workflow Run's Claude Code, OpenCode and Pi run in Aqorin's sandbox (Seatbelt). Its agents
write in the Run's own folder or worktree and anywhere outside your project. These writes fail with
`Operation not permitted`:

- the repository's other folders, its `.git` and its `.aqorin` — so an agent cannot commit, move a
  branch, add a hook to `.git` or turn the sandbox off; Aqorin commits when you integrate a worktree;
- other Runs' worktrees, and Aqorin's own files — its record of your Runs included;
- your keys, cloud credentials, and git and shell configuration (`~/.ssh`, `~/.aws`, `~/.gitconfig`,
  `~/.zshrc`…, and the file a symlinked one points to);
- the coding agents' own settings (`~/.claude/settings.json`, `~/.codex`, `~/.config/opencode`, `~/.pi`…)
  and the executables on your PATH (`~/.local/bin`, Homebrew's).

None of them, nor any folder above them, can be renamed out of the way. The Run's checks run in the
sandbox too, and integrating a sandboxed Run's worktree runs no git hook — its agents may have written
one. Reads and the network are not limited. Codex keeps its own sandbox; Claude Code's own is turned off
inside Aqorin's for that Run, without changing your settings. Where the sandbox cannot be set up, the Run
is refused. `sandbox: off` in `.aqorin/aqorin.yaml` runs without it, and every Run says so.

A Free chat on Claude Code, OpenCode or Pi runs in the same sandbox, writing in your project folder: its
sandbox is chosen when you start (or follow up) the chat, and every turn runs in that one. A chat started
before this runs without it, and says so. A Pi chat on *Your configuration* cannot run in it — Pi writes
in `~/.pi`, which stays closed — so use Aqorin's configuration, or `sandbox: off`.

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
- **A role that may edit files.** It can do in its own folder whatever its runtime allows — and, with
  `sandbox: off`, anywhere you can.
- **What a sandboxed agent reads,** and where it connects.
