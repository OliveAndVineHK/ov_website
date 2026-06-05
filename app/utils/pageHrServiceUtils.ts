export const hrServicePageTranslations = {
  heroTitle: {
    en: "HR",
    ko: "인사",
  },
  heroSubtitle: {
    en: "Hong Kong businesses must comply with employment regulations, payroll requirements, and statutory benefits. We provide HR support to help you manage payroll, MPF, recruitment, and visa processes in accordance with local laws.",
    ko: "홍콩 기업은 고용 관련 법규와 급여 의무, 법정 복리후생을 준수해야 합니다. 현지 법규에 맞춰 급여, MPF, 채용, 비자 업무를 관리하도록 인사 지원을 제공해 드립니다.",
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
          "월별 급여 준비",
          "급여, 수당 및 공제 계산",
          "홍콩 요건에 따른 급여명세서 작성",
        ],
      },
      tags: [
        { label: { en: "Monthly Payroll", ko: "월별 급여" }, variant: "green" as const },
        { label: { en: "Payslip", ko: "급여명세서" }, variant: "beige" as const },
      ],
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
          "MPF 제도 직원 등록",
          "월별 기여금 계산 및 신고",
          "MPF 조례 준수",
        ],
      },
      tags: [
        { label: { en: "Employee Registration", ko: "직원 등록" }, variant: "green" as const },
        { label: { en: "Monthly Contribution", ko: "월별 납부" }, variant: "beige" as const },
      ],
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
      tags: [
        { label: { en: "Drafting JD", ko: "JD 작성" }, variant: "green" as const },
        { label: { en: "Manage Process", ko: "프로세스 관리" }, variant: "beige" as const },
      ],
      image: "/hr/recruitment support.png",
    },
    ir56: {
      title: { en: "Employer's Tax Return (Form IR56)", ko: "고용주 세무 신고서 (양식 IR56)" },
      description: {
        en: [
          "Preparation of Employer's Return of Remuneration and Pensions",
          "Filing of Form IR56 and related documents",
          "Annual reporting in accordance with Hong Kong requirements",
        ],
        ko: [
          "고용주 보수 및 연금 신고서 작성",
          "양식 IR56 및 관련 서류 제출",
          "홍콩 요건에 따른 연간 보고",
        ],
      },
      tags: [
        { label: { en: "Filing", ko: "제출" }, variant: "green" as const },
        { label: { en: "Annual Reporting", ko: "연간 보고" }, variant: "beige" as const },
      ],
      image: "/hr/employers tax return.png",
    },
    compliance: {
      title: { en: "HR Compliance Advisory", ko: "인사 규정 준수 자문" },
      description: {
        en: [
          "Advice on employment contracts and HR policies",
          "Statutory compliance guidance",
          "Practices aligned with Hong Kong law",
        ],
        ko: [
          "고용 계약 및 인사 정책 자문",
          "법정 준수 안내",
          "홍콩 법에 맞춘 운영 지원",
        ],
      },
      tags: [
        { label: { en: "Employment Contracts", ko: "고용 계약" }, variant: "green" as const },
        { label: { en: "Guidance on HR Policies", ko: "인사 정책 안내" }, variant: "beige" as const },
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
        answer: { en: "Yes. Under the Mandatory Provident Fund Schemes Ordinance, employers in Hong Kong must enrol eligible employees in an MPF scheme within 60 days of employment. Contributions must be made by both employer and employee.", ko: "네. 강제적립금 제도 조례에 따라 홍콩 고용주는 자격 요건을 충족하는 직원을 고용 후 60일 이내에 MPF 제도에 가입시켜야 합니다. 고용주와 직원 모두 기여금을 납부해야 합니다." },
      },
      {
        question: { en: "What documents are required for a work visa application?", ko: "취업 비자 신청에 필요한 서류는 무엇인가요?" },
        answer: { en: "You will need the employee's passport, employment contract, academic and professional qualifications, and supporting documents from the employer.", ko: "직원의 여권, 고용 계약서, 학력 및 전문 자격 증명, 고용주 발급 지원 서류가 필요합니다." },
      },
      {
        question: { en: "How often must payroll be processed in Hong Kong?", ko: "홍콩에서 급여는 얼마나 자주 처리해야 하나요?" },
        answer: { en: "Payroll is typically processed monthly, but the frequency can be set according to company policy, provided it complies with employment contracts and statutory requirements.", ko: "급여는 일반적으로 월별로 처리되며, 고용 계약 및 법정 요건을 준수하는 범위에서 회사 정책에 따라 주기를 정할 수 있습니다." },
      },
      {
        question: { en: "What are the employer's obligations for tax reporting?", ko: "세무 신고에 대한 고용주의 의무는 무엇인가요?" },
        answer: { en: "Employers must file Form IR56B annually for each employee and submit IR56E/IR56F/IR56G for new hires, leavers, or employees departing Hong Kong.", ko: "고용주는 각 직원에 대해 매년 IR56B를 제출하고, 신규 채용, 퇴직 또는 홍콩 이탈 직원에 대해 IR56E/IR56F/IR56G를 제출해야 합니다." },
      },
      {
        question: { en: "Can you help with drafting employment contracts and HR policies?", ko: "고용 계약서 및 인사 정책 작성 지원이 가능한가요?" },
        answer: { en: "Yes, we provide advisory services to help you prepare employment contracts, staff handbooks, and workplace policies in line with Hong Kong labour laws.", ko: "네. 홍콩 노동법에 맞춰 고용 계약서, 직원 핸드북, 직장 정책 작성 지원을 위한 자문 서비스를 제공합니다." },
      },
    ],
  },
};
