---
title: Keyboard and navigation
description: The keys that work on every screen, and the ones particular to a Run, an editor and a chat.
---

`?` (or F1) always shows the keys of the screen in front of you. Every key there is also a button
or a command in the palette.

## Every screen

| Key | Does |
|---|---|
| `↑` `↓` or `j` `k` | Move in the list in front of you. |
| `←` `→` or `Tab` | Move between the rail, the list, and the inspector and its buttons. |
| `Enter` | Open the item, or do the focused button. |
| `Esc` | Go back one level. It never quits. |
| `1`–`9` | Home, Runs, Attention, Agents, Workflows, Runtimes, Resources, Credentials, Settings. |
| `/` | Filter the list: Runs, Agents, Workflows and Resources. `Esc` clears the filter. |
| `:` or Ctrl+P | The command palette. |
| `?` or F1 | The help of this screen. |
| `q` | Quit. A Run goes on, and Aqorin never quits over unsaved changes. |

## The command palette

`:` or Ctrl+P opens the palette, which lists:

- what the screen in front of you can do, with its key;
- every section;
- what works anywhere.

Type a few words to narrow it, then press `Enter` to run the one selected. An action that cannot
be taken now is greyed out, with the reason. The palette also opens while you type in a chat, but
not over an open form or picker.

## Filtering a list

On Runs, Agents, Workflows and Resources, `/` keeps only the rows that contain every word you type.
The pane's title shows the filter and how many rows match. `Esc` clears it.

## In a Run

| Key | Does |
|---|---|
| `Tab`, then `↑` `↓` | Pick a step. |
| PgUp / PgDn | Scroll the activity. Ctrl+End follows its end again. |
| `t` | Show each tool call, or fold them again between the messages. |
| `d` | Show or hide the selected step's details and an advisory Run's reasons, on the right. |
| `!` | Show the notices — what Aqorin wants you to know about the Run or the plan — in the pane's place; `!` again goes back. |
| `z` | Show the focused pane alone, so a mouse selection takes only its lines; `z` again shows them all. |
| `y` | Send the selected step's messages to the terminal's clipboard, where the terminal allows it (it cannot confirm it). |
| Ctrl+T | [Trace](../trace/): Activity, Trace and Raw. |
| `c` `c` | Cancel the Run. |

## In an editor

| Key | Does |
|---|---|
| `s` | Save. |
| `Esc` twice | Discard the changes. |

The workflow editor has more keys: `i` edits the description, `b` the review budget, `p` sets the
step that runs the checks, and `v` the review step. See [Workflows](../workflows/).

## In a chat

| Key | Does |
|---|---|
| `Enter` | Send. |
| `\` then `Enter`, or Shift+Enter | A new line. |
| Ctrl+C or `/interrupt` | Stop the turn, where the runtime supports it. |
| Ctrl+T | The Run's steps and activity. |

See [Free chat](../free-chat/) for the chat's slash commands.
