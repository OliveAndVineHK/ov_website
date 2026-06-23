// Extract insight-article EN/KO slots -> i18n/proofreading/extracted-insights.json
// 본문 페이지 파이프라인과 분리된 '인사이트 전용' 추출기. walkFile은 공유 walker를 그대로 사용하고,
// page만 PAGE_OF_INSIGHT(아티클별 시트)로 덮어쓴다. apply.mjs는 id 기반이라 그대로 재사용된다.
import fs from "node:fs";
import path from "node:path";
import { ROOT, INSIGHT_FILES, PAGE_OF_INSIGHT, walkFile } from "./walker.mjs";

const rows = [];
const pageOrder = [];
for (const rel of INSIGHT_FILES) {
  if (!fs.existsSync(path.join(ROOT, rel))) { console.error("MISSING", rel); continue; }
  const page = PAGE_OF_INSIGHT(rel);
  if (!pageOrder.includes(page)) pageOrder.push(page);
  const { slots } = walkFile(rel);
  for (const s of slots) {
    s.page = page; // override walker's PAGE_OF ("99 기타") with the per-article sheet
    const { enRange, koRange, ...row } = s;
    rows.push(row);
  }
}

const outDir = path.join(ROOT, "i18n/proofreading");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "extracted-insights.json"),
  JSON.stringify({ pageOrder, rows }, null, 2), "utf8");

const byKind = {};
for (const r of rows) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
console.log("insight files:", INSIGHT_FILES.length, "| slots:", rows.length, "| byKind:", byKind);
const ids = rows.map((r) => r.id);
console.log("unique ids:", new Set(ids).size, "of", ids.length);
