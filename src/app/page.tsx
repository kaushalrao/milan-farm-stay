import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripCards from "@/components/TripCards";
import StaySection from "@/components/StaySection";
import HomeCook from "@/components/HomeCook";
import HomeDelivery from "@/components/HomeDelivery";
import JioMartDelivery from "@/components/JioMartDelivery";
import HostProfile from "@/components/HostProfile";
import ShareButton from "@/components/ShareButton";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

import TravelRentalsCard from "@/components/TravelRentalsCard";
import CoffeeShowcaseCard from "@/components/CoffeeShowcaseCard";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  const t = useTranslations("Page");
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TripCards />

        {/* Section 1: Contacts / Meet Your Hosts */}
        <section className="pt-2 md:pt-6 pb-2 md:pb-4 scroll-mt-24" id="contacts">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl lg:max-w-7xl">
            <div className="flex items-center gap-4 mb-3 md:mb-5">
              <div className="flex-1 h-px bg-border"></div>
              <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
                {t("yourHosts")}
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Host Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto lg:max-w-5xl items-stretch">
              <HostProfile
                id="host-athula"
                name={t("host1Name")}
                role={t("host1Role")}
                image="/images/athula_profile.jpeg"
                imgClass="w-full h-full object-cover scale-[1.7] origin-[30%_20%]"
                desc={t("host1Desc")}
                years={t("host1Years")}
                phone="9448244666"
              />
              <HostProfile
                id="host-kaushal"
                name={t("host2Name")}
                role={t("host2Role")}
                image="/images/kaushal.jpg"
                desc={t("host2Desc")}
                years={t("host2Years")}
                phone="9448632666"
              />
            </div>
          </div>
        </section>

        {/* Food & Delivery Section (including Estate Coffee) */}
        <section className="pt-2 pb-5 md:pt-4 md:pb-6 scroll-mt-24" id="food">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl lg:max-w-7xl">
            <div className="flex items-center gap-4 mb-3 md:mb-5">
              <div className="flex-1 h-px bg-border"></div>
              <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
                {t("foodAndDelivery")}
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
              <HomeCook />
              <HomeDelivery />
              <JioMartDelivery />
              <CoffeeShowcaseCard />
            </div>
          </div>
        </section>

        <section className="pt-2 pb-5 md:pt-4 md:pb-6 scroll-mt-24" id="taxi">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl lg:max-w-7xl">
            <div className="flex items-center gap-4 mb-4 md:mb-5">
              <div className="flex-1 h-px bg-border"></div>
              <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
                {t("travelAndRentals")}
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <TravelRentalsCard />
          </div>
        </section>

        <StaySection />

        <ShareButton />
      </main>
      <Footer />
      <MobileBottomNav />
      
    </>
  );
}
