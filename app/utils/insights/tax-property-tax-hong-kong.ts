export const taxPropertyTaxHongKongTranslations = {
  heroTag: { en: "Tax", ko: "세무" },
  heroTitle: {
    en: "Property Tax in Hong Kong: How It Is Calculated and How It Interacts with Profits Tax",
    ko: "홍콩의 재산세: 산정 방식과 법인세와의 관계",
  },
  inBrief: { en: "In brief", ko: "요약" },
  inBriefDescription: {
    en: "Property tax is a tax on rental income from land and buildings in Hong Kong. This guide explains who is liable, how the net assessable value and the 15% charge are worked out, how to report and pay, and how property tax interacts with profits tax for companies and with personal assessment for individuals under the Inland Revenue Ordinance (Cap. 112).",
    ko: "재산세는 홍콩 내 토지 및 건물의 임대 소득에 부과되는 세금입니다. 이 안내서는 과세 대상자, 과세 순가치(NAV)와 15% 세율의 산정 방법, 신고 및 납부 절차, 그리고 세무조례(Cap. 112)에 따라 법인의 경우 법인세와, 개인의 경우 개인 과세(Personal Assessment)와 재산세가 어떻게 연계되는지에 대해 설명합니다.",
  },
  aiTaskAutomation: {
    en: "Property Tax in Hong Kong",
    ko: "홍콩의 재산세",
  },
  importanceOfAIDescription: {
    en: "Property tax is one of Hong Kong's three direct taxes, alongside salaries tax and profits tax. It is charged under section 5(1) of the Inland Revenue Ordinance (Cap. 112) on the owners of land or buildings in Hong Kong who let their property out for rent or other consideration. The tax is assessed for each year of assessment, which runs from 1 April to 31 March, at the standard rate — currently 15%. Importantly, property tax is charged not on the gross rent received but on the net assessable value, a smaller figure arrived at after specific statutory deductions.",
    ko: "재산세는 소득세 및 법인세와 함께 홍콩의 3대 직접세 중 하나입니다. 이 세금은 세무조례(Cap. 112) 제5조 제1항에 따라, 홍콩 내 토지 또는 건물의 소유자가 해당 부동산을 임대하거나 기타 대가를 받고 사용하게 하는 경우 부과됩니다. 이 세금은 매년 4월 1일부터 다음 해 3월 31일까지의 과세 연도별로 표준 세율(현재 15%)을 적용하여 산정됩니다. 중요한 점은, 재산세가 수취한 총 임대료가 아니라 특정 법정 공제를 적용하여 산출된 더 낮은 금액인 과세 순가치(NAV)를 기준으로 부과된다는 것입니다.",
  },

  // Section 1 — What Is Property Tax? (intro gated by this heading)
  section1Title: {
    en: "What Is Property Tax?",
    ko: "재산세란 무엇인가요?",
  },

  // Section 2 — How Property Tax Is Calculated
  section2Title: {
    en: "How Property Tax Is Calculated",
    ko: "재산세 산정 방법",
  },
  section2AssessableValueTitle: {
    en: "Step 1: Determine the Assessable Value",
    ko: "1단계: 과세 기준가액(Assessable Value) 산정",
  },
  section2AssessableValueDescription: {
    en: "Start with the assessable value — the rent and related charges receivable for the year, less any rent that has genuinely become irrecoverable. Assessable value is broader than the monthly rent: it also captures licence fees, service charges and management fees paid to the owner, owner's expenses borne by the tenant, and lump-sum premiums spread over the lease term.",
    ko: "먼저 과세 기준가액, 즉 해당 연도에 수취할 임대료 및 관련 비용을 산정하고, 실제로 회수할 수 없게 된 임대료를 차감합니다. 과세 기준가액은 월 임대료보다 더 광범위합니다. 여기에는 사용료, 소유주에게 지급하는 관리비, 임차인이 부담하는 소유주의 비용, 그리고 임대 기간에 걸쳐 분할 적용되는 일시불 프리미엄도 포함됩니다.",
  },
  section2DeductionsTitle: {
    en: "Step 2: Deduct Rates and the 20% Allowance",
    ko: "2단계: 지방세(rates)와 20% 공제액 차감",
  },
  section2DeductionsDescription: {
    en: "From the assessable value, deduct the rates paid by the owner (only where the owner, rather than the tenant, actually pays them). Then deduct a 20% statutory allowance for repairs and outgoings, which the Inland Revenue Department grants automatically. The result is the net assessable value (NAV).",
    ko: "과세 기준가액에서 소유주가 납부한 지방세(rates)를 차감합니다(단, 임차인이 아닌 소유주가 실제로 납부한 경우에 한함). 그런 다음 세무국이 자동으로 인정해 주는 수리비 및 제반 비용에 대한 20%의 법정 공제액을 차감합니다. 그 결과로 산출된 금액이 과세 순가치(NAV)입니다.",
  },
  section2RateTitle: {
    en: "Step 3: Apply the 15% Standard Rate",
    ko: "3단계: 15% 표준 세율 적용",
  },
  section2RateDescription: {
    en: "Property tax is 15% of the net assessable value. This standard rate has applied from the year of assessment 2008/09 onwards. Because the 20% allowance is given automatically, the effective rate on assessable value (after rates) works out to 12%.",
    ko: "재산세는 과세 순가치(NAV)의 15%입니다. 이 표준 세율은 2008/09 과세 연도부터 적용되어 왔습니다. 20%의 공제가 자동으로 적용되므로, 과세 기준가액(지방세 차감 후)에 대한 실효 세율은 12%가 됩니다.",
  },
  section2ExampleTitle: {
    en: "Worked Example",
    ko: "계산 예시",
  },
  section2ExampleIntro: {
    en: "Take a flat let for HK$10,000 a month where the tenant pays the rates:",
    ko: "월 임대료가 10,000홍콩달러이고 지방세(rates)는 임차인이 부담하는 아파트를 예로 들어 보겠습니다:",
  },
  section2ExampleTableRows: [
    {
      item: { en: "Annual rental income (HK$10,000 × 12)", ko: "연간 임대 수입 (10,000홍콩달러 × 12)" },
      amount: "HK$120,000",
    },
    {
      item: { en: "Less: 20% statutory allowance", ko: "차감: 20% 법정 공제액" },
      amount: "(HK$24,000)",
    },
    {
      item: { en: "Net assessable value (NAV)", ko: "과세 순가치(NAV)" },
      amount: "HK$96,000",
    },
    {
      item: { en: "Property tax at 15%", ko: "재산세 (15%)" },
      amount: "HK$14,400",
    },
  ],

  // Section 3 — What Counts as Rental Income — and What You Cannot Deduct
  section3Title: {
    en: "What Counts as Rental Income — and What You Cannot Deduct",
    ko: "임대 소득으로 인정되는 항목과 공제할 수 없는 항목",
  },
  section3IntroDescription: {
    en: "The assessable value includes more than the basic rent. Owners must report:",
    ko: "과세 기준가액에는 기본 임대료 외에도 다른 항목이 포함됩니다. 소유주는 다음 사항을 신고해야 합니다:",
  },
  section3Items: [
    {
      en: "Rent and any licence fees for the use of the premises.",
      ko: "임대료 및 해당 부동산 사용에 따른 모든 사용료.",
    },
    {
      en: "Service charges and management fees that are paid to the owner.",
      ko: "소유주에게 지급되는 서비스 요금 및 관리비.",
    },
    {
      en: "Owner's expenses — such as rates or repairs — that the tenant has agreed to bear.",
      ko: "임차인이 부담하기로 합의한 소유주의 비용(예: 지방세 또는 수리비 등).",
    },
    {
      en: "Lump-sum premiums, spread into equal monthly instalments over the lease term or three years, whichever is shorter.",
      ko: "일시불 프리미엄은 임대 기간 또는 3년 중 더 짧은 기간 동안 매월 균등하게 분할하여 산입됩니다.",
    },
    {
      en: "Rent previously written off as irrecoverable but later recovered, which is taxed as income in the year of recovery.",
      ko: "이전에 회수 불가능한 것으로 처리되어 상각되었으나 나중에 회수된 임대료는, 회수된 연도에 소득으로 과세됩니다.",
    },
  ],
  section3NotDeductibleTitle: {
    en: "Expenses You Cannot Claim Separately",
    ko: "별도로 공제받을 수 없는 비용",
  },
  section3NotDeductibleDescription: {
    en: "The 20% allowance is a fixed deduction given in lieu of actual outgoings, so you cannot also claim the real cost of those outgoings. Government rent, building management fees, decoration and repair expenses are not separately deductible. Most importantly, mortgage loan interest is not deductible under property tax at all — a point that drives the decision on whether to elect personal assessment.",
    ko: "20% 공제액은 실제 지출액을 대신하여 제공되는 고정 공제액이므로, 해당 지출의 실제 비용을 별도로 청구할 수는 없습니다. 정부 임대료(Government rent), 건물 관리비, 인테리어 및 수리 비용은 별도로 공제받을 수 없습니다. 가장 중요한 점은, 재산세에서는 주택담보대출 이자를 전혀 공제받을 수 없다는 것입니다. 이는 개인 과세(Personal Assessment) 방식을 선택할지 여부를 결정하는 데 중요한 요소입니다.",
  },

  // Section 4 — Who Pays and How to Report
  section4Title: {
    en: "Who Pays and How to Report",
    ko: "누가 납부하며 어떻게 신고하는가",
  },
  section4SoleTitle: {
    en: "Sole Owners (Individuals)",
    ko: "단독 소유주 (개인)",
  },
  section4SoleDescription: {
    en: "An individual who owns a property alone reports the rental income in the Tax Return — Individuals (BIR60), rather than on a separate property tax return.",
    ko: "부동산을 단독으로 소유한 개인은 별도의 재산세 신고서가 아닌 개인 소득세 신고서(BIR60)에 임대 소득을 신고합니다.",
  },
  section4JointTitle: {
    en: "Jointly Owned or Co-owned Property",
    ko: "공동 소유 또는 공유 부동산",
  },
  section4JointDescription: {
    en: "Where individuals own a property jointly or in common, the rent is reported on a Property Tax Return for jointly owned property (BIR57). Any one owner may complete and sign the return, but each owner remains individually responsible for reporting and for the tax.",
    ko: "개인이 부동산을 공동으로 소유하거나 공유하는 경우, 임대료는 공동 소유 부동산용 재산세 신고서(BIR57)에 기재합니다. 소유주 중 한 명이 신고서를 작성하고 서명할 수 있으나, 신고 의무와 세금 납부의 책임은 각 소유주에게 개별적으로 있습니다.",
  },
  section4CorporateTitle: {
    en: "Corporations and Bodies of Persons",
    ko: "법인 및 단체",
  },
  section4CorporateDescription: {
    en: "Where the owner is a corporation or a body of persons, the Property Tax Return BIR58 is used to report the rental income.",
    ko: "소유주가 법인이나 단체인 경우, 임대 소득을 신고할 때는 재산세 신고서 BIR58을 사용합니다.",
  },
  section4NotifyTitle: {
    en: "Notifying Chargeability and Keeping Records",
    ko: "과세 대상 통지 및 기록 보관",
  },
  section4NotifyDescription: {
    en: "If you have rental income but have not been issued with a return, section 51(2) requires you to notify the Inland Revenue Department in writing that you are chargeable — no later than four months after the end of the year of assessment, that is, by 31 July. Owners should also keep sufficient rent records, such as lease agreements and receipts, for seven years.",
    ko: "임대 소득이 있으나 신고서를 발급받지 못한 경우, 세무조례 제51조 제2항에 따라 과세 대상자임을 세무국에 서면으로 통지해야 합니다. 이 통지는 과세 연도가 종료된 날로부터 4개월 이내, 즉 7월 31일까지 이루어져야 합니다. 또한 소유주는 임대차 계약서 및 영수증 등 충분한 임대 기록을 7년간 보관해야 합니다.",
  },
  section4ProvisionalTitle: {
    en: "Provisional Property Tax",
    ko: "예정 재산세 (Provisional Property Tax)",
  },
  section4ProvisionalDescription: {
    en: "In addition to the final tax for a year, the Department charges provisional property tax as an advance payment estimated on the current year's net assessable value. The provisional tax paid is set off against the final assessment for the same year, with any excess applied to the next year. If the net assessable value is likely to fall substantially, the property has ceased to be let, or ownership has ended, an application can be made to hold over the provisional tax.",
    ko: "해당 연도의 최종 세액 외에도, 세무국은 당해 연도의 과세 순가치(NAV)를 바탕으로 추산한 선납금 형태의 예정 재산세를 부과합니다. 납부한 예정세는 같은 연도의 최종 과세액에서 공제되며, 초과분은 다음 해로 이월됩니다. 과세 순가치가 상당히 하락할 것으로 예상되거나, 부동산의 임대가 종료되었거나, 소유권이 소멸된 경우에는 예정세 납부 유예를 신청할 수 있습니다.",
  },

  // Section 5 — Property Tax, Profits Tax, and Personal Assessment
  section5Title: {
    en: "Property Tax, Profits Tax, and Personal Assessment",
    ko: "재산세, 법인세 및 개인 과세(Personal Assessment)",
  },
  section5IntroDescription: {
    en: "The same rental income can fall within both property tax and profits tax, but Hong Kong's system ensures it is not taxed twice. How the overlap is resolved depends on whether the owner is a company carrying on business or an individual.",
    ko: "동일한 임대 소득이 재산세와 법인세의 과세 대상이 될 수 있지만, 홍콩의 제도에서는 이중 과세가 발생하지 않도록 보장됩니다. 이러한 중복 과세 문제가 어떻게 해결되는지는 소유주가 사업을 영위하는 법인인지, 아니면 개인인지에 따라 달라집니다.",
  },
  section5SetOffTitle: {
    en: "Set-Off and Exemption for Businesses",
    ko: "기업에 대한 상계 및 면제",
  },
  section5SetOffDescription: {
    en: "If rental income is included in the profits assessed to profits tax, or the property is occupied by the owner for business purposes, the property tax already paid can be set off against the profits tax assessed. More practically, a corporation carrying on a trade, profession or business in Hong Kong can apply in writing for exemption from property tax under section 5(2)(a) of the Ordinance, so it need not pay property tax up front and then reclaim it. For companies letting property as part of their business, claiming this exemption is usually the cleaner route.",
    ko: "임대 소득이 법인세 과세 대상 이익에 포함되거나, 해당 부동산을 소유주가 사업 목적으로 직접 사용하는 경우, 이미 납부한 재산세를 과세된 법인세에서 공제(상계)받을 수 있습니다. 보다 실질적으로, 홍콩에서 무역·전문직 또는 사업을 영위하는 법인은 세무조례 제5조 제2항 (a)호에 따라 재산세 면제를 서면으로 신청할 수 있으므로, 재산세를 먼저 납부한 후 환급을 청구할 필요가 없습니다. 사업의 일환으로 부동산을 임대하는 회사의 경우, 이 면제를 신청하는 것이 일반적으로 더 간편한 방법입니다.",
  },
  section5PersonalAssessmentTitle: {
    en: "Personal Assessment for Individuals",
    ko: "개인을 위한 개인 과세(Personal Assessment)",
  },
  section5PersonalAssessmentDescription: {
    en: "On its own, property tax is a flat 15% charge with no personal allowances. By electing personal assessment under section 41 — available to an individual aged 18 or over who is ordinarily resident or a temporary resident in Hong Kong — the owner's property income is aggregated with their other income and taxed at progressive rates after personal allowances. For an owner whose total income is modest, this can produce a lower bill than the flat 15%.",
    ko: "재산세는 그 자체로 개인 공제 없이 일률적으로 15%가 부과됩니다. 세무조례 제41조에 따라 개인 과세를 선택할 경우(홍콩에 통상적으로 거주하거나 임시 거주하는 18세 이상의 개인에게 적용됨), 소유주의 부동산 소득은 다른 소득과 합산되어 개인 공제 후 누진세율에 따라 과세됩니다. 총소득이 많지 않은 소유주의 경우, 이 방식이 일률적인 15% 세율보다 더 낮은 세액으로 이어질 수 있습니다.",
  },
  section5MortgageTitle: {
    en: "Deducting Mortgage Interest",
    ko: "주택담보대출 이자 공제",
  },
  section5MortgageDescription: {
    en: "Personal assessment also unlocks a deduction that property tax denies: interest on money borrowed to acquire the let property becomes deductible under section 42. The deduction for each property is capped at that property's net assessable value, and interest relating to any period when the property was not actually let — for example while it was vacant or used as the owner's own home — cannot be claimed.",
    ko: "개인 과세를 선택하면 재산세에서는 인정되지 않는 공제 혜택도 받을 수 있습니다. 즉, 세무조례 제42조에 따라 임대용 부동산 취득을 위해 차입한 자금에 대한 이자를 공제받을 수 있습니다. 각 부동산에 대한 공제 한도는 해당 부동산의 과세 순가치(NAV)로 제한되며, 부동산이 실제로 임대되지 않았던 기간(예: 공실 상태이거나 소유주가 자가로 사용하던 기간)에 발생한 이자는 공제받을 수 없습니다.",
  },
  section5RestorationNote: {
    en: "Because property tax denies mortgage-interest relief, owners who financed a rental property with a loan are often better off electing personal assessment — but it is not automatically beneficial in every case, so the position should be reviewed each year.",
    ko: "재산세는 주택담보대출 이자 공제를 허용하지 않기 때문에, 대출로 임대용 부동산을 구입한 소유주는 개인 과세 방식을 선택하는 것이 더 유리한 경우가 많습니다. 다만 모든 경우에 자동으로 유리한 것은 아니므로, 매년 상황을 재검토해야 합니다.",
  },

  // FAQ
  frequentlyAskedQuestions: {
    en: "Frequently Asked Questions",
    ko: "자주 묻는 질문",
  },
  faqItems: [
    {
      question: {
        en: "Do I still have to pay property tax if my tenant pays the rates and management fees?",
        ko: "임차인이 지방세(rates)와 관리비를 납부하는 경우에도 제가 재산세를 내야 하나요?",
      },
      answer: {
        en: "Yes. Letting your property for rent makes you chargeable to property tax regardless of who pays the rates or management fees. If the tenant pays expenses that are properly the owner's, those amounts are added to your assessable value. Only rates actually paid by the owner are deductible; the 20% statutory allowance covers other outgoings automatically.",
        ko: "네. 부동산을 임대하는 경우, 지방세나 관리비를 누가 부담하든 상관없이 귀하에게 재산세가 부과됩니다. 임차인이 본래 소유주가 부담해야 할 비용을 지불하는 경우, 해당 금액은 귀하의 과세 기준가액에 가산됩니다. 소유주가 실제로 납부한 지방세만 공제 대상이며, 기타 지출에 대해서는 법정 공제 한도인 20%가 자동으로 적용됩니다.",
      },
    },
    {
      question: {
        en: "Is the interest on my rental property's mortgage deductible?",
        ko: "임대용 부동산의 주택담보대출 이자는 공제 대상인가요?",
      },
      answer: {
        en: "Not under property tax — mortgage interest is never deductible in computing the net assessable value. However, if you elect personal assessment, interest on money borrowed to acquire the let property becomes deductible, capped at the net assessable value of that property and limited to periods when it was actually let. This is often the main reason a financed landlord elects personal assessment.",
        ko: "재산세에서는 공제되지 않습니다. 주택담보대출 이자는 과세 순가치(NAV)를 산정할 때 절대 공제 대상이 되지 않습니다. 그러나 개인 과세를 선택할 경우, 임대용 부동산 취득을 위해 차입한 자금에 대한 이자는 해당 부동산의 과세 순가치를 상한으로 하여, 실제로 임대된 기간에 한해 공제 대상이 됩니다. 이는 대출을 받은 임대인이 개인 과세를 선택하는 주된 이유인 경우가 많습니다.",
      },
    },
    {
      question: {
        en: "My company owns and lets a property. Do we pay both property tax and profits tax on the rent?",
        ko: "저희 회사는 부동산을 소유하고 임대하고 있습니다. 임대료에 대해 재산세와 법인세를 모두 납부해야 하나요?",
      },
      answer: {
        en: "The same income is not taxed twice. If the rental income forms part of profits chargeable to profits tax, the property tax paid can be set off against the profits tax assessed. A company carrying on business in Hong Kong can also apply in writing for exemption from property tax under section 5(2)(a), so the rent is dealt with under profits tax only. Claiming the exemption is usually cleaner than paying and reclaiming.",
        ko: "동일한 소득에 대해 이중 과세되지 않습니다. 임대 소득이 법인세 과세 대상 이익의 일부를 구성하는 경우, 납부한 재산세를 부과된 법인세에서 공제받을 수 있습니다. 홍콩에서 사업을 영위하는 법인은 세무조례 제5조 제2항 (a)호에 따라 재산세 면제를 서면으로 신청할 수도 있으며, 이 경우 임대료는 법인세 대상으로만 처리됩니다. 면제를 신청하는 것이 세금을 납부한 후 환급받는 것보다 일반적으로 더 간편합니다.",
      },
    },
    {
      question: {
        en: "I own a flat jointly with my spouse. Who reports the rent?",
        ko: "저는 배우자와 함께 아파트를 공동 소유하고 있습니다. 임대료는 누가 신고해야 하나요?",
      },
      answer: {
        en: "For jointly owned property, the rent is reported on Property Tax Return BIR57. Any one of the owners may complete and sign it, so only one return is filed, but each joint owner remains individually responsible for reporting the income and paying the tax.",
        ko: "공동 소유 부동산의 경우, 임대료는 재산세 신고서(BIR57)에 기재합니다. 공동 소유주 중 한 명이 신고서를 작성하고 서명하면 되므로 신고서는 한 부만 제출하면 되지만, 각 공동 소유주는 소득 신고 및 세금 납부에 대해 개별적으로 책임을 집니다.",
      },
    },
    {
      question: {
        en: "I have rental income but never received a property tax return. What should I do?",
        ko: "임대 소득이 있는데 재산세 신고서를 한 번도 받은 적이 없습니다. 어떻게 해야 하나요?",
      },
      answer: {
        en: "You are still chargeable. Section 51(2) of the Inland Revenue Ordinance requires you to notify the Department in writing that you are liable to property tax, no later than four months after the end of the year of assessment (by 31 July). Failing to notify can lead to penalties, so it is best to write to the Department or contact a professional adviser promptly.",
        ko: "귀하는 여전히 과세 대상입니다. 세무조례 제51조 제2항에 따라, 귀하는 과세 연도가 종료된 날로부터 4개월 이내(7월 31일까지)에 재산세 납부 의무가 있음을 세무국에 서면으로 통지해야 합니다. 통지를 하지 않을 경우 벌금이 부과될 수 있으므로, 세무국에 서면으로 통지하거나 전문 자문가에게 즉시 문의하는 것이 가장 좋습니다.",
      },
    },
  ],

  // Conclusion
  conclusionTitle: { en: "Conclusion", ko: "결론" },
  conclusionDescription: {
    en: "Property tax in Hong Kong is straightforward to compute once the net assessable value is understood: gross rent and charges, less irrecoverable rent, less rates paid by the owner, less the automatic 20% allowance, taxed at 15%. The complexity — and the savings — lie in how it dovetails with profits tax for companies, through set-off or the section 5(2)(a) exemption, and with personal assessment for individuals, which unlocks progressive rates and, importantly, mortgage-interest relief. Owners letting property through a company, or individuals carrying a mortgage on a let property, should review which route leaves them better off rather than simply paying the flat charge.",
    ko: "홍콩의 재산세는 과세 순가치(NAV)를 이해하기만 하면 계산이 간단합니다. 총 임대료와 부대비용에서 회수 불가능한 임대료를 차감하고, 소유주가 납부한 지방세를 차감하며, 자동으로 적용되는 20% 공제액을 차감한 후 15%의 세율을 적용합니다. 이 제도의 복잡성과 절세 효과는 기업의 경우 상계 또는 세무조례 제5조 제2항 (a)호에 따른 면제를 통한 법인세와의 연계 방식에, 그리고 개인의 경우 누진세율이 적용되고 무엇보다 중요한 주택담보대출 이자 공제를 받을 수 있는 개인 과세와의 연계 방식에 있습니다. 회사를 통해 부동산을 임대하는 소유주나 임대 부동산에 대한 주택담보대출을 부담하고 있는 개인은, 단순히 정액 세금을 납부하는 대신 어떤 방식이 더 유리한지 검토해야 합니다.",
  },

  // Disclaimer
  contactInformationDisclaimer: {
    en: "This material has been prepared for general informational purposes only and is not intended to be relied upon as professional advice. Please consult a qualified professional for advice specific to your situation. For personalised assistance, please contact Olive & Vine.",
    ko: "본 자료는 일반적인 정보 제공을 목적으로 작성된 것으로, 전문적인 조언으로 간주되어서는 안 됩니다. 귀하의 구체적인 상황에 대한 조언이 필요하시면 자격을 갖춘 전문가와 상담하시기 바랍니다. 맞춤형 지원을 원하시면 Olive & Vine에 문의해 주십시오.",
  },
};
