"use client";
import { useState } from "react";

import { faqs } from "../config/data";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark">FAQ</h2>
        </div>
        
        <div className="flex flex-col border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left text-lg font-medium text-dark hover:text-airbnb-coral transition-colors"
              >
                {faq.q}
                <i className={`ph ph-caret-down transition-transform duration-300 \${openIdx === i ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 \${openIdx === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-text-muted">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
