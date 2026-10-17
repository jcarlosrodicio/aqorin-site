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

## The built-in workflows

Aqorin ships a library of workflows for everyday development. None names a runtime, a connection or a
model: each step runs where its assignment, its agent's default or the project's default runtime
says.

| Workflow | Flow | Use it for |
| --- | --- | --- |
| **Engineering change** (`engineering-change`) | Research → Plan → Implement → Verify → Review → Docs | a feature or a substantial change, done the way the project says changes are done. New task offers it first. |
| **Quick change** (`quick-change`) | Implement → Review | a small, clear change |
| **Bug fix** (`bug-fix`) | Diagnose → Implement → Verify → Review | a defect to reproduce, fix and prove fixed |
| **Investigate** (`investigate`) | Investigate | a question about the code, answered with a report; its agent is told to change nothing (it can run commands, so that is not enforced) |
| **Code review** (`code-review`) | Review | a report on the current changes; it approves nothing, and its agent is told to change nothing (not enforced) |
| **Docs change** (`docs-change`) | Docs → Review | documentation only |

### Engineering change

```text
research → plan → implement → verify → review → docs → done
                     ↑  checks   │         │
                     └─ changes ─┴─────────┘   (up to 3 rounds each)
```

1. `researcher` reads the request and the project — its instructions first.
2. `planner` writes the plan, and the planning documents the project requires (OpenSpec, for
   example) — only where the project asks for them.
3. `developer` implements it; your task's checks run after this step.
4. `verifier` runs the project's own verification and exercises the change: **passed** goes on,
   **needs changes** sends the work back to `implement` with its findings.
5. `reviewer` judges it independently: **approved** goes on, **changes needed** goes back.
6. `documenter` updates the documentation and hands the result over. It runs after the approval: what
   it writes is checked by your task's checks, not by the review.

### They follow your project

Their agents read the project's instructions first — `AGENTS.md` or its equivalent, a harness,
OpenSpec when the project uses it — and follow them. Where the project has none, nothing is
invented.

### A step may ask you

When the request leaves something only you can decide, a step (Research, Plan, Diagnose…) ends on its
questions instead of guessing, each with the answers it proposes when it can. The Run waits in
[Attention](../attention/): `a` asks them one at a time — pick an answer or write your own — and the step
runs again with your answers. Every later step of the Run is given them too, as your decisions for the
Run: the verification and the review judge the work by what you answered, not only by the request —
whatever runtime each runs on, so an answer is no place for a key or a password. From the CLI:

```bash
aqorin answer <run> "Decimals too; keep the old API."
aqorin answer <run> -- "-5 to 5"      # an answer that starts with a dash
aqorin resume <run>
```

### Verify, checks and review are three things

- **Your checks** — the task's commands, such as `npm test` — run after the step marked for them
  (Implement), in every workflow. Aqorin runs them; they decide whether the step's work passes.
- **Verify** is a step. Its agent runs the project's own verification and exercises the change, then
  decides *passed* or *needs changes*, with its own budget of rounds. It may run commands, so it
  could change files: that it does not is an instruction, said on the plan, not enforced — which
  is why your checks run again after it, before the review.
- **Review** is the independent judgement afterwards, and the only one that approves the Run.

The agent's check (`--agent-check`) is separate again, and off by default.

### `feature` and the templates

`feature` (specify → implement → review) and the Portable Feature templates
(`portable-feature-enforced`, `portable-feature-advisory`, which add a research step) stay, marked
**advanced**.

The Run succeeds only when the review is approved (or, in a workflow without one, its checks
passed), every approval was resolved and no budget was exceeded. The engine enforces this, not a
prompt.

## The Workflows screen (`5`)

The list names each workflow with its steps, its assurance and where it comes from: **built-in**
(shipped with Aqorin), **project** (a file in `.aqorin/workflows/`) or **advanced**. A built-in's
inspector starts with what it is for, its flow and its agents.

- **Edit (your copy)** (`e`) writes it into this project under its own name. That copy replaces the built-in
  here and is yours to change; deleting it brings the built-in back.
- **Hide…** (`x`) takes a built-in off this project's lists (it still runs when named); **Restore hidden…**
  (`h`) lists it again.
- **Duplicate…** (`d`) copies it under a name not taken. `feature`, kept for compatibility, is copied with
  **Customize…** (`d`).

From the CLI: `aqorin workflows override <id>`, `aqorin workflows delete <id>` (a built-in: hidden) and
`aqorin workflows restore <id>`.

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
- `i` edits the description, `b` sets the review budget (and the verification rounds, when a step
  verifies), `p` sets the step that runs the checks,
  and `v` sets the review step.
- `s` saves.

Workflows live in `.aqorin/workflows/<id>.workflow.yaml`. You can edit them by hand;
`aqorin workflows validate <id>` says what is wrong, with the line.

## Enforced and advisory

A workflow is **enforced** when Aqorin has validated how its read-only and review steps are
restricted, for that runtime, version and model. Otherwise it is **advisory**, and it says so. An
advisory result is never presented as independently reviewed.

Any step can run on any runtime. A read-only or review step on a runtime, version or model no check
covers still runs — with its runtime's read-only setting, told not to write or run commands — and
its restriction is **advisory**: the plan marks the step `advisory`, and the Run's result is
advisory. See [Security model](../security/#restricted-roles).

## Assignments: where each step runs

On Workflows, **Where it runs** (`g`) opens an **assignment**. For each step, `Enter` chooses:

1. its runtime, judged against the step's access class (`restriction enforced` or
   `restriction advisory` for a read-only or review step);
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
