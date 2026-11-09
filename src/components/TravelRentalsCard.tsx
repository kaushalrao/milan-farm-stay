"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TravelRentalsCard() {
  const t = useTranslations("Page");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full max-w-4xl mx-auto"
    >
      <Link
        href="/rentals"
        className="group relative block bg-warm-white rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl border border-border/80 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
      >
        {/* Subtle Watermark Icons in Background */}
        <i className="ph-fill ph-moped absolute -right-6 -bottom-8 text-[160px] md:text-[230px] text-emerald-600/[0.04] dark:text-emerald-400/[0.04] rotate-[-12deg] pointer-events-none transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[-6deg]"></i>
        <i className="ph-fill ph-car absolute right-32 -bottom-10 text-[120px] md:text-[180px] text-blue-600/[0.03] dark:text-blue-400/[0.03] rotate-[6deg] pointer-events-none transition-transform duration-700 group-hover:scale-105"></i>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          {/* Left Details */}
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                <i className="ph-fill ph-map-pin text-emerald-600 dark:text-emerald-400 text-xs"></i>
                {t("travelCardBadge")}
              </span>
              <span className="text-[11px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300">
                Self-Drive & Taxis
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="font-serif text-2xl md:text-3xl lg:text-3xl font-bold text-dark group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2 leading-tight">
              {t("travelCardTitle")}
            </h3>
            <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-2xl mb-5">
              {t("travelCardDesc")}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-cream dark:bg-white/5 border border-border/60 text-dark dark:text-gray-200 px-3 py-1.5 rounded-xl font-medium">
                <i className="ph-fill ph-moped text-emerald-600 dark:text-emerald-400 text-sm"></i>
                Self-Drive Bikes & Scooters
              </span>
              <span className="inline-flex items-center gap-1.5 bg-cream dark:bg-white/5 border border-border/60 text-dark dark:text-gray-200 px-3 py-1.5 rounded-xl font-medium">
                <i className="ph-fill ph-car text-emerald-600 dark:text-emerald-400 text-sm"></i>
                Self-Drive Cars
              </span>
              <span className="inline-flex items-center gap-1.5 bg-cream dark:bg-white/5 border border-border/60 text-dark dark:text-gray-200 px-3 py-1.5 rounded-xl font-medium">
                <i className="ph-fill ph-taxi text-blue-600 dark:text-blue-400 text-sm"></i>
                Local Cabs with Drivers
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
            <div className="inline-flex items-center justify-center w-full md:w-auto gap-2.5 px-6 py-3.5 bg-dark text-warm-white dark:text-neutral-900 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:text-white rounded-2xl text-sm font-semibold transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5">
              <span>{t("travelCardCta")}</span>
              <i className="ph-bold ph-arrow-right text-base transition-transform duration-300 group-hover:translate-x-1"></i>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
