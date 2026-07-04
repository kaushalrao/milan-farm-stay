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

            <div className="grid grid-cols-2 gap-3 md:gap-8 mb-6 md:mb-8">
              <HostProfile
                name="Athula Rao K"
                role="Host"
                image="/images/athula_profile.jpeg"
                imgClass="w-full h-full object-cover scale-[1.7] origin-[30%_20%]"
                desc="Entrepreneur & Nature Enthusiast"
                years="Hosting for over 6 years"
                phone="9448244666"
              />
              <HostProfile
                name="Kaushal Kudpi"
                role="Co-Host"
                image="/images/kaushal.jpg"
                desc="Software Engineer & Outdoor Enthusiast"
                years="Hosting for over 6 years"
                phone="9448632666"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
