export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          <div className="max-w-xs">
            <h3 className="font-serif text-2xl font-semibold mb-3">Milan Farm Stays</h3>
            <p className="text-white/70">
              Curated road trips, hidden gems & unforgettable coffee estate experiences.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-map-pin text-xl"></i> Google Maps
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-whatsapp-logo text-xl"></i> WhatsApp
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-phone text-xl"></i> Call Us
            </a>
          </div>

        </div>

        <div className="text-center pt-8 border-t border-white/10 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Milan Farm Stays. Designed for guests.</p>
        </div>
      </div>
    </footer>
  );
}
