export default function FoodSection() {
  return (
    <section className="py-24" id="food">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark mb-4">Local Flavors</h2>
          <p className="text-lg text-text-muted">Authentic Malnad cuisine and our favorite dining spots.</p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          
          <div className="flex-none w-[300px] md:w-[350px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow snap-start">
            <div className="h-[200px] w-full">
              <img src="https://images.unsplash.com/photo-1626804475297-41609ea265eb?q=80&w=800&auto=format&fit=crop" alt="Local Breakfast" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Veg</span>
                <span className="text-text-muted font-medium">₹₹</span>
              </div>
              <h4 className="text-xl font-semibold text-dark mb-1">Farmhouse Breakfast</h4>
              <p className="text-sm text-text-muted mb-4">Authentic Malnad</p>
              <p className="text-sm bg-cream p-2 rounded text-dark font-medium mb-4 flex items-center gap-2">
                <i className="ph-fill ph-star text-airbnb-coral"></i> Must try: Akki Roti
              </p>
              <a href="#" className="inline-flex items-center gap-2 font-medium text-airbnb-coral hover:translate-x-1 transition-transform">
                View on Map <i className="ph ph-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="flex-none w-[300px] md:w-[350px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow snap-start">
            <div className="h-[200px] w-full">
              <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop" alt="Estate Coffee" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Veg</span>
                <span className="text-text-muted font-medium">₹</span>
              </div>
              <h4 className="text-xl font-semibold text-dark mb-1">Estate Filter Coffee</h4>
              <p className="text-sm text-text-muted mb-4">Beverage</p>
              <p className="text-sm bg-cream p-2 rounded text-dark font-medium flex items-center gap-2">
                <i className="ph-fill ph-star text-airbnb-coral"></i> Must try: Jaggery Coffee
              </p>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
