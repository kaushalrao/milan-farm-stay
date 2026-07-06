"use client";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";

export default function Hero() {
  return (
    <header className="pt-32 pb-8 md:pb-12 px-4 text-center">
      <motion.div
        className="container mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-dark font-semibold mb-6">
          Road Trip to<br />Milan Farm Stays
        </h1>
        <motion.p
          className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Explore our curated day-by-day itinerary for the perfect journey from Bangalore and around Chikmagalur.
        </motion.p>
        <WeatherWidget />
      </motion.div>
    </header>
  );
}
