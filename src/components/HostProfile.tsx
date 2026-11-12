"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface HostProfileProps {
  id?: string;
  name: string;
  role: string;
  image: string;
  imgClass?: string;
  desc: string;
  years: string;
  phone: string;
}

export default function HostProfile({ id, name, role, image, imgClass = "w-full h-full object-cover", desc, years, phone }: HostProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ui = useTranslations("UI");

  return (
    <div 
      id={id}
      className="bg-warm-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-border h-full hover:shadow-md transition-shadow cursor-pointer md:cursor-default scroll-mt-28"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-4 mb-0 md:mb-6 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-airbnb-coral/20 ring-offset-2 ring-offset-warm-white">
          <img src={image} alt={name} className={imgClass} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <h4 className="font-serif text-[17px] md:text-2xl font-semibold text-dark mb-0.5 md:mb-1 leading-snug md:leading-tight break-words">{name}</h4>
          <div className="flex items-center gap-1.5">
            <i className="ph-fill ph-medal text-airbnb-coral text-[13px] md:text-base shrink-0"></i>
            <span className="text-[11px] md:text-sm font-semibold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal">{role}</span>
          </div>
        </div>

        {/* Mobile expand toggle chevron */}
        <div className="md:hidden shrink-0 pl-1">
          <div 
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-cream dark:bg-white/10 text-dark dark:text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <i className="ph-bold ph-caret-down text-[13px]"></i>
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
            className="md:hidden overflow-hidden relative z-10 w-full"
          >
            <div className="flex flex-col gap-2.5 bg-cream/40 dark:bg-white/5 p-3.5 rounded-xl border border-border/50 dark:border-white/10">
              <div className="flex items-start gap-2.5 text-dark">
                <i className="ph-fill ph-briefcase text-text-muted text-[17px] mt-0.5 shrink-0"></i>
                <span className="text-[13px] font-medium leading-snug">{desc}</span>
              </div>
              <div className="flex items-start gap-2.5 text-dark">
                <i className="ph-fill ph-clock text-text-muted text-[17px] mt-0.5 shrink-0"></i>
                <span className="text-[13px] font-medium leading-snug">{years}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop only metadata (always visible) */}
      <div className="hidden md:flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-3 text-dark">
          <i className="ph-fill ph-briefcase text-text-muted text-xl shrink-0"></i>
          <span className="text-sm font-medium">{desc}</span>
        </div>
        <div className="flex items-center gap-3 text-dark">
          <i className="ph-fill ph-clock text-text-muted text-xl shrink-0"></i>
          <span className="text-sm font-medium">{years}</span>
        </div>
      </div>

      {/* Action buttons (both Mobile and Desktop) */}
      <div className="flex flex-row gap-2.5 md:gap-3 mt-3.5 md:mt-auto pt-3 md:pt-0 border-t border-border/60 md:border-t-0 relative z-10 w-full">
        <a 
          href={`tel:+91${phone}`} 
          onClick={(e) => e.stopPropagation()} 
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 md:py-3 bg-dark text-warm-white hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm"
        >
          <i className="ph-fill ph-phone text-base md:text-xl"></i>
          <span>{ui("call")}</span>
        </a>
        <a 
          href={`https://wa.me/91${phone}`} 
          onClick={(e) => e.stopPropagation()} 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 md:py-3 bg-[#25D366] text-white hover:bg-[#20b858] active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <i className="ph-fill ph-whatsapp-logo text-base md:text-xl"></i>
          <span>{ui("wa")}</span>
        </a>
      </div>
    </div>
  );
}
