"use client";
import { useState } from "react";
import CookModal from "./CookModal";

export default function HomeCook() {
  const [cookModalOpen, setCookModalOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm flex flex-col justify-between border border-green-100/50 relative overflow-hidden group hover:shadow-md transition-shadow">
      {/* Decorative leaf background */}
      <i className="ph-fill ph-leaf absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-green-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>
      <i className="ph-fill ph-leaf absolute -left-10 -top-10 text-[120px] md:text-[140px] text-green-500/[0.02] rotate-[45deg] pointer-events-none"></i>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 md:gap-4 mb-5 text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-50 to-green-100/50 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm border border-green-100 shrink-0">
            <i className="ph-fill ph-cooking-pot"></i>
          </div>
          <div>
            <h4 className="font-serif text-[19px] md:text-3xl font-semibold text-dark mb-0.5 leading-tight">Home Cooked Veg Meals</h4>
            <div className="flex items-center gap-1.5">
              <i className="ph-fill ph-chef-hat text-green-600 text-[10px] md:text-sm"></i>
              <span className="text-[11px] md:text-sm font-medium text-text-muted leading-tight">Prepared by our trusted vendor, Prasad</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50/40 border border-green-100/60 p-3.5 md:p-5 rounded-xl md:rounded-2xl mb-5 backdrop-blur-sm">
          <ul className="space-y-2.5 md:space-y-3">
            <li className="flex justify-between items-center text-dark border-b border-green-100/50 pb-2.5 md:pb-3">
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-coffee text-green-600/70 text-lg md:text-xl"></i> Breakfast</span>
              <span className="text-[10px] md:text-xs bg-white text-green-700 px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full shadow-sm font-semibold border border-green-100 uppercase tracking-wide">Complementary</span>
            </li>
            <li className="flex justify-between items-center text-dark border-b border-green-100/50 pb-2.5 md:pb-3">
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-bowl-food text-green-600/70 text-lg md:text-xl"></i> Lunch</span>
              <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full shadow-sm font-medium border border-border/50">Pre-order 4hrs prior</span>
            </li>
            <li className="flex justify-between items-center text-dark">
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-moon-stars text-green-600/70 text-lg md:text-xl"></i> Dinner</span>
              <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full shadow-sm font-medium border border-border/50">Pre-order 4hrs prior</span>
            </li>
          </ul>
        </div>
      </div>

      <button onClick={() => setCookModalOpen(true)} className="relative z-10 flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl text-sm md:text-base font-semibold transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
        <i className="ph-fill ph-whatsapp-logo text-lg md:text-xl"></i> Contact Prasad
      </button>

      <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />
    </div>
  );
}
