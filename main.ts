import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "HR said to bring my whole self to work, so I brought my whole self — and my whole self immediately asked for a raise.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE + "\n", "utf8");

// Validation: read back and check the file is exactly one line of 1–200
// characters equal to the intended joke (gate: 1–200 UTF-8 characters).
const written = readFileSync(entryPath, "utf8");
const text = written.replace(/\n$/, "");
if (written !== LINE + "\n") throw new Error("entry.txt does not match the intended line");
if (text.length < 1 || text.length > 200) throw new Error(`entry length ${text.length} outside 1–200`);
if (text.split("\n").length !== 1) throw new Error("entry.txt must be exactly one line");
console.error(`validated: ${text.length} chars, 1 line`);
