import {
  getDynamicPageEntry,
  INSIGHT_TAG_SERVICE_KEY,
  INSIGHTS_PATH_LABELS,
} from "./dynamicPageConfig";
import { getLeadershipProfile } from "./leadershipProfileTranslations";

export const getPageName = (pathname: string): string => {
  if (pathname === "/") return "Home";
  const parts = pathname.slice(1).split("/");
  return parts.map((part, index) => {
    if (index === 0) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join("/");
};

const pageTranslations: Record<string, { en: string; ko: string }> = {
  Home: { en: "Home", ko: "홈" },
  About: { en: "About us", ko: "회사소개" },
  "About us": { en: "About us", ko: "회사소개" },
  "Our-values": { en: "Our values", ko: "우리의 가치" },
  Leadership: { en: "Leadership", ko: "리더십" },
  Services: { en: "Services", ko: "서비스" },
  "Corporate-service": { en: "Corporate Service", ko: "기업 서비스" },
  "Accounting-service": { en: "Accounting", ko: "회계" },
  "Assurance-service": { en: "Assurance", ko: "Assurance" },
  "Tax-service": { en: "Tax", ko: "세무" },
  "Consulting-service": { en: "Consulting", ko: "컨설팅" },
  "Hr-service": { en: "HR", ko: "인사" },
  Insights: { en: "Insights", ko: "인사이트" },
  Contact: { en: "Contact", ko: "문의" },
};

function getServiceTitleByKey(tagKey: string, language: string): string | null {
  const entry = servicesTranslations[tagKey as keyof typeof servicesTranslations];
  if (!entry || typeof entry !== "object" || !("title" in entry)) return null;
  const title = (entry as { title: { en: string; ko: string } }).title;
  return language === "KOR" ? title.ko : title.en;
}

function buildInsightPathSegments(
  pathname: string,
  language: string
): string[] | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length < 1 || raw[0].toLowerCase() !== "insights") return null;
  const lang = language === "KOR" ? "ko" : "en";
  const insightsLabel = INSIGHTS_PATH_LABELS[lang];
  return [insightsLabel];
}

const leadershipLabel = pageTranslations["Leadership"];

function getLeadershipDocumentTitle(pathname: string, language: string): string | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length === 0 || raw[0].toLowerCase() !== "leadership") return null;
  const title = language === "KOR" ? leadershipLabel.ko : leadershipLabel.en;
  if (raw.length === 1) return title;
  const slug = raw[1];
  const profile = getLeadershipProfile(slug);
  if (!profile) return null;
  const name = language === "KOR" ? profile.heroTitle.ko : profile.heroTitle.en;
  return `${name} - ${title}`;
}

function getLeadershipPathSegments(pathname: string, language: string): string[] | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length === 0 || raw[0].toLowerCase() !== "leadership") return null;
  const label = language === "KOR" ? leadershipLabel.ko : leadershipLabel.en;
  return [label];
}

export const getDocumentPageName = (pathname: string, language: string): string => {
  const entry = getDynamicPageEntry(pathname);
  if (entry) {
    return language === "KOR" ? entry.documentTitle.ko : entry.documentTitle.en;
  }
  const segments = buildInsightPathSegments(pathname, language);
  if (segments) {
    return segments.join(" - ");
  }
  const leadershipTitle = getLeadershipDocumentTitle(pathname, language);
  if (leadershipTitle) return leadershipTitle;
  const pageName = getPageName(pathname);
  const translation = pageTranslations[pageName];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return pageName;
};

export const getMenuLabel = (label: string, language: string): string => {
  const translation = pageTranslations[label];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return label;
};

