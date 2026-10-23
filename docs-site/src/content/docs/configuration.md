---
title: Configuration
description: The files Aqorin owns — one configuration and one library for every project — what they hold, how a project's old .aqorin/ moves into them, and the environment variables Aqorin reads.
---

Aqorin writes only its own files. It never writes your runtimes' configuration. Everything below is
written by the TUI or the CLI through one writer that keeps your comments and key order. You can
also edit the files by hand.

Your settings and your library are yours, not a project's: every project you add uses the same ones.
A project is a folder in your [list](../projects/): nothing of Aqorin's is written in it, and a `.aqorin/` there is
read only by `aqorin migrate`.

## Where Aqorin keeps its files

| | macOS | Linux |
|---|---|---|
| Configuration and library | `~/Library/Application Support/aqorin/` | `~/.config/aqorin/` (or `$XDG_CONFIG_HOME/aqorin/`) |
| Runs, evidence and tasks | `~/Library/Application Support/aqorin/data/` | `~/.local/share/aqorin/` (or `$XDG_DATA_HOME/aqorin/`) |
| Cache | `~/Library/Caches/aqorin/` | `~/.cache/aqorin/` (or `$XDG_CACHE_HOME/aqorin/`) |

In the configuration folder:

| Path | Holds |
|---|---|
| `config.yaml` | Your configuration (below). |
| `library/agents/<id>.agent.yaml` | Your [agents](../agents/). |
| `library/workflows/<id>.workflow.yaml` | Your [workflows](../workflows/). |
| `library/assignments/<name>.profile.yaml` | Where each step runs: [assignments](../workflows/#assignments-where-each-step-runs). |
| `library/skills/<id>/` | Pinned copies of your [skills](../skills/). |
| `library/mcp/<id>.mcp.yaml` | Your [MCP servers](../mcp/), credentials by reference only. |
| `projects.yaml` | Your list of [projects](../projects/), each with its worktree setup. |

What stays a project's — its Runs, chats, worktrees and [tasks](../new-task/) — is kept in the data folder, under the
project's id, never in the repository. Directories are created `0700`; `config.yaml` is `0600`.

## `config.yaml`

```yaml
kind: aqorin.global_config
schema_version: 2
default_runtime: claude-code
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
workflow_defaults:
  portable-feature-advisory: four-runtimes     # an assignment's name
agent_defaults:
  developer: { connection: nan, model: glm }   # your default execution for a built-in agent
  reviewer: { runtime: codex }
sandbox: off                # only to run without Aqorin's sandbox; said on every Run and Free chat
resources:                  # what every Run gets
  skills:
    - id: house-style
    - id: house-notes
      required: false
  mcp:
    - id: github
```

It holds your default runtime (`aqorin use <runtime>`), your chosen installations (each held by its path and the
SHA-256 of its bytes), your [connections](../connections/) and OpenCode provider key references
([Credentials](../credentials/)), the agents' and workflows' defaults, hidden workflows, the resources every Run gets,
and the sandbox. `aqorin use --global` is still accepted for one release, and is not needed: there is one scope.

Aqorin writes it through **one writer that holds a lock**: two commands changing it at once both keep their change. It
keeps your comments and key order, writes only the keys it changes, and never writes a file it cannot read — the
command is refused and the file left as it is. The first time it writes a file of the previous version
(`schema_version: 1`), it keeps that file beside it as `config.v1.yaml`, so you can go back.

## A project's worktree setup

A new worktree of a workflow has nothing installed. `aqorin projects setup <project> --set npm ci` gives the project
the command Aqorin runs in each new worktree before the first step (an argument list, never a shell line;
`--set -- <command>` when it has flags; `--clear` removes it). It is kept in `projects.yaml`, set only by you, and never
read from the repository.

## Moving a project's `.aqorin/` into your library

Projects set up before this version kept their agents, workflows, assignments, skills, MCP servers, settings and
tasks in their own `.aqorin/`. Aqorin no longer reads them for new work: until a project's are imported, a new Run,
chat or task there is refused (`migration_pending`), Home says so, the library commands say how many projects wait,
and so does `aqorin projects add` when it adds one. What is already running or waiting goes on. A `.aqorin/` that
brings nothing — only settings your `config.yaml` already sets, or `sandbox` and `runtimes`, which are never imported —
waits for nothing: *nothing to import*.

```bash
aqorin migrate                                  # what it would import; writes nothing
aqorin migrate --yes                            # imports it
aqorin migrate --yes --rename agent:critic-api=api-critic --with-setup api
```

**In the app**, Home's first row under the summary is then *Import your configuration*, the cursor on it: **Enter** opens the same preview, one step per
project waiting for it — what it imports and what can act, each conflict's name in a field (empty, it takes the name
the preview gives, said beside it; a name you type is checked as you type it, and refused when taken as you go on), and
its worktree setup, *Not imported* unless you choose *Imported*. Each step plans again; **Import** writes the plan on the
last step, which names every entry imported under a name that is not its own, and **Not now** writes nothing and
leaves the row. A project held (below), or one whose folder is gone, is named there with the command for it.

