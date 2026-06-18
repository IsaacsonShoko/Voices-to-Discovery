const sections = [
  {
    title: "Why diversity matters in medicine",
    body: "The future of medicine cannot rely on evidence built from only a narrow slice of humanity. When treatment pathways, diagnostics, and risk models are trained on incomplete representation, whole communities remain underserved.",
  },
  {
    title: "Why inclusion matters in science",
    body: "Inclusion is not a moral add-on to science. It improves the quality of evidence, strengthens public trust, and produces discoveries that travel further into real lives, health systems, and policy decisions.",
  },
  {
    title: "Why African participation matters",
    body: "Africa carries extraordinary human diversity, scientific talent, and urgent healthcare questions. Greater participation changes what science can understand, who benefits from discovery, and whose futures are reflected in medical progress.",
  },
  {
    title: "Why future healthcare depends on better representation",
    body: "Precision medicine, AI-assisted diagnosis, and next-generation therapeutics all depend on the data we choose to build with today. Better representation now creates fairer healthcare outcomes later.",
  },
];

export default function WhyRepresentationMatters() {
  return (
    <main className="why-page">
      <section className="section section-night">
        <div className="section-inner narrow-stack">
          <p className="eyebrow">Why Representation Matters</p>
          <h1 className="section-title">The future of medicine depends on who gets represented today.</h1>
          <p className="section-copy max-copy">
            This placeholder article translates the movement's central argument into a long-form page that
            students can understand, institutions can share, and the owner can later expand with final copy,
            data points, and citations.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="/#join">
              Join The Movement
            </a>
            <a className="button button-ghost" href="/">
              Back To Home
            </a>
          </div>
        </div>
      </section>

      <section className="section section-forest">
        <div className="section-inner article-stack">
          {sections.map((section) => (
            <article key={section.title} className="article-panel">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
