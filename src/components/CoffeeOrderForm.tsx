"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Coffee, Plus, Minus, User, Sparkles, Check } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations, useLocale } from "next-intl";
import { COFFEE_PACKS, HOST_PHONE_NUMBER } from "@/data/coffeeData";

export default function CoffeeOrderForm() {
  const t = useTranslations("CoffeeOrderForm");
  const locale = useLocale();

  const [customerName, setCustomerName] = useState("");
  const [quantities, setQuantities] = useState<{ [packId: string]: number }>({
    "250g": 0,
    "500g": 0,
    "1kg": 0,
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const isOrderValid = customerName.trim() !== "" && totalItemsCount > 0;

  const handleCheckoutClick = () => {
    if (!isOrderValid) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsConfirmModalOpen(false);

    let message = `*New Coffee Powder Order - Milan Farm Stay*\n`;
    message += `Name: ${customerName.trim()}\n\n`;
    message += `*Items Ordered:*\n`;

    COFFEE_PACKS.forEach((pack) => {
      const qty = quantities[pack.id] || 0;
      if (qty > 0) {
        const itemTotal = pack.price * qty;
        message += `- ${qty}x ${pack.weightLabel} Arabica + Chicory (₹${itemTotal})\n`;
      }
    });

    message += `\n*Total Weight:* ${formattedWeight}\n`;
    message += `*Total Payable:* ₹${totalAmount}\n\n`;
    message += `_Fresh from Milan Coffee Plantation_`;

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

          <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t("tagline")}
          </p>

          {/* Cupping Notes Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {[t("note1"), t("note2"), t("note3"), t("note4")].map((note, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#F5F2E9] dark:bg-[#1E1E1E] text-[#4A3B2C] dark:text-[#d4a373] border border-black/5 dark:border-white/5"
              >
                ☕ {note}
              </span>
            ))}
          </div>
        </div>

        {/* Blend Spotlight Card */}
        <section className="mb-8" aria-label="Coffee blend information">
          <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#4A3B2C]/5 via-[#4A3B2C]/10 to-[#F5F2E9] dark:from-[#2A2016] dark:via-[#1E1712] dark:to-[#121212] border border-[#4A3B2C]/15 dark:border-[#d4a373]/20 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B2C]/80 dark:text-[#d4a373]/90">
                  {t("blendTitle")}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1D13] dark:text-[#F5EADB]">
                  {t("blendRatio")}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-black/40 text-xs font-semibold text-[#4A3B2C] dark:text-[#d4a373] border border-black/5 dark:border-white/10 w-fit">
                <Check className="w-3.5 h-3.5 text-forest-green" />
                <span>{t("freshlyRoasted")}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-muted dark:text-[#C5B8AA] leading-relaxed">
              {t("blendDesc")}
            </p>
          </div>
        </section>

        {/* Pack Selection */}
        <section className="mb-8" aria-label="Pack size and quantity selection">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-dark dark:text-white">
              {t("selectQuantity")}
            </h3>
            <span className="text-xs font-medium text-text-muted">
              Arabica + Chicory
            </span>
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

        {/* Guest Details: Name Only */}
        <section className="mb-10" aria-label="Guest details">
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
            disabled={!isOrderValid}
            className={`flex-1 max-w-xs py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-base flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap ${
              isOrderValid
                ? "bg-[#25D366] hover:bg-[#20b858] text-white active:scale-[0.98] cursor-pointer"
                : "bg-black/10 dark:bg-white/10 text-text-muted cursor-not-allowed shadow-none"
            }`}
          >
            <i className="ph-fill ph-whatsapp-logo text-base sm:text-xl shrink-0"></i>
            <span className="whitespace-nowrap">
              {totalItemsCount === 0
                ? t("addItemNotice")
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
            <div className="bg-white dark:bg-[#222] rounded-2xl p-4 border border-black/5 dark:border-white/5 mb-5 flex flex-col gap-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5 text-xs text-text-muted">
                <span>Guest: <strong className="text-dark dark:text-white">{customerName}</strong></span>
                <span>Total Weight: <strong className="text-dark dark:text-white">{formattedWeight}</strong></span>
              </div>

              {COFFEE_PACKS.map((pack) => {
                const qty = quantities[pack.id] || 0;
                if (qty === 0) return null;
                return (
                  <div key={pack.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-dark dark:text-white">
                      {qty}x {pack.weightLabel} Arabica + Chicory
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

