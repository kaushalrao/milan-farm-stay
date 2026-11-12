"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CookModal from "./CookModal";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomeCook() {
  const [cookModalOpen, setCookModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("HomeCook");

  return (
    <div 
      id="home-cook"
      className="bg-warm-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-green-100/60 dark:border-green-500/20 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer md:cursor-default h-full scroll-mt-28"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <i className="ph-fill ph-leaf absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-green-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>
      
      <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-4 mb-0 md:mb-4 relative z-10 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-500/20 dark:to-green-500/10 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center text-[22px] md:text-3xl shadow-sm border border-green-100/60 dark:border-green-500/20 shrink-0">
          <i className="ph-fill ph-cooking-pot"></i>
        </div>
        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <h4 className="font-serif text-[17px] md:text-2xl lg:text-xl font-semibold text-dark mb-0.5 md:mb-1 leading-snug md:leading-tight break-words">{t("title")}</h4>
          <div className="flex items-center gap-1.5">
            <i className="ph-fill ph-chef-hat text-green-600 dark:text-green-400 text-[13px] md:text-base shrink-0"></i>
            <span className="text-[11px] md:text-sm lg:text-xs font-semibold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal">{t("cookName")}</span>
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

      {/* Desktop View (Always visible) */}
      <div className="hidden md:flex flex-col flex-1 relative z-10 overflow-hidden mt-4">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-coffee text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("breakfast")}</span>
              <span className="text-[13px] text-green-600 dark:text-green-400 font-medium">{t("complementary")}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-bowl-food text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("lunch")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">{t("preOrder4hrs")}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-moon-stars text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("dinner")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">{t("preOrder4hrs")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View (Expandable) */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="relative z-10 overflow-hidden w-full"
            >
              <div className="bg-green-50/40 dark:bg-green-500/10 border border-green-100/60 dark:border-green-500/20 p-3.5 rounded-xl mb-1 backdrop-blur-sm">
                <ul className="space-y-2.5">
                  <li className="flex justify-between items-center text-dark border-b border-green-100/60 dark:border-green-500/20 pb-2.5">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-medium"><i className="ph-fill ph-coffee text-green-600 dark:text-green-400/70 text-base shrink-0"></i> {t("breakfast")}</span>
                    <span className="text-[10px] bg-warm-white dark:bg-white/5 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md shadow-sm font-semibold border border-green-100/60 dark:border-green-500/20 uppercase tracking-wide">{t("complementary")}</span>
                  </li>
                  <li className="flex justify-between items-center text-dark border-b border-green-100/60 dark:border-green-500/20 pb-2.5">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-medium"><i className="ph-fill ph-bowl-food text-green-600 dark:text-green-400/70 text-base shrink-0"></i> {t("lunch")}</span>
                    <span className="text-[10px] bg-warm-white dark:bg-white/5 text-text-muted dark:text-gray-300 px-2 py-0.5 rounded-md shadow-sm font-medium border border-border/50 dark:border-white/10">{t("preOrder4hrs")}</span>
                  </li>
                  <li className="flex justify-between items-center text-dark">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-medium"><i className="ph-fill ph-moon-stars text-green-600 dark:text-green-400/70 text-base shrink-0"></i> {t("dinner")}</span>
                    <span className="text-[10px] bg-warm-white dark:bg-white/5 text-text-muted dark:text-gray-300 px-2 py-0.5 rounded-md shadow-sm font-medium border border-border/50 dark:border-white/10">{t("preOrder4hrs")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons (both Mobile and Desktop) */}
      <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-2.5 mt-3.5 md:mt-auto pt-3 md:pt-0 border-t border-green-100/60 dark:border-green-500/20 md:border-t-0 relative z-10 w-full">
        <Link 
          href="/order-food" 
          onClick={(e) => e.stopPropagation()} 
          className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold shadow-sm transition-all shadow-[0_0_12px_rgba(22,163,74,0.25)]"
        >
          <i className="ph-fill ph-shopping-cart text-base md:text-xl"></i>
          <span>Order</span>
          <span className="hidden sm:inline md:hidden lg:inline"> Online</span>
        </Link>
        <button 
          onClick={(e) => { e.stopPropagation(); setCookModalOpen(true); }} 
          className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 bg-dark text-warm-white hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold shadow-sm transition-all"
        >
          <i className="ph-fill ph-phone text-base md:text-xl"></i>
          <span className="truncate">{t("contactCook")}</span>
        </button>
      </div>

      <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />
    </div>
  );
}
