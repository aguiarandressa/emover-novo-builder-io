import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como é feita a escolha das terapias?",
    answer:
      "A escolha das terapias é feita após uma avaliação inicial completa com nossa equipe multidisciplinar. Cada profissional analisa as necessidades específicas do paciente e, juntos, traçamos um plano terapêutico individualizado que contemple as melhores abordagens para o desenvolvimento integral.",
  },
  {
    question: "Vocês atendem por convênio médico?",
    answer:
      "Atualmente trabalhamos com atendimento particular e alguns convênios selecionados. Entre em contato conosco para verificar se o seu plano de saúde é aceito em nossas modalidades de atendimento.",
  },
  {
    question: "A clínica realiza suporte escolar?",
    answer:
      "Sim! Contamos com profissionais especializados em psicopedagogia e terapia ocupacional que podem realizar o suporte escolar, auxiliando no desenvolvimento cognitivo, acadêmico e nas habilidades de aprendizagem.",
  },
  {
    question: "Preciso de um laudo fechado para iniciar o atendimento?",
    answer:
      "Não é necessário um laudo fechado para iniciar o atendimento. Recebemos pacientes com ou sem diagnóstico. Nossa equipe realiza avaliações completas e pode encaminhar para especialistas quando necessário.",
  },
];

function FAQItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-brand-dark text-sm sm:text-base pr-4">
          {question}
        </span>
        <span className={`flex-shrink-0 text-brand-teal transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-10">
          Dúvidas Frequentes sobre nossos Serviços
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
