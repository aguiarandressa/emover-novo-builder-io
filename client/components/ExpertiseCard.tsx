import { Link } from "react-router-dom";

interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export default function ExpertiseCard({ icon, title, description, href }: ExpertiseCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow group">
      <div className="w-10 h-10 rounded-xl bg-brand-teal-light flex items-center justify-center text-brand-teal flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-brand-dark text-base">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
      </div>
      <Link
        to={href}
        className="inline-flex items-center gap-1 text-brand-teal text-sm font-semibold hover:gap-2 transition-all mt-1"
      >
        Saber Mais
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}
