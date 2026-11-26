// Out of Tokens, Mid-Sentence — make.fun competition
// u-kiencx-out-of-tokens-mid-sentence-00f60233
//
// Writes one line — the error message an AI agent shows when it runs out of
// tokens mid-sentence — to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
//
// Deterministic by design: no clock, no randomness, no network, no file
// reads. The same program always writes the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. 75 characters, 77 UTF-8 bytes, one line, no trailing
// newline. The error message itself runs out of tokens mid-sentence.
const ENTRY =
  "Error: out of tokens. This message was going to explain what happened, but—";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only whitespace. Check before writing anything. Characters are
// counted by code point, so the trailing em dash (U+2014) counts as one.
const characters = [...ENTRY];
if (characters.length < 1 || characters.length > 140) {
  throw new Error(
    `entry is ${characters.length} characters, outside the 1-140 gate`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
