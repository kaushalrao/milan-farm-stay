"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const navItems = [
    { label: t("plan"), href: "#plan", id: "plan", icon: "ph-map-trifold" },
    { label: t("contacts"), href: "#contacts", id: "contacts", icon: "ph-users" }
  ];

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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    window.location.reload();
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
      
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center relative z-10">
        <Link href="#">
          <motion.div
            style={{ scale: logoScale }}
            className="font-serif text-xl md:text-2xl font-bold text-dark transition-colors duration-300 truncate mr-2"
          >
            {t("title")}
          </motion.div>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.div key={item.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-medium transition-colors duration-300 \${isActive ? 'text-airbnb-coral' : 'text-text-main hover:text-airbnb-coral'}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </motion.div>
              );
            })}
          </div>
          
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