- **The preview** shows every entry with what can act (an agent's access class, an MCP server's command and the
  secrets it would be given — which variable or keychain item, never a value —, a skill's files), each setting with its
  value, in words, and whether your `config.yaml` already has one, the tasks, and what is skipped (a link, a file or folder that
  cannot be read or does not validate, and a setting that names something skipped). A folder of it (`skills/`, `tasks/`…)
  holding more than 512 files is not read, and said.
- **A conflict** — the same id with other content in two projects, or in a project and your library — keeps the id for
  your library's, then the first project's in your list; the others become `<id>-<project>` (`-2`, `-3` when taken),
  and every reference to them in what is imported is rewritten. `--rename <kind>:<id>=<new>` chooses the name. A
  project's own version of a built-in workflow changed it in that project only: it is imported under its own name, since
  in your library it would change the built-in in every project.
- **Settings** are imported only where your `config.yaml` has none, from the first project that sets them; the
  preview names, for each project whose value differs, the project whose value is imported. `sandbox: off`, a
  runtime's path and Codex's authentication are **never** imported. A project's `worktree_setup` is imported only with
  `--with-setup <project>`; once it is imported, `aqorin projects setup` sets it.
- **Nothing in a repository is written, moved or deleted**: its `.aqorin/` stays until you remove it. A file already
  in your library with the same content is left as it is; one with other content is never written over. A run stopped
  part-way completes when run again; a second run changes nothing. `--project <project>` limits it to one project.
- **`--yes` reads the projects again** and imports what it shows, then prints all of it: run it right after the
  preview, since a `.aqorin/` changed in between is imported as it is then.
- A project whose `.aqorin/` changes after it was imported (a `git pull`, or a Run's agent: the sandbox no longer
  closes `.aqorin/`) waits for nothing, and is imported only when you name it: `aqorin migrate` shows it held, and
  `aqorin migrate --project <project>` previews what changed, imported with `--yes` beside what was under a new name.
  A folder added with nothing to import counts as imported, so a `.aqorin/` written there later is such a change.
  **Not claimed:** in a project listed since before this version with nothing to import, a `.aqorin/` written there
  waits for `aqorin migrate`, and so does that project's new work.
- A Run made before the import resumes and replans as before: its skills and MCP servers come from your library, or,
  when they are not there with the same content, from the repository's `.aqorin/` on a matching hash only — otherwise
  it is refused.

## Environment variables

| Variable | Effect |
|---|---|
| `AQORIN_CONFIG_HOME` | Where the configuration and the library live. |
| `AQORIN_DATA_HOME` | Where Runs, evidence and tasks live. |
| `AQORIN_CACHE_HOME` | Where the cache lives. |
| `NO_COLOR` | No colour. |
| `AQORIN_TUI_ASCII=1` | ASCII glyphs only. |
| `AQORIN_TUI_MOTION=0` | No motion in the status bar. |
| `AQORIN_TUI_BELL=0` | No bell when something starts waiting for you. |

Aqorin refuses to write through a symlinked `AQORIN_CONFIG_HOME` or `AQORIN_DATA_HOME`.

```bash
aqorin config effective     # the configuration in effect, the same in every project
```
