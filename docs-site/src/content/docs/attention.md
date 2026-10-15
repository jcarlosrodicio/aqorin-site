---
title: Attention
description: The inbox of what waits for you — approvals, questions and decisions — resolved where you see them.
---

**Attention** (`3`) is an inbox of everything that waits for you, grouped by kind. Each item says
where it is, why it needs you, and which keys resolve it there.

## Human Approvals

An approval shows what is asked, its scope, its risk and its consequence.

- `y` approves, after a confirmation.
- `x` rejects, with an optional reason.

## Questions

When a conversation's runtime asks something, `a` answers it.

When a **workflow step** asks (a step of [Engineering change](../workflows/#a-step-may-ask-you), for
example), the item lists its questions. `a` — here, or in the opened Run, which says *press a to answer* —
offers **Accept** (yes, go ahead), **Reject** (no, go on without it) or **Write an answer…**; the answer is
recorded and the Run resumed: the step runs again with it. From the CLI, `aqorin answer <run> <text>` then
`aqorin resume <run>`.

## Decisions

When a step's runtime fails, the Run waits for you — after up to two automatic retries of a transient
failure (a rate limit, an overload, a network fault; see [Retried on its own](../recovery/#retried-on-its-own)). `R` (**Retry**) retries the step on the same
assignment and resumes the Run, in one key — once you fixed what was wrong, or the provider is back.
`r` (**Replan · Cancel…**) offers three ways forward, explained in
[Recovery, retry and replan](../recovery/):

- **Retry same assignment**, with your own reason;
- **Replan to another runtime/model**;
- **Cancel Run**.

`R` resumes a Run whose decision is already recorded. `Enter` opens the Run.

## You will hear it

The terminal bell rings when a Run or a conversation starts waiting for you; set
`AQORIN_TUI_BELL=0` to silence it. The status bar always says what waits.

```bash
aqorin approvals
aqorin approve <approval-id>
aqorin reject <approval-id> --reason "Not on main"
```
