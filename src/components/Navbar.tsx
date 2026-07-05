"use client";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Interpolate values based on scroll position (0px to 50px)
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(252, 251, 248, 0)", "rgba(252, 251, 248, 0.9)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.95]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { label: "Itinerary", href: "#plan", icon: "ph-map-trifold" },
    { label: "Contacts", href: "#contacts", icon: "ph-users" }
  ];

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
    >
      {/* Bottom border that fades in smoothly */}
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
          <div className="hidden md:flex gap-8">
            {["Plan", "Host", "Cook", "Help"].map((item) => (
              <motion.div key={item} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={"#" + item.toLowerCase()}
                  className="font-medium transition-colors duration-300 hover:text-airbnb-coral text-text-main"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-white/50 backdrop-blur-md text-dark font-bold text-xs py-1.5 pl-3 pr-2.5 rounded-full shadow-sm border border-border/50 hover:bg-cream transition-colors"
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
                  className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden z-[60] origin-top-right"
                >
                  {menuItems.map((item, index) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => {
                          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className={`w-full text-left px-4 py-3.5 text-sm font-bold text-dark hover:bg-cream transition-colors flex items-center gap-3 ${index !== menuItems.length - 1 ? 'border-b border-border/50' : ''}`}
                    >
                      <i className={`ph-fill ${item.icon} text-airbnb-coral text-lg`}></i> {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
