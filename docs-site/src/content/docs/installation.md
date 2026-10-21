---
title: Installation
description: What Aqorin needs, how to install and uninstall it, and where it keeps its files.
---

## What you need

- **macOS on Apple silicon (Darwin arm64), or Linux.** Linux is demonstrated on Ubuntu 26.04 on x86_64 with
  Claude Code 2.1.303, Codex 0.163.0, OpenCode 1.18.25 and Pi 1.3.0 — **from `@aqorin/cli` 0.4.0**; 0.3.0 and
  earlier predate it (on Linux they run a Run with no sandbox, said, and refuse Claude Code). Claude Code runs on
  macOS on Apple silicon and on Linux on x86_64 only. On Linux on arm64, another distribution or macOS on Intel it is not demonstrated;
  Windows is not claimed.
- **On Linux, bubblewrap** — Aqorin's sandbox, which Aqorin never installs: `sudo apt install bubblewrap` (Fedora:
  `sudo dnf install bubblewrap`). `aqorin doctor` says whether it works here; without it a workflow Run is refused,
  never run unsandboxed in silence.
- **Node.js 24.14 or later in the 24 line.** Check with `node --version`.
- **At least one runtime**, installed and signed in through its own flow:

  | Runtime | Sign in with |
  |---|---|
  | Claude Code | `claude` |
  | Codex | `codex login` |
  | OpenCode | nothing in OpenCode: inside Aqorin it runs on a [connection](../connections/) you add |
  | Pi | `pi`, then `/login`, or the provider keys you already use |

Aqorin never signs in for you.

## Install

```bash
npm install -g @aqorin/cli
aqorin --version        # 0.5.0
```

`@aqorin/cli` 0.5.0 on npm is the Terminal Alpha these pages describe, on macOS and Linux. 0.4.0 before it brought
Linux; 0.3.0 is the same Alpha on macOS only; 0.1.0 and 0.2.0 are an earlier CLI, with none of its TUI.

Its one dependency, `better-sqlite3`, is a native addon: npm fetches its prebuilt binary, or builds
it where there is none (a compiler toolchain needed). The package does not ship `node-pty`: only
`aqorin open` (a runtime's own UI launched through Aqorin) needs it, and reports `pty_unavailable`
until `node-pty@1.2.0-beta.15` is installed in the same prefix.

To keep it out of your global prefix, give it one of its own:

```bash
npm install -g --prefix ~/.aqorin-alpha @aqorin/cli
export PATH="$HOME/.aqorin-alpha/bin:$PATH"
```

## Uninstall

```bash
npm uninstall -g @aqorin/cli     # with the same --prefix if you gave it one
```

Uninstalling leaves Aqorin's own files in place. Remove them to start fresh:

| What | Where (macOS) | Moved with |
|---|---|---|
| Configuration | `~/Library/Application Support/aqorin/` | `AQORIN_CONFIG_HOME` |
| Runs and evidence | `~/Library/Application Support/aqorin/data/` | `AQORIN_DATA_HOME` |
| Cache | `~/Library/Caches/aqorin/` | `AQORIN_CACHE_HOME` |
| A project's mark | `<project>/.aqorin/aqorin.yaml` | — |

Nothing of your runtimes' installations or configuration is touched, either way.

## Check the installation

```bash
aqorin doctor                       # read-only checks, grouped, each with its next step
aqorin doctor --live --runtime pi   # one real model call; it asks first
```
