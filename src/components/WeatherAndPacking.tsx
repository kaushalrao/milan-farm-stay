export default function WeatherAndPacking() {
  return (
    <section className="py-24 bg-cream dark:bg-[#121212]" id="prep">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-warm-white dark:bg-[#1A1A1A] dark:border dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="font-serif text-3xl text-dark dark:text-white mb-6">Current Weather</h3>
            <div className="flex items-center gap-8 mb-8">
              <i className="ph-fill ph-cloud-sun text-[5rem] text-[#FDB813]"></i>
              <div className="flex items-start">
                <span className="text-[5rem] font-light leading-none text-dark dark:text-white">24°</span>
                <span className="text-2xl mt-2 font-medium text-text-muted">C</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-8 border-t border-border pt-6">
              <div className="flex items-center gap-3 text-text-muted text-lg">
                <i className="ph ph-sun text-2xl"></i>
                <span>Sunrise: 6:15 AM</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted text-lg">
                <i className="ph ph-moon text-2xl"></i>
                <span>Sunset: 6:45 PM</span>
              </div>
            </div>
            <p className="text-lg"><strong>Best Time to Visit:</strong> Sept - Feb</p>
          </div>

          <div className="bg-warm-white dark:bg-[#1A1A1A] dark:border dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="font-serif text-3xl text-dark dark:text-white mb-8">What to Pack</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              {[
                { icon: "ph-sneaker", label: "Shoes" },
                { icon: "ph-jacket", label: "Jacket" },
                { icon: "ph-umbrella", label: "Umbrella" },
                { icon: "ph-battery-charging", label: "Power Bank" },
                { icon: "ph-camera", label: "Camera" },
                { icon: "ph-pill", label: "Medicines" },
                { icon: "ph-money", label: "Cash" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-16 h-16 rounded-full bg-cream dark:bg-[#121212] flex items-center justify-center text-muted-terracotta text-3xl">
                    <i className={`ph \${item.icon}`}></i>
                  </div>
                  <span className="text-sm font-medium text-dark dark:text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
