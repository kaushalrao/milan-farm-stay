"use client";
import { motion } from "framer-motion";

export default function HomeDelivery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm flex flex-col justify-between border border-orange-100/50 relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      {/* Decorative background */}
      <i className="ph-fill ph-package absolute -right-6 -bottom-6 text-[160px] md:text-[240px] text-orange-500/[0.03] rotate-[-15deg] pointer-events-none transition-transform duration-700 group-hover:scale-110"></i>
      <i className="ph-fill ph-shopping-bag absolute -left-10 -top-10 text-[120px] md:text-[140px] text-orange-500/[0.02] rotate-[45deg] pointer-events-none"></i>

      <div className="relative z-10">
        <div className="flex items-center gap-3 md:gap-4 mb-5 text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-50 to-orange-100/50 text-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm border border-orange-100 shrink-0">
            <i className="ph-fill ph-package"></i>
          </div>
          <div>
            <h4 className="font-serif text-[19px] md:text-3xl font-semibold text-dark mb-0.5 leading-tight">Home Delivery</h4>
            <div className="flex items-center gap-1.5">
              <i className="ph-fill ph-user text-orange-600 text-[10px] md:text-sm"></i>
              <span className="text-[11px] md:text-sm font-medium text-text-muted leading-tight">Delivered by Manjunath</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/40 border border-orange-100/60 p-3.5 md:p-5 rounded-xl md:rounded-2xl mb-5 backdrop-blur-sm">
          <ul className="space-y-2.5 md:space-y-3">
            <li className="flex justify-between items-center text-dark border-b border-orange-100/50 pb-2.5 md:pb-3">
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-shopping-cart text-orange-600/70 text-lg md:text-xl"></i> Items</span>
              <span className="text-[10px] md:text-xs bg-white text-dark px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full shadow-sm font-semibold border border-border/50 tracking-wide">Food & Groceries</span>
            </li>
            <li className="flex justify-between items-center text-dark border-b border-orange-100/50 pb-2.5 md:pb-3">
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-medium"><i className="ph-fill ph-motorcycle text-orange-600/70 text-lg md:text-xl"></i> Delivery Fee</span>
              <span className="text-[10px] md:text-xs bg-white text-text-muted px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full shadow-sm font-medium border border-border/50">Varies by distance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex relative z-10">
        <motion.a
          whileTap={{ scale: 0.97 }}
          href="tel:+919702545810"
          className="w-full flex items-center justify-center gap-2 py-3 bg-cream text-dark border border-border/50 rounded-xl text-sm md:text-base font-semibold transition-all hover:bg-soft-beige shadow-sm hover:-translate-y-1"
        >
          <i className="ph-fill ph-phone text-lg md:text-xl"></i> Call
        </motion.a>
      </div>

    </motion.div>
  );
}