export const getTranslatedPageName = (pathname: string, language: string): string => {
  const insightSegments = buildInsightPathSegments(pathname, language);
  if (insightSegments) {
    return insightSegments.join("/");
  }
  const leadershipSegments = getLeadershipPathSegments(pathname, language);
  if (leadershipSegments) {
    return leadershipSegments.join("/");
  }
  const entry = getDynamicPageEntry(pathname);
  if (entry) {
    const segs = language === "KOR" ? entry.pathSegments.ko : entry.pathSegments.en;
    return segs.join("/");
  }
  const pageName = getPageName(pathname);
  const translation = pageTranslations[pageName];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return pageName;
};

export const aboutUsTranslations = {
  title: {
    en: "About Us",
    ko: "회사소개",
  },
  promise: {
    en: "Partnership beyond numbers",
    ko: "숫자를 넘어선 파트너십",
  },
  description: {
    en: "We listen first, then advise — and stay with you across every chapter of your business in Hong Kong.",
    ko: "고객의 상황을 깊이 이해하는 것에서 시작하여, 홍콩에서의 사업 전반에 걸쳐 지속적인 자문을 제공합니다.",
  },
  readMore: {
    en: "Read our story",
    ko: "더 알아보기",
  },
};

export const integrityTranslations = {
  title: {
    en: "Integrity",
    ko: "정직성 Integrity",
  },
  words: {
    en: ["Clarity", "Integrity", "Partnership"],
    ko: ["명확성 Clarity", "정직성 Integrity", "파트너십 Partnership"],
  },
  description: {
    en: "Trust is built through consistent professionalism and open partnership. At Olive & Vine, integrity guides every step—clear communication, transparent processes, and a steadfast commitment to the client's success.",
    ko: "신뢰는 일관된 전문성과 진정성 있는 파트너십을 통해 형성됩니다. Olive & Vine은 모든 과정에서 정직함을 기준으로 삼으며, 명확한 소통과 투명한 프로세스를 바탕으로 고객의 성공을 지원합니다.",
  },
};

export const portfolioTranslations = {
  title: {
    en: "Who we serve",
    ko: "Who we serve",
  },
  heading: {
    en: "Our\nClients",
    ko: "주요 고객군",
  },
};

export const learnMoreTranslations = {
  title: {
    en: "Learn More",
    ko: "Learn More",
  },
  heading: {
    en: "Featured news\n& Insights",
    ko: "주요 뉴스\n및 인사이트",
  },
  button: {
    en: "All insights",
    ko: "더 보기",
  },
  card: {
    title: {
      en: "Consulting",
      ko: "컨설팅",
    },
    description: {
      en: "",
      ko: "",
    },
    date: {
      en: "January 2025",
      ko: "2025년 1월",
    },
  },
};

export const questionsTranslations = {
  title: {
    en: "We're here to answer<br />any questions",
    ko: "언제든 편하게 문의해 주시기 바랍니다",
  },
  form: {
    name: {
      en: "Name",
      ko: "이름",
    },
    contactNumber: {
      en: "Contact Number",
      ko: "연락처",
    },
    email: {
      en: "Email",
      ko: "이메일",
    },
    title: {
      en: "Title",
      ko: "제목",
    },
    message: {
      en: "Message",
      ko: "메시지",
    },
  },
  button: {
    en: "Send message",
    ko: "메시지 보내기",
  },
};

export const complianceTranslations = {
  title: {
    en: "Compliance & Ethics Notice:",
    ko: "컴플라이언스 및 윤리 고지",
  },
  description: {
    en: "Olive & Vine is committed to the highest standards of integrity, confidentiality, and regulatory compliance. All services are delivered in accordance with Hong Kong law and professional codes of conduct. The information provided on this website is for general guidance only and does not constitute legal or professional advice. For tailored advice, please contact our team directly.",
    ko: "Olive & Vine은 정직성, 기밀성 및 관련 법규 준수에 있어 최고 수준의 기준을 유지하고 있습니다. 당사의 모든 서비스는 홍콩 법령 및 관련 전문 직업윤리 기준에 따라 제공됩니다. 본 웹사이트에 제공된 정보는 일반적인 안내를 위한 것이며, 법률 또는 전문 자문으로 간주될 수 없습니다. 개별 상황에 대한 자문이 필요하신 경우, 당사에 직접 문의해 주시기 바랍니다.",
  },
};

