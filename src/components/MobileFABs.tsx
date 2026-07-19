"use client";
import { useState, useEffect } from "react";
import CookModal from "./CookModal";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function MobileFABs() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookModalOpen, setCookModalOpen] = useState(false);
  const t = useTranslations("MobileFABs");

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('#help-menu-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div 
      id="help-menu-container" 
      className="fixed right-6 z-[99] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] bottom-[96px] md:bottom-6"
    >
      {/* Floating Menu */}
      <div
        className={"absolute bottom-20 right-0 w-64 bg-white rounded-2xl shadow-xl border border-border p-3 transition-all duration-300 origin-bottom-right " + (isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none')}
      >
        <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2 px-3 pt-2">{t("askUs")}</h4>
        <div className="flex flex-col gap-1">
          <a href="tel:+919448244666" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream transition-colors text-dark font-medium">
            <div className="w-8 h-8 rounded-full bg-soft-beige text-dark flex items-center justify-center shrink-0"><i className="ph-fill ph-phone"></i></div>
            {t("callHost")}
          </a>
          <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream transition-colors text-dark font-medium">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0"><i className="ph-fill ph-whatsapp-logo"></i></div>
            {t("whatsappHost")}
          </a>
          <button onClick={() => setCookModalOpen(true)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream transition-colors text-dark font-medium group w-full text-left">
            <div className="w-8 h-8 rounded-full bg-airbnb-coral/20 text-airbnb-coral flex items-center justify-center shrink-0 overflow-hidden">
              <Player src="/boiling-pot.json" autoplay loop style={{ height: '32px', width: '32px' }} />
            </div>
            {t("contactCook")}
          </button>
          <a href="tel:+919702545810" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream transition-colors text-dark font-medium">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-600 flex items-center justify-center shrink-0"><i className="ph-fill ph-package"></i></div>
            {t("contactDelivery")}
          </a>
          <div className="h-px bg-border my-1"></div>
          <a href="https://maps.app.goo.gl/27tXcbhyWdxo7We8A" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream transition-colors text-dark font-medium">
            <div className="w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center shrink-0"><i className="ph-fill ph-map-pin"></i></div>
            {t("milanFarmStays")}
          </a>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex items-center justify-center w-14 h-14 bg-dark text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-transform active:scale-95 hover:-translate-y-1"
        aria-label="Help Options"
      >
        <i className={`text-2xl ph-bold transition-transform duration-300 ${isOpen ? 'ph-x rotate-90 scale-90' : 'ph-question'}`}></i>
      </button>

      <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />
    </div>
  );
}
