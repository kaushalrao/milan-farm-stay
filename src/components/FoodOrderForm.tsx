"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, Calendar, ShoppingBag, Send, Leaf, ArrowLeft, Info, Search, Users, ChevronUp, ChevronDown, User, Sun, Moon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations, useLocale } from "next-intl";

type MenuItem = {
  name: string;
  description?: string;
  price: number;
  serves: number;
  minOrder?: number;
};

type MenuCategory = {
  [category: string]: MenuItem[];
};

const MENU_DATA: MenuCategory = {
  "Starters": [
    { "name": "Gobi Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Mushroom Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Baby Corn Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Paneer Manchurian", "description": "Available in Chilli or Pepper style", "price": 250, "serves": 2 }
  ],
  "Main Course": [
    { "name": "South Indian Meals", "description": "Includes Rice roti, Rice, Veg stir-fry, Payasam, Sambar, Chutney, Salad & Pickle", "price": 200, "serves": 1, "minOrder": 3 },
    { "name": "Chapathi", "description": "Soft whole wheat flatbread", "price": 30, "serves": 1 },
    { "name": "Mushroom Masala", "description": "Rich tomato-onion gravy with fresh mushrooms", "price": 200, "serves": 2 },
    { "name": "Paneer Masala", "description": "Cottage cheese in a creamy, spiced tomato gravy", "price": 250, "serves": 2 },
    { "name": "Veg Kurma", "description": "Mixed vegetables in a coconut-based curry", "price": 180, "serves": 2 },
    { "name": "Palak Paneer", "description": "Cottage cheese cubes in a smooth spinach gravy", "price": 250, "serves": 2 },
    { "name": "Dal Fry", "description": "Tempered yellow lentils with aromatic spices", "price": 150, "serves": 2 },
    { "name": "Aloo Gobi Masala", "description": "Potato and cauliflower cooked with Indian spices", "price": 150, "serves": 2 }
  ],
  "Rice Items": [
    { "name": "White Rice", "description": "Steamed sona masuri rice", "price": 100, "serves": 2 },
    { "name": "Tomato Rice", "description": "Tangy and spicy rice cooked with tomatoes", "price": 100, "serves": 2 },
    { "name": "Curd Rice", "description": "Cooling yogurt rice tempered with mustard and curry leaves", "price": 100, "serves": 2 },
    { "name": "Jeera Rice", "description": "Rice flavored with cumin seeds", "price": 100, "serves": 2 },
    { "name": "Lemon Rice", "description": "Zesty rice flavored with lemon and peanuts", "price": 100, "serves": 2 }
  ],
  "Noodles": [
    { "name": "Veg Noodles", "description": "Stir-fried noodles with crunchy vegetables", "price": 150, "serves": 2 }
  ]
};

const CATEGORIES = Object.keys(MENU_DATA);
const VENDOR_PHONE_NUMBER = "919482214882";

