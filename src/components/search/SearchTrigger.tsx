"use client";

import React, { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useTranslations } from "next-intl";

interface SearchTriggerProps {
  variant?: "desktop-pill" | "mobile-icon" | "mobile-pill";
  className?: string;
}

export default function SearchTrigger({
  variant = "desktop-pill",
  className = "",
}: SearchTriggerProps) {
  const { openSearch } = useSearch();
  const tSearch = useTranslations("Search");

  // Lazy initialize Mac check without triggering extra renders
  const [isMac] = useState(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return true;
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || "");
  });

  if (variant === "mobile-icon") {
    return (
      <button
        type="button"
        onClick={() => openSearch()}
        aria-label="Open search"
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-text-main hover:text-airbnb-coral bg-cream/70 dark:bg-white/10 border border-border/70 hover:border-airbnb-coral/40 active:scale-90 transition-all shrink-0 cursor-pointer ${className}`}
      >
        <i className="ph-bold ph-magnifying-glass text-base sm:text-lg"></i>
      </button>
    );
  }

  if (variant === "mobile-pill") {
    return (
      <button
        type="button"
        onClick={() => openSearch()}
        aria-label="Open search"
        className={`w-full py-2.5 px-4 rounded-2xl flex items-center gap-3 bg-warm-white dark:bg-[#1A1A1A] border border-border/80 shadow-xs active:scale-[0.98] transition-all text-left text-sm text-text-muted cursor-pointer ${className}`}
      >
        <i className="ph-bold ph-magnifying-glass text-airbnb-coral text-base shrink-0"></i>
        <span className="truncate flex-1">{tSearch("triggerPlaceholder")}</span>
      </button>
    );
  }

  // Desktop Pill
  return (
    <button
      type="button"
      onClick={() => openSearch()}
      aria-label="Open search (⌘K or Ctrl+K)"
      className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cream/70 dark:bg-white/5 border border-border/80 hover:border-airbnb-coral/50 hover:bg-warm-white dark:hover:bg-white/10 text-xs text-text-muted hover:text-text-main transition-all cursor-pointer shadow-xs hover:shadow-sm ${className}`}
    >
      <i className="ph ph-magnifying-glass text-sm text-text-muted group-hover:text-airbnb-coral transition-colors"></i>
      <span className="hidden xl:inline font-medium">{tSearch("triggerPlaceholder")}</span>
      <span className="xl:hidden font-medium">Search...</span>
      <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-semibold text-text-muted/80 bg-warm-white dark:bg-white/10 px-1.5 py-0.5 rounded border border-border/70 shadow-2xs group-hover:border-airbnb-coral/30 transition-colors">
        {isMac ? "⌘K" : "Ctrl+K"}
      </kbd>
    </button>
  );
}
