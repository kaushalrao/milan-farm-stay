import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-[#111] text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          <div className="max-w-xs">
            <h3 className="font-serif text-2xl font-semibold mb-3">{t("title")}</h3>
            <p className="text-white/70">
              {t("desc")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://maps.app.goo.gl/yzBY4r2cDHzE2JpY8" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-map-pin text-xl"></i> {t("googleMaps")}
            </a>
            <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-whatsapp-logo text-xl"></i> {t("whatsapp")}
            </a>
            <a href="tel:+919448244666" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-phone text-xl"></i> {t("callUs")}
            </a>
          </div>

        </div>

        <div className="text-center pt-8 border-t border-white/10 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} {t("title")}. {t("designedForGuests")}</p>
        </div>
      </div>
    </footer>
  );
}
