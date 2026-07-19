"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState<string>("plan");
  const t = useTranslations("Navbar");

  const navItems = [
    { id: "plan", label: t("plan"), icon: "ph-map-trifold" },
    { id: "contacts", label: t("contacts"), icon: "ph-users" },
    { id: "food", label: t("food"), icon: "ph-cooking-pot" },
    { id: "taxi", label: t("taxi"), icon: "ph-taxi" }
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
        <div className="flex items-center justify-between px-2 py-1.5 h-[64px] bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full">
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
      </div>
    </motion.div>
  );
}
