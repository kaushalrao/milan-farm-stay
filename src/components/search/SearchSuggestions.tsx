"use client";

import React, { useState, useMemo } from "react";
import { SearchCategory } from "@/types/search";
import { useTranslations } from "next-intl";

interface SearchSuggestionsProps {
  onSelectQuery: (query: string) => void;
  onSelectCategory: (category: SearchCategory) => void;
}

const RECENT_KEY = "milan_recent_searches";

export default function SearchSuggestions({
  onSelectQuery,
  onSelectCategory,
}: SearchSuggestionsProps) {
  const tSearch = useTranslations("Search");

  // Localized popular suggestions
  const trendingSuggestions = useMemo(
    () => [
      {
        label: tSearch("suggestMullayanagiri"),
        query: tSearch("suggestMullayanagiri"),
        icon: "ph-mountains",
      },
      {
        label: tSearch("suggestFood"),
        query: tSearch("suggestFood"),
        category: "food" as SearchCategory,
        icon: "ph-cooking-pot",
      },
      {
        label: tSearch("suggestRentals"),
        query: tSearch("suggestRentals"),
        category: "rentals" as SearchCategory,
        icon: "ph-moped",
      },
      {
        label: tSearch("suggestCheckInOut"),
        query: tSearch("suggestCheckInOut"),
        icon: "ph-clock",
      },
      {
        label: tSearch("suggestDevaramane"),
        query: tSearch("suggestDevaramane"),
        icon: "ph-camera",
      },
      {
        label: tSearch("suggestTaxi"),
        query: tSearch("suggestTaxi"),
        category: "rentals" as SearchCategory,
        icon: "ph-taxi",
      },
      {
        label: tSearch("suggestTips"),
        query: tSearch("suggestTips"),
        category: "faq" as SearchCategory,
        icon: "ph-lightbulb",
      },
    ],
    [tSearch]
  );

  // Lazy initializer to avoid setState in effect
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored).slice(0, 5) : [];
    } catch {
      return [];
    }
  });

  const handleClearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(RECENT_KEY);
      setRecentSearches([]);
    } catch {
      // ignore
    }
  };

  const handleRemoveRecent = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((s) => s !== item);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelectSuggestion = (item: (typeof trendingSuggestions)[0]) => {
    if (item.category) {
      onSelectCategory(item.category);
    }
    onSelectQuery(item.query);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <i className="ph ph-clock-counter-clockwise text-sm"></i>
              <span>{tSearch("recentSearches")}</span>
            </h4>
            <button
              type="button"
              onClick={handleClearAllRecent}
              className="text-xs text-text-muted hover:text-airbnb-coral transition-colors font-medium cursor-pointer"
            >
              {tSearch("clearAll")}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <div
                key={term}
                onClick={() => onSelectQuery(term)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream/70 dark:bg-white/5 border border-border/70 hover:border-airbnb-coral/40 hover:bg-cream dark:hover:bg-white/10 text-xs text-text-main cursor-pointer transition-all"
              >
                <i className="ph ph-magnifying-glass text-text-muted group-hover:text-airbnb-coral text-xs"></i>
                <span>{term}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveRecent(e, term)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-text-muted hover:text-airbnb-coral transition-colors ml-0.5 cursor-pointer"
                  aria-label={`Remove ${term}`}
                >
                  <i className="ph ph-x text-[10px]"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular / Trending Suggestions */}
      <div>
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1 flex items-center gap-1.5">
          <i className="ph ph-trend-up text-sm text-airbnb-coral"></i>
          <span>{tSearch("suggestions")}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {trendingSuggestions.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className="group flex items-center gap-3 p-2.5 rounded-xl bg-cream/50 dark:bg-white/5 border border-border/60 hover:border-airbnb-coral/40 hover:bg-cream dark:hover:bg-white/10 text-left transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-warm-white dark:bg-white/10 flex items-center justify-center text-text-muted group-hover:text-airbnb-coral group-hover:scale-105 transition-all shrink-0">
                <i className={`ph text-base ${item.icon}`}></i>
              </div>
              <span className="text-xs md:text-sm font-medium text-text-main group-hover:text-airbnb-coral transition-colors truncate">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
