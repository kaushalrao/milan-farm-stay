"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import CookModal from "./CookModal";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState<string>("plan");
  const t = useTranslations("Navbar");
  const tFab = useTranslations("MobileFABs");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [cookModalOpen, setCookModalOpen] = useState(false);

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
    { id: "help", label: "Help", icon: "ph-question" }
  ];

  // Scroll Spy: Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Use a detection line at 30% from the top of the viewport
      const detectionLine = window.innerHeight * 0.3;
      
      // Iterate through sections in reverse order to properly handle nested or overlapping sections
      const reversedItems = [...navItems].reverse();
      
      for (const item of reversedItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is above the detection line, it is the active section
          if (rect.top <= detectionLine) {
            setActiveSection(item.id);
            return; // Found the active section, stop checking
          }
        }
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

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "help") {
      setIsHelpOpen(!isHelpOpen);
      return;
    }
    setIsHelpOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Small delay allows any closing animations to run, if necessary
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }, 50);
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
        <div className="flex items-center justify-between px-2 py-1.5 h-[64px] bg-warm-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative flex flex-col items-center justify-center w-full h-full gap-0.5 tap-highlight-transparent group"
                aria-label={`Scroll to ${item.label}`}
              >
                {/* Icon Container with Pill */}
                <div className="relative w-14 h-8 flex items-center justify-center">
                  {/* Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-airbnb-coral/15 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  
                  <div
                    className={`relative z-10 text-[22px] transition-all duration-300 ${
                      isActive ? "text-airbnb-coral scale-110" : "text-text-muted/70 group-hover:text-dark"
                    }`}
                  >
                    <i className={`${isActive ? "ph-fill" : "ph"} ${item.icon}`}></i>
                  </div>
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] font-bold tracking-wide transition-all duration-300 mt-0.5 ${
                    isActive ? "text-airbnb-coral" : "text-text-muted/70 group-hover:text-dark"
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
