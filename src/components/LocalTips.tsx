import { useTranslations } from "next-intl";

export default function LocalTips() {
  const t = useTranslations("UI");
  const data = useTranslations("Data");
  const tips = data.raw("localTips");

  return (
    <section className="py-24" id="tips">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-dark">{t("localTips")}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip: any, i: number) => (
            <div key={i} className="bg-soft-beige p-6 rounded-2xl">
              <i className={`ph \${tip.icon} text-4xl text-coffee-brown mb-4 block`}></i>
              <h4 className="text-xl font-semibold text-dark mb-2">{tip.title}</h4>
              <p className="text-text-muted leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
