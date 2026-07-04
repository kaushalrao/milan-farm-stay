interface HostProfileProps {
  name: string;
  role: string;
  image: string;
  imgClass?: string;
  desc: string;
  years: string;
  phone: string;
}

export default function HostProfile({ name, role, image, imgClass = "w-full h-full object-cover", desc, years, phone }: HostProfileProps) {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-sm flex flex-col justify-between border border-border h-full">
      <div>
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 md:gap-4 mb-3 md:mb-6 text-center xl:text-left">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-airbnb-coral/20 ring-offset-2">
            <img src={image} alt={name} className={imgClass} />
          </div>
          <div className="flex flex-col items-center xl:items-start">
            <h4 className="font-serif text-[17px] md:text-2xl font-semibold text-dark mb-0.5 md:mb-1 leading-tight">{name}</h4>
            <div className="flex items-center gap-1 md:gap-1.5">
              <i className="ph-fill ph-medal text-airbnb-coral text-[11px] md:text-base"></i>
              <span className="text-[10px] md:text-sm font-medium text-text-muted uppercase tracking-wider md:normal-case md:tracking-normal">{role}</span>
            </div>
          </div>
        </div>

        {/* Hidden on mobile to keep card extremely compact when side-by-side */}
        <div className="hidden md:flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 text-dark">
            <i className="ph ph-briefcase text-text-muted text-xl"></i>
            <span className="text-sm font-medium">{desc}</span>
          </div>
          <div className="flex items-center gap-3 text-dark">
            <i className="ph ph-clock text-text-muted text-xl"></i>
            <span className="text-sm font-medium">{years}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-2 mt-auto">
        <a href={`tel:+91${phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 md:py-3 bg-cream text-dark hover:bg-soft-beige rounded-xl text-[12px] md:text-base font-semibold transition-transform hover:-translate-y-1 shadow-sm border border-border/50">
          <i className="ph-fill ph-phone text-sm md:text-xl"></i> Call
        </a>
        <a href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 md:py-3 bg-[#25D366] text-white rounded-xl text-[12px] md:text-base font-semibold transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md">
          <i className="ph-fill ph-whatsapp-logo text-sm md:text-xl"></i> WA
        </a>
      </div>
    </div>
  );
}
