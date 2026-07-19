"use client";

import { useState } from "react";
import ItineraryTimeline from "./ItineraryTimeline";
import { useTranslations } from "next-intl";

export default function TripPlanner() {
  const [selectedDays, setSelectedDays] = useState("1");
  const t = useTranslations("TripPlanner");
  const data = useTranslations("Data");
  const tabs = data.raw("tripPlannerTabs");

  return (
    <section className="py-16 md:py-24" id="plan">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark mb-4">{t("title")}</h2>
          <p className="text-lg text-text-muted">{t("subtitle")}</p>
        </div>
        
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-soft-beige p-1 rounded-full flex-wrap justify-center">
            {tabs.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDays(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-base transition-all duration-300 ${
                  selectedDays === tab.id
                    ? "bg-warm-white text-dark shadow-sm"
                    : "text-text-muted hover:text-dark hover:bg-soft-beige/50"
                }`}
              >
                <i className={`ph ${tab.icon} text-xl`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ItineraryTimeline day={selectedDays} />
      </div>
    </section>
  );
}
