"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItineraryTimeline from "./ItineraryTimeline";

import { tripOptions } from "../config/data";

export default function TripCards() {
  const [selectedDays, setSelectedDays] = useState<string | null>(null);

  // Initialize from URL parameters if someone shared a link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tripParam = params.get('day') || params.get('trip');
    if (tripParam && ["1", "2", "3", "4", "5"].includes(tripParam)) {
      setSelectedDays(tripParam);
      // Give DOM time to render before scrolling
      setTimeout(() => {
        document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
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

  return (
    <section className="pt-2 pb-4 relative scroll-mt-24" id="plan">
      <div className="container mx-auto px-0 md:px-4 max-w-6xl overflow-hidden">
        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-6 md:px-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tripOptions.map((trip) => {
            const isSelected = selectedDays === trip.id;

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + parseInt(trip.id) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative snap-center md:snap-start shrink-0 w-[260px] md:w-[280px] bg-white rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 ${
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
                {/* Top Image Banner (Compact) */}
                <div className="h-[90px] w-full relative overflow-hidden bg-soft-beige">
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
                        className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold text-airbnb-coral flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-airbnb-coral animate-pulse"></span>
                        Current Stop
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Section */}
                <div className="p-4 flex flex-col gap-1.5 bg-white flex-1 z-10 rounded-b-3xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-[20px] md:text-[22px] font-bold text-dark leading-tight tracking-tight">
                        {trip.destination}
                      </h3>
                      <p className="text-[11px] md:text-[12px] font-bold text-text-muted mt-0.5">
                        {trip.metadata}
                      </p>
                    </div>
                    
                    <div className={`transition-all duration-300 ${isSelected ? 'text-airbnb-coral translate-x-1' : 'text-text-muted/40 group-hover:text-text-main group-hover:translate-x-1'}`}>
                      <i className="ph-bold ph-arrow-right text-lg"></i>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium text-text-main/80 mt-1 truncate">
                    {trip.highlights}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {trip.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-soft-beige rounded-md text-[9px] uppercase tracking-wider font-bold text-text-main">
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
