---
title: Runtimes
description: The four runtimes of the Alpha, how Aqorin finds them, and what it can do with each.
---

A runtime is a coding agent you have installed. The Alpha works with four: **Claude Code**,
**Codex**, **OpenCode** and **Pi**. Aqorin finds them and probes what they can do. It never signs
in for you, never reads a credential file and never changes a runtime's configuration.

## The Runtimes screen (`6`)

Each runtime is listed with its version, its status, and the connection and model it runs through.
Your [connections](../connections/) appear beneath it.

The inspector says:

- what Aqorin can do with the runtime: run steps that edit files, and read-only and review steps
  (and if not, why not);
- where it is installed;
- how it signs in;
- its model catalog.

**Details** shows the whole inspection: every capability, and where that knowledge comes from —
verified on this machine, compatible, or unknown.

## Several installations

Sometimes a runtime is installed more than once — for example, two Codex installations, one from
npm and one under another Node version. Aqorin does not guess between them. The runtime shows as
needing a choice, and **Choose installation** (on Home or Runtimes) lists each one by version and
path.

Aqorin records your choice in its own configuration only. Your `PATH`, your links and the runtime's
configuration stay as they are. From then on, Aqorin uses exactly that installation.

If the chosen installation disappears, or the file at that path changes, Aqorin asks you again
rather than pick another. An update usually replaces the file; an update that leaves it
byte-identical is not noticed. On a working choice, **Change installation** changes it.

```bash
aqorin runtimes                                 # the inventory
aqorin runtimes inspect codex --models          # one runtime, with its models
aqorin runtimes select codex /path/to/codex     # choose the installation
```

## The default runtime

The project's **default runtime** is where a workflow step runs when nothing else says where. You
choose it on Home's checklist or in Settings (`9`); `aqorin use <runtime>` does the same.
[Where a step runs](../workflows/#where-a-step-runs) explains the order in which Aqorin decides.

## Validate

**Validate** (`v`) checks that Aqorin can run the runtime on this machine, with one real model call.
It is the same check as `aqorin doctor --live`. Before the call, it says:

- what the call goes through;
- that nothing of the runtime's own configuration changes;
- that your provider may bill the call.

**Cancel** calls nothing. On a Pi connection, Validate checks Pi through that connection. On a
runtime that has connections, Validate first asks which way: its own configuration, or one of the
connections — its own default may be the one route whose key does not work.

A runtime version new to Aqorin is flagged, and Home lists it under **Still to do**. Validate it
before you rely on it. If the check ends in the provider's error, nothing is recorded: validate it
through a connection whose key works — or, if it went through one, check that connection's key and
default model.

## How each runtime runs under Aqorin

| Runtime | In a workflow step |
|---|---|
| Claude Code | Headless, under an isolated profile: none of your settings, plugins or MCP servers. The skills and MCP servers you give an agent in Aqorin are added. |
| Codex | In Aqorin's own Codex home, signed in with your login or an API key by reference. |
| OpenCode | Isolated, without your plugins. Provider keys come by reference ([Credentials](../credentials/)). |
| Pi | Isolated, without your extensions. A provider you reach through an extension needs a [connection](../connections/). |

A [Free chat](../free-chat/) can instead run with your own configuration, if you choose that when
you create it.
