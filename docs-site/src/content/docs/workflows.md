---
title: Workflows
description: A workflow says which agents run in which order, which step runs your checks and which one reviews.
---

A **workflow** says:

- which agents run, and in what order;
- which step your checks validate;
- which step reviews the work, and what happens after the review.

A workflow names no runtime and no model. Those belong to an
[assignment](#assignments-where-each-step-runs).

## The built-in `feature` workflow

```text
specify  →  implement  →  review  →  done
               ↑  checks      │
               └── changes ───┘   (up to 3 review cycles)
```

`feature` runs three steps:

1. `specifier` writes the spec.
2. `developer` implements it, and Aqorin validates every attempt.
3. `reviewer` decides: **approved** ends the Run, and **changes needed** sends the work back to
   `implement`.

The Run succeeds only when the review is approved, the checks passed, every approval was resolved
and no budget was exceeded. The engine enforces this, not a prompt.

The Portable Feature templates (`portable-feature-enforced`, `portable-feature-advisory`) add a
research step.

## The Workflows screen (`5`)

The screen reads each workflow top to bottom:

- every step, with its agent, what that agent may do, and where it runs now;
- the review's two outcomes — approved goes to Done, and changes needed goes back, with how many
  rounds remain;
- the step that runs your task's checks.

In the editor:

- The step's inspector says why the step runs where it does.
- **Add step** opens a form: the step's name, then its agent, with each agent's purpose beside the
  list.
- **Rename**, **Move up/down**, **Then…** (where the step goes next) and **Remove** (which asks
  first) are buttons and keys.
- `i` edits the description, `b` sets the review budget, `p` sets the step that runs the checks,
  and `v` sets the review step.
- `s` saves.

Workflows live in `.aqorin/workflows/<id>.workflow.yaml`. You can edit them by hand;
`aqorin workflows validate <id>` says what is wrong, with the line.

## Enforced and advisory

A workflow is **enforced** when Aqorin has validated how its read-only and review steps are
restricted, for that runtime, version and model. Otherwise it is **advisory**, and it says so. An
advisory result is never presented as independently reviewed.

## Assignments: where each step runs

On Workflows, **Where it runs** (`g`) opens an **assignment**. For each step, `Enter` chooses:

1. its runtime, judged against the step's access class;
2. the connection;
3. a model the runtime can be given for that class.

Then:

- `s` saves the assignment to `.aqorin/assignments/<name>.profile.yaml`;
- `p` runs the **preflight** — the plan `aqorin run <workflow> --assign <name> --plan-only` prints;
- `D` makes the assignment the workflow's default.

```yaml
kind: aqorin.profile
schema_version: 2
roles:
  advisory-researcher: { runtime: codex }
  advisory-specifier: { runtime: claude-code }
  developer: { runtime: pi }
  reviewer: { runtime: opencode }
```

### The preflight

Before anything runs, the preflight refuses what cannot be honoured:

- a runtime that cannot enforce a role's restriction;
- a required skill that the runtime cannot load;
- a connection that is not configured.

For example: `Role "developer" cannot run yet. Pi connection "nan" is not configured.`

From a refused launch, `c` takes you to that runtime's configuration, and `a` to the assignment.

### Where a step runs

Aqorin decides in this order, and the step's inspector shows which layer decided:

1. The workflow's explicit assignment, or an explicit `--runtime` / `--model` on the command line.
2. The agent's [default execution](../agents/#default-execution).
3. The project's default runtime.

Aqorin never switches runtime on its own.
