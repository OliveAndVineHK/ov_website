export const taxTwoTieredSalariesTaxTranslations = {
  heroTag: { en: "Tax", ko: "세무" },
  heroTitle: {
    en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
    ko: "홍콩 이중 소득세 (2024/25)",
  },
  inBrief: { en: "In brief", ko: "요약" },
  inBriefDescription: {
    en: "Starting from the 2024/25 year of assessment (April 1, 2024), Hong Kong introduced a two-tiered standard rate system for Salaries Tax. High-income earners whose net income exceeds HKD 5 million now face a higher standard rate of 16%, while the first HKD 5 million continues to be taxed at 15%. This change affects approximately 12,000 taxpayers and reflects a targeted adjustment to Hong Kong's otherwise simple and flat tax system.",
    ko: "2024/25 과세연도(2024년 4월 1일)부터 홍콩은 소득세에 대한 이중 표준세율 제도를 도입했습니다. 순소득이 500만 홍콩달러를 초과하는 고소득자는 16%의 높은 표준세율을 적용받으며, 첫 500만 홍콩달러에 대해서는 기존과 같이 15%가 적용됩니다. 이 변경은 약 12,000명의 납세자에게 영향을 미치며, 홍콩의 단순하고 낮은 세제에 대한 표적 조정을 반영합니다.",
  },
  aiTaskAutomation: {
    en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
    ko: "홍콩 이중 소득세 (2024/25)",
  },
  importanceOfAIDescription: {
    en: "Salaries Tax is levied under the Inland Revenue Ordinance (Cap. 112) on income arising from any office, employment, or pension in Hong Kong. Hong Kong operates on a territorial basis — only income sourced from Hong Kong is taxable, regardless of where it is paid or where the employer is incorporated. Taxable income includes salaries, wages, directors' fees, commissions, bonuses, non-cash benefits, share awards and options upon vesting or exercise, and pension income. Exempt income includes severance payments and long-service payments under the Employment Ordinance (Cap. 57).",
    ko: "소득세는 세무조례(Cap. 112)에 따라 홍콩에서 발생한 모든 직위, 고용 또는 연금 소득에 부과됩니다. 홍콩은 속지주의 원칙을 채택하고 있어, 지급 장소나 고용주의 설립지와 관계없이 홍콩에서 발생한 소득만 과세 대상입니다. 과세 소득에는 급여, 임금, 이사 보수, 수수료, 보너스, 비현금 혜택, 귀속 또는 행사 시 주식 보상 및 옵션, 연금 소득이 포함됩니다. 고용조례(Cap. 57)에 따른 해고 수당과 장기근속 수당은 면세 소득에 해당합니다.",
  },

  // Section 1 — How Salaries Tax is Calculated
  section1Title: {
    en: "How Salaries Tax is Calculated",
    ko: "소득세 계산 방법",
  },
  section1Description: {
    en: "Hong Kong uses a \"lower of two methods\" approach. The IRD calculates your tax under both methods and charges the lower amount.",
    ko: "홍콩은 '두 가지 방법 중 낮은 금액' 방식을 사용합니다. 세무국은 두 가지 방법으로 세금을 계산한 후 낮은 금액을 부과합니다.",
  },
  section1Method1Title: {
    en: "Method 1 — Progressive Rates (on net chargeable income = income − deductions − allowances)",
    ko: "방법 1 — 누진세율 (순과세소득 = 소득 − 공제 − 인적공제 적용)",
  },
  section1ProgressiveRates: [
    { label: { en: "First HKD 50,000", ko: "첫 50,000 홍콩달러" }, rate: { en: "2%", ko: "2%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 50,000 홍콩달러" }, rate: { en: "6%", ko: "6%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 50,000 홍콩달러" }, rate: { en: "10%", ko: "10%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 50,000 홍콩달러" }, rate: { en: "14%", ko: "14%" } },
    { label: { en: "Remainder", ko: "나머지" }, rate: { en: "17%", ko: "17%" } },
  ],
  section1Method2Title: {
    en: "Method 2 — Standard Rate (on net income = income − deductions, before allowances)",
    ko: "방법 2 — 표준세율 (순소득 = 소득 − 공제, 인적공제 전)",
  },
  section1StandardRates: [
    { label: { en: "First HKD 5,000,000", ko: "첫 5,000,000 홍콩달러" }, rate: { en: "15%", ko: "15%" } },
    { label: { en: "Above HKD 5,000,000 (from 2024/25 onwards)", ko: "5,000,000 홍콩달러 초과 (2024/25부터)" }, rate: { en: "16%", ko: "16%" } },
  ],
  section1Note: {
    en: "The standard rate acts as a cap: high earners who claim few allowances pay at standard rate. Lower-income taxpayers almost always benefit more from progressive rates.",
    ko: "표준세율은 상한선 역할을 합니다. 인적공제를 거의 신청하지 않는 고소득자는 표준세율을 적용받습니다. 저소득 납세자는 거의 항상 누진세율이 더 유리합니다.",
  },

  // Section 2 — The Two-Tiered Change
  section2Title: {
    en: "The New Two-Tiered Standard Rate (2024/25 Change)",
    ko: "새로운 이중 표준세율 (2024/25 변경 사항)",
  },
  section2Description: {
    en: "Prior to 2024/25, a flat 15% standard rate applied to all taxpayers regardless of income level. The 2024/25 Budget introduced a two-tiered regime targeting the highest earners.",
    ko: "2024/25년 이전에는 소득 수준에 관계없이 모든 납세자에게 15%의 단일 표준세율이 적용되었습니다. 2024/25년 예산안은 최고 소득자를 대상으로 한 이중 세율 제도를 도입했습니다.",
  },
  section2WhoAffectedTitle: {
    en: "Who Is Affected?",
    ko: "누가 영향을 받습니까?",
  },
  section2WhoAffectedItems: [
    {
      en: "The 16% rate applies only to the portion of net income exceeding HKD 5 million.",
      ko: "16% 세율은 순소득 500만 홍콩달러를 초과하는 부분에만 적용됩니다.",
    },
    {
      en: "A taxpayer with HKD 5.5 million net income pays 15% on the first HKD 5M and 16% on the remaining HKD 500,000.",
      ko: "순소득이 550만 홍콩달러인 납세자는 첫 500만 홍콩달러에 15%, 나머지 50만 홍콩달러에 16%를 납부합니다.",
    },
    {
      en: "Approximately 12,000 taxpayers (0.6% of the total taxpayer base) are affected.",
      ko: "약 12,000명의 납세자(전체 납세자의 0.6%)가 영향을 받습니다.",
    },
    {
      en: "The government expects to raise an additional HKD 910 million per year from this measure.",
      ko: "정부는 이 조치를 통해 연간 약 9억 1,000만 홍콩달러의 추가 세수를 기대합니다.",
    },
  ],
  section2EmployerTitle: {
    en: "Why This Matters for Employers",
    ko: "고용주에게 중요한 이유",
  },
  section2EmployerItems: [
    {
      en: "Accurately reporting all remuneration paid (cash and non-cash) via the annual Employer's Return (BIR56A / IR56B).",
      ko: "연간 고용주 신고서(BIR56A / IR56B)를 통해 지급된 모든 보수(현금 및 비현금)를 정확하게 신고합니다.",
    },
    {
      en: "Reporting share awards and options — commonly the income items that push executives above the HKD 5M threshold.",
      ko: "주식 보상 및 옵션 신고 — 임원들이 500만 홍콩달러 기준을 초과하는 일반적인 소득 항목입니다.",
    },
    {
      en: "Briefing affected high-income employees (e.g. expatriate executives) on the impact on provisional tax calculations.",
      ko: "영향을 받는 고소득 직원(예: 주재원 임원)에게 예정세 계산에 미치는 영향을 설명합니다.",
    },
  ],

  // Section 3 — Deductions and Allowances
  section3Title: {
    en: "Key Deductions and Allowances",
    ko: "주요 공제 및 인적공제",
  },
  section3DeductionsTitle: {
    en: "Deductions (applied before standard rate calculation):",
    ko: "공제 항목 (표준세율 계산 전 적용):",
  },
  section3DeductionItems: [
    { en: "Mandatory MPF contributions (up to HKD 18,000/year per employee)", ko: "의무적 강제공제기금(MPF) 기여금 (직원 1인당 연간 최대 18,000 홍콩달러)" },
    { en: "Self-education expenses (up to HKD 100,000/year)", ko: "자기계발 비용 (연간 최대 100,000 홍콩달러)" },
    { en: "Home loan interest (up to HKD 100,000/year, max 20 years of assessment)", ko: "주택 담보 대출 이자 (연간 최대 100,000 홍콩달러, 최대 20 과세연도)" },
    { en: "Domestic rent (up to HKD 100,000/year, subject to qualifying conditions)", ko: "임대료 공제 (연간 최대 100,000 홍콩달러, 자격 조건 충족 시)" },
    { en: "Approved charitable donations (up to 35% of assessable income)", ko: "승인된 자선 기부금 (과세 소득의 최대 35%)" },
    { en: "Elderly residential care expenses", ko: "노인 주거 돌봄 비용" },
    { en: "Assisted reproductive services (up to HKD 100,000/year; new from 2024/25 — eligible for infertile couples and certain medical cases under Cap. 561)", ko: "보조 생식 서비스 비용 (연간 최대 100,000 홍콩달러; 2024/25부터 신설 — Cap. 561에 따른 불임 부부 및 특정 의료 사례 적용 가능)" },
  ],
  section3AllowancesTitle: {
    en: "Personal Allowances (applied only under progressive rate method):",
    ko: "인적공제 (누진세율 방법에만 적용):",
  },
  section3AllowanceItems: [
    { en: "Basic allowance: HKD 132,000", ko: "기본 인적공제: 132,000 홍콩달러" },
    { en: "Married person's allowance: HKD 264,000", ko: "기혼자 인적공제: 264,000 홍콩달러" },
    { en: "Child allowance: HKD 130,000 per child", ko: "자녀 인적공제: 자녀 1인당 130,000 홍콩달러" },
    { en: "Dependent parent/grandparent allowance: HKD 25,000–HKD 50,000 per person", ko: "부양 부모/조부모 인적공제: 1인당 25,000–50,000 홍콩달러" },
  ],

  // Section 4 — Employer Reporting Obligations
  section4Title: {
    en: "Employer Reporting Obligations",
    ko: "고용주 신고 의무",
  },
  section4Description: {
    en: "Employers play a central role in the salaries tax system. Key obligations under IRO Cap. 112, s.52:",
    ko: "고용주는 소득세 제도에서 중심적인 역할을 담당합니다. 세무조례 Cap. 112, 제52조에 따른 주요 의무:",
  },
  section4Items: [
    { en: "BIR56A + IR56B — Annual Employer's Return, issued by IRD on April 1 each year; must be filed within 1 month", ko: "BIR56A + IR56B — 연간 고용주 신고서, 매년 4월 1일 세무국 발급; 1개월 이내 제출 필요" },
    { en: "IR56E — New employee notification, filed within 3 months of hire", ko: "IR56E — 신규 직원 통보, 채용 후 3개월 이내 제출" },
    { en: "IR56F — Termination notice, filed 1 month before termination date", ko: "IR56F — 고용 종료 통보, 종료일 1개월 전 제출" },
    { en: "IR56G — Departure notice for employees leaving HK, filed 1 month before departure", ko: "IR56G — 홍콩을 떠나는 직원의 출국 통보, 출국 1개월 전 제출" },
    { en: "Record keeping — All payroll records must be retained for at least 7 years (IRO s.51)", ko: "기록 보관 — 모든 급여 기록은 최소 7년간 보관 필요 (세무조례 제51조)" },
  ],
  section4ExposureTitle: {
    en: "Employer Exposure",
    ko: "고용주 위험",
  },
  section4ExposureDescription: {
    en: "Non-compliance may result in penalties under IRO s.80 and s.82A. Employers who fail to notify the IRD of a departing employee risk personal liability for the employee's unpaid tax under IRO s.52(6).",
    ko: "미준수 시 세무조례 제80조 및 제82A조에 따른 벌금이 부과될 수 있습니다. 출국하는 직원을 세무국에 신고하지 않은 고용주는 세무조례 제52조 제6항에 따라 직원의 미납 세금에 대한 개인 책임을 질 수 있습니다.",
  },

  frequentlyAskedQuestions: {
    en: "Frequently Asked Questions (Q&A)",
    ko: "자주 묻는 질문 (Q&A)",
  },
  faqItems: [
    {
      question: { en: "Q1: Does the new 16% rate mean I will pay more tax overall?", ko: "Q1: 새로운 16% 세율이 적용되면 세금을 더 많이 납부해야 합니까?" },
      answer: { en: "Not necessarily. You only pay the 16% rate on the portion of net income above HKD 5 million. You also pay whichever is lower between the progressive and standard rate calculations — if your progressive tax comes out lower, you still pay that amount regardless of the standard rate.", ko: "반드시 그렇지는 않습니다. 16% 세율은 순소득 500만 홍콩달러를 초과하는 부분에만 적용됩니다. 또한 누진세율과 표준세율 계산 중 낮은 금액을 납부하므로, 누진세율 계산 결과가 더 낮으면 표준세율과 관계없이 그 금액을 납부합니다." },
    },
    {
      question: { en: "Q2: What counts as \"net income\" for the standard rate calculation?", ko: "Q2: 표준세율 계산에서 '순소득'은 무엇을 의미합니까?" },
      answer: { en: "Net income for standard rate purposes is your total assessable income minus allowable deductions (MPF, rent, home loan interest, etc.) but before personal allowances such as the basic allowance or dependent parent allowances. Personal allowances are only relevant under the progressive rate calculation.", ko: "표준세율 목적의 순소득은 총 과세 소득에서 허용 공제(MPF, 임대료, 주택 담보 대출 이자 등)를 차감한 금액이며, 기본 인적공제나 부양 부모 인적공제 등의 인적공제는 포함되지 않습니다. 인적공제는 누진세율 계산에만 적용됩니다." },
    },
    {
      question: { en: "Q3: I receive share awards from my employer. When are they taxable?", ko: "Q3: 고용주로부터 주식 보상을 받습니다. 언제 과세됩니까?" },
      answer: { en: "Share awards are generally taxable as employment income at the time they vest — i.e. when the restriction on disposal is lifted. Share options are typically taxable on exercise. These amounts must be reported by your employer on Form IR56B and will form part of your assessable income for the year they are received.", ko: "주식 보상은 일반적으로 귀속 시점, 즉 처분 제한이 해제될 때 고용 소득으로 과세됩니다. 주식 옵션은 일반적으로 행사 시 과세됩니다. 이러한 금액은 고용주가 IR56B 양식에 신고해야 하며, 수령 연도의 과세 소득에 포함됩니다." },
    },
    {
      question: { en: "Q4: As an employer, do I need to do anything differently because of the new two-tiered rate?", ko: "Q4: 고용주로서 새로운 이중 세율 때문에 다르게 해야 할 일이 있습니까?" },
      answer: { en: "Your core reporting obligations remain unchanged — you still file BIR56A and IR56B annually. However, for employees whose total remuneration (including share awards, bonuses, and non-cash benefits) may approach or exceed HKD 5 million, ensure all such items are reported accurately and completely. Incomplete reporting can lead to penalties under IRO s.80.", ko: "핵심 신고 의무는 변경되지 않았습니다 — 여전히 BIR56A와 IR56B를 연간 제출합니다. 그러나 주식 보상, 보너스, 비현금 혜택을 포함한 총 보수가 500만 홍콩달러에 근접하거나 초과할 수 있는 직원의 경우, 모든 항목이 정확하고 완전하게 신고되도록 해야 합니다. 불완전한 신고는 세무조례 제80조에 따른 벌금으로 이어질 수 있습니다." },
    },
    {
      question: { en: "Q5: What is provisional salaries tax, and how is it affected?", ko: "Q5: 예정 소득세란 무엇이며, 어떻게 영향을 받습니까?" },
      answer: { en: "Provisional salaries tax is an advance payment estimated by IRD based on the prior year's assessment. For affected employees, the new 16% rate will flow through to future provisional tax calculations. Employees may apply to reduce provisional tax if their income for the year is expected to be lower — but this requires timely application and supporting documentation.", ko: "예정 소득세는 전년도 과세 평가를 기반으로 세무국이 추정하는 선납금입니다. 영향을 받는 직원의 경우, 새로운 16% 세율이 향후 예정세 계산에 반영됩니다. 해당 연도 소득이 낮을 것으로 예상되는 경우 예정세 감액을 신청할 수 있지만, 이는 적시 신청과 지원 서류가 필요합니다." },
    },
  ],

  contactInformationDisclaimer: {
    en: "This material covers general information and does not provide solutions for any specific issues of any company or individual. Differences in legal terms may exist due to the translation into Korean to aid understanding. Olive and Vine does not assume any legal responsibility or guarantee the accuracy, completeness, or usefulness of this information. This material cannot replace legal or consulting advice; please consult with a professional if necessary.",
    ko: "이 자료는 일반적인 정보로서 특정 회사 또는 개인의 문제에 대한 해결책을 제공하지 않습니다. 이해를 돕기 위해 한국어로 번역된 일부 내용은 정확한 법률 용어와 다를 수 있습니다. Olive and Vine은 이 정보의 정확성, 완전성 또는 유용성에 대한 법적 보장을 제공하지 않습니다. 본 자료는 법률 또는 컨설팅 자문을 대체하지 않으며, 필요시 전문가와 상담하시기 바랍니다.",
  },
  conclusionTitle: {
    en: "Conclusion",
    ko: "결론",
  },
  conclusionDescription: {
    en: "The two-tiered standard rate is a targeted measure affecting a small percentage of HK's taxpayer base, but its implications for employers — especially those managing expatriate or executive payroll — are real. Accurate reporting of all remuneration forms, particularly share-based compensation, is more important than ever. If you are unsure whether your reporting obligations are being met, or how the new rate affects your tax position, Olive & Vine's tax team is ready to assist.",
    ko: "이중 표준세율은 홍콩 납세자의 소수에게만 영향을 미치는 표적 조치이지만, 특히 주재원이나 임원 급여를 관리하는 고용주에게는 실질적인 영향이 있습니다. 주식 기반 보상을 포함한 모든 보수 양식의 정확한 신고가 그 어느 때보다 중요합니다. 신고 의무 이행 여부나 새로운 세율이 세금 포지션에 미치는 영향이 불확실하다면, Olive & Vine의 세무팀이 도움을 드릴 준비가 되어 있습니다.",
  },
};
