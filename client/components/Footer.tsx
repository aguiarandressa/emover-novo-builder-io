import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Especialidades", href: "/servicos" },
  { label: "Blog & Artigos", href: "/blog" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" fill="white" fillOpacity="0.9"/>
                  <circle cx="9" cy="9" r="2.5" fill="white"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm tracking-wide uppercase">
                  Espaço Emover
                </span>
                <span className="text-gray-400 text-[10px] tracking-widest uppercase font-medium">
                  Desenvolvimento Humano
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Comprometidos com a excelência clínica e o acolhimento humano, transformando vidas através do desenvolvimento contínuo.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-teal transition-colors"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="mailto:contato@espacoemover.com.br"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-teal transition-colors"
                aria-label="Email"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Navegação
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 text-sm hover:text-brand-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-gray-300 text-sm">
                <svg className="mt-0.5 flex-shrink-0 text-brand-teal" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>
                  Rua Exemplo, 123 · Centro<br />
                  São Paulo, SP
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 text-sm">
                <svg className="flex-shrink-0 text-brand-teal" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.61 6.61l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                <a href="tel:+551140028922" className="hover:text-brand-teal transition-colors">
                  (11) 4002-8922
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2024 Espaço Emover. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacidade" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
