"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItineraryTimeline from "./ItineraryTimeline";

import { useTranslations } from "next-intl";

interface TripOption {
  id: string;
  hash?: string;
  destination: string;
  metadata?: string;
  highlights?: string;
  tags?: string[];
  img: string;
}

export default function TripCards() {
  const t = useTranslations("Data");
  const ui = useTranslations("UI");
  const tripOptions = (t.raw("tripOptions") as TripOption[]) || [];

  const [selectedDays, setSelectedDays] = useState<string | null>(null);

  // Initialize from URL parameters if someone shared a link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tripParam = params.get('day') || params.get('trip');
    if (tripParam && ["1", "2", "3", "4", "5"].includes(tripParam)) {
      setTimeout(() => setSelectedDays(tripParam), 0);
      // Give DOM time to render before scrolling
      setTimeout(() => {
        document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    const handleCustomSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const dayId = customEvent.detail;
      if (dayId && ["1", "2", "3", "4", "5"].includes(dayId)) {
        setSelectedDays(dayId);
      }
    };
    window.addEventListener("milan:select-trip", handleCustomSelect);
    return () => window.removeEventListener("milan:select-trip", handleCustomSelect);
  }, []);

  const handleSelect = (trip: typeof tripOptions[0]) => {
    setSelectedDays(trip.id);
    
    // Update URL without reloading
    const newUrl = `${window.location.pathname}?day=${trip.id}`;
    window.history.pushState(null, '', newUrl);

    setTimeout(() => {
      document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getStopCount = (dayId: string) => {
    switch (dayId) {
      case "1": {
        const stops = t.raw("roadTripStops") as unknown[];
        return Array.isArray(stops) ? stops.length : 7;
      }
      case "2": {
        const stops = t.raw("day2Stops") as unknown[];
        return Array.isArray(stops) ? stops.length : 6;
      }
      case "3": {
        const stops = t.raw("day3Stops") as unknown[];
        return Array.isArray(stops) ? stops.length : 3;
      }
      case "4": {
        const stops = t.raw("day4Stops") as unknown[];
        return Array.isArray(stops) ? stops.length : 5;
      }
      case "5": {
        const stops = t.raw("day5Stops") as unknown[];
        return Array.isArray(stops) ? stops.length : 3;
      }
      default:
        return 0;
    }
  };

  return (
    <section className="pt-0 pb-0 md:pb-4 relative scroll-mt-24" id="plan">
      <div className="container mx-auto px-0 md:px-4 lg:max-w-7xl overflow-visible">
        {/* Horizontal Scroll Container */}
        <div className="flex lg:grid lg:grid-cols-5 gap-3 md:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-4 pt-4 px-4 md:px-2 lg:px-0 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tripOptions.map((trip) => {
            const isSelected = selectedDays === trip.id;
            const stopCount = getStopCount(trip.id);
            const stopLabel = trip.id === "5" ? ui("treks") : ui("stops");
            const cleanedMetadata = (trip.metadata || "").replace(/^(Day|ದಿನ|రోజు|நாள்|ദിവസം)\s*\d+\s*[•·-]\s*/i, "");

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + parseInt(trip.id) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative snap-center md:snap-start shrink-0 w-[240px] md:w-[280px] lg:w-auto bg-warm-white rounded-3xl cursor-pointer flex flex-col transition-all duration-300 ${
                  isSelected 
                    ? "border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
                    : "border border-border/60 hover:border-border shadow-sm hover:shadow-md"
                }`}
                onClick={() => handleSelect(trip)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${trip.destination}`}
                aria-current={isSelected ? "true" : "false"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(trip);
                  }
                }}
                style={isSelected ? { boxShadow: "0 4px 20px -2px rgba(255, 90, 95, 0.2), 0 0 0 1.5px rgba(255, 90, 95, 0.6)" } : {}}
              >
                {/* Floating Day Badge (Half in, half out on top right) */}
                <div
                  className={`absolute top-0 right-3.5 -translate-y-1/2 z-20 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-md pointer-events-none select-none ${
                    isSelected
                      ? "bg-airbnb-coral text-white border-2 border-warm-white dark:border-[#1A1A1A] shadow-[0_4px_14px_rgba(255,90,95,0.45)] scale-105"
                      : "bg-warm-white dark:bg-[#1E1E1E] text-text-main dark:text-gray-100 border border-border/80 dark:border-white/15 group-hover:border-airbnb-coral/60 group-hover:text-airbnb-coral group-hover:shadow-md"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-white animate-pulse" : "bg-airbnb-coral"
                    }`}
                  />
                  <span>{`${ui("day")} ${trip.id}`}</span>
                </div>

                {/* Top Image Banner (Compact) */}
                <div className="h-[90px] w-full relative overflow-hidden bg-soft-beige rounded-t-3xl">
                  <motion.img 
                    src={trip.img} 
                    alt={trip.destination} 
                    className="w-full h-full object-cover" 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy" 
                  />
                  {/* Subtle Top Indicator for Selected */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-3 left-3 bg-warm-white/95 dark:bg-[#1A1A1A]/90 dark:border dark:border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold text-airbnb-coral flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-airbnb-coral animate-pulse"></span>
                        {ui("currentStop")}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Section */}
                <div className="p-4 flex flex-col gap-1.5 bg-warm-white flex-1 z-10 rounded-b-3xl">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-[19px] md:text-[21px] font-bold text-dark leading-tight tracking-tight truncate">
                        {trip.destination}
                      </h3>
                      
                      {/* Useful Info Row: Duration/Pace Pill + Stop Count */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted mt-1.5 flex-wrap">
                        {cleanedMetadata && (
                          <span className="inline-flex items-center gap-1 bg-cream/75 dark:bg-white/5 border border-border/70 dark:border-white/10 px-2 py-0.5 rounded-md font-semibold text-text-main dark:text-gray-200">
                            <i className="ph-fill ph-clock text-airbnb-coral text-[11px]"></i>
                            <span className="truncate max-w-[130px]">{cleanedMetadata}</span>
                          </span>
                        )}
                        {stopCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted dark:text-gray-400">
                            <i className="ph-fill ph-map-pin text-emerald-600 dark:text-emerald-400 text-[11px]"></i>
                            <span>{stopCount} {stopLabel}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`transition-all duration-300 shrink-0 mt-0.5 ${isSelected ? 'text-airbnb-coral translate-x-1' : 'text-text-muted/40 dark:text-gray-600 group-hover:text-text-main group-hover:translate-x-1'}`}>
                      <i className="ph-bold ph-arrow-right text-lg"></i>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium text-text-main/80 mt-1 truncate">
                    {trip.highlights}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {trip.tags?.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-soft-beige dark:bg-white/5 rounded-md text-[10px] font-bold uppercase tracking-wider text-dark/70 dark:text-gray-300 border border-border/50 dark:border-white/10 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedDays && (
        <div id="itinerary-view" className="mt-2 pt-8 border-t border-border scroll-mt-14 relative z-10 bg-cream">
          <ItineraryTimeline day={selectedDays} />
        </div>
      )}
    </section>
  );
}
