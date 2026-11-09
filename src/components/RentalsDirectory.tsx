"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import { RENTAL_VENDORS, RentalVendor } from "@/data/rentals";

export default function RentalsDirectory() {
  const t = useTranslations("Rentals");
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<"all" | "sakleshpur" | "chikmagalur" | "taxi" | "tips">("all");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.cookie = `NEXT_LOCALE=${e.target.value}; path=/; max-age=31536000`;
    window.location.reload();
  };

  const filteredVendors = RENTAL_VENDORS.filter((vendor) => {
    if (activeTab === "all") return true;
    if (activeTab === "sakleshpur") return vendor.location === "Sakleshpur";
    if (activeTab === "chikmagalur") return vendor.location === "Chikmagalur";
    if (activeTab === "taxi") return vendor.category === "taxi";
    return true;
  });

  return (
    <div className="min-h-screen bg-cream text-text-main pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-warm-white/90 backdrop-blur-md border-b border-border/60 py-3.5 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm md:text-base font-semibold text-text-main hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            <i className="ph-bold ph-arrow-left text-lg"></i>
            <span>{t("backToHome")}</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />

            <select
              value={locale}
              onChange={handleLanguageChange}
              className="bg-transparent text-text-main font-medium border border-border/60 hover:border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-xs md:text-sm cursor-pointer transition-colors"
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

      {/* Hero Header */}
      <section className="pt-10 md:pt-14 pb-8 md:pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="ph-fill ph-moped text-sm"></i>
            <span>{t("badge")}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-dark mb-4 tracking-tight">
            {t("pageTitle")}
          </h1>

          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === "all"
                ? "bg-dark text-warm-white dark:text-neutral-900 shadow-sm"
                : "bg-warm-white text-text-muted hover:text-dark dark:hover:text-white border border-border"
            }`}
          >
            {t("tabAll")}
          </button>
          <button
            onClick={() => setActiveTab("sakleshpur")}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === "sakleshpur"
                ? "bg-dark text-warm-white dark:text-neutral-900 shadow-sm"
                : "bg-warm-white text-text-muted hover:text-dark dark:hover:text-white border border-border"
            }`}
          >
            {t("tabSakleshpur")}
          </button>
          <button
            onClick={() => setActiveTab("chikmagalur")}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === "chikmagalur"
                ? "bg-dark text-warm-white dark:text-neutral-900 shadow-sm"
                : "bg-warm-white text-text-muted hover:text-dark dark:hover:text-white border border-border"
            }`}
          >
            {t("tabChikmagalur")}
          </button>
          <button
            onClick={() => setActiveTab("taxi")}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === "taxi"
                ? "bg-dark text-warm-white dark:text-neutral-900 shadow-sm"
                : "bg-warm-white text-text-muted hover:text-dark dark:hover:text-white border border-border"
            }`}
          >
            {t("tabTaxis")}
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === "tips"
                ? "bg-dark text-warm-white dark:text-neutral-900 shadow-sm"
                : "bg-warm-white text-text-muted hover:text-dark dark:hover:text-white border border-border"
            }`}
          >
            {t("tabTips")}
          </button>
        </div>

        {/* Disclaimer Note */}
        <div className="mb-6 p-4 rounded-2xl bg-warm-white dark:bg-white/5 border border-border/80 flex items-start gap-3 text-xs text-text-muted shadow-sm">
          <i className="ph-fill ph-info text-base text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"></i>
          <p className="leading-relaxed">
            {t("vendorDisclaimer")}
          </p>
        </div>

        {/* Vendors Grid */}
        {activeTab !== "tips" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {filteredVendors.map((vendor: RentalVendor) => {
              const isSakleshpurBike = vendor.id === "darshh-rental-sakleshpur";

              return (
                <div
                  key={vendor.id}
                  className={`bg-warm-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm border flex flex-col justify-between transition-all hover:shadow-md ${
                    isSakleshpurBike
                      ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
                      : "border-border/80"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/10 text-text-muted">
                            {vendor.location}
                          </span>
                          {vendor.badge && (
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isSakleshpurBike
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                  : "bg-blue-500/10 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {vendor.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-dark leading-snug">
                          {vendor.name}
                        </h3>
                      </div>

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                          vendor.category === "taxi"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        }`}
                      >
                        <i
                          className={`ph-fill ${
                            vendor.category === "taxi"
                              ? "ph-taxi"
                              : vendor.category === "car"
                              ? "ph-car"
                              : "ph-moped"
                          }`}
                        ></i>
                      </div>
                    </div>

                    <p className="text-xs text-text-muted mb-4 leading-relaxed line-clamp-3">
                      {vendor.description}
                    </p>

                    {/* Vehicles */}
                    <div className="mb-4">
                      <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1.5">
                        {t("fleetTypes")}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {vendor.vehicles.map((v, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-cream dark:bg-white/5 border border-border/50 text-dark dark:text-gray-300 px-2 py-0.5 rounded-md font-medium"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-5 space-y-1">
                      {vendor.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-text-muted">
                          <i className="ph-bold ph-check text-emerald-600 dark:text-emerald-400 text-xs shrink-0"></i>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border/60 flex items-center gap-2 mt-auto">
                    {vendor.websiteUrl && (
                      <a
                        href={vendor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                          isSakleshpurBike
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                            : "bg-dark text-warm-white dark:text-neutral-900 hover:opacity-90"
                        }`}
                      >
                        <span>{isSakleshpurBike ? t("bookOnline") : t("visitWebsite")}</span>
                        <i className="ph-bold ph-arrow-up-right text-sm"></i>
                      </a>
                    )}

                    {vendor.phone && (
                      <a
                        href={`tel:${vendor.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold bg-dark text-warm-white dark:text-neutral-900 hover:opacity-90 transition-all shadow-sm"
                      >
                        <i className="ph-fill ph-phone text-sm"></i>
                        <span>{t("callVendor")}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Travel Tips & Riding Guidelines Section */}
        <section className={`mb-14 ${activeTab === "tips" ? "pt-2" : "pt-4"}`}>
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-2">
              {t("tabTips")}
            </h2>
            <p className="text-sm md:text-base text-text-muted">
              Essential advice for riding and driving through Malnad and the Western Ghats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-warm-white rounded-2xl p-5 border border-border shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">
                <i className="ph-fill ph-identification-card"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-dark text-base mb-1">{t("tip1Title")}</h4>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">{t("tip1Desc")}</p>
              </div>
            </div>

            <div className="bg-warm-white rounded-2xl p-5 border border-border shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
                <i className="ph-fill ph-shield-check"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-dark text-base mb-1">{t("tip2Title")}</h4>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">{t("tip2Desc")}</p>
              </div>
            </div>

            <div className="bg-warm-white rounded-2xl p-5 border border-border shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                <i className="ph-fill ph-gas-pump"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-dark text-base mb-1">{t("tip3Title")}</h4>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">{t("tip3Desc")}</p>
              </div>
            </div>

            <div className="bg-warm-white rounded-2xl p-5 border border-border shadow-sm flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0">
                <i className="ph-fill ph-map-pin"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-dark text-base mb-1">{t("tip4Title")}</h4>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">{t("tip4Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor Partner Callout */}
        <section className="bg-warm-white rounded-3xl p-6 md:p-8 border border-border shadow-sm text-center max-w-3xl mx-auto">
          <i className="ph-fill ph-car text-3xl text-emerald-600 dark:text-emerald-400 mb-2"></i>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-dark mb-2">
            {t("vendorCtaTitle")}
          </h3>
          <p className="text-xs md:text-sm text-text-muted mb-6 leading-relaxed">
            {t("vendorCtaDesc")}
          </p>
          <a
            href="https://wa.me/919448244666?text=Hi%20Milan%20Farm%20Stay%2C%20I%20am%20a%20vehicle%20rental%20provider%20and%20would%20like%20to%20be%20listed."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-green dark:bg-emerald-600 text-white rounded-xl text-xs md:text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <i className="ph-fill ph-whatsapp-logo text-base"></i>
            <span>{t("contactUs")}</span>
          </a>
        </section>
      </main>
    </div>
  );
}
