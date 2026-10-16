---
title: Runs
description: A Run is one durable execution of a workflow — followed live, answered, resumed, and recorded.
---

A **Run** is one execution of a workflow. Its state belongs to Aqorin, not to any runtime session,
so a runtime that crashes does not erase what happened.

## Runs are detached

A Run runs in its own worker. Quitting the TUI, or closing the terminal, leaves it running. Run
`aqorin` again, or `aqorin logs <run> --follow`, to follow it.

## Several workflows at once

The first workflow works in your project folder. One launched while another is still unfinished there
runs in a **git worktree of its own** — outside your repository, in Aqorin's data folder, on a new branch
`aqorin/<task>-<id>` from your last commit. The plan says so before it runs, and says when your folder
has uncommitted changes (they are not in the worktree). Its checks, review and changes are its own, and
Runs marks it `⎇`.

A new worktree has nothing installed. To prepare each one, set `worktree_setup` in
`.aqorin/aqorin.yaml` (see [Configuration](../configuration/)); without it nothing is prepared, and the
plan says so.

At most four workflows run in worktrees at once; a fifth launch is refused and names them.

When such a Run is over, its Result says what became of its worktree, and you decide — nothing happens
on its own, and every decision is recorded on the Run (`aqorin logs <run>` shows it):

| Key | What it does |
|---|---|
| `I` | **Integrate**: its changes are committed on the branch and merged into the branch the worktree was made from. Refused, changing nothing, when your folder is on another branch, has uncommitted changes or a workflow running in it; a conflict merges nothing and names the files. |
| `U` | **Undo** an integration, after asking: a new commit reverts the merge; your history is not rewritten. |
| `K` | **Keep the branch**, for a pull request; the worktree is removed. |
| `X` | **Discard** the worktree and the branch, after asking. |

From the CLI: `aqorin worktree list`, `aqorin worktree integrate|keep|undo <run>`, `aqorin worktree
discard <run> --yes`. `aqorin status`, `runs` and `inspect` say which Runs work in a worktree and what
became of it. A decision that was started and never finished reads *interrupted*; decide again.

A launch stopped before its Run existed can leave a worktree behind. `aqorin worktree list` names it as
recorded by no Run, and `aqorin worktree discard <branch> --yes` removes it.

A worktree keeps each Run's checks, review and changes apart. On macOS, Aqorin's sandbox also keeps its
agents out of your project folder and other Runs' worktrees — see [Security](../security/). With
`sandbox: off`, it is not a wall: an agent can write anywhere you can.

A project that is not a git repository runs one workflow at a time. Free chats never count.

## The Runs screen (`2`)

Every Run and chat of this project is listed with its state and when it started. An open chat reads
*chat open*. `/` filters the list, `n` starts a [new task](../new-task/), and `c` starts a
[Free chat](../free-chat/).

## A Run's view

A Run's view is a dashboard:

- **On the left**, the steps: each one's name with its state's glyph, its state and time to the right,
  which agent runs it and where (agent · runtime), and its attempt past the first. Under them, *Review
  loop 1 of 3* once a review asked for changes, and *Checks* when the task has checks.
- **In the middle**, the selected step's work. One line says what it is doing now — *Thinking…*,
  *Running tool… npm test*, *Waiting for you*. A step that
  failed says why, in its runtime's last words. A step run again with your answer to its questions
  first shows the attempt that asked: what it said, its questions and what you answered. Then come its messages, under who says them — *◆ the agent*, *› you* for your answers, *? Asked* for
  its questions, *◈ Aqorin · verdict* for the verdict a review, verification or check step ends on (its
  decision and findings in words) — each attempt under its own rule, with the agent's bold, `code` and bullets shown as such. The tool calls between two messages are folded into one muted line, with
  their count and any that failed: `t` shows each one. Under them, kept in sight as they scroll: who runs
  the step, with the model the runtime reports, the context it has used where the runtime says it
  (Claude Code's of its window, once the step ends; Pi's and OpenCode's last request) and the tokens it
  has spent, in and out.
- **On the right**, the Run in a few lines, one row each: its state, workflow, task, time, changes,
  handoffs, the Run's **Tokens** (every attempt's in and out, an agent's check's too, as each runtime
  reported them — Claude Code and Codex at the end of each attempt) the working step's **Context** (Codex's runs do not report it) and its **Run id**. `d` shows the selected step's details (its assignment, version and attempts). What
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

The selection follows the step that runs: opening a Run selects it, and when it ends the next one is
selected — unless you moved to another step to read it, which stays selected until you come back to the
one running.

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
- the verification, when the workflow has one — said apart, since it never approves the Run;
- the checks;
- the changes;
- its **assurance**. A Run is *advisory* when its workflow says it is, has no step that runs checks
  or no review step, when the task had no checks, or when a read-only or review step ran with an
  advisory restriction. Otherwise it is *enforced*. An advisory
  success reads "completed — advisory": it is never shown as validated or independently approved.
  The reasons are the notices' (`!`).
  The Result claims the assurance was reached only for a Run that succeeded.

## Commit and pull request

A Run that succeeded with changes offers **Commit and PR…** (`P`) on its Result. The runtime and model of
the Run's review step draft the commit message and the pull request, in one turn in a disposable directory, told
to use no tool.
That turn is given the task, what the steps said, the review and the files changed — not the diff. You see the
plan and the draft — where it is pushed, every file, and any that looks like a key or an environment file —
with whatever reads as a secret redacted from the draft. You can edit the commit message or the pull request,
and confirm; if the tree moved meanwhile, nothing is delivered.

Aqorin then:

- commits every change in the working tree — changes the Run did not make too, which it says before you
  confirm — on a new branch `aqorin/<task>-<id>` that your folder stays on (a Run in its own worktree: on its
  branch);
- pushes it to `origin`;
- opens the pull request with `gh` against the branch it came from, with your git identity and your gh login.

It never merges. For a Run that worked in Aqorin's sandbox no git hook runs; otherwise git runs as it does for
you.

Before anything is drafted it checks that it can deliver: a git repository on a branch, changes to commit, an
`origin` remote with the base branch on it, `gh` installed and logged in (`gh auth login`), and no other
workflow unfinished in the folder. A delivery that stopped — a refused push, say — goes on from where it
stopped when you press `P` again. The Result then says **Delivered**, with
the pull request. From the CLI: `aqorin deliver <run> --draft`, then `aqorin deliver <run> --yes` — or
`--from <draft.json> --yes` with a draft of your own.

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
