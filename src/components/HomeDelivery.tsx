"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslations } from "next-intl";

export default function HomeDelivery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("HomeDelivery");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-orange-100/50 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer h-full"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <i className="ph-fill ph-package absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-orange-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>

      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3.5 md:gap-4 mb-0 lg:mb-4 relative z-10 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-50 to-orange-100/50 text-orange-600 rounded-full md:rounded-2xl flex items-center justify-center text-[22px] md:text-3xl shadow-sm border border-orange-100 shrink-0">
          <i className="ph-fill ph-package"></i>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h4 className="font-serif text-[17px] md:text-2xl lg:text-xl font-semibold text-dark mb-0.5 md:mb-1 leading-tight line-clamp-2">{t("title")}</h4>
          <div className="flex items-center gap-1 md:gap-1.5">
            <i className="ph-fill ph-user text-orange-600 text-[12px] md:text-base"></i>
            <span className="text-[10px] md:text-sm lg:text-xs font-bold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal line-clamp-1">{t("deliveryName")}</span>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a 
            href="tel:+919702545810" 
            onClick={(e) => e.stopPropagation()}
            className="w-[38px] h-[38px] flex items-center justify-center bg-dark text-white hover:bg-black rounded-full transition-colors shadow-sm"
          >
            <i className="ph-fill ph-phone text-[18px]"></i>
          </a>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-cream text-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <i className="ph-bold ph-caret-down text-sm"></i>
          </div>
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-cream text-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <i className="ph-bold ph-caret-down text-base"></i>
          </div>
        </div>
      </div>

      {/* Desktop View (Always visible) */}
      <div className="hidden lg:flex flex-col flex-1 relative z-10 overflow-hidden mt-4">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-shopping-cart text-text-muted text-xl mt-0.5"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("items")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">{t("foodGroceries")}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-motorcycle text-text-muted text-xl mt-0.5"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("deliveryFee")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">{t("variesDistance")}</span>
            </div>
          </div>
        </div>

        <a
          href="tel:+919702545810"
          onClick={(e) => e.stopPropagation()}
          className="hidden lg:flex items-center justify-center w-full gap-2 py-3 bg-dark text-white rounded-xl text-base font-semibold transition-all hover:bg-black shadow-sm hover:-translate-y-1 mt-auto"
        >
          <i className="ph-fill ph-phone text-xl"></i> {t("callDelivery")}
        </a>
      </div>

      {/* Mobile View (Expandable) */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="relative z-10 overflow-hidden"
            >
              <div className="bg-orange-50/40 border border-orange-100/60 p-3.5 md:p-5 rounded-xl md:rounded-2xl mb-4 backdrop-blur-sm">
                <ul className="space-y-2.5 md:space-y-3">
                  <li className="flex justify-between items-center text-dark border-b border-orange-100/50 pb-2.5 md:pb-3">
                    <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-shopping-cart text-orange-600/70 text-lg md:text-xl"></i> {t("items")}</span>
                    <span className="text-[10px] md:text-xs bg-white text-dark px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm font-semibold border border-border/50 tracking-wide">{t("foodGroceries")}</span>
                  </li>
                  <li className="flex justify-between items-center text-dark">
                    <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-motorcycle text-orange-600/70 text-lg md:text-xl"></i> {t("deliveryFee")}</span>
                    <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm font-medium border border-border/50">{t("variesDistance")}</span>
                  </li>
                </ul>
              </div>

              <a
                href="tel:+919702545810"
                onClick={(e) => e.stopPropagation()}
                className="hidden md:flex items-center justify-center w-full gap-2 py-3 bg-dark text-white rounded-xl text-base font-semibold transition-all hover:bg-black shadow-sm hover:-translate-y-1"
              >
                <i className="ph-fill ph-phone text-xl"></i> {t("callDelivery")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
