// Extract all in-scope EN/KO slots -> i18n/proofreading/extracted.json
// Uses the shared walker so ids match apply.mjs exactly.
import fs from "node:fs";
import path from "node:path";
import { ROOT, FILES, PAGE_OF, walkFile } from "./walker.mjs";

const rows = [];
const pageOrder = [];
for (const rel of FILES) {
  if (!fs.existsSync(path.join(ROOT, rel))) { console.error("MISSING", rel); continue; }
  const { slots } = walkFile(rel);
  for (const s of slots) {
    const page = s.page;
    if (!pageOrder.includes(page)) pageOrder.push(page);
    // drop AST ranges from the shipped JSON (apply recomputes them fresh)
    const { enRange, koRange, ...row } = s;
    rows.push(row);
  }
}

const outDir = path.join(ROOT, "i18n/proofreading");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "extracted.json"),
  JSON.stringify({ pageOrder: pageOrder.sort(), rows }, null, 2), "utf8");

const byKind = {}, byPage = {};
for (const r of rows) { byKind[r.kind] = (byKind[r.kind] || 0) + 1; byPage[r.page] = (byPage[r.page] || 0) + 1; }
console.log("slots:", rows.length, "| byKind:", byKind);
const ids = rows.map(r => r.id);
console.log("unique ids:", new Set(ids).size, "of", ids.length);
