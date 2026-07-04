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
    title: "Mullayanagiri Peak",
    category: "Viewpoint",
    desc: "Highest peak in Karnataka. Sunrise / panoramic viewpoint.",
    img: "/images/hero.png",
    tips: "Trek up the stairs early morning to avoid the crowd and heat.",
    duration: "Visit 2 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://maps.app.goo.gl/NV7oPUxjdznWqfFh7",
    parkingInfo: "Park at the Seethalayyanagiri temple base where the jeep ride starts.",
    bestTime: "Sunrise or early morning."
  },
  {
    title: "Jhari Waterfalls",
    category: "Waterfall",
    desc: "Jeep ride (seasonal). Waterfall & photography.",
    img: "/images/trip2.png",
    tips: "Prepare for a bumpy jeep ride down. Carry a waterproof bag.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Jhari+Waterfalls",
    entryFee: "Jeep ride costs approx ₹700 per vehicle."
  },
  {
    title: "Datta Peeta (Baba Budangiri)",
    category: "Heritage",
    desc: "Historic pilgrimage site with incredible mountain viewpoints.",
    img: "/images/trip3.png",
    tips: "Respect the religious significance of the site.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Baba+Budangiri"
  },
  {
    title: "Manikyadhara Falls",
    category: "Waterfall",
    desc: "Natural waterfall known for its refreshing stop.",
    img: "/images/trip2.png",
    tips: "The water is considered holy. Great for a quick splash.",
    duration: "Visit 45 mins",
    drivingTime: "Drive 15 mins",
    mapsUrl: "https://www.google.com/maps/search/Manikyadhara+Falls"
  },
  {
    title: "Hirekolale Lake",
    category: "Nature",
    desc: "Peaceful lake views perfect for sunset photography.",
    img: "/images/lake.png",
    tips: "Sunset reflects beautifully on the water with hills in the backdrop.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 40 mins",
    mapsUrl: "https://www.google.com/maps/search/Hirekolale+Lake",
    bestTime: "Late afternoon / Sunset."
  },
  {
    title: "Freedom Park (Chikmagalur)",
    category: "Leisure",
    desc: "Evening relaxation at a family-friendly park.",
    img: "/images/park.png",
    tips: "Great spot for kids to play and unwind after a long day.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 25 mins",
    mapsUrl: "https://maps.app.goo.gl/9gJzLmhFYukHQMoz5"
  }
];

const day2Restaurants = [
  {
    title: "Mayura Deluxe",
    category: "Pure Veg",
    tags: ["Lunch & Dinner", "Family Friendly"],
    desc: "Comfortable and popular pure vegetarian dining.",
    img: "/images/restaurant.png",
    mapsUrl: "https://www.google.com/maps/search/Mayura+Deluxe+Chikmagalur"
  },
  {
    title: "Hotel Adrika",
    category: "Multi Cuisine",
    tags: ["Coffee & Snacks", "Dinner"],
    desc: "Premium multi-cuisine restaurant with a great ambiance.",
    img: "/images/restaurant.png",
    mapsUrl: "https://www.google.com/maps/search/Hotel+Adrika+Chikmagalur"
  }
];

const day3Stops = [
  {
    title: "Devaramane View Point",
    category: "Nature",
    desc: "Misty hills and incredible sunrise viewpoint.",
    img: "/images/hero.png",
    tips: "The winds can be very strong. Carry a windcheater.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Devaramane+Viewpoint",
    bestTime: "Early Morning."
  },
  {
    title: "Bettada Bhairaveshwara Temple",
    category: "Heritage",
    desc: "Hilltop temple with a scenic drive through the forests.",
    img: "/images/trip3.png",
    tips: "The drive itself is beautiful. Stop safely for photos.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Bettada+Bhairaveshwara+Temple"
  },
  {
    title: "Majagadahalli Waterfalls",
    category: "Hidden Gem",
    desc: "Hidden waterfall requiring a short nature walk.",
    img: "/images/trip2.png",
    tips: "Wear shoes with good grip. The path can be slippery.",
    duration: "Visit 2 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://www.google.com/maps/search/Majagadahalli+Waterfalls",
    localTips: "Ask locals for directions as signal might be weak."
  }
];

const day4Stops = [
  {
    title: "Kelagur Tea Estate",
    category: "Experience",
    desc: "Explore tea plantations, take photos, and buy local tea.",
    img: "/images/tea.png",
    tips: "Visit the factory outlet to buy fresh tea directly from the estate.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 25 mins",
    mapsUrl: "https://www.google.com/maps/search/Kelagur+Tea+Estate",
    nearbyCafes: "Estate tea shop."
  },
  {
    title: "Ranijhari Viewpoint",
    category: "Scenic Route",
    desc: "Iconic winding roads and a must-visit photo stop.",
    img: "/images/hero.png",
    tips: "Drone photography looks spectacular here.",
    duration: "Visit 45 mins",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Ranijhari+Viewpoint"
  },
  {
    title: "Kodige Falls",
    category: "Waterfall",
    desc: "Seasonal waterfall accessible via a short trek.",
    img: "/images/trip2.png",
    tips: "Carry drinking water for the short hike.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Kodige+Falls",
    entryFee: "Nominal forest department fee."
  },
  {
    title: "Maidadi View Point",
    category: "Hidden Gem",
    desc: "Panoramic Western Ghats hidden viewpoint.",
    img: "/images/trip1.png",
    tips: "Very secluded, perfect for peaceful reflection.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 40 mins",
    mapsUrl: "https://www.google.com/maps/search/Maidadi+View+Point"
  },
  {
    title: "Hornadu Annapoorneshwari Temple",
    category: "Heritage",
    desc: "Famous temple providing a peaceful ending to the trip.",
    img: "/images/trip3.png",
    tips: "Prasadam (lunch/dinner) is served to all devotees. Highly recommended.",
    duration: "Visit 2 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Hornadu+Annapoorneshwari+Temple",
    localTips: "Dress code applies for entry to the inner sanctum."
  }
];

