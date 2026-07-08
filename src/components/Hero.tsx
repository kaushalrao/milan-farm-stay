"use client";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";

export default function Hero() {
  return (
    <header className="pt-24 md:pt-32 pb-6 md:pb-12 px-4 lg:px-8 text-center lg:text-left overflow-hidden">
      <div className="container mx-auto max-w-4xl lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start"
        >
          <h1 className="font-serif text-[40px] md:text-7xl lg:text-[76px] leading-[1.05] md:leading-[1.1] lg:leading-[1.05] text-dark font-semibold mb-4 md:mb-6 tracking-tight">
            Welcome to your<br />home in the hills
          </h1>
          <motion.p
            className="text-[17px] md:text-2xl lg:text-xl leading-snug text-text-muted max-w-2xl mx-auto lg:mx-0 mb-2 md:mb-4 px-2 lg:px-0 lg:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore our curated day-by-day itinerary for the perfect journey from Bangalore and around Chikmagalur.
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
            <div className="w-full h-[220px] rounded-3xl overflow-hidden shadow-sm group">
              <img src="/images/trip2.png" alt="Estate View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="w-full h-[200px] rounded-3xl overflow-hidden shadow-sm group">
              <img src="/images/trip3.png" alt="Scenic View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full h-[320px] rounded-3xl overflow-hidden shadow-sm group">
              <img src="/images/trip1.png" alt="Road Trip" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
