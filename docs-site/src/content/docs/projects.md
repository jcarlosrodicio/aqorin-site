---
title: Several projects
description: Your list of projects, how a command names one from anywhere, and what a project is to Aqorin.
---

**One Aqorin. Multiple projects. Independent workflows.** One Aqorin — one TUI, one CLI — follows every project you
add: Runs of several projects work at once, each on its own runtime and in its own repository, and each project keeps
its own Runs, worktrees, sandbox and pull requests. Accepted live with Claude Code, Codex, OpenCode and Pi on macOS 27
(Apple silicon; Pi there on a connection of Aqorin's) and on Ubuntu 26.04 (x86_64), on macOS after a reboot too. It is on `master`, not yet in a published version.

Aqorin keeps a list of your projects — only the ones you add — so a command can name a project from any folder.
Each project keeps its own configuration, Runs, worktrees and history, exactly as if it had its own Aqorin.

```bash
aqorin projects add [<path>] [--name <name>]   # the project at or above the folder (the one you are in by default)
aqorin projects                               # each one with its state and what its Runs are doing
aqorin runs --project tally                   # a project by its name, its id or a path, from any folder
aqorin projects remove tally                  # takes it out of the list; deletes nothing
```

## What a project is

A project is a folder with `.aqorin/aqorin.yaml` (made by `aqorin init`), and **its identity is the folder's real
path**: through a symbolic link, or in another letter case on macOS, it is the same project.

- **A folder you move is a new project.** `aqorin projects add` at its new path adds it as one; the old entry says
  *not found* and keeps its history, and moving the folder back brings it back.
- **A folder removed and cloned again at the same path** says *changed* until you add it again (on Linux it may read
  *ok* at once, when the new folder gets the old one's inode); either way its history includes the earlier folder's
  Runs.
- **A repository cloned twice** is two projects.
- **Your home folder is never a project**, nor anything above it: `aqorin init` refuses it, and a `.aqorin` there is
  ignored. `aqorin run`, `feature` and `conversation create` are refused there, and in any folder that is no project
  but holds one of your projects: a Run there would write in them as its own folder. Run it in a project — `cd` into it
  or give `--project <name>`.

## The list

Nothing enters the list unless you add it. `aqorin projects add` takes the project at or above the folder you give, by
the folder's name unless `--name` names it (1 to 64 characters, no `/`, not starting with `.`, `~` or `-`, unique
without regard to case; `--name` on a listed project renames it). It refuses a folder that is not in a project (it names `aqorin init --project <folder>`), your home
folder and Aqorin's own folders, a folder already listed under another path, and a path holding a line break (no
sandbox can name it).

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

## What each project is doing

`aqorin projects` reads each project's record without changing it and says, per project, how many Runs are
working, waiting for you, failed or blocked, finished, and its chats; what waits for you, with the command that
answers it (`--project <name>` included); and its working and failed Runs and its three newest finished. A record it
cannot read — damaged, or written by a newer Aqorin — says *unreadable*; the other projects are still listed.
`--json` gives the same.

## Global: every project in the TUI

`aqorin` opens the project you are in, as before; in a git repository with no project yet, its Setup; anywhere else —
your home folder included — **Global**. In a project, `0` (or `Esc` at its top level) shows Global; the rail has it
above Home.

- Global lists **what waits for you first, across projects**, each item naming its project; then the Runs working,
  waiting, failed or blocked and finished recently (the three newest per project); then each project with its counts,
  or its state and what to do.
- The project you opened the TUI in, when it is not in your list, is marked *not added*: `a` adds it. With no project
  in the list, Global says how to add one.
- **`Enter`** opens the item in its own project. A Run of the project you are in opens there; a Run or a project of
  another closes this project's screens and opens that project's — `Esc` and `0` come back to Global. Every action
  there acts on that project only.
- Before you leave the project, Aqorin says what is held there: a chat turn it is sending goes on to its end, unseen
  until you come back (quitting Aqorin before it ends says so first); a message queued for it is not sent; a chat message you have not sent is lost. The same key
  again leaves.
- **`n`** in Global asks the project first, then opens New task there.
- A project that is not *ok* is not opened: its row says what to do, and Global says why if it stopped being *ok* since
  it was read. Global reads each project without changing it,
  and only while it is shown.

## Kept apart

- A Run or a chat in Aqorin's sandbox cannot write your other projects (see [Security](../security/)) — except one
  you added inside its own folder, which is part of what it works on.
- A delivery commits only its project's folder, never a project you added inside it, and opens the pull request in
  the repository its `origin` names.
- `GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_*`, `GH_REPO` and the other variables that point git or `gh` at another
  repository are removed before Aqorin runs anything; your git identity, SSH and `gh` login are kept.

## Good to know

- The list lives in Aqorin's configuration folder (`projects.yaml`) and describes the data folder it is read with: with
  another `AQORIN_DATA_HOME`, after renaming your user or on another machine, a project shows no Runs.
- Every Run inherits the environment of the process that launched it — your shell's, or the TUI's — and every
  project's delivery uses the one `gh` login: Aqorin loads no per-project environment.
