---
title: Free chat
description: A conversation with one runtime through Aqorin — as it runs in its own terminal, with its permissions in the open.
---

**Free chat** is a conversation with one runtime, through Aqorin. Start one with the first choice
of New task, or with `c` on Runs. Pick a runtime and a model, then decide how it works. For Pi, when
you have set up Pi connections in Runtimes, you first choose **Its connection** — *None* for Pi's own
providers, or one of yours, whose models are then offered with its default first: the chat then runs
isolated on that connection, its key given by name. An OpenCode chat always runs on one of your
OpenCode connections — OpenCode's default first, never *None* — and then one of its models.

Free chats do not wait for each other or for a workflow: several can be open, and a workflow runs
beside them. If a message fails — a provider error — the chat says why in the runtime's words and goes
on: send again, or finish it. If the process that sent a turn ends before it does — the terminal closed,
`aqorin conversation send` killed — the turn reads *Turn failed*, with what it had done, and the next message is taken; the chat is not cancelled. A chat that does not start says why in a
dialog.

## How it works

The last step of the form asks three things.

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

**Effort:** how hard the model reasons, in the runtime's own levels. **Default** leaves it to the runtime.

| Runtime | Levels | The runtime's control |
|---|---|---|
| Claude Code | low, medium, high, xhigh, max | `--effort` |
| Codex | minimal, low, medium, high, xhigh | `model_reasoning_effort` |
| Pi | off, minimal, low, medium, high, xhigh, max | `--thinking` |
| OpenCode | — | its effort is a provider's model variant, and Aqorin's connections declare none |

In the chat, `/effort <level>` (or `/effort`, to pick one; `/effort default`) changes it from your next message
on; the chat's header shows it. It is a request: the model applies what it supports. A Pi chat on *Your
configuration* keeps the level once one is chosen (Pi keeps a session's level, and its default is your settings'):
choose another level instead of Default. So does a Codex chat whose model Codex gives no default effort for: Codex
keeps the last level, and the message is refused (`codex_effort_default_unknown`) — choose a level.

### Per runtime

| Runtime | Ask | Full access | Configuration |
|---|---|---|---|
| Claude Code | Its permission prompts, here | Yes | Isolated or yours |
| Codex | Codex's own default — see below | Yes | Aqorin's own Codex home |
| OpenCode | Its permission prompts, here | Yes | Always isolated, on a connection |
| Pi | — Pi never asks before a tool | Always | Isolated or yours |

In a Codex chat, **Ask** is Codex's own default. Codex's sandbox lets it work in your project
without asking, and it asks before using the network or a path beyond its writable roots. That
sandbox is Codex's: Aqorin requests it and checks that Codex reports it in effect, but does not
enforce it itself. Codex's chat runs in Aqorin's own Codex home, with your sign-in linked, never
copied — never with your configuration.

On macOS, a Claude Code, OpenCode or Pi chat runs in Aqorin's sandbox, whatever its mode: it writes in
your project and outside it, never in the repository's `.git` or `.aqorin`, other Runs' worktrees,
Aqorin's own files, or your keys and settings. A Pi chat on *Your configuration* cannot run in it. See
[Security](../security/).

An OpenCode chat runs in Aqorin's own OpenCode home, on its connection only: never your OpenCode
configuration, its login, a repository's `opencode.json` or the variables your configuration reads. The
connection's key reaches it by name, is never stored, and is hidden from what Aqorin shows and keeps. That home
holds the chat's session while it goes on, and is removed once the chat is over (about 70 MB each) — when you
finish it, or, cancelled, when the next chat in that project is started, followed up or finished; a follow-up starts
its own.
With no OpenCode connection set up, the chat is not started and Aqorin says how to add one. If a message
fails, the error says the provider's reason. A chat started before this version has no connection: start
a new one.

In an OpenCode chat, Aqorin keeps one thing off: OpenCode's subagents (its task tool). Their
requests would come from a session the chat does not follow, so they would wait unseen.

## The conversation

The chat shows:

