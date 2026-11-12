export interface CoffeePack {
  id: string;
  weightLabel: string;
  weightGrams: number;
  price: number;
  badge?: string;
  isPopular?: boolean;
}

export const HOST_PHONE_NUMBER = "9448244666";

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

