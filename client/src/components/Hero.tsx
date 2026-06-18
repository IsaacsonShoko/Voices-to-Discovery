import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const constellation = [
  { top: "8%", left: "14%", delay: "0s" },
  { top: "24%", left: "52%", delay: "1s" },
  { top: "42%", left: "18%", delay: "2s" },
  { top: "65%", left: "44%", delay: "3s" },
  { top: "82%", left: "22%", delay: "2.4s" },
  { top: "16%", left: "82%", delay: "1.7s" },
  { top: "36%", left: "72%", delay: "2.8s" },
  { top: "58%", left: "86%", delay: "0.8s" },
  { top: "74%", left: "68%", delay: "1.2s" },
  { top: "48%", left: "54%", delay: "3.2s" },
];

export default function Hero() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section hero-section" id="top">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">A Continental Movement</p>
          <h1>Every Discovery Begins With A Voice</h1>
          <p className="hero-lead">
            For too long, millions of people have been missing from the discoveries shaping the future of
            healthcare. From Voices to Discovery is a movement to ensure every community has a place in the
            future of medicine.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#join">
              Join The Movement
            </a>
            <a className="button button-ghost" href="#stories">
              Watch The Story
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="constellation-lines" />
          {constellation.map((node, index) => (
            <span
              key={`${node.top}-${node.left}`}
              className="constellation-node"
              style={{
                top: node.top,
                left: node.left,
                animationDelay: node.delay,
                width: `${10 + (index % 3) * 6}px`,
                height: `${10 + (index % 3) * 6}px`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