- your messages, behind a bar on the left, and the runtime's replies;
- its tools, as grey one-line rows with their ✓ or ✗ in colour — five or more in a row show their
  last three under one line for the earlier ones (*✓ 9 earlier tools: shell ×8, apply_patch*; the
  Run's activity, Ctrl+T, lists every one);
- a box at the bottom where you write, its cursor already there.

Everything reads in the order it happened: the reply's text and tools in turn, and an answer you give, or
a message you send into a turn, between the parts of the reply that came before and after it — while
the turn runs too. Where your terminal has colour, a reply's Markdown is formatted — headings, bold and
italics, lists, quotes, code blocks and tables; without colour it is shown as written. A link in a reply reads
as its text and where it points, a path relative to the project (`~` outside it). `aqorin conversation inspect`
lists the messages in the same order.

The box's frame says whose turn it is and what the agent is doing: *Thinking…*, *Running tool… npm
test*, *Waiting for you* or *Ready*. The keys are in the footer; the box names them only when a narrow
footer has no room for them. What you send shows at once, marked *sending…* until
the runtime has it. The reply shows as the model writes it, on every runtime; a line's last word may
wait for the next space, because Aqorin shows text only where no secret can be cut in two.

The header shows the mode and whose configuration is in use. For Claude Code and Codex, it also
shows how much of the model's context window is used.

## Writing while the agent works

- **Enter queues** what you write: it shows below as *queued*, and is sent as the next message once
  the turn ends with a reply — several queued messages go together, in order. If the turn ends
  otherwise (a question waits for you, it failed, you interrupted it), nothing is sent on its own:
  what you queued comes back to the box.
- **Tab sends it now**, into the running turn, where the runtime takes a message while it works:
  Codex, Pi and OpenCode, each at its next step — after the tools under way, before the model writes
  again — never mid-sentence. Claude Code takes none, so its messages queue. If the runtime does not
  take it, or the turn ends first, it is queued instead and the chat says so.
- The queue lives in that window: quitting with something queued tells you it is not sent.

## Permissions and questions

- When the runtime asks for permission during your turn, a dialog opens: **Allow once** or
  **Deny**. If you find a request already waiting, the chat shows it, and you answer with `/allow`
  or `/deny`.
- When the runtime asks a question — Claude Code, OpenCode and Codex can, and so can a Pi
  extension's dialog — it opens the same way, and waits in the chat for `/answer <text>`.
- Questions and approvals also appear in [Attention](../attention/).

## Commands

Type `/` at the start of a message and the chat lists its commands, each with what it does: ↑↓ choose,
**Enter** runs one, **Tab** writes it into your message (to add its text, as `/answer <text>`), Esc closes the
list.

| Command | Does |
|---|---|
| `Enter` | Send — while the agent works, queue it for the next turn. `\` then `Enter`, or Shift+Enter, adds a line. |
| `Tab` | While the agent works, send it now, into the running turn (Codex, Pi, OpenCode). |
| `/interrupt` or Ctrl+C | Stop the turn, where the runtime supports it. |
| `/allow`, `/deny` | Answer a permission request. |
| `/answer <text>` | Answer a question. |
| `/effort <level>` | The model's effort from your next message (`default`: the runtime's). |
| `/finish` | End the chat, after asking, and go back to Runs. Also in the palette and on F1. |
| `/cancel` | Cancel the chat's Run, after asking — for a turn that never answers, which the chat points out; `/follow-up` then continues it. Also *Cancel the chat…* in the footer, the palette and on F1. |
| `/follow-up` | Start another chat after this one. |
| Ctrl+T | The chat's Run: its activity across the width, beside a short card — state, time, tokens and context (where the runtime reports them), runtime, model, and what waits on you. `[` `]` for Flow, Trace and Raw. |

```bash
aqorin conversation create --free-chat --runtime claude-code --permission-mode ask --runtime-config isolated
aqorin conversation send <conversation> "Explain src/index.ts"
aqorin conversation send <conversation> --effort high -- "Now refactor it"
aqorin conversation finish <conversation>
```
