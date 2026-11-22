"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { STAYS_DATA, HOST_PHONE } from "@/data/staysData";
import StayCard from "./StayCard";
import PageShareButton from "./PageShareButton";
import ThemeToggle from "./ThemeToggle";

export default function StayDirectory() {
  const t = useTranslations("Stays");
  const [activeFilter, setActiveFilter] = useState<"all" | "2bhk" | "4bhk">("all");

  const filteredStays = useMemo(() => {
    if (activeFilter === "all") return STAYS_DATA;
    return STAYS_DATA.filter((stay) => stay.bhk === activeFilter);
  }, [activeFilter]);

  const generalWhatsappHref = `https://wa.me/91${HOST_PHONE}?text=${encodeURIComponent(
    "Hi Athula, I'd like to inquire about booking a stay at Milan Farm Stay."
  )}`;

  return (
    <div className="min-h-screen bg-cream dark:bg-[#121212] text-text-main pb-16">
      {/* Top Header - Clean, non-cramped layout on mobile */}
      <header className="sticky top-0 z-40 h-14 bg-warm-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-border/60 dark:border-white/10 px-4 sm:px-6 flex items-center">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Back Button */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-text-main hover:text-airbnb-coral transition-colors shrink-0"
          >
            <i className="ph-bold ph-arrow-left text-base sm:text-lg transition-transform duration-200 group-hover:-translate-x-1 shrink-0"></i>
            <span>{t("backToHome")}</span>
          </Link>

          {/* Desktop-only Center Title (Hidden on mobile to prevent truncation) */}
          <h1 className="hidden md:block font-serif text-base font-bold text-dark dark:text-white truncate">
            {t("pageHeaderTitle")}
          </h1>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <PageShareButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="pt-8 pb-6 sm:pt-12 sm:pb-10 px-4 sm:px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-airbnb-coral/10 text-airbnb-coral border border-airbnb-coral/20 mb-3.5">
            <i className="ph-fill ph-house text-xs"></i>
            {t("officialListingsBadge")}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white mb-3 tracking-tight">
            {t("heroTitle")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-6">
            {t("heroSubtitle")}
          </p>

          {/* Filter Selection Buttons - Single Line on Mobile */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                activeFilter === "all"
                  ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-warm-white dark:bg-[#1A1A1A] text-text-muted hover:text-text-main dark:text-neutral-300 border border-border/80 dark:border-white/10 hover:border-border"
              }`}
            >
              <span className="hidden sm:inline">{t("filterAll")}</span>
              <span className="sm:hidden">All</span> ({STAYS_DATA.length})
            </button>
            <button
              onClick={() => setActiveFilter("2bhk")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                activeFilter === "2bhk"
                  ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-warm-white dark:bg-[#1A1A1A] text-text-muted hover:text-text-main dark:text-neutral-300 border border-border/80 dark:border-white/10 hover:border-border"
              }`}
            >
              <span className="hidden sm:inline">{t("filter2BHK")}</span>
              <span className="sm:hidden">2 BHK</span> (2)
            </button>
            <button
              onClick={() => setActiveFilter("4bhk")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                activeFilter === "4bhk"
                  ? "bg-dark text-warm-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-warm-white dark:bg-[#1A1A1A] text-text-muted hover:text-text-main dark:text-neutral-300 border border-border/80 dark:border-white/10 hover:border-border"
              }`}
            >
              <span className="hidden sm:inline">{t("filter4BHK")}</span>
              <span className="sm:hidden">4 BHK</span> (1)
            </button>
          </div>
        </div>
      </section>

      {/* Listings: Horizontal Snap Scroll on Mobile, 3-Column Grid on Desktop */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl mb-12 sm:mb-16">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredStays.map((property, idx) => (
            <div
              key={property.id}
              className="snap-center md:snap-none shrink-0 w-[84vw] max-w-[340px] md:w-auto flex flex-col"
            >
              <StayCard property={property} priority={idx === 0} minimal={true} />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-text-muted/70 dark:text-neutral-400 mt-1">
          <i className="ph-bold ph-arrows-left-right text-xs"></i>
          <span>Swipe to explore all stays</span>
        </div>
      </main>

      {/* Comparison & Property Quick Table */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl mb-12 sm:mb-16">
        <div className="bg-warm-white dark:bg-[#1A1A1A] rounded-3xl p-5 sm:p-8 border border-border/80 dark:border-white/10 shadow-xs">
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark dark:text-white mb-1.5">
              {t("comparisonTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted dark:text-neutral-400">
              {t("comparisonSubtitle")}
            </p>
          </div>

          {/* Mobile Responsive List View (100% visible text, zero truncation) */}
          <div className="sm:hidden divide-y divide-border/60 dark:divide-white/10">
            {STAYS_DATA.map((s) => (
              <div key={s.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-2">
                {/* Title & BHK Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <i className="ph-fill ph-house text-[#FF5A5F] text-base shrink-0 mt-0.5"></i>
                    <span className="font-bold text-sm text-dark dark:text-white leading-snug">
                      {s.name}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 dark:bg-white/10 text-dark dark:text-white text-[11px] font-bold shrink-0">
                    {s.bhkLabel}
                  </span>
                </div>

                {/* Capacity & Action Row */}
                <div className="flex items-center justify-between text-xs text-text-muted dark:text-neutral-300 pt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <i className="ph-fill ph-users text-[#FF5A5F] text-xs"></i>
                    <span>{s.maxGuests} {t("guests")}</span>
                    <span className="text-text-muted/40">•</span>
                    <span>{s.bedrooms} Bed · {s.bathrooms} Bath</span>
                  </span>
                  <a
                    href={s.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-airbnb-coral hover:underline shrink-0"
                  >
                    <span>{t("viewAirbnb")}</span>
                    <i className="ph-bold ph-arrow-up-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-border dark:border-white/10 text-text-muted dark:text-neutral-400">
                  <th className="py-3 px-4 font-semibold">{t("property")}</th>
                  <th className="py-3 px-4 font-semibold">{t("bhkType")}</th>
                  <th className="py-3 px-4 font-semibold">{t("capacity")}</th>
                  <th className="py-3 px-4 font-semibold">{t("bestFor")}</th>
                  <th className="py-3 px-4 font-semibold text-right">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 dark:divide-white/10">
                {STAYS_DATA.map((s) => (
                  <tr key={s.id} className="hover:bg-cream/40 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-dark dark:text-white">
                      <div className="flex items-center gap-2">
                        <i className="ph-fill ph-house text-[#FF5A5F] text-base shrink-0"></i>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-stone-200 dark:bg-white/10 text-dark dark:text-white text-[11px] font-bold whitespace-nowrap">
                        {s.bhkLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-text-muted dark:text-neutral-300 whitespace-nowrap">
                      {s.maxGuests} {t("guests")} ({s.bedrooms} Bed · {s.bathrooms} Bath)
                    </td>
                    <td className="py-3.5 px-4 text-text-muted dark:text-neutral-300">
                      {s.bhk === "4bhk" ? t("largeGroupsReunions") : t("couplesSmallFamilies")}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={s.airbnbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-airbnb-coral hover:underline whitespace-nowrap"
                      >
                        <span>{t("viewAirbnb")}</span>
                        <i className="ph-bold ph-arrow-up-right text-[10px]"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* House Rules & Guidelines */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl mb-12 sm:mb-16">
        <div className="bg-warm-white dark:bg-[#1A1A1A] rounded-3xl p-5 sm:p-8 border border-border/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <i className="ph-fill ph-shield-check text-lg"></i>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark dark:text-white">
              {t("houseRulesTitle")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-cream/60 dark:bg-white/5 border border-border/60 dark:border-white/10">
              <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
                <i className="ph-fill ph-plant text-base"></i>
                <span>{t("ruleVegOnlyTitle")}</span>
              </div>
              <p className="text-text-muted dark:text-neutral-300 leading-relaxed">
                {t("ruleVegOnlyDesc")}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream/60 dark:bg-white/5 border border-border/60 dark:border-white/10">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 mb-1.5">
                <i className="ph-fill ph-moon-stars text-base"></i>
                <span>{t("rulePeaceTitle")}</span>
              </div>
              <p className="text-text-muted dark:text-neutral-300 leading-relaxed">
                {t("rulePeaceDesc")}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream/60 dark:bg-white/5 border border-border/60 dark:border-white/10">
              <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-400 mb-1.5">
                <i className="ph-fill ph-tree text-base"></i>
                <span>{t("ruleEstateTitle")}</span>
              </div>
              <p className="text-text-muted dark:text-neutral-300 leading-relaxed">
                {t("ruleEstateDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Assistance Card (Inline Banner - High Contrast in Light & Dark Mode) */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="bg-[#1A1A1A] text-white dark:bg-[#1A1A1A] dark:border dark:border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="text-center sm:text-left min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1 block">
              {t("needAssistance")}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
              {t("chatDirectly")}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
              {t("chatDirectlyDesc")}
            </p>
          </div>
          <a
            href={generalWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
          >
            <i className="ph-fill ph-whatsapp-logo text-lg"></i>
            <span>{t("whatsappUs")}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
