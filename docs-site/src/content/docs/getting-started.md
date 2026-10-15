---
title: Getting started
description: What Aqorin is for, and your first run from an empty project to a finished Run.
---

Aqorin is a control plane for coding agents. You write the workflow once, as agents and steps,
and a step can run on Claude Code, Codex, OpenCode or Pi without the workflow changing.

- **Agent, runtime and model are independent.** An agent is a role, such as developer or
  reviewer. Where it runs is a separate choice: its runtime, connection and model.
- **The engine enforces the rules, not a prompt.** Aqorin checks the order of steps, the review
  budget, your checks and your approvals in code.
- **Your setup stays yours.** Aqorin never writes your runtimes' configuration. You can still run
  `claude`, `codex`, `opencode` or `pi` exactly as before.

## Before you begin

- macOS on Apple silicon, and Node.js 24.14 or later in the 24 line.
- At least one of the four runtimes, installed and signed in through its own flow. See
  [Installation](../installation/).
- A project that is a git working tree.

## The first ten minutes

1. **Open the TUI** in your project:

   ```bash
   cd your-project
   aqorin
   ```

2. **Home is a checklist** until the project is ready to run. Work down it:
   - set Aqorin up in this project (it writes `.aqorin/` and nothing else);
   - choose an installation, for any runtime found more than once;
   - choose the **default runtime** — where a step runs when nothing else says so.

   The panel on the right explains the highlighted row. **Enter** does it.
3. **Look at your runtimes** (`6`). Each one shows its version, how it signs in and its models.
   **Validate** (`v`) makes one real model call to check it, and asks first. See
   [Runtimes](../runtimes/).
4. **Start a Free chat** (`2` Runs, then `c`). Pick a runtime and a model, then talk to it as you
   would in its own terminal. See [Free chat](../free-chat/).
5. **Run a workflow** (`2` Runs, then `n`). Choose a workflow — [Engineering change](../workflows/#the-built-in-workflows)
   comes first — say what to do and, optionally,
   which commands must pass, such as `npm test`. The plan says where each step runs, and nothing
   runs until you press Enter. See [New task](../new-task/).
6. **Follow it** in the Run's view, and **answer** what it asks in [Attention](../attention/) (`3`).

Quitting the TUI (`q`) does not stop a Run. Run `aqorin` again to pick it up.

## Everything is also a command

Every action in the TUI is also a CLI verb, with the same words and the same refusals. Add
`--json` to any command for scripts. See [CLI reference](../cli-reference/).

```bash
aqorin runtimes                                   # what is installed
aqorin tasks new "Add a --dry-run flag" --check-command "npm test"
aqorin run engineering-change --task-file <the task file it wrote>
aqorin logs <run> --follow
```
