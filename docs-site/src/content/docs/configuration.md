---
title: Configuration
description: The files Aqorin owns — per project and global — what they hold, and the environment variables it reads.
---

Aqorin writes only its own files. It never writes your runtimes' configuration. Everything below is
written by the TUI or the CLI through one writer that keeps your comments and key order. You can
also edit the files by hand.

## In a project: `.aqorin/`

| Path | Holds |
|---|---|
| `.aqorin/aqorin.yaml` | The project's configuration (below). |
| `.aqorin/agents/<id>.agent.yaml` | Your [agents](../agents/). |
| `.aqorin/workflows/<id>.workflow.yaml` | Your [workflows](../workflows/). |
| `.aqorin/assignments/<name>.profile.yaml` | Where each step runs: [assignments](../workflows/#assignments-where-each-step-runs). |
| `.aqorin/tasks/` | Tasks with their checks, written by [New task](../new-task/). |
| `.aqorin/skills/<id>/` | Pinned copies of your [skills](../skills/). |
| `.aqorin/mcp/<id>.mcp.yaml` | Your [MCP servers](../mcp/), credentials by reference only. |

`aqorin init` (or Home's checklist) creates `.aqorin/`. Directories are created `0700` and files
`0600`.

```yaml
kind: aqorin.project_config
schema_version: 1
default_runtime: claude-code
workflow_defaults:
  portable-feature-advisory: four-runtimes     # an assignment's name
agent_defaults:
  developer: { connection: nan, model: glm }   # your default execution for a built-in agent
  reviewer: { runtime: codex }
worktree_setup: [npm, ci]   # run in each new worktree of a workflow (an argv, no shell)
resources:
  skills:
    - id: house-style
    - id: house-notes
      required: false
  mcp:
    - id: github
```

## Global

| | macOS |
|---|---|
| Configuration | `~/Library/Application Support/aqorin/config.yaml` |
| Runs and evidence | `~/Library/Application Support/aqorin/data/` |
| Cache | `~/Library/Caches/aqorin/` |

The global configuration holds:

- the global default runtime (`aqorin use <runtime> --global`);
- your chosen installations, each held by its path and the SHA-256 of its bytes;
- your [connections](../connections/);
- your OpenCode provider key references ([Credentials](../credentials/)).

The project's configuration always wins over the global one.

```yaml
kind: aqorin.global_config
schema_version: 1
default_runtime: pi
runtimes:
  codex:
    selection:
      path: /Users/me/.local/bin/codex
      sha256: 61b0194f…
connections:
  - id: nan
    runtime: pi
    auth: credential_ref
    provider: openai_compatible
    base_url: https://api.example.com/v1
    credential_ref: { env: EXAMPLE_API_KEY }
    default_model: some-model
```

## Environment variables

| Variable | Effect |
|---|---|
| `AQORIN_CONFIG_HOME` | Where the global configuration lives. |
| `AQORIN_DATA_HOME` | Where Runs and evidence live. |
| `AQORIN_CACHE_HOME` | Where the cache lives. |
| `NO_COLOR` | No colour. |
| `AQORIN_TUI_ASCII=1` | ASCII glyphs only. |
| `AQORIN_TUI_MOTION=0` | No motion in the status bar. |
| `AQORIN_TUI_BELL=0` | No bell when something starts waiting for you. |

Aqorin refuses to write through a symlinked `AQORIN_CONFIG_HOME` or `AQORIN_DATA_HOME`.

```bash
aqorin config effective     # the configuration in effect here
```
