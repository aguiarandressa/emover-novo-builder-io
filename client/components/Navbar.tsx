import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Equipe", href: "/equipe" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" fill="white" fillOpacity="0.9"/>
                <circle cx="9" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-brand-dark font-bold text-sm tracking-wide uppercase">
                Espaço Emover
              </span>
              <span className="text-muted-foreground text-[10px] tracking-widest uppercase font-medium">
                Desenvolvimento Humano
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-teal"
                      : "text-gray-600 hover:text-brand-teal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/acesso"
              className="bg-brand-teal text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-teal-500 transition-colors"
            >
              Acesso Restrito
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-teal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-brand-teal" : "text-gray-600"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/acesso"
              className="bg-brand-teal text-white text-sm font-semibold px-5 py-2 rounded-full text-center hover:bg-teal-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Acesso Restrito
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
