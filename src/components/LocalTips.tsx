export default function LocalTips() {
  const tips = [
    { icon: "ph-wifi-slash", title: "Network Availability", desc: "Airtel works best. Jio is patchy. Enjoy the digital detox!" },
    { icon: "ph-qr-code", title: "Payments", desc: "UPI is widely accepted, but carry cash for remote shops." },
    { icon: "ph-steering-wheel", title: "Road Conditions", desc: "The last 2km to the estate is an off-road path. Drive slow." },
    { icon: "ph-camera-plus", title: "Photography", desc: "Early mornings (6:30 AM) offer the best mist in the coffee estate." },
  ];

  return (
    <section className="py-24" id="tips">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark">Local Tips</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-soft-beige p-6 rounded-2xl">
              <i className={`ph \${tip.icon} text-4xl text-coffee-brown mb-4 block`}></i>
              <h4 className="text-xl font-semibold text-dark mb-2">{tip.title}</h4>
              <p className="text-text-muted leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
