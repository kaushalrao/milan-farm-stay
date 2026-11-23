"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import WeatherWidget from "./WeatherWidget";
import { useTranslations } from "next-intl";
import { useScrolled } from "@/hooks/useScrolled";

export default function Hero() {
  const t = useTranslations("Hero");
  const isScrolled = useScrolled(25);

  return (
    <header className="pt-16 sm:pt-20 md:pt-24 pb-6 md:pb-12 px-4 lg:px-8 text-center lg:text-left relative">
      <div className="container mx-auto max-w-4xl lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start"
        >
          {/* Medium Logo above Heading with FLIP transition to header */}
          <div className="mb-3 sm:mb-4 md:mb-5 flex items-center justify-center lg:justify-start">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              {!isScrolled && (
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
                    width={80}
                    height={80}
                    className="w-full h-full object-contain dark:hidden"
                    preload
                  />
                  {/* Dark mode: White logo emblem */}
                  <Image
                    src="/images/logo-emblem-dark.png"
                    alt="Milan Farm Stays Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain hidden dark:block"
                    preload
                  />
                </motion.div>
              )}
            </div>
          </div>

          <h1 
            className="font-serif text-[40px] md:text-7xl lg:text-[76px] leading-[1.05] md:leading-[1.1] lg:leading-[1.05] text-dark font-semibold mb-4 md:mb-6 tracking-tight"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <motion.p
            className="text-[17px] md:text-2xl lg:text-xl leading-snug text-text-muted max-w-2xl mx-auto lg:mx-0 mb-2 md:mb-4 px-2 lg:px-0 lg:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("subtitle")}
          </motion.p>
          <div className="lg:w-full">
            <WeatherWidget />
          </div>
        </motion.div>

        {/* Desktop Image Grid (Hidden on Mobile) */}
        <motion.div 
          className="hidden lg:grid grid-cols-2 gap-4 relative h-[480px] w-full max-w-[600px] mx-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-4 mt-12">
            <div className="w-full h-[220px] rounded-3xl overflow-hidden shadow-sm group relative">
              <Image
                src="/images/trip2.png"
                alt="Estate View"
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="w-full h-[200px] rounded-3xl overflow-hidden shadow-sm group relative">
              <Image
                src="/images/trip3.png"
                alt="Scenic View"
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full h-[320px] rounded-3xl overflow-hidden shadow-sm group relative">
              <Image
                src="/images/trip1.png"
                alt="Road Trip"
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                preload
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
