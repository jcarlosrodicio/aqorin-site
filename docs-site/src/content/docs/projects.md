---
title: Several projects
description: Your list of projects, how a command names one from anywhere, and what a project is to Aqorin.
---

**One Aqorin. Multiple projects. Independent workflows.** One Aqorin — one TUI, one CLI — follows every project you
add: Runs of several projects work at once, each on its own runtime and in its own repository, and each project keeps
its own Runs, worktrees, sandbox and pull requests. Accepted live with Claude Code, Codex, OpenCode and Pi on macOS 27
(Apple silicon; Pi there on a connection of Aqorin's) and on Ubuntu 26.04 (x86_64), on macOS after a reboot too. It is on `master`, not yet in a published version.

Aqorin keeps a list of your projects — only the ones you add — so a command can name a project from any folder.
Each project keeps its own Runs, chats, tasks, worktrees and history, exactly as if it had its own Aqorin; your
[configuration and library](../configuration/) are one, the same in every project.

```bash
aqorin projects add [<path>] [--name <name>]   # the folder (the one you are in by default); writes nothing in it
aqorin projects                               # each one with its state and what its Runs are doing
aqorin runs --project tally                   # a project by its name, its id or a path, from any folder
aqorin projects remove tally                  # takes it out of the list; deletes nothing
aqorin projects setup tally --set npm ci      # how its new worktrees are prepared (--clear removes it)
aqorin migrate                                # projects' old .aqorin/ into your library: a preview, then --yes
```

## What a project is

A project is a folder in your list — added with `aqorin projects add`, which writes nothing in it — and **its identity
is the folder's real path**: through a symbolic link, or in another letter case on macOS, it is the same project. A
`.aqorin/` in a repository makes no project; only `aqorin migrate` reads it.

- **A folder you move is a new project.** `aqorin projects add` at its new path adds it as one; the old entry says
  *not found* and keeps its history, and moving the folder back brings it back.
- **A folder removed and cloned again at the same path** says *changed* until you add it again (on Linux it may read
  *ok* at once, when the new folder gets the old one's inode); either way its history includes the earlier folder's
  Runs.
- **A repository cloned twice** is two projects.
- **A folder that is not a git repository** is a project too, and takes Free chats only: a workflow there (New task,
  `aqorin run`, `feature`) is refused (`project_not_git`), since its worktrees and its delivery need git. The git
  repositories such a folder holds are named when you add it: they become its folders, never projects of their own.
  On Linux, the first sandboxed chat there makes an empty `.git` in it, which closes it to the agent (git ignores an
  empty `.git`, and so does Aqorin).
- **Your home folder is never a project**, nor anything above it: `aqorin projects add` and `aqorin init` refuse it.
  A project's command run there, or in any folder in none of your projects, is refused (`project_required`). Run it
  in a project — `cd` into it or give `--project <name>`.

## The list

Nothing enters the list unless you add it, and nothing is added by itself. `aqorin projects add` takes the folder you
give — the one you are in by default — and writes nothing in it: a folder in one of your projects is that project; a
folder in a git repository adds the repository's top level; any other folder is added as it is, and is not git. It is
named by the folder's name unless `--name` names it (1 to 64 characters, no `/`, not starting with `.`, `~` or `-`,
unique without regard to case; `--name` on a listed project renames it). It refuses your home folder and above,
Aqorin's own folders, a folder already listed under another path, a folder — or one whose repository — holds one of
your projects (`project_nested`), and a path holding a line break (no sandbox can name it).

`aqorin init` is `aqorin projects add` for the folder you are in (or `--project <path>`), and says so. When you have
no default runtime it also sets one — `--runtime`, or chosen in a terminal; with neither, it adds the folder and names
`aqorin use <runtime>`. An `init` refused — an unknown runtime, a path that is not there — adds nothing.

`aqorin projects` lists each project with its state:

| State | Means |
|---|---|
| ok | ready to use |
| not found | its folder is gone |
| changed | another folder is at its path |

**Removing a project deletes nothing** — not its folder, its Runs, its tasks, its worktrees or its branches — and is refused
while one of its Runs is unfinished or being launched: cancel it or let it finish. Adding it again shows its whole
history.

**What is a project's, kept by Aqorin**: its Runs, chats and worktrees, its [tasks](../new-task/) (in Aqorin's data
folder, never the repository), and its **worktree setup** — the command run in each new worktree of a workflow before
its first step, set with `aqorin projects setup <project> --set <command>…` (an argument list, never a shell line;
`--clear` removes it), kept in your list and never read from the repository.

