// Shared AST walker — used by BOTH extract.mjs and apply.mjs so the id→node
// mapping is guaranteed identical on round-trip.
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();

export const FILES = [
  "app/utils/pageUtils.ts",
  "app/utils/pageAboutUtils.ts", "app/about/page.tsx", "app/about/layout.tsx",
  "app/utils/pageLeadershipUtils.ts", "app/utils/leadership/rebecca.ts", "app/utils/leadership/miyoung.ts",
  "app/leadership/page.tsx", "app/leadership/[slug]/page.tsx", "app/leadership/layout.tsx",
  "app/utils/pageValuesUtils.ts", "app/our-values/page.tsx", "app/our-values/layout.tsx",
  "app/utils/pageServicesUtils.ts", "app/services/page.tsx", "app/services/layout.tsx",
  "app/utils/pageCorporateServiceUtils.ts", "app/corporate-service/page.tsx", "app/corporate-service/layout.tsx",
  "app/utils/pageAccountingServiceUtils.ts", "app/accounting-service/page.tsx", "app/accounting-service/layout.tsx",
  "app/utils/pageAssuranceServiceUtils.ts", "app/assurance-service/page.tsx", "app/assurance-service/layout.tsx",
  "app/utils/pageTaxServiceUtils.ts", "app/tax-service/page.tsx", "app/tax-service/layout.tsx",
  "app/utils/pageConsultingServiceUtils.ts", "app/consulting-service/page.tsx", "app/consulting-service/layout.tsx",
  "app/utils/pageHrServiceUtils.ts", "app/hr-service/page.tsx", "app/hr-service/layout.tsx",
  "app/utils/pageContactUtils.ts", "app/contact/page.tsx", "app/contact/layout.tsx",
  "app/utils/pageSubscribeUtils.ts", "app/subscribe/page.tsx", "app/subscribe/layout.tsx",
  "app/insights/page.tsx", "app/insights/layout.tsx",
  "app/components/ServiceCTA.tsx", "app/components/DynamicStatStrip.tsx", "app/components/InsightCards.tsx",
];

export const PAGE_OF = (f) => {
  if (f.includes("pageUtils.ts")) return "00 공통 (홈·헤더·푸터·CTA)";
  if (f.includes("About") || f.startsWith("app/about/")) return "01 About 회사소개";
  if (f.includes("Leadership") || f.includes("/leadership/") || f.startsWith("app/leadership/")) return "02 Leadership 리더십";
  if (f.includes("ValuesUtils") || f.startsWith("app/our-values/")) return "03 Our Values 우리의 가치";
  if (f.includes("ServicesUtils") || f.startsWith("app/services/")) return "04 Services 서비스(목록)";
  if (f.includes("CorporateService") || f.startsWith("app/corporate-service/")) return "05 Corporate 기업 서비스";
  if (f.includes("AccountingService") || f.startsWith("app/accounting-service/")) return "06 Accounting 회계";
  if (f.includes("AssuranceService") || f.startsWith("app/assurance-service/")) return "07 Assurance";
  if (f.includes("TaxService") || f.startsWith("app/tax-service/")) return "08 Tax 세무";
  if (f.includes("ConsultingService") || f.startsWith("app/consulting-service/")) return "09 Consulting 컨설팅";
  if (f.includes("HrService") || f.startsWith("app/hr-service/")) return "10 HR 인사";
  if (f.includes("ContactUtils") || f.startsWith("app/contact/")) return "11 Contact 문의";
  if (f.includes("SubscribeUtils") || f.startsWith("app/subscribe/")) return "12 Subscribe 구독";
  if (f.startsWith("app/insights/")) return "13 Insights (목록 UI)";
  if (f.includes("ServiceCTA")) return "14 공통: 서비스 CTA";
  if (f.includes("DynamicStatStrip")) return "15 공통: 통계 스트립";
  if (f.includes("InsightCards")) return "16 공통: 인사이트 카드";
  return "99 기타";
};

const isStr = (n) => n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n));
const isTpl = (n) => n && ts.isTemplateExpression(n);
const isLangCode = (s) => /^(en|eng|ko|kor|kr|us|en-us|ko-kr)$/i.test(s.trim());
// inner-text char range (between the quotes/backticks)
const innerRange = (n) => ({ start: n.getStart() + 1, end: n.getEnd() - 1 });
const innerText = (n, src) => src.slice(n.getStart() + 1, n.getEnd() - 1);

