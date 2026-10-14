---
title: The TUI
description: How Aqorin's full-screen terminal interface is laid out, and how it adapts to your terminal.
---

Run `aqorin` in a project and the TUI opens. `aqorin --plain` gives a line view instead, and
`--json` or a pipe give the CLI's own output.

## The layout

- **The header** shows Aqorin's mark (`◈`, or `<>` in ASCII), where you are and the project.
- **The rail** on the left lists the nine sections. `1`–`9` jump straight to one.
- **The list** in the middle holds the section's items.
- **The inspector** on the right explains the selected item. It holds that item's actions as
  buttons.
- **The footer** shows the keys of the screen in front of you. `?` opens its full help.
- **The status bar** says which Run is moving and what waits for you. Its glyph turns while a Run
  works.

| Key | Section | What it holds |
|---|---|---|
| `1` | Home | The first-run checklist, then the control plane. |
| `2` | Runs | Every Run and chat of this project. `n` starts a new task, `c` a Free chat. |
| `3` | Attention | What waits for you: approvals, questions and decisions. |
| `4` | Agents | The roles a workflow uses: built-in ones, templates and your own. |
| `5` | Workflows | The graphs of steps, and where each step runs. |
| `6` | Runtimes | The four runtimes as found on this machine, and your connections. |
| `7` | Resources | The skills and MCP servers your agents can use. |
| `8` | Credentials | The references to your keys, never a value. |
| `9` | Settings | The project's set-up, its default runtime, appearance, and where Aqorin keeps its files. |

## Home

Until the project is ready to run, Home is a checklist. Once it is ready, Home is the control
plane: the four runtimes, the Run that is moving, what waits for you and the recent Runs. When Aqorin
has something to tell you about the project — for example, that your default runtime runs review and
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
