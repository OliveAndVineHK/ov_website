"use client";

import { useState, useEffect } from "react";
import * as Icons from "@/app/utils/icons";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("[data-footer]") ?? document.querySelector('section[class*="bg-\\[#282A28\\]"]');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Show button when footer is visible in viewport
        setIsVisible(footerTop < windowHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#495F2B] hover:bg-[#627F38] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
      aria-label="Scroll to top"
    >
      <Icons.CgArrowTopRight className="w-6 h-6 rotate-[-45deg]" />
    </button>
  );
}
