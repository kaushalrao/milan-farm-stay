"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { SearchItem, SearchCategory } from "@/types/search";
import { RENTAL_VENDORS } from "@/data/rentals";
import { MENU_DATA } from "@/data/foodMenu";

interface RawTripOption {
  id: string;
  destination: string;
  metadata?: string;
  highlights?: string;
  tags?: string[];
}

interface RawStop {
  title: string;
  category?: string;
  desc?: string;
  tips?: string;
  drivingTime?: string;
  duration?: string;
  bestTime?: string;
  mapsUrl?: string;
}

interface RawRestaurant {
  title: string;
  category?: string;
  desc?: string;
  tags?: string[];
  mapsUrl?: string;
}

export function useSearchIndex() {
  const tData = useTranslations("Data");
  const tPage = useTranslations("Page");
  const tSearch = useTranslations("Search");

  const searchItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Trip Options / Days (Day 1 to 5)
    try {
      const tripOptions = (tData.raw("tripOptions") as RawTripOption[]) || [];
      tripOptions.forEach((trip) => {
        items.push({
          id: `trip-${trip.id}`,
          title: `Day ${trip.id}: ${trip.destination}`,
          description: `${trip.metadata || ""} • ${trip.highlights || ""}`,
          category: "itinerary",
          badge: `Day ${trip.id}`,
          tags: trip.tags || ["Itinerary", "Road Trip"],
          icon: "ph-map-trifold",
          action: {
            type: "anchor",
            href: `/?day=${trip.id}#plan`,
          },
          keywords: [trip.destination, "day", `day ${trip.id}`, "ದಿನ", ...(trip.tags || [])],
        });
      });
    } catch (e) {
      console.warn("Failed to index tripOptions", e);
    }

    // 2. Itinerary Stops across all days
    const stopLists: { dayId: string; stops: RawStop[] }[] = [
      { dayId: "1", stops: (tData.raw("roadTripStops") as RawStop[]) || [] },
      { dayId: "2", stops: (tData.raw("day2Stops") as RawStop[]) || [] },
      { dayId: "3", stops: (tData.raw("day3Stops") as RawStop[]) || [] },
      { dayId: "4", stops: (tData.raw("day4Stops") as RawStop[]) || [] },
      { dayId: "5", stops: (tData.raw("day5Stops") as RawStop[]) || [] },
    ];

    stopLists.forEach(({ dayId, stops }) => {
      if (Array.isArray(stops)) {
        stops.forEach((stop, idx) => {
          if (!stop?.title) return;
          const tags = [stop.category, stop.drivingTime, stop.duration].filter((t): t is string => Boolean(t));
          const stopSlug = stop.title ? `stop-${stop.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : `stop-${idx}`;
          const lowerStopTitle = stop.title.toLowerCase();

          // Build stop-specific keywords to ensure search precision
          const specificKeywords: string[] = [
            stop.title,
            stop.category || "",
            `day ${dayId}`,
          ];

          if (lowerStopTitle.includes("mullayanagiri")) specificKeywords.push("ಮುಳ್ಳಯ್ಯನಗಿರಿ", "mullayanagiri peak");
          if (lowerStopTitle.includes("devaramane")) specificKeywords.push("ದೇವರಮನೆ", "devaramane viewpoint", "devaramane betta");
          if (lowerStopTitle.includes("jhari")) specificKeywords.push("ಜಹಾರಿ", "ಝರಿ", "jhari falls", "buttermilk falls");
          if (lowerStopTitle.includes("bababudan")) specificKeywords.push("ಬಾಬಾಬುಡನ್", "bababudangiri", "dattatreya peetha");
          if (lowerStopTitle.includes("halebidu") || lowerStopTitle.includes("hoysaleswara")) specificKeywords.push("ಹಳೇಬೀಡು", "ಹೊಯ್ಸಳೇಶ್ವರ", "halebidu temple");
          if (lowerStopTitle.includes("belur") || lowerStopTitle.includes("chennakeshava")) specificKeywords.push("ಬೇಲೂರು", "ಚೆನ್ನಕೇಶವ", "belur temple");
          if (lowerStopTitle.includes("charmadi")) specificKeywords.push("ಚಾರ್ಮಾಡಿ", "charmadi ghat");
          if (lowerStopTitle.includes("kalasa") || lowerStopTitle.includes("horanadu")) specificKeywords.push("ಕಳಸ", "ಹೊರನಾಡು");
          if (lowerStopTitle.includes("ettina bhuja")) specificKeywords.push("ಎತ್ತಿನ ಭುಜ", "byraveshwara");
          if (lowerStopTitle.includes("netravati")) specificKeywords.push("ನೇತ್ರಾವತಿ", "netravati trek");
          if (lowerStopTitle.includes("bandaje")) specificKeywords.push("ಬಂಡಾಜೆ", "bandaje arbi falls");
          if (lowerStopTitle.includes("yagachi")) specificKeywords.push("ಯಾಗಚಿ", "yagachi dam", "water sports");
          if (lowerStopTitle.includes("doddagaddavalli")) specificKeywords.push("ದೊಡ್ಡಗದ್ದವಳ್ಳಿ", "lakshmi temple");
          if (lowerStopTitle.includes("kelagur")) specificKeywords.push("ಕೆಳಗೂರು", "tea estate");

          items.push({
            id: `stop-day${dayId}-${idx}`,
            title: stop.title,
            description: `${stop.desc || ""} ${stop.tips ? `• ${stop.tips}` : ""}`,
            category: "itinerary",
            badge: `Day ${dayId} • ${stop.category || tSearch("badgeSightseeing")}`,
            tags,
            icon: "ph-map-pin",
            action: {
              type: "anchor",
              href: `/?day=${dayId}#${stopSlug}`,
            },
            keywords: specificKeywords.filter(Boolean),
          });
        });
      }
    });

    // 3. Restaurants & Highway Food Stops
    const restaurantLists: { dayId: string; list: RawRestaurant[] }[] = [
      { dayId: "1", list: (tData.raw("day1Restaurants") as RawRestaurant[]) || [] },
      { dayId: "2", list: (tData.raw("day2Restaurants") as RawRestaurant[]) || [] },
    ];

    restaurantLists.forEach(({ dayId, list }) => {
      if (Array.isArray(list)) {
        list.forEach((resto, idx) => {
          if (!resto?.title) return;
          items.push({
            id: `resto-day${dayId}-${idx}`,
            title: resto.title,
            description: resto.desc || "Recommended dining & refreshment stop along the route.",
            category: "food",
            badge: resto.category || tSearch("badgeFood"),
            tags: resto.tags || ["Food", "Dining"],
            icon: "ph-fork-knife",
            action: resto.mapsUrl
              ? { type: "external", href: resto.mapsUrl, external: true }
              : { type: "anchor", href: `/?day=${dayId}#plan` },
            keywords: [
              resto.title,
              resto.category || "",
              "restaurant",
              "food",
              "lunch",
              "breakfast",
              "highway food",
              "ಆಹಾರ",
              "ಊಟ",
              "ತಿಂಡಿ",
            ],
          });
        });
      }
    });

    // 4. Prasad Home Made Food Menu Items
    Object.entries(MENU_DATA).forEach(([catName, menuItems]) => {
      menuItems.forEach((food, idx) => {
        const foodSlug = `food-${food.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        items.push({
          id: `menu-${catName.toLowerCase()}-${idx}`,
          title: food.name,
          description: food.description
            ? `${food.description} • Serves ${food.serves}`
            : `Serves ${food.serves} • Freshly prepared vegetarian food`,
          category: "food",
          badge: `₹${food.price} • ${catName}`,
          tags: [catName, "Prasad Food", "Pure Veg"],
          icon: "ph-cooking-pot",
          action: {
            type: "route",
            href: `/order-food#${foodSlug}`,
          },
          keywords: [
            food.name,
            catName,
            "veg",
            "order food",
            "prasad",
            "dinner",
            "lunch",
            "meal",
            "food menu",
            "food",
            "ಆಹಾರ ಮೆನು",
            "ಆಹಾರ",
            "ಊಟ",
            "ತಿಂಡಿ",
            "ಆರ್ಡರ್",
            "ഭക്ഷണം",
            "உணவு",
            "ఆహారం",
          ],
        });
      });
    });

    // 5. Rentals & Travel Vendors
    RENTAL_VENDORS.forEach((vendor) => {
      items.push({
        id: `vendor-${vendor.id}`,
        title: `${vendor.name} (${vendor.location})`,
        description: `${vendor.description} Fleet: ${vendor.vehicles.join(", ")}`,
        category: "rentals",
        badge: vendor.badge || tSearch("badgeRentals"),
        tags: [vendor.category, vendor.location, ...vendor.vehicles],
        icon:
          vendor.category === "taxi"
            ? "ph-taxi"
            : vendor.category === "car"
            ? "ph-car"
            : "ph-moped",
        action: {
          type: "route",
          href: `/rentals#${vendor.id}`,
        },
        keywords: [
          vendor.name,
          vendor.location,
          vendor.locationDetail,
          vendor.address || "",
          vendor.category,
          vendor.category === "taxi" ? "taxi" : "self drive",
          vendor.category === "taxi" ? "cab" : "bike rental",
          vendor.category === "taxi" ? "driver" : "scooter rental",
          "ratnagiri road",
          "vijayapura",
          "car rental",
          "self drive",
          "activa",
          "royal enfield",
          "rentals",
          "rental",
          "taxi",
          "ಟ್ಯಾಕ್ಸಿ",
          "ಡ್ರೈವರ್",
          "ಬಾಡಿಗೆ",
          "ಸ್ಕೂಟರ್",
          "ಬೈಕ್",
          "ಕಾರು",
          "అద్దె",
          "వాடகை",
          "വാടക",
          ...vendor.vehicles,
        ],
      });
    });

    // 6. Hosts & Contacts
    try {
      items.push({
        id: "host-athula",
        title: `${tPage("host1Name")} (${tPage("host1Role")})`,
        description: `${tPage("host1Desc")} • Phone: +91 9448244666`,
        category: "actions",
        badge: tSearch("badgeQuickAction"),
        tags: ["Host", "Contact"],
        icon: "ph-user",
        action: {
          type: "anchor",
          href: "/#host-athula",
        },
        keywords: ["athula", "host", "call host", "contact", "emergency", "manager", "ಅತುಲ", "ಹೋಸ್ಟ್"],
      });

      items.push({
        id: "host-kaushal",
        title: `${tPage("host2Name")} (${tPage("host2Role")})`,
        description: `${tPage("host2Desc")} • Phone: +91 9448632666`,
        category: "actions",
        badge: tSearch("badgeQuickAction"),
        tags: ["Host", "Contact"],
        icon: "ph-user",
        action: {
          type: "anchor",
          href: "/#host-kaushal",
        },
        keywords: ["kaushal", "host", "call host", "contact", "emergency", "ಕೌಶಲ್", "ಹೋಸ್ಟ್"],
      });
    } catch (e) {
      console.warn("Failed to index hosts", e);
    }

    // 9. Quick Actions & Navigation
    items.push({
      id: "action-order-food",
      title: tSearch("actionOrderFood"),
      description: tSearch("actionOrderFoodDesc"),
      category: "actions",
      badge: tSearch("badgeQuickAction"),
      tags: ["Food", "Order", "Delivery"],
      icon: "ph-shopping-bag",
      action: {
        type: "route",
        href: "/order-food",
      },
      keywords: [
        "order food",
        "food order",
        "dinner",
        "lunch",
        "delivery",
        "prasad",
        "ಆಹಾರ ಆರ್ಡರ್",
        "ಆಹಾರ",
        "ಊಟ",
        "ತಿಂಡಿ",
      ],
    });

    items.push({
      id: "action-rentals",
      title: tSearch("actionRentals"),
      description: tSearch("actionRentalsDesc"),
      category: "actions",
      badge: tSearch("badgeQuickAction"),
      tags: ["Rentals", "Bikes", "Cars"],
      icon: "ph-moped",
      action: {
        type: "route",
        href: "/rentals",
      },
      keywords: [
        "rentals",
        "rent bike",
        "rent scooter",
        "rent car",
        "self drive",
        "vehicles",
        "ಬಾಡಿಗೆ",
        "ಬೈಕ್",
        "ಸ್ಕೂಟರ್",
        "ಕಾರು",
      ],
    });

    items.push({
      id: "action-whatsapp",
      title: tSearch("actionWhatsapp"),
      description: tSearch("actionWhatsappDesc"),
      category: "actions",
      badge: "WhatsApp",
      tags: ["WhatsApp", "Chat"],
      icon: "ph-whatsapp-logo",
      action: {
        type: "external",
        href: "https://wa.me/919448244666",
        external: true,
      },
      keywords: ["whatsapp", "chat", "message host", "help", "campfire", "ವಾಟ್ಸಾಪ್", "ಸಹಾಯ"],
    });

    items.push({
      id: "action-maps",
      title: tSearch("actionDirections"),
      description: tSearch("actionDirectionsDesc"),
      category: "actions",
      badge: "Google Maps",
      tags: ["Location", "Navigation", "Directions"],
      icon: "ph-navigation-arrow",
      action: {
        type: "external",
        href: "https://maps.app.goo.gl/27tXcbhyWdxo7We8A",
        external: true,
      },
      keywords: [
        "directions",
        "location",
        "maps",
        "google maps",
        "route",
        "how to reach",
        "gps",
        "ದಾರಿ",
        "ಸ್ಥಳ",
        "ಮ್ಯಾಪ್ಸ್",
      ],
    });

    items.push({
      id: "action-taxi",
      title: tSearch("actionTaxi"),
      description: tSearch("actionTaxiDesc"),
      category: "actions",
      badge: tSearch("badgeRentals"),
      tags: ["Taxi", "Cab", "Driver"],
      icon: "ph-taxi",
      action: {
        type: "route",
        href: "/rentals",
      },
      keywords: ["taxi", "cab", "driver", "transport", "ಟ್ಯಾಕ್ಸಿ", "ಕ್ಯಾಬ್", "ಚಾಲಕ"],
    });

    return items;
  }, [tData, tPage, tSearch]);

  // Search function that scores and sorts results dynamically with high precision
  const search = (query: string, category: SearchCategory = "all"): SearchItem[] => {
    const trimmed = query.trim().toLowerCase();
    
    // Filter by category first if specified
    const pool = category === "all" ? searchItems : searchItems.filter((i) => i.category === category);

    if (!trimmed) {
      return pool;
    }

    const words = trimmed.split(/\s+/).filter((w) => w.length > 0);

    const scored = pool
      .map((item) => {
        let score = 0;
        const lowerTitle = item.title.toLowerCase();
        const lowerDesc = item.description.toLowerCase();
        const lowerBadge = (item.badge || "").toLowerCase();
        const keywords = (item.keywords || []).map((k) => k.toLowerCase());
        const tags = (item.tags || []).map((t) => t.toLowerCase());

        // 1. Exact full query matches on title (highest relevance)
        if (lowerTitle === trimmed) score += 200;
        else if (lowerTitle.startsWith(trimmed)) score += 120;
        else if (lowerTitle.includes(trimmed)) score += 80;

        // 2. Keyword exact & prefix matching
        if (keywords.some((k) => k === trimmed)) score += 100;
        else if (keywords.some((k) => k.startsWith(trimmed))) score += 60;
        else if (keywords.some((k) => k.includes(trimmed))) score += 40;

        // 3. Tag matching
        if (tags.some((t) => t === trimmed)) score += 50;
        else if (tags.some((t) => t.includes(trimmed))) score += 30;

        // 4. Word-by-word matching
        let matchedWordsCount = 0;
        words.forEach((w) => {
          let wordMatched = false;
          // Match word in title
          if (lowerTitle.includes(w)) {
            score += 35;
            wordMatched = true;
          }
          // Match word in keywords
          if (keywords.some((k) => k.includes(w))) {
            score += 20;
            wordMatched = true;
          }
          // Match word in badge (e.g. Day 1, Food)
          if (lowerBadge.includes(w)) {
            score += 15;
            wordMatched = true;
          }
          // Match word in description ONLY if word has length >= 3 to avoid noise from short common words
          if (w.length >= 3 && lowerDesc.includes(w)) {
            score += 10;
            wordMatched = true;
          }
          if (wordMatched) matchedWordsCount++;
        });

        // For multi-word queries, penalize items that don't match all words
        if (words.length > 1 && matchedWordsCount < words.length && !lowerTitle.includes(trimmed)) {
          score = Math.floor(score * 0.5);
        }

        // For short queries (< 3 chars), require at least a title, tag or keyword match
        if (trimmed.length < 3) {
          const hasTitleOrKeywordMatch = 
            lowerTitle.includes(trimmed) || 
            keywords.some((k) => k.startsWith(trimmed)) ||
            tags.some((t) => t.startsWith(trimmed));
          if (!hasTitleOrKeywordMatch) {
            score = 0;
          }
        }

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);

    return scored;
  };

  return { searchItems, search };
}
