import { useState } from "react";
import { AssessmentModal } from "@/components/ui/assessment-modal";
import ExpertiseCard from "@/components/ExpertiseCard";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";

// --- Icons ---
const PsicologiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4"/>
    <path d="M12 12v4M8 20h8M10 16l-2 4M14 16l2 4"/>
    <path d="M9 8c0-1.5.5-3 3-3"/>
  </svg>
);

const FonoaudiologiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z"/>
    <path d="M19 10a7 7 0 01-14 0"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="9" y1="21" x2="15" y2="21"/>
  </svg>
);

const TerapiaOcupacionalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v5l3 3"/>
    <path d="M6 20l3-5 3 2 3-2 3 5"/>
    <path d="M9 15H6a2 2 0 01-2-2v-2"/>
    <path d="M15 15h3a2 2 0 002-2v-2"/>
  </svg>
);

const PsicopedagogiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <path d="M17.5 14v7M14 17.5h7"/>
  </svg>
);

const ServicoSocialIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

const FisioterapiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="5" r="2"/>
    <path d="M6 20l1.5-6L6 11l3-3h6l3 3-1.5 3L18 20"/>
    <path d="M9 20h6"/>
    <path d="M9 14h6"/>
  </svg>
);

const ArteterapiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M8.5 9.5L12 15l3.5-5.5"/>
  </svg>
);

const NutricaoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const PsiquiatriaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
  </svg>
);

const NeurologiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9.5 2C7 2 5 4 5 6.5c0 .9.3 1.8.7 2.5C4.3 9.8 3 11.4 3 13.3 3 16 5 18 7.7 18H8v2a1 1 0 001 1h6a1 1 0 001-1v-2h.3C19 18 21 16 21 13.3c0-1.9-1.3-3.5-2.7-4.3.4-.7.7-1.6.7-2.5C19 4 17 2 14.5 2c-1.2 0-2.3.5-3.1 1.2"/>
    <path d="M12 6v6M9 9h6"/>
  </svg>
);

const expertiseAreas = [
  {
    icon: <PsicologiaIcon />,
    title: "Psicologia",
    description:
      "Foco no bem-estar emocional e comportamental através de estratégias personalizadas de acolhimento e crescimento.",
    href: "/psicologia",
  },
  {
    icon: <FonoaudiologiaIcon />,
    title: "Fonoaudiologia",
    description:
      "Desenvolvimento de habilidades de comunicação verbal e não verbal, garantindo que cada voz seja compreendida.",
    href: "/fonoaudiologia",
  },
  {
    icon: <TerapiaOcupacionalIcon />,
    title: "Terapia Ocupacional",
    description:
      "Estímulo à autonomia e independência nas atividades do dia a dia por meio de práticas adaptadas.",
    href: "/terapia-ocupacional",
  },
  {
    icon: <PsicopedagogiaIcon />,
    title: "Psicopedagogia",
    description:
      "Identificação e superação de desafios de aprendizagem para potencializar o desempenho cognitivo e acadêmico.",
    href: "/psicopedagogia",
  },
  {
    icon: <ServicoSocialIcon />,
    title: "Serviço Social",
    description:
      "Apoio às famílias no acesso a direitos e recursos, fortalecendo a rede de suporte e inclusão social.",
    href: "/servico-social",
  },
  {
    icon: <FisioterapiaIcon />,
    title: "Fisioterapia",
    description:
      "Trabalho motor e funcional individualizado para promover movimento, força e independência física.",
    href: "/fisioterapia",
  },
  {
    icon: <ArteterapiaIcon />,
    title: "Arteterapia",
    description:
      "A arte como ferramenta de expressão emocional e criatividade, transformando sentimentos em possibilidades.",
    href: "/arteterapia",
  },
  {
    icon: <NutricaoIcon />,
    title: "Nutrição",
    description:
      "Promoção de hábitos saudáveis que sustentam o desenvolvimento integral e o bem-estar físico.",
    href: "/nutricao",
  },
  {
    icon: <PsiquiatriaIcon />,
    title: "Psiquiatria",
    description:
      "Suporte especializado em saúde mental com um olhar clínico humanizado para o equilíbrio da vida.",
    href: "/psiquiatria",
  },
  {
    icon: <NeurologiaIcon />,
    title: "Neurologia",
    description:
      "Cuidado preventivo e clínico da saúde neurológica para um desenvolvimento harmonioso e saudável.",
    href: "/neurologia",
  },
];

export default function Index() {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero / Expertise Header */}
      <section className="bg-gradient-to-b from-[#edf7f7] to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Nossas Áreas de{" "}
            <span className="text-brand-teal">Expertise</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Oferecemos um suporte multidisciplinar completo, focado no desenvolvimento para a vida
            através de um olhar humanizado, profissional e acolhedor.
          </p>

          <button
            type="button"
            onClick={() => setIsAssessmentModalOpen(true)}
            className="mt-8 rounded-xl bg-gradient-to-r from-[#27c0cc] to-[#0489a2] px-8 py-3 text-base font-semibold text-white shadow-[0_14px_26px_-14px_rgba(7,139,162,0.9)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ab4c4] focus-visible:ring-offset-2"
          >
            Agendar avaliação
          </button>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="bg-gradient-to-b from-white to-[#f5fbfb] py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {expertiseAreas.map((area) => (
              <ExpertiseCard
                key={area.title}
                icon={area.icon}
                title={area.title}
                description={area.description}
                href={area.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* FAQ Section */}
      <FAQSection />

      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onSubmit={(data) => {
          console.log("Dados do agendamento:", data);
          setIsAssessmentModalOpen(false);
        }}
      />
    </div>
  );
}