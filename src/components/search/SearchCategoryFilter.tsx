"use client";

import React from "react";
import { SearchCategory } from "@/types/search";
import { useTranslations } from "next-intl";

interface CategoryOption {
  id: SearchCategory;
  labelKey: "all" | "itinerary" | "food" | "rentals" | "actions";
  icon: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", labelKey: "all", icon: "ph-sparkle" },
  { id: "itinerary", labelKey: "itinerary", icon: "ph-map-pin" },
  { id: "food", labelKey: "food", icon: "ph-cooking-pot" },
  { id: "rentals", labelKey: "rentals", icon: "ph-moped" },
  { id: "actions", labelKey: "actions", icon: "ph-lightning" },
];

interface SearchCategoryFilterProps {
  activeCategory: SearchCategory;
  onSelectCategory: (category: SearchCategory) => void;
  counts?: Partial<Record<SearchCategory, number>>;
}

export default function SearchCategoryFilter({
  activeCategory,
  onSelectCategory,
  counts,
}: SearchCategoryFilterProps) {
  const tSearch = useTranslations("Search");

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-4 md:px-6 border-b border-border/50 text-xs">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = counts?.[cat.id];
        const label = tSearch(cat.labelKey);

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 select-none ${
              isActive
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs"
                : "bg-cream/60 dark:bg-white/5 text-text-muted hover:text-text-main hover:bg-cream dark:hover:bg-white/10"
            }`}
          >
            <i className={`ph ${cat.icon} text-sm ${isActive ? "text-airbnb-coral" : ""}`}></i>
            <span>{label}</span>
            {typeof count === "number" && count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? "bg-white/20 dark:bg-black/15 text-white dark:text-neutral-900"
                    : "bg-border/60 text-text-muted"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
