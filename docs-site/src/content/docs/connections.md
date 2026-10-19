---
title: Connections
description: How a runtime reaches a model, through its own login or through a connection you add to Aqorin.
---

Claude Code, Codex and Pi each have a **native connection**: their own login and configuration, exactly
as when you run them yourself. Aqorin runs Pi **isolated**, without your extensions: a provider you
reach natively through an extension may not exist inside Aqorin.

**OpenCode has no native connection in Aqorin.** Every OpenCode Aqorin starts — a workflow step, a Free
chat, a check, `aqorin open opencode` — runs in Aqorin's own OpenCode home, never with your OpenCode
configuration, its login (`opencode auth login`), a repository's `opencode.json` or the variables your
configuration reads, and sees only the provider of the connection it runs on. A step on OpenCode that
names no connection runs on **OpenCode's default connection** — its only one, or, with several, the one
you choose: select it on Runtimes and press **Use by default** (`u`), or run `aqorin connections use
<name>`. With none, Aqorin refuses before anything runs and says how to add one. A model named the way
OpenCode names one (`nan/deepseek-v4-flash`) runs as the connection's own model when it has it. Your
OpenCode outside Aqorin is untouched.

For any of these — a provider for OpenCode, one Pi reaches through an extension, or an API key instead
of a login — add a **connection** of Aqorin's own.

## Add a connection

On Runtimes (`6`), select the runtime and press **Add connection** (`a`). With a Pi or OpenCode
connection there already, it first offers **A new one** or **Like <name>**: the same endpoint, key and
models for this runtime, so a provider you set up once is used again. The form has four steps, and
nothing is saved until the last one:

1. **Name** — how you will pick the connection.
2. **Endpoint or sign-in:**
   - **Pi and OpenCode** take an endpoint: the base URL of an OpenAI-compatible endpoint, and where
     its key lives. The URL is `https://…`, or `http://` to this machine only. The key is named by
     an environment variable's **name**, or as a macOS keychain item (on Linux, a variable's name).
   - **Codex and Claude Code** take a sign-in: your existing login, or an API key by reference.
     For Codex, the reference is the name of the variable that holds the key.

   The field asks for the variable's **name** — for example `NAN_API_KEY`, exported in the shell you
   start `aqorin` from — never the key itself. If you paste a key's value there, the form hides it,
   stores nothing, and says so in one warning. A key that [Credentials](../credentials/) already
   lists — an OpenCode provider key or another connection's, never one only an MCP server uses — is
   offered by its name and what uses it. When it is the only key of a connection to the same host, a
   new connection to that host starts on it: the key you added once is used again, not typed a second time. With several, none is chosen
   for you. Codex takes environment variables only.
3. **Models:** **Discover** them (one call to the provider's `/models`, made only because you
   asked), type them, or add them later. For **Claude Code and Codex**, the step also offers
   **their models**: the ones the runtime lists for your own sign-in, as Runtimes read them — no
   model call. With an API key, its account may serve others: type them.
4. **Default model:** the model a step gets when it names none. This step shows what will be
   written.

## After it is added

The connection appears under its runtime. Its inspector shows:

- where its key lives, and whether it is set now — checked by its name; the check does not read the
  value;
- its models and its default model;
- **who uses it**.

Its actions:

- **Edit** reopens the same form, filled in.
- **Models** makes a model the default, removes one, or adds one by hand — or, on Claude Code and
  Codex, from the runtime's own list.
- **Discover** asks the provider for its models again.
- **Delete** asks first and says what uses the connection. The key stays where it lives.

Aqorin resolves the key only when an attempt runs on the connection. It gives the key to that
attempt alone, and scrubs it from everything Aqorin shows or stores.

## From the CLI

```bash
aqorin connections add nan --runtime pi --provider openai-compatible \
  --base-url https://api.example.com/v1 --credential env:EXAMPLE_API_KEY
aqorin connections discover nan
aqorin connections default nan some-model
aqorin connections                  # the list, with whether each key resolves now
aqorin doctor --live --runtime pi --connection nan
```
