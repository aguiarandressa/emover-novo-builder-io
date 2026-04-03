export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
          Pronto para começar a transformação?
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          Nossa equipe multidisciplinar está pronta para acolher sua família e traçar o
          melhor caminho para o desenvolvimento integral.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/551140028922?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Agende uma Avaliação Agora
          </a>
          <a
            href="https://wa.me/551140028922"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-300 text-brand-dark font-semibold px-7 py-3.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Falar via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
