"use client";
import { useState } from "react";
import CookModal from "./CookModal";

export default function HomeCook() {
  const [cookModalOpen, setCookModalOpen] = useState(false);
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-border">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-cream text-airbnb-coral rounded-full flex items-center justify-center text-2xl">
            <i className="ph-fill ph-cooking-pot"></i>
          </div>
          <div>
            <h4 className="font-serif text-2xl font-semibold text-dark">Home Cooked Veg Meals</h4>
            <p className="text-sm text-text-muted">Prepared by our trusted vendor, Prasad</p>
          </div>
        </div>

        <div className="bg-soft-beige/30 p-4 rounded-2xl mb-6">
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-dark">
              <span className="flex items-center gap-2"><i className="ph ph-coffee text-text-muted"></i> Breakfast</span>
              <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">Complementary</span>
            </li>
            <li className="flex justify-between items-center text-dark">
              <span className="flex items-center gap-2"><i className="ph ph-bowl-food text-text-muted"></i> Lunch</span>
              <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">Pre-order before 4hrs</span>
            </li>
            <li className="flex justify-between items-center text-dark">
              <span className="flex items-center gap-2"><i className="ph ph-moon-stars text-text-muted"></i> Dinner</span>
              <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">Pre-order before 4hrs</span>
            </li>
          </ul>
        </div>
      </div>

      <button onClick={() => setCookModalOpen(true)} className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-medium transition-transform hover:-translate-y-1 shadow-sm">
        <i className="ph-fill ph-cooking-pot text-xl"></i> Contact Prasad
      </button>

      <CookModal isOpen={cookModalOpen} onClose={() => setCookModalOpen(false)} />
    </div>
  );
}
