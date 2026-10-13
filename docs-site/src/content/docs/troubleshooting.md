---
title: Troubleshooting
description: The situations you are most likely to meet, what Aqorin says, and what to do.
---

Start with `aqorin doctor`. It runs read-only checks, including every runtime's installation. Most
refusals name the next step, in the TUI and in `--json` (`safe_next`).

## A runtime is not found

The runtime is not on your `PATH`, or the path Aqorin knows is gone. Install the runtime, or point
Aqorin at it:

```bash
aqorin runtimes                          # what Aqorin sees
aqorin runtimes select pi /path/to/pi    # choose an installation
```

## Several installations, or a choice to make again

Aqorin found more than one installation, or the one you chose changed or disappeared. It does not
guess. Use **Choose installation** on Home or Runtimes, or `aqorin runtimes select`. See
[Runtimes](../runtimes/#several-installations).

## A key is not set

A connection, an OpenCode provider or an MCP server names a key that does not resolve now. The
inspector says which one, by name. Set the variable in the environment Aqorin runs in, or fix the
keychain item, then check again on [Credentials](../credentials/) (`8`).

If a Run failed because of it, fix the key, then **Retry same assignment**. See
[Recovery](../recovery/).

## The plan is refused

The plan says who cannot run where, and why. The common causes:

- **Aqorin was opened inside its own repository.** A workflow never runs on Aqorin's own repository,
  on a folder inside it, or at, inside or around a protected folder. Open Aqorin in the project you want it to work on (`cd` there, then
  `aqorin`).
- **A connection that is not configured.** `c` opens the runtime's configuration.
- **A required skill or MCP server the runtime cannot load.** Make it optional, or assign the step
  elsewhere.
- **A runtime version Aqorin cannot check at all** (its help cannot be read). `v` validates it, with
  one model call. A new major whose help lists what Aqorin needs is not refused: it runs, and its
  first step checks it.
- **A resume after a runtime update.** A Run planned with a step's restriction enforced is not
  resumed on a version no check covers. Refresh the check (`aqorin eligibility refresh <runtime>`),
  or start a new Run.

## The plan says a step is advisory

A read-only or review step on a runtime, version or model no check on this machine covers runs
anyway, with its restriction **advisory**: it is told not to write or run commands, with its runtime's
read-only setting, and nothing shows it held to that. The Run's result is advisory. To have the
restriction enforced, assign the step to a validated runtime and model — the plan names them. See
[Security model](../security/#restricted-roles).

## The next step does not start

After a step whose work is checked, the Run runs its checks before moving on, and the steps show
**checking**. With checks in the task, Aqorin runs them; with none, the step's runtime checks the work
itself — running the project's tests can take minutes. The next step (the reviewer, say) starts when
they report. See [Runs](../runs/#a-runs-view).

## One Run at a time

There is one Run at a time per working tree. Finish, cancel or resume the open Run (`2` Runs). A
Run whose driver died is shown as **stale**. Open it, then resume or cancel it.

## The state store is newer than this Aqorin

A newer Aqorin wrote the state store. Upgrade Aqorin; an older binary refuses to open it rather
than damage it.

## The mark looks different

The mark `◈` is in Menlo. With a terminal font that lacks it, the fallback font may draw it
differently. Use Menlo, or set `AQORIN_TUI_ASCII=1`.

## Exit codes

| Code | Meaning |
|---:|---|
| 0 | Success. |
| 1 | Generic or internal failure. |
| 2 | CLI usage or invalid input. |
| 3 | Configuration conflict or a selection required, including a Run that needs a decision. |
| 4 | Runtime missing or incompatible. |
| 5 | Capability or policy requirement not met. |
| 6 | Validation failed. |
| 7 | Review not approved; changes required. |
| 8 | Human Approval required. |
| 9 | Interrupted, or a resumable incomplete Run. |
| 10 | Cancelled. |
| 11 | State, migration or recovery failure. |
