"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItineraryTimeline from "./ItineraryTimeline";

const tripOptions = [
  {
    id: "1",
    hash: "day-1",
    title: "Day 1",
    subtitle: "Bangalore → Milan",
    time: "Drive & Arrival",
    img: "/images/trip1.png",
    icon: "🚗"
  },
  {
    id: "2",
    hash: "day-2",
    title: "Day 2",
    subtitle: "Chikmagalur Adventure",
    time: "Full Day Explorer",
    img: "/images/hero.png",
    icon: "🌿"
  },
  {
    id: "3",
    hash: "day-3",
    title: "Day 3",
    subtitle: "Mudigere Exploration",
    time: "Relaxed Sightseeing",
    img: "/images/trip3.png",
    icon: "☕"
  },
  {
    id: "4",
    hash: "day-4",
    title: "Day 4",
    subtitle: "Coffee Estate & Return",
    time: "Morning Activity",
    img: "/images/trip2.png",
    icon: "🌄"
  }
];

export default function TripCards() {
  const [selectedDays, setSelectedDays] = useState<string | null>(null);

  // Initialize from URL parameters if someone shared a link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tripParam = params.get('trip');
    if (tripParam && ["1", "2", "3", "4"].includes(tripParam)) {
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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {tripOptions.map((trip) => {
            const isSelected = selectedDays === trip.id;

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + parseInt(trip.id) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative bg-white rounded-[20px] overflow-hidden cursor-pointer h-[160px] flex flex-col col-span-1 shadow-sm hover:shadow-md`}
                onClick={() => handleSelect(trip)}
              >
                {/* Active Selection Ring via LayoutID */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTripRing"
                    className="absolute inset-0 border-2 border-airbnb-coral rounded-[20px] z-20 pointer-events-none shadow-[0_0_15px_rgba(255,90,95,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Selected Checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                      className="absolute top-2 right-2 z-30 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                    >
                      <i className="ph-fill ph-check-circle text-airbnb-coral text-lg"></i>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top 50%: Thumbnail */}
                <div className="h-1/2 w-full relative overflow-hidden bg-soft-beige">
                  <motion.img 
                    src={trip.img} 
                    alt={trip.title} 
                    className="w-full h-full object-cover" 
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy" 
                  />
                </div>

                {/* Bottom 50%: Info */}
                <div className="h-1/2 p-3 md:p-4 flex justify-between items-center bg-white z-10 relative">
                  <div className="flex flex-col justify-center h-full">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-dark leading-none mb-1">{trip.title}</h3>
                    <p className="text-text-muted text-[11px] md:text-xs font-medium truncate max-w-[120px] md:max-w-[200px]">{trip.subtitle}</p>
                  </div>
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-airbnb-coral/10 text-airbnb-coral' : 'bg-cream text-dark group-hover:bg-soft-beige'}`}
                    whileHover={{ x: 3 }}
                  >
                    <i className="ph-bold ph-caret-right"></i>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedDays && (
        <div id="itinerary-view" className="mt-6 pt-6 border-t border-border scroll-mt-14">
          <ItineraryTimeline day={selectedDays} />
        </div>
      )}
    </section>
  );
}