const daySummaries: Record<number, any> = {
  1: { day: "Day 1", title: "The Road Trip", text: "8 Stops • 265 km • 6 hrs Drive" },
  2: { day: "Day 2", title: "Chikmagalur Adventure", text: "6 Stops • 90 km • 8 hrs • Start 7:00 AM" },
  3: { day: "Day 3", title: "Mudigere Exploration", text: "3 Stops • 70 km • Relaxed Exploration" },
  4: { day: "Day 4", title: "Kalasa & Kelagur Route", text: "5 Stops • 110 km • Leisure Morning" },
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
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[800px] opacity-100 mt-3 pt-3 border-t border-border" : "max-h-0 opacity-0"}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function DaySummaryCard({ dayNum, numDays }: { dayNum: number, numDays: number }) {
  const summary = daySummaries[dayNum];
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?trip=${numDays}&day=${dayNum}`;
    
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
    <div className="sticky top-[70px] md:top-[80px] z-30 bg-white/90 backdrop-blur-md shadow-sm border border-border/50 rounded-2xl p-3 mb-6 mx-auto max-w-xl text-center flex items-center justify-between">
      <div className="flex-1">
        <h3 className="font-serif font-bold text-lg text-dark mb-0.5">{summary.day} - {summary.title}</h3>
        <div className="text-[11px] md:text-[12px] font-medium text-text-muted">
          {summary.text}
        </div>
      </div>
      
      <button 
        onClick={handleShare}
        className="w-10 h-10 shrink-0 flex flex-col items-center justify-center bg-cream rounded-xl text-dark hover:bg-soft-beige transition-colors ml-2"
        title="Share this Day"
      >
        <i className={`ph-bold ${copied ? 'ph-check text-green-600' : 'ph-share-network'} text-base mb-0.5`}></i>
        <span className="text-[8px] font-bold uppercase tracking-wider">{copied ? 'Copied' : 'Share'}</span>
      </button>
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
    
    // Read from URL on mount to restore the specific day tab if shared
    const params = new URLSearchParams(window.location.search);
    const dayParam = params.get('day');
    if (dayParam) {
      const d = parseInt(dayParam);
      if (d >= 1 && d <= numDays) {
        setActiveTab(d);
      }
    }
  }, [numDays]);

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
    if (day === 4) return day4Stops;
    return [];
  };

  const currentStops = getStopsForDay(activeTab);

  return (
    <div className="relative pb-8 px-4 max-w-xl mx-auto" ref={timelineRef}>
      
      {/* Fixed Day Tabs in Navbar area (only show if trip is > 1 day & timeline is visible) */}
      {mounted && numDays > 1 && isTimelineVisible && (
        <div className="fixed top-[12px] right-6 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-dark font-bold text-xs py-2 pl-4 pr-3 rounded-full shadow-md border border-border/50 hover:bg-cream transition-colors max-w-[calc(100vw-260px)] sm:max-w-[220px]"
            >
              <span className="truncate">Day {activeTab} - {daySummaries[activeTab]?.title}</span>
              <i className={`ph-bold ph-caret-down text-[10px] text-text-muted shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}></i>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {Array.from({ length: numDays }).map((_, i) => {
                  const d = i + 1;
                  return (
                  <button
                    key={d}
                    onClick={() => {
                      setActiveTab(d);
                      setIsDropdownOpen(false);
                      
                      // Update URL
                      const newUrl = `${window.location.pathname}?trip=${numDays}&day=${d}`;
                      window.history.pushState(null, '', newUrl);

                      setTimeout(() => {
                        document.getElementById("itinerary-view")?.scrollIntoView({ behavior: "smooth" });
                      }, 10);
                    }}
                    className={`w-full text-left px-4 py-3 text-[11px] md:text-xs font-bold transition-colors flex items-center justify-between ${
                      activeTab === d
                        ? "bg-airbnb-coral/10 text-airbnb-coral"
                        : "text-dark hover:bg-cream"
                    }`}
                  >
                    <span className="truncate pr-2">Day {d} - {daySummaries[d]?.title}</span>
                    {activeTab === d && <i className="ph-bold ph-check text-[10px] shrink-0"></i>}
                  </button>
                )})}
              </div>
            )}
          </div>
        </div>
      )}

      <DaySummaryCard dayNum={activeTab} numDays={numDays} />
      
      {/* Timeline Container */}
      <div className="relative flex flex-col gap-2">
        {currentStops.map((stop: any, idx: number) => (
          <CompactStopCard key={idx} stop={stop} />
        ))}

        {activeTab === 2 && (
          <div className="mt-4 pt-6 border-t border-border">
            <h3 className="font-serif text-xl font-bold text-dark mb-4 text-center flex items-center justify-center gap-2">
              <i className="ph-fill ph-fork-knife text-airbnb-coral"></i> Recommended Restaurants
            </h3>
            {day2Restaurants.map((rest, idx) => (
              <RestaurantCard key={idx} stop={rest} />
            ))}
          </div>
        )}
      </div>

      {/* Complete Road Trip Route Button */}
      <div className="text-center mt-8">
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3.5 bg-airbnb-coral text-white rounded-2xl font-semibold text-sm transition-all hover:bg-rose-600 shadow-sm w-full gap-2">
          <i className="ph-fill ph-map-trifold text-lg"></i> Open Complete Day Route
        </a>
      </div>

    </div>
  );
}
