"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import SearchTrigger from "./search/SearchTrigger";
import { useScrolled } from "@/hooks/useScrolled";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const navItems = useMemo(() => [
    { label: t("plan"), href: "#plan", id: "plan", icon: "ph-map-trifold", isAnchor: true },
    { label: t("contacts"), href: "#contacts", id: "contacts", icon: "ph-users", isAnchor: true },
    { label: t("coffee"), href: "/order-coffee", id: "coffee", icon: "ph-coffee", isAnchor: false },
    { label: t("rentals"), href: "/rentals", id: "rentals", icon: "ph-moped", isAnchor: false },
    { label: t("stays"), href: "#stay", id: "stay", icon: "ph-house-line", isAnchor: true }
  ], [t]);

  const isScrolled = useScrolled(25);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
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
      { rootMargin: "-15% 0px -50% 0px" }
    );

    const handleBottomScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 180) {
        setActiveSection("stay");
      }
    };
    window.addEventListener("scroll", handleBottomScroll, { passive: true });

    // Give DOM time to mount
    setTimeout(() => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleBottomScroll);
    };
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor) {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/") {
          e.preventDefault();
          const targetId = href.replace("#", "");
          setActiveSection(targetId);
          setTimeout(() => {
            const el = document.querySelector(href);
            if (el) {
              const navOffset = 76;
              const elementPosition = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: Math.max(0, elementPosition - navOffset),
                behavior: "smooth"
              });
            }
          }, 30);
        } else {
          e.preventDefault();
          window.location.href = `/${href}`;
        }
      }
    }
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
          : "py-3 sm:py-3.5 bg-transparent border-b border-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink group">
            <div className="relative shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
              {isScrolled && (
                <motion.div
                  layoutId="hero-brand-logo-emblem"
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    mass: 0.7,
                  }}
                  className="w-full h-full relative"
                >
                  {/* Light mode: Charcoal logo emblem */}
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Milan Farm Stays Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain dark:hidden shrink-0 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  {/* Dark mode: White logo emblem */}
                  <Image
                    src="/images/logo-emblem-dark.png"
                    alt="Milan Farm Stays Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain hidden dark:block shrink-0 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </motion.div>
              )}
            </div>
            <motion.span
              initial={false}
              animate={{
                x: isScrolled ? 0 : (isDesktop ? -42 : -36),
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                mass: 0.7,
              }}
              className="font-serif font-bold text-dark text-base sm:text-xl tracking-tight whitespace-nowrap select-none"
            >
              {t("title")}
            </motion.span>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-6 shrink-0">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.div key={item.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  {item.isAnchor ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                      className={`font-medium transition-colors duration-300 ${isActive ? 'text-airbnb-coral' : 'text-text-main hover:text-airbnb-coral'}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-medium transition-colors duration-300 text-text-main hover:text-airbnb-coral"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          <SearchTrigger variant="desktop-pill" className="hidden sm:flex" />
          <SearchTrigger variant="mobile-icon" className="sm:hidden" />

          <ThemeToggle />
          
          <select
            value={locale}
            onChange={handleLanguageChange}
            className="bg-transparent text-text-main font-medium border border-border/60 hover:border-border rounded-md px-1.5 py-1 sm:px-2 sm:py-1.5 focus:outline-none focus:ring-2 focus:ring-airbnb-coral/50 text-xs sm:text-sm md:text-base cursor-pointer transition-colors shrink-0"
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
            <option value="ml">മലയാളം</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </motion.nav>
  );
}
