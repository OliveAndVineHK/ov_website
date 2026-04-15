/**
 * Single source of truth for insight card content (carousel and insights page list).
 * Update here and changes apply to both InsightCards and the insights page.
 */

export type InsightSubTag = { en: string; ko: string };

export interface InsightCardDefinition {
  image: string;
  alt: string;
  href: string;
  tag: { en: string; ko: string };
  title: { en: string; ko: string };
  description: { en: string; ko: string };
  subTags?: InsightSubTag[];
}

export const subTagsByInsight = {
  fiveSteps: [
    { en: "AI", ko: "인공지능" },
    { en: "Business Process Automation", ko: "비즈니스 프로세스 자동화" },
    { en: "Benefits", ko: "이점" },
  ] as InsightSubTag[],
  introductionXero: [
    { en: "Functions & Price", ko: "기능 및 요금" },
    { en: "Cloud based Accounting Software", ko: "클라우드 기반 회계 소프트웨어" },
  ] as InsightSubTag[],
  amendment: [
    { en: "HK Corporate Governance", ko: "HK 기업 지배구조" },
    { en: "Company Secretary Service", ko: "회사 비서 서비스" },
  ] as InsightSubTag[],
  incorporation: [
    { en: "HK Company Setup", ko: "HK 회사 설립" },
    { en: "Procedure and Cost", ko: "절차 및 비용" },
  ] as InsightSubTag[],
  corporateSecretary: [
    { en: "HK Company Secretary", ko: "홍콩 회사 비서" },
    { en: "Key Responsibilities", ko: "주요 책임" },
  ] as InsightSubTag[],
  accountingKnowledge: [
    { en: "Analysis Method", ko: "분석 방법" },
    { en: "Key Components", ko: "핵심 구성요소" },
  ] as InsightSubTag[],
  dividendLegalConsiderations: [
    { en: "HK Dividend Treatment", ko: "홍콩 배당 처리" },
    { en: "Risk and Considerations", ko: "위험 및 고려사항" },
  ] as InsightSubTag[],
  vat: [
    { en: "Absence of VAT in HK", ko: "홍콩 VAT 부재" },
    { en: "Impact on International Business", ko: "국제 비즈니스 영향" },
  ] as InsightSubTag[],
  corporateTax: [
    { en: "HK Profits Tax Filing", ko: "홍콩 이익세 신고" },
    { en: "Procedures and Deadlines", ko: "절차 및 기한" },
  ] as InsightSubTag[],
  digitalTransformationEfficiency: [
    { en: "Digital Strategies", ko: "디지털 전략" },
    { en: "Real-World Cases", ko: "실제 사례" },
  ] as InsightSubTag[],
  digitalTransformationUX: [
    { en: "Enhancing Customer Experience", ko: "고객 경험 향상" },
    { en: "Real-World Examples", ko: "실제 사례" },
  ] as InsightSubTag[],
  bigDataDriven: [
    { en: "Big Data Analysis", ko: "빅데이터 분석" },
    { en: "Real-World Cases", ko: "실제 사례" },
  ] as InsightSubTag[],
  digitalTransformationTVP: [
    { en: "HK TVP", ko: "홍콩 TVP" },
    { en: "Application Cases", ko: "신청 사례" },
  ] as InsightSubTag[],
  legalConsiderationsMA: [
    { en: "Tips for Successful M&A", ko: "성공적인 M&A를 위한 팁" },
    { en: "Key Legal Considerations", ko: "핵심 법적 고려사항" },
  ] as InsightSubTag[],
  terminationRegulation: [
    { en: "Types and Procedures", ko: "유형 및 절차" },
    { en: "Legal Responsibilities", ko: "법적 책임" },
    { en: "Monetary Compensation", ko: "금전 보상" },
  ] as InsightSubTag[],
  hybridWorkPerformance: [
    { en: "Challenges", ko: "과제" },
    { en: "Management Strategies", ko: "관리 전략" },
  ] as InsightSubTag[],
  leavePolicy: [
    { en: "HK Leave Regulations", ko: "홍콩 휴가 규정" },
    { en: "Application and Approval", ko: "신청 및 승인" },
  ] as InsightSubTag[],
  mandatoryProvidentFund: [
    { en: "MPF", ko: "의무적 퇴직연금" },
    { en: "Enrollment Eligibility", ko: "가입 자격" },
    { en: "Calculation Method", ko: "계산 방법" },
  ] as InsightSubTag[],
  ir56: [
    { en: "Employment Notification", ko: "고용 신고" },
    { en: "Importance", ko: "중요성" },
    { en: "Procedures and Deadlines", ko: "절차 및 기한" },
  ] as InsightSubTag[],
  taxClearanceDepartingEmployees: [
    { en: "IR56G Filing", ko: "IR56G 제출" },
    { en: "Tax Clearance Workflow", ko: "세금 정산 절차" },
    { en: "Employer Liability", ko: "고용주 책임" },
  ] as InsightSubTag[],
  withholdingObligationsDepartingEmployees: [
    { en: "Section 52 IRO", ko: "세무조례 제52조" },
    { en: "30-Day Release Rule", ko: "30일 지급 규칙" },
    { en: "Employer Risk", ko: "고용주 위험" },
  ] as InsightSubTag[],
  twoTieredSalariesTax: [
    { en: "Salaries Tax", ko: "급여세" },
    { en: "Tax Rates", ko: "세율" },
    { en: "Employer Obligations", ko: "고용주 의무" },
  ] as InsightSubTag[],
  employersReturnBir56a: [
    { en: "BIR56A", ko: "BIR56A" },
    { en: "IR56 Forms", ko: "IR56 양식" },
    { en: "Employer Compliance", ko: "고용주 규정 준수" },
  ] as InsightSubTag[],
  annualReturnCompaniesRegistry: [
    { en: "Companies Registry", ko: "회사등기소" },
    { en: "NAR1", ko: "NAR1" },
    { en: "Compliance", ko: "규정 준수" },
  ] as InsightSubTag[],
};

