---
title: New task
description: One form from a request to a plan, and nothing runs until you press Enter.
---

**New task** (`n` on Runs) is one form, filled in this order:

1. **What to do:** a [Free chat](../free-chat/), or a workflow.
2. **Which workflow, and where it runs.** Each is offered by name with its flow and what it is for;
   [Engineering change](../workflows/#the-built-in-workflows) comes first.
3. **What the agents are asked to do:** your request.
4. **Checked by:** **Nothing** (the default), **Commands**, **The agent**, or **Commands and the
   agent**. The command fields appear only with commands: each must pass, such as `npm test`, and
   runs without a shell — an unquoted `&&`, `|` or `>` is refused where you type it.

## Checks

- **With checks**, **Plan** writes the task to `.aqorin/tasks/`, named from your request. Aqorin
  runs the checks itself, with your permissions, and only their exit status decides validation.
- **With no checks**, no task file is written. Nothing checks the work: the step moves on at once,
  its checks read *not checked*, and the Run is *advisory*. The plan says so.
- **The agent** (off by default) asks the step's runtime to check the work too, after the step. The
  runtime chooses what to run (tests, linters…), which can take a while, and its verdict is
  *advisory*: your commands, when you declared some, decide. To have an agent test the work as a
  step of its own, use a workflow with a **Verify** step, such as
  [Engineering change](../workflows/#verify-checks-and-review-are-three-things).

## The plan

The plan is one pane: whether the task can run, the task and who checks it, and the flow — each step,
its agent, and the runtime, connection and model it runs on. `d` puts its full text in its place
(what `--plan-only` prints), and `!` the **notices**: what Aqorin wants you to know about it — a role
only told to read, a runtime version not verified yet, work nothing checks — said only when you ask. A
step that may run commands (Claude Code's Bash) is said on the plan itself. Nothing runs until you press
`Enter`.

- `w` changes where the task runs: a saved assignment, or **New assignment…**, which opens the
  editor for this workflow. Once you save it (`s`), Esc goes back to the plan with it; your task is
  kept.
- When a step cannot run where it is assigned — for example, a connection that is not configured —
  the plan says which agent, why, and where it can run instead. `a` assigns the step there; it asks
  first, then plans again.
- A review or read-only step on a runtime, version or model that no check on this machine covers
  runs anyway, with its restriction **advisory**; the notices (`!`) say which steps and where the
  restriction would be enforced. The Run's result is advisory. See
  [Security model](../security/#restricted-roles).
- When a runtime's version is a new major to Aqorin (Pi 0.x → 1.x, say), the plan says so too. It
  still runs: its first step checks what only a real run shows, and once a step completes on it,
  it is recorded as verified. `v` checks it now instead, with one model call, and asks first.

A refused plan says why in its summary, and creates no Run. If a task file was written, it is kept for next
time.

Home also warns you ahead of time when your default runtime runs review and read-only steps here
with an advisory restriction, and says which runtime enforces it.

## From the CLI

```bash
aqorin tasks new "Add a --dry-run flag" --check-command "npm test" --check-command "npm run lint"
aqorin run feature --task-file <task file> --plan-only     # the plan, nothing runs
aqorin run feature --task-file <task file>                 # launch
aqorin run feature "Add a --dry-run flag"                  # no checks: advisory
aqorin run feature "Add a --dry-run flag" --agent-check    # the step's runtime checks the work
```
