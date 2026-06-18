import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stories = [
  { category: "Patient Voice", title: "Living With Sickle Cell" },
  { category: "Researcher", title: "The Researcher's Story" },
  { category: "Community", title: "Voices From Communities" },
  { category: "Science", title: "Building Science In Africa" },
  { category: "Future", title: "The Future Through A Student's Eyes" },
  { category: "Why It Matters", title: "Why Representation Matters" },
];

export default function Stories() {
  const reveal = useScrollReveal();

  return (
    <motion.section {...reveal} className="section section-forest" id="stories">
      <div className="section-inner">
        <p className="eyebrow">Stories</p>
        <div className="split-header">
          <h2 className="section-title">The Human Stories Behind The Science</h2>
          <p className="section-copy max-copy">
            Documentary-style stories create the emotional core of the movement and translate research into
            lived experience.
          </p>
        </div>

        <div className="stories-grid">
          {stories.map((story) => (
            <article key={story.title} className="story-card">
              <div className="story-thumb" aria-hidden="true">
                <span className="play-button">Play</span>
              </div>
              <span className="story-badge">{story.category}</span>
              <h3>{story.title}</h3>
            </article>
          ))}
        </div>

        <a className="button button-ghost" href="/why-representation-matters">
          Explore All Stories
        </a>
        <p className="small-note">Story videos and thumbnails remain placeholders until the owner supplies final content.</p>
      </div>
    </motion.section>
  );
}
