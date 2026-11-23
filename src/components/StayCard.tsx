"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StayProperty } from "@/data/staysData";
import { useTranslations } from "next-intl";

interface StayCardProps {
  property: StayProperty;
  preload?: boolean;
  priority?: boolean;
  minimal?: boolean;
}

export default function StayCard({ property, preload, priority, minimal = false }: StayCardProps) {
  const t = useTranslations("Stays");
  const shouldPreload = preload ?? priority ?? false;

  const whatsappHref = `https://wa.me/91${property.hostPhone}?text=${encodeURIComponent(
    property.whatsappMessage
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "250px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-warm-white dark:bg-[#161C18] border border-border/80 dark:border-white/10 text-text-main dark:text-white flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-2xl transition-all duration-500 h-full"
    >
      {/* TOP: Image with Floating Badges & Theme-Aware Color Bleed */}
      <div className="relative w-full aspect-16/11 sm:aspect-16/10 overflow-hidden shrink-0">
        <a
          href={property.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${property.name} - ${t("viewOnAirbnb")}`}
          className="relative block w-full h-full cursor-pointer"
        >
          <Image
            src={property.coverImage}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
            preload={shouldPreload}
            loading={shouldPreload ? "eager" : "lazy"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Top Subtle Gradient for Floating Badges (always dark on top of photo) */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <i className="ph-fill ph-house text-[#FF5A5F] text-xs"></i>
              {t("viewPhotosOnAirbnb")}
              <i className="ph-bold ph-arrow-up-right text-[10px]"></i>
            </span>
          </div>
        </a>

        {/* Floating Top Badges (High contrast on top of photo in both themes) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* BHK Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/55 backdrop-blur-md text-white border border-white/15 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {property.bhkLabel}
          </span>

          {/* Rating / Badge Pill */}
          <div className="flex items-center gap-1.5">
            {property.rating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-black/55 backdrop-blur-md text-white border border-white/15 shadow-sm">
                <i className="ph-fill ph-star text-[#FF5A5F] text-xs"></i>
                <span>{property.rating}</span>
                {property.isGuestFavorite && (
                  <span className="text-[10px] text-white/85 font-normal ml-0.5">
                    · {t("guestFavorite")}
                  </span>
                )}
              </span>
            )}
            {!property.rating && property.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/90 text-white backdrop-blur-md border border-white/15 shadow-sm">
                {property.badge}
              </span>
            )}
          </div>
        </div>

        {/* Theme-Adaptive Color Bleed: Ultra-soft edge fade so the photo stays 90%+ crisp & unblurred */}
        {/* Light theme: Low-profile 32px fade into warm-white (#FCFBF8), keeping furniture & floor crisp */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent via-[#FCFBF8]/25 to-[#FCFBF8] dark:hidden pointer-events-none" />
        {/* Dark theme: Cinematic 40px vignette fade into forest charcoal (#161C18) */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent via-[#161C18]/35 to-[#161C18] hidden dark:block pointer-events-none" />
      </div>

      {/* BOTTOM: Seamless Card Content (Bleeds into light warm-white or dark forest background) */}
      <div className="p-4 sm:p-5 pt-2.5 flex-1 flex flex-col justify-between gap-3 bg-warm-white dark:bg-[#161C18]">
        <div>
          {/* Location & Pure Veg Tag */}
          <div className="flex items-center justify-between text-xs text-text-muted dark:text-white/75 mb-2">
            <span className="flex items-center gap-1.5 truncate max-w-[65%] font-medium text-text-main dark:text-white/90">
              <i className="ph-fill ph-map-pin text-[#FF5A5F] shrink-0 text-xs"></i>
              <span className="truncate">{property.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
              <i className="ph-fill ph-plant text-emerald-600 dark:text-emerald-400"></i>
              {t("vegOnly")}
            </span>
          </div>

          {/* Title */}
          <a
            href={property.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group/title mb-2"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-dark dark:text-white group-hover/title:text-airbnb-coral transition-colors leading-tight line-clamp-1">
              {property.name}
            </h3>
          </a>

          {/* Specs Metabar with Icons */}
          <div className="flex items-center gap-2.5 text-xs text-text-muted dark:text-white/80 font-medium">
            <span className="flex items-center gap-1 text-text-main dark:text-white">
              <i className="ph-fill ph-users text-[#FF5A5F] text-xs"></i>
              {property.maxGuests} {t("guests")}
            </span>
            <span className="text-text-muted/40 dark:text-white/30">•</span>
            <span className="flex items-center gap-1 text-text-main dark:text-white">
              <i className="ph-fill ph-bed text-[#FF5A5F] text-xs"></i>
              {property.bedrooms} {t("bedrooms")}
            </span>
            <span className="text-text-muted/40 dark:text-white/30">•</span>
            <span className="flex items-center gap-1 text-text-main dark:text-white">
              <i className="ph-fill ph-shower text-[#FF5A5F] text-xs"></i>
              {property.bathrooms} {t("bathrooms")}
            </span>
          </div>

          {/* Non-minimal Highlights (only on /stay directory if minimal is false) */}
          {!minimal && (
            <ul className="space-y-1 mt-3 pt-3 text-[11px] text-text-muted dark:text-white/75 border-t border-border/70 dark:border-white/10">
              {property.highlights.slice(0, 2).map((hl, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <i className="ph-bold ph-check text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 shrink-0"></i>
                  <span className="line-clamp-1">{hl}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Button Row */}
        <div className="pt-3 flex items-center gap-2 border-t border-border/70 dark:border-white/10">
          {/* Direct WhatsApp Quick Inquiry */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream hover:bg-emerald-50 dark:bg-white/10 dark:hover:bg-[#25D366] text-emerald-600 dark:text-white border border-border dark:border-white/20 transition-all duration-200 active:scale-95 shadow-2xs cursor-pointer"
            title={t("inquireOnWhatsapp")}
            aria-label={t("inquireOnWhatsapp")}
          >
            <i className="ph-fill ph-whatsapp-logo text-lg"></i>
          </a>

          {/* Primary Pill Button: Book on Airbnb */}
          <a
            href={property.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#FF5A5F] hover:bg-[#E00B41] text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] group/btn cursor-pointer"
          >
            <i className="ph-fill ph-house text-sm"></i>
            <span>{t("bookOnAirbnb")}</span>
            <i className="ph-bold ph-arrow-up-right text-[11px] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
