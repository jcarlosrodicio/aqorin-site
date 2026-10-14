---
title: Runs
description: A Run is one durable execution of a workflow — followed live, answered, resumed, and recorded.
---

A **Run** is one execution of a workflow. Its state belongs to Aqorin, not to any runtime session,
so a runtime that crashes does not erase what happened.

## Runs are detached

A Run runs in its own worker. Quitting the TUI, or closing the terminal, leaves it running. Run
`aqorin` again, or `aqorin logs <run> --follow`, to follow it.

There is **one Run at a time per working tree**. A new Run or chat is refused while another is
unfinished.

## The Runs screen (`2`)

Every Run and chat of this project is listed with its state and when it started. An open chat reads
*chat open*. `/` filters the list, `n` starts a [new task](../new-task/), and `c` starts a
[Free chat](../free-chat/).

## A Run's view

A Run's view is a dashboard:

- **On the left**, the steps: each one's state, its time, which agent runs it and where (agent ·
  runtime), and its attempt.
- **In the middle**, the selected step's work. One line says what it is doing now — *Thinking…*,
  *Running tool… npm test*, *Waiting for you* — and the next who runs it, with the model the runtime
  reports, the context it has used where the runtime says it (Claude Code's of its window, once the
  step ends; Pi's and OpenCode's last request) and the tokens it has spent, in and out. A step that
  failed says why, in its runtime's last words. Then come its messages. The tool calls between two messages are folded into one muted line, with
  their count and any that failed: `t` shows each one.
- **On the right**, the Run in a few lines: its state, workflow and assurance, task, time, changes
  and handoffs. `d` shows the selected step's details (its assignment, version and attempts). What
  Aqorin wants you to know — why the Run is advisory, what a runtime version says of its flags — is
  not repeated there: `!` shows the **notices** in its place. What failed and what waits for you
  always shows.

After a step whose work is checked, the steps show **checking** until the checks report: Aqorin runs
the task's checks — after the step's runtime checks the work (advisory), when the task asked for the
[agent's check](../new-task/#checks). With no check and no agent's check, nothing runs: the step
moves on and its checks read *not checked*.
The next step waits for them, so a reviewer that has not started yet is usually waiting on these
checks. Meanwhile the step's work shows what the checks are doing — the runtime's messages and tool
calls, then each of the task's checks as it runs — and, once they report, keeps them under
**Checks**.

`Tab` to the steps, then `↑` `↓` picks one. `y` sends the selected step's messages to your
terminal's clipboard, where the terminal allows it (it cannot confirm it). A mouse selection takes
whole lines across every pane: `z` shows the focused pane alone, so it takes only that pane's lines,
and `z` again shows them all.
`c` `c` cancels the Run. Ctrl+T opens the [Trace](../trace/).

## The result

A finished Run opens on its **Result** — one you follow to its end moves there by itself — which
shows:

- how it ended, and why;
- the review;
- the checks;
- the changes;
- its **assurance**. A Run is *advisory* when its workflow says it is, has no step that runs checks
  or no review step, when the task had no checks, or when a read-only or review step ran with an
  advisory restriction. Otherwise it is *enforced*. An advisory
  success reads "completed — advisory": it is never shown as validated or independently approved.
  The reasons are the notices' (`!`).
  The Result claims the assurance was reached only for a Run that succeeded.

## From the CLI

```bash
aqorin runs
aqorin status <run>
aqorin inspect <run>
aqorin logs <run> --follow [--json-events]
aqorin cancel <run>
aqorin resume <run>
```

Ctrl+C on a CLI Run interrupts it at its next step boundary, and it can be resumed. A second Ctrl+C
stops waiting, but the interruption still happens.
