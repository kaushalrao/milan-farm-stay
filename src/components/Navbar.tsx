"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const navItems = useMemo(() => [
    { label: t("plan"), href: "#plan", id: "plan", icon: "ph-map-trifold" },
    { label: t("contacts"), href: "#contacts", id: "contacts", icon: "ph-users" }
  ], [t]);

  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.cookie = `NEXT_LOCALE=${e.target.value}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-warm-white/95 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "py-6 bg-transparent border-b border-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center relative z-10">
        <Link href="#">
          <motion.div
            className={`font-serif font-bold text-dark transition-all duration-300 truncate mr-2 ${isScrolled ? 'text-xl' : 'text-2xl'}`}
          >
            {t("title")}
          </motion.div>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
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
          
          <ThemeToggle />
          
          <select
            value={locale}
            onChange={handleLanguageChange}
            className="bg-transparent text-text-main font-medium border border-border/60 hover:border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-airbnb-coral/50 text-sm md:text-base cursor-pointer transition-colors"
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
    </motion.nav>
  );
}
