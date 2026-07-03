import { useEffect, useState } from "react";

// The strict Bangalore to Milan Farm Stay route
const roadTripStops = [
  {
    title: "Departure from Bangalore",
    category: "Starting Point",
    desc: "Start your journey early to beat the city traffic. Grab a quick coffee before hitting the NH75 highway.",
    img: "/images/trip1.png",
    tips: "Leave by 6:00 AM. Watch a beautiful highway sunrise.",
    duration: "N/A",
    drivingTime: "Drive: 3 hrs to next stop",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Shree Doddagaddavalli Mahalakshmi Temple",
    category: "Heritage",
    desc: "A stunning, offbeat 12th-century Hoysala temple. It is one of the earliest Hoysala temples and uniquely features four shrines.",
    img: "/images/trip3.png",
    tips: "Capture the symmetry of the four shrines from the eastern entrance.",
    duration: "Visit: 45 mins",
    drivingTime: "Drive: 30 mins",
    mapsUrl: "https://maps.app.goo.gl/..." 
  },
  {
    title: "Shri Hoysaleswara Temple, Halebidu",
    category: "Heritage",
    desc: "Famous for its intricately carved walls depicting Hindu mythology. The sheer detail in the stone carvings is mesmerizing.",
    img: "/images/trip3.png",
    tips: "Zoom in on the intricate jewelry carved on the statues. Best lit in the late morning.",
    duration: "Visit: 1.5 hrs",
    drivingTime: "Drive: 20 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Lunch at Mango Tree Veg Restaurant",
    category: "Food Stop",
    desc: "A highly-rated, clean vegetarian restaurant perfectly timed for your lunch break. Great South Indian thalis.",
    img: "/images/hero.png",
    tips: "Photograph the colorful thali spread from a top-down angle.",
    duration: "Visit: 1 hr",
    drivingTime: "Drive: 15 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Yagachi Water Adventure Centre",
    category: "Adventure",
    desc: "Take a refreshing break by the backwaters of the Yagachi dam. Try jet skiing, banana boat rides, or just relax by the water.",
    img: "/images/trip2.png",
    tips: "Action shots of the water sports look great with a fast shutter speed.",
    duration: "Visit: 1 hr",
    drivingTime: "Drive: 10 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Belur Chennakeshava Temple",
    category: "Heritage",
    desc: "A breathtaking marvel of Hoysala architecture and a UNESCO World Heritage site. The gravity-defying pillars are a must-see.",
    img: "/images/trip3.png",
    tips: "Look for the 'Darpana Sundari' (lady with the mirror) carving. Use a wide-angle lens for the main structure.",
    duration: "Visit: 1.5 hrs",
    drivingTime: "Drive: 45 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Mudigere",
    category: "Scenic Route",
    desc: "As you enter Mudigere, the landscape dramatically shifts to lush green hills, winding roads, and endless coffee estates.",
    img: "/images/trip1.png",
    tips: "Roll down the windows and capture a quick video of the winding, misty roads.",
    duration: "N/A",
    drivingTime: "Drive: 20 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Arrival at Milan Farm Stay",
    category: "Destination",
    desc: "Welcome to your home in nature. Enjoy a warm cup of estate-grown coffee and check into your cozy room.",
    img: "/images/hero.png",
    tips: "The golden hour sunlight hitting the estate house is perfect for your first vacation picture.",
    duration: "Check-in",
    drivingTime: "You have arrived!",
    mapsUrl: "https://maps.google.com"
  }
];

const day2Stops = [
  {
    title: "Devaramane Viewpoint",
    category: "Nature",
    desc: "A stunning viewpoint offering panoramic views of the Western Ghats covered in mist.",
    img: "/images/hero.png",
    tips: "Go early in the morning for a sea of clouds.",
    duration: "Visit: 2 hrs",
    drivingTime: "Drive: 30 mins",
    mapsUrl: "https://maps.google.com"
  },
  {
    title: "Abbi Falls (Nearby)",
    category: "Waterfall",
    desc: "A serene waterfall tucked inside a coffee estate. Perfect for a refreshing dip.",
    img: "/images/trip2.png",
    tips: "Use a slow shutter speed on your phone (live photo long exposure) for silky water.",
    duration: "Visit: 1.5 hrs",
    drivingTime: "Drive: 40 mins",
    mapsUrl: "https://maps.google.com"
  }
];

