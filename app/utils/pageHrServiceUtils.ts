export const hrServicePageTranslations = {
  heroTitle: {
    en: "HR",
    ko: "인사",
  },
  heroSubtitle: {
    en: "Hong Kong businesses must comply with employment regulations, payroll requirements, and statutory benefits. We provide HR support to help you manage payroll, MPF, recruitment, and visa processes in accordance with local laws.",
    ko: "홍콩에서 사업을 운영하기 위해서는 고용 관련 규정과 급여 처리, 법정 복리후생에 대한 준수가 필요합니다. 급여, MPF, 채용 및 비자 절차를 체계적으로 관리하여 현지 법규를 충족할 수 있도록 지원합니다.",
  },
  cards: {
    payroll: {
      title: { en: "Payroll Administration", ko: "급여 관리" },
      description: {
        en: [
          "Preparation of monthly payroll",
          "Calculation of salaries, allowances, and deductions",
          "Generation of payslips in accordance with Hong Kong requirements",
        ],
        ko: [
          "월별 급여 산출",
          "홍콩 요건 및 회사 정책에 따른 급여, 수당 및 공제 항목 계산",
          "전자 급여명세서(Digital Payslip) 발행",
        ],
      },
      tags: [],
      accent: "green" as const,
    },
    mpf: {
      title: { en: "MPF Management", ko: "MPF 관리" },
      description: {
        en: [
          "Employee registration with MPF schemes",
          "Monthly contribution calculation and filing",
          "Compliance with MPF ordinance requirements",
        ],
        ko: [
          "입사자 MPF 등록",
          "월별 기여금 계산 및 보고",
          "MPF 조례 준수",
        ],
      },
      tags: [],
      accent: "orange" as const,
      image: "/hr/MPF.png",
    },
    recruitment: {
      title: { en: "Recruitment Support", ko: "채용 지원" },
      description: {
        en: [
          "Drafting job descriptions and screening candidates",
          "Interview coordination and selection support",
          "Onboarding in line with local practices",
        ],
        ko: [
          "직무 설명서 작성 및 후보자 서류 심사",
          "면접 조정 및 선발 지원",
          "현지 관행에 따른 온보딩",
        ],
      },
      tags: [],
      image: "/hr/recruitment support.png",
    },
    ir56: {
      title: { en: "Employer's Tax Return (Form IR56)", ko: "고용주 세무 신고서 (양식 IR56)" },
      description: {
        en: [
          "Preparation and filing of Employer's Return (IR56 forms)",
        ],
        ko: [
          "고용주 신고서 (IR56 양식) 작성 및 제출",
        ],
      },
      tags: [],
      image: "/hr/employers tax return.png",
    },
    compliance: {
      title: { en: "HR Compliance Advisory", ko: "인사 규정 준수 자문" },
      description: {
        en: [
          "Advice on employment contracts and HR policies",
          "Statutory compliance guidance",
          "Practices aligned with Hong Kong law and common practices",
        ],
        ko: [
          "고용 계약 및 인사 정책 자문",
          "법적 요건 준수 검토",
          "홍콩 법규 및 일반적인 실무 관행 부합여부 검토",
        ],
      },
      tags: [
        { label: { en: "Guidance on HR Policies", ko: "HR 정책 수립 및 운영에 대한 자문" }, variant: "beige" as const },
      ],
      image: "/hr/hr compliance.png",
    },
  },
  insightTag: { en: "HR", ko: "인사" },
  faq: {
    title: { en: "FAQ", ko: "FAQ" },
    subtitle: { en: "Frequently asked questions", ko: "자주 묻는 질문" },
    items: [
      {
        question: { en: "Is it mandatory to enrol employees in the MPF scheme?", ko: "직원을 MPF 제도에 가입시키는 것이 의무인가요?" },
        answer: { en: "Yes. Under the Mandatory Provident Fund Schemes Ordinance, employers in Hong Kong must enrol eligible employees in an MPF scheme within 60 days of employment. Contributions must be made by both employer and employee.", ko: "홍콩의 MPF 제도는 「Mandatory Provident Fund Schemes Ordinance」에 따라 운영되며, 고용주는 직원 채용일로부터 60일 이내에 대상 직원을 MPF 제도에 등록해야 합니다. 관련 기여금은 고용주와 직원이 각각 정해진 계산식에 따라 공동으로 부담합니다. " },
      },
      {
        question: { en: "What documents are required for a work visa application?", ko: "취업 비자 신청에 필요한 서류는 무엇인가요?" },
        answer: { en: "For work visa applications, it is not solely a matter of preparing documentation. A careful review of the applicable requirements and eligibility criteria should be undertaken in advance to ensure that both the employer and the candidate can meet the Immigration Department's expectations.<br>In general, the following documents will be required:<br><br>· Employee's valid passport or travel document<br>· Employment contract or offer letter setting out position, salary, and benefits<br>· Academic and professional qualifications, together with relevant work experience<br>· Supporting documents from the employer, including company registration and business information", ko: "취업비자 신청은 단순한 서류 제출 절차가 아니라, 신청 요건과 적격성에 대한 사전 검토가 선행되는 것이 중요합니다. 이와 같은 검토를 바탕으로 신청 준비가 이루어져야 합니다.<br>일반적으로 다음과 같은 서류가 필요합니다:<br><br>·직원의 여권<br>·근로계약서 또는 오퍼레터<br>·학력 및 경력 관련 증빙자료<br>·고용주 측 제출 서류(회사 등록자료 등)" },
      },
      {
        question: { en: "How often must payroll be processed in Hong Kong?", ko: "홍콩에 급여주기는 어떻게 되나요? " },
        answer: { en: "Payroll is typically processed monthly, but the frequency can be set according to company policy, provided it complies with employment contracts and statutory requirements. In addition, aligning the pay cycle with industry practice for similar roles may be considered to support effective talent attraction and retention.", ko: "급여는 일반적으로 월 단위로 처리되며, 회사의 정책에 따라 지급 주기를 설정할 수 있습니다. 다만, 해당 주기는 근로계약 및 관련 법규를 충족하는 범위 내에서 운영되어야 합니다. 또한 효과적인 인재 채용을 위해서는 유사 직종에서의 산업 관행을 함께 고려할 필요가 있습니다." },
      },
      {
        question: { en: "What are the employer's obligations for tax reporting?", ko: "개인의 세금과 관련해서 고용주가 납부해야하는 것이 있나요? " },
        answer: { en: "Employers are required to comply with tax reporting obligations by filing Form IR56B annually for each employee, and submitting Forms IR56E, IR56F, or IR56G for new hires, leavers, or employees departing Hong Kong.\nUnlike many jurisdictions, Hong Kong does not operate a pay‑as‑you‑earn (PAYE) withholding system. Employers are generally not required to withhold salaries tax from employee payroll; instead, employees are responsible for filing and paying their own tax following assessment by the Inland Revenue Department.", ko: "고용주는 각 직원에 대해 연간 Form IR56B를 제출하고, 신규 입사자, 퇴사자 또는 홍콩을 출국하는 직원에 대해서는 Form IR56E, IR56F 또는 IR56G를 각각 제출하는 등 세무 보고 의무를 이행해야 합니다.\n\n아울러 홍콩은 일반적인 원천징수 방식(PAYE)이 아니어서, 고용주가 급여에서 소득세를 원천징수할 수 없습니다. 대신, 직원이 개인 신고를 통해 세금을 신고 및 납부하며, 고용주는 보수 지급 내역을 관련 기관에 보고하는 역할을 수행하게 됩니다." },
      },
      {
        question: { en: "Can you help with drafting employment contracts and HR policies?", ko: "고용 계약서 및 인사 정책 작성 지원이 가능한가요?" },
        answer: { en: "Yes, we provide advisory services to help you prepare employment contracts, HR policy, and workplace policies in line with Hong Kong labour laws.", ko: "홍콩 노동법에 부합하는 고용계약, HR 정책 및 사내 규정의 설계 및 수립에 대해 전문 자문 서비스를 제공합니다." },
      },
    ],
  },
};