**A project set up before this version** keeps its agents, workflows, settings and tasks in its own `.aqorin/`, which
Aqorin no longer reads for new work: a new Run, chat or task there is refused (`migration_pending`) until
`aqorin migrate` imports it into your library — see [Configuration](../configuration/#moving-a-projects-aqorin-into-your-library).
Nothing in the repository is changed.

## Naming a project: `--project`

A project's commands — `run`, `feature`, `conversation …`, `tasks`, `worktree`, `deliver`, `open`, `runs`, `status`,
`inspect`, `logs`, `cancel`, `resume`, `answer`, `replan`, approvals… — act on `--project`; else on the project of your
list at or above the folder you are in; else, given a Run id, on the project whose Runs hold it (an id matching Runs of
two projects is refused, `run_ambiguous`); else they are refused (`project_required`), naming
`aqorin projects add <folder>`. Your own commands, the same in every project — `agents`, `workflows`, `skills`, `mcp`,
`use`, `runtimes`, `connections`, `credentials`, `config`, `doctor`, `capabilities` — refuse `--project`;
`aqorin migrate --project` names the project to import.

`--project` takes a **path** (anything with `/`, or starting with `.` or `~`: the project of your list at or above
it) or the **name or id** of a project you added.

- A name that is also a folder where you are, of another project, is refused — give the id (`./<name>` means the
  project that holds that folder).
- An empty value is refused, never read as the folder you are in; so is a path in none of your projects
  (`project_required`).
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

## One app over every project

The TUI is the same wherever you open it: Home, Runs and Attention cover every project in your list, each row naming
its project, and **Projects** (`0`, the last section of the rail) lists the projects themselves — each with its state
and its Runs working, waiting, failed and finished (`no git` for a folder that is not a git repository), and beside the
selected one its folder, id, state, whether it is git, its Runs and its worktree setup, or what to do. With no project
in the list, it says how to add one, and `Enter` adds one. The folder you open Aqorin in only decides which project New task and Free chat
offer first; in a git repository not in your list, Home offers *Add this folder to your projects* (nothing is written
in it).

- **`Enter`** on a Run or chat of any project opens it here, with no relaunch. Every action on it — answer, approve,
  cancel, resume, a worktree's decision, a delivery — acts on that project, as the CLI's own command with `--project`
  does. A command the TUI offers to copy names its project (`--project <name>`), so it runs from any folder.
- A chat turn sent in one project goes on while you look at another; what you queued for it is sent there when it
  ends. Quitting while a turn is being sent says so first.
- **`n`** and **`c`** start in the one project that can take a task, or ask which: the project of the folder you
  started in first, then the last one you used, then the others by name. A project that is not *ok* is not offered.
  The form's title and the plan's header name the project.
- The TUI reads each project's record read-only, every two seconds while it runs: it never migrates nor writes one. A
  record written by a newer Aqorin, or by an older one, is not read — Runs says which, and what to do (any `aqorin`
  command in that project brings an older one up to date). A list that cannot be read is said in Runs, Attention and
  Home, never as nothing waiting.
- **Projects changes the list too**, each change `aqorin projects`' own command, so it says and refuses exactly what
  the CLI does:
  - **`a` — Add project.** Type a folder: `~` is your home folder, a relative path starts in the folder you opened
    Aqorin in, and `Tab` completes a folder's name (twice, it lists the ones that match). Under the line Aqorin says
    what `Enter` would add — the git repository's top level for a folder in one, the real folder through a link — or
    why not: your home folder or above, Aqorin's own folders, already your project, inside one of your projects, not a
    folder. A refusal stays on the line with what you typed. Under it, at most 20 suggestions: the git repository you
    opened Aqorin in when it is none of your projects, the git repositories beside your projects' folders, and the
    folders you removed since you opened it; `↑`/`↓` choose one and `Enter` puts it on the line.
  - **`e` — Rename** a project that is *ok*; one whose folder is gone cannot be renamed: remove it, or add the folder
    where it is now.
  - **`x` — Remove** asks once, naming the project and what stays: its folder, Runs and worktrees. Its worktree setup
    is forgotten with it. A project with an unfinished Run is not removed: Projects says which Runs keep it and how to
    move each on.
  - **`s` — Worktree setup**: the one command run in each new worktree of a git project before a workflow's first
    step, typed on one line — words and quotes, never a shell, so `&&`, `|` or `$` are refused unless quoted (put
    several commands in a script). An empty line clears it.

## Kept apart

- A Run or a chat in Aqorin's sandbox cannot write your other projects (see [Security](../security/)) — except one
  you added inside its own folder (possible only in a list written before adding refused it), which is part of what it works on.
- A delivery commits only its project's folder, never a project you added inside it, and opens the pull request in
  the repository its `origin` names.
- `GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_*`, `GH_REPO` and the other variables that point git or `gh` at another
  repository are removed before Aqorin runs anything; your git identity, SSH and `gh` login are kept.

## Good to know

- The list lives in Aqorin's configuration folder (`projects.yaml`) and describes the data folder it is read with: with
  another `AQORIN_DATA_HOME`, after renaming your user or on another machine, a project shows no Runs.
- Every Run inherits the environment of the process that launched it — your shell's, or the TUI's — and every
  project's delivery uses the one `gh` login: Aqorin loads no per-project environment.
