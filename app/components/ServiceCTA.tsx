"use client";

import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useServiceAccent } from "@/app/contexts/ServiceAccentContext";

type ServiceType = "accounting" | "tax" | "corporate" | "consulting" | "hr" | "assurance";

interface ServiceCTAConfig {
  heading: { en: string; ko: string };
  description: { en: string; ko: string };
  button: { en: string; ko: string };
}

const ctaMap: Record<ServiceType, ServiceCTAConfig> = {
  accounting: {
    heading: {
      en: "Schedule Your Financial Review",
      ko: "재무 리뷰 예약하기",
    },
    description: {
      en: "Let our experienced accounting team review your financial position and identify opportunities for growth and improvement.",
      ko: "저희 경험 많은 회계 팀이 귀사의 재무 상태를 검토하고 성장 및 개선 기회를 찾아드리겠습니다.",
    },
    button: {
      en: "Schedule Review",
      ko: "리뷰 예약",
    },
  },
  tax: {
    heading: {
      en: "Optimize Your Tax Strategy",
      ko: "세금 전략 최적화",
    },
    description: {
      en: "Discover how our tax experts can help you minimize liabilities and maximize savings through strategic planning.",
      ko: "저희 세무 전문가가 전략적 계획을 통해 세금 부담을 최소화하고 절세 효과를 극대화하는 방법을 알아보세요.",
    },
    button: {
      en: "Explore Strategy",
      ko: "전략 탐색",
    },
  },
  corporate: {
    heading: {
      en: "Structure Your Business",
      ko: "비즈니스 구조화",
    },
    description: {
      en: "Our corporate specialists will guide you through entity formation, governance, and compliance requirements.",
      ko: "저희 기업 전문가가 법인 설립, 거버넌스 및 준수 요구 사항을 안내해 드리겠습니다.",
    },
    button: {
      en: "Get Structured",
      ko: "구조화 시작",
    },
  },
  consulting: {
    heading: {
      en: "Transform Your Operations",
      ko: "운영 혁신하기",
    },
    description: {
      en: "Unlock your business's full potential with strategic consulting tailored to your unique challenges.",
      ko: "귀사의 독특한 과제에 맞춘 전략적 컨설팅으로 비즈니스의 모든 잠재력을 발휘하세요.",
    },
    button: {
      en: "Start Transformation",
      ko: "혁신 시작",
    },
  },
  hr: {
    heading: {
      en: "Empower Your Team",
      ko: "팀 역량 강화",
    },
    description: {
      en: "From payroll to recruitment to compliance, we help you build a thriving workforce.",
      ko: "급여에서 채용, 준수까지 저희가 활기찬 워크포스를 구축하도록 도와드리겠습니다.",
    },
    button: {
      en: "Empower Now",
      ko: "지금 강화",
    },
  },
  assurance: {
    heading: {
      en: "Verify Your Compliance",
      ko: "컴플라이언스 검증",
    },
    description: {
      en: "Ensure your financial statements are accurate and compliant with our comprehensive assurance services.",
      ko: "저희의 포괄적인 보증 서비스를 통해 재무제표의 정확성과 준수를 보장하세요.",
    },
    button: {
      en: "Schedule Audit",
      ko: "감사 예약",
    },
  },
};

interface ServiceCTAProps {
  serviceType: ServiceType;
}

export default function ServiceCTA({ serviceType }: ServiceCTAProps) {
  const { language } = useLanguage();
  const { colors } = useServiceAccent();
  const config = ctaMap[serviceType];

  const heading = language === "KOR" ? config.heading.ko : config.heading.en;
  const description = language === "KOR" ? config.description.ko : config.description.en;
  const button = language === "KOR" ? config.button.ko : config.button.en;

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4">
          {heading}
        </h2>
        <p className="text-base lg:text-lg text-white/70 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
          style={{ color: colors.primary }}
        >
          {button}
        </Link>
      </div>
    </section>
  );
}
