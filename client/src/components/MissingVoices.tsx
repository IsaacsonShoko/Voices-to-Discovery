import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stats = [
  { value: "90%", label: "of genomic research data comes from populations of European ancestry" },
  { value: "1.4B", label: "people on the African continent currently underrepresented in global genomic databases" },
  { value: "2040", label: "the year by which representative genomic data could transform African healthcare outcomes" },
];

export default function MissingVoices() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-forest" id="movement">
      <div className="section-inner narrow-stack">
        <p className="section-kicker">The Missing Voices</p>
        <h2 className="section-title centered">The Future Of Medicine Cannot Be Built On Missing Voices</h2>
        <p className="section-copy centered max-copy">
          Every day, new medicines are developed. New AI systems are trained. New diagnostic tools are created.
          New discoveries change lives. Yet many of the world's most diverse populations remain underrepresented
          in the data that powers these advances. When voices are missing, knowledge is incomplete. When knowledge
          is incomplete, healthcare suffers.
        </p>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.value} className="card stat-card">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>

        <p className="small-note">Illustrative figures only. Replace with verified statistics before launch.</p>
      </div>
    </motion.section>
  );
}
