---
title: CLI reference
description: Every aqorin command and option of the Terminal Alpha, generated from aqorin help.
---

Generated from `aqorin help` of the Terminal Alpha build, which reports version 0.2.0 — the product's own text. In a terminal, `aqorin help` prints the same.

:::note[Added on this site]
- This is the Terminal Alpha's CLI, which is not distributed publicly yet. The `@aqorin/cli` 0.2.0
  package on npm is an earlier CLI: it reports the same version but lacks many of these commands.
- The help still names **jcode**, a runtime the code knows. It is not one of the Terminal Alpha's
  runtimes: those are Claude Code, Codex, OpenCode and Pi.
:::

## Usage

```text
aqorin [--plain] [--json] [--no-color] [--project <path>]
aqorin init [--runtime <id>] [--path <executable>] [--check] [--yes] [--project <path>]
aqorin use <runtime> [--global] [--path <executable>] [--project <path>]
aqorin runtimes [--runtime claude-code|codex|opencode|pi] [--runtime-path <path>]
aqorin runtimes inspect <claude-code|codex|opencode|pi> [--models] [--capabilities] [--runtime-path <path>]
aqorin runtimes inspect claude-code [--runtime-path <path>] [--model <id>]
aqorin runtimes select <claude-code|codex|opencode|pi> <path>
aqorin doctor [--runtime <id>] [--runtime-path <path>]
aqorin doctor --live [--runtime <id>] [--runtime-path <path>] [--model <id>] [--connection <id>] [--yes]
aqorin config effective [--runtime <id>] [--runtime-path <path>]
aqorin config explain [path]
aqorin config diff --runtime <id>
aqorin open <opencode|jcode|pi|codex|claude-code> [--project <path>] [--runtime-path <executable>]
aqorin feature <request> [--project <path>] [--runtime opencode|jcode|pi|codex|claude-code] [--attempt-timeout <duration>]
aqorin feature --task-file <file> [--project <path>] [--runtime <id>] [--agent-check]
aqorin tasks new <request> --check-command <command>… [--project <path>]
aqorin worktree list | integrate <run> | keep <run> | discard <run|aqorin/branch> --yes | undo <run> [--project <path>]
aqorin feature <request> --runtime codex [--model <id>] [--project <path>]
aqorin feature <request> --runtime claude-code [--model <id>] [--project <path>]
aqorin run <workflow> --task-file <file> [--project <path>] [--runtime <id>] [--attempt-timeout <duration>] [--agent-check]
aqorin run <workflow> <request> [--project <path>] [--runtime <id>]   (no Acceptance Plan: nothing checks the work unless --agent-check)
aqorin run <workflow> --task-file <file> --assign <name> [--plan-only] [--project <path>]
aqorin feature <request> [--runtime <id>] --plan-only [--project <path>]
aqorin feature --task-file <file> --assign <name> [--plan-only] [--project <path>]
aqorin simulate <scenario-id>
aqorin runs
aqorin status [run]
aqorin inspect <run>
aqorin logs <run> [--follow] [--json-events]
aqorin cancel <run>
aqorin resume <run>
aqorin answer <run> [--] <text>
aqorin replan <run> --role <role> --runtime <id> [--connection <id>] [--model <model>] --reason <text>
aqorin replan <run> --role <role> --same --reason <text>
aqorin capabilities [--runtime <id>]
aqorin provisioning [--run <id>]
aqorin approvals [--run <id>]
aqorin approve <approval-id>
aqorin reject <approval-id> [--reason <text>]
aqorin conversation create --actor <id> --role <id> [--runtime opencode|pi|codex|claude-code] [--model <id>] [--idempotency-key <key>]
aqorin conversation create --free-chat --runtime opencode|pi|codex|claude-code [--model <id>] [--permission-mode ask|full] [--runtime-config isolated|own] [--connection <id>]
aqorin conversation send <conversation> <text> [--actor <id>] [--idempotency-key <key>] [--expected-revision <n>]
aqorin conversation answer <conversation> <request> <text> [--actor <id>] [--idempotency-key <key>] [--expected-revision <n>]
aqorin conversation interrupt <conversation> [--actor <id>] [--idempotency-key <key>] [--expected-revision <n>]
aqorin conversation finish <conversation> [--actor <id>] [--idempotency-key <key>] [--expected-revision <n>]
aqorin conversation follow-up <conversation> [--actor <id>] [--idempotency-key <key>] [--permission-mode ask|full]
aqorin conversation inspect <conversation>
aqorin agents list | show <id> | validate [<id>]
aqorin agents new <id> --access-class <read_only|workspace_write|review> [--description <text>]
aqorin agents duplicate <id> <new-id> | delete <id>
aqorin workflows list | show <id> | validate [<id>] | new <id> [--description <text>]
aqorin workflows duplicate <id> <new-id> | delete <id>
aqorin workflows default <id> [--assign <name> | --clear]
aqorin skills list | inspect <id> | add <directory> [--id <id>] | remove <id>
aqorin skills assign <id> --scope project|workflow:<id>|agent:<id> [--optional | --unassign]
aqorin mcp list | inspect <id> | remove <id>
aqorin mcp add <id> --command <executable> --tool <name>… [--arg <arg>]… [--env NAME=env:VAR | NAME=keychain:SERVICE[@ACCOUNT]]… [--replace]
aqorin mcp assign <id> --scope project|workflow:<id>|agent:<id> [--optional | --unassign]
aqorin eligibility list | refresh <runtime> [--model <model>] [--yes]
aqorin credentials list | set opencode NAME=env:VAR|NAME=keychain:SERVICE[@ACCOUNT] | unset opencode NAME
aqorin connections [list] | remove <id> | discover <id> | model add|remove <id> <model> | default <id> <model>
aqorin connections add <id> --runtime <id> [--provider openai-compatible --base-url <url>] [--credential env:VAR|keychain:SERVICE[@ACCOUNT]] [--replace]
aqorin help
aqorin --version
```

