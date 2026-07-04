import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripCards from "@/components/TripCards";
import HomeCook from "@/components/HomeCook";
import HostProfile from "@/components/HostProfile";
import ShareButton from "@/components/ShareButton";
import Footer from "@/components/Footer";
import MobileFABs from "@/components/MobileFABs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TripCards />

        <section className="pt-8 pb-8" id="contacts">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-dark mb-4">Your Hosts at Milan Farm Stays</h2>
              <p className="text-text-muted text-lg">We are here to ensure you have a wonderful and comfortable stay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HostProfile />
              <HomeCook />
            </div>
          </div>
        </section>

        <ShareButton />
      </main>
      <Footer />
      <MobileFABs />
    </>
  );
}
