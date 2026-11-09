export type SearchCategory = 
  | "all" 
  | "itinerary" 
  | "food" 
  | "rentals" 
  | "faq" 
  | "actions";

export interface SearchAction {
  type: "anchor" | "route" | "external";
  href: string;
  external?: boolean;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "itinerary" | "food" | "rentals" | "faq" | "actions";
  tags?: string[];
  badge?: string;
  icon?: string;
  action: SearchAction;
  keywords?: string[];
}

