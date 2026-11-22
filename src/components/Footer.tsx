import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-[#111] text-white pt-6 pb-28 sm:pb-32 md:pt-10 md:pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/images/logo-emblem-dark.png"
                alt="Milan Farm Stays"
                width={36}
                height={36}
                className="w-9 h-9 object-contain shrink-0"
              />
              <h3 className="font-serif text-2xl font-semibold tracking-tight">{t("title")}</h3>
            </div>
            <p className="text-white/70">
              {t("desc")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/stay" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-house text-xl text-[#FF5A5F]"></i> {t("stays")}
            </Link>
            <Link href="/order-coffee" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-coffee text-xl text-[#d4a373]"></i> {t("coffee")}
            </Link>
            <Link href="/rentals" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-moped text-xl text-emerald-400"></i> {t("rentals")}
            </Link>
            <a href="https://maps.app.goo.gl/yzBY4r2cDHzE2JpY8" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-map-pin text-xl text-rose-400"></i> {t("googleMaps")}
            </a>
            <a href="https://wa.me/919448244666" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-whatsapp-logo text-xl text-[#25D366]"></i> {t("whatsapp")}
            </a>
            <a href="tel:+919448244666" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
              <i className="ph ph-phone text-xl text-sky-400"></i> {t("callUs")}
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
