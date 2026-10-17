---
title: Trace, Flow, Activity and Raw
description: The developer's view of everything a Run recorded, at four levels of detail — and its workflow drawn.
---

**Trace** (Ctrl+T in a Run) is the developer's view of what was recorded. `[` and `]` switch
between four levels:

| Level | Shows |
|---|---|
| **Activity** | The transcript: messages, tools and turns, as you read them in the Run. |
| **Flow** (also `f` in a Run) | The workflow drawn, centred: each step a box with its agent, its state and its time, coloured by its state; arrows to the next, the end, and each loop back (a review or a verification asking for changes) with how many times it was taken. The step working now pulses; after a handoff a dot travels the arrow it took. Steps that do not fit a row go on to the next, the other way; what cannot be drawn is said in words under it. Nothing moves with `AQORIN_TUI_MOTION=0`. |
| **Trace** | Every recorded entry, with its kind, where it happened and what it says. The selected entry is shown as stored. |
| **Raw** | The records as stored, with their canonical UTC time marked `Z`. |

## Keys

| Key | Does |
|---|---|
| `/` | Search. |
| `n` | Go to the next match. |
| `e` | Go to the next error. |
| `f` | Follow the Run live, or pause. |
| `[` `]` | Switch level. |

Times in Activity and Trace use your own clock. Raw keeps UTC.

## What it does not show

- **A model's private reasoning.** Aqorin records that the model was reasoning, never what it
  reasoned.
- **A runtime's question.** Questions are in the chat and in [Attention](../attention/).
- **Every token.** Streamed text is coalesced into entries.
- **The served model, where the runtime does not report it.** Aqorin says so, rather than assume.

## From the CLI

```bash
aqorin logs <run> --follow             # the Run's events as they happen
aqorin logs <run> --json-events        # the same, one JSON object per line
aqorin inspect <run>                   # the whole recorded Run
```
