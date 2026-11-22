"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TravelRentalsCard() {
  const t = useTranslations("Page");

  return (
    <motion.div
      id="travel-rentals-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="w-full max-w-4xl mx-auto scroll-mt-28"
    >
      <Link
        href="/rentals"
        className="group relative block bg-warm-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md border border-emerald-100/60 dark:border-emerald-500/20 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Subtle Watermark in Background */}
        <i className="ph-fill ph-moped absolute -right-6 -bottom-6 text-[140px] md:text-[200px] text-emerald-500/[0.03] dark:text-emerald-400/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-6 relative z-10">
          {/* Header Info */}
          <div className="flex items-center gap-3.5 md:gap-4 text-left min-w-0 flex-1">
            {/* Themed Icon Box matching Food & Delivery cards */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/20 dark:to-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-[22px] md:text-3xl shadow-sm border border-emerald-100/60 dark:border-emerald-500/20 shrink-0">
              <i className="ph-fill ph-moped"></i>
            </div>

            <div className="flex flex-col min-w-0">
              <h4 className="font-serif text-[17px] md:text-2xl lg:text-xl font-semibold text-dark mb-0.5 md:mb-1 leading-snug md:leading-tight truncate">
                {t("travelCardTitle")}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                <div className="flex items-center gap-1 text-[11px] md:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  <i className="ph-fill ph-map-pin text-xs shrink-0"></i>
                  <span>{t("travelCardSubtitle")}</span>
                </div>
                <span className="text-text-muted/40 text-xs hidden sm:inline">•</span>
                <span className="text-xs text-text-muted hidden sm:inline">
                  {t("travelCardLocations")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-3.5 md:mt-0 pt-3 md:pt-0 border-t border-emerald-100/60 dark:border-emerald-500/20 md:border-t-0 relative z-10 w-full md:w-auto shrink-0">
            <div className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 md:py-3 bg-dark text-warm-white group-hover:opacity-90 active:scale-[0.98] rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all shadow-sm">
              <i className="ph-fill ph-steering-wheel text-base md:text-xl"></i>
              <span>{t("travelCardCta")}</span>
              <i className="ph-bold ph-arrow-right text-xs md:text-sm transition-transform duration-200 group-hover:translate-x-0.5"></i>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
