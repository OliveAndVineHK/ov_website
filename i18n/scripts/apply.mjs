// Apply proofreader edits back into the code.
// Reads i18n/proofreading/edits.json : [{ id, newEn?, newKo? }, ...]
// Re-walks each file with the shared walker (fresh ranges), then replaces the
// inner text of the matched en/ko string node(s). Edits applied end->start so
// offsets stay valid. Use --dry to preview without writing.
import fs from "node:fs";
import path from "node:path";
import { ROOT, walkFile } from "./walker.mjs";

const DRY = process.argv.includes("--dry");
const editsPath = path.join(ROOT, "i18n/proofreading/edits.json");
const edits = JSON.parse(fs.readFileSync(editsPath, "utf8"));

// group edits by file (id = "relpath::...")
const byFile = new Map();
for (const e of edits) {
  const rel = e.id.split("::")[0];
  if (!byFile.has(rel)) byFile.set(rel, []);
  byFile.get(rel).push(e);
}

let changed = 0, missing = [], unchanged = 0;
const ESC = (s) => s; // values from JSON are already raw inner text (escapes literal)

for (const [rel, fileEdits] of byFile) {
  const { src, slots } = walkFile(rel);
  const byId = new Map(slots.map((s) => [s.id, s]));
  const repl = []; // {start, end, text}

  for (const e of fileEdits) {
    const slot = byId.get(e.id);
    if (!slot) { missing.push(e.id); continue; }
    if (e.newEn != null && e.newEn !== "" && slot.enRange) {
      if (ESC(e.newEn) !== slot.en) { repl.push({ ...slot.enRange, text: ESC(e.newEn), id: e.id, lang: "EN", from: slot.en, to: e.newEn }); }
      else unchanged++;
    }
    if (e.newKo != null && e.newKo !== "" && slot.koRange) {
      if (ESC(e.newKo) !== slot.ko) { repl.push({ ...slot.koRange, text: ESC(e.newKo), id: e.id, lang: "KO", from: slot.ko, to: e.newKo }); }
      else unchanged++;
    }
  }
  if (!repl.length) continue;
  // sanity: no overlapping ranges
  repl.sort((a, b) => b.start - a.start);
  for (let i = 1; i < repl.length; i++)
    if (repl[i].end > repl[i - 1].start) throw new Error(`overlap in ${rel}`);

  let out = src;
  for (const r of repl) {
    out = out.slice(0, r.start) + r.text + out.slice(r.end);
    changed++;
    console.log(`${DRY ? "[dry] " : ""}${rel}\n  ${r.lang} ${r.id}\n   - ${r.from}\n   + ${r.to}`);
  }
  if (!DRY) fs.writeFileSync(path.join(ROOT, rel), out, "utf8");
}

console.log(`\n${DRY ? "DRY RUN — " : ""}applied ${changed} edit(s) across ${byFile.size} file(s). unchanged-skipped: ${unchanged}. missing ids: ${missing.length}`);
if (missing.length) console.log("MISSING IDS:", missing.slice(0, 20));
