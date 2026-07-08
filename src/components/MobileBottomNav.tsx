"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { id: "plan", label: "Itinerary", icon: "ph-map-trifold" },
  { id: "contacts", label: "Hosts", icon: "ph-users" },
  { id: "food", label: "Food", icon: "ph-cooking-pot" },
  { id: "taxi", label: "Taxi", icon: "ph-taxi" }
];

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState<string>("plan");
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  // Hide nav when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Don't hide if we are at the very top of the page
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  // Scroll Spy: Update active section based on what's in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
      animate={{ y: isVisible ? 0 : 150 }}
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
