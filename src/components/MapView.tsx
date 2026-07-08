"use client";
import React, { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[500px] w-full bg-soft-beige rounded-2xl animate-pulse"></div>;

  const validStops = stops.filter(s => s.lat && s.lng);
  const routePositions = validStops.map(s => [s.lat, s.lng] as [number, number]);

  const createIcon = (index: number) => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `<div style="background-color: #ff5a5f; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; transform: translate(-14px, -14px);">${index + 1}</div>`
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
        
        <MapBounds stops={validStops} />

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
            icon={createIcon(idx)}
          >
            <Popup className="custom-popup" closeButton={false} minWidth={250} maxWidth={250}>
              <div className="flex flex-col w-[250px]">
                {stop.img && (
                  <div className="w-full h-[110px] relative">
                    <img src={stop.img} alt={stop.title} className="w-full h-full object-cover rounded-t-[15px]" />
                    <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center text-[9px] font-bold uppercase text-dark shadow-sm">
                      {stop.category}
                    </span>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-serif font-bold text-dark text-[15px] leading-tight mb-2 line-clamp-2">{stop.title}</h3>
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted font-medium mb-3">
                    {stop.drivingTime && stop.drivingTime !== "N/A" && (
                      <span className="flex items-center gap-1 text-airbnb-coral"><i className="ph-bold ph-car"></i> {stop.drivingTime}</span>
                    )}
                    {stop.duration && stop.duration !== "N/A" && (
                      <span className="flex items-center gap-1"><i className="ph-bold ph-clock"></i> {stop.duration}</span>
                    )}
                  </div>
                  {stop.mapsUrl && (
                    <a href={stop.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-cream text-dark py-2 rounded-xl text-xs font-bold transition-colors hover:bg-soft-beige">
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
