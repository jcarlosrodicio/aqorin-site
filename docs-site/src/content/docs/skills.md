---
title: Skills
description: A skill is a directory of instructions and files that Aqorin pins and gives to the agents you choose.
---

A **skill** is a directory with a `SKILL.md`, plus the files it uses. It extends what an agent knows
beyond its own instructions.

## Add a skill

Skills live on **Resources** (`7`); `[` and `]` switch between the Skills and MCP tabs. **Add skill**
asks for the skill's directory (a relative one is read from the project's folder, `~/` from your home). Aqorin copies the directory into `.aqorin/skills/` and pins its
content, so a Run always uses exactly what you added.

## Assign it

**Assign** gives a skill to one of three scopes:

| Scope | Who gets it |
|---|---|
| The project | Every agent of every Run in this project. |
| A workflow | Every step of that workflow. |
| An agent | That agent, wherever it runs. |

An assignment is either **required** or **optional**:

- **Required:** a runtime that cannot load the skill is refused at the preflight.
- **Optional:** the skill is left out, visibly, where the runtime cannot load it.

**Unassign** takes the skill back. **Remove** asks first, and is refused while anything uses the
skill.

## How each runtime gets it

Aqorin writes the skill into the runtime's isolated environment for the attempt — never into your
own configuration. Whether the runtime loads it is recorded. Aqorin does not claim the skill is
the only thing that the runtime loads.

```bash
aqorin skills add ./my-skill --id house-style
aqorin skills assign house-style --scope workflow:feature
aqorin skills assign house-style --scope agent:reviewer --optional
aqorin skills list
```
