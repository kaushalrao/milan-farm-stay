export default function HostProfile() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between border border-border">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-airbnb-coral/20 ring-offset-2">
            <img src="/images/athula.png" alt="Host Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-serif text-2xl font-semibold text-dark mb-1">Athula Rao K</h4>
            <div className="flex items-center gap-1.5">
              <i className="ph-fill ph-medal text-airbnb-coral"></i>
              <span className="text-sm font-medium text-text-muted">Superhost</span>
            </div>
          </div>
        </div>

        <div className="bg-soft-beige/30 p-4 rounded-2xl mb-6">
          <div className="flex justify-between items-center text-dark">
            <span className="flex items-center gap-2 font-medium">
              <i className="ph ph-shield-check text-airbnb-coral text-lg"></i> 24/7 Support
            </span>
            <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm font-medium text-text-muted border border-border/30">
              Emergency Contact
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <a href="tel:+919448244666" className="flex-[1] flex items-center justify-center gap-2 py-3 bg-cream text-dark hover:bg-soft-beige rounded-xl font-semibold transition-transform hover:-translate-y-1 shadow-sm border border-border/50">
          <i className="ph-fill ph-phone text-xl"></i> Call
        </a>
        <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex-[1.5] flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-semibold transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md">
          <i className="ph-fill ph-whatsapp-logo text-xl"></i> WhatsApp
        </a>
      </div>
    </div>
  );
}
