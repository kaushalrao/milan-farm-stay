"use client";
import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1524388631102-140b904ebfce?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621213079948-2b8104df04ee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627883238637-251cce66ebdd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601051515905-eb10bcebc11b?q=80&w=800&auto=format&fit=crop"
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-cream" id="gallery">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark">Gallery</h2>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow group" onClick={() => setSelectedImg(src)}>
              <img 
                src={src} 
                alt={`Gallery \${i}`} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-airbnb-coral transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <i className="ph ph-x"></i>
          </button>
          <img 
            src={selectedImg} 
            alt="Enlarged" 
            className="max-w-full max-h-[90vh] rounded-xl object-contain animate-[fadeIn_0.3s_ease-out]" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
