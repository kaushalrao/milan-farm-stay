"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=13.3161&longitude=75.7720&current_weather=true";

function getWeatherDetails(code: number, isDay: number) {
  if (code === 0) return { label: "Clear Sky", icon: isDay ? "ph-sun" : "ph-moon" };
  if (code <= 3) return { label: "Partly Cloudy", icon: isDay ? "ph-cloud-sun" : "ph-cloud-moon" };
  if (code <= 48) return { label: "Foggy", icon: "ph-cloud-fog" };
  if (code <= 57) return { label: "Drizzle", icon: "ph-cloud-rain" };
  if (code <= 67) return { label: "Rainy", icon: "ph-cloud-rain" };
  if (code <= 77) return { label: "Snow", icon: "ph-snowflake" };
  if (code <= 82) return { label: "Heavy Rain", icon: "ph-cloud-lightning" };
  return { label: "Thunderstorm", icon: "ph-cloud-lightning" };
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
    <div className="h-[60px] flex justify-center mt-8">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[200px] h-[52px] bg-border/40 rounded-full animate-pulse"
          />
        ) : weather ? (
          <motion.div
            key="widget"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-border hover:shadow-md transition-all cursor-default"
          >
            <i className={`ph-fill ${getWeatherDetails(weather.weathercode, weather.is_day).icon} text-2xl text-airbnb-coral`}></i>
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-bold text-dark leading-none">{Math.round(weather.temperature)}°C</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted mt-0.5">{getWeatherDetails(weather.weathercode, weather.is_day).label}</span>
            </div>
            <div className="w-[1px] h-6 bg-border mx-1"></div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-bold text-dark leading-none">Chikmagalur</span>
              <span className="text-[10px] text-text-muted mt-0.5 font-medium">Current Weather</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
