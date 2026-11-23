"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { STAYS_DATA } from "@/data/staysData";
import StayCard from "./StayCard";

export default function StaySection() {
  const t = useTranslations("Stays");
  const [activeFilter, setActiveFilter] = useState<"all" | "2bhk" | "4bhk">("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredStays = useMemo(() => {
    if (activeFilter === "all") return STAYS_DATA;
    return STAYS_DATA.filter((stay) => stay.bhk === activeFilter);
  }, [activeFilter]);

  return (
    <section className="pt-2 md:pt-6 pb-8 md:pb-12 scroll-mt-24" id="stay">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl lg:max-w-7xl">
        {/* Section Header with Section Divider */}
        <div className="flex items-center gap-4 mb-2.5 md:mb-3">
          <div className="flex-1 h-px bg-border"></div>
          <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
            {t("sectionTitle")}
          </h2>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-xs md:text-sm text-text-muted max-w-2xl mx-auto mb-5 md:mb-6 leading-relaxed">
          {t("sectionSubtitle")}
        </p>

        {/* Filter Pills - Single Line on Mobile */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 max-w-full overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
              activeFilter === "all"
                ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-xs"
                : "bg-warm-white text-text-muted hover:text-text-main border border-border/80 hover:border-border"
            }`}
          >
            <span className="hidden sm:inline">{t("filterAll")}</span>
            <span className="sm:hidden">All</span> ({STAYS_DATA.length})
          </button>
          <button
            onClick={() => setActiveFilter("2bhk")}
            className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
              activeFilter === "2bhk"
                ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-xs"
                : "bg-warm-white text-text-muted hover:text-text-main border border-border/80 hover:border-border"
            }`}
          >
            <span className="hidden sm:inline">{t("filter2BHK")}</span>
            <span className="sm:hidden">2 BHK</span> (2)
          </button>
          <button
            onClick={() => setActiveFilter("4bhk")}
            className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
              activeFilter === "4bhk"
                ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-xs"
                : "bg-warm-white text-text-muted hover:text-text-main border border-border/80 hover:border-border"
            }`}
          >
            <span className="hidden sm:inline">{t("filter4BHK")}</span>
            <span className="sm:hidden">4 BHK</span> (1)
          </button>
        </div>

        {/* Horizontal Scroll Container on Mobile, 3-Column Grid on Desktop */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filteredStays.map((property, idx) => (
            <div
              key={property.id}
              className="snap-center md:snap-none shrink-0 w-[84vw] max-w-[340px] md:w-auto flex flex-col"
            >
              <StayCard property={property} priority={idx < 2} minimal={true} />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-text-muted/70 dark:text-neutral-400 mt-1 mb-4">
          <i className="ph-bold ph-arrows-left-right text-xs"></i>
          <span>{t("swipeToExplore")}</span>
        </div>

        {/* Bottom Banner to dedicated /stay guide */}
        <div className="mt-4 md:mt-8 text-center">
          <Link
            href="/stay"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-text-muted hover:text-airbnb-coral transition-colors px-4 py-2 rounded-full border border-border/70 hover:border-airbnb-coral/40 bg-warm-white/60 hover:bg-warm-white shadow-2xs"
          >
            <span>{t("viewComparisonAndRules")}</span>
            <i className="ph-bold ph-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
