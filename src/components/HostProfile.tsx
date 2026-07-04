export default function HostProfile() {
  return (
    <div className="bg-forest-green text-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl overflow-hidden shrink-0">
            <img src="/images/hero.png" alt="Host Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-serif text-3xl font-semibold mb-1">Athula Rao K</h4>
            <p className="text-white/80 text-sm">Your Superhost</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><i className="ph-fill ph-phone"></i></div>
            <p className="text-white/90">+91 9448244666</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><i className="ph-fill ph-shield-check"></i></div>
            <p className="text-white/90">Emergency Contact</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <a href="tel:+919448244666" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-forest-green rounded-xl font-medium transition-transform hover:-translate-y-1 shadow-sm">
          <i className="ph-fill ph-phone text-xl"></i> Call
        </a>
        <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex-[1.5] flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-medium transition-transform hover:-translate-y-1 shadow-sm">
          <i className="ph-fill ph-whatsapp-logo text-xl"></i> WhatsApp
        </a>
      </div>
    </div>
  );
}
