"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { 
  ssr: false, 
  loading: () => <div className="h-[500px] w-full bg-soft-beige rounded-2xl animate-pulse flex items-center justify-center text-text-muted font-bold text-sm">Loading Map...</div> 
});

import { roadTripStops, day1Restaurants, day2Stops, day2Restaurants, day3Stops, day4Stops, day5Stops, daySummaries } from "../config/data";

function CompactStopCard({ stop, index }: { stop: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-6 group stop-card"
      data-stop-title={stop.title}
    >

      <motion.div layout className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border border-border/50 hover:shadow-md">
        <motion.div layout className="relative h-[120px] sm:h-[140px] w-full overflow-hidden cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold uppercase text-dark z-10 shadow-sm tracking-wider">
            {stop.category}
          </span>
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6 }}
            src={stop.img} alt={stop.title} className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="p-4">
          <h4 className="font-serif text-[18px] leading-tight font-semibold text-dark mb-2">{stop.title}</h4>

          <div className="flex flex-wrap gap-1.5 text-text-muted text-[11px] font-medium mb-2">
            <span className="bg-cream px-2 py-1 rounded-md flex items-center gap-1"><i className="ph ph-car"></i> {stop.drivingTime}</span>
            {stop.duration !== "N/A" && (
              <span className="bg-cream px-2 py-1 rounded-md flex items-center gap-1"><i className="ph ph-clock"></i> {stop.duration}</span>
            )}
          </div>

          <p className="text-text-muted text-[13px] leading-snug mb-3 line-clamp-2">
            {stop.desc}
          </p>

          <motion.div layout className="flex items-center justify-between mt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[13px] font-semibold text-airbnb-coral flex items-center gap-1 py-1"
            >
              {isExpanded ? "▲ Hide Details" : "▼ View Details"}
            </button>
            <div className="flex items-center gap-2">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href={stop.mapsUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center px-4 h-[36px] border border-border rounded-full text-[12px] font-semibold text-dark transition-colors hover:bg-soft-beige gap-1"
              >
                <i className="ph-bold ph-map-pin text-[14px]"></i> Maps
              </motion.a>
              {stop.bookingLink && (
                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href={stop.bookingLink} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 h-[36px] bg-airbnb-coral text-white rounded-full text-[12px] font-semibold transition-colors hover:bg-rose-600 gap-1"
                >
                  <i className="ph-bold ph-ticket text-[14px]"></i> Book Entry
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Expandable Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-3 pt-3 border-t border-border"
              >
                <div className="grid grid-cols-1 gap-2">
                  {stop.bestTime && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-clock text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Best Time</h5>
                        <p className="text-[11px] text-text-muted">{stop.bestTime}</p>
                      </div>
                    </div>
                  )}
                  {stop.entryFee && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-ticket text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Entry Fee</h5>
                        <p className="text-[11px] text-text-muted">{stop.entryFee}</p>
                      </div>
                    </div>
                  )}
                  {stop.parkingInfo && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-car-profile text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Parking</h5>
                        <p className="text-[11px] text-text-muted">{stop.parkingInfo}</p>
                      </div>
                    </div>
                  )}
                  {stop.tips && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-camera text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Photo Tip</h5>
                        <p className="text-[11px] text-text-muted">{stop.tips}</p>
                      </div>
                    </div>
                  )}
                  {stop.localTips && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-info text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Local Tip</h5>
                        <p className="text-[11px] text-text-muted">{stop.localTips}</p>
                      </div>
                    </div>
                  )}
                  {stop.nearbyCafes && (
                    <div className="bg-soft-beige/30 p-2.5 rounded-xl flex items-start gap-2">
                      <i className="ph-fill ph-coffee text-airbnb-coral text-[14px] mt-0.5"></i>
                      <div>
                        <h5 className="font-semibold text-dark text-[11px]">Nearby Food</h5>
                        <p className="text-[11px] text-text-muted">{stop.nearbyCafes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=13.3161&longitude=75.7720&current_weather=true";

function DaySummaryCard({ dayNum, numDays, viewMode, setViewMode }: { dayNum: number, numDays: number, viewMode: "list" | "map", setViewMode: (mode: "list" | "map") => void }) {
  const summary = daySummaries[dayNum];
  const [copied, setCopied] = useState(false);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetch(WEATHER_API)
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        }
      })
      .catch(() => {});
  }, []);

  const getWeatherIcon = (code: number, isDay: number) => {
    if (code === 0) return isDay ? "ph-sun" : "ph-moon";
    if (code <= 3) return isDay ? "ph-cloud-sun" : "ph-cloud-moon";
    if (code <= 48) return "ph-cloud-fog";
    if (code <= 67) return "ph-cloud-rain";
    if (code <= 77) return "ph-snowflake";
    return "ph-cloud-lightning";
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?day=${dayNum}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Day ${dayNum}: ${summary.title} - Milan Farm Stays`,
          text: `Check out Day ${dayNum} of the Milan Farm Stays itinerary!`,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="sticky top-[70px] md:top-[80px] z-30 mb-6 mx-auto max-w-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] rounded-2xl">
      <div className="bg-white/95 backdrop-blur-md border border-border/50 rounded-2xl p-3 flex flex-col gap-3">
        
        {/* Top Row: Title & Actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 text-left">
            <h3 className="font-serif text-[15px] md:text-[17px] text-dark leading-tight flex items-center gap-1.5 flex-wrap mb-0.5">
              <span className="font-bold">{summary.day}</span>
              <span className="text-text-muted/40 text-[10px] leading-none mt-0.5">•</span>
              <span className="font-medium text-dark/90 line-clamp-1">{summary.title}</span>
            </h3>
            <div className="text-[10.5px] md:text-[12px] font-medium text-text-muted line-clamp-1">
              {summary.text}
            </div>
          </div>
    
          <div className="flex items-center gap-1.5 shrink-0">
            {weather && (
              <div className="flex items-center gap-1 bg-soft-beige px-2 py-1.5 rounded-xl text-[10.5px] font-bold text-dark border border-border/50" title="Chikmagalur Current Weather">
                <i className={`ph-fill ${getWeatherIcon(weather.weathercode, weather.is_day)} text-airbnb-coral text-[12px]`}></i>
                <span>{Math.round(weather.temperature)}°C</span>
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-8 h-8 flex items-center justify-center bg-cream rounded-full text-dark hover:bg-soft-beige transition-colors border border-border/50"
              title="Share this Day"
            >
              <i className={`ph-bold ${copied ? 'ph-check text-green-600' : 'ph-share-network'} text-[15px]`}></i>
            </motion.button>
          </div>
        </div>

        {/* Bottom Row: View Toggle (Segmented Control) */}
        <div className="bg-cream/80 p-1 rounded-[10px] flex w-full relative lg:hidden">
          {/* Animated Background Slider */}
          <motion.div 
            layout
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)] border border-border/50 z-0"
            animate={{ left: viewMode === "list" ? "4px" : "calc(50%)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          
          <button 
            onClick={() => setViewMode("list")}
            className={`flex-1 py-1.5 text-[12px] font-bold transition-colors z-10 rounded-lg ${viewMode === "list" ? "text-dark" : "text-text-muted hover:text-dark"}`}
          >
            <i className="ph-bold ph-list-bullets mr-1 text-[14px] align-middle"></i> List View
          </button>
          <button 
            onClick={() => setViewMode("map")}
            className={`flex-1 py-1.5 text-[12px] font-bold transition-colors z-10 rounded-lg ${viewMode === "map" ? "text-dark" : "text-text-muted hover:text-dark"}`}
          >
            <i className="ph-bold ph-map-trifold mr-1 text-[14px] align-middle"></i> Map View
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ stop }: { stop: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border border-border/50 hover:shadow-md mb-4 flex">
      <div className="w-[100px] h-[100px] shrink-0 p-2">
        <img src={stop.img} alt={stop.title} className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-serif text-[15px] font-bold text-dark">{stop.title}</h4>
            <span className="bg-soft-beige text-dark px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ml-2">{stop.category}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {stop.tags.map((tag: string, i: number) => (
              <span key={i} className="text-[10px] text-text-muted bg-cream px-1.5 py-0.5 rounded-md">{tag}</span>
            ))}
          </div>
          <p className="text-[11px] text-text-muted leading-tight line-clamp-1">{stop.desc}</p>
        </div>
        <div className="flex justify-end mt-1">
          <a href={stop.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-3 py-1 bg-cream text-dark hover:bg-soft-beige rounded-full text-[10px] font-bold gap-1 transition-colors">
            📍 Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ day }: { day: string }) {
  const activeTab = parseInt(day) || 1;
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Setup Intersection Observer for scroll reveal triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation or tracking if needed
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    const stopCards = document.querySelectorAll(".stop-card");
    stopCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeTab]);

  // Prevent layout shift when switching views
  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      if (rect.top < 80) {
        const offset = window.scrollY + rect.top - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  }, [viewMode, activeTab]);

  const getStopsForDay = (day: number) => {
    if (day === 1) return roadTripStops;
    if (day === 2) return day2Stops;
    if (day === 3) return day3Stops;
    if (day === 4) return day4Stops;
    if (day === 5) return day5Stops;
    return [];
  };

  const currentStops = getStopsForDay(activeTab);

  return (
    <div className="relative pb-8 px-4 max-w-xl lg:max-w-7xl mx-auto" ref={timelineRef}>

      <DaySummaryCard dayNum={activeTab} numDays={4} viewMode={viewMode} setViewMode={setViewMode} />

      {/* Timeline Container with Day Switching Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${viewMode}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-2"
        >
          {activeTab === 2 && (
            <div key="warning-2" className="bg-orange-50/80 backdrop-blur-sm border border-orange-200/60 rounded-2xl p-4 mb-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <i className="ph-fill ph-warning-circle text-lg"></i>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-orange-900 mb-0.5">Advance Booking Required</h4>
                  <p className="text-[11px] text-orange-800/80 leading-snug">
                    Slots for Mullayanagiri, Baba Budangiri, and Jhari Waterfalls must be booked beforehand via Chikmagalur Tourism.
                  </p>
                </div>
              </div>
              <a
                href="https://pgbiz.omniware.in/chikkamagalurutourism"
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-[12px] font-bold py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Book Entry Slots
              </a>
            </div>
          )}

          {activeTab === 5 && (
            <div key="warning-5" className="bg-orange-50/80 backdrop-blur-sm border border-orange-200/60 rounded-2xl p-4 mb-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <i className="ph-fill ph-warning-circle text-lg"></i>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-orange-900 mb-0.5">Advance Booking Required</h4>
                  <p className="text-[11px] text-orange-800/80 leading-snug">
                    Permissions and slots for Chikmagalur treks must be booked beforehand via Karnataka Eco Tourism (Aranya Vihara).
                  </p>
                </div>
              </div>
              <a
                href="https://aranyavihaara.karnataka.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-[12px] font-bold py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Book Entry Slots
              </a>
            </div>
          )}

          {/* Desktop & Mobile Layout wrapper */}
          <div className="lg:grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_550px] lg:gap-8 lg:items-start">
            
            {/* List View */}
            <div className={`${viewMode === "map" ? 'hidden lg:flex' : 'flex'} flex-col gap-2 w-full`}>
              {currentStops.map((stop: any, idx: number) => (
                <CompactStopCard key={stop.title || idx} stop={stop} index={idx} />
              ))}

              {activeTab === 1 && day1Restaurants && (
                <div key="restaurants-1" className="mt-4 pt-6 border-t border-border">
                  <h3 className="font-serif text-xl font-bold text-dark mb-4 text-center flex items-center justify-center gap-2">
                    <i className="ph-fill ph-fork-knife text-airbnb-coral"></i> Recommended Restaurants
                  </h3>
                  {day1Restaurants.map((rest, idx) => (
                    <RestaurantCard key={rest.title || idx} stop={rest} />
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div key="restaurants-2" className="mt-4 pt-6 border-t border-border">
                  <h3 className="font-serif text-xl font-bold text-dark mb-4 text-center flex items-center justify-center gap-2">
                    <i className="ph-fill ph-fork-knife text-airbnb-coral"></i> Recommended Restaurants
                  </h3>
                  {day2Restaurants.map((rest, idx) => (
                    <RestaurantCard key={rest.title || idx} stop={rest} />
                  ))}
                </div>
              )}
            </div>

            {/* Map View */}
            <div className={`${viewMode === "list" ? 'hidden lg:block' : 'block'} w-full lg:sticky lg:top-[160px] lg:h-[calc(100vh-200px)] rounded-[24px] overflow-hidden shadow-sm border border-border/50`}>
              {(() => {
                let mapStops: any[] = [...currentStops];
                if (activeTab === 1 && typeof day1Restaurants !== 'undefined') {
                  mapStops = [...mapStops, ...day1Restaurants];
                } else if (activeTab === 2 && typeof day2Restaurants !== 'undefined') {
                  mapStops = [...mapStops, ...day2Restaurants];
                }
                return <MapView stops={mapStops} />;
              })()}
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Complete Road Trip Route Button */}
      <div className="text-center mt-8">
        <motion.a
          whileTap={{ scale: 0.97 }}
          href={(() => {
            if (!currentStops || currentStops.length === 0) return "https://maps.google.com";

            const cleanTitle = (title: string) => title.replace("Departure from ", "").replace("Arrival at ", "");

            if (currentStops.length === 1) {
              return `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(cleanTitle(currentStops[0].title))}`;
            }

            // Exclude the starting point from waypoints if it's just "Bangalore" since origin is My Location
            // But to keep it simple, just clean the titles.
            const validStops = currentStops.map(s => ({ ...s, searchTitle: cleanTitle(s.title) }));
            const lastStop = validStops[validStops.length - 1];

            // If the first stop is a generic starting point, we can skip it in waypoints to avoid backtracking
            const waypointsList = validStops.slice(0, -1);
            if (waypointsList.length > 0 && currentStops[0].category === "Starting Point") {
              waypointsList.shift();
            }

            const waypoints = waypointsList.map((s: any) => s.searchTitle).join('|');

            return `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(lastStop.searchTitle)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`;
          })()}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-airbnb-coral text-white rounded-2xl font-semibold text-sm transition-all hover:bg-rose-600 shadow-sm w-full gap-2"
        >
          <i className="ph-fill ph-map-trifold text-lg"></i> Open Complete Day Route
        </motion.a>
      </div>

    </div>
  );
}
