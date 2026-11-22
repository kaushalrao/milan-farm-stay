"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function JioMartDelivery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("JioMart");

  return (
    <motion.div
      id="jiomart-delivery"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-warm-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-blue-100/60 dark:border-blue-500/20 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer md:cursor-default h-full scroll-mt-28"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Watermark Icon */}
      <i className="ph-fill ph-shopping-bag absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-blue-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>

      {/* Top Header */}
      <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-4 mb-0 md:mb-4 relative z-10 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 dark:border-blue-500/20 shrink-0 bg-white flex items-center justify-center p-1.5">
          <Image
            src="/images/jiomart-logo.png"
            alt="JioMart"
            width={64}
            height={64}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <h4 className="font-serif text-[17px] md:text-2xl lg:text-xl font-semibold text-dark mb-0.5 md:mb-1 leading-snug md:leading-tight break-words">
            {t("title")}
          </h4>
          <div className="flex items-center gap-1.5">
            <i className="ph-fill ph-truck text-[#0078AD] dark:text-blue-400 text-[13px] md:text-base shrink-0"></i>
            <span className="text-[11px] md:text-sm lg:text-xs font-semibold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal">
              {t("deliveryName")}
            </span>
          </div>
        </div>

        {/* Mobile expand toggle chevron */}
        <div className="md:hidden shrink-0 pl-1">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-cream dark:bg-white/10 text-dark dark:text-white transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
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
            <i className="ph-fill ph-house-line text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("homeDelivery")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">
                {t("homeDeliveryDesc")}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-basket text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t("items")}</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">
                {t("itemsDesc")}
              </span>
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
              <div className="bg-blue-50/40 dark:bg-blue-500/10 border border-blue-100/60 dark:border-blue-500/20 p-3.5 rounded-xl mb-1 backdrop-blur-sm">
                <ul className="space-y-2.5">
                  <li className="flex justify-between items-center text-dark border-b border-blue-100/60 dark:border-blue-500/20 pb-2.5">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                      <i className="ph-fill ph-house-line text-[#0078AD] dark:text-blue-400 text-base shrink-0"></i>
                      {t("homeDelivery")}
                    </span>
                    <span className="text-[10px] bg-warm-white dark:bg-white/5 text-dark dark:text-white px-2 py-0.5 rounded-md shadow-sm font-semibold border border-border/50 tracking-wide">
                      Direct to Stay
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-dark">
                    <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                      <i className="ph-fill ph-basket text-[#0078AD] dark:text-blue-400 text-base shrink-0"></i>
                      {t("items")}
                    </span>
                    <span className="text-[10px] bg-warm-white dark:bg-white/5 text-text-muted dark:text-gray-300 px-2 py-0.5 rounded-md shadow-sm font-medium border border-border/50">
                      Groceries & Snacks
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons (both Mobile and Desktop) */}
      <div className="mt-3.5 md:mt-auto pt-3 md:pt-0 border-t border-blue-100/60 dark:border-blue-500/20 md:border-t-0 relative z-10 w-full">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.jpl.jiomart"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 px-2 bg-dark text-warm-white hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
            title="Download JioMart on Google Play"
          >
            <i className="ph-fill ph-google-play-logo text-base md:text-lg text-emerald-400 shrink-0"></i>
            <span className="truncate">{t("playStore")}</span>
          </a>

          <a
            href="https://apps.apple.com/in/app/jiomart-online-shopping-app/id1522085683"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 px-2 bg-dark text-warm-white hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
            title="Download JioMart on Apple App Store"
          >
            <i className="ph-fill ph-apple-logo text-base md:text-lg shrink-0"></i>
            <span className="truncate">{t("appStore")}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