agents and workflows are the project's library (.aqorin/agents/, .aqorin/workflows/) beside the built-ins — engineering-change, quick-change, bug-fix, investigate, code-review, docs-change; feature and the Portable Feature templates (portable-feature-enforced, portable-feature-advisory) for advanced use — and duplicate copies one into the project to change it; validate prints file:line:column for each problem, and delete refuses an agent a workflow still uses. A workflow's saved default assignment is used by aqorin run &lt;workflow> when no --assign, --runtime or --model is given.

In a terminal, aqorin alone opens the TUI: this project's Runs (n launches a new one as aqorin run does; open one to follow it, inspect each node, cancel it), the four runtimes, the agent and workflow editors, each node's assignment and its preflight, Skills and MCP servers, and the credential references — each the CLI's own files and verbs. Quitting (q) leaves every Run going. --plain, --json or a pipe give the line view instead. NO_COLOR turns color off; AQORIN_TUI_ASCII=1 uses ASCII glyphs; AQORIN_TUI_BELL=0 silences the bell that rings when something starts waiting for you.

feature, run and resume drive their Run in a detached worker: closing the terminal leaves it running (aqorin logs &lt;run> --follow, or aqorin, reattaches); Ctrl+C interrupts it resumably at its next step boundary, and a second Ctrl+C stops waiting (the interruption still happens). One Run at a time per working tree: a new Run or conversation is refused while another is unfinished — a Free chat excepted, which neither waits nor holds the tree, and a workflow, which then runs in a git worktree of its own (aqorin worktree). On macOS a Run's Claude Code, OpenCode and Pi — a workflow's and its checks, or a Free chat's — run in Aqorin's sandbox (Seatbelt): writes refused in the repository outside the Run's own folder, its .git and .aqorin, other worktrees, Aqorin's files, your keys, credentials, shell and git configuration, the agents' own settings and the executables on your PATH; reads and the network are not limited; Codex keeps its own sandbox. Refused where it cannot be set up; sandbox: off in .aqorin/aqorin.yaml runs without it (said on every Run).

## Commands

### `init`

Create Aqorin-owned project configuration

### `use`

Set the project or global default runtime

### `runtimes`

