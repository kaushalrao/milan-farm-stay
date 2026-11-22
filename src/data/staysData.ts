export interface StayAmenity {
  icon: string;
  label: string;
}

export interface StayProperty {
  id: string;
  name: string;
  titleKey: string;
  bhk: "2bhk" | "4bhk";
  bhkLabel: string;
  category: "cottage" | "farmhouse" | "villa";
  rating?: number;
  badge?: string;
  isGuestFavorite?: boolean;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  location: string;
  descriptionKey: string;
  highlights: string[];
  amenities: StayAmenity[];
  airbnbUrl: string;
  coverImage: string;
  hostPhone: string;
  whatsappMessage: string;
}

export const HOST_PHONE = "9448244666";

export const STAYS_DATA: StayProperty[] = [
  {
    id: "1399674360395465147",
    name: "Grey Hornbill Retreat",
    titleKey: "hornbillTitle",
    bhk: "2bhk",
    bhkLabel: "2 BHK",
    category: "cottage",
    rating: 4.97,
    badge: "Guest Favorite",
    isGuestFavorite: true,
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    location: "Mudigere, Chikmagalur",
    descriptionKey: "hornbillDesc",
    highlights: [
      "Panoramic estate valley & hill views",
      "Serene bird watching & coffee plantation trails",
      "Private cottage with cozy modern rustic interiors",
      "Fresh pure vegetarian South Indian meals available"
    ],
    amenities: [
      { icon: "ph-tree", label: "Coffee Plantation" },
      { icon: "ph-mountain", label: "Mountain & Valley Views" },
      { icon: "ph-bird", label: "Bird Watching" },
      { icon: "ph-wifi-high", label: "High-Speed Wi-Fi" },
      { icon: "ph-shower", label: "2 En-suite Bathrooms" },
      { icon: "ph-car", label: "Free Private Parking" },
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1399674360395465147?adults=1&s=67&unique_share_id=352cc09a-0156-4deb-8259-1f0892bb04be",
    coverImage: "/images/stays/hornbill-1.jpg",
    hostPhone: HOST_PHONE,
    whatsappMessage: "Hi Athula, I'd like to check availability for Milan Farm Stay - Grey Hornbill Retreat (2 BHK).",
  },
  {
    id: "804934854034152061",
    name: "Serene Coffee Plantation Retreat",
    titleKey: "sereneTitle",
    bhk: "2bhk",
    bhkLabel: "2 BHK",
    category: "farmhouse",
    rating: 4.97,
    badge: "Guest Favorite",
    isGuestFavorite: true,
    maxGuests: 7,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    location: "Bilagola, Mudigere",
    descriptionKey: "sereneDesc",
    highlights: [
      "Nestled inside a 3-acre working coffee estate",
      "Traditional antique charm with spacious living areas",
      "Outdoor sit-out surrounded by pepper and silver oaks",
      "Pure vegetarian homely stay for families & couples"
    ],
    amenities: [
      { icon: "ph-tree", label: "3-Acre Coffee Estate" },
      { icon: "ph-plant", label: "Estate Walk Trails" },
      { icon: "ph-armchair", label: "Living Room & Sofa Bed" },
      { icon: "ph-fork-knife", label: "Dining Area & Kitchen" },
      { icon: "ph-wifi-high", label: "Wi-Fi Connected" },
      { icon: "ph-car", label: "Ample Parking Space" },
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/804934854034152061?adults=1&s=67&unique_share_id=cd01e66c-9b6c-428e-b964-c9401a2563f8",
    coverImage: "/images/stays/serene-1.jpg",
    hostPhone: HOST_PHONE,
    whatsappMessage: "Hi Athula, I'd like to check availability for Milan Farm Stay - Serene Coffee Plantation Retreat (2 BHK).",
  },
  {
    id: "1400719731118946743",
    name: "Grand Plantation Estate Villa",
    titleKey: "grandTitle",
    bhk: "4bhk",
    bhkLabel: "4 BHK",
    category: "villa",
    badge: "Spacious Whole Villa",
    isGuestFavorite: false,
    maxGuests: 12,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    location: "Mudigere, Chikmagalur",
    descriptionKey: "grandDesc",
    highlights: [
      "Entire 4 BHK private estate home exclusively for your group",
      "Accommodates up to 12 guests with 4 bedrooms & 4 bathrooms",
      "Vast outdoor veranda, courtyard, and lawn area",
      "Perfect for family reunions, celebrations, and friend getaways"
    ],
    amenities: [
      { icon: "ph-house-line", label: "Exclusive Entire Villa" },
      { icon: "ph-users-three", label: "Groups Up To 12 Guests" },
      { icon: "ph-bed", label: "4 Bedrooms / 5 Beds" },
      { icon: "ph-shower", label: "4 Bathrooms" },
      { icon: "ph-sun", label: "Private Veranda & Lawn" },
      { icon: "ph-tree", label: "Surrounded by Nature" },
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1400719731118946743?adults=1&s=67&unique_share_id=16560c5c-7cfc-4238-a47d-25b73aee7296",
    coverImage: "/images/stays/villa4bhk-1.jpg",
    hostPhone: HOST_PHONE,
    whatsappMessage: "Hi Athula, I'd like to check availability for Milan Farm Stay - Grand Plantation Estate Villa (4 BHK).",
  },
];
