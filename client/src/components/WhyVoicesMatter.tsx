import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const voices = [
  {
    title: "A Mother",
    copy: "Seeking answers for her child. Her experience reveals gaps that data alone cannot show.",
  },
  {
    title: "A Patient",
    copy: "Searching for better treatment. Her biology holds clues science has not yet mapped.",
  },
  {
    title: "A Doctor",
    copy: "Making difficult decisions. Her practice depends on evidence built for her patients.",
  },
  {
    title: "A Scientist",
    copy: "Trying to understand disease. Her research needs the full picture of human diversity.",
  },
  {
    title: "A Community",
    copy: "Wanting a healthier future. Their participation is what makes discovery possible.",
  },
];

export default function WhyVoicesMatter() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-night">
      <div className="section-inner">
        <p className="eyebrow">Five Voices. One Discovery.</p>
        <h2 className="section-title">Every Voice Contributes Something Essential</h2>
        <div className="voices-grid">
          {voices.map((voice) => (
            <article key={voice.title} className="card voice-card">
              <span className="voice-icon" aria-hidden="true">
                {voice.title.charAt(2)}
              </span>
              <h3>{voice.title}</h3>
              <p>{voice.copy}</p>
            </article>
          ))}
        </div>
        <p className="section-highlight">Together they become discovery.</p>
      </div>
    </motion.section>
  );
}