const day3Stops = [
  {
    title: "Estate Coffee Walk",
    category: "Experience",
    desc: "Take a guided walk with the host through the 50-acre plantation. Learn how coffee goes from bean to cup.",
    img: "/images/trip1.png",
    tips: "Macro shots of the red coffee cherries look incredible.",
    duration: "Visit: 1.5 hrs",
    drivingTime: "Walk",
    mapsUrl: "https://maps.google.com"
  }
];

function Timeline({ stops, dayTitle }: { stops: any[]; dayTitle: string }) {
  return (
    <div className="mb-20">
      <h3 className="font-serif text-3xl md:text-4xl text-dark mb-10 text-center">{dayTitle}</h3>
      <div className="relative max-w-3xl mx-auto before:content-[''] before:absolute before:top-0 before:left-[19px] md:before:left-[27px] before:w-[2px] before:h-full before:bg-border">
        {stops.map((stop: any, idx: number) => (
          <div key={idx} className="relative pl-[50px] md:pl-[80px] mb-12 group">
            <div className="absolute left-[12px] md:left-[20px] top-0 w-4 h-4 rounded-full bg-airbnb-coral border-4 border-white shadow-[0_0_0_2px_var(--color-airbnb-coral)] z-10"></div>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100">
              <div className="relative h-[220px] sm:h-[300px] w-full">
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase text-dark z-10 shadow-sm tracking-wide">
                  {stop.category}
                </span>
                <img src={stop.img} alt={stop.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 text-text-muted text-sm font-medium mb-4 bg-cream rounded-xl p-3">
                  <span className="flex items-center gap-1"><i className="ph ph-car text-lg"></i> {stop.drivingTime}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1"><i className="ph ph-clock text-lg"></i> {stop.duration}</span>
                </div>
                
                <h4 className="font-serif text-2xl md:text-3xl font-semibold text-dark mb-3">{stop.title}</h4>
                <p className="text-text-muted text-lg mb-6 leading-relaxed">{stop.desc}</p>
                
                {stop.tips && (
                  <div className="mb-6 flex items-start gap-3 bg-soft-beige/50 p-4 rounded-2xl">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm text-airbnb-coral">
                      <i className="ph-fill ph-camera text-xl"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-dark text-sm">Photo Tip</h5>
                      <p className="text-sm text-text-muted">{stop.tips}</p>
                    </div>
                  </div>
                )}
                
                <a href={stop.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-dark text-white rounded-xl font-medium transition-all hover:bg-black gap-2">
                  <i className="ph-fill ph-map-pin"></i> Open in Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ItineraryTimeline({ days }: { days: string }) {
  const [mounted, setMounted] = useState(false);
  const [currentDays, setCurrentDays] = useState(days);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (days !== currentDays) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentDays(days);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [days, currentDays]);

  if (!mounted) return null;

  return (
    <div className={"transition-opacity duration-300 px-4 " + (isAnimating ? 'opacity-0' : 'opacity-100')}>
      
      {/* Overview Info Block */}
      <div className="max-w-3xl mx-auto mb-16 bg-cream p-6 md:p-8 rounded-3xl">
        <h3 className="font-serif text-2xl font-semibold text-dark mb-6">Trip Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-text-muted text-sm mb-1">Est. Departure</p>
            <p className="font-medium text-dark">6:00 AM</p>
          </div>
          <div>
            <p className="text-text-muted text-sm mb-1">Est. Arrival</p>
            <p className="font-medium text-dark">2:00 PM</p>
          </div>
          <div>
            <p className="text-text-muted text-sm mb-1">Total Distance</p>
            <p className="font-medium text-dark">~260 km</p>
          </div>
          <div>
            <p className="text-text-muted text-sm mb-1">Road Condition</p>
            <p className="font-medium text-green-700">Excellent (NH75)</p>
          </div>
        </div>
      </div>

      <Timeline stops={roadTripStops} dayTitle="Day 1: The Road Trip" />
      
      {(currentDays === "2" || currentDays === "3") && (
        <Timeline stops={day2Stops} dayTitle="Day 2: Explore Mudigere" />
      )}
      
      {currentDays === "3" && (
        <Timeline stops={day3Stops} dayTitle="Day 3: Estate Leisure" />
      )}

      <div className="max-w-3xl mx-auto text-center mb-12">
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-airbnb-coral text-white rounded-2xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg w-full md:w-auto gap-2">
          <i className="ph-fill ph-map-trifold text-2xl"></i> Complete Road Trip Route
        </a>
      </div>

    </div>
  );
}
