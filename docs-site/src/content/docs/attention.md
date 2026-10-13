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

## Decisions

When a step's runtime fails, the Run waits for you. `r` offers three ways forward, explained in
[Recovery, retry and replan](../recovery/):

- **Retry same assignment**;
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
