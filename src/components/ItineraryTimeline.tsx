"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

// The strict Bangalore to Milan Farm Stay route
const roadTripStops = [
  {
    title: "Departure from Bangalore",
    category: "Starting Point",
    desc: "Start your journey early to beat the city traffic.",
    img: "/images/trip1.png",
    tips: "Leave by 6:00 AM. Watch a beautiful highway sunrise.",
    duration: "N/A",
    drivingTime: "Drive 3 hrs",
    mapsUrl: "https://www.google.com/maps/search/Bangalore"
  },
  {
    title: "Shree Doddagaddavalli Temple",
    category: "Heritage",
    desc: "12th-century Hoysala masterpiece famous for four unique shrines.",
    img: "/images/trip3.png",
    tips: "Capture the symmetry of the four shrines from the eastern entrance.",
    duration: "Visit 45 mins",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Shree+Doddagaddavalli+Mahalakshmi+Temple" 
  },
  {
    title: "Hoysaleswara Temple, Halebidu",
    category: "Heritage",
    desc: "Famous for intricately carved walls depicting Hindu mythology.",
    img: "/images/trip3.png",
    tips: "Zoom in on the intricate jewelry carved on the statues. Best lit in late morning.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Hoysaleswara+Temple,+Halebidu"
  },
  {
    title: "Mango Tree Veg Restaurant",
    category: "Food Stop",
    desc: "Clean vegetarian restaurant perfectly timed for your lunch break.",
    img: "/images/hero.png",
    tips: "Photograph the colorful thali spread from a top-down angle.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 15 mins",
    mapsUrl: "https://www.google.com/maps/search/Mango+Tree+Veg+Restaurant+Hassan"
  },
  {
    title: "Yagachi Water Adventure",
    category: "Adventure",
    desc: "Take a refreshing break by the backwaters of the Yagachi dam.",
    img: "/images/trip2.png",
    tips: "Action shots of the water sports look great with a fast shutter speed.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 10 mins",
    mapsUrl: "https://www.google.com/maps/search/Yagachi+Water+Adventure+Centre"
  },
  {
    title: "Belur Chennakeshava Temple",
    category: "Heritage",
    desc: "Breathtaking marvel of Hoysala architecture and UNESCO site.",
    img: "/images/trip3.png",
    tips: "Look for the 'Darpana Sundari'. Use a wide-angle lens.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://www.google.com/maps/search/Chennakeshava+Temple,+Belur"
  },
  {
    title: "Mudigere",
    category: "Scenic Route",
    desc: "Landscape shifts to lush green hills and endless coffee estates.",
    img: "/images/trip1.png",
    tips: "Roll down the windows and capture a quick video of the misty roads.",
    duration: "N/A",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Mudigere,+Karnataka"
  },
  {
    title: "Arrival at Milan Farm Stay",
    category: "Destination",
    desc: "Welcome to your home in nature. Enjoy estate-grown coffee.",
    img: "/images/hero.png",
    tips: "The golden hour sunlight hitting the estate house is perfect.",
    duration: "Check-in",
    drivingTime: "Arrived",
    mapsUrl: "https://www.google.com/maps/search/Milan+Farm+Stay+Mudigere"
  }
];

const day2Stops = [
  {
    title: "Devaramane Viewpoint",
    category: "Nature",
    desc: "Stunning viewpoint offering panoramic views of the Western Ghats.",
    img: "/images/hero.png",
    tips: "Go early in the morning for a sea of clouds.",
    duration: "Visit 2 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Devaramane+Viewpoint+Mudigere"
  },
  {
    title: "Abbi Falls",
    category: "Waterfall",
    desc: "Serene waterfall tucked inside a coffee estate.",
    img: "/images/trip2.png",
    tips: "Use a slow shutter speed on your phone for silky water.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 40 mins",
    mapsUrl: "https://www.google.com/maps/search/Abbi+Falls"
  }
];

const day3Stops = [
  {
    title: "Estate Coffee Walk",
    category: "Experience",
    desc: "Guided walk with the host through the 50-acre plantation.",
    img: "/images/trip1.png",
    tips: "Macro shots of the red coffee cherries look incredible.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Walk",
    mapsUrl: "https://www.google.com/maps/search/Milan+Farm+Stay+Mudigere"
  }
];

const daySummaries: Record<number, any> = {
  1: { day: "Day 1", title: "The Road Trip", stops: 8, distance: "265 km", driveTime: "6 hr Drive", arrival: "5:30 PM" },
  2: { day: "Day 2", title: "Explore Mudigere", stops: 2, distance: "85 km", driveTime: "2 hr Drive", arrival: "6:00 PM" },
  3: { day: "Day 3", title: "Estate Leisure", stops: 1, distance: "0 km", driveTime: "Walk", arrival: "Flexible" },
};

