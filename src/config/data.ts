export const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in is at 2:00 PM and check-out is at 11:00 AM." },
  { q: "Are pets allowed?", a: "Yes, we are a pet-friendly property! Please inform us in advance." },
  { q: "Do you offer pick-up services?", a: "Yes, we can arrange taxi pickups from Bangalore or Mangalore airport." },
];

export const tripOptions = [
  {
    id: "1",
    hash: "day-1",
    destination: "Milan Farm Stays",
    metadata: "Day 1 • 6 hrs Drive",
    highlights: "📍 Bangalore • Hassan • Sakleshpur",
    tags: ["Road Trip", "Scenic"],
    img: "/images/trip1.png",
  },
  {
    id: "2",
    hash: "day-2",
    destination: "Chikmagalur",
    metadata: "Day 2 • Full Day",
    highlights: "📍 Mullayanagiri • Jhari Falls",
    tags: ["Nature", "Adventure"],
    img: "/images/hero.png",
  },
  {
    id: "3",
    hash: "day-3",
    destination: "Mudigere",
    metadata: "Day 3 • Relaxed",
    highlights: "📍 Devaramane • Charmadi",
    tags: ["Views", "Coffee"],
    img: "/images/trip3.png",
  },
  {
    id: "4",
    hash: "day-4",
    destination: "Kalasa",
    metadata: "Day 4 • Morning",
    highlights: "📍 Kelagur Estate • Temple",
    tags: ["Culture", "Tea"],
    img: "/images/trip2.png",
  },
  {
    id: "5",
    hash: "day-5",
    destination: "Explore Treks",
    metadata: "Advance Booking Req.",
    highlights: "📍 Netravati • Bandaje • Ettina Bhuja",
    tags: ["Treks", "Forest"],
    img: "/images/netravati.png",
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1524388631102-140b904ebfce?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621213079948-2b8104df04ee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627883238637-251cce66ebdd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601051515905-eb10bcebc11b?q=80&w=800&auto=format&fit=crop"
];

export const tripPlannerTabs = [
  { id: "1", label: "1 Day", icon: "ph-car-profile" },
  { id: "2", label: "2 Days", icon: "ph-plant" },
  { id: "3", label: "3 Days", icon: "ph-coffee" },
  { id: "custom", label: "Custom", icon: "ph-mountains" },
];

export const navItems = [
  { label: "Itinerary", href: "#plan", id: "plan", icon: "ph-map-trifold" },
  { label: "Guest Services", href: "#contacts", id: "contacts", icon: "ph-users" }
];

export const localTips = [
  { icon: "ph-wifi-slash", title: "Network Availability", desc: "Airtel works best. Jio is patchy. Enjoy the digital detox!" },
  { icon: "ph-qr-code", title: "Payments", desc: "UPI is widely accepted, but carry cash for remote shops." },
  { icon: "ph-steering-wheel", title: "Road Conditions", desc: "The last 2km to the estate is an off-road path. Drive slow." },
  { icon: "ph-camera-plus", title: "Photography", desc: "Early mornings (6:30 AM) offer the best mist in the coffee estate." },
];

export const roadTripStops = [
  {
    title: "Departure from Bangalore",
    category: "Starting Point",
    desc: "Start your journey early to beat the city traffic.",
    img: "/images/trip1.png",
    tips: "Leave by 6:00 AM. Watch a beautiful highway sunrise.",
    duration: "N/A",
    drivingTime: "Drive 3 hrs",
    mapsUrl: "https://www.google.com/maps/search/Bangalore",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    title: "Shree Doddagaddavalli Temple",
    category: "Heritage",
    desc: "12th-century Hoysala masterpiece famous for four unique shrines.",
    img: "/images/trip3.png",
    tips: "Capture the symmetry of the four shrines from the eastern entrance.",
    duration: "Visit 45 mins",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Shree+Doddagaddavalli+Mahalakshmi+Temple",
    lat: 13.0906,
    lng: 76.0125,
  },
  {
    title: "Hoysaleswara Temple, Halebidu",
    category: "Heritage",
    desc: "Famous for intricately carved walls depicting Hindu mythology.",
    img: "/images/trip3.png",
    tips: "Zoom in on the intricate jewelry carved on the statues. Best lit in late morning.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Hoysaleswara+Temple,+Halebidu",
    lat: 13.2132,
    lng: 75.9942,
  },

  {
    title: "Yagachi Water Adventure",
    category: "Adventure",
    desc: "Take a refreshing break by the backwaters of the Yagachi dam.",
    img: "/images/trip2.png",
    tips: "Action shots of the water sports look great with a fast shutter speed.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 10 mins",
    mapsUrl: "https://www.google.com/maps/search/Yagachi+Water+Adventure+Centre",
    lat: 13.197,
    lng: 75.877,
  },
  {
    title: "Belur Chennakeshava Temple",
    category: "Heritage",
    desc: "Breathtaking marvel of Hoysala architecture and UNESCO site.",
    img: "/images/trip3.png",
    tips: "Look for the 'Darpana Sundari'. Use a wide-angle lens.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://www.google.com/maps/search/Chennakeshava+Temple,+Belur",
    lat: 13.1627,
    lng: 75.8593,
  },
  {
    title: "Mudigere",
    category: "Scenic Route",
    desc: "Landscape shifts to lush green hills and endless coffee estates.",
    img: "/images/trip1.png",
    tips: "Roll down the windows and capture a quick video of the misty roads.",
    duration: "N/A",
    drivingTime: "Drive 20 mins",
    mapsUrl: "https://www.google.com/maps/search/Mudigere,+Karnataka",
    lat: 13.1365,
    lng: 75.6429,
  },
  {
    title: "Arrival at Milan Farm Stay",
    category: "Destination",
    desc: "Welcome to your home in nature. Enjoy estate-grown coffee.",
    img: "/images/hero.png",
    tips: "The golden hour sunlight hitting the estate house is perfect.",
    duration: "Check-in",
    drivingTime: "Arrived",
    mapsUrl: "https://www.google.com/maps/search/Milan+Farm+Stay+Mudigere",
    lat: 13.13,
    lng: 75.64,
  }
];

export const day1Restaurants = [
  {
    title: "Mango Tree Veg Restaurant, Halebidu",
    category: "Pure Veg",
    tags: ["Lunch Break", "Family Friendly"],
    desc: "Clean vegetarian restaurant perfectly timed for your lunch break.",
    img: "/images/hero.png",
    mapsUrl: "https://maps.app.goo.gl/T7nues5F2329JMpX9",
    lat: 13.21,
    lng: 75.99,
  }
];

export const day2Stops = [
  {
    title: "Mullayanagiri Base Point",
    category: "Viewpoint Base",
    desc: "Base point for Mullayanagiri Peak. Park your car here and take a jeep to the top.",
    img: "/images/hero.png",
    tips: "Trek up the final stairs early morning to avoid the crowd and heat.",
    duration: "Visit 2 hrs",
    drivingTime: "Drive 45 mins",
    mapsUrl: "https://www.google.com/maps/search/Shri+Sitalayyanagiri+Gudi",
    lat: 13.385,
    lng: 75.72,
    parkingInfo: "Park your vehicle here. Jeep ride required from this point onwards.",
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
    lat: 13.398,
    lng: 75.745,
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
    mapsUrl: "https://www.google.com/maps/search/Baba+Budangiri",
    lat: 13.415,
    lng: 75.755
  },
  {
    title: "Manikyadhara Falls",
    category: "Waterfall",
    desc: "Natural waterfall known for its refreshing stop.",
    img: "/images/trip2.png",
    tips: "The water is considered holy. Great for a quick splash.",
    duration: "Visit 45 mins",
    drivingTime: "Drive 15 mins",
    mapsUrl: "https://www.google.com/maps/search/Manikyadhara+Falls",
    lat: 13.425,
    lng: 75.765,
  },
  {
    title: "Hirekolale Lake",
    category: "Nature",
    desc: "Peaceful lake views perfect for sunset photography.",
    img: "/images/lake.png",
    tips: "Sunset reflects beautifully on the water with hills in the backdrop.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 40 mins",
    mapsUrl: "https://maps.app.goo.gl/dLKYr7AsYb6vt9yM8",
    lat: 13.33,
    lng: 75.715,
    bestTime: "Late afternoon / Sunset."
  },
  {
    title: "Freedom Park (Chikmagalur)",
    category: "Leisure",
    desc: "Evening relaxation at a family-friendly park.",
    img: "/images/freedom_park.png",
    tips: "Great spot for kids to play and unwind after a long day.",
    duration: "Visit 1 hr",
    drivingTime: "Drive 25 mins",
    mapsUrl: "https://maps.app.goo.gl/9gJzLmhFYukHQMoz5",
    lat: 13.32,
    lng: 75.77
  }
];

export const day2Restaurants = [
  {
    title: "Mayura Deluxe",
    category: "Pure Veg",
    tags: ["Lunch & Dinner", "Family Friendly"],
    desc: "Comfortable and popular pure vegetarian dining.",
    img: "/images/restaurant.png",
    mapsUrl: "https://www.google.com/maps/search/Mayura+Deluxe+Chikmagalur",
    lat: 13.315,
    lng: 75.775,
  },
  {
    title: "Hotel Adrika",
    category: "Multi Cuisine",
    tags: ["Coffee & Snacks", "Dinner"],
    desc: "Premium multi-cuisine restaurant with a great ambiance.",
    img: "/images/restaurant.png",
    mapsUrl: "https://www.google.com/maps/search/Hotel+Adrika+Chikmagalur",
    lat: 13.316,
    lng: 75.776,
  },
  {
    title: "Chikmagalur Food Court",
    category: "Food Court",
    tags: ["Multi Cuisine", "Quick Bites"],
    desc: "A great stop offering a wide variety of food options in one place.",
    img: "/images/restaurant.png",
    mapsUrl: "https://maps.app.goo.gl/doUSZZqpFipqiWrZ7",
    lat: 13.317,
    lng: 75.777,
  }
];

export const day3Stops = [
  {
    title: "Devaramane View Point",
    category: "Nature",
    desc: "Misty hills and incredible sunrise viewpoint.",
    img: "/images/hero.png",
    tips: "The winds can be very strong. Carry a windcheater.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 30 mins",
    mapsUrl: "https://www.google.com/maps/search/Devaramane+Viewpoint",
    lat: 13.06,
    lng: 75.54,
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
    mapsUrl: "https://www.google.com/maps/search/Bettada+Bhairaveshwara+Temple",
    lat: 13.065,
    lng: 75.545,
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
    lat: 13.07,
    lng: 75.55,
    localTips: "Ask locals for directions as signal might be weak."
  }
];

export const day4Stops = [
  {
    title: "Kelagur Tea Estate",
    category: "Experience",
    desc: "Explore tea plantations, take photos, and buy local tea.",
    img: "/images/tea.png",
    tips: "Visit the factory outlet to buy fresh tea directly from the estate.",
    duration: "Visit 1.5 hrs",
    drivingTime: "Drive 25 mins",
    mapsUrl: "https://www.google.com/maps/search/Kelagur+Tea+Estate",
    lat: 13.12,
    lng: 75.45,
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
    mapsUrl: "https://www.google.com/maps/search/Ranijhari+Viewpoint",
    lat: 13.13,
    lng: 75.46,
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
    lat: 13.14,
    lng: 75.47,
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
    mapsUrl: "https://www.google.com/maps/search/Maidadi+View+Point",
    lat: 13.15,
    lng: 75.48,
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
    lat: 13.27,
    lng: 75.34,
    localTips: "Dress code applies for entry to the inner sanctum."
  }
];

export const day5Stops = [
  {
    title: "Netravati Peak Trek",
    category: "Trekking",
    desc: "Scenic trek offering breathtaking views of the Western Ghats.",
    img: "/images/netravati.png",
    tips: "Trek permissions and slots must be booked in advance.",
    duration: "Visit 5-6 hrs",
    drivingTime: "Drive 1.5 hrs",
    mapsUrl: "https://www.google.com/maps/search/Netravati+Peak",
    lat: 13.12,
    lng: 75.35,
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
    lat: 13.13,
    lng: 75.36,
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
    lat: 13.14,
    lng: 75.37,
    localTips: "Home Made Lunch: [+91 XXXXX XXXXX]. Advance entry booking via Aranya Vihara portal is required.",
    bookingLink: "https://aranyavihaara.karnataka.gov.in/"
  }
];

export const daySummaries: Record<number, any> = {
  1: { day: "Day 1", title: "The Road Trip", text: "8 Stops • 265 km • 6 hrs Drive" },
  2: { day: "Day 2", title: "Chikmagalur Adventure", text: "6 Stops • 90 km • 8 hrs • Start 7:00 AM" },
  3: { day: "Day 3", title: "Mudigere Exploration", text: "3 Stops • 70 km • Relaxed Exploration" },
  4: { day: "Day 4", title: "Kalasa & Kelagur Route", text: "5 Stops • 110 km • Leisure Morning" },
  5: { day: "Treks", title: "Chikmagalur Treks", text: "3 Treks • Advance Booking Required" },
};
