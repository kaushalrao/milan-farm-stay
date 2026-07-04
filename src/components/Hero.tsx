export default function Hero() {
  return (
    <header className="pt-32 pb-8 md:pb-12 px-4 bg-cream text-center">
      <div className="container mx-auto max-w-4xl animate-[fadeUp_1s_ease-out_forwards]">
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-dark font-semibold mb-6">
          Road Trip to<br />Milan Farm Stays
        </h1>
        <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-12">
          Choose your stay duration to discover the perfect journey from Bangalore.
        </p>

        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[550px] rounded-[32px] overflow-hidden shadow-2xl">
          <img
            src="/images/hero.png"
            alt="Milan Farm Stay Drive"
            className="w-full h-full object-cover animate-[zoomOut_10s_ease-out_forwards]"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomOut {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
      `}} />
    </header>
  );
}
