---
title: Recovery, retry and replan
description: What happens when a step's runtime fails, and the three ways on — none of them taken on its own.
---

When a step's runtime fails — a missing key, an expired login, a provider down or a model at
capacity, a crash, a timeout — the Run does not guess, whoever chose where it runs. It stops in
**needs a decision** and waits for you in [Attention](../attention/). Aqorin
never switches runtime on its own, and retries on its own only a transient failure (below).

The step says what the runtime answered, in its own last words.

## The three ways on

`r`, on the Run in Attention, offers:

| Choice | When to use it | What happens |
|---|---|---|
| **Retry same assignment** | The cause was outside Aqorin — a missing key, a login — and you fixed it. | Aqorin checks again, as things stand now: the installation, connection, credentials, model, eligibility and resources. If the step still cannot run, the retry is refused. Otherwise a new attempt of the same step runs. |
| **Replan to another runtime/model** | The runtime or model is the problem. | The step's role moves to another runtime, connection and model, with a reason. The new plan is admitted like any other. |
| **Cancel Run** | You are done with it. | The Run ends as cancelled. |

After a decision, `R` resumes the Run. Before one, `R` is the short way to **Retry same assignment**:
it records the retry (its reason, "retried with R in the TUI") and resumes, in one key.

## Retried on its own

A **transient** failure does not wait for you at first. When the runtime's error reads as a rate limit
(429), an overload or a provider's 5xx, or a network fault, and the attempt left your project as it found
it, Aqorin runs the same step again on the same assignment: after 30 s, then after 2 min. The step says
*retrying in N s (1 of 2)* meanwhile; `c` cancels the Run. Each retry counts as an attempt.

Never retried on its own: an authentication, key, quota, billing or model error; Aqorin's own attempt
timeout; an attempt that changed files. After the second retry, or in those cases, the Run waits for a
decision, and the decision says why. No runtime or model is ever changed on its own. Aqorin recognizes
these failures by the runtime's words: a message it does not know waits for you.

A retry is not offered for:

- validation failures;
- review rejections;
- policy or restricted-role refusals;
- integrity failures;
- workflow or schema errors;
- cancellation.

Those are outcomes, not accidents.

:::caution[At least once]
A step that is attempted again starts over. It is not the runtime resuming its old conversation, so
work the failed attempt already did may be done twice.
:::

## Resume

`aqorin resume <run>` — or `R` — continues a Run that was interrupted, or whose decision is
recorded, from where it stopped, on the runtime of its current assignment — the one a replan chose,
if there was one.

## From the CLI

```bash
aqorin replan <run> --role developer --same --reason "Key fixed"
aqorin replan <run> --role developer --runtime codex --model <model> --reason "Pi is down"
aqorin resume <run>
aqorin cancel <run>
```
