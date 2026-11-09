export interface RentalVendor {
  id: string;
  name: string;
  location: "Sakleshpur" | "Chikmagalur" | "Mudigere";
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
}

export const RENTAL_VENDORS: RentalVendor[] = [
  {
    id: "darshh-rental-sakleshpur",
    name: "Darshh Rental",
    location: "Sakleshpur",
    locationDetail: "Sakleshpur Town & Hassan District (near Bus Stand / Railway Station)",
    category: "both",
    websiteUrl: "https://www.selfdrive.bike/",
    badge: "Sakleshpur Vendor",
    isFeatured: true,
    vehicles: [
      "Scooters (Honda Activa, Dio, etc.)",
      "Motorcycles (Royal Enfield, Himalayan, etc.)",
      "Commuter Bikes",
      "Self-Drive Cars"
    ],
    highlights: [
      "Online booking & availability check on selfdrive.bike",
      "Pickup in Sakleshpur town (~25-30 mins from Milan Farm)",
      "Daily & multi-day rental options",
      "Check rates, deposits & rental policies directly on official website"
    ],
    description: "Online platform offering self-drive two-wheelers and cars in Sakleshpur. Useful for exploring Bisle Ghat viewpoints, Manjarabad Fort, Bettada Byraveshwara temple, and Malnad routes."
  },
  {
    id: "royal-brothers-chikmagalur",
    name: "Royal Brothers",
    location: "Chikmagalur",
    locationDetail: "Chikmagalur Station / Hub",
    category: "bike",
    websiteUrl: "https://www.royalbrothers.com/chikmagalur/bike-rentals",
    badge: "Chikmagalur Platform",
    vehicles: [
      "Scooters",
      "Motorcycles & Cruisers"
    ],
    highlights: [
      "Official website & app booking",
      "Pickup station in Chikmagalur town",
      "Check current fleet, rates & deposit requirements on official site"
    ],
    description: "Self-drive bike and scooter rental platform with a pickup location in Chikmagalur for visiting Mullayanagiri, Bababudangiri, and surrounding areas."
  },
  {
    id: "rock-n-roll-chikmagalur",
    name: "Rock N Roll Bike Rentals",
    location: "Chikmagalur",
    locationDetail: "Indira Gandhi Road, Chikmagalur",
    category: "bike",
    websiteUrl: "https://rocknrollrental.com/",
    badge: "Chikmagalur Vendor",
    vehicles: [
      "Motorcycles",
      "Scooters"
    ],
    highlights: [
      "Located in Chikmagalur town",
      "Two-wheeler rental options",
      "Contact vendor or visit official site for booking and terms"
    ],
    description: "Local bike and scooter rental service based in Chikmagalur town for estate routes and hill station travel."
  },
  {
    id: "ridez-chikmagalur",
    name: "Ridez Bike Rental",
    location: "Chikmagalur",
    locationDetail: "Near KSRTC Bus Stand, Chikmagalur",
    category: "bike",
    websiteUrl: "https://ridezbikes.com/",
    badge: "Chikmagalur Vendor",
    vehicles: [
      "Scooters",
      "Motorcycles"
    ],
    highlights: [
      "Located near Chikmagalur bus stand",
      "Two-wheeler rental options",
      "Inquire directly for rates, terms & requirements"
    ],
    description: "Rental option located near the transit area in Chikmagalur for travelers arriving by bus."
  },
  {
    id: "vishwanath-car-belagala",
    name: "Vishwanath Car Belagala",
    location: "Mudigere",
    locationDetail: "Belagala, Mudigere & Surrounding Coffee Estates",
    category: "taxi",
    phone: "+919481672571",
    badge: "Local Taxi Driver",
    vehicles: [
      "Chauffeur-Driven Private Cab"
    ],
    highlights: [
      "Local driver familiar with Mudigere & coffee estate routes",
      "Pre-book via phone call for sightseeing & transfers",
      "Direct driver contact"
    ],
    description: "Local taxi service based in Belagala near Milan Farm Stay for guests who prefer to travel with a local driver."
  },
  {
    id: "myaddi-isama-car",
    name: "Myaddi Isama Car",
    location: "Mudigere",
    locationDetail: "Mudigere, Sakleshpur & Chikmagalur routes",
    category: "taxi",
    phone: "+919880947313",
    badge: "Local Taxi Driver",
    vehicles: [
      "Chauffeur-Driven Private Cab"
    ],
    highlights: [
      "Sightseeing and station/airport transfers",
      "Pre-book via phone call",
      "Direct driver contact"
    ],
    description: "Local cab provider based near Mudigere available for sightseeing day trips and transfers across the region."
  }
];
