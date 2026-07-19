"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { navItems } from "../config/data";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Interpolate values based on scroll position (0px to 50px)
  const paddingY = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(252, 251, 248, 0)", "rgba(252, 251, 248, 0.95)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.95]);

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
      
      <div className="container mx-auto px-6 max-w-7xl flex justify-center md:justify-between items-center relative z-10">
        <Link href="#">
          <motion.div
            style={{ scale: logoScale }}
            className="font-serif text-2xl font-bold text-dark transition-colors duration-300"
          >
            Milan Farm Stays
          </motion.div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
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
      </div>
    </motion.nav>
  );
}
