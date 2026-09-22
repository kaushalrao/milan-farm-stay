"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, Calendar, ShoppingBag, Send, Leaf, ArrowLeft, Info, Search, Users } from "lucide-react";
import Image from "next/image";

type MenuItem = {
  name: string;
  price: number;
  serves: number;
  image: string;
};

type MenuCategory = {
  [category: string]: MenuItem[];
};

const MENU_DATA: MenuCategory = {
  "Starters": [
    { "name": "Gobi Manchurian / Chilli / Pepper", "price": 200, "serves": 2, "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
    { "name": "Mushroom Manchurian / Chilli / Pepper", "price": 200, "serves": 2, "image": "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80" },
    { "name": "Baby Corn Manchurian / Chilli / Pepper", "price": 200, "serves": 2, "image": "https://images.unsplash.com/photo-1589301760014-a929cd78a574?w=400&q=80" },
    { "name": "Paneer Manchurian / Chilli / Pepper", "price": 250, "serves": 2, "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc3?w=400&q=80" }
  ],
  "Main Course": [
    { "name": "Meals (Includes Rice roti, Rice, Veg stir-fry, Payasam, Sambar, Chutney, Salad, Pickle)", "price": 200, "serves": 1, "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
    { "name": "Chapathi", "price": 30, "serves": 1, "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
    { "name": "Mushroom Masala", "price": 200, "serves": 2, "image": "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80" },
    { "name": "Paneer Masala", "price": 250, "serves": 2, "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80" },
    { "name": "Veg Kurma", "price": 180, "serves": 2, "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
    { "name": "Palak Paneer", "price": 250, "serves": 2, "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
    { "name": "Dal Fry", "price": 150, "serves": 2, "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80" },
    { "name": "Aloo Gobi Masala", "price": 150, "serves": 2, "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" }
  ],
  "Rice Items": [
    { "name": "Rice", "price": 100, "serves": 2, "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
    { "name": "Tomato Rice", "price": 100, "serves": 2, "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },
    { "name": "Curd Rice", "price": 100, "serves": 2, "image": "https://images.unsplash.com/photo-1626082895617-2c6bf9177a4a?w=400&q=80" },
    { "name": "Jeera Rice", "price": 100, "serves": 2, "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
    { "name": "Lemon Rice", "price": 100, "serves": 2, "image": "https://images.unsplash.com/photo-1539755530862-00f623c00f52?w=400&q=80" }
  ],
  "Noodles": [
    { "name": "Veg Noodles", "price": 150, "serves": 2, "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80" }
  ]
};

const CATEGORIES = Object.keys(MENU_DATA);
const VENDOR_PHONE_NUMBER = "919482214882";

export default function FoodOrderForm() {
  const [date, setDate] = useState("");
  const [meal, setMeal] = useState<"Lunch" | "Dinner" | "">("");
  const [cart, setCart] = useState<{ [itemName: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    setCart((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
    triggerCartAnimation();
  };

  const handleDecrement = (itemName: string) => {
    setCart((prev) => {
      const current = prev[itemName] || 0;
      if (current <= 1) {
        const newCart = { ...prev };
        delete newCart[itemName];
        return newCart;
      }
      return {
        ...prev,
        [itemName]: current - 1,
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

  const totalAmount = Object.entries(cart).reduce((sum, [name, qty]) => sum + (getPrice(name) * qty), 0);
  const isOrderValid = date !== "" && meal !== "" && Object.keys(cart).length > 0;

  const handleSubmit = () => {
    let message = `*New Food Order - Milan Farm Stay*\n`;
    message += `Date: ${date}\n`;
    message += `Meal: ${meal}\n\n`;
    message += `*Items:*\n`;

    Object.entries(cart).forEach(([itemName, qty]) => {
      const subtotal = getPrice(itemName) * qty;
      message += `\n${qty}x ${itemName} (₹${subtotal})`;
    });

    message += `\n\n*Total Payable: ₹${totalAmount}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${VENDOR_PHONE_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <div className="max-w-3xl mx-auto w-full relative">
        {/* Streamlined Hero Header */}
        <header className="pt-12 pb-8 px-6 text-center relative">
          <button 
            onClick={() => window.history.back()}
            className="absolute top-8 left-4 md:left-6 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-[#2A2A2A]/80 backdrop-blur-md rounded-full shadow-md text-text-muted hover:text-text-main transition-all border border-black/10 dark:border-white/10 hover:scale-105"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center p-3 bg-forest-green/10 text-forest-green rounded-full mb-4 shadow-sm border border-forest-green/20">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-green mb-3">Farm to Table</h1>
          <p className="text-text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
            Partnering with Ruchi Home Made Food to bring you fresh, organic vegetarian meals prepared daily.
          </p>
        </header>

        {/* Elegant Scheduling Form */}
        <div className="px-4 md:px-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs md:text-sm text-text-muted bg-white/60 dark:bg-black/20 backdrop-blur-sm py-1.5 px-4 rounded-full w-fit mx-auto border border-black/10 dark:border-white/10 shadow-sm">
            <Info className="w-4 h-4 text-forest-green" />
            <span className="font-medium">Selecting date and meal type is mandatory to proceed.</span>
          </div>
          
          <div className="bg-white dark:bg-[#2A2A2A] rounded-3xl p-5 shadow-md border border-black/10 dark:border-white/10 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Date Pill */}
            <div className="flex-1 w-full flex items-center justify-between bg-cream dark:bg-[#1f1f1f] rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-terracotta" />
                <span className="text-sm font-semibold text-text-main">Date</span>
              </div>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-none outline-none text-text-main text-right text-sm font-semibold cursor-pointer"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Meal Type Pill Toggle */}
            <div className="flex-1 w-full bg-cream dark:bg-[#1f1f1f] rounded-2xl p-1 flex relative border border-black/5 dark:border-white/5">
              <div className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-[#333] rounded-xl shadow-md transition-transform duration-300 ease-in-out" 
                   style={{ transform: meal === "Dinner" ? "translateX(100%)" : "translateX(0)" }} 
              />
              <button 
                onClick={() => setMeal("Lunch")}
                className={`flex-1 relative z-10 py-2.5 text-sm font-bold rounded-xl transition-colors ${meal === "Lunch" ? "text-forest-green" : "text-text-muted hover:text-text-main"}`}
              >
                Lunch
              </button>
              <button 
                onClick={() => setMeal("Dinner")}
                className={`flex-1 relative z-10 py-2.5 text-sm font-bold rounded-xl transition-colors ${meal === "Dinner" ? "text-forest-green" : "text-text-muted hover:text-text-main"}`}
              >
                Dinner
              </button>
            </div>

          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 md:px-6 mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-forest-green transition-colors" />
            <input 
              type="text" 
              placeholder="Search menu items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#2A2A2A] rounded-2xl py-3.5 pl-12 pr-4 shadow-sm border border-black/10 dark:border-white/10 focus:outline-none focus:border-forest-green/50 focus:ring-2 focus:ring-forest-green/20 transition-all text-text-main font-medium"
            />
          </div>
        </div>

        {/* Sticky Category Navigation */}
        <div className="sticky top-0 z-40 bg-[#FCFBF8]/95 dark:bg-[#1C1C1C]/95 backdrop-blur-md px-4 py-3 border-b border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-forest-green text-white shadow-md scale-105" 
                    : "bg-white dark:bg-[#2A2A2A] text-text-muted hover:text-forest-green hover:bg-forest-green/5 border border-black/10 dark:border-white/10 hover:shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
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
                      <div key={item.name} className={`group flex gap-4 p-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? "bg-forest-green/5 dark:bg-forest-green/10 border-forest-green/30 shadow-md ring-1 ring-forest-green/10" 
                          : "bg-white dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-md"
                      } border overflow-hidden`}>
                        
                        {/* Initials Avatar */}
                        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden bg-forest-green/10 dark:bg-forest-green/20 text-forest-green flex items-center justify-center font-serif text-2xl md:text-3xl font-bold shadow-sm border border-forest-green/20">
                          {(() => {
                            const cleanName = item.name.split('/')[0].trim();
                            const words = cleanName.split(' ').filter(Boolean);
                            if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
                            if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
                            return "MF";
                          })()}
                        </div>

                        {/* Details & Controls */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h4 className="font-bold text-text-main text-sm md:text-base leading-tight mb-2 line-clamp-2">{item.name}</h4>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-muted-terracotta text-sm md:text-base">₹{item.price}</span>
                              <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
                              <span className="flex items-center gap-1.5 text-[11px] font-bold text-forest-green bg-forest-green/10 dark:bg-forest-green/20 px-2 py-0.5 rounded-md">
                                <Users className="w-3 h-3" /> Serves {item.serves}
                              </span>
                            </div>
                          </div>
                          
                          {/* Dynamic Pill Quantity Selector */}
                          <div className="self-end mt-2 md:mt-0">
                            <div className={`flex items-center rounded-full p-0.5 transition-all duration-300 border ${
                              isActive 
                                ? "bg-forest-green text-white shadow-md border-forest-green" 
                                : "bg-cream dark:bg-[#1f1f1f] text-text-muted border-black/10 dark:border-white/10"
                            }`}>
                              <button 
                                onClick={() => handleDecrement(item.name)}
                                disabled={qty === 0}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                  isActive ? "hover:bg-black/20" : "hover:bg-black/5 dark:hover:bg-white/5 opacity-50 cursor-not-allowed"
                                }`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <span className={`w-6 text-center font-bold text-sm ${isActive ? "text-white" : "text-text-main"}`}>
                                {qty}
                              </span>
                              
                              <button 
                                onClick={() => handleIncrement(item.name)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                  isActive ? "hover:bg-black/20" : "hover:bg-black/5 dark:hover:bg-white/5 text-text-main"
                                }`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
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
          <div className="bg-white/80 dark:bg-[#1C1C1C]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 p-4 rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
            
            <div className="pl-2">
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">Total</p>
              <p className="text-2xl font-black text-forest-green">₹{totalAmount}</p>
            </div>
            
            <button 
              onClick={handleSubmit}
              disabled={!isOrderValid}
              className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg ${
                isOrderValid 
                  ? `bg-[#25D366] hover:bg-[#128C7E] text-white hover:-translate-y-1 hover:shadow-[#25D366]/40 ${isAnimating ? 'scale-105' : 'scale-100'}`
                  : "bg-gray-200 dark:bg-[#2A2A2A] text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{isOrderValid ? "Order via WhatsApp" : "Select Meal & Items"}</span>
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}
