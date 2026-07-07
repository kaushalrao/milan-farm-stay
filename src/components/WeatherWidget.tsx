"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=13.3161&longitude=75.7720&current_weather=true";

function getWeatherDetails(code: number, isDay: number) {
  if (code === 0) return { label: "Clear Sky", icon: isDay ? "ph-sun" : "ph-moon", tips: "Pack sunglasses, sunscreen, and a cap for the bright sun." };
  if (code <= 3) return { label: "Partly Cloudy", icon: isDay ? "ph-cloud-sun" : "ph-cloud-moon", tips: "Perfect weather! A light jacket and comfortable walking shoes." };
  if (code <= 48) return { label: "Foggy", icon: "ph-cloud-fog", tips: "Visibility is low. Carry a windcheater and warm layers." };
  if (code <= 57) return { label: "Drizzle", icon: "ph-cloud-rain", tips: "Light drizzle. Carry an umbrella or a light raincoat." };
  if (code <= 67) return { label: "Rainy", icon: "ph-cloud-rain", tips: "It's raining! Pack a sturdy umbrella, raincoat, and waterproof shoes." };
  if (code <= 77) return { label: "Snow", icon: "ph-snowflake", tips: "Very cold. Pack heavy winter wear and gloves." };
  if (code <= 82) return { label: "Heavy Rain", icon: "ph-cloud-lightning", tips: "Heavy rains expected. Stay dry with full rain gear and waterproof bags." };
  return { label: "Thunderstorm", icon: "ph-cloud-lightning", tips: "Thunderstorms ahead. Carry rain gear and try to avoid open areas." };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(WEATHER_API)
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex justify-center mt-4 md:mt-6 mb-2">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-border/50 shadow-sm"
          >
            <i className="ph ph-spinner-gap text-airbnb-coral text-xl animate-spin"></i>
            <span className="text-[13px] font-medium text-text-muted">Fetching local weather...</span>
          </motion.div>
        ) : weather ? (
          <motion.div
            key="widget"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-border hover:shadow-md transition-all cursor-default">
              <i className={`ph-fill ${getWeatherDetails(weather.weathercode, weather.is_day).icon} text-[22px] md:text-2xl text-airbnb-coral`}></i>
              <div className="flex flex-col text-left">
                <span className="text-[14px] md:text-[15px] font-bold text-dark leading-none">{Math.round(weather.temperature)}°C</span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-text-muted mt-0.5">{getWeatherDetails(weather.weathercode, weather.is_day).label}</span>
              </div>
              <div className="w-[1px] h-6 bg-border mx-1"></div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] md:text-[13px] font-bold text-dark leading-none">Chikmagalur</span>
                <span className="text-[9px] md:text-[10px] text-text-muted mt-0.5 font-medium">Current Weather</span>
              </div>
            </div>
            
            <div className="text-[10px] md:text-xs font-medium text-text-main bg-soft-beige px-3 py-1.5 md:px-4 rounded-full border border-border/50 flex items-center gap-1.5 shadow-sm max-w-[90vw] text-center">
              <i className="ph-fill ph-backpack text-airbnb-coral text-[12px] md:text-[14px] shrink-0"></i>
              <span className="truncate">{getWeatherDetails(weather.weathercode, weather.is_day).tips}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
