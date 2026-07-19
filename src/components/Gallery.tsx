"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const t = useTranslations("UI");
  const data = useTranslations("Data");
  const images = data.raw("galleryImages");

  return (
    <section className="py-24 bg-cream" id="gallery">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark">{t("gallery")}</h2>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src: string, i: number) => (
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
