"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface HostProfileProps {
  name: string;
  role: string;
  image: string;
  imgClass?: string;
  desc: string;
  years: string;
  phone: string;
}

export default function HostProfile({ name, role, image, imgClass = "w-full h-full object-cover", desc, years, phone }: HostProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ui = useTranslations("UI");

  return (
    <div 
      className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-border h-full hover:shadow-md transition-shadow cursor-pointer md:cursor-default"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-4 mb-0 md:mb-6 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-airbnb-coral/20 ring-offset-2">
          <img src={image} alt={name} className={imgClass} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <h4 className="font-serif text-[17px] md:text-2xl font-semibold text-dark mb-0.5 md:mb-1 leading-tight truncate">{name}</h4>
          <div className="flex items-center gap-1 md:gap-1.5">
            <i className="ph-fill ph-medal text-airbnb-coral text-[12px] md:text-base"></i>
            <span className="text-[10px] md:text-sm font-bold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal truncate">{role}</span>
          </div>
        </div>

        {/* Mobile action buttons & Chevron */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <a href={`tel:+91${phone}`} onClick={(e) => e.stopPropagation()} className="w-9 h-9 flex items-center justify-center bg-dark text-white hover:bg-black rounded-full transition-colors shadow-sm">
            <i className="ph-fill ph-phone text-[16px]"></i>
          </a>
          <a href={`https://wa.me/91${phone}`} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20b858] rounded-full transition-colors shadow-sm">
            <i className="ph-fill ph-whatsapp-logo text-[17px]"></i>
          </a>
          <div className={`w-7 h-7 flex items-center justify-center rounded-full bg-cream text-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <i className="ph-bold ph-caret-down text-[12px]"></i>
          </div>
        </div>
      </div>

      {/* Mobile Expandable Metadata */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="md:hidden overflow-hidden relative z-10"
          >
            <div className="flex flex-col gap-2.5 bg-cream/40 p-3.5 rounded-xl border border-border/50">
              <div className="flex items-start gap-2.5 text-dark">
                <i className="ph-fill ph-briefcase text-text-muted text-[17px] mt-0.5"></i>
                <span className="text-[13px] font-medium leading-snug">{desc}</span>
              </div>
              <div className="flex items-start gap-2.5 text-dark">
                <i className="ph-fill ph-clock text-text-muted text-[17px] mt-0.5"></i>
                <span className="text-[13px] font-medium leading-snug">{years}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop only metadata (always visible) */}
      <div className="hidden md:flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-3 text-dark">
          <i className="ph-fill ph-briefcase text-text-muted text-xl"></i>
          <span className="text-sm font-medium">{desc}</span>
        </div>
        <div className="flex items-center gap-3 text-dark">
          <i className="ph-fill ph-clock text-text-muted text-xl"></i>
          <span className="text-sm font-medium">{years}</span>
        </div>
      </div>

      {/* Desktop only action buttons */}
      <div className="hidden md:flex flex-row gap-3 mt-auto">
        <a href={`tel:+91${phone}`} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-2 py-3 bg-dark text-white hover:bg-black rounded-xl text-base font-semibold transition-transform hover:-translate-y-1 shadow-sm">
          <i className="ph-fill ph-phone text-xl"></i> {ui("call")}
        </a>
        <a href={`https://wa.me/91${phone}`} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white hover:bg-[#20b858] rounded-xl text-base font-semibold transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md">
          <i className="ph-fill ph-whatsapp-logo text-xl"></i> {ui("wa")}
        </a>
      </div>
    </div>
  );
}
