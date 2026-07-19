export default function Contacts() {
  return (
    <section className="py-24 bg-cream" id="help">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark mb-4">Need Help?</h2>
          <p className="text-lg text-text-muted">We're always here for you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-forest-green text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="text-xs uppercase tracking-wider text-white/70 mb-1">Host</h5>
              <h4 className="text-3xl font-serif mb-6">Athula Rao K</h4>
            </div>
            <div className="flex gap-3">
              <a href="tel:+919448244666" className="w-12 h-12 rounded-full bg-warm-white text-dark flex justify-center items-center text-xl hover:shadow-md hover:-translate-y-1 transition-all"><i className="ph-fill ph-phone"></i></a>
              <a href="https://wa.me/919448244666" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex justify-center items-center text-xl hover:shadow-md hover:-translate-y-1 transition-all"><i className="ph-fill ph-whatsapp-logo"></i></a>
            </div>
          </div>

          <div className="bg-warm-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="text-xs uppercase tracking-wider text-text-muted mb-1">Caretaker</h5>
              <h4 className="text-2xl font-serif text-dark mb-6">Prasad Halekote</h4>
            </div>
            <div className="flex gap-3">
              <a href="tel:+919482214882" className="w-12 h-12 rounded-full bg-cream text-dark flex justify-center items-center text-xl hover:shadow-md hover:-translate-y-1 transition-all"><i className="ph-fill ph-phone"></i></a>
            </div>
          </div>

          <div className="bg-warm-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="text-xs uppercase tracking-wider text-text-muted mb-1">Emergency</h5>
              <h4 className="text-2xl font-serif text-dark mb-6">Mudigere Police</h4>
            </div>
            <div className="flex gap-3">
              <a href="tel:100" className="w-12 h-12 rounded-full bg-cream text-dark flex justify-center items-center text-xl hover:shadow-md hover:-translate-y-1 transition-all"><i className="ph-fill ph-phone"></i></a>
            </div>
          </div>

          <div className="bg-warm-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="text-xs uppercase tracking-wider text-text-muted mb-1">Hospital</h5>
              <h4 className="text-2xl font-serif text-dark mb-6">Govt. Hospital</h4>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-12 h-12 rounded-full bg-cream text-dark flex justify-center items-center text-xl hover:shadow-md hover:-translate-y-1 transition-all"><i className="ph-fill ph-map-pin"></i></a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
