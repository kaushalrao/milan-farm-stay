"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CookModal from "./CookModal";

export default function HomeCook() {
  const [cookModalOpen, setCookModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm flex flex-col border border-green-100/50 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <i className="ph-fill ph-leaf absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-green-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>
      
      <div className="flex items-center gap-3.5 md:gap-4 relative z-10 text-left">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-50 to-green-100/50 text-green-600 rounded-full md:rounded-2xl flex items-center justify-center text-[22px] md:text-3xl shadow-sm border border-green-100 shrink-0">
          <i className="ph-fill ph-cooking-pot"></i>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h4 className="font-serif text-[17px] md:text-2xl font-semibold text-dark mb-0.5 md:mb-1 leading-tight truncate">Home Cooked Veg Meals</h4>
          <div className="flex items-center gap-1 md:gap-1.5">
            <i className="ph-fill ph-chef-hat text-green-600 text-[12px] md:text-base"></i>
            <span className="text-[10px] md:text-sm font-bold md:font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal truncate">Prasad</span>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); setCookModalOpen(true); }}
            className="w-[38px] h-[38px] flex items-center justify-center bg-dark text-white hover:bg-black rounded-full transition-colors shadow-sm"
          >
            <i className="ph-fill ph-phone text-[18px]"></i>
          </button>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-cream text-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <i className="ph-bold ph-caret-down text-sm"></i>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-cream text-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <i className="ph-bold ph-caret-down text-base"></i>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="relative z-10 overflow-hidden"
          >
            <div className="bg-green-50/40 border border-green-100/60 p-3.5 md:p-5 rounded-xl md:rounded-2xl mb-4 backdrop-blur-sm">
              <ul className="space-y-2.5 md:space-y-3">
                <li className="flex justify-between items-center text-dark border-b border-green-100/50 pb-2.5 md:pb-3">
                  <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-coffee text-green-600/70 text-lg md:text-xl"></i> Breakfast</span>
                  <span className="text-[10px] md:text-xs bg-white text-green-700 px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm font-semibold border border-green-100 uppercase tracking-wide">Complementary</span>
                </li>
                <li className="flex justify-between items-center text-dark border-b border-green-100/50 pb-2.5 md:pb-3">
                  <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-bowl-food text-green-600/70 text-lg md:text-xl"></i> Lunch</span>
                  <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm font-medium border border-border/50">Pre-order 4hrs prior</span>
                </li>
                <li className="flex justify-between items-center text-dark">
                  <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-moon-stars text-green-600/70 text-lg md:text-xl"></i> Dinner</span>
                  <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm font-medium border border-border/50">Pre-order 4hrs prior</span>
                </li>
              </ul>
            </div>

            <button onClick={(e) => { e.stopPropagation(); setCookModalOpen(true); }} className="hidden md:flex items-center justify-center gap-2 w-full py-3 bg-dark text-white rounded-xl text-base font-semibold transition-all hover:bg-black shadow-sm hover:-translate-y-1">
              <i className="ph-fill ph-phone text-xl"></i> Contact Prasad
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />
    </div>
  );
}
