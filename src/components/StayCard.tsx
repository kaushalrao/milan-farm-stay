"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StayProperty } from "@/data/staysData";
import { useTranslations } from "next-intl";

interface StayCardProps {
  property: StayProperty;
  priority?: boolean;
  minimal?: boolean;
}

export default function StayCard({ property, priority = false, minimal = false }: StayCardProps) {
  const t = useTranslations("Stays");

  const whatsappHref = `https://wa.me/91${property.hostPhone}?text=${encodeURIComponent(
    property.whatsappMessage
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "250px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full flex flex-col bg-warm-white dark:bg-[#1A1A1A] rounded-3xl border border-border/80 dark:border-white/10 hover:border-airbnb-coral/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Cover Image Container with direct Airbnb link */}
      <a
        href={property.airbnbUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${property.name} - ${t("viewOnAirbnb")}`}
        className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-900 block cursor-pointer shrink-0"
      >
        <Image
          src={property.coverImage}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Gradient for Badge Readability */}
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-black/65 backdrop-blur-md text-white border border-white/15 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {property.bhkLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {property.rating && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-black/65 backdrop-blur-md text-white border border-white/15 shadow-xs">
                <i className="ph-fill ph-star text-[#FF5A5F] text-xs"></i>
                <span className="text-white font-bold">{property.rating}</span>
                {property.isGuestFavorite && (
                  <span className="text-[10px] text-white/85 font-normal ml-0.5 hidden sm:inline">
                    · {t("guestFavorite")}
                  </span>
                )}
              </span>
            )}
            {!property.rating && property.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-700/90 text-white backdrop-blur-md shadow-xs">
                {property.badge}
              </span>
            )}
          </div>
        </div>

        {/* Hover Hint Overlay to Airbnb */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-black/90 text-dark dark:text-white text-xs font-semibold shadow-md backdrop-blur-sm transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
            <i className="ph-fill ph-house text-[#FF5A5F] text-xs"></i>
            {t("viewPhotosOnAirbnb")}
            <i className="ph-bold ph-arrow-up-right text-[10px]"></i>
          </span>
        </div>
      </a>

      {/* Card Content */}
      <div className={`p-4 sm:p-5 flex-1 flex flex-col justify-between ${minimal ? "gap-3" : "gap-4"}`}>
        <div>
          {/* Location & Veg Badge */}
          <div className="flex items-center justify-between text-[11px] text-text-muted dark:text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1 truncate max-w-[65%]">
              <i className="ph-fill ph-map-pin text-[#FF5A5F] shrink-0"></i>
              <span className="truncate">{property.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
              <i className="ph-fill ph-plant text-emerald-600 dark:text-emerald-400"></i>
              {t("vegOnly")}
            </span>
          </div>

          {/* Title */}
          <a
            href={property.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title block mb-2"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-dark dark:text-white group-hover/title:text-airbnb-coral transition-colors leading-snug line-clamp-1">
              {property.name}
            </h3>
          </a>

          {/* Minimal Specs: Simple, elegant single-line metadata */}
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-neutral-400 font-medium mb-1">
            <span className="flex items-center gap-1 text-text-main dark:text-neutral-200">
              <i className="ph-fill ph-users text-[#FF5A5F] text-xs"></i>
              {property.maxGuests} {t("guests")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-text-main dark:text-neutral-200">
              <i className="ph-fill ph-bed text-[#FF5A5F] text-xs"></i>
              {property.bedrooms} {t("bedrooms")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-text-main dark:text-neutral-200">
              <i className="ph-fill ph-shower text-[#FF5A5F] text-xs"></i>
              {property.bathrooms} {t("bathrooms")}
            </span>
          </div>

          {/* Non-minimal details (only shown when minimal=false, e.g. on full directory page) */}
          {!minimal && (
            <>
              {/* Key Highlights */}
              <ul className="space-y-1.5 my-3 text-xs text-text-muted border-t border-border/60 pt-3">
                {property.highlights.slice(0, 3).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="ph-bold ph-check text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 shrink-0"></i>
                    <span className="line-clamp-1">{hl}</span>
                  </li>
                ))}
              </ul>

              {/* Amenities Badges */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {property.amenities.slice(0, 4).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-cream dark:bg-white/5 border border-border/70 text-text-main"
                  >
                    <i className={`ph ${amenity.icon} text-text-muted text-xs`}></i>
                    {amenity.label}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Dual Actions: Airbnb Book + WhatsApp */}
        <div className="pt-3 flex items-center gap-2 border-t border-border/60 dark:border-white/10">
          <a
            href={property.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#FF5A5F] hover:bg-[#E00B41] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-sm active:scale-[0.99] cursor-pointer group/btn"
          >
            <i className="ph-fill ph-house text-sm"></i>
            <span>{t("bookOnAirbnb")}</span>
            <i className="ph-bold ph-arrow-up-right text-[11px] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border hover:border-emerald-500/50 bg-cream/70 dark:bg-white/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-all duration-200 active:scale-95 cursor-pointer"
            title={t("inquireOnWhatsapp")}
            aria-label={t("inquireOnWhatsapp")}
          >
            <i className="ph-fill ph-whatsapp-logo text-lg"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
