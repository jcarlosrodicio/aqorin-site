---
title: Recovery, retry and replan
description: What happens when a step's runtime fails, and the three ways on — none of them taken on its own.
---

When a step's runtime fails — a missing key, an expired login, a provider down or a model at
capacity, a crash, a timeout — the Run does not guess, whoever chose where it runs. It stops in
**needs a decision** and waits for you in [Attention](../attention/). Aqorin
never switches runtime on its own, and nothing is retried on its own.

The step says what the runtime answered, in its own last words.

## The three ways on

`r`, on the Run in Attention, offers:

| Choice | When to use it | What happens |
|---|---|---|
| **Retry same assignment** | The cause was outside Aqorin — a missing key, a login — and you fixed it. | Aqorin checks again, as things stand now: the installation, connection, credentials, model, eligibility and resources. If the step still cannot run, the retry is refused. Otherwise a new attempt of the same step runs. |
| **Replan to another runtime/model** | The runtime or model is the problem. | The step's role moves to another runtime, connection and model, with a reason. The new plan is admitted like any other. |
| **Cancel Run** | You are done with it. | The Run ends as cancelled. |

After a decision, `R` resumes the Run. Before one, `R` is the short way to **Retry same assignment**:
it records the retry (its reason, "retried with R in the TUI") and resumes, in one key. Nothing is
retried on its own.

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
