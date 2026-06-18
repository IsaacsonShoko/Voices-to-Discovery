import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const audienceCards = [
  { title: "Communities", actions: "Learn. Participate. Share." },
  { title: "Researchers", actions: "Collaborate. Contribute. Discover." },
  { title: "Students", actions: "Learn. Train. Lead." },
  { title: "Healthcare Professionals", actions: "Advocate. Educate. Support." },
  { title: "Policymakers", actions: "Shape systems. Enable progress." },
  { title: "Philanthropists", actions: "Catalyse change." },
];

type Props = {
  onOpenForm: (audienceType: string) => void;
};

export default function JoinTheMovement({ onOpenForm }: Props) {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-night" id="join">
      <div className="section-inner narrow-stack centered-stack">
        <h2 className="section-title centered">Where Do You Fit In This Movement?</h2>
        <div className="audience-grid">
          {audienceCards.map((card) => (
            <article key={card.title} className="card audience-card">
              <h3>{card.title}</h3>
              <p>{card.actions}</p>
              <button
                className="button button-ghost"
                type="button"
                onClick={() => onOpenForm(card.title)}
              >
                Get Involved
              </button>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
