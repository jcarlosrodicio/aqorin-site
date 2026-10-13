---
title: Models
description: Where Aqorin's model choices come from, and where each one is made.
---

In Aqorin, a model is always chosen together with a runtime and a connection: in an assignment, or
as an agent's optional default execution. An agent's definition and a workflow name none. An agent
says *what* is done; the assignment, or failing it the default execution, says *where*.

## Where the models come from

- **A runtime's own catalog:** the models the runtime offers through its native connection.
  Runtimes (`6`) shows them, and so does `aqorin runtimes inspect <runtime> --models`.
  - **Claude Code:** the models it offers your sign-in, read from Claude Code itself (no model
    call), by full name — and its aliases (`opus`, `sonnet`…), each saying what it resolves to.
  - **Codex:** your account's catalog, as Codex refreshes it with your sign-in; a model Codex hides
    for your account is not offered.
  - **OpenCode and Pi:** the models of the providers they have keys for.
- **A connection's models:** the ones you discovered, typed or — for Claude Code and Codex — took
  from the runtime's own list. Wherever a model is chosen from such a list (a node, an agent's
  default, a replan, a Free chat), **Another model id…** types one it does not name. Each connection has a default
  model, used when a step names none. See [Connections](../connections/).

## Where you choose one

| Where | What you choose |
|---|---|
| An agent's **default execution** | A runtime, a connection (or the runtime's own) and a model. See [Agents](../agents/). |
| A workflow's **assignment** | For each step: a runtime, then the connection, then a model the runtime can be given for that step's access class. See [Workflows](../workflows/). |
| A **Free chat** | A runtime and a model from its catalog. See [Free chat](../free-chat/). |
| A **replan** | Another runtime, connection and model for a failed step. See [Recovery](../recovery/). |

## Models and restricted roles

A read-only or review step can be given any model. Its restriction is **enforced** only where Aqorin
has validated the mechanism that restricts that role, for that **runtime, version and model** — name
the model in the assignment. With any other model the step still runs, with its restriction
**advisory**: the model picker says `restriction enforced` or `restriction advisory` beside each
model, and the plan says it too. On Claude Code every step of a Run uses one model, so a validated
one serves them all.
Steps that edit files are not restricted in this way. Which runtimes and models are validated:
[Security model](../security/#restricted-roles).

```bash
aqorin eligibility list        # the validation records for this machine
```

## What Aqorin observes

Aqorin records the model it **asked for**. Some runtimes do not report which model actually served
the request. Where Aqorin cannot observe it, it says so rather than assume.
