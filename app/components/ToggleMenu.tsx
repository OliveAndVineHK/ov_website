"use client";

interface ToggleMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ToggleMenu({ isOpen, setIsOpen }: ToggleMenuProps) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button onClick={toggleMenu} onMouseEnter={() => setIsOpen(true)} className={`flex flex-col items-center justify-center w-10 h-10 rounded-full border border-[#495F2B] hover:border-[#495F2B]/80 transition-colors cursor-pointer ${isOpen ? 'bg-[#F9F8F3]' : ''}`} aria-label="Toggle menu" aria-expanded={isOpen} >
      <span className={`w-5 h-[2px] bg-[#495F2B] mb-1 transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
      <span className={`w-5 h-[2px] bg-[#495F2B] mb-1 transition-all ${isOpen ? "opacity-0" : ""}`}></span>
      <span className={`w-5 h-[2px] bg-[#495F2B] transition-all ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
    </button>
  );
}
