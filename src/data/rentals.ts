export interface RentalVendor {
  id: string;
  name: string;
  location: "Chikmagalur" | "Sakleshpur" | "Mudigere";
  locationDetail: string;
  category: "bike" | "car" | "both" | "taxi";
  websiteUrl?: string;
  phone?: string;
  whatsapp?: string;
  badge?: string;
  isFeatured?: boolean;
  vehicles: string[];
  highlights: string[];
  description: string;
  address?: string;
  mapsUrl?: string;
}

export const RENTAL_VENDORS: RentalVendor[] = [
  // 1. Chikmagalur Priority (Self-Drive Rentals)
  {
    id: "royal-brothers-chikmagalur",
    name: "Royal Brothers",
    location: "Chikmagalur",
    locationDetail: "Jyothi Nagar & Market Road Hubs (App Booking)",
    address: "Housing Board, Jyothi Nagar / Market Road, Chikmagalur - 577102",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Brothers+Bike+Rentals+Chikmagalur",
    category: "bike",
    websiteUrl: "https://www.royalbrothers.com/chikmagalur/bike-rentals",
    badge: "App Booking",
    vehicles: [
      "Scooters (Activa, Dio)",
      "Bikes (Royal Enfield, Himalayan)"
    ],
    highlights: [
      "Official app & website booking with verified fleet",
      "Pickup hubs around Jyothi Nagar & Market Road"
    ],
    description: "Well-known self-drive bike and scooter rental platform with verified fleet and app booking. Convenient for exploring Mullayanagiri, Bababudangiri, and hill roads."
  },
  {
    id: "rock-n-roll-chikmagalur",
    name: "Rock N Roll Bike Rentals",
    location: "Chikmagalur",
    locationDetail: "Chokanna Street, Adarsha Nagara (near Mayura Hotel)",
    address: "Chokanna Street, near Mayura Hotel (opp. Sai Angels School), Adarsha Nagara, Chikmagalur - 577101",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rock+N+Roll+Rentals+Bikes+For+Rent+Chikmagalur",
    category: "bike",
    websiteUrl: "https://rocknrollrental.com/",
    badge: "Adarsha Nagara",
    vehicles: [
      "Motorcycles",
      "Scooters"
    ],
    highlights: [
      "Chokanna Street, near Mayura Hotel & IG Road",
      "Flexible daily and multi-day rental options"
    ],
    description: "Popular local bike and scooter rental service on Chokanna Street, Adarsha Nagara for coffee estate routes and scenic hill station exploration."
  },
  {
    id: "ridez-chikmagalur",
    name: "Ridez Bike Rental",
    location: "Chikmagalur",
    locationDetail: "Ratnagiri Road, Vijayapura (behind Kailash Parbat)",
    address: "AMS Square, Ratnagiri Road, behind Kailash Parbat Hotel, Vijayapura, Chikmagalur - 577101",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ridez+Bike+Rental+Ratnagiri+Road+Chikmagalur",
    category: "bike",
    websiteUrl: "https://ridezbikes.com/",
    phone: "+919353942371",
    badge: "Ratnagiri Road",
    vehicles: [
      "Scooters",
      "Motorcycles"
    ],
    highlights: [
      "AMS Square, Ratnagiri Road (behind Kailash Parbat)",
      "Self-drive scooters & bikes for hill exploration"
    ],
    description: "Top-rated two-wheeler rental agency located at AMS Square on Ratnagiri Road, Vijayapura. Great starting point for Mullayanagiri & Bababudangiri."
  },

  // 2. Sakleshpur (Self-Drive Two-Wheelers & Cars)
  {
    id: "darshh-rental-sakleshpur",
    name: "Darshh Rental",
    location: "Sakleshpur",
    locationDetail: "Railway Station Road, Lakshmipooram, Sakleshpur",
    address: "Lakshmipooram Badavane, Railway Station Road, Sakleshpur - 573134",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Darshh+Rental+Railway+Station+Road+Sakleshpur",
    category: "both",
    websiteUrl: "https://www.selfdrive.bike/",
    phone: "+917676875595",
    badge: "Railway Station Rd",
    vehicles: [
      "Scooters",
      "Motorcycles",
      "Self-Drive Cars"
    ],
    highlights: [
      "Two-wheelers & self-drive cars on Railway Station Road",
      "Pickup in Sakleshpur town (~25 mins from Milan Farm)"
    ],
    description: "Self-drive rental platform offering two-wheelers and cars on Railway Station Road in Sakleshpur town. Ideal for Bisle Ghat viewpoints and Manjarabad Fort."
  },

  // 3. Local Taxis with Driver (Mudigere & Surrounds)
  {
    id: "vishwanath-car-belagala",
    name: "Vishwanath",
    location: "Mudigere",
    locationDetail: "Mudigere",
    address: "Belagala, Mudigere Taluk, Chikkamagaluru District",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Belagala+Mudigere+Karnataka",
    category: "taxi",
    phone: "+919481672571",
    badge: "Near Milan Farm",
    vehicles: [
      "Local Taxi"
    ],
    highlights: [
      "Mudigere & Chikmagalur routes",
      "Direct phone booking with driver"
    ],
    description: "Local taxi for sightseeing."
  },
  {
    id: "myaddi-isama-car",
    name: "Myaddi Isama",
    location: "Mudigere",
    locationDetail: "Mudigere",
    address: "Mudigere Town, Chikkamagaluru District",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mudigere+Town+Chikkamagaluru",
    category: "taxi",
    phone: "+919880947313",
    badge: "Mudigere Town",
    vehicles: [
      "Local Taxi"
    ],
    highlights: [
      "Mudigere & Chikmagalur routes",
      "Direct phone booking with driver"
    ],
    description: "Local taxi for sightseeing."
  }
];