export const heroWords = {
  en: ["Building", "Empowering", "Partnerships"],
  ko: ["함께", "성장하는", "파트너십"],
};

export const servicesTranslations = {
  title: {
    en: "Expertise",
    ko: "전문성",
  },
  heading: {
    en: "Our\nServices",
    ko: "Our Services",
  },
  button: {
    en: "All services",
    ko: "더 알아보기",
  },
  corporate: {
    title: {
      en: "Corporate Service",
      ko: "기업 서비스",
    },
    description: {
      en: "Company secretarial and statutory compliance for smooth business operations from incorporation to ongoing governance.",
      ko: "회사 설립부터 이후의 지배구조 관리에 이르기까지, 원활한 사업 운영을 위한 회사 비서 업무 및 법정 준수 서비스를 제공합니다.",
    },
  },
  accounting: {
    title: {
      en: "Accounting",
      ko: "회계 서비스",
    },
    description: {
      en: "Precise bookkeeping and financial management, providing timely insights for informed decisions and regulatory compliance.",
      ko: "정확한 기장과 체계적인 재무 관리를 통해, 기업의 의사결정을 지원하는 적시성 있는 인사이트를 제공하며 규제 준수를 뒷받침합니다.",
    },
  },
  assurance: {
    title: {
      en: "Assurance",
      ko: "Assurance",
    },
    description: {
      en: "Reliable audits that provide transparency, actionable insights, and strengthen trust in your organisation.",
      ko: "투명성과 신뢰를 강화하고, 실행 가능한 인사이트를 제공하는 신뢰도 높은 감사 서비스를 제공합니다.",
    },
  },
  tax: {
    title: {
      en: "Tax",
      ko: "세무",
    },
    description: {
      en: "Comprehensive tax compliance and advisory, ensuring accurate filings and optimized tax positions for businesses and individuals.",
      ko: "종합적인 세무 준수 및 자문 서비스를 통해 정확한 신고를 지원하고, 기업과 개인의 세무 리스크를 합리적으로 관리할 수 있도록 돕습니다. ",
    },
  },
  service5: {
    title: {
      en: "Consulting",
      ko: "컨설팅",
    },
    description: {
      en: "Strategic advice tailored to the objectives, enhancing efficiency and supporting sustainable growth.",
      ko: "고객의 목표에 부합하는 전략적 자문을 통해, 운영 효율성을 높이고 지속 가능한 성장을 지원합니다.",
    },
  },
  service6: {
    title: {
      en: "HR",
      ko: "인사",
    },
    description: {
      en: "Practical HR support for payroll, MPF, recruitment, and visa needs ensuring compliance and operational efficiency.",
      ko: "급여, MPF, 채용, 비자 지원을 포함한 실무 중심의 인사 지원을 통해, 규제 준수와 효율적인 운영을 뒷받침합니다.",
    },
  },
};

