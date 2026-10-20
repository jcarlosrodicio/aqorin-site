---
title: Several projects
description: Your list of projects, how a command names one from anywhere, and what a project is to Aqorin.
---

Aqorin keeps a list of your projects — only the ones you add — so a command can name a project from any folder.
Each project keeps its own configuration, Runs, worktrees and history, exactly as if it had its own Aqorin.

```bash
aqorin projects add [<path>] [--name <name>]   # the project at or above the folder (the one you are in by default)
aqorin projects                               # each one with its state
aqorin runs --project tally                   # a project by its name, its id or a path, from any folder
aqorin projects remove tally                  # takes it out of the list; deletes nothing
```

## What a project is

A project is a folder with `.aqorin/aqorin.yaml` (made by `aqorin init`), and **its identity is the folder's real
path**: through a symbolic link, or in another letter case on macOS, it is the same project.

- **A folder you move is a new project.** The old entry says *not found* and keeps its history; moving the folder back
  brings it back.
- **A folder removed and cloned again at the same path** says *changed* until you add it again; then its history
  includes the earlier folder's Runs.
- **A repository cloned twice** is two projects.
- **Your home folder is never a project**, nor anything above it: `aqorin init` refuses it, and a `.aqorin` there is
  ignored.

## The list

Nothing enters the list unless you add it. `aqorin projects add` takes the project at or above the folder you give, by
the folder's name unless `--name` names it (1 to 64 characters, no `/`, not starting with `.`, `~` or `-`, unique
without regard to case; `--name` on a listed project renames it). It refuses a folder that is not in a project (it names `aqorin init --project <folder>`), your home
folder and Aqorin's own folders, and a folder already listed under another path.

`aqorin projects` lists each project with its state:

| State | Means |
|---|---|
| ok | ready to use |
| not found | its folder is gone |
| changed | another folder is at its path |
| not initialized | its `.aqorin/aqorin.yaml` is gone |
| invalid | its configuration does not validate |

**Removing a project deletes nothing** — not its `.aqorin`, its Runs, its worktrees or its branches — and is refused
while one of its Runs is unfinished or being launched: cancel it or let it finish. Adding it again shows its whole
history.

## Naming a project: `--project`

`--project` takes a **path** (anything with `/`, or starting with `.` or `~`: the project at or above it) or the
**name or id** of a project you added.

- A name that is also a folder where you are, of another project, is refused — give the id (`./<name>` means the
  project that holds that folder).
- An empty value is refused, never read as the folder you are in; so is your home folder when no project is there.
- A project whose state is not *ok* is refused for work; its Runs can still be listed, inspected and cancelled by its
  id (`aqorin runs --project <id>`).
- A Run's worker starts in its project's folder, with the paths you typed made absolute: where you launched it from no
  longer matters once it runs.

## Good to know

- The list lives in Aqorin's configuration folder (`projects.yaml`) and describes the data folder it is read with: with
  another `AQORIN_DATA_HOME`, after renaming your user or on another machine, a project shows no Runs.
- Every Run inherits the environment of the process that launched it — your shell's, or the TUI's — and every
  project's delivery uses the one `gh` login: Aqorin loads no per-project environment.
