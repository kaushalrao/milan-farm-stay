"use client";

export default function ShareButton() {
  const shareText = `Hey! Here is the complete digital guide for our trip to Milan Farm Stay. 🌿🚗\n\nIt contains the route map, itinerary, and all important contact numbers (including our hosts, home-cooked food, and local delivery options).\n\n💡 *Tip:* Bookmark this link or add it to your home screen for quick offline-like access during the trip!`;
  const shareUrl = "https://milan-farm-stay.vercel.app/";
  const whatsappLink = "https://wa.me/?text=" + encodeURIComponent(shareText + "\n\n" + shareUrl);

  return (
    <section className="pb-8 pt-2 md:py-12 px-4 md:px-6 relative z-10" id="share">
      <div className="container mx-auto max-w-4xl relative">
        <div className="flex items-center gap-4 mb-6 md:mb-10">
          <div className="flex-1 h-px bg-border"></div>
          <h3 className="font-serif text-lg md:text-2xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">Share Guide</h3>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="bg-white/95 backdrop-blur-md border border-green-100 rounded-[1.5rem] p-5 md:p-6 shadow-lg shadow-green-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <i className="ph-fill ph-paper-plane-tilt absolute -top-4 -right-4 text-[120px] text-green-500/[0.03] rotate-[-15deg] pointer-events-none"></i>
          
          <div className="hidden md:flex w-14 h-14 shrink-0 bg-green-50 rounded-2xl items-center justify-center text-green-600 text-2xl shadow-sm border border-green-100">
            <i className="ph-fill ph-share-network"></i>
          </div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <p className="text-text-muted text-[15px] md:text-base leading-snug">
              Send this itinerary to your travel companions so everyone stays on track.
            </p>
          </div>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 w-full md:w-auto px-6 md:px-8 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold text-[17px] transition-all hover:bg-[#20b858] hover:-translate-y-0.5 shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/40 relative z-10"
          >
            <i className="ph-fill ph-whatsapp-logo text-[22px]"></i> Share on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
