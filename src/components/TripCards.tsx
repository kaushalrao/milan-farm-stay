"use client";
import { useState, useEffect } from "react";
import ItineraryTimeline from "./ItineraryTimeline";

const tripOptions = [
  {
    id: "1",
    hash: "one-day",
    title: "One Day",
    subtitle: "Perfect for weekend travellers",
    time: "4.5 hrs Drive",
    img: "/images/trip1.png",
    icon: "🚗"
  },
  {
    id: "2",
    hash: "two-days",
    title: "Two Days",
    subtitle: "Weekend getaway",
    time: "5 hrs Drive",
    img: "/images/trip2.png",
    icon: "🌿"
  },
  {
    id: "3",
    hash: "three-days",
    title: "Three Days",
    subtitle: "Explorer experience",
    time: "6 hrs Drive",
    img: "/images/trip3.png",
    icon: "☕"
  },
  {
    id: "4",
    hash: "four-days",
    title: "Four Days",
    subtitle: "The complete getaway",
    time: "8 hrs Drive",
    img: "/images/hero.png",
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
    const newUrl = `${window.location.pathname}?trip=${trip.id}&day=1`;
    window.history.pushState(null, '', newUrl);

    setTimeout(() => {
      document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="pt-2 pb-4 relative" id="plan">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {tripOptions.map((trip) => {
            const isSelected = selectedDays === trip.id;

            return (
              <div
                key={trip.id}
                className={`group relative bg-white rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 h-[160px] flex flex-col col-span-1 ${isSelected
                    ? "ring-2 ring-airbnb-coral shadow-md scale-[1.02] ring-offset-2 ring-offset-cream z-10"
                    : "border border-border/50 shadow-sm hover:-translate-y-1 hover:shadow-md"
                  }`}
                onClick={() => handleSelect(trip)}
              >
                {/* Selected Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-300">
                    <i className="ph-fill ph-check-circle text-airbnb-coral text-lg"></i>
                  </div>
                )}

                {/* Top 50%: Thumbnail */}
                <div className="h-1/2 w-full relative overflow-hidden bg-soft-beige">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />

                </div>

                {/* Bottom 50%: Info */}
                <div className="h-1/2 p-3 md:p-4 flex justify-between items-center bg-white">
                  <div className="flex flex-col justify-center h-full">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-dark leading-none mb-1">{trip.title}</h3>
                    <p className="text-text-muted text-[11px] md:text-xs font-medium truncate max-w-[120px] md:max-w-[200px]">{trip.subtitle}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-airbnb-coral/10 text-airbnb-coral' : 'bg-cream text-dark group-hover:bg-soft-beige'}`}>
                    <i className="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDays && (
        <div id="itinerary-view" className="mt-6 pt-6 border-t border-border scroll-mt-14">
          <ItineraryTimeline days={selectedDays} />
        </div>
      )}
    </section>
  );
}
