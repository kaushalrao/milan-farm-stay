import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripCards from "@/components/TripCards";
import HomeCook from "@/components/HomeCook";
import HomeDelivery from "@/components/HomeDelivery";
import HostProfile from "@/components/HostProfile";
import ShareButton from "@/components/ShareButton";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

import TaxiCard from "@/components/TaxiCard";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  const t = useTranslations("Page");
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TripCards />

        <section className="pt-2 md:pt-8 pb-8 scroll-mt-24" id="contacts">
          <div className="container mx-auto px-6 max-w-5xl lg:max-w-7xl">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="flex-1 h-px bg-border"></div>
              <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
                <span className="lg:hidden">{t("yourHosts")}</span>
                <span className="hidden lg:inline">{t("propertyAndHost")}</span>
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-6 items-stretch">
              <HostProfile
                name={t("host1Name")}
                role={t("host1Role")}
                image="/images/athula_profile.jpeg"
                imgClass="w-full h-full object-cover scale-[1.7] origin-[30%_20%]"
                desc={t("host1Desc")}
                years={t("host1Years")}
                phone="9448244666"
              />
              <HostProfile
                name={t("host2Name")}
                role={t("host2Role")}
                image="/images/kaushal.jpg"
                desc={t("host2Desc")}
                years={t("host2Years")}
                phone="9448632666"
              />

              <div id="food" className="col-span-1 md:col-span-2 lg:hidden flex items-center gap-4 my-5 md:my-2 scroll-mt-24">
                <div className="flex-1 h-px bg-border"></div>
                <h3 className="font-serif text-lg md:text-2xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">{t("foodAndDelivery")}</h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <HomeCook />
              <HomeDelivery />
            </div>
          </div>
        </section>

        <section className="pb-8 md:pb-6 lg:pb-1" id="taxi">
          <div className="container mx-auto px-6 max-w-5xl lg:max-w-7xl">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="flex-1 h-px bg-border"></div>
              <h2 className="font-serif text-lg md:text-2xl lg:text-3xl font-semibold text-text-muted/80 tracking-wide text-center uppercase">
                {t("localTaxiServices")}
              </h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-6 items-stretch justify-center">
              <div className="lg:col-start-2">
                <TaxiCard name="Vishwanath Car Belagala" phone="+919481672571" />
              </div>
              <div className="lg:col-start-3">
                <TaxiCard name="Myaddi Isama Car" phone="+919880947313" />
              </div>
            </div>
          </div>
        </section>

        <ShareButton />
      </main>
      <Footer />
      <MobileBottomNav />
      
    </>
  );
}
