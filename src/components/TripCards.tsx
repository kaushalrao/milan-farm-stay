"use client";
import { useState } from "react";
import ItineraryTimeline from "./ItineraryTimeline";

const tripOptions = [
  {
    id: "1",
    title: "One Day Trip",
    desc: "A beautifully scenic drive from Bangalore directly to the estate.",
    time: "4.5 hrs driving",
    img: "/images/trip1.png",
    icon: "🚗"
  },
  {
    id: "2",
    title: "Two Day Escape",
    desc: "The scenic drive, plus nearby waterfalls and viewpoints.",
    time: "5 hrs driving",
    img: "/images/trip2.png",
    icon: "🌿"
  },
  {
    id: "3",
    title: "Three Day Experience",
    desc: "The ultimate road trip. Temples, waterfalls, and coffee estates.",
    time: "6 hrs driving",
    img: "/images/trip3.png",
    icon: "☕"
  }
];

export default function TripCards() {
  const [selectedDays, setSelectedDays] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedDays(id);
    setTimeout(() => {
      document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="pt-12 pb-4 -mt-12 relative z-20" id="plan">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tripOptions.map((trip) => (
            <div 
              key={trip.id} 
              className={"bg-white rounded-[24px] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer border-2 " + (selectedDays === trip.id ? "border-airbnb-coral" : "border-transparent")}
              onClick={() => handleSelect(trip.id)}
            >
              <div className="h-48 w-full relative">
                <img src={trip.img} alt={trip.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-dark shadow-sm">
                  {trip.icon} {trip.time}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-dark mb-2">{trip.title}</h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">{trip.desc}</p>
                <button 
                  className={"w-full py-3 rounded-xl font-medium transition-colors " + (selectedDays === trip.id ? "bg-airbnb-coral text-white" : "bg-cream text-dark hover:bg-soft-beige")}
                >
                  View Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDays && (
        <div id="itinerary-view" className="mt-12 pt-12 border-t border-border">
          <ItineraryTimeline days={selectedDays} />
        </div>
      )}
    </section>
  );
}
