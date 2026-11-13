export interface CoffeePack {
  id: string;
  weightLabel: string;
  weightGrams: number;
  price: number;
  badge?: string;
  isPopular?: boolean;
}

export type CoffeeTypeId = "arabica" | "robusta";
export type PowderTypeId = "filter" | "nice";

export interface CoffeeTypeOption {
  id: CoffeeTypeId;
  name: string;
  ratio: string;
  badge: string;
  desc: string;
  tastingNotes: string[];
}

export interface PowderTypeOption {
  id: PowderTypeId;
  name: string;
  grind: string;
  desc: string;
  idealFor: string;
}

export const HOST_PHONE_NUMBER = "9448244666";

export const COFFEE_TYPES: CoffeeTypeOption[] = [
  {
    id: "arabica",
    name: "Arabica Coffee",
    ratio: "80% Arabica + 20% Chicory",
    badge: "Aromatic & Smooth",
    desc: "Shade-grown Arabica from higher elevation slopes. Fragrant aroma with rich chocolate undertones and silky crema.",
    tastingNotes: ["Dark Chocolate", "Caramel", "Velvety Crema"],
  },
  {
    id: "robusta",
    name: "Robusta Coffee",
    ratio: "80% Robusta + 20% Chicory",
    badge: "Bold & Strong",
    desc: "Sun-cured estate Robusta. Deep roasted cocoa profile, full heavy body, and an intense traditional morning kick.",
    tastingNotes: ["Strong Body", "Roasted Cocoa", "Thick Crema"],
  },
];

export const POWDER_TYPES: PowderTypeOption[] = [
  {
    id: "filter",
    name: "Filter Coffee Powder",
    grind: "Traditional Coarse Grind",
    desc: "Specially calibrated medium-coarse grind for traditional brass & stainless steel South Indian drip filters and French press.",
    idealFor: "Traditional Drip Filter",
  },
  {
    id: "nice",
    name: "Nice Powder",
    grind: "Extra-Fine Grind",
    desc: "Silky fine grind calibrated for direct stovetop boiling, instant-style decoction, and espresso / moka pots.",
    idealFor: "Boiled Coffee / Fine Decoction",
  },
];

export const COFFEE_BLEND = {
  name: "Authentic Malnad Estate Blend",
  ratio: "80% Arabica + 20% Chicory",
  roastLevel: "Medium-Dark Roast",
  process: "Sun-dried & Slow Roasted",
  origin: "Milan Coffee Plantation, Western Ghats",
  tastingNotes: ["Dark Chocolate", "Caramelized Brown Sugar", "Roasted Nuts", "Rich Crema"],
};

export const COFFEE_PACKS: CoffeePack[] = [
  {
    id: "250g",
    weightLabel: "250g",
    weightGrams: 250,
    price: 200,
    badge: "Trial Pack",
  },
  {
    id: "500g",
    weightLabel: "500g",
    weightGrams: 500,
    price: 400,
    badge: "Most Popular",
    isPopular: true,
  },
  {
    id: "1kg",
    weightLabel: "1 kg",
    weightGrams: 1000,
    price: 700,
    badge: "Best Value",
  },
];
