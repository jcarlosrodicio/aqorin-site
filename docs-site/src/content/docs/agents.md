---
title: Agents
description: An agent is a role — what it does and what it may do — independent of the runtime and model that carry it.
---

An **agent** is a role:

- what it does (its instructions);
- what it may do (its access class);
- what it is handed and what it delivers;
- its skills and MCP servers.

An agent's definition names no runtime and no model. Those belong to an assignment, or to the
agent's default execution — an optional preference that an assignment overrides.

## Access classes

| Access class | Shown as | What it may do |
|---|---|---|
| `read_only` | *read only* | Read the project, without changing it. |
| `workspace_write` | *edits files* | Change files in the project. |
| `review` | *reviews* | Read the work and decide: approved, or changes needed. |

Aqorin never widens an access class to make a runtime fit. A read-only or review agent runs on any
runtime: where Aqorin can enforce its restriction it is *enforced*; anywhere else it runs with its
runtime's read-only setting and is told not to write or run commands, and the restriction is said to
be *advisory* — so is the Run's result. See [Security model](../security/#restricted-roles).

## The Agents screen (`4`)

Each agent is listed with what it can do and its **default execution**. The inspector says:

- what the agent is for and what it may do;
- where it runs in each workflow that uses it, and which layer decided that.

Its actions:

- **New** and **Duplicate** open a form. A built-in agent cannot be edited, so duplicate it to make
  your own version.
- **Edit** opens a project agent's fields and edits them in place. The file keeps your comments.
- **Delete** asks first, and says what uses the agent.

## Default execution

An agent's **default execution** is a runtime, a connection (or the runtime's own), a model and the
model's effort. It is your preference — the agents Aqorin ships come with none.

- **Configure default** (`c`) chooses it. The model is picked from the connection's models, or the
  ones the runtime lists (Claude Code's and Codex's included), or **Another model id…** for one the
  list does not name. For a built-in
  agent, it is kept in your `config.yaml`, the same in every project; for your own agent, in the agent's file.
- **Effort**, in the same form, is how hard the model reasons in the steps this default places, in the
  runtime's own levels. **Default** leaves it to the runtime.

  | Runtime | Levels |
  |---|---|
  | Claude Code | low, medium, high, xhigh, max |
  | Codex | minimal, low, medium, high, xhigh |
  | Pi | off, minimal, low, medium, high, xhigh, max |
  | OpenCode | none — its effort is a variant its provider declares, and Aqorin's connections declare none |

  Every attempt of those steps runs with it, and the Run keeps it when it is resumed. A step placed by
  an explicit assignment runs at its runtime's own effort.
- **Clear default** removes it.

## Built-in agents

`specifier`, `developer` and `reviewer` are the roles of the built-in `feature` workflow. The
Portable Feature templates add `researcher`, `advisory-researcher` and `advisory-specifier`.

## The file

Your agents live in your library, `library/agents/<id>.agent.yaml` in Aqorin's configuration folder, the same in every
project ([Configuration](../configuration/)). You can edit them by hand:

```yaml
kind: aqorin.agent
schema_version: 2
id: doc-writer
description: Writes the user-facing documentation for a change.
access_class: workspace_write
instructions: |-
  Update the documentation under docs/ for the change you are handed.
inputs:
  - the developer's summary (handoff)
outputs:
  - the updated pages, and a summary in the final message
```

Aqorin adds `inputs` and `outputs` to the agent's task text, but does not check them in the Alpha.

```bash
aqorin agents list
aqorin agents new doc-writer --access-class workspace_write --description "Writes the docs"
aqorin agents validate doc-writer     # what is wrong, with file:line:column
```
