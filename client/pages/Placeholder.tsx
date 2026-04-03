import { Link, useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "").replace(/-/g, " ");
  const displayName = pageName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#edf7f7] to-white px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-brand-teal">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M9 9h6M9 12h6M9 15h4"/>
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3">
          {displayName}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
          Esta página está sendo preparada. Em breve você encontrará aqui todas as informações
          sobre nossa área de {displayName.toLowerCase()}. Continue explorando!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-brand-teal text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Ver todas as especialidades
          </Link>
          <a
            href="https://wa.me/551140028922"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-200 text-brand-dark font-semibold px-6 py-3 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors text-sm"
          >
            Falar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
