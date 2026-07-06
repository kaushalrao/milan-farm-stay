"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Itinerary", href: "#plan", id: "plan", icon: "ph-map-trifold" },
  { label: "Guest Services", href: "#contacts", id: "contacts", icon: "ph-users" }
];

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Interpolate values based on scroll position (0px to 50px)
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(252, 251, 248, 0)", "rgba(252, 251, 248, 0.95)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.95]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    // Give DOM time to mount
    setTimeout(() => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <motion.nav
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
      className="fixed top-0 left-0 w-full z-50 transition-shadow duration-300"
      aria-label="Main Navigation"
    >
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/50"
      />
      
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center relative z-10">
        <Link href="#">
          <motion.div
            style={{ scale: logoScale, originX: 0, originY: 0.5 }}
            className="font-serif text-2xl font-bold text-dark transition-colors duration-300"
          >
            Milan Farm Stays
          </motion.div>
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.div key={item.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-medium transition-colors duration-300 ${isActive ? 'text-airbnb-coral' : 'text-text-main hover:text-airbnb-coral'}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-white/50 backdrop-blur-md text-dark font-bold text-xs py-1.5 pl-3 pr-2.5 rounded-full shadow-sm border border-border/50 hover:bg-cream transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              Menu <i className={`ph-bold ph-caret-down text-[10px] text-text-muted transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}></i>
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden z-[60] origin-top-right"
                  role="menu"
                >
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        role="menuitem"
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`w-full text-left px-4 py-3.5 text-sm font-bold transition-colors flex items-center gap-3 ${index !== navItems.length - 1 ? 'border-b border-border/50' : ''} ${isActive ? 'bg-airbnb-coral/5 text-airbnb-coral' : 'text-dark hover:bg-cream'}`}
                      >
                        <i className={`ph-fill ${item.icon} ${isActive ? 'text-airbnb-coral' : 'text-text-muted'} text-lg`}></i> {item.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
