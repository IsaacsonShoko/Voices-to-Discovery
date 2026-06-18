import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const statements = [
  "Every child receives treatment informed by their biology.",
  "Every healthcare system has access to representative evidence.",
  "Every discovery reflects humanity's diversity.",
  "Every community shares in the benefits of science.",
];

export default function Imagine2040() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-forest imagine-section">
      <div className="section-inner narrow-stack centered-stack">
        <p className="eyebrow">Imagine 2040</p>
        <div className="vision-stack">
          {statements.map((statement, index) => (
            <motion.p
              key={statement}
              className="vision-line"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {statement}
            </motion.p>
          ))}
        </div>
        <p className="section-highlight">That future begins today.</p>
      </div>
    </motion.section>
  );
}
