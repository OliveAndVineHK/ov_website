export type DynamicPageEntry = {
  documentTitle: { en: string; ko: string };
  pathSegments: { en: string[]; ko: string[] };
};

const INSIGHT_PAGES: Record<string, DynamicPageEntry> = {
  "insights/consulting/ai-business-automation": {
    documentTitle: {
      en: "AI Business Automation",
      ko: "AI 비즈니스 자동화",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "AI Business Automation"],
      ko: ["인사이트", "컨설팅", "AI 비즈니스 자동화"],
    },
  },
  "insights/consulting/digital-transformation-efficiency-improvement": {
    documentTitle: {
      en: "Digital Transformation Efficiency Improvement",
      ko: "디지털 전환 효율 개선",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "Digital Transformation Efficiency Improvement"],
      ko: ["인사이트", "컨설팅", "디지털 전환 효율 개선"],
    },
  },
  "insights/consulting/digital-transformation-ux-improvement": {
    documentTitle: {
      en: "Digital Transformation UX Improvement",
      ko: "디지털 전환 UX 개선",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "Digital Transformation UX Improvement"],
      ko: ["인사이트", "컨설팅", "디지털 전환 UX 개선"],
    },
  },
  "insights/consulting/big-data-driven": {
    documentTitle: {
      en: "Big Data Driven",
      ko: "빅데이터 기반",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "Big Data Driven"],
      ko: ["인사이트", "컨설팅", "빅데이터 기반"],
    },
  },
  "insights/consulting/digital-transformation-tvp": {
    documentTitle: {
      en: "Digital Transformation",
      ko: "디지털 전환",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "Digital Transformation"],
      ko: ["인사이트", "컨설팅", "디지털 전환"],
    },
  },
  "insights/consulting/legal-considerations-ma": {
    documentTitle: {
      en: "Legal Considerations in M&A",
      ko: "M&A 법적 고려사항",
    },
    pathSegments: {
      en: ["Insights", "Consulting", "Legal Considerations in M&A"],
      ko: ["인사이트", "컨설팅", "M&A 법적 고려사항"],
    },
  },
  "insights/accounting/introduction-xero": {
    documentTitle: {
      en: "Introduction to Xero",
      ko: "Xero 소개",
    },
    pathSegments: {
      en: ["Insights", "Accounting", "Introduction to Xero"],
      ko: ["인사이트", "회계", "Xero 소개"],
    },
  },
  "insights/accounting/accounting-knowledge": {
    documentTitle: {
      en: "Accounting Knowledge: Financial Statements",
      ko: "회계 지식: 재무제표",
    },
    pathSegments: {
      en: ["Insights", "Accounting", "Accounting Knowledge: Financial Statements"],
      ko: ["인사이트", "회계", "회계 지식: 재무제표"],
    },
  },
  "insights/tax/dividend-legal-considerations": {
    documentTitle: {
      en: "Dividend and Legal Considerations",
      ko: "배당 및 법적 고려사항",
    },
    pathSegments: {
      en: ["Insights", "Tax", "Dividend and Legal Considerations"],
      ko: ["인사이트", "세무", "배당 및 법적 고려사항"],
    },
  },
  "insights/tax/vat": {
    documentTitle: {
      en: "VAT",
      ko: "VAT",
    },
    pathSegments: {
      en: ["Insights", "Tax", "VAT"],
      ko: ["인사이트", "세무", "VAT"],
    },
  },
  "insights/tax/corporate-tax": {
    documentTitle: {
      en: "Corporate Tax and Reporting",
      ko: "법인세 및 신고",
    },
    pathSegments: {
      en: ["Insights", "Tax", "Corporate Tax and Reporting"],
      ko: ["인사이트", "세무", "법인세 및 신고"],
    },
  },
  "insights/corporate-service/amendment": {
    documentTitle: {
      en: "Amendment",
      ko: "수정",
    },
    pathSegments: {
      en: ["Insights", "Corporate Service", "Amendment"],
      ko: ["인사이트", "기업 서비스", "수정"],
    },
  },
  "insights/corporate-service/incorporation": {
    documentTitle: {
      en: "Incorporation",
      ko: "법인 설립",
    },
    pathSegments: {
      en: ["Insights", "Corporate Service", "Incorporation"],
      ko: ["인사이트", "기업 서비스", "법인 설립"],
    },
  },
  "insights/corporate-service/corporate-secretary": {
    documentTitle: {
      en: "Corporate Secretary",
      ko: "회사 비서",
    },
    pathSegments: {
      en: ["Insights", "Corporate Service", "Corporate Secretary"],
      ko: ["인사이트", "기업 서비스", "회사 비서"],
    },
  },
  "insights/hr/termination-regulation": {
    documentTitle: {
      en: "Termination Regulation",
      ko: "해고 규정",
    },
    pathSegments: {
      en: ["Insights", "HR", "Termination Regulation"],
      ko: ["인사이트", "인사", "해고 규정"],
    },
  },
  "insights/hr/hybrid-work-performance": {
    documentTitle: {
      en: "Hybrid Work Performance",
      ko: "하이브리드 근무 성과",
    },
    pathSegments: {
      en: ["Insights", "HR", "Hybrid Work Performance"],
      ko: ["인사이트", "인사", "하이브리드 근무 성과"],
    },
  },
  "insights/hr/leave-policy-explanation": {
    documentTitle: {
      en: "Leave Policy Explanation",
      ko: "휴가 정책 설명",
    },
    pathSegments: {
      en: ["Insights", "HR", "Leave Policy Explanation"],
      ko: ["인사이트", "인사", "휴가 정책 설명"],
    },
  },
  "insights/hr/mandatory-provident-fund": {
    documentTitle: {
      en: "Mandatory Provident Fund",
      ko: "강제적 공제 기금",
    },
    pathSegments: {
      en: ["Insights", "HR", "Mandatory Provident Fund"],
      ko: ["인사이트", "인사", "강제적 공제 기금"],
    },
  },
  "insights/hr/ir56": {
    documentTitle: {
      en: "IR56",
      ko: "IR56",
    },
    pathSegments: {
      en: ["Insights", "HR", "IR56"],
      ko: ["인사이트", "인사", "IR56"],
    },
  },
  "insights/hr/tax-clearance-departing-employees": {
    documentTitle: {
      en: "Tax Clearance for Departing Employees",
      ko: "출국 직원의 세금 정산 절차",
    },
    pathSegments: {
      en: ["Insights", "HR", "Tax Clearance for Departing Employees"],
      ko: ["인사이트", "인사", "출국 직원의 세금 정산 절차"],
    },
  },
  "insights/hr/withholding-obligations-departing-employees": {
    documentTitle: {
      en: "Employer Withholding Obligations for Departing Employees",
      ko: "출국 직원에 대한 고용주의 지급 보류 의무",
    },
    pathSegments: {
      en: ["Insights", "HR", "Employer Withholding Obligations for Departing Employees"],
      ko: ["인사이트", "인사", "출국 직원에 대한 고용주의 지급 보류 의무"],
    },
  },
  "insights/tax/two-tiered-salaries-tax": {
    documentTitle: {
      en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
      ko: "홍콩 이중 급여세 (2024/25)",
    },
    pathSegments: {
      en: ["Insights", "Tax", "Two-Tiered Salaries Tax in Hong Kong (2024/25)"],
      ko: ["인사이트", "세무", "홍콩 이중 급여세 (2024/25)"],
    },
  },
  "insights/hr/employers-return-bir56a": {
    documentTitle: {
      en: "Annual Employer's Return (BIR56A) in Hong Kong",
      ko: "연간 고용주 신고서 (BIR56A) 홍콩",
    },
    pathSegments: {
      en: ["Insights", "HR", "Annual Employer's Return (BIR56A)"],
      ko: ["인사이트", "인사", "연간 고용주 신고서 (BIR56A)"],
    },
  },
  "insights/corporate-service/annual-return-companies-registry": {
    documentTitle: {
      en: "Annual Return Filing with the Hong Kong Companies Registry (NAR1)",
      ko: "홍콩 회사등기소에 제출하는 연간 보고서(NAR1)",
    },
    pathSegments: {
      en: ["Insights", "Corporate Service", "Annual Return Filing (NAR1)"],
      ko: ["인사이트", "기업 서비스", "연간 보고서 제출(NAR1)"],
    },
  },
};

export function getDynamicPageKey(pathname: string): string {
  return pathname.replace(/^\//, "").toLowerCase();
}

export function getDynamicPageEntry(pathname: string): DynamicPageEntry | undefined {
  return INSIGHT_PAGES[getDynamicPageKey(pathname)];
}

export const INSIGHT_TAG_SERVICE_KEY: Record<string, string> = {
  accounting: "accounting",
  corporate: "corporate",
  assurance: "assurance",
  tax: "tax",
  consulting: "service5",
  hr: "service6",
};

export const INSIGHTS_PATH_LABELS = {
  en: "Insights",
  ko: "인사이트",
} as const;

export { INSIGHT_PAGES };