export const portfolioCardTranslations = {
  startups: {
    title: {
      en: "Startups",
      ko: "스타트업",
    },
    description: {
      en: "Startups need more than incorporation – they need a partner who understands scaling, system setup, and adaptable process design. We guide founders from the first day with digital-first accounting, HR setup, compliance roadmaps, and pragmatic advice. As the business grows, our team continuously refines financial systems to support sustainable expansion.",
      ko: "스타트업은 단순한 법인 설립을 넘어, 성장 단계에 맞는 파트너와의 협력이 필요합니다.\nOlive & Vine은 초기 단계부터 디지털 기반 회계, 인사 체계 구축, 컴플라이언스 로드맵 수립 및 실무 중심의 자문을 통해 창업자의 안정적인 출발을 지원합니다.\n사업이 성장함에 따라, 변화하는 요구에 맞춰 재무 및 운영 체계를 지속적으로 고도화하여 지속 가능한 확장을 뒷받침합니다.",
    },
  },
  missionDriven: {
    title: {
      en: "SMEs (Small and Medium Enterprises)",
      ko: "SMEs (Small and Medium Enterprises)",
    },
    description: {
      en: "SMEs often face rapid growth, evolving compliance needs, and limited internal resources. We support them by providing end‑to‑end corporate, accounting, tax, and HR services that bring structure and clarity. Our approach ensures business owners gain visibility and confidence while staying compliant and financially healthy.",
      ko: "SME는 빠르게 변화하는 성장 환경과 규제 요구, 제한된 내부 자원이라는 과제를 직면하고 있습니다. Olive & Vine은 기업 운영 전반에 걸친 Corporate, Accounting, Tax 및 HR 서비스를 통합적으로 제공하여 구조와 명확성을 확보할 수 있도록 지원합니다. 이를 통해 경영자는 비즈니스 전반에 대한 가시성과 신뢰를 확보하고, 규제 준수와 재무 건전성을 안정적으로 유지할 수 있습니다.",
    },
  },
  regionalOperations: {
    title: {
      en: "Growing Regional Businesses (APAC Multi‑entity / Cross‑border)",
      ko: "APAC 지역에서 다수 법인 및 크로스보더 구조를 운영하는 Growing Regional Businesses",
    },
    description: {
      en: "Companies expanding internationally face complex reporting, tax coordination, and multi‑entity workflows. We bring Big 4 and corporate experience to harmonize processes, strengthen controls, and streamline cross‑border accounting. Our support helps management make informed decisions while maintaining compliance across jurisdictions.",
      ko: "해외 확장을 추진하는 기업은 복잡한 보고 체계, 세무 조정, 다수 법인 운영 등 다양한 과제에 직면하게 됩니다.\nOlive & Vine은 Big 4 및 기업 실무 경험을 바탕으로 프로세스를 표준화하고 내부 통제를 강화하며, 크로스보더 회계 운영을 효율화합니다.\n이를 통해 경영진은 다양한 관할권에 걸친 규제 준수를 유지하면서, 보다 명확한 정보에 기반한 의사결정을 수행할 수 있습니다.",
    },
  },
  newVentures: {
    title: {
      en: "Corporates & Mature Organisations",
      ko: "기업법인",
    },
    description: {
      en: "Corporates require discipline, documentation, governance, and transparent reporting. We deliver assurance, advisory, internal control assessment, HR compliance, and digital transformation guidance grounded in proven methodologies. Our experience with global insurers, financial institutions, and large corporates ensures robust, principle‑driven support.",
      ko: "기업은 높은 수준의 규율, 체계적인 문서화, 견고한 거버넌스, 그리고 투명한 보고 체계를 요구합니다.\nOlive & Vine은 검증된 방법론을 기반으로 감사, 자문, 내부통제 평가, HR 컴플라이언스 및 디지털 전환 지원을 제공합니다.\n글로벌 보험사, 금융기관 및 대기업을 대상으로 한 실무 경험을 바탕으로, 원칙 중심의 견고한 지원을 제공합니다.",
    },
  },
};

export const footerTranslations = {
  navigation: {
    home: {
      en: "Home",
      ko: "홈",
    },
    about: {
      en: "About",
      ko: "회사소개",
    },
    services: {
      en: "Services",
      ko: "서비스",
    },
    insights: {
      en: "Insights",
      ko: "인사이트",
    },
    contact: {
      en: "Contact",
      ko: "문의",
    },
  },
  copyright: {
    en: "@Olive&Vine",
    ko: "@Olive&Vine",
  },
  privacy: {
    en: "Privacy",
    ko: "개인정보처리방침",
  },
  terms: {
    en: "Terms",
    ko: "이용약관",
  },
};
