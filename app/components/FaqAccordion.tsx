"use client";

import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as Icons from "@/app/utils/icons";

export interface FaqItem {
  question: { en: string; ko: string };
  answer: { en: string; ko: string };
}

interface FaqAccordionProps {
  items: FaqItem[];
  language: string;
  title?: { en: string; ko: string };
}

export default function FaqAccordion({ items, language, title }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isKo = language === "KOR";

  return (
    <>
      {title && (
        <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">
          {isKo ? title.ko : title.en}
        </h3>
      )}
      <div className="w-full mb-4 sm:mb-5 md:mb-6">
        {items.map((item, index) => {
          const question = isKo ? item.question.ko : item.question.en;
          const answer = isKo ? item.answer.ko : item.answer.en;
          return (
            <Accordion
              key={index}
              expanded={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
              disableGutters
              sx={{
                border: "1px solid rgba(17, 27, 18, 0.2)",
                "&:first-of-type": { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" },
                "&:last-of-type": { borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" },
                "& + &": { borderTop: "none" },
                "&:before": { display: "none" },
                boxShadow: "none",
                "&.Mui-expanded": { margin: 0 },
              }}
            >
              <AccordionSummary
                expandIcon={<Icons.BiSolidChevronRight className="w-5 h-5 text-[#111B12] shrink-0" />}
                aria-controls={`faq-panel-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  flexDirection: "row-reverse",
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 2, sm: 2.5 },
                  minHeight: "auto",
                  "& .MuiAccordionSummary-content": { margin: 0 },
                  "& .MuiAccordionSummary-expandIconWrapper": { transition: "transform 0.2s", marginRight: "12px" },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(90deg)" },
                  "&:hover": { backgroundColor: "transparent", borderColor: "#627F38" },
                  "&.Mui-focusVisible": { backgroundColor: "transparent" },
                  border: "1px solid transparent",
                }}
              >
                <span className="text-base sm:text-lg md:text-xl font-bold text-[#111B12]">{question}</span>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 2, px: { xs: 2, sm: 2.5 }, pb: 2, borderTop: "1px solid rgba(17, 27, 18, 0.1)" }}>
                <p className="text-sm sm:text-base md:text-lg text-[#111B12] leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: answer }} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}
