"use client";
import { useEffect } from "react";

export default function CookModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-warm-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-cream text-dark hover:bg-border transition-colors">
          <i className="ph-bold ph-x"></i>
        </button>
        <div className="w-12 h-12 bg-airbnb-coral/10 text-airbnb-coral rounded-full flex items-center justify-center text-2xl mb-4">
          <i className="ph-fill ph-cooking-pot"></i>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-dark mb-2">Pre-order Meals</h3>
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          Please note that lunch and dinner require prior notice as meals are freshly prepared and are <strong className="text-airbnb-coral font-bold">payable directly to vendor</strong>
        </p>
        <div className="flex flex-col gap-3 w-full">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+919482214882"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 bg-dark text-warm-white rounded-xl font-semibold transition-transform hover:-translate-y-1 text-sm"
            >
              <i className="ph-fill ph-device-mobile text-lg"></i> Mobile
            </a>
            <a
              href="tel:+919066902249"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-3 bg-dark text-warm-white rounded-xl font-semibold transition-transform hover:-translate-y-1 text-sm"
            >
              <i className="ph-fill ph-phone text-lg"></i> Home
            </a>
          </div>
          <a
            href="https://wa.me/919482214882?text=Hi%20Prasad,%20we%20are%20staying%20at%20Milan%20Farm%20Stay%20and%20would%20like%20to%20pre-order%20meals."
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold transition-transform hover:-translate-y-1"
          >
            <i className="ph-fill ph-whatsapp-logo text-xl"></i> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
