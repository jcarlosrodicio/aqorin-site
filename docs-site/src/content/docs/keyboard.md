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
| `Esc` | Go back one level. It never quits; on the rail, the top level, it does nothing. |
| `Tab` or `↓`, `←` `→` | In a form (New task, a connection): `Tab` or `↓` the next field; on a choice `←` `→` choose, and the form's last line says so while it has the focus (a long, searched choice says it on its search line). |
| `1`–`9`, `0` | Home, Runs, Attention, Agents, Workflows, Runtimes, Resources, Credentials, Settings, and `0` Projects (see [Several projects](../projects/)). From an open workflow Run too: it closes as `Esc` would. In a chat, an editor, New task or a form a digit is text or a choice: `Esc` first. |
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

## The mouse

A click does what a key does:

- a section of the rail opens it;
- a row of a list is selected, and a click on the row already selected opens it, as `Enter` (so a double click opens a row);
- a Run's step is selected;
- a button, a key in the footer, a tab of Resources or a trace level on a Run's pane border does what its key does;
- in a picker, the palette, a confirmation or a form, a click on an option chooses it and a click on a button
  presses it.

The wheel moves a list's selection, scrolls the panel on the right and moves a picker's list. Over an open dialog or the help, nothing behind them answers a click (the wheel may still scroll the text behind). A drag over anything else selects its text, and releasing copies it to the
clipboard where your terminal allows it. The terminal's own selection is still there, usually with Shift (Option in
some macOS terminals) held while you drag. An editor's field and node lists, Trace's entries, the chat's composer and
the help are keys only.

## In a Run

| Key | Does |
|---|---|
| `Tab`, then `↑` `↓` | Pick a step. |
| PgUp / PgDn | Scroll the activity. Ctrl+End follows its end again. |
| `t` | Show each tool call, or fold them again between the messages. |
| `d` | Show or hide the selected step's details and an advisory Run's reasons, on the right. |
| `!` | Show the notices — what Aqorin wants you to know about the Run, the plan or, on Home, the project — in the pane's place; `!` again goes back. |
| `z` | Show the focused pane alone, so a mouse selection takes only its lines; `z` again shows them all. |
| `y` | Send the selected step's messages to the terminal's clipboard, where the terminal allows it (it cannot confirm it). |
| Ctrl+T | [Trace](../trace/): Activity, Flow, Trace and Raw. |
| `f` | Flow: the workflow drawn (again: back to the Run). |
| `c` `c` | Cancel the Run. |
| `I` `K` `X` `U` | A finished Run in a worktree of its own: integrate it, keep the branch, discard it, or undo an integration — each asked first, and offered only when it can be done. See [Runs](../runs/). |

## In Projects

| Key | Does |
|---|---|
| `a` | Add project: a folder typed (`~` your home folder), `Tab` completes a folder's name, the line under it says what `Enter` would add or why not; `↑`/`↓` choose a suggestion. `Enter` in an empty list does the same. |
| `e` | Rename the selected project (one that is *ok*). |
| `x` | Remove it from your list, asked once: nothing of it is deleted. |
| `s` | Its worktree setup: one command, on one line. |

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
| `Enter` | Send — while the agent works, queue it for the next turn. |
| `Tab` | While the agent works, send it now, into the running turn (Codex, Pi, OpenCode). |
| `\` then `Enter`, or Shift+Enter | A new line. |
| `/` | At the start of a message, the chat's commands: `Enter` runs one, `Tab` writes it, `Esc` closes the list. |
| Ctrl+C or `/interrupt` | Stop the turn, where the runtime supports it. |
| Ctrl+T | The chat's Run: its activity across the width and a short card (Flow, Trace and Raw with `[` `]`). |

See [Free chat](../free-chat/) for the chat's slash commands.
