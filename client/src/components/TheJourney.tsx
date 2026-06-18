import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stages = [
  { title: "Voice", description: "A community shares their experience" },
  { title: "Participation", description: "They contribute to research" },
  { title: "Knowledge", description: "Data becomes understanding" },
  { title: "Discovery", description: "Understanding becomes insight" },
  { title: "Healthcare", description: "Insight shapes treatment" },
  { title: "Impact", description: "Communities share in the benefits" },
];

export default function TheJourney() {
  const reveal = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        const nextIndex = Number((visibleEntries[0].target as HTMLElement).dataset.index);
        setActiveIndex(nextIndex);
      },
      { threshold: [0.35, 0.6, 0.8] },
    );

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section {...reveal} className="section section-night journey-section">
      <div className="section-inner">
        <h2 className="section-title centered">From A Single Voice To A Changed World</h2>
        <div className="journey-list" role="list">
          {stages.map((stage, index) => {
            const stateClass = index < activeIndex ? "is-complete" : index === activeIndex ? "is-active" : "is-future";

            return (
              <div className="journey-item-wrap" key={stage.title}>
                <div
                  className={`journey-item ${stateClass}`}
                  data-index={index}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                >
                  <div className="journey-node">{stage.title}</div>
                  <p className="journey-description">{stage.description}</p>
                </div>
                {index < stages.length - 1 && <div className="journey-line" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
