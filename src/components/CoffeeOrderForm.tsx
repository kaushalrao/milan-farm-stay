"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Coffee, Plus, Minus, User, Sparkles, Check, Flame, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Coffee3DHero from "./Coffee3DHero";
import { useTranslations, useLocale } from "next-intl";
import {
  COFFEE_PACKS,
  HOST_PHONE_NUMBER,
  COFFEE_TYPES,
  POWDER_TYPES,
  CoffeeTypeId,
  PowderTypeId,
} from "@/data/coffeeData";

export default function CoffeeOrderForm() {
  const t = useTranslations("CoffeeOrderForm");
  const locale = useLocale();

  const [customerName, setCustomerName] = useState("");
  const [selectedCoffeeType, setSelectedCoffeeType] = useState<CoffeeTypeId | null>(null);
  const [selectedPowderType, setSelectedPowderType] = useState<PowderTypeId | null>(null);
  const [quantities, setQuantities] = useState<{ [packId: string]: number }>({
    "250g": 0,
    "500g": 0,
    "1kg": 0,
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [highlightSection, setHighlightSection] = useState<"name" | "coffee" | "powder" | "packs" | null>(null);

  // Section refs for smooth scrolling to unselected requirements
  const nameSectionRef = useRef<HTMLElement>(null);
  const coffeeTypeRef = useRef<HTMLElement>(null);
  const powderTypeRef = useRef<HTMLElement>(null);
  const packsSectionRef = useRef<HTMLElement>(null);

  // Load guest name from local storage on mount (shared with FoodOrderForm)
  useEffect(() => {
    const savedName = localStorage.getItem("mfs_customerName");
    if (savedName) {
      setTimeout(() => setCustomerName(savedName), 0);
    }
  }, []);

  // Sync back to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mfs_customerName", customerName);
    }
  }, [customerName]);

  const handleIncrement = (packId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [packId]: (prev[packId] || 0) + 1,
    }));
  };

  const handleDecrement = (packId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [packId]: Math.max(0, (prev[packId] || 0) - 1),
    }));
  };

  // Calculations
  const totalItemsCount = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);

  const totalAmount = COFFEE_PACKS.reduce((acc, pack) => {
    return acc + pack.price * (quantities[pack.id] || 0);
  }, 0);

  const totalWeightGrams = COFFEE_PACKS.reduce((acc, pack) => {
    return acc + pack.weightGrams * (quantities[pack.id] || 0);
  }, 0);

  const formattedWeight =
    totalWeightGrams >= 1000
      ? `${(totalWeightGrams / 1000).toFixed(totalWeightGrams % 1000 === 0 ? 0 : 2)} kg`
      : `${totalWeightGrams}g`;

  // Validation: Name, Items, Coffee Type, and Powder Type must all be present
  const isOrderValid =
    customerName.trim() !== "" &&
    totalItemsCount > 0 &&
    selectedCoffeeType !== null &&
    selectedPowderType !== null;

  const handleCheckoutClick = () => {
    if (!isOrderValid) {
      // Guide user to the missing requirement
      if (!customerName.trim()) {
        nameSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightSection("name");
      } else if (!selectedCoffeeType) {
        coffeeTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightSection("coffee");
      } else if (!selectedPowderType) {
        powderTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightSection("powder");
      } else if (totalItemsCount === 0) {
        packsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightSection("packs");
      }
      setTimeout(() => setHighlightSection(null), 2500);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsConfirmModalOpen(false);

    const coffeeOption = COFFEE_TYPES.find((c) => c.id === selectedCoffeeType);
    const powderOption = POWDER_TYPES.find((p) => p.id === selectedPowderType);

    const coffeeLabel =
      selectedCoffeeType === "arabica"
        ? `${t("arabicaTitle")} (${t("arabicaRatio")})`
        : `${t("robustaTitle")} (${t("robustaRatio")})`;

    const powderLabel =
      selectedPowderType === "filter"
        ? `${t("filterPowderTitle")} (${t("filterPowderSubtitle")})`
        : `${t("nicePowderTitle")} (${t("nicePowderSubtitle")})`;

    let message = `*New Coffee Powder Order - Milan Farm Stay*\n`;
    message += `*Guest Name:* ${customerName.trim()}\n\n`;
    message += `*Coffee Type:* ${coffeeLabel}\n`;
    message += `*Powder Type:* ${powderLabel}\n\n`;
    message += `*Items Ordered:*\n`;

    COFFEE_PACKS.forEach((pack) => {
      const qty = quantities[pack.id] || 0;
      if (qty > 0) {
        const itemTotal = pack.price * qty;
        message += `- ${qty}x ${pack.weightLabel} — ₹${itemTotal}\n`;
      }
    });

    message += `\n*Total Weight:* ${formattedWeight}\n`;
    message += `*Total Payable:* ₹${totalAmount}\n\n`;
    message += `_Freshly roasted & ground at Milan Coffee Plantation_`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/91${HOST_PHONE_NUMBER}?text=${encodedMessage}`;

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
    <div className="min-h-screen bg-[#FCFBF8] dark:bg-[#121212] text-text-main font-sans pb-36 transition-colors duration-300">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 relative">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FCFBF8]/90 dark:bg-[#121212]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-xs">
          <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && window.history.length > 1) {
                    window.history.back();
                  } else {
                    window.location.href = "/";
                  }
                }}
                className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-text-main" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#4A3B2C]/10 dark:bg-[#d4a373]/20 flex items-center justify-center border border-[#4A3B2C]/20 dark:border-[#d4a373]/30 shrink-0">
                  <Coffee className="w-4 h-4 text-[#4A3B2C] dark:text-[#d4a373]" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-[#4A3B2C] dark:text-[#d4a373] leading-tight">
                    {t("title")}
                  </h1>
                  <p className="text-[11px] text-text-muted font-medium leading-none">
                    {t("subtitle")}
                  </p>
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
                className="bg-transparent text-text-main font-medium border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-md px-1.5 py-1 focus:outline-none focus:ring-2 focus:ring-[#4A3B2C]/50 text-[11px] sm:text-xs cursor-pointer transition-colors"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="ml">മലയാളം</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="pt-24 sm:pt-28 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4A3B2C]/10 dark:bg-[#d4a373]/15 text-[#4A3B2C] dark:text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#4A3B2C]/20 dark:border-[#d4a373]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("directFromFarm")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F1F1F] dark:text-[#F5F5F5] mb-3 tracking-tight">
            {t("title")}
          </h2>

          <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
            {t("tagline")}
          </p>

          {/* 3D Floating Coffee Pack & Beans Animation */}
          <Coffee3DHero />

          <p className="text-[11px] sm:text-xs text-text-muted/70 dark:text-text-muted/60 italic text-center mt-2.5">
            {t("packagingDisclaimer")}
          </p>
        </div>

        {/* Guest Details: Name First */}
        <section
          ref={nameSectionRef}
          className={`mb-8 transition-all duration-300 rounded-3xl ${
            highlightSection === "name"
              ? "ring-2 ring-airbnb-coral/80 shadow-md"
              : ""
          }`}
          aria-label="Guest details"
        >
          <div className="bg-white/90 dark:bg-[#1A1A1A] rounded-3xl p-5 sm:p-6 border border-black/8 dark:border-white/8 shadow-xs">
            <h3 className="text-base sm:text-lg font-serif font-bold text-dark dark:text-white mb-1">
              {t("guestDetailsTitle")}
            </h3>
            <p className="text-xs text-text-muted mb-4">
              Enter your name so Host Athula Rao K can prepare your order.
            </p>

            <div className="flex items-center bg-[#F8F9F8] dark:bg-[#242424] rounded-2xl px-4 py-3 border border-black/8 dark:border-white/8 focus-within:border-[#4A3B2C] dark:focus-within:border-[#d4a373] focus-within:ring-2 focus-within:ring-[#4A3B2C]/10 transition-all">
              <User className="w-5 h-5 text-[#4A3B2C]/70 dark:text-[#d4a373]/80 mr-3 shrink-0" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t("yourNamePlaceholder")}
                className="bg-transparent border-none outline-none text-text-main w-full text-base font-semibold placeholder:text-text-muted/50"
              />
            </div>
          </div>
        </section>

        {/* Step 1: Select Coffee Type (Arabica vs Robusta) */}
        <section
          ref={coffeeTypeRef}
          className={`mb-8 transition-all duration-300 rounded-3xl ${
            highlightSection === "coffee"
              ? "ring-2 ring-airbnb-coral/80 shadow-md"
              : ""
          }`}
          aria-label="Select Coffee Type"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-dark dark:text-white">
                {t("selectCoffeeType")}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {t("selectCoffeeTypeSubtitle")}
              </p>
            </div>
            {selectedCoffeeType && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <Check className="w-3 h-3" />
                <span>Selected</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" role="radiogroup" aria-label="Coffee Blend Type">
            {/* Option 1: Arabica Coffee */}
            <div
              onClick={() => setSelectedCoffeeType("arabica")}
              role="radio"
              aria-checked={selectedCoffeeType === "arabica"}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedCoffeeType("arabica")}
              className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                selectedCoffeeType === "arabica"
                  ? "bg-gradient-to-br from-[#4A3B2C]/[0.08] via-white to-[#F5F2E9]/60 dark:from-[#2A2016] dark:via-[#1E1712] dark:to-[#171717] border-[#4A3B2C] dark:border-[#d4a373] shadow-md ring-2 ring-[#4A3B2C]/30 dark:ring-[#d4a373]/40 scale-[1.01]"
                  : "bg-white/80 dark:bg-[#181818] border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4A3B2C]/10 dark:bg-[#d4a373]/20 text-[#4A3B2C] dark:text-[#d4a373]">
                    {t("arabicaBadge")}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedCoffeeType === "arabica"
                        ? "bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F] shadow-xs"
                        : "border-2 border-black/20 dark:border-white/20"
                    }`}
                  >
                    {selectedCoffeeType === "arabica" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A1D13] dark:text-[#F5EADB] mb-1">
                  {t("arabicaTitle")}
                </h4>
                <div className="inline-block px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-semibold text-[#4A3B2C] dark:text-[#d4a373] mb-2.5">
                  {t("arabicaRatio")}
                </div>

                <p className="text-xs text-text-muted leading-relaxed mb-3">
                  {t("arabicaDesc")}
                </p>
              </div>

              {/* Tasting Notes */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                {[t("note1"), t("note2"), t("note4")].map((note, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-text-muted"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Option 2: Robusta Coffee */}
            <div
              onClick={() => setSelectedCoffeeType("robusta")}
              role="radio"
              aria-checked={selectedCoffeeType === "robusta"}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedCoffeeType("robusta")}
              className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                selectedCoffeeType === "robusta"
                  ? "bg-gradient-to-br from-[#4A3B2C]/[0.08] via-white to-[#F5F2E9]/60 dark:from-[#2A2016] dark:via-[#1E1712] dark:to-[#171717] border-[#4A3B2C] dark:border-[#d4a373] shadow-md ring-2 ring-[#4A3B2C]/30 dark:ring-[#d4a373]/40 scale-[1.01]"
                  : "bg-white/80 dark:bg-[#181818] border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    {t("robustaBadge")}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedCoffeeType === "robusta"
                        ? "bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F] shadow-xs"
                        : "border-2 border-black/20 dark:border-white/20"
                    }`}
                  >
                    {selectedCoffeeType === "robusta" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A1D13] dark:text-[#F5EADB] mb-1">
                  {t("robustaTitle")}
                </h4>
                <div className="inline-block px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-semibold text-[#4A3B2C] dark:text-[#d4a373] mb-2.5">
                  {t("robustaRatio")}
                </div>

                <p className="text-xs text-text-muted leading-relaxed mb-3">
                  {t("robustaDesc")}
                </p>
              </div>

              {/* Tasting Notes */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                {["Strong Body", "Roasted Cocoa", "Thick Crema"].map((note, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-text-muted"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Select Powder Type (Filter vs Nice Powder) */}
        <section
          ref={powderTypeRef}
          className={`mb-8 transition-all duration-300 rounded-3xl ${
            highlightSection === "powder"
              ? "ring-2 ring-airbnb-coral/80 shadow-md"
              : ""
          }`}
          aria-label="Select Powder Type"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-dark dark:text-white">
                {t("selectPowderType")}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {t("selectPowderTypeSubtitle")}
              </p>
            </div>
            {selectedPowderType && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <Check className="w-3 h-3" />
                <span>Selected</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" role="radiogroup" aria-label="Powder Grind Type">
            {/* Powder 1: Filter Coffee Powder */}
            <div
              onClick={() => setSelectedPowderType("filter")}
              role="radio"
              aria-checked={selectedPowderType === "filter"}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedPowderType("filter")}
              className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                selectedPowderType === "filter"
                  ? "bg-gradient-to-br from-[#4A3B2C]/[0.08] via-white to-[#F5F2E9]/60 dark:from-[#2A2016] dark:via-[#1E1712] dark:to-[#171717] border-[#4A3B2C] dark:border-[#d4a373] shadow-md ring-2 ring-[#4A3B2C]/30 dark:ring-[#d4a373]/40 scale-[1.01]"
                  : "bg-white/80 dark:bg-[#181818] border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4A3B2C]/10 dark:bg-[#d4a373]/20 text-[#4A3B2C] dark:text-[#d4a373]">
                    <Coffee className="w-3 h-3" />
                    <span>Traditional Drip</span>
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedPowderType === "filter"
                        ? "bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F] shadow-xs"
                        : "border-2 border-black/20 dark:border-white/20"
                    }`}
                  >
                    {selectedPowderType === "filter" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#2A1D13] dark:text-[#F5EADB] mb-0.5">
                  {t("filterPowderTitle")}
                </h4>
                <p className="text-[11px] font-semibold text-[#4A3B2C] dark:text-[#d4a373] mb-2">
                  {t("filterPowderSubtitle")}
                </p>

                <p className="text-xs text-text-muted leading-relaxed">
                  {t("filterPowderDesc")}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5">
                <span className="text-[10px] text-text-muted">
                  Ideal for: <strong className="text-dark dark:text-white">Brass/Steel Filter, French Press</strong>
                </span>
              </div>
            </div>

            {/* Powder 2: Nice Powder */}
            <div
              onClick={() => setSelectedPowderType("nice")}
              role="radio"
              aria-checked={selectedPowderType === "nice"}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedPowderType("nice")}
              className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                selectedPowderType === "nice"
                  ? "bg-gradient-to-br from-[#4A3B2C]/[0.08] via-white to-[#F5F2E9]/60 dark:from-[#2A2016] dark:via-[#1E1712] dark:to-[#171717] border-[#4A3B2C] dark:border-[#d4a373] shadow-md ring-2 ring-[#4A3B2C]/30 dark:ring-[#d4a373]/40 scale-[1.01]"
                  : "bg-white/80 dark:bg-[#181818] border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Fine Grind</span>
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedPowderType === "nice"
                        ? "bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F] shadow-xs"
                        : "border-2 border-black/20 dark:border-white/20"
                    }`}
                  >
                    {selectedPowderType === "nice" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#2A1D13] dark:text-[#F5EADB] mb-0.5">
                  {t("nicePowderTitle")}
                </h4>
                <p className="text-[11px] font-semibold text-[#4A3B2C] dark:text-[#d4a373] mb-2">
                  {t("nicePowderSubtitle")}
                </p>

                <p className="text-xs text-text-muted leading-relaxed">
                  {t("nicePowderDesc")}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5">
                <span className="text-[10px] text-text-muted">
                  Ideal for: <strong className="text-dark dark:text-white">Stovetop Boil, Instant Decoction, Moka Pot</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Pack Selection */}
        <section
          ref={packsSectionRef}
          className={`mb-10 transition-all duration-300 rounded-3xl ${
            highlightSection === "packs"
              ? "ring-2 ring-airbnb-coral/80 shadow-md"
              : ""
          }`}
          aria-label="Pack size and quantity selection"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-dark dark:text-white">
                3. {t("selectQuantity")}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {selectedCoffeeType && selectedPowderType ? (
                  <span className="text-[#4A3B2C] dark:text-[#d4a373] font-semibold">
                    {selectedCoffeeType === "arabica" ? "Arabica 80/20" : "Robusta 80/20"} • {selectedPowderType === "filter" ? "Filter Grind" : "Nice Grind"}
                  </span>
                ) : (
                  <span>Select pack sizes for your order</span>
                )}
              </p>
            </div>
            {totalItemsCount > 0 && (
              <span className="text-xs font-semibold text-text-muted">
                {totalItemsCount} {totalItemsCount === 1 ? "pack" : "packs"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {COFFEE_PACKS.map((pack) => {
              const qty = quantities[pack.id] || 0;
              const isSelected = qty > 0;
              const desc =
                pack.id === "250g"
                  ? t("pack250gDesc")
                  : pack.id === "500g"
                  ? t("pack500gDesc")
                  : t("pack1kgDesc");

              return (
                <div
                  key={pack.id}
                  className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
                    isSelected
                      ? "bg-white dark:bg-[#1E1E1E] border-[#4A3B2C] dark:border-[#d4a373] shadow-md ring-1 ring-[#4A3B2C]/30 dark:ring-[#d4a373]/30"
                      : "bg-white/80 dark:bg-[#181818] border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15"
                  }`}
                >
                  {/* Badge */}
                  {pack.badge && (
                    <div className="absolute top-3.5 right-3.5">
                      <span
                        className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          pack.isPopular
                            ? "bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F]"
                            : "bg-[#F5F2E9] dark:bg-[#2A2A2A] text-text-muted"
                        }`}
                      >
                        {pack.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 pr-16 sm:pr-20">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-dark dark:text-white">
                          {pack.weightLabel}
                        </h4>
                        <span className="text-lg sm:text-xl font-bold text-[#4A3B2C] dark:text-[#d4a373]">
                          ₹{pack.price}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Stepper Controls */}
                  <div className="mt-4 pt-3.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div className="text-xs font-medium text-text-muted">
                      {qty > 0 ? (
                        <span className="text-[#4A3B2C] dark:text-[#d4a373] font-semibold">
                          Subtotal: ₹{pack.price * qty}
                        </span>
                      ) : (
                        <span>Tap + to add</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(pack.id)}
                        disabled={qty === 0}
                        aria-label={`Decrease ${pack.weightLabel}`}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          qty > 0
                            ? "bg-black/5 dark:bg-white/10 text-dark dark:text-white hover:bg-black/10 active:scale-95"
                            : "bg-black/[0.03] dark:bg-white/[0.03] text-black/20 dark:text-white/20 cursor-not-allowed"
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-8 text-center font-bold text-base text-dark dark:text-white">
                        {qty}
                      </span>

                      <button
                        onClick={() => handleIncrement(pack.id)}
                        aria-label={`Increase ${pack.weightLabel}`}
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#4A3B2C] text-white dark:bg-[#d4a373] dark:text-[#1F1F1F] hover:opacity-90 active:scale-95 shadow-xs transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF8]/95 dark:bg-[#121212]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>{t("totalWeight")}:</span>
              <span className="font-semibold text-dark dark:text-white">
                {totalItemsCount > 0 ? formattedWeight : "0g"}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-text-muted">₹</span>
              <span className="text-2xl font-bold font-serif text-[#4A3B2C] dark:text-[#d4a373]">
                {totalAmount}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckoutClick}
            className={`flex-1 max-w-xs py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-base flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap ${
              isOrderValid
                ? "bg-[#25D366] hover:bg-[#20b858] text-white active:scale-[0.98] cursor-pointer"
                : "bg-black/10 dark:bg-white/10 text-text-muted hover:bg-black/15 dark:hover:bg-white/15 cursor-pointer shadow-none"
            }`}
          >
            {isOrderValid && (
              <i className="ph-fill ph-whatsapp-logo text-base sm:text-xl shrink-0"></i>
            )}
            <span className="whitespace-nowrap">
              {totalItemsCount === 0
                ? t("addItemNotice")
                : !selectedCoffeeType && !selectedPowderType
                ? t("selectionRequiredNotice")
                : !selectedCoffeeType
                ? t("coffeeTypeRequired")
                : !selectedPowderType
                ? t("powderTypeRequired")
                : !customerName.trim()
                ? t("yourNameRequired")
                : t("orderViaWhatsApp")}
            </span>
          </button>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#FCFBF8] dark:bg-[#1A1A1A] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#4A3B2C]/10 dark:bg-[#d4a373]/20 flex items-center justify-center text-[#4A3B2C] dark:text-[#d4a373]">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-dark dark:text-white">
                    {t("confirmTitle")}
                  </h3>
                  <p className="text-xs text-text-muted">
                    Host Athula Rao K (+91 {HOST_PHONE_NUMBER})
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-muted mb-4">
              {t("confirmSubtitle")}
            </p>

            {/* Order Review List */}
            <div className="bg-white dark:bg-[#222] rounded-2xl p-4 border border-black/5 dark:border-white/5 mb-5 flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2.5 border-b border-black/5 dark:border-white/5 text-xs text-text-muted">
                <span>Guest: <strong className="text-dark dark:text-white">{customerName}</strong></span>
                <span>Total Weight: <strong className="text-dark dark:text-white">{formattedWeight}</strong></span>
              </div>

              {/* Selections Summary */}
              <div className="grid grid-cols-2 gap-2 pb-2.5 border-b border-black/5 dark:border-white/5">
                <div className="bg-[#F8F9F8] dark:bg-[#1A1A1A] rounded-xl p-2.5 border border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-0.5">
                    {t("coffeeTypeLabel")}
                  </span>
                  <span className="text-xs font-bold text-[#4A3B2C] dark:text-[#d4a373] block truncate">
                    {selectedCoffeeType === "arabica" ? t("arabicaTitle") : t("robustaTitle")}
                  </span>
                  <span className="text-[10px] text-text-muted block">
                    {selectedCoffeeType === "arabica" ? t("arabicaRatio") : t("robustaRatio")}
                  </span>
                </div>

                <div className="bg-[#F8F9F8] dark:bg-[#1A1A1A] rounded-xl p-2.5 border border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-0.5">
                    {t("powderTypeLabel")}
                  </span>
                  <span className="text-xs font-bold text-[#4A3B2C] dark:text-[#d4a373] block truncate">
                    {selectedPowderType === "filter" ? t("filterPowderTitle") : t("nicePowderTitle")}
                  </span>
                  <span className="text-[10px] text-text-muted block">
                    {selectedPowderType === "filter" ? t("filterPowderSubtitle") : t("nicePowderSubtitle")}
                  </span>
                </div>
              </div>

              {/* Packs */}
              {COFFEE_PACKS.map((pack) => {
                const qty = quantities[pack.id] || 0;
                if (qty === 0) return null;
                return (
                  <div key={pack.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-dark dark:text-white">
                      {qty}x {pack.weightLabel}
                    </span>
                    <span className="font-bold text-[#4A3B2C] dark:text-[#d4a373]">
                      ₹{pack.price * qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-2.5 mt-1 border-t border-black/5 dark:border-white/5 font-bold">
                <span className="text-sm text-dark dark:text-white">{t("totalAmount")}</span>
                <span className="text-lg text-[#4A3B2C] dark:text-[#d4a373]">₹{totalAmount}</span>
              </div>
            </div>

            <p className="text-[10px] text-text-muted/70 italic text-center -mt-2 mb-4">
              {t("packagingDisclaimer")}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 py-3 px-3 sm:px-4 rounded-xl border border-black/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap text-center"
              >
                {t("cancelButton")}
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-3 px-3 sm:px-4 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm transition-all active:scale-[0.98] whitespace-nowrap text-center"
              >
                <i className="ph-fill ph-whatsapp-logo text-base sm:text-lg shrink-0"></i>
                <span className="whitespace-nowrap">{t("confirmButton")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
