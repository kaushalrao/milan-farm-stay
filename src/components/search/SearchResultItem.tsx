"use client";

import React, { useMemo } from "react";
import { SearchItem } from "@/types/search";

interface SearchResultItemProps {
  item: SearchItem;
  isSelected: boolean;
  query: string;
  onSelect: (item: SearchItem) => void;
}

export default function SearchResultItem({
  item,
  isSelected,
  query,
  onSelect,
}: SearchResultItemProps) {
  // Highlight matched substrings in title
  const highlightedTitle = useMemo(() => {
    if (!query.trim()) return item.title;
    const q = query.trim();
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = item.title.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="text-airbnb-coral font-bold underline underline-offset-2">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }, [item.title, query]);

  // Category badge colors
  const badgeClasses = useMemo(() => {
    switch (item.category) {
      case "itinerary":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      case "food":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "rentals":
        return "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20";
      case "actions":
      default:
        return "bg-rose-500/10 text-airbnb-coral dark:text-rose-400 border-rose-500/20";
    }
  }, [item.category]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(item)}
      className={`group relative flex items-center justify-between gap-3 px-3.5 py-3 md:py-3.5 rounded-2xl cursor-pointer transition-all select-none ${
        isSelected
          ? "bg-cream dark:bg-white/10 shadow-xs ring-1 ring-airbnb-coral/40"
          : "hover:bg-cream/60 dark:hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Category Icon */}
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
            isSelected ? "scale-105" : "group-hover:scale-105"
          } ${badgeClasses} border`}
        >
          <i className={`ph text-lg md:text-xl ${item.icon || "ph-sparkle"}`}></i>
        </div>

        {/* Text info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm md:text-base font-medium text-text-main truncate">
              {highlightedTitle}
            </h4>
            {item.badge && (
              <span
                className={`hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${badgeClasses}`}
              >
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted truncate leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Right Action Hint / Arrow */}
      <div className="flex items-center gap-2 shrink-0">
        {isSelected && (
          <kbd className="hidden md:inline-flex items-center text-[10px] font-semibold text-text-muted bg-warm-white dark:bg-black/30 border border-border px-1.5 py-0.5 rounded shadow-2xs">
            ↵
          </kbd>
        )}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-text-muted transition-all ${
            isSelected
              ? "text-airbnb-coral translate-x-0.5"
              : "group-hover:text-text-main group-hover:translate-x-0.5"
          }`}
        >
          {item.action.type === "external" ? (
            <i className="ph-bold ph-arrow-up-right text-sm"></i>
          ) : (
            <i className="ph-bold ph-arrow-right text-sm"></i>
          )}
        </div>
      </div>
    </div>
  );
}

