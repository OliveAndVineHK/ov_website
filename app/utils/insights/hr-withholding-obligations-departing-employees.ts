export const hrWithholdingObligationsDepartingEmployeesTranslations = {
  heroTag: { en: "HR", ko: "인사" },
  heroTitle: {
    en: "Employer Withholding Obligations for Departing Employees",
    ko: "출국 직원에 대한 고용주의 지급 보류 의무",
  },
  inBrief: { en: "In brief", ko: "요약" },
  inBriefDescription: {
    en: "When an employee plans to leave Hong Kong permanently or for an extended period, employers must follow specific statutory procedures under Section 52 of the Inland Revenue Ordinance (Cap. 112). A key issue is the timing and release of final payments. This Insight explains the withholding obligation, the one-month rule, and practical safeguards for employers.",
    ko: "직원이 홍콩을 영구적으로 또는 장기간 떠날 계획인 경우, 고용주는 세무조례(Cap. 112) 제52조에 따른 특정 법적 절차를 따라야 합니다. 핵심 사안은 최종 지급금의 시기 및 지급입니다. 이 인사이트는 보류 의무, 1개월 규칙 및 고용주를 위한 실질적인 안전장치를 설명합니다.",
  },
  aiTaskAutomation: {
    en: "Employer Withholding Obligations for Departing Employees",
    ko: "출국 직원에 대한 고용주의 지급 보류 의무",
  },
  importanceOfAIDescription: {
    en: "When an employee plans to leave Hong Kong permanently or for an extended period, employers are required to follow specific statutory procedures under Section 52 of the Inland Revenue Ordinance (Cap. 112). A key issue for employers is the timing and release of final payments. This Insight explains the withholding obligation, the one-month rule, and practical safeguards for employers.",
    ko: "직원이 홍콩을 영구적으로 또는 장기간 떠날 계획인 경우, 고용주는 세무조례(Cap. 112) 제52조에 따른 특정 법적 절차를 따라야 합니다. 고용주에게 있어 핵심 사안은 최종 지급금의 시기 및 지급입니다. 이 인사이트는 보류 의무, 1개월 규칙 및 고용주를 위한 실질적인 안전장치를 설명합니다.",
  },

  // Section 1: Legal Framework
  section1Title: {
    en: "Legal Framework – Withholding Requirement Under Section 52(7)",
    ko: "법적 근거 – 제52조 제7항에 따른 보류 요건",
  },
  section1Description: {
    en: "Once Form IR56G is submitted, employers must withhold all remuneration payable to the departing employee. Payments may only be released when:",
    ko: "IR56G 양식이 제출되면, 고용주는 출국 직원에게 지급해야 할 모든 보수를 보류해야 합니다. 지급금은 다음의 경우에만 지급될 수 있습니다:",
  },
  section1Conditions: [
    {
      label: { en: "Section 52(7)(a)", ko: "제52조 제7항 (a)" },
      description: { en: "The IRD authorises payment; or", ko: "세무국이 지급을 승인한 경우; 또는" },
    },
    {
      label: { en: "Section 52(7)(b)", ko: "제52조 제7항 (b)" },
      description: { en: "One month has elapsed since IRD received IR56G", ko: "세무국이 IR56G를 수령한 후 1개월이 경과한 경우" },
    },
  ],
  section1Note: {
    en: "The two conditions operate independently.",
    ko: "두 조건은 독립적으로 작동합니다.",
  },

  // Section 2: Release of Payment
  section2Title: {
    en: "Release of Payment After One Month – Practical Considerations",
    ko: "1개월 후 지급금 지급 – 실질적 고려사항",
  },
  section2Description: {
    en: "Employers may legally release payments after 30 days, even without IRD notification, but only if they are certain that 30 full days have passed since IRD's receipt.",
    ko: "고용주는 세무국의 통보 없이도 30일 후에 합법적으로 지급금을 지급할 수 있지만, 세무국이 수령한 날로부터 정확히 30일이 경과했음을 확인한 경우에만 가능합니다.",
  },
  section2ReceiptDateTitle: {
    en: "Confirming IRD Receipt Date",
    ko: "세무국 수령 날짜 확인",
  },
  section2ReceiptDateDescription: {
    en: "The IRD does not issue formal acknowledgement for paper filings. Employers generally establish receipt date through:",
    ko: "세무국은 서면 신고에 대한 공식 확인을 발급하지 않습니다. 고용주는 일반적으로 다음을 통해 수령 날짜를 확인합니다:",
  },
  section2ReceiptMethods: [
    { en: "eTAX submission record (official timestamp)", ko: "eTAX 제출 기록 (공식 타임스탬프)" },
    { en: "Postal tracking records showing delivery to IRD", ko: "세무국에 배달된 것을 보여주는 우편 추적 기록" },
    { en: "Hand-delivery stamp (if filed at IRD's drop-box or counter)", ko: "직접 제출 도장 (세무국 투입함 또는 카운터에 제출한 경우)" },
  ],
  section2ReceiptNote: {
    en: "These records should be retained to evidence the 30-day period.",
    ko: "이러한 기록은 30일 기간을 증명하기 위해 보관해야 합니다.",
  },
  section2ClearanceTimelineTitle: {
    en: "Will IRD normally issue clearance within 30 days?",
    ko: "세무국이 30일 이내에 정산을 발급합니까?",
  },
  section2ClearanceTimelineDescription: {
    en: "Yes — in most straightforward cases, when IR56G is filed at least one month before departure, compensation details are correct, and no complex income items (e.g., share awards, equity vesting) require review. This general timing aligns with IRD practice and professional experience. However, delays can occur, particularly during peak season.",
    ko: "네 — 대부분의 단순한 경우에는 IR56G가 출국 최소 1개월 전에 제출되고, 보수 세부 사항이 정확하며, 복잡한 소득 항목(예: 주식 보상, 지분 귀속)이 검토를 필요로 하지 않을 때 가능합니다. 이 일반적인 타이밍은 세무국 관행 및 전문적 경험과 일치합니다. 그러나 특히 피크 시즌에는 지연이 발생할 수 있습니다.",
  },
  section2ExposureTitle: {
    en: "Employer Exposure",
    ko: "고용주 위험",
  },
  section2ExposureDescription: {
    en: "If the employer releases payment prematurely, or files IR56G late, Section 52(6) exposes the employer to personal liability for the employee's unpaid tax. This makes accurate tracking of the 30-day period essential.",
    ko: "고용주가 조기에 지급금을 지급하거나 IR56G를 늦게 제출하면, 제52조 제6항에 따라 고용주는 직원의 미납 세금에 대한 개인적 책임을 지게 됩니다. 따라서 30일 기간을 정확하게 추적하는 것이 필수적입니다.",
  },

  // Section 3: Practical Guidance
  section3Title: {
    en: "Practical Guidance for Employers",
    ko: "고용주를 위한 실질적 지침",
  },
  section3Items: [
    { en: "Retain proof of IR56G receipt date", ko: "IR56G 수령 날짜 증명 보관" },
    { en: "Do not release any remuneration prior to meeting one of the statutory release conditions", ko: "법적 석방 조건 중 하나를 충족하기 전에 보수를 지급하지 마십시오" },
    { en: "Ensure IR56G is filed on time to avoid employer liability", ko: "고용주 책임을 피하기 위해 IR56G를 제때 제출하십시오" },
    { en: "Prepare complete and accurate compensation data to avoid clearance delays", ko: "정산 지연을 피하기 위해 완전하고 정확한 보수 데이터를 준비하십시오" },
    { en: "Document the internal decision to release payments (after 30 days or after IRD approval)", ko: "지급금 지급 결정(30일 후 또는 세무국 승인 후)을 내부적으로 문서화하십시오" },
  ],

  // Section 4: After 30-day period
  section4Title: {
    en: "If IRD Issues Clearance After the 30-Day Period",
    ko: "세무국이 30일 기간 후에 정산을 발급하는 경우",
  },
  section4Description: {
    en: "If the employer has already released payment after Day 30, they are statutorily protected. A subsequently issued clearance letter does not revive liability, provided the employer filed IR56G correctly, counted the 30-day period accurately, and withheld payments during the 30-day window.",
    ko: "고용주가 이미 30일 후에 지급금을 지급했다면, 고용주는 법적으로 보호받습니다. 이후 발급된 정산 서한은 고용주가 IR56G를 올바르게 제출하고, 30일 기간을 정확하게 계산하며, 30일 기간 동안 지급금을 보류한 경우에는 책임을 되살리지 않습니다.",
  },

  // Section 5: Key Points
  section5Title: {
    en: "Key Points",
    ko: "핵심 사항",
  },
  section5Items: [
    { en: "Withholding is mandatory once IR56G is filed.", ko: "IR56G 제출 후에는 보류가 의무적입니다." },
    { en: "Payment can be released after IRD authorisation or after 30 days from IRD receipt.", ko: "지급금은 세무국의 승인 후 또는 세무국 수령 후 30일이 경과한 후에 지급될 수 있습니다." },
    { en: "IRD often issues clearance within 30 days if filings are correct and timely.", ko: "세무국은 신고가 정확하고 제때 이루어진 경우 30일 이내에 정산을 발급하는 경우가 많습니다." },
    { en: "Employers must verify IRD receipt date due to lack of formal acknowledgement.", ko: "공식 확인이 없으므로 고용주는 세무국 수령 날짜를 확인해야 합니다." },
    { en: "Failure to give proper notice can cause employer personal tax liability.", ko: "적절한 통보를 하지 않으면 고용주의 개인적 세금 책임이 발생할 수 있습니다." },
  ],

  frequentlyAskedQuestions: {
    en: "Frequently Asked Questions (Q&A)",
    ko: "자주 묻는 질문 (Q&A)",
  },
  faqItems: [
    {
      question: { en: "Q1: When does the employer's withholding obligation begin?", ko: "Q1: 고용주의 보류 의무는 언제 시작됩니까?" },
      answer: { en: "The obligation begins from the date IR56G is submitted to the IRD — not from the date the employee gives notice. Filing triggers the statutory withholding requirement immediately.", ko: "의무는 직원이 통보한 날이 아닌 IR56G가 세무국에 제출된 날부터 시작됩니다. 제출 즉시 법적 보류 요건이 발동됩니다." },
    },
    {
      question: { en: "Q2: How does the employer confirm the IRD's receipt date for IR56G?", ko: "Q2: 고용주는 IR56G에 대한 세무국의 수령 날짜를 어떻게 확인합니까?" },
      answer: { en: "The IRD does not issue formal acknowledgement for paper filings. Employers should use eTAX submission timestamps, postal tracking records showing delivery, or a hand-delivery stamp as evidence of the receipt date.", ko: "세무국은 서면 신고에 대한 공식 확인을 발급하지 않습니다. 고용주는 eTAX 제출 타임스탬프, 배달을 보여주는 우편 추적 기록, 또는 직접 제출 도장을 수령 날짜의 증거로 사용해야 합니다." },
    },
    {
      question: { en: "Q3: What is the employer's liability if payment is released too early?", ko: "Q3: 지급금을 너무 일찍 지급하면 고용주의 책임은 무엇입니까?" },
      answer: { en: "Under Section 52(6) of the IRO, the employer becomes personally liable for the employee's unpaid salaries tax. This liability attaches regardless of whether the employer was aware of the outstanding tax amount.", ko: "세무조례 제52조 제6항에 따라, 고용주는 직원의 미납 소득세에 대해 개인적으로 책임을 지게 됩니다. 이 책임은 고용주가 미납 세액을 알고 있었는지 여부와 관계없이 발생합니다." },
    },
    {
      question: { en: "Q4: If the IRD issues clearance after the employer already released payment on Day 30, is the employer still protected?", ko: "Q4: 고용주가 이미 30일째에 지급금을 지급한 후 세무국이 정산을 발급하면 고용주는 여전히 보호받습니까?" },
      answer: { en: "Yes. Provided the employer filed IR56G correctly, tracked the 30-day receipt window accurately, and withheld payments throughout that period, the employer is fully protected under Section 52(7)(b). A later-issued clearance letter does not revive liability.", ko: "네. 고용주가 IR56G를 올바르게 제출하고, 30일 수령 기간을 정확하게 추적하며, 그 기간 동안 지급금을 보류한 경우, 고용주는 제52조 제7항 (b)에 따라 완전히 보호받습니다. 이후 발급된 정산 서한은 책임을 되살리지 않습니다." },
    },
    {
      question: { en: "Q5: Does the withholding obligation apply to all types of payments, including bonuses?", ko: "Q5: 보류 의무가 보너스를 포함한 모든 유형의 지급금에 적용됩니까?" },
      answer: { en: "Yes. The obligation covers all remuneration including salary, bonus, commission, leave pay, payment in lieu of notice, and any other termination entitlements. There are no exemptions for specific payment types.", ko: "네. 의무는 급여, 보너스, 수수료, 휴가 수당, 예고 대신 지급금 및 기타 퇴직 급여를 포함한 모든 보수에 적용됩니다. 특정 지급 유형에 대한 면제는 없습니다." },
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
    en: "Understanding withholding obligations is essential for employers navigating employee departures from Hong Kong. By filing IR56G promptly, tracking the 30-day receipt window carefully, and documenting all release decisions, employers can fulfil their legal duties and avoid personal liability under the Inland Revenue Ordinance.",
    ko: "보류 의무를 이해하는 것은 홍콩에서 직원 출국을 처리하는 고용주에게 필수적입니다. IR56G를 신속하게 제출하고, 30일 수령 기간을 신중하게 추적하며, 모든 지급 결정을 문서화함으로써 고용주는 법적 의무를 이행하고 세무조례에 따른 개인적 책임을 피할 수 있습니다.",
  },
};
