// The CLI reference is generated in the product repository from `aqorin help` (docs/cli-reference.md,
// held to the help by a test there). This copies it here with one editorial note, or checks the copy.
//
//   node scripts/cli-reference.mjs <aqorin checkout>          write src/content/docs/cli-reference.md
//   node scripts/cli-reference.mjs <aqorin checkout> --check  exit 1 if the copy differs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [checkout, flag, ...rest] = process.argv.slice(2);
// review 1: anything but --check is refused, so a mistyped check never overwrites the page
if (!checkout || (flag !== undefined && flag !== "--check") || rest.length > 0) {
  console.error("usage: node scripts/cli-reference.mjs <aqorin checkout> [--check]");
  process.exit(2);
}

const NOTE = `:::note[Added on this site]
- This is the CLI of \`@aqorin/cli\` 0.4.0 on npm, the Terminal Alpha (macOS and Linux). 0.3.0 before it is
  the same CLI on macOS only; 0.1.0 and 0.2.0 are an earlier CLI that lacks many of these commands.
- The help still names **jcode**, a runtime the code knows. It is not one of the Terminal Alpha's
  runtimes: those are Claude Code, Codex, OpenCode and Pi.
:::
`;

const source = readFileSync(join(checkout, "docs/cli-reference.md"), "utf8");
const end = source.indexOf("\n## ");
if (end < 0) throw new Error("docs/cli-reference.md has no section: is it the generated reference?");
const page = `${source.slice(0, end)}\n${NOTE}${source.slice(end)}`;
const target = new URL("../src/content/docs/cli-reference.md", import.meta.url);

if (flag === "--check") {
  let current = "";
  try {
    current = readFileSync(target, "utf8");
  } catch {}
  if (current !== page) {
    console.error("cli-reference.md differs from the product's docs/cli-reference.md — run without --check.");
    process.exit(1);
  }
  console.log("cli-reference.md is the product's.");
} else {
  writeFileSync(target, page);
  console.log("cli-reference.md written.");
}
