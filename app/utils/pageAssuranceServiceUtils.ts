/* ──────────────────────────────────────────────────────────────
   Assurance service page copy — rebuilt 2026-06-16
   Source of truth: Assurance.docx redesign brief (founder-authored).
   Hero subtitle from the xlsx proofreading round (07 Assurance, R4).
   Structure: hero → approach (intro · philosophy · value) →
   audit methodology (4-step) → what we deliver (3 groups) → FAQ.
   Korean drafted per i18n/Translation-Master-Prompt.md glossary;
   new KO is first-draft and queued for the next proofreading round.
   ────────────────────────────────────────────────────────────── */
export const assuranceServicePageTranslations = {
  heroTag: { en: "Services", ko: "서비스" },
  heroTitle: { en: "Assurance", ko: "Assurance" },
  heroSubtitle: {
    en: "Hong Kong companies are required to prepare audited financial statements in accordance with statutory requirements, to be conducted by a qualified CPA. We bring professional rigour and transparency to each engagement, delivering not only an audit opinion but also practical observations and insights to support your business decisions.",
    ko: "홍콩의 모든 기업은 관련 법규에 따라 공인회계사(CPA)를 통한 제무제표 감사를 필수적으로 받아야 합니다. 우리는 모든 감사 업무에 있어 높은 수준의 전문성과 투명성을 유지하며, 단순한 감사 의견을 넘어서 실질적인 개선과 판단에 도움이 되는 인사이트를 제공합니다.",
  },

  /* ── Section: Our approach (Introduction · Audit Philosophy · Value) ── */
  approachEyebrow: { en: "Our approach", ko: "우리의 접근" },
  approachHeading: {
    en: "Confidence through clarity — independent assurance.",
    ko: "명확함을 기반으로 한 신뢰, 독립적인 Assurance",
  },
  introduction: {
    en: `Our assurance services are grounded in professional integrity, independence, and disciplined execution. Each engagement is delivered through a structured approach that ensures audit work is conducted clearly, efficiently, and with defined accountability.

We focus not only on meeting regulatory requirements, but on maintaining a controlled audit process — allowing management to respond effectively without unnecessary disruption to ongoing operations.`,
    ko: `Assurance 서비스는 전문가로서의 정직성, 독립성, 그리고 원칙에 입각한 실행을 바탕으로 합니다. 모든 용역은 체계적인 접근에 따라 진행되며, 감사 업무가 명확하고 효율적으로, 그리고 분명한 책임 아래 수행되도록 보장합니다.

단순히 법적 규제 요건을 충족하는 데 그치지 않고, 체계적으로 잘 관리된 감사 절차를 유지 하는 데 집중합니다. 이를 통해 경영진과 실무진은 협엽에 불필요한 차질을 겪지 않고, 일상 업무에 집중하면서도 가장 효율적으로 대응할 수 있습니다.`,
  },
  auditPhilosophyTitle: { en: "Audit Philosophy", ko: "감사 철학" },
  auditPhilosophy: {
    en: `Auditing is founded on the principle that financial information must be reliable, transparent, and capable of withstanding independent scrutiny.

This requires the consistent application of professional scepticism, independent judgement, and evidence-based evaluation. The objective is not simply to complete procedures, but to form conclusions that stakeholders can rely on with confidence.

This principle underpins every engagement we undertake.`,
    ko: `회계감사는 재무 정보가 신뢰할 수 있고 투명하며, 독립적인 검증을 견뎌낼 수 있어야 한다는 원칙에서 출발합니다.

이를 위해서는 전문가적 의구심(Professional Scepticism), 독립적 판단, 그리고 증거에 기반한 평가를 일관되게 적용해야 합니다. 목표는 단순히 절차를 완료하는 것이 아니라, 이해관계자가 확신을 가지고 의지할 수 있는 결론을 도출하는 데 있습니다.

이 원칙은 올리브 앤 바인이 수행하는 모든 용역의 근간입니다.`,
  },
  valueBeyondTitle: { en: "Value Beyond the Audit", ko: "감사를 넘어선 가치" },
  valueBeyond: {
    en: `Our role is not limited to issuing an audit opinion.

The value of the audit is most clearly realised at the completion stage, where findings, adjustments, and observations are discussed with management. These discussions provide clarity over the financial position and highlight areas that may require attention.

Where appropriate, we also provide observations that support improvements in financial reporting, internal controls, and operational processes. This allows the audit to contribute not only to compliance, but to the ongoing strengthening of financial governance.`,
    ko: `최종 감사 의견서를 발행하는 데 그치지 않습니다.

감사의 진정한 가치는 모든 검토를 마치고, 발견한 내용과 수정 보완할 점, 드리고 핵심 관찰 사항들을 경영진과 함께 논의하는 완료 단계에서 가장 분명하게 드러납니다. 이러한 긴밀한 소통은 회사의 현재 재무 상태를 명확하게 이해하도록 돕고, 앞으로 특별히 주의하거나 관리해야 할 영역을 함께 검토합니다.

나아가 필요에 따라 재무 보고 시스템과 내부 통제, 드리고 전반적인 업무 프로세스를 한 단계 발전 시킬 수 있는 실질적인 개선 방향을 제안합니다. 이를 통해 우리의 감사는 단순한 법적 규제 준수를 넘어, 기업의 투명한 재무경영체계를 지속적으로 강화하는 밑거름이 됩니다.`,
  },

  /* ── Section: Audit Methodology (4-step vertical cards) ── */
  methodologyEyebrow: { en: "Audit methodology", ko: "감사 방법론" },
  methodologyHeading: {
    en: "A structured, controlled process.",
    ko: "체계적이고 통제된 절차",
  },
  methodologyIntro: {
    en: `Audit engagements are delivered through a structured framework designed to ensure clarity, efficiency, and predictability. The process follows clearly defined stages, allowing each phase of the engagement to be managed in a controlled and transparent manner.

We begin by understanding the business and identifying key areas of audit focus. Procedures are then performed based on assessed risks, with emphasis placed on areas that have the greatest impact on the financial statements.`,
    ko: `감사 서비스는 명확성과 효율성, 그리고 예측 가능성을 유지할 수 있도록 설계된 체계적인 시스템에 따라 진행됩니다. 모든 과정이 명확하게 정의된 단계를 거쳐 이루어지므로, 투명한 방식으로 관리할 수 있습니다.

먼저 고객사의 비즈니스를 이해하고 감사의 핵심 영역을 식별합니다. 이후 파악된 리스크를 바탕으로 감사 절차를 수행하며, 재무제표에 가장 큰 영향을 미치는 핵심 영역에 집중하여 업무를 처리합니다.`,
  },
  methodologySteps: {
    en: [
      { title: "Planning", description: "Understanding your business, identifying key risk areas, and establishing scope, timeline, and coordination approach." },
      { title: "Fieldwork", description: "Performing audit procedures on selected transactions and balances, with focus on areas of highest impact." },
      { title: "Ongoing Communication", description: "Audit requests are consolidated and prioritised, with continuous communication to address matters as they arise." },
      { title: "Completion & Reporting", description: "Findings, adjustments, and observations are discussed with management prior to finalisation of the audit opinion." },
    ],
    ko: [
      { title: "계획 수립", description: "사업과 핵심 리스크 영역을 파악하고 감사 범위·일정·협업 방식을 설정합니다." },
      { title: "현장 감사", description: "선정된 거래와 계정 잔액에 감사 절차를 수행하며, 영향이 큰 영역에 집중합니다." },
      { title: "상시 소통", description: "감사 요청 사항을 통합·우선순위화하고, 사안 발생 시 지속적으로 소통합니다." },
      { title: "완료 및 보고", description: "발견사항·수정사항·관찰사항을 경영진과 논의한 뒤 감사 의견을 확정합니다." },
    ],
  },
  methodologySupporting: {
    en: `Audit requests are typically consolidated and prioritised, allowing your team to respond efficiently. Communication is maintained throughout the engagement so that issues are addressed as they arise, rather than accumulating at the final stage.

Where accounting records and supporting data are reasonably maintained on an ongoing basis, the audit process can be integrated alongside normal operations without significant disruption.

In practice, delays in audit engagements are more often driven by the readiness of accounting records and administrative processes — including final document execution — rather than the audit procedures themselves.`,
    ko: `감사 요청 사항들은 중요도에 따라 우선순위를 나누어 제공하므로, 회사의 실무 팀이 혼선 없이 효울적으로 대응할수 있습니다. 감사 진행 전 과정에 걸쳐 긴밀하게 소통 하므로 검토해야 할 사인들이 마지막 단계에서 한꺼번에 몰리 않고 발생할 때마다 즉시 처리 됩니다.

회계 기록과 증빙 자료가 평소에 합리적으로 관리되고 있다면, 감사는 정상적인 업무와 병행하여 큰 지장 없이 진행될 수 있습니다.

실무에서 감사 일정의 지연은 감사 절차 자체보다, 최종 서류 서명 등 회계 기록과 행정 절차의 준비 상태에서 비롯되는 경우가 더 많습니다.`,
  },

  /* ── Section: What We Deliver (3 groups) ── */
  deliverEyebrow: { en: "What we deliver", ko: "제공 서비스" },
  deliverHeading: {
    en: "Audit, assurance, and advisory.",
    ko: "감사, Assurance, 그리고 자문",
  },
  externalAuditTitle: { en: "External Audit", ko: "외부 감사" },
  externalAuditItems: {
    en: [
      "Statutory audits under IFRS and SME-FRS",
      "Individual and consolidated financial statement audits",
      "Group reporting packages",
    ],
    ko: [
      "IFRS 및 SME-FRS 기준 법정 감사",
      "개별·연결 재무제표 감사",
      "그룹 리포팅 패키지 감사",
    ],
  },
  otherAssuranceTitle: { en: "Other Assurance", ko: "기타 Assurance" },
  otherAssuranceItems: {
    en: [
      "Agreed-upon procedures",
      "Review engagements",
      "Regulatory or compliance-related assurance",
    ],
    ko: [
      "합의된 절차 수행 업무(AUP)",
      "재무제표 검토 업무",
      "규제·컴플라이언스 관련 Assurance",
    ],
  },
  advisoryTitle: { en: "Advisory", ko: "자문" },
  advisoryItems: {
    en: [
      "Audit readiness",
      "Internal control observations",
      "Process and reporting improvements",
    ],
    ko: [
      "감사 준비(Audit Readiness)",
      "내부 통제 점검 및 관찰사항 제시",
      "프로세스 및 보고 체계 개선",
    ],
  },

  /* ── Section: FAQ (reuses FaqAccordion; answers support HTML) ── */
  faq: {
    title: { en: "FAQ", ko: "FAQ" },
    subtitle: {
      en: "Frequently asked questions",
      ko: "자주 묻는 질문",
    },
    items: [
      {
        question: {
          en: "What should we expect during the audit process?",
          ko: "감사 과정에서 무엇을 예상할 수 있나요?",
        },
        answer: {
          en: "The audit generally runs through planning, fieldwork, and completion.<br><br>During planning and fieldwork, we request key documents, review supporting records, and follow up on selected transactions. Communication is ongoing throughout, with requests typically grouped and prioritised.<br><br>The completion stage is where the main value of the audit is realised. Findings, observations, and any adjustments are discussed with management, together with practical insights on financial reporting and processes. The objective is to ensure a clear, actionable understanding of the outcome, rather than simply issuing a report.",
          ko: "감사는 계획 수립, 현장 감사, 완료의 세 가지 단계로 투명하고 체계적으로 진행됩니다.<br><br>계획 수립과 현장 감사 단계에서는 주요 서류를 요청하고 증빙 기록을 검토하며 선정된 거래를 확인합니다. 전 과정에 걸쳐 소통이 이어지며, 요청 사항은 통합·우선순위화하여 전달됩니다.<br><br>완료 단계는 감사의 핵심 가치가 실현되는 시점입니다. 발견사항과 관찰사항, 수정사항을 경영진과 논의하고, 재무 보고와 프로세스에 대한 실질적인 인사이트를 함께 제공합니다. 단순히 보고서를 발행하는 것이 아니라, 결과를 명확하고 실행 가능하게 이해할 수 있도록 하는 것이 목표입니다.",
        },
      },
      {
        question: {
          en: "How much involvement is required from our team?",
          ko: "저희 팀은 어느 정도 참여해야 하나요?",
        },
        answer: {
          en: "Your team's role is primarily to provide supporting information and clarification.<br><br>If your accounting records and supporting data are maintained in a reasonably organised manner as part of your day-to-day operations, the audit will generally not require significant additional preparation beyond responding to requests.<br><br>We manage the process in a structured way, with consolidated and prioritised requests.<br><br>In practice, where accounting is maintained properly, involvement is limited and predictable. Additional workload usually arises only where records require reconstruction.",
          ko: "감사 과정에서 고객사 실무 팀의 역할은 증빙 자료를 공유하고, 필요한 부분에 대해 보충 설명을 제공하는 것입니다.<br><br>회계 기록과 증빙 자료가 평소 업무 과정에서 합리적으로 정리되어 있다면, 요청 사항에 대응하는 것 외에 별도의 큰 준비는 일반적으로 필요하지 않습니다.<br><br>요청 사항을 통합하고 우선순위화하여 체계적으로 관리합니다.<br><br>실무적으로 회계가 제대로 관리되고 있는 경우 실무팀의 부담은 제한적이고 예측 가능합니다. 추가 업무는 대개 기록이 미흡하거나 잘못되어 재작성해야 하는 경우에 발생합니다.",
        },
      },
      {
        question: {
          en: "How long does an audit typically take?",
          ko: "감사는 보통 얼마나 걸리나요?",
        },
        answer: {
          en: "The duration depends on the size and complexity of the business, as well as the condition of the accounting records.<br><br>As a general guide:<br><br>· smaller or less complex entities: around 2–4 weeks<br>· mid-sized entities: 4–8 weeks<br>· group or cross-border structures may take longer<br><br>In practice, delays are usually not caused by the audit itself, but by:<br><br>· late or incomplete accounting<br>· missing supporting documentation<br>· unresolved or unclear transactions<br><br>A common but overlooked delay occurs at the final signing stage. In Hong Kong, authorised signatories are often outside the jurisdiction while finalisation may still require handwritten signatures.",
          ko: "소요 기간은 사업의 규모와 복잡성, 그리고 회계 기록의 상태에 따라 달라집니다.<br><br>일반적인 기준은 다음과 같습니다.<br><br>· 규모가 작거나 단순한 기업: 약 2~4주<br>· 중견 규모 기업: 4~8주<br>· 그룹 또는 국경 간 구조: 더 길어질 수 있음<br><br>실무에서 지연은 대개 감사 자체가 아니라 다음 요인에서 비롯됩니다.<br><br>· 회계 마감 지연 또는 미완료<br>· 증빙 서류 누락<br>· 미해결·불명확 거래<br><br>흔하지만 간과되는 지연은 최종 서명 단계에서 발생합니다. 홍콩에서는 승인 서명권자가 국외에 있는 경우가 많은 반면, 마무리에는 여전히 자필 서명이 요구될 수 있습니다.",
        },
      },
      {
        question: {
          en: "Will the audit disrupt our day-to-day operations?",
          ko: "감사가 일상 업무에 지장을 주지는 않나요?",
        },
        answer: {
          en: "If accounting records and supporting data are maintained in a reasonably organised manner, the audit should not significantly disrupt daily operations.<br><br>The process is structured to run alongside normal business activities, with requests planned and coordinated in advance.<br><br>However, where accounting has been delayed or records are not properly maintained, both accounting catch-up and audit work tend to overlap, which can place pressure on internal teams.<br><br>The audit itself is rarely the source of disruption — it highlights work that has already accumulated.",
          ko: "회계 기록과 증빙 자료가 합리적으로 정리되어 있다면, 감사가 일상 업무에 큰 지장을 주지 않습니다.<br><br>감사 절차는 정상적인 업무와 병행할 수 있도록 설계되며, 요청 사항은 사전에 계획하고 조율합니다.<br><br>다만 회계가 지연되었거나 기록이 제대로 관리되지 않은 경우에는 회계 보완 작업과 감사 업무가 겹치면서 내부 팀에 부담이 될 수 있습니다.<br><br>감사 자체가 지장의 원인이 되는 경우는 드물며, 오히려 이미 누적되어 있던 업무를 드러내는 역할을 합니다.",
        },
      },
      {
        question: {
          en: "We already have an auditor — when would a change be considered?",
          ko: "이미 감사인이 있는데, 언제 교체를 고려해야 하나요?",
        },
        answer: {
          en: "A change is typically considered when the audit no longer provides sufficient clarity, structure, or value.<br><br>Common indicators include:<br><br>· limited explanation of audit findings or adjustments<br>· difficulty understanding the audit report<br>· lack of transparency over progress<br><br>A lack of questions or feedback is not necessarily a positive sign. A competent audit should identify and communicate relevant matters — whether confirming strength or highlighting areas of concern.<br><br>Another practical factor is the stage of the business. Where operations are small and straightforward, a simpler audit approach may be adequate. As the business grows — or is expected to grow — it is often appropriate to engage a more structured and professional audit process that can support more complex reporting and governance requirements.",
          ko: "감사가 더 이상 충분한 명확성이나 체계, 가치를 제공하지 못할 때 교체를 고려하게 됩니다.<br><br>대표적인 신호는 다음과 같습니다.<br><br>· 감사 발견사항이나 수정사항에 대한 설명 부족<br>· 감사 보고서를 이해하기 어려움<br>· 진행 상황에 대한 투명성 부족<br><br>질문이나 피드백이 없다는 것이 반드시 긍정적인 신호는 아닙니다. 역량 있는 감사라면 강점을 확인하든 우려 영역을 짚든, 관련 사안을 식별하고 전달해야 합니다.<br><br>또 하나의 실질적인 요소는 사업의 성장 단계입니다. 사업 규모가 작고 단순한 경우에는 간소한 감사 방식으로 충분할 수 있습니다. 그러나 사업이 성장하거나 성장이 예상된다면, 보다 복잡한 보고와 거버넌스 요건을 뒷받침할 수 있는 체계적이고 전문적인 감사 절차를 도입하는 것이 적절합니다.",
        },
      },
      {
        question: {
          en: "How do you ensure a smooth transition from an existing auditor?",
          ko: "기존 감사인으로부터의 인수인계는 어떻게 원활하게 진행하나요?",
        },
        answer: {
          en: "The transition follows a structured process to ensure continuity.<br><br>We coordinate with the previous auditor where required, obtain prior year information, and review historical treatments in key areas. Early planning allows potential issues to be identified in advance rather than during the audit.",
          ko: "인수인계는 연속성을 보장하기 위해 체계적인 절차에 따라 진행됩니다.<br><br>필요한 경우 전임 감사인과 협의하고, 전기(前期) 정보를 입수하며, 핵심 영역의 과거 회계 처리를 검토합니다. 사전에 계획함으로써 잠재적 쟁점을 감사 도중이 아니라 미리 파악할 수 있습니다.",
        },
      },
      {
        question: {
          en: "Do you support group reporting or cross-border audit requirements?",
          ko: "그룹 리포팅이나 국경 간 감사 요건도 지원하나요?",
        },
        answer: {
          en: "Yes. We regularly support audit engagements involving group reporting structures and cross-border coordination.<br><br>This includes aligning local statutory audit requirements with group reporting packages, coordinating with overseas group auditors or parent entities, and ensuring consistency in timing and reporting expectations across jurisdictions.<br><br>Particular attention is given to:<br><br>· alignment with group reporting formats<br>· coordination of reporting deadlines<br>· communication between local management and group stakeholders<br><br>",
          ko: "네. 그룹 리포팅 구조와 국경 간 협업이 포함된 감사 용역을 정기적으로 지원합니다.<br><br>여기에는 현지 법정 감사 요건을 그룹 리포팅 패키지와 정합화하고, 해외 그룹 감사인이나 모회사와 협업하며, 관할권 전반의 일정과 보고 기대치를 일관되게 맞추는 일이 포함됩니다.<br><br>특히 다음에 주의를 기울입니다.<br><br>· 그룹 리포팅 양식과의 정합성<br>· 보고 기한 조율<br>· 현지 경영진과 그룹 이해관계자 간 소통<br><br>",
        },
      },
    ],
  },

  insightTag: { en: "Assurance", ko: "Assurance" },
};
