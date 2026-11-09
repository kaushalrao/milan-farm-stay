"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import { useSearchIndex } from "@/hooks/useSearchIndex";
import { SearchItem, SearchCategory } from "@/types/search";
import SearchCategoryFilter from "./SearchCategoryFilter";
import SearchResultItem from "./SearchResultItem";
import SearchSuggestions from "./SearchSuggestions";
import { useTranslations } from "next-intl";

const RECENT_KEY = "milan_recent_searches";

export default function SearchModal() {
  const { isOpen, closeSearch, query, setQuery, activeCategory, setActiveCategory } = useSearch();
  const { search, searchItems } = useSearchIndex();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const tSearch = useTranslations("Search");

  // Get filtered results
  const results = search(query, activeCategory);

  // Category counts when a query is present
  const categoryCounts = React.useMemo(() => {
    if (!query.trim()) return undefined;
    const counts: Partial<Record<SearchCategory, number>> = { all: 0 };
    searchItems.forEach((item) => {
      const matches = search(query, item.category).some((r) => r.id === item.id);
      if (matches) {
        counts[item.category] = (counts[item.category] || 0) + 1;
        counts.all = (counts.all || 0) + 1;
      }
    });
    return counts;
  }, [query, search, searchItems]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[aria-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Save to recent searches
  const saveRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      const list: string[] = stored ? JSON.parse(stored) : [];
      const updated = [term.trim(), ...list.filter((t) => t.toLowerCase() !== term.trim().toLowerCase())].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  // Handle item selection
  const handleSelect = useCallback(
    (item: SearchItem) => {
      if (query.trim()) {
        saveRecentSearch(query);
      }
      closeSearch();

      const { action } = item;

      if (action.type === "external") {
        if (action.href.startsWith("tel:") || action.href.startsWith("mailto:")) {
          window.location.href = action.href;
        } else {
          window.open(action.href, "_blank", "noopener,noreferrer");
        }
        return;
      }

      if (action.type === "route") {
        router.push(action.href);
        return;
      }

      if (action.type === "anchor") {
        if (action.href.startsWith("/?")) {
          const [pathAndQuery, hash] = action.href.split("#");
          if (pathname === "/") {
            window.history.pushState(null, "", pathAndQuery + (hash ? `#${hash}` : ""));
            const params = new URLSearchParams(pathAndQuery.split("?")[1]);
            const day = params.get("day");
            if (day) {
              window.dispatchEvent(new CustomEvent("milan:select-trip", { detail: day }));
            }
            if (hash) {
              setTimeout(() => {
                const el = document.getElementById(hash) || document.getElementById("itinerary-view");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }
          } else {
            router.push(action.href);
          }
          return;
        }

        const hashTarget = action.href.replace(/^\/?#/, "");
        if (pathname === "/") {
          const el = document.getElementById(hashTarget);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          router.push(action.href);
        }
      }
    },
    [query, saveRecentSearch, closeSearch, pathname, router]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleCategorySelect = (category: SearchCategory) => {
    setActiveCategory(category);
    setSelectedIndex(0);
  };

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center md:pt-[10vh] md:px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container: Full-screen on mobile, Floating card on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full h-[100dvh] md:h-auto md:max-h-[80vh] md:max-w-2xl bg-warm-white dark:bg-[#1A1A1A] md:rounded-3xl shadow-2xl border-0 md:border md:border-border/80 flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Application Search"
          >
            {/* Top Search Header */}
            <div className="flex items-center gap-3 px-4 md:px-6 py-3.5 border-b border-border/60 bg-warm-white/95 dark:bg-[#1A1A1A]/95 shrink-0">
              {/* Mobile Back Button */}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Back"
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-main active:scale-90 transition-all shrink-0 cursor-pointer"
              >
                <i className="ph-bold ph-arrow-left text-lg"></i>
              </button>

              {/* Search Icon */}
              <i className="ph ph-magnifying-glass text-airbnb-coral text-xl shrink-0 hidden md:block"></i>

              {/* Main Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder={tSearch("inputPlaceholder")}
                className="flex-1 bg-transparent text-text-main placeholder:text-text-muted/60 text-base md:text-lg font-medium focus:outline-none min-w-0"
              />

              {/* Clear Button */}
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear query"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-main bg-cream/80 dark:bg-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  <i className="ph ph-x text-xs"></i>
                </button>
              )}

              {/* Desktop Close / Escape Badge */}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-text-muted hover:text-text-main bg-cream/70 dark:bg-white/5 border border-border/80 px-2 py-1 rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <span>Esc</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <SearchCategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
              counts={categoryCounts}
            />

            {/* Scrollable Results / Suggestions View */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto overscroll-contain divide-y divide-border/30 p-2 md:p-3"
            >
              {!query.trim() ? (
                <SearchSuggestions
                  onSelectQuery={(q) => {
                    setQuery(q);
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  onSelectCategory={handleCategorySelect}
                />
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((item, index) => (
                    <SearchResultItem
                      key={item.id}
                      item={item}
                      isSelected={index === selectedIndex}
                      query={query}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="py-12 px-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-cream dark:bg-white/5 flex items-center justify-center text-text-muted">
                    <i className="ph ph-magnifying-glass text-2xl"></i>
                  </div>
                  <h4 className="text-base font-semibold text-text-main mb-1">
                    {tSearch("noResultsTitle")}
                  </h4>
                  <p className="text-xs md:text-sm text-text-muted max-w-sm mx-auto mb-6">
                    {tSearch("noResultsDesc", { query })}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      tSearch("suggestMullayanagiri"),
                      tSearch("suggestFood"),
                      tSearch("suggestRentals"),
                      tSearch("suggestCheckInOut"),
                    ].map((suggest) => (
                      <button
                        key={suggest}
                        type="button"
                        onClick={() => {
                          setQuery(suggest);
                          setSelectedIndex(0);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-cream dark:bg-white/5 border border-border hover:border-airbnb-coral/40 transition-colors text-text-main cursor-pointer"
                      >
                        {suggest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Shortcut Hints Footer */}
            <div className="hidden md:flex items-center justify-between px-6 py-2.5 bg-cream/50 dark:bg-white/5 border-t border-border/50 text-[11px] text-text-muted shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-warm-white dark:bg-white/10 border border-border text-[10px] font-semibold">
                    ↑↓
                  </kbd>
                  <span>{tSearch("navigateHint")}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-warm-white dark:bg-white/10 border border-border text-[10px] font-semibold">
                    ↵
                  </kbd>
                  <span>{tSearch("selectHint")}</span>
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-warm-white dark:bg-white/10 border border-border text-[10px] font-semibold">
                  Esc
                </kbd>
                <span>{tSearch("shortcutHint")}</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
