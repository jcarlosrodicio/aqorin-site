---
title: The TUI
description: How Aqorin's full-screen terminal interface is laid out, and how it adapts to your terminal.
---

Run `aqorin` anywhere and the TUI opens. It is one app over every project in your list, the same wherever you start
it: the folder you are in only decides which project New task and Free chat offer first (see
[Several projects](../projects/)). `aqorin --plain` gives a line view instead, and `--json` or a pipe give the CLI's
own output.

## The layout

- **The header** shows Aqorin's mark (`◈`, or `<>` in ASCII) and where you are — and, in an open Run or chat, its
  project, its branch and its state. Whether a Run is advisory is said in its details and its Result, not here.
- **The rail** on the left lists the ten sections, Projects last. `0`–`9` jump straight to one.
- **The list** in the middle holds the section's items.
- **The inspector** on the right explains the selected item. It holds that item's actions as
  buttons.
- **The footer** shows the keys of the screen in front of you. `?` opens its full help.
- **The status bar** says which Run is moving and what waits for you. Its glyph turns while a Run
  works.

While the TUI runs, your terminal's title is `◈ aqorin`, and `◈ aqorin · <project>` while a Run or chat of that
project is open. Quitting (`q`, or Ctrl+C) gives the
terminal back the screen it had, and asks it for its previous title (a terminal that keeps no title stack keeps
Aqorin's until your shell sets another).

| Key | Section | What it holds |
|---|---|---|
| `1` | Home | A summary of your setup, then the checklist or the control plane over every project. |
| `2` | Runs | Every Run and chat of every project, in columns: project, number, workflow, state, when it started. `n` starts a new task, `c` a Free chat. |
| `3` | Attention | What waits for you in every project: approvals, questions and decisions, each naming its project. |
| `4` | Agents | The roles a workflow uses: built-in ones, templates and your own. |
| `5` | Workflows | The graphs of steps, and where each step runs. |
| `6` | Runtimes | The four runtimes as found on this machine, and your connections. |
| `7` | Resources | The skills and MCP servers your agents can use. |
| `8` | Credentials | The references to your keys, never a value. |
| `9` | Settings | Your default runtime, the sandbox, appearance, and where Aqorin keeps its files. |
| `0` | Projects | Your projects, each with its state and its Runs working, waiting, failed and finished. `a` adds one, `e` renames it, `x` removes it, `s` sets its worktree setup. |

## Home

Home opens with a summary of your setup, one row each — the runtimes found and your default, your connections, your
library, your projects — and **Enter** on a row opens its section. Under it, while you are not set up or no project
has a Run or chat yet, a **checklist**: a runtime's installation where several were found, your **default runtime**,
a project — in a git repository not in your list, *Add this folder to your projects* (nothing is written in it) — then
*Start a task* (`n`) and *Start a chat* (`c`). After that, the **control plane** over every project: what waits for
you, the Runs working, the chats open, what failed or stopped and the recent Runs, each naming its project. When Aqorin
has something to tell you — for example, that your default runtime runs review and
read-only steps with an advisory restriction — the Status line shows `! 1 notice`; `!` reads it, Esc
folds it.

On the first run, Aqorin's block wordmark leads the screen, behind the same mark.

## Every action is in three places

On a list, every action of the selected item appears three ways:

- as a button in the inspector;
- as a key in the footer;
- as a line in `?`, the help of the screen in front of you.

The **command palette** (`:` or Ctrl+P) lists the same actions, plus every section. An action
that cannot be taken now is greyed out, with the reason.

## Sizes

- **100 columns or more:** the rail, the list and the inspector side by side.
- **80–99 columns:** the list takes the width. `←` shows the rail.
- **Below 80 columns or 24 rows:** one pane at a time.

## Appearance

| Setting | Effect |
|---|---|
| `NO_COLOR=1` | No colour. The mark keeps its glyph. |
| `AQORIN_TUI_ASCII=1` | ASCII glyphs only (also with `TERM=dumb`). |
| `AQORIN_TUI_MOTION=0` | The status bar's glyph keeps still. |
| `AQORIN_TUI_BELL=0` | Silences the bell that rings when a Run or a conversation starts waiting for you. Aqorin checks every two seconds. |

Aqorin uses 256 colours where the terminal says it has them, and 16 otherwise.

Times on screen use your own clock. What Aqorin records stays in UTC, and the Trace's raw level
shows it that way, marked `Z`.

:::note
The mark `◈` is in Menlo. SF Mono and Monaco lack it, so your terminal falls back to another font
to draw it.
:::

Screen readers are not supported in the full-screen TUI. Use `--plain` or `--json` instead.