// Walk one file. Returns ordered slots with display fields AND inner-text ranges.
export function walkFile(rel) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const page = PAGE_OF(rel);
  const slots = [];
  let ternCount = 0;
  const idSeen = new Map();
  const lineOf = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;

  const keyPath = (node) => {
    const parts = [];
    let cur = node;
    while (cur && cur.parent) {
      const p = cur.parent;
      if (ts.isPropertyAssignment(p) && p.initializer === cur) parts.unshift(p.name.getText(sf).replace(/['"]/g, ""));
      else if (ts.isArrayLiteralExpression(p)) { const idx = p.elements.indexOf(cur); if (idx >= 0) parts.unshift(`[${idx}]`); }
      else if (ts.isVariableDeclaration(p) && p.initializer === cur) { parts.unshift(p.name.getText(sf)); break; }
      cur = p;
    }
    return parts.join(".").replace(/\.\[/g, "[");
  };

  const emit = (s) => {
    let id = s.id;
    if (idSeen.has(id)) { const n = idSeen.get(id) + 1; idSeen.set(id, n); id = `${id}#${n}`; }
    else idSeen.set(id, 1);
    slots.push({ page, file: rel, ...s, id });
  };

  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const props = {};
      for (const pr of node.properties)
        if (ts.isPropertyAssignment(pr) && pr.name) props[pr.name.getText(sf).replace(/['"]/g, "")] = pr;
      for (const [ek, kk] of [["en", "ko"], ["labelEn", "labelKo"], ["label", "labelKo"]]) {
        if (!props[ek] || !props[kk]) continue;
        const enN = props[ek].initializer, koN = props[kk].initializer;
        const base = `${rel}::${keyPath(props[ek])}`;
        const loc = keyPath(props[ek]) || "(root)";
        if (isStr(enN) && isStr(koN)) {
          emit({ id: base, location: loc, en: innerText(enN, src), ko: innerText(koN, src),
                 enRange: innerRange(enN), koRange: innerRange(koN), line: lineOf(enN), kind: "pair", note: "" });
        } else if (ts.isArrayLiteralExpression(enN) && ts.isArrayLiteralExpression(koN)) {
          const ea = enN.elements, ka = koN.elements, n = Math.min(ea.length, ka.length);
          for (let i = 0; i < n; i++) {
            const e = ea[i], k = ka[i];
            if (isStr(e) && isStr(k)) {
              emit({ id: `${base}[${i}]`, location: `${loc}[${i}]`, en: innerText(e, src), ko: innerText(k, src),
                     enRange: innerRange(e), koRange: innerRange(k), line: lineOf(e), kind: "bullet", note: "" });
            } else if (ts.isObjectLiteralExpression(e) && ts.isObjectLiteralExpression(k)) {
              const ef = {}, kf = {};
              for (const p of e.properties) if (ts.isPropertyAssignment(p)) ef[p.name.getText(sf)] = p.initializer;
              for (const p of k.properties) if (ts.isPropertyAssignment(p)) kf[p.name.getText(sf)] = p.initializer;
              for (const fld of Object.keys(ef))
                if (kf[fld] && isStr(ef[fld]) && isStr(kf[fld]))
                  emit({ id: `${base}[${i}].${fld}`, location: `${loc}[${i}].${fld}`, en: innerText(ef[fld], src), ko: innerText(kf[fld], src),
                         enRange: innerRange(ef[fld]), koRange: innerRange(kf[fld]), line: lineOf(ef[fld]), kind: "bullet", note: "" });
            }
          }
        }
      }
    }
    if (ts.isConditionalExpression(node)) {
      const test = node.condition.getText(sf).replace(/\s+/g, "");
      if (test === "isKo" || test === 'language==="KOR"' || test === "language==='KOR'") {
        const koN = node.whenTrue, enN = node.whenFalse;
        if ((isStr(koN) || isTpl(koN)) && (isStr(enN) || isTpl(enN))) {
          const en = innerText(enN, src), ko = innerText(koN, src);
          if (!(isLangCode(en) && isLangCode(ko))) {
            const idx = ternCount++;
            emit({ id: `${rel}::t${idx}`, location: `화면 텍스트 (L${lineOf(node)})`, en, ko,
                   enRange: innerRange(enN), koRange: innerRange(koN), line: lineOf(node), kind: "ternary",
                   note: (isTpl(koN) || isTpl(enN)) ? "변수 ${...} 포함 — 그대로 유지" : "" });
          }
        }
      }
    }
    if (rel.endsWith("layout.tsx") && ts.isPropertyAssignment(node)) {
      const nm = node.name.getText(sf).replace(/['"]/g, "");
      if ((nm === "title" || nm === "description") && isStr(node.initializer))
        emit({ id: `${rel}::meta.${nm}`, location: `메타데이터(SEO) ${nm}`, en: innerText(node.initializer, src), ko: "",
               enRange: innerRange(node.initializer), koRange: null, line: lineOf(node.initializer), kind: "meta",
               note: "브라우저 탭/검색 노출용 (영어). KO 없음" });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { src, slots };
}