export default function FoodOrderForm() {
  const [date, setDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Set default date to today to avoid native placeholder quirks
  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);
  const [meal, setMeal] = useState<"Lunch" | "Dinner" | "">("Dinner");
  const [cart, setCart] = useState<{ [itemName: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("FoodOrderForm");

  // Initialize with empty state to prevent hydration mismatch
  const [customerName, setCustomerName] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("mfs_customerName");
      const savedMeal = localStorage.getItem("mfs_meal");
      const savedInstructions = localStorage.getItem("mfs_instructions");

      if (savedName) setCustomerName(savedName);
      if (savedMeal === "Lunch" || savedMeal === "Dinner") setMeal(savedMeal as "Lunch" | "Dinner");
      if (savedInstructions) setSpecialInstructions(savedInstructions);
    }
  }, []);

  // Save to local storage when values change
  useEffect(() => {
    localStorage.setItem("mfs_customerName", customerName);
  }, [customerName]);

  useEffect(() => {
    localStorage.setItem("mfs_meal", meal);
  }, [meal]);

  useEffect(() => {
    localStorage.setItem("mfs_instructions", specialInstructions);
  }, [specialInstructions]);

  // Refs for scrollspy
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      // Don't scrollspy if searching, as layout jumps
      if (searchQuery) return;

      let currentActive = CATEGORIES[0];
      let minDistance = Infinity;

      CATEGORIES.forEach((category) => {
        const element = sectionRefs.current[category];
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 150);

          if (rect.top <= 200 && distance < minDistance) {
            minDistance = distance;
            currentActive = category;
          }
        }
      });
      setActiveCategory(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchQuery]);

  const scrollToCategory = (category: string) => {
    setSearchQuery(""); // Clear search when clicking category
    setTimeout(() => {
      const element = sectionRefs.current[category];
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  const handleIncrement = (itemName: string) => {
    setCart((prev) => {
      const current = prev[itemName] || 0;
      let next = current + 1;
      
      if (itemName === "South Indian Meals" && current === 0) {
        next = 3;
      }

      return {
        ...prev,
        [itemName]: next,
      };
    });
    triggerCartAnimation();
  };

  const handleDecrement = (itemName: string) => {
    setCart((prev) => {
      const current = prev[itemName] || 0;
      let next = current - 1;

      if (itemName === "South Indian Meals" && current <= 3) {
        next = 0;
      }

      if (next <= 0) {
        const newCart = { ...prev };
        delete newCart[itemName];
        return newCart;
      }
      
      return {
        ...prev,
        [itemName]: next,
      };
    });
  };

  const triggerCartAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getItemQuantity = (itemName: string) => cart[itemName] || 0;

  const allItems = Object.values(MENU_DATA).flat();
  const getPrice = (name: string) => allItems.find(item => item.name === name)?.price || 0;

  const subTotal = Object.entries(cart).reduce((sum, [name, qty]) => sum + (getPrice(name) * qty), 0);
  const deliveryFee = (subTotal > 0 && subTotal < 600) ? 100 : 0;
  const totalAmount = subTotal + deliveryFee;
  const isOrderValid = customerName.trim() !== "" && date !== "" && meal !== "" && Object.keys(cart).length > 0;

  const getCheckoutButtonText = () => {
    if (!customerName.trim()) return t("enterYourName");
    if (!date) return t("selectDate");
    if (!meal) return t("selectMealType");
    if (Object.keys(cart).length === 0) return t("addItemsToCart");
    return t("orderViaWhatsApp");
  };

  const handleCheckoutClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsConfirmModalOpen(false);
    let message = `*New Food Order - Milan Farm Stay*\n`;
    message += `Name: ${customerName.trim()}\n`;
    message += `Date: ${date}\n`;
    message += `Meal: ${meal}\n\n`;
    message += `*Items:*\n`;

    Object.entries(cart).forEach(([itemName, qty]) => {
      const itemTotal = getPrice(itemName) * qty;
      message += `\n${qty}x ${itemName} (₹${itemTotal})`;
    });

    if (deliveryFee > 0) {
      message += `\n\n*Subtotal: ₹${subTotal}*`;
      message += `\n*Delivery Fee: ₹${deliveryFee}*`;
    }

    message += `\n\n*Total Payable: ₹${totalAmount}*`;

    if (specialInstructions.trim()) {
      message += `\n\n*Special Instructions:*\n${specialInstructions.trim()}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${VENDOR_PHONE_NUMBER}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto w-full relative">
        {/* Fixed Top Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-cream/90 dark:bg-[#121212]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="p-2 -ml-2 mr-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-text-main" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-forest-green/10 flex items-center justify-center border border-forest-green/20 shrink-0">
                  <Leaf className="w-4 h-4 text-forest-green" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-black text-forest-green leading-tight truncate">{t("title")}</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <select
                value={locale}
                onChange={(e) => {
                  document.cookie = `NEXT_LOCALE=${e.target.value}; path=/; max-age=31536000`;
                  window.location.reload();
                }}
                className="bg-transparent text-text-main font-medium border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-forest-green/50 text-[11px] md:text-xs cursor-pointer transition-colors"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="ml">മലയാളം</option>
              </select>
            </div>
          </div>
        </div>

        {/* Streamlined Hero Header */}
        <header className="pt-28 pb-8 px-6 text-center relative">
          <div className="inline-flex items-center justify-center p-3 bg-forest-green/10 text-forest-green rounded-full mb-4 shadow-sm border border-forest-green/20">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-green mb-3">{t("title")}</h1>
          <p className="text-text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
            Fresh, organic vegetarian meals are prepared and delivered by an independent local caterer, <span className="text-airbnb-coral font-bold px-1">Prasad Home Made Food</span>.
          </p>
        </header>

        {/* Elegant Scheduling Form */}
        <div className="px-4 md:px-6 mb-8 mt-2">
          <div className="bg-white/80 dark:bg-[#222]/80 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 dark:border-white/5 flex flex-col gap-4">
            
            <div className="flex items-center gap-2 mb-1 text-xs md:text-sm text-text-muted font-medium">
              <Info className="w-4 h-4 text-forest-green shrink-0" />
              <span>{t("mandatoryNote")}</span>
            </div>

            {/* Name Input */}
            <div className="w-full flex items-center bg-[#F8F9F8] dark:bg-[#1A1A1A] rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-forest-green/30 focus-within:ring-2 focus-within:ring-forest-green/10 transition-all">
              <User className="w-5 h-5 text-forest-green/70 mr-3 shrink-0" />
              <input
                type="text"
                placeholder={t("yourNamePlaceholder")}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-transparent border-none outline-none text-text-main w-full text-base font-semibold placeholder:text-text-muted/50"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Date Pill */}
              <div
                onClick={() => {
                  try {
                    if (dateInputRef.current && 'showPicker' in HTMLInputElement.prototype) {
                      dateInputRef.current.showPicker();
                    } else {
                      dateInputRef.current?.focus();
                    }
                  } catch (e) {
                    dateInputRef.current?.focus();
                  }
                }}
                className="flex-1 w-full flex items-center justify-between bg-[#F8F9F8] dark:bg-[#1A1A1A] rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5 relative cursor-pointer hover:border-black/10 dark:hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-forest-green/70 shrink-0" />
                  <span className="text-sm font-semibold text-text-main shrink-0">{t("dateLabel")}</span>
                </div>

                <div className="relative flex items-center justify-end flex-1 ml-2">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-base font-semibold cursor-pointer text-text-main"
                    min={new Date().toISOString().split("T")[0]}
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        if ('showPicker' in HTMLInputElement.prototype) {
                          e.currentTarget.showPicker();
                        }
                      } catch (err) { }
                    }}
                  />
                </div>
              </div>

              {/* Meal Type Pill Toggle */}
              <div className="flex-1 w-full bg-[#F8F9F8] dark:bg-[#1A1A1A] rounded-2xl p-1.5 flex relative border border-black/5 dark:border-white/5">
                <div className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-white dark:bg-[#2A2A2A] rounded-xl shadow-sm transition-transform duration-300 ease-in-out"
                  style={{ transform: meal === "Dinner" ? "translateX(100%)" : "translateX(0)" }}
                />
                <button
                  onClick={() => setMeal("Lunch")}
                  className={`flex-1 relative z-10 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${meal === "Lunch" ? "text-forest-green" : "text-text-muted hover:text-text-main"}`}
                >
                  <Sun className="w-4 h-4" />
                  {t("lunch")}
                </button>
                <button
                  onClick={() => setMeal("Dinner")}
                  className={`flex-1 relative z-10 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${meal === "Dinner" ? "text-forest-green" : "text-text-muted hover:text-text-main"}`}
                >
                  <Moon className="w-4 h-4" />
                  {t("dinner")}
                </button>
              </div>
            </div>
            
            {/* Advance Notice Note */}
            <div className="mt-2 flex items-start gap-2.5 text-xs md:text-sm font-medium text-text-muted">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-forest-green/70" />
              <p>{t("advanceNotice")}</p>
            </div>
          </div>
        </div>

        {/* Sticky Search & Category Navigation */}
        <div className="sticky top-[60px] z-40 bg-[#FCFBF8]/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-sm pt-3 pb-2 px-4 md:px-6 w-full">
          {/* Search Bar */}
          <div className="mb-2">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-forest-green transition-colors" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#2A2A2A] rounded-xl py-2.5 pl-10 pr-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-black/5 dark:border-white/5 focus:outline-none focus:border-forest-green/50 focus:ring-1 focus:ring-forest-green/20 transition-all text-text-main font-medium text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${activeCategory === category
                    ? "bg-forest-green text-white shadow-md"
                    : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-forest-green hover:bg-forest-green/10"
                  }`}
              >
                {category}
              </button>
            ))}
            <div className="w-2 shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 md:px-6 pt-6 space-y-10 pb-24">
          {Object.entries(MENU_DATA).map(([category, items]) => {
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
            if (filteredItems.length === 0) return null;

            return (
              <div
                key={category}
                id={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                className="scroll-mt-36"
              >
                <h3 className="text-2xl font-serif font-bold text-text-main mb-5 pl-2">{category}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {filteredItems.map((item) => {
                    const qty = getItemQuantity(item.name);
                    const isActive = qty > 0;

                    return (
                      <div key={item.name} className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 rounded-3xl transition-all duration-300 ${isActive
                          ? "bg-white dark:bg-[#222] border-forest-green/30 shadow-lg ring-1 ring-forest-green/20 transform scale-[1.02] z-10 relative"
                          : "bg-white/60 dark:bg-[#222]/60 border-black/5 dark:border-white/5 hover:border-black/10 hover:bg-white dark:hover:bg-[#2A2A2A] hover:shadow-md"
                        } border backdrop-blur-sm`}>

                        {/* Details */}
                        <div className="flex-1 flex flex-col py-1">
                          <h4 className="font-bold text-text-main text-lg md:text-xl leading-tight mb-1.5">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-text-muted/90 mb-3 md:mb-4 line-clamp-2 leading-relaxed pr-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 mt-auto">
                            <span className="font-black text-forest-green text-lg">₹{item.price}</span>
                            <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 hidden sm:block"></div>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-text-muted bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                              <Users className="w-3.5 h-3.5" /> Serves {item.serves}
                            </span>
                            {item.minOrder && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 hidden sm:block"></div>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] dark:text-[#FBBF24] bg-[#D97706]/10 dark:bg-[#FBBF24]/10 px-2.5 py-1 rounded-lg">
                                  <Info className="w-3.5 h-3.5" /> Min order: {item.minOrder}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="sm:self-center self-start mt-2 sm:mt-0">
                          <div className={`flex items-center rounded-2xl p-1 transition-all duration-300 border shadow-sm ${isActive
                              ? "bg-forest-green text-white border-forest-green"
                              : "bg-cream dark:bg-[#1f1f1f] text-text-muted border-black/10 dark:border-white/10"
                            }`}>
                            <button
                              onClick={() => handleDecrement(item.name)}
                              disabled={qty === 0}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "hover:bg-black/20" : "hover:bg-black/5 dark:hover:bg-white/5 opacity-50 cursor-not-allowed"
                                }`}
                            >
                              <Minus className="w-5 h-5" />
                            </button>

                            <span className={`w-8 text-center font-bold text-base ${isActive ? "text-white" : "text-text-main"}`}>
                              {qty}
                            </span>

                            <button
                              onClick={() => handleIncrement(item.name)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "hover:bg-black/20" : "hover:bg-black/5 dark:hover:bg-white/5 text-text-main"
                                }`}
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {Object.values(MENU_DATA).flat().filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium text-lg">No items found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-forest-green font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Checkout Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-4 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <div className={`bg-white/95 dark:bg-[#1C1C1C]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 p-4 rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col ${isCartOpen && Object.keys(cart).length > 0 ? 'gap-4 max-h-[70vh]' : 'gap-0'}`}>

            {/* Expanded Content */}
            <div className={`overflow-hidden transition-all duration-300 ${isCartOpen && Object.keys(cart).length > 0 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-2 pb-4 border-b border-black/10 dark:border-white/10 px-2">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-text-main text-lg">Your Order</h4>
                  <button onClick={() => setIsCartOpen(false)} className="text-text-muted hover:text-text-main p-1.5 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-5 max-h-[25vh] overflow-y-auto pr-2 no-scrollbar">
                  {Object.entries(cart).map(([name, qty]) => (
                    <div key={name} className="flex justify-between items-start text-sm">
                      <span className="font-medium text-text-main leading-tight pr-4">
                        <span className="text-forest-green font-bold bg-forest-green/10 px-1.5 py-0.5 rounded mr-2">{qty}x</span>
                        {name}
                      </span>
                      <span className="text-text-muted font-bold whitespace-nowrap mt-0.5">₹{getPrice(name) * qty}</span>
                    </div>
                  ))}
                  {deliveryFee > 0 && (
                    <div className="flex justify-between items-start text-sm pt-2 border-t border-black/5 dark:border-white/5 mt-2">
                      <span className="font-medium text-text-main leading-tight pr-4">Delivery Fee</span>
                      <span className="text-text-muted font-bold whitespace-nowrap mt-0.5">₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-text-muted mt-3 mb-1 bg-forest-green/5 p-2 rounded-lg flex items-start gap-2 border border-forest-green/10">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-forest-green" />
                    <span>A delivery fee of ₹100 is applicable for orders below ₹600.</span>
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="instructions" className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted mb-2.5 uppercase tracking-wider">
                    <Info className="w-3 h-3" /> Special Instructions
                  </label>
                  <textarea
                    id="instructions"
                    rows={2}
                    placeholder="e.g., No onion/garlic, less spicy..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-cream dark:bg-[#2A2A2A] rounded-2xl p-3.5 text-sm border border-black/5 dark:border-white/5 focus:outline-none focus:border-forest-green/30 focus:ring-2 focus:ring-forest-green/10 resize-none text-text-main placeholder:text-text-muted/50 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar (Always visible) */}
            <div className={`flex items-center justify-between gap-4 ${isCartOpen && Object.keys(cart).length > 0 ? 'pt-2' : ''}`}>
              <div
                className={`pl-2 transition-opacity ${Object.keys(cart).length > 0 ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => {
                  if (Object.keys(cart).length > 0) setIsCartOpen(!isCartOpen);
                }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Total</p>
                  {Object.keys(cart).length > 0 && (
                    <div className="bg-black/5 dark:bg-white/5 rounded-full p-0.5 text-text-muted animate-bounce-subtle">
                      {isCartOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-black text-forest-green">₹{totalAmount}</p>
              </div>

              <button
                onClick={handleCheckoutClick}
                disabled={!isOrderValid}
                className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg ${isOrderValid
                    ? `bg-[#25D366] hover:bg-[#128C7E] text-white hover:-translate-y-1 hover:shadow-[#25D366]/40 ${isAnimating ? 'scale-105' : 'scale-100'}`
                    : "bg-gray-200 dark:bg-[#2A2A2A] text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                  }`}
              >
                <Send className="w-5 h-5" />
                <span>{getCheckoutButtonText()}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto touch-auto"
          style={{ zIndex: 9999 }}
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1C1C1C] rounded-3xl p-5 md:p-6 w-full max-w-md shadow-2xl transform transition-all relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-black text-forest-green mb-4">Confirm Your Order</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-cream dark:bg-[#2A2A2A] rounded-2xl p-4 text-sm border border-black/5 dark:border-white/5 shadow-inner">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-[13px]">
                  <div className="text-text-muted font-medium">Name</div>
                  <div className="font-bold text-text-main text-right truncate">{customerName}</div>
                  <div className="text-text-muted font-medium">Date</div>
                  <div className="font-bold text-text-main text-right">{date}</div>
                  <div className="text-text-muted font-medium">Meal</div>
                  <div className="font-bold text-text-main text-right">{meal}</div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-3">
                  <div className="font-bold text-text-main mb-2 text-xs uppercase tracking-wider text-text-muted">Order Details</div>
                  <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-2 no-scrollbar">
                    {Object.entries(cart).map(([name, qty]) => (
                      <div key={name} className="flex justify-between items-start text-[13px]">
                        <span className="font-medium text-text-main pr-4">
                          <span className="text-forest-green font-bold mr-2">{qty}x</span>
                          {name}
                        </span>
                        <span className="text-text-muted font-bold whitespace-nowrap">₹{getPrice(name) * qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-3 space-y-2">
                  <div className="flex justify-between items-center text-[13px] font-medium text-text-muted">
                    <span>Subtotal</span>
                    <span>₹{subTotal}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between items-center text-[13px] font-medium text-text-muted">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-black text-forest-green pt-2">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <div className="text-[11px] text-text-muted mt-3 bg-forest-green/5 p-2 rounded-lg flex items-start gap-2 border border-forest-green/10">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-forest-green" />
                    <span>A delivery fee of ₹100 is applicable for orders below ₹600.</span>
                  </div>
                </div>

                {specialInstructions.trim() && (
                  <div className="border-t border-black/10 dark:border-white/10 pt-3 mt-3">
                    <div className="font-bold text-text-main text-xs uppercase mb-1 tracking-wider text-text-muted">Instructions</div>
                    <div className="text-[13px] text-text-main italic">{specialInstructions}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl font-bold text-text-main bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