function CompactStopCard({ stop }: { stop: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative mb-6 group stop-card" data-stop-title={stop.title}>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border border-border/50 hover:shadow-md">
        <div className="relative h-[120px] sm:h-[140px] w-full overflow-hidden">
          <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold uppercase text-dark z-10 shadow-sm tracking-wider">
            {stop.category}
          </span>
          <img src={stop.img} alt={stop.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
        
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
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-[13px] font-semibold text-airbnb-coral flex items-center gap-1 py-1"
            >
              {isExpanded ? "▲ Hide Details" : "▼ View Details"}
            </button>
            <a href={stop.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 h-[36px] border border-border rounded-full text-[12px] font-semibold text-dark transition-colors hover:bg-soft-beige gap-1">
              📍 Maps
            </a>
          </div>
          
          {/* Expandable Section */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 mt-3 pt-3 border-t border-border" : "max-h-0 opacity-0"}`}>
            {stop.tips && (
              <div className="mb-2 bg-soft-beige/50 p-3 rounded-xl">
                <h5 className="font-semibold text-dark text-[12px] mb-1 flex items-center gap-1.5">
                  <i className="ph-fill ph-camera text-airbnb-coral text-[14px]"></i> Photo Tip
                </h5>
                <p className="text-[12px] text-text-muted">{stop.tips}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function DaySummaryCard({ dayNum }: { dayNum: number }) {
  const summary = daySummaries[dayNum];
  return (
    <div className="sticky top-[70px] md:top-[80px] z-30 bg-white/90 backdrop-blur-md shadow-sm border border-border/50 rounded-2xl p-3 mb-6 mx-auto max-w-xl">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif font-bold text-lg text-dark">{summary.day}: {summary.title}</h3>
      </div>
      <div className="flex items-center gap-3 text-[12px] font-medium text-text-muted">
        <span>{summary.stops} Stops</span>
        <span className="w-1 h-1 rounded-full bg-border"></span>
        <span>{summary.distance}</span>
        <span className="w-1 h-1 rounded-full bg-border"></span>
        <span>{summary.driveTime}</span>
        <span className="w-1 h-1 rounded-full bg-border"></span>
        <span>Arr: {summary.arrival}</span>
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ days }: { days: string }) {
  const numDays = parseInt(days) || 1;
  const [activeTab, setActiveTab] = useState(1);
  const [currentStop, setCurrentStop] = useState("");
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup reliable scroll listener for timeline visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 80;
      setIsTimelineVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click or scroll
  useEffect(() => {
    const handleOutsideInteraction = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      window.addEventListener("scroll", handleOutsideInteraction, { passive: true });
      window.addEventListener("click", handleOutsideInteraction);
    }
    return () => {
      window.removeEventListener("scroll", handleOutsideInteraction);
      window.removeEventListener("click", handleOutsideInteraction);
    };
  }, [isDropdownOpen]);

  // Setup Intersection Observer for Floating Progress
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.getAttribute("data-stop-title");
            if (title) setCurrentStop(title);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    const stopCards = document.querySelectorAll(".stop-card");
    stopCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeTab, days]);

  // Reset active tab if days prop decreases
  useEffect(() => {
    if (activeTab > numDays) setActiveTab(1);
  }, [numDays, activeTab]);

  const getStopsForDay = (day: number) => {
    if (day === 1) return roadTripStops;
    if (day === 2) return day2Stops;
    if (day === 3) return day3Stops;
    return [];
  };

  const currentStops = getStopsForDay(activeTab);

  return (
    <div className="relative pb-8 px-4 max-w-xl mx-auto" ref={timelineRef}>
      
      {/* Fixed Day Tabs in Navbar area (only show if trip is > 1 day & timeline is visible) */}
      {mounted && numDays > 1 && isTimelineVisible && createPortal(
        <div className="fixed top-[12px] right-6 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-dark font-bold text-xs py-2 pl-4 pr-3 rounded-full shadow-md border border-border/50 hover:bg-cream transition-colors"
            >
              Day {activeTab}
              <i className={`ph-bold ph-caret-down text-[10px] text-text-muted transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}></i>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {Array.from({ length: numDays }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setActiveTab(i + 1);
                      setIsDropdownOpen(false);
                      setTimeout(() => {
                        document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
                      }, 10);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors flex items-center justify-between ${
                      activeTab === i + 1
                        ? "bg-airbnb-coral/10 text-airbnb-coral"
                        : "text-dark hover:bg-cream"
                    }`}
                  >
                    Day {i + 1}
                    {activeTab === i + 1 && <i className="ph-bold ph-check text-[10px]"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      <DaySummaryCard dayNum={activeTab} />
      
      {/* Timeline Container */}
      <div className="relative flex flex-col gap-2">
        {currentStops.map((stop: any, idx: number) => (
          <CompactStopCard key={idx} stop={stop} />
        ))}
      </div>

      {/* Complete Road Trip Route Button */}
      <div className="text-center mt-8">
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3.5 bg-airbnb-coral text-white rounded-2xl font-semibold text-sm transition-all hover:bg-rose-600 shadow-sm w-full gap-2">
          <i className="ph-fill ph-map-trifold text-lg"></i> Complete Route Map
        </a>
      </div>

    </div>
  );
}
