"use client";

export default function ShareButton() {
  const shareText = "Check out our beautiful Road Trip Guide to Milan Farm Stay! 🚗🌿";
  const shareUrl = "https://milanfarmstay.com/guide"; // Placeholder URL
  const whatsappLink = "https://wa.me/?text=" + encodeURIComponent(shareText + " " + shareUrl);

  return (
    <section className="py-16 bg-cream border-t border-border">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h3 className="font-serif text-3xl text-dark mb-4">Share this Guide</h3>
        <p className="text-text-muted mb-8 text-lg">Send this itinerary to your travel companions so everyone stays on track.</p>
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-2xl font-semibold text-lg transition-all hover:bg-[#20b858] hover:-translate-y-1 hover:shadow-lg"
        >
          <i className="ph-fill ph-whatsapp-logo text-2xl"></i> Share on WhatsApp
        </a>
      </div>
    </section>
  );
}