export const FIVE_STEPS_CARD: InsightCardDefinition = {
  image: "/insights/ai-automation.jpg",
  alt: "AI Business Automation",
  href: "/insights/consulting/ai-business-automation",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "AI Business Automation", ko: "AI 비즈니스 자동화" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.fiveSteps,
};

export const INTRODUCTION_XERO_CARD: InsightCardDefinition = {
  image: "/insights/introduction-xero.png",
  alt: "Introduction to Xero",
  href: "/insights/accounting/introduction-xero",
  tag: { en: "Accounting", ko: "회계" },
  title: { en: "Introduction to Xero", ko: "Xero 소개" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.introductionXero,
};

export const ACCOUNTING_KNOWLEDGE_CARD: InsightCardDefinition = {
  image: "/insights/accounting-knowledge.jpg",
  alt: "Accounting Knowledge: Financial Statements",
  href: "/insights/accounting/accounting-knowledge",
  tag: { en: "Accounting", ko: "회계" },
  title: { en: "Accounting Knowledge: Financial Statements", ko: "회계 지식: 재무제표" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.accountingKnowledge,
};

export const AMENDMENT_CARD: InsightCardDefinition = {
  image: "/insights/amendment.jpg",
  alt: "Amendment",
  href: "/insights/corporate-service/amendment",
  tag: { en: "Corporate Service", ko: "기업 서비스" },
  title: { en: "Amendment", ko: "수정" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.amendment,
};

export const INCORPORATION_CARD: InsightCardDefinition = {
  image: "/insights/incorporation.jpg",
  alt: "Incorporation",
  href: "/insights/corporate-service/incorporation",
  tag: { en: "Corporate Service", ko: "기업 서비스" },
  title: { en: "Incorporation", ko: "법인 설립" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.incorporation,
};

export const CORPORATE_SECRETARY_CARD: InsightCardDefinition = {
  image: "/insights/corporate-secretary.jpg",
  alt: "Corporate Secretary",
  href: "/insights/corporate-service/corporate-secretary",
  tag: { en: "Corporate Service", ko: "기업 서비스" },
  title: { en: "Corporate Secretary", ko: "회사 비서" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.corporateSecretary,
};

export const DIVIDEND_LEGAL_CONSIDERATIONS_CARD: InsightCardDefinition = {
  image: "/insights/dividend.jpg",
  alt: "Dividend and Legal Considerations",
  href: "/insights/tax/dividend-legal-considerations",
  tag: { en: "Tax", ko: "세무" },
  title: { en: "Dividend and Legal Considerations", ko: "배당 및 법적 고려사항" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.dividendLegalConsiderations,
};

export const VAT_CARD: InsightCardDefinition = {
  image: "/insights/vat.jpg",
  alt: "VAT",
  href: "/insights/tax/vat",
  tag: { en: "Tax", ko: "세무" },
  title: { en: "VAT", ko: "VAT" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.vat,
};

export const CORPORATE_TAX_CARD: InsightCardDefinition = {
  image: "/insights/corporate-tax.jpg",
  alt: "Corporate Tax and Reporting",
  href: "/insights/tax/corporate-tax",
  tag: { en: "Tax", ko: "세무" },
  title: { en: "Corporate Tax and Reporting", ko: "법인세 및 신고" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.corporateTax,
};

export const DIGITAL_TRANSFORMATION_EFFICIENCY_CARD: InsightCardDefinition = {
  image: "/insights/digital-transformation.jpg",
  alt: "Digital Transformation Efficiency Improvement",
  href: "/insights/consulting/digital-transformation-efficiency-improvement",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "Digital Transformation Efficiency Improvement", ko: "디지털 전환 효율 개선" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.digitalTransformationEfficiency,
};

export const DIGITAL_TRANSFORMATION_UX_CARD: InsightCardDefinition = {
  image: "/insights/digital-ux.jpg",
  alt: "Digital Transformation UX Improvement",
  href: "/insights/consulting/digital-transformation-ux-improvement",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "Digital Transformation UX Improvement", ko: "디지털 전환 UX 개선" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.digitalTransformationUX,
};

export const BIG_DATA_DRIVEN_CARD: InsightCardDefinition = {
  image: "/insights/big-data.jpg",
  alt: "Big Data Driven",
  href: "/insights/consulting/big-data-driven",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "Big Data Driven", ko: "빅데이터 기반" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.bigDataDriven,
};

export const DIGITAL_TRANSFORMATION_TVP_CARD: InsightCardDefinition = {
  image: "/insights/digital-trans.jpg",
  alt: "Digital Transformation",
  href: "/insights/consulting/digital-transformation-tvp",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "Digital Transformation", ko: "디지털 전환" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.digitalTransformationTVP,
};

export const LEGAL_CONSIDERATIONS_MA_CARD: InsightCardDefinition = {
  image: "/insights/legal.jpg",
  alt: "Legal Considerations in M&A",
  href: "/insights/consulting/legal-considerations-ma",
  tag: { en: "Consulting", ko: "컨설팅" },
  title: { en: "Legal Considerations in M&A", ko: "M&A 법적 고려사항" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.legalConsiderationsMA,
};

export const TERMINATION_REGULATION_CARD: InsightCardDefinition = {
  image: "/insights/termination.jpg",
  alt: "Termination Regulation",
  href: "/insights/hr/termination-regulation",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Termination Regulation", ko: "해고 규정" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.terminationRegulation,
};

export const HYBRID_WORK_PERFORMANCE_CARD: InsightCardDefinition = {
  image: "/insights/hybrid-work.jpg",
  alt: "Hybrid Work Performance",
  href: "/insights/hr/hybrid-work-performance",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Hybrid Work Performance", ko: "하이브리드 근무 성과" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.hybridWorkPerformance,
};

export const LEAVE_POLICY_EXPLANATION_CARD: InsightCardDefinition = {
  image: "/insights/leave-policy.jpg",
  alt: "Leave Policy Explanation",
  href: "/insights/hr/leave-policy-explanation",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Leave Policy Explanation", ko: "휴가 정책 설명" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.leavePolicy,
};

export const MANDATORY_PROVIDENT_FUND_CARD: InsightCardDefinition = {
  image: "/insights/mpf.jpg",
  alt: "Mandatory Provident Fund",
  href: "/insights/hr/mandatory-provident-fund",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Mandatory Provident Fund", ko: "강제적 공제 기금" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.mandatoryProvidentFund,
};

export const IR56_CARD: InsightCardDefinition = {
  image: "/insights/ir.jpg",
  alt: "IR56",
  href: "/insights/hr/ir56",
  tag: { en: "HR", ko: "인사" },
  title: { en: "IR56", ko: "IR56" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.ir56,
};

export const TAX_CLEARANCE_DEPARTING_EMPLOYEES_CARD: InsightCardDefinition = {
  image: "/insights/tax-clearance.jpg",
  alt: "Tax Clearance for Departing Employees",
  href: "/insights/hr/tax-clearance-departing-employees",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Tax Clearance for Departing Employees", ko: "출국 직원의 세금 정산 절차" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.taxClearanceDepartingEmployees,
};

export const WITHHOLDING_OBLIGATIONS_DEPARTING_EMPLOYEES_CARD: InsightCardDefinition = {
  image: "/insights/withholding-obligations.jpg",
  alt: "Employer Withholding Obligations for Departing Employees",
  href: "/insights/hr/withholding-obligations-departing-employees",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Employer Withholding Obligations for Departing Employees", ko: "출국 직원에 대한 고용주의 지급 보류 의무" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.withholdingObligationsDepartingEmployees,
};

export const PLACEHOLDER_CARD: InsightCardDefinition = {
  image: "/home/sa-1.png",
  alt: "Coming soon",
  href: "#",
  tag: { en: "Coming soon", ko: "곧 공개" },
  title: { en: "Coming soon", ko: "곧 공개" },
  description: { en: "", ko: "" },
};

/** Order of cards on the insights page list. Add/remove/reorder here. */
export const TWO_TIERED_SALARIES_TAX_CARD: InsightCardDefinition = {
  image: "/insights/two-tiered-salaries-tax.jpg",
  alt: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
  href: "/insights/tax/two-tiered-salaries-tax",
  tag: { en: "Tax", ko: "세무" },
  title: { en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)", ko: "홍콩 이중 급여세 (2024/25)" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.twoTieredSalariesTax,
};

export const EMPLOYERS_RETURN_BIR56A_CARD: InsightCardDefinition = {
  image: "/insights/employers-return-bir56a.jpg",
  alt: "Annual Employer's Return (BIR56A)",
  href: "/insights/hr/employers-return-bir56a",
  tag: { en: "HR", ko: "인사" },
  title: { en: "Annual Employer's Return (BIR56A) in Hong Kong", ko: "연간 고용주 신고서 (BIR56A) 홍콩" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.employersReturnBir56a,
};

export const ANNUAL_RETURN_COMPANIES_REGISTRY_CARD: InsightCardDefinition = {
  image: "/insights/annual-return-companies-registry.jpg",
  alt: "Annual Return Filing with the Hong Kong Companies Registry (NAR1)",
  href: "/insights/corporate-service/annual-return-companies-registry",
  tag: { en: "Corporate Service", ko: "기업 서비스" },
  title: { en: "Annual Return Filing with the Hong Kong Companies Registry (NAR1)", ko: "홍콩 회사등기소에 제출하는 연간 보고서(NAR1)" },
  description: { en: "", ko: "" },
  subTags: subTagsByInsight.annualReturnCompaniesRegistry,
};

export const INSIGHT_LIST_CARDS: InsightCardDefinition[] = [
  FIVE_STEPS_CARD,
  INTRODUCTION_XERO_CARD,
  ACCOUNTING_KNOWLEDGE_CARD,
  AMENDMENT_CARD,
  INCORPORATION_CARD,
  CORPORATE_SECRETARY_CARD,
  DIVIDEND_LEGAL_CONSIDERATIONS_CARD,
  VAT_CARD,
  CORPORATE_TAX_CARD,
  DIGITAL_TRANSFORMATION_EFFICIENCY_CARD,
  DIGITAL_TRANSFORMATION_UX_CARD,
  BIG_DATA_DRIVEN_CARD,
  DIGITAL_TRANSFORMATION_TVP_CARD,
  LEGAL_CONSIDERATIONS_MA_CARD,
  TERMINATION_REGULATION_CARD,
  HYBRID_WORK_PERFORMANCE_CARD,
  LEAVE_POLICY_EXPLANATION_CARD,
  MANDATORY_PROVIDENT_FUND_CARD,
  IR56_CARD,
  TAX_CLEARANCE_DEPARTING_EMPLOYEES_CARD,
  WITHHOLDING_OBLIGATIONS_DEPARTING_EMPLOYEES_CARD,
  TWO_TIERED_SALARIES_TAX_CARD,
  EMPLOYERS_RETURN_BIR56A_CARD,
  ANNUAL_RETURN_COMPANIES_REGISTRY_CARD,
];
