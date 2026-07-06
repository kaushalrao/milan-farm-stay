"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  },
  {
    title: "Chikmagalur Food Court",
    category: "Food Court",
    tags: ["Multi Cuisine", "Quick Bites"],
    desc: "A great stop offering a wide variety of food options in one place.",
    img: "/images/restaurant.png",
    mapsUrl: "https://maps.app.goo.gl/doUSZZqpFipqiWrZ7"
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

const day5Stops = [
  {
    title: "Netravati Peak Trek",
    category: "Trekking",
    desc: "Scenic trek offering breathtaking views of the Western Ghats.",
    img: "/images/netravati.png",
    tips: "Trek permissions and slots must be booked in advance.",
    duration: "Visit 5-6 hrs",
    drivingTime: "Drive 1.5 hrs",
    mapsUrl: "https://www.google.com/maps/search/Netravati+Peak",
    localTips: "Local Guide: [+91 XXXXX XXXXX]. Pre-book entry tickets via Aranya Vihara portal.",
    bookingLink: "https://aranyavihaara.karnataka.gov.in/"
  },
  {
    title: "Bandaje Falls Trek",
    category: "Trekking",
    desc: "A challenging but rewarding trek to the stunning Bandaje Arbi falls.",
    img: "/images/bandaje.png",
    tips: "Ensure you have enough water and wear good grip shoes.",
    duration: "Visit 6-8 hrs",
    drivingTime: "Drive 1.5 hrs",
    mapsUrl: "https://www.google.com/maps/search/Bandaje+Falls",
    localTips: "Advance entry booking is strictly required via Aranya Vihara portal.",
    bookingLink: "https://aranyavihaara.karnataka.gov.in/"
  },
  {
    title: "Ettina Bhuja Trek",
    category: "Trekking",
    desc: "Short yet moderately steep trek offering 360-degree panoramic views.",
    img: "/images/ettina.png",
    tips: "Trek in the early morning to avoid the heat. Very scenic during monsoon.",
    duration: "Visit 3 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://www.google.com/maps/search/Ettina+Bhuja",
    localTips: "Home Made Lunch: [+91 XXXXX XXXXX]. Advance entry booking via Aranya Vihara portal is required.",
    bookingLink: "https://aranyavihaara.karnataka.gov.in/"
  }
];

const daySummaries: Record<number, any> = {
  1: { day: "Day 1", title: "The Road Trip", text: "8 Stops • 265 km • 6 hrs Drive" },
  2: { day: "Day 2", title: "Chikmagalur Adventure", text: "6 Stops • 90 km • 8 hrs • Start 7:00 AM" },
  3: { day: "Day 3", title: "Mudigere Exploration", text: "3 Stops • 70 km • Relaxed Exploration" },
  4: { day: "Day 4", title: "Kalasa & Kelagur Route", text: "5 Stops • 110 km • Leisure Morning" },
  5: { day: "Treks", title: "Chikmagalur Treks", text: "3 Treks • Advance Booking Required" },
};

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

function DaySummaryCard({ dayNum, numDays }: { dayNum: number, numDays: number }) {
  const summary = daySummaries[dayNum];
  const [copied, setCopied] = useState(false);

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
    <div className="sticky top-[70px] md:top-[80px] z-30 bg-white/90 backdrop-blur-md shadow-sm border border-border/50 rounded-2xl p-3 mb-6 mx-auto max-w-xl text-center flex items-center justify-between">
      <div className="flex-1">
        <h3 className="font-serif font-bold text-lg text-dark mb-0.5">{summary.day} - {summary.title}</h3>
        <div className="text-[11px] md:text-[12px] font-medium text-text-muted">
          {summary.text}
        </div>
      </div>
      
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="w-10 h-10 shrink-0 flex flex-col items-center justify-center bg-cream rounded-xl text-dark hover:bg-soft-beige transition-colors ml-2"
        title="Share this Day"
      >
        <i className={`ph-bold ${copied ? 'ph-check text-green-600' : 'ph-share-network'} text-base mb-0.5`}></i>
        <span className="text-[8px] font-bold uppercase tracking-wider">{copied ? 'Copied' : 'Share'}</span>
      </motion.button>
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
    <div className="relative pb-8 px-4 max-w-xl mx-auto">
      
      <DaySummaryCard dayNum={activeTab} numDays={4} />
      
      {/* Timeline Container with Day Switching Animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
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

          {currentStops.map((stop: any, idx: number) => (
            <CompactStopCard key={stop.title || idx} stop={stop} index={idx} />
          ))}

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
