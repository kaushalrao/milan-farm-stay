"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CookModal from "./CookModal";
import dynamic from "next/dynamic";
import { useSearch } from "@/context/SearchContext";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState<string>("plan");
  const t = useTranslations("Navbar");
  const tFab = useTranslations("MobileFABs");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [cookModalOpen, setCookModalOpen] = useState(false);
  const { openSearch } = useSearch();

  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isHelpOpen && !(e.target as Element).closest('#mobile-help-popup')) {
        setIsHelpOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isHelpOpen]);

  const navItems = [
    { id: "plan", label: t("plan"), icon: "ph-map-trifold" },
    { id: "contacts", label: t("contacts"), icon: "ph-users" },
    { id: "food", label: t("food"), icon: "ph-cooking-pot" },
    { id: "taxi", label: t("taxi"), icon: "ph-taxi" },
    { id: "stay", label: t("stays"), icon: "ph-house-line" },
    { id: "help", label: "Help", icon: "ph-question" }
  ];

  // Scroll Spy: Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // If user tapped a tab, don't override activeSection during programmatic smooth scroll
      if (isManualScrollRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Bottom of page check: If near the bottom, the last section ('stay') is active
      if (documentHeight - scrollPosition < 180) {
        setActiveSection("stay");
        return;
      }

      // 2. Viewport detection line: 45% from top of screen
      const detectionLine = window.innerHeight * 0.45;
      
      // Filter out 'help' which is not an in-page section
      const scrollNavItems = navItems.filter((item) => item.id !== "help");
      const reversedItems = [...scrollNavItems].reverse();

      for (const item of reversedItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element has crossed the detection line and it is still visible in viewport
          if (rect.top <= detectionLine && rect.bottom > 80) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      // If at top of page, default to plan
      if (window.scrollY < 120) {
        setActiveSection("plan");
      }
    };

    // Throttle scroll event using requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "help") {
      setIsHelpOpen((prev) => !prev);
      return;
    }
    setIsHelpOpen(false);
    setActiveSection(id);

    // Lock scroll-spy while smooth scrolling
    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 900);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 150 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden fixed bottom-0 left-0 w-full z-[80] pb-[env(safe-area-inset-bottom)] pointer-events-none"
    >
      <div className="mx-4 mb-4 pointer-events-auto">
        <div className="flex items-center justify-between px-2 py-1.5 h-[64px] bg-warm-white/90 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-black/5 dark:border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)] rounded-full">
          {navItems.map((item) => {
            const isActive = item.id === "help" ? isHelpOpen : activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative flex flex-col items-center justify-center w-full h-full gap-0.5 tap-highlight-transparent group cursor-pointer"
                aria-label={`Scroll to ${item.label}`}
              >
                {/* Icon Container with Pill */}
                <div className="relative w-11 sm:w-14 h-8 flex items-center justify-center">
                  {/* Active Pill Indicator - High contrast in both Light & Dark Theme */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-airbnb-coral/15 dark:bg-airbnb-coral/30 border border-airbnb-coral/30 dark:border-airbnb-coral/50 rounded-full shadow-xs"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  
                  <div
                    className={`relative z-10 text-[22px] transition-all duration-300 ${
                      isActive ? "text-airbnb-coral scale-110 drop-shadow-xs" : "text-stone-500 dark:text-neutral-400 group-hover:text-dark dark:group-hover:text-white"
                    }`}
                  >
                    <i className={`${isActive ? "ph-fill" : "ph"} ${item.icon}`}></i>
                  </div>
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] font-bold tracking-wide transition-all duration-300 mt-0.5 ${
                    isActive ? "text-airbnb-coral" : "text-stone-500 dark:text-neutral-400 group-hover:text-dark dark:group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Help Popup Menu */}
        <div
          id="mobile-help-popup"
          className={"absolute bottom-[76px] right-2 w-56 bg-warm-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl border border-border dark:border-white/10 p-2 transition-all duration-300 origin-bottom-right " + (isHelpOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none')}
        >
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1 px-3 pt-1">{tFab("askUs")}</h4>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                setIsHelpOpen(false);
                openSearch();
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium w-full text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-airbnb-coral/15 text-airbnb-coral flex items-center justify-center shrink-0">
                <i className="ph-bold ph-magnifying-glass text-sm"></i>
              </div>
              Search Places & Food
            </button>
            <div className="h-px bg-border dark:bg-white/10 my-0.5"></div>
            <a href="tel:+919448244666" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium">
              <div className="w-7 h-7 rounded-full bg-soft-beige dark:bg-white/10 text-dark dark:text-white flex items-center justify-center shrink-0"><i className="ph-fill ph-phone text-sm"></i></div>
              {tFab("callHost")}
            </a>
            <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium">
              <div className="w-7 h-7 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0"><i className="ph-fill ph-whatsapp-logo text-sm"></i></div>
              {tFab("whatsappHost")}
            </a>
            <button onClick={() => setCookModalOpen(true)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium group w-full text-left">
              <div className="w-7 h-7 rounded-full bg-airbnb-coral/20 text-airbnb-coral flex items-center justify-center shrink-0 overflow-hidden">
                <Player src="/boiling-pot.json" autoplay loop style={{ height: '28px', width: '28px' }} />
              </div>
              {tFab("contactCook")}
            </button>
            <a href="tel:+919702545810" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-600 flex items-center justify-center shrink-0"><i className="ph-fill ph-package text-sm"></i></div>
              {tFab("contactDelivery")}
            </a>
            <div className="h-px bg-border dark:bg-white/10 my-1"></div>
            <a href="https://maps.app.goo.gl/27tXcbhyWdxo7We8A" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-cream dark:hover:bg-white/5 transition-colors text-dark dark:text-white text-sm font-medium">
              <div className="w-7 h-7 rounded-full bg-dark dark:bg-white/20 text-warm-white flex items-center justify-center shrink-0"><i className="ph-fill ph-map-pin text-sm"></i></div>
              {tFab("milanFarmStays")}
            </a>
          </div>
        </div>

        <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />

      </div>
    </motion.div>
  );
}
