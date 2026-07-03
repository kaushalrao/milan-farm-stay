export default function StaySection() {
  return (
    <section className="py-24 bg-cream" id="stay">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark mb-4">The Property</h2>
          <p className="text-lg text-text-muted">Experience the tranquility of a 50-acre coffee estate.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200&auto=format&fit=crop" 
              alt="Milan Farm Stay" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-4xl text-dark mb-6">Your Home in Nature</h3>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Wake up to the sound of birds and the aroma of fresh coffee. Our farm stay offers comfortable rooms with stunning views of the Western Ghats. Unwind by the bonfire under the starry sky.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3 font-medium text-lg">
                <i className="ph ph-coffee text-2xl text-forest-green"></i> Coffee Plantation
              </div>
              <div className="flex items-center gap-3 font-medium text-lg">
                <i className="ph ph-fire text-2xl text-forest-green"></i> Bonfire
              </div>
              <div className="flex items-center gap-3 font-medium text-lg">
                <i className="ph ph-bird text-2xl text-forest-green"></i> Bird Watching
              </div>
              <div className="flex items-center gap-3 font-medium text-lg">
                <i className="ph ph-tree text-2xl text-forest-green"></i> Nature Walk
              </div>
            </div>
            
            <a 
              href="https://airbnb.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-dark text-white rounded-2xl font-semibold text-lg transition-all hover:bg-black w-fit"
            >
              Book Now on Airbnb
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
