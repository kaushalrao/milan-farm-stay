"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CoffeeShowcaseCard() {
  const t = useTranslations("Page");

  return (
    <motion.div
      id="coffee-showcase-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-warm-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col justify-between border border-amber-200/60 dark:border-amber-500/20 relative overflow-hidden group hover:shadow-md transition-shadow h-full scroll-mt-28"
    >
      {/* Subtle Background Watermark */}
      <i className="ph-fill ph-coffee absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-amber-500/[0.03] dark:text-amber-400/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>

      {/* Header Info */}
      <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-4 mb-0 md:mb-4 relative z-10 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-500/20 dark:to-amber-500/10 text-[#4A3B2C] dark:text-[#d4a373] rounded-2xl flex items-center justify-center text-[22px] md:text-3xl shadow-sm border border-amber-200/60 dark:border-amber-500/20 shrink-0">
          <i className="ph-fill ph-coffee"></i>
        </div>
        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <h4 className="font-serif text-[17px] md:text-2xl lg:text-xl font-semibold text-dark mb-0.5 md:mb-1 leading-snug md:leading-tight break-words">
            {t("coffeeCardTitle")}
          </h4>
          <div className="flex items-center gap-1.5 min-w-0">
            <i className="ph-fill ph-plant text-amber-700 dark:text-amber-400 text-[13px] md:text-base shrink-0"></i>
            <span className="text-[11px] md:text-sm font-semibold text-amber-800 dark:text-amber-300 truncate">
              {t("coffeeCardSubtitle")}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Feature Details (Matching HomeCook & HomeDelivery) */}
      <div className="hidden md:flex flex-col flex-1 relative z-10 overflow-hidden mt-4">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-package text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Arabica & Robusta</span>
              <span className="text-[13px] text-text-muted font-medium leading-tight">Freshly roasted 80:20 blends</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-dark">
            <i className="ph-fill ph-tag text-text-muted text-xl mt-0.5 shrink-0"></i>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">From ₹200</span>
              <span className="text-[13px] text-emerald-600 dark:text-emerald-400 font-medium">250g, 500g & 1kg packs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3.5 md:mt-auto pt-3 md:pt-0 border-t border-amber-200/60 dark:border-amber-500/20 md:border-t-0 relative z-10 w-full">
        <Link
          href="/order-coffee"
          className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3 bg-dark text-warm-white hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm"
        >
          <i className="ph-fill ph-shopping-bag text-base md:text-xl"></i>
          <span>{t("coffeeCardCta")}</span>
          <i className="ph-bold ph-arrow-right text-xs md:text-sm"></i>
        </Link>
      </div>
    </motion.div>
  );
}
