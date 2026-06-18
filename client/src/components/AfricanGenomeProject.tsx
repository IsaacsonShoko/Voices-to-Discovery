import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AfricanGenomeProject() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-night project-section" id="project">
      <div className="section-inner project-grid">
        <div>
          <p className="eyebrow">The Project</p>
          <h2 className="section-title">Building One Of The Most Important Scientific Initiatives Of Our Generation</h2>
          <p className="section-copy max-copy">
            The African Genome Project aims to ensure that future discoveries reflect the full diversity of
            humanity. Powered by Afromics, the project seeks to build the genomic infrastructure required for
            the next generation of healthcare, research and innovation across the continent.
          </p>
          <a className="button button-primary" href="#">
            Explore The African Genome Project
          </a>
        </div>

        <div className="continent-visual" aria-hidden="true">
          <svg viewBox="0 0 320 360" className="continent-svg">
            <path d="M118 24l32 28 42 8 20 40-10 32 28 36-4 52-34 34-16 42-44 26-30-20-10-40-38-42 6-54-18-30 14-40 42-18z" />
            <path d="M174 252l26 52" />
            <path d="M130 80l28 42 46 24" />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
