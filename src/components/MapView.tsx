"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// To automatically fit all markers in view
function MapBounds({ stops }: { stops: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = L.latLngBounds(stops.filter(s => s.lat && s.lng).map(s => [s.lat, s.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], animate: true, duration: 1 });
      }
    }
  }, [stops, map]);
  return null;
}

export default function MapView({ stops }: { stops: any[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return <div className="h-[500px] w-full bg-soft-beige rounded-2xl animate-pulse"></div>;

  const validStops = stops.filter(s => s.lat && s.lng);
  const routePositions = validStops
    .filter(s => {
      const cat = (s.category || "").toLowerCase();
      const isFood = cat.includes("veg") || cat.includes("cuisine") || cat.includes("food") || cat.includes("restaurant") || cat.includes("cafe");
      return !isFood;
    })
    .map(s => [s.lat, s.lng] as [number, number]);

  const createIcon = (index: number, category?: string) => {
    const cat = (category || "").toLowerCase();
    const isFood = cat.includes("veg") || cat.includes("cuisine") || cat.includes("food") || cat.includes("restaurant") || cat.includes("cafe");
    
    let content = `${index + 1}`;
    let bgColor = "#ff5a5f"; // Default coral/red for sightseeing
    
    if (isFood) {
      content = `<i class="ph-bold ph-fork-knife" style="font-size: 14px;"></i>`;
      bgColor = "#10b981"; // Emerald green for food
    }

    return L.divIcon({
      className: "custom-leaflet-icon",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
      html: `<div style="background-color: ${bgColor}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white;">${content}</div>`
    });
  };

  return (
    <div className="h-[500px] w-full md:h-[600px] lg:h-full bg-soft-beige rounded-2xl md:rounded-3xl overflow-hidden relative shadow-inner">
      <MapContainer 
        center={routePositions[0] || [13.3, 75.7]} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapBounds stops={[...validStops, { lat: 13.1524102, lng: 75.6523835 }]} />

        {/* Draw Milan Farm Stay Home Marker */}
        <Marker 
          position={[13.1524102, 75.6523835]}
          icon={L.divIcon({
            className: "custom-leaflet-icon",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
            html: `<div style="background-color: #2C4A3B; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.4); border: 2px solid white;"><i class="ph-fill ph-house"></i></div>`
          })}
        >
          <Popup className="custom-popup" closeButton={false} minWidth={220} maxWidth={220}>
            <div className="flex flex-col w-[220px]">
              <div className="p-3 text-center">
                <div className="w-10 h-10 bg-green-50 dark:bg-white/5 text-green-700 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-100 dark:border-white/10">
                  <i className="ph-fill ph-house text-xl"></i>
                </div>
                <h3 className="font-serif font-bold text-dark dark:text-white text-[16px] leading-tight mb-1">Milan Farm Stays</h3>
                <p className="text-[11px] text-text-muted mb-3">Your beautiful home base.</p>
                <a href="https://maps.app.goo.gl/zvLZC6bhSsjBys9p7" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-cream dark:bg-white/5 text-dark dark:text-white dark:border dark:border-white/10 py-2 rounded-xl text-xs font-bold transition-colors hover:bg-soft-beige dark:hover:bg-white/10">
                  Open in Maps
                </a>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Draw the connecting route */}
        {routePositions.length > 1 && (
          <Polyline 
            positions={routePositions} 
            color="#ff5a5f" 
            weight={4} 
            opacity={0.8}
            dashArray="10, 10" 
          />
        )}

        {/* Draw the stops */}
        {validStops.map((stop, idx) => (
          <Marker 
            key={idx} 
            position={[stop.lat, stop.lng]}
            icon={createIcon(idx, stop.category)}
          >
            <Popup className="custom-popup" closeButton={false} minWidth={250} maxWidth={250}>
              <div className="flex flex-col w-[250px]">
                {stop.img && (
                  <div className="w-full h-[110px] relative">
                    <img src={stop.img} alt={stop.title} className="w-full h-full object-cover rounded-t-[15px]" />
                    <span className="absolute top-2 left-2 bg-warm-white/95 dark:bg-[#1A1A1A]/90 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center text-[9px] font-bold uppercase text-dark dark:text-white dark:border dark:border-white/10 shadow-sm">
                      {stop.category}
                    </span>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-serif font-bold text-dark dark:text-white text-[15px] leading-tight mb-2 line-clamp-2">{stop.title}</h3>
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted font-medium mb-3">
                    {stop.drivingTime && stop.drivingTime !== "N/A" && (
                      <span className="flex items-center gap-1 text-airbnb-coral"><i className="ph-bold ph-car"></i> {stop.drivingTime}</span>
                    )}
                    {stop.duration && stop.duration !== "N/A" && (
                      <span className="flex items-center gap-1"><i className="ph-bold ph-clock"></i> {stop.duration}</span>
                    )}
                  </div>
                  {stop.mapsUrl && (
                    <a href={stop.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-cream dark:bg-white/5 text-dark dark:text-white dark:border dark:border-white/10 py-2 rounded-xl text-xs font-bold transition-colors hover:bg-soft-beige dark:hover:bg-white/10">
                      Open in Maps
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
