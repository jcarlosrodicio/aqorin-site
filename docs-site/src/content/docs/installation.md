---
title: Installation
description: What Aqorin needs, how to install and uninstall it, and where it keeps its files.
---

## What you need

- **macOS on Apple silicon (Darwin arm64).** This is the only platform the Alpha has been shown
  on. Linux and Windows are not claimed.
- **Node.js 24.14 or later in the 24 line.** Check with `node --version`.
- **At least one runtime**, installed and signed in through its own flow:

  | Runtime | Sign in with |
  |---|---|
  | Claude Code | `claude` |
  | Codex | `codex login` |
  | OpenCode | `opencode auth login`, or the provider keys you already use |
  | Pi | `pi`, then `/login`, or the provider keys you already use |

Aqorin never signs in for you.

## Install

:::caution
The Terminal Alpha is not published on npm. The `@aqorin/cli` 0.2.0 package on npm is an earlier
CLI, with none of the TUI these pages describe. Both print version 0.2.0, but they are different
builds.
:::

The Alpha installs from its packed tarball, into a prefix of its own:

```bash
npm install -g --prefix ~/.aqorin-alpha ./aqorin-cli-<version>.tgz
export PATH="$HOME/.aqorin-alpha/bin:$PATH"
aqorin --version
```

## Uninstall

```bash
npm uninstall -g --prefix ~/.aqorin-alpha @aqorin/cli
```

Uninstalling leaves Aqorin's own files in place. Remove them to start fresh:

| What | Where (macOS) | Moved with |
|---|---|---|
| Configuration | `~/Library/Application Support/aqorin/` | `AQORIN_CONFIG_HOME` |
| Runs and evidence | `~/Library/Application Support/aqorin/data/` | `AQORIN_DATA_HOME` |
| Cache | `~/Library/Caches/aqorin/` | `AQORIN_CACHE_HOME` |
| A project's own files | `<project>/.aqorin/` | — |

Nothing of your runtimes' installations or configuration is touched, either way.

## Check the installation

```bash
aqorin doctor                       # read-only checks, every runtime's installation included
aqorin doctor --live --runtime pi   # one real model call; it asks first
```
