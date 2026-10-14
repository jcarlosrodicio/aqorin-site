---
title: Free chat
description: A conversation with one runtime through Aqorin — as it runs in its own terminal, with its permissions in the open.
---

**Free chat** is a conversation with one runtime, through Aqorin. Start one with the first choice
of New task, or with `c` on Runs. Pick a runtime and a model, then decide how it works. For Pi, the
models of the Pi connections you set up in Runtimes are offered too, as *model · connection*: the chat
then runs isolated on that connection, its key given by name.

Free chats do not wait for each other or for a workflow: several can be open, and a workflow runs
beside them. If a message fails — a provider error — the chat says why in the runtime's words and goes
on: send again, or finish it. A chat that does not start says why in a dialog.

## How it works

The last step of the form asks two things.

**What it may do:**

| Mode | Means |
|---|---|
| **Ask** (default) | Whatever the runtime would ask you in its own terminal, it asks you here. |
| **Full access** | It runs any command and edits any file without asking. You confirm this choice. |

**Its configuration:**

| Configuration | Means |
|---|---|
| **Isolated** | Aqorin's clean profile. |
| **Your configuration** | Your settings, plugins, extensions and MCP servers. The runtime reads them; Aqorin never writes them. Whatever they already allow runs without asking, as in your terminal. |

### Per runtime

| Runtime | Ask | Full access | Configuration |
|---|---|---|---|
| Claude Code | Its permission prompts, here | Yes | Isolated or yours |
| Codex | Codex's own default — see below | Yes | Aqorin's own Codex home |
| OpenCode | Its permission prompts, here | Yes | Always yours |
| Pi | — Pi never asks before a tool | Always | Isolated or yours |

In a Codex chat, **Ask** is Codex's own default. Codex's sandbox lets it work in your project
without asking, and it asks before using the network or a path beyond its writable roots. That
sandbox is Codex's: Aqorin requests it and checks that Codex reports it in effect, but does not
enforce it itself. Codex's chat runs in Aqorin's own Codex home, with your sign-in linked, never
copied — never with your configuration.

An OpenCode chat reads your OpenCode configuration, and gets the variables your global
`~/.config/opencode/opencode.json`, `.jsonc` or `config.json` names as `{env:NAME}` — a provider key such as
`NAN_API_KEY` — from the environment Aqorin was started in: by name, never stored, and hidden from
what Aqorin shows and keeps as a credential is. Not read for them: a project's own `opencode.json`,
`OPENCODE_CONFIG` or `OPENCODE_CONFIG_DIR`; and a name a credential may not have (such as `PATH` or
`OPENCODE_…`) is never given. If a message fails, the error says the provider's reason.

In an OpenCode chat, Aqorin keeps one thing off: OpenCode's subagents (its task tool). Their
requests would come from a session the chat does not follow, so they would wait unseen.

## The conversation

The chat shows:

- your messages and the runtime's replies;
- its tools, as one-line rows;
- a box at the bottom where you write.

The box's frame says whose turn it is and what the agent is doing: *Thinking…*, *Running tool… npm
test*, *Waiting for you* or *Ready*. While the agent works, what you type is kept as a draft until
it is your turn — nothing is sent on its own. What you send shows at once, marked *sending…* until
the runtime has it.

The header shows the mode and whose configuration is in use. For Claude Code and Codex, it also
shows how much of the model's context window is used.

## Permissions and questions

- When the runtime asks for permission during your turn, a dialog opens: **Allow once** or
  **Deny**. If you find a request already waiting, the chat shows it, and you answer with `/allow`
  or `/deny`.
- When the runtime asks a question — Claude Code, OpenCode and Codex can, and so can a Pi
  extension's dialog — it opens the same way, and waits in the chat for `/answer <text>`.
- Questions and approvals also appear in [Attention](../attention/).

## Commands

| Command | Does |
|---|---|
| `Enter` | Send. `\` then `Enter`, or Shift+Enter, adds a line. |
| `/interrupt` or Ctrl+C | Stop the turn, where the runtime supports it. |
| `/allow`, `/deny` | Answer a permission request. |
| `/answer <text>` | Answer a question. |
| `/finish` | End the chat, after asking. Also in the palette and on F1. |
| `/cancel` | Cancel the chat's Run, after asking — for a turn that never answers. |
| `/follow-up` | Start another chat after this one. |
| Ctrl+T | The Run's steps and activity. |

```bash
aqorin conversation create --free-chat --runtime claude-code --permission-mode ask --runtime-config isolated
aqorin conversation send <conversation> "Explain src/index.ts"
aqorin conversation finish <conversation>
```
