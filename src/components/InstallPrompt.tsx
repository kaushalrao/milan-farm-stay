"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="bg-dark text-white rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-airbnb-coral rounded-xl flex items-center justify-center shrink-0">
                <i className="ph-bold ph-download-simple text-xl text-white"></i>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-sm leading-tight">Install Offline App</h4>
                <p className="text-xs text-gray-300 mt-0.5 leading-tight">Access your itinerary without network.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPrompt(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title="Dismiss"
              >
                <i className="ph-bold ph-x text-[10px] text-white"></i>
              </button>
              <button
                onClick={handleInstallClick}
                className="bg-white text-dark px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