Inventory of the four Alpha runtimes (Claude Code, Codex, OpenCode, Pi): installations and the one Aqorin would use, the version and whether it is admitted (any stable version at or above the runtime's floor; no ceiling), per capability what Aqorin knows of it — verified, locally compatible, compatibility unknown, admitted but not verified, or failed on this version — with its source and date, authentication status and class, the models each runtime can show and where every fact came from. Secret-free: no credential file is opened, no login or refresh is run, no model is called; each probe runs under an allowlisted environment with a bounded timeout. A catalog is never presented as your account's entitlement. --runtime &lt;id> narrows to one runtime and shows every model row; --runtime-path pins one executable. runtimes inspect &lt;runtime> --capabilities lists the runtime's contract (what Aqorin requires of it and how each part is checked); --models lists every model row. runtimes inspect claude-code without a flag keeps the deeper read-only Claude Code preview (version, auth provenance and model surface). runtimes select &lt;runtime> &lt;path> chooses, when several installations of a runtime are found, the one Aqorin uses everywhere (Aqorin's configuration only; PATH, links and the runtime's own configuration are untouched). When it is gone or its bytes change, Aqorin asks again and never picks another

### `doctor`

Read-only diagnostics for config and runtime installations (OpenCode, jcode, Pi, Codex and Claude Code). doctor --live is the only check that may call a model: it says how many calls it may make and asks first (--yes confirms in advance), runs one minimal turn per runtime and records on this machine whether the runtime's contract held

### `config`

Show effective, explain, or diff Aqorin configuration

### `open`

Open a runtime's native TTY (opencode: ephemeral config overlay; jcode/pi/codex/claude-code: native user experience, no config projection; claude-code is demonstrated on Darwin arm64 only)

### `feature`

Run the canonical Engine-driven feature workflow on a target. Every attempt of a Run is bounded (30 min by default; --attempt-timeout 90s|45m|2h sets the Run's, frozen with it): when it elapses Aqorin stops the runtime and the Run waits for a decision (aqorin replan — another runtime or model, or the same one to run the step again — then aqorin resume); nothing is retried on its own. After an acceptance step Aqorin runs the task's commands; no agent checks the work unless --agent-check asks the step's runtime to (advisory, before the commands — or alone when there are none), frozen with the Run

### `run`

Run a workflow file from the project's .aqorin/workflows/ (or the built-in feature) with a task file; the workflow is validated before anything runs and frozen with the Run. It sets control flow only: a runtime or model field is refused. Each role is a built-in (specifier, developer, reviewer) or .aqorin/agents/&lt;id>.agent.yaml with an access_class, which selects each runtime's projection. A read_only or review role's restriction is enforced where a passed probe record covers its runtime, version, platform and model; elsewhere it runs with an advisory restriction (told not to write or run commands, not verified), said on the plan and the Run; on macOS in Aqorin's sandbox its writes are held to its runtime's own state by the kernel, its commands still only asked; jcode runs only the built-in feature

### `tasks`

tasks new writes a task to .aqorin/tasks/ from a request and its checks (--check-command, at least one; each id generated from its command), as --task-file reads it; nothing runs

### `worktree`

A workflow launched while another is unfinished in the project folder runs in a git worktree of its own (outside the repository, branch aqorin/…; worktree_setup in .aqorin/aqorin.yaml prepares it); at most 4 at once. Once its Run is over: integrate merges it into the branch it was made from (refused on another branch, with uncommitted changes, a workflow running there, or a conflict), keep leaves the branch, discard --yes removes both, undo reverts an integration; each decision is recorded on the Run. list also names Aqorin's worktrees no Run records (discard &lt;branch>)

### `simulate`

Run a deterministic workflow-state fixture

### `runs`

List persisted Runs for this project

### `status`

Show the latest Run, or a Run by unambiguous prefix

### `inspect`

Show plan, state, steps, attempts, sessions, and next action

### `logs`

Show a Run's persisted, redacted event log. --follow keeps printing new events and each node's activity (its text, tools and status) until the Run finishes or waits for you (Ctrl-C stops following, never the Run); --json-events prints one JSON event or activity row per line, then the JSON result

### `cancel`

Request cancellation of a persisted Run. On claude-code the cancel command itself signals nothing and says so; a still-running feature driver tries to signal the child it spawned and reports what it could confirm as runtime_cancel (unconfirmed when it could not)

### `resume`

Resume a Run from its durable event cursor (declared strategy). On claude-code the strategy is a step restart: the interrupted step starts again in a fresh invocation (at least once), never resuming its Claude Code conversation. A Run created with --assign whose attempt failed for a runtime cause waits BLOCKED for a human decision: resume is refused until replan

### `answer`

Answer the questions a workflow step asked: the Run waits BLOCKED (Attention lists them); the answer is recorded, and the next resume runs the step again with its questions and the answer (-- before an answer that starts with a dash)

### `replan`

Reassign the failed (or interrupted) step's role of a Run created with --assign to the runtime and model you name, after the same admission a new plan gets; nothing runs and the Run keeps its state (resume continues it). --same keeps the role's runtime, connection and model (retry the same assignment once its cause is fixed), admitted again as it stands now. Never automatic: Aqorin does not retry or switch runtime on its own, and does not roll back the previous attempt's workspace or external effects

### `capabilities`

Show the capability inventory for a runtime

### `provisioning`

Preview a provisioning plan (never installs)

### `approvals`

List Human Approvals (ids are not Run ids)

### `approve`

Record an idempotent Human Approval of an exact hash

### `reject`

Record a Human Approval rejection

### `conversation`

Create, send to, answer, interrupt, finish, follow up and inspect a durable conversation. Without --runtime the runtime is a fake, and its records say so (runtime_id: fake). create --runtime opencode binds the conversation to OpenCode: each turn runs one local, password-protected opencode serve in Aqorin's overlay, stopped when the turn ends; turn 1 opens an Aqorin-owned session and later turns continue it, and send prints each text part, tool call and request as OpenCode reports it (whole parts, not tokens). Observed on OpenCode 1.18.32 only. AQORIN_OPENCODE_MODEL at create is the requested model (the served model is not observed); a provider key reaches OpenCode from a reference set with aqorin credentials set opencode NAME=env:VAR (or keychain:SERVICE[@ACCOUNT]), or from a variable your global OpenCode configuration names as {env:NAME}, never a value. The role must map to a projected OpenCode agent (developer, specifier or validator); the review at finish stays the FAKE reviewer's. create --runtime codex binds it to Codex: with no permission mode, turn 1 is codex exec --json, later turns codex exec resume &lt;thread> --json on the same thread, in Aqorin's Codex home with the write class's sandbox; send prints each completed agent message and tool status. AQORIN_CODEX_MODEL at create is the requested model. Only a write-class role (developer) can hold one; on that exec path answer, steering and queueing are unsupported and interrupt (or Ctrl+C on send) is degraded: Aqorin stops the turn's codex process and the thread keeps what Codex did. create --runtime claude-code binds it to Claude Code: turn 1 creates Aqorin's session (--session-id), later turns continue exactly it (--resume), each under the isolated profile (--safe-mode); a turn whose init reports a session other than the conversation's, a plugin beyond the runtime's own built-ins, an MCP server or a hook is not acknowledged. --model at create picks a model from the runtime's catalog (aqorin runtimes inspect &lt;runtime> --models); one it does not list is refused. --free-chat starts Free chat: one actor (human:local, developer unless given), no review step — finish ends it without any reviewer or validation and claims no review. A Free chat runs as its runtime runs natively (ADR-0055): --permission-mode ask (the default) asks you what the runtime would ask in its terminal — a tool's permission is a Human Approval (aqorin approve|reject), a question is answered with conversation answer — and full lets it do anything without asking; Pi never asks (full only); a Codex chat runs on codex app-server in Aqorin's Codex home, where ask is Codex's own default (its sandbox works in the project unasked and asks for more). --runtime-config own loads the runtime's own configuration (settings, plugins, extensions, MCP servers; read, never written), isolated (the default) keeps Aqorin's clean profile; OpenCode always reads its own; Pi's own is refused in Aqorin's sandbox (Pi writes in ~/.pi, which it keeps closed). --connection &lt;id> runs a Pi Free chat on a connection set up in Aqorin (its endpoint, models and key reference; isolated, --model one of its models). A follow-up runs in Ask unless --permission-mode full is given again. create binds the actor, the role, the project target and the runtime identity, and admits the conversation's Run; send admits one input per turn and reports its actual delivery state, never a delivery it did not observe; a turn closes only on an observed reply; later turns first reconcile the bound OpenCode session read-only, refusing a missing or incompatible session detected by that probe before admission. A session may still change after the probe; send then reports the observed delivery state. answer replies to a pending QUESTION, bound to its request id, from any terminal: on OpenCode the send that owns the turn relays it; a late, expired or re-targeted answer is refused. A PERMISSION is never answered by chat: on OpenCode it is a Human Approval on the conversation's Run (aqorin approve|reject &lt;id>), approved once, never always; unanswered for 10 minutes it is refused. interrupt asks the send that owns an OpenCode turn to abort it and reports confirmed, unknown, turn_completed (it replied first) or requested (no owner acted); the fake has no interrupt; no steering and no queue exist, so a send while a turn works is refused. finish refuses while input is pending or uncertain, then takes the Run through validation and review: approved it ends SUCCEEDED, a failed validation FAILED, and changes requested reopen the conversation; the reviewer is a FAKE. follow-up starts a new conversation with a new Run, linked to one whose Run is terminal; a terminal Run is never reopened. inspect shows the actor, the Run, the turns, the messages, the requests, admission receipts and OpenCode session-reconciliation status without raw logs; verified does not claim an unpinned served model. AQORIN_FAKE_CONVERSATION_SCRIPT selects what the fake does after a send: reply (default), question, permission or hold (the turn stays open). AQORIN_FAKE_FINISH_SCRIPT selects what the fake decides at finish: approve (default), needs_changes or validation_failed. observe is NOT implemented in this version.

### `help`

Show this help

## No command

If project configuration exists, print project status. If not, and a global default runtime exists, print global status. If neither exists, start initialization (interactive TTY only).

## Global options

### `--json`

Machine-readable CLI result on stdout

### `--no-color`

Disable ANSI color

### `--yes`

Non-interactive defaults (never approvals)

### `--verbose`

Diagnostic detail on stderr

### `--debug`

Extra diagnostic detail on stderr

### `--project`

Explicit project directory

### `--runtime`

Runtime id (init, runtimes, doctor, config, capabilities, feature; runtimes accepts claude-code, codex, opencode or pi; conversation create accepts opencode, pi, codex or claude-code)

### `--model`

Codex or Claude Code feature, or runtimes inspect claude-code (where an explicit model is refused as unverifiable, because that surface cannot observe what is served); omitted = no-pin. On feature/run, other runtimes take a role's model from an assignment (--assign). conversation create (any of the four runtimes): the model the conversation requests, admitted only from the runtime's catalog (runtimes inspect &lt;runtime> --models)

### `--task-file`

feature and run: an aqorin.task file (YAML or JSON) with the request and its Acceptance Plan. Aqorin runs the plan's commands itself (your permissions, no shell) and only their exit status decides validation; without one, nothing checks the work unless --agent-check asks the runtime to (its word, advisory). Not accepted by resume

### `--check-command`

tasks new: one check of the task's Acceptance Plan, a command run as an argument array (no shell); repeat it

### `--runtime-path`

Ephemeral installation path; requires --runtime (or an open &lt;runtime> / runtimes inspect &lt;runtime> positional) and is never persisted

### `--actor`

Conversation commands: the actor acting on the conversation. Refused when it is not the actor the conversation is bound to

### `--role`

Conversation create: the role bound to the conversation

### `--idempotency-key`

Conversation commands: the caller's admission key. One accepted command per key; a repeat is deduplicated and dispatched to the runtime only once; the same key with a different text, an answer key naming another request, or a create with a different binding, is refused

### `--expected-revision`

Conversation send and answer: refuse the command if the conversation has moved past this revision

## Notes

open/feature/resume/cancel run real workflows; simulate stays a state fixture (its per-run result carries the simulation label).

Claude Code runs a workflow step headless under an isolated profile (--safe-mode, no user settings, MCP or plugins); a Free chat created with --runtime-config own reads your own configuration. Execution and native open refuse on any platform but Darwin arm64. Native open launches YOUR claude with YOUR environment and projects nothing. Resume restarts the interrupted step (at least once); it never resumes a Claude Code conversation.
