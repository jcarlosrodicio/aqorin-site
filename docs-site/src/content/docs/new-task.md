---
title: New task
description: One form from a request to a plan, and nothing runs until you press Enter.
---

**New task** (`n` on Runs) is one form, filled in this order:

1. **What to do:** a [Free chat](../free-chat/), or a workflow.
2. **Which workflow, and where it runs.**
3. **What the agents are asked to do:** your request.
4. **Checks (optional):** commands that must pass, such as `npm test`. Aqorin runs them without a
   shell. An unquoted `&&`, `|` or `>` is refused where you type it.

## Checks

- **With checks**, **Plan** writes the task to `.aqorin/tasks/`, named from your request. Aqorin
  runs the checks itself, with your permissions, and only their exit status decides validation.
- **With no checks**, no task file is written. The runtime's own word is the validation, which is
  *advisory*, and the plan says so.

## The plan

The plan shows whether the task can run, and where each step runs. Nothing runs until you press
`Enter`.

- `w` changes where the task runs: a saved assignment, or **New assignment…**, which opens the
  editor for this workflow. Once you save it (`s`), Esc goes back to the plan with it; your task is
  kept.
- When a step cannot run where it is assigned — for example, a connection that is not configured —
  the plan says which agent, why, and where it can run instead. `a` assigns the step there; it asks
  first, then plans again.
- A review or read-only step on a runtime, version or model that no check on this machine covers
  runs anyway, with its restriction **advisory**: the plan says `Ready, advisory`, marks the step
  `advisory`, and names where the restriction would be enforced. The Run's result is advisory. See
  [Security model](../security/#restricted-roles).
- When a runtime's version is new to Aqorin, the plan says so too. `v` validates it with one model
  call, and asks first.

While the summary says why a plan is refused, the plan's full text — what `--plan-only` prints — is
folded; `d` shows it. A refused plan creates no Run. If a task file was written, it is kept for next
time.

Home also warns you ahead of time when your default runtime runs review and read-only steps here
with an advisory restriction, and says which runtime enforces it.

## From the CLI

```bash
aqorin tasks new "Add a --dry-run flag" --check-command "npm test" --check-command "npm run lint"
aqorin run feature --task-file <task file> --plan-only     # the plan, nothing runs
aqorin run feature --task-file <task file>                 # launch
aqorin run feature "Add a --dry-run flag"                  # no checks: advisory
```
