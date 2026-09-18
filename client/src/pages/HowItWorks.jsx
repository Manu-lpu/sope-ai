import Navbar from "../components/Navbar";

const steps = [
  {
    number: "01",
    title: "CREATE",
    description:
      "Tell SOPE where you're applying. Add your university, program, country, and intake.",
  },
  {
    number: "02",
    title: "WRITE",
    description:
      "Paste your SOP and let SOPE analyze the actual content instead of rewriting it for you.",
  },
  {
    number: "03",
    title: "IMPROVE",
    description:
      "Get scores, flagged clichés, weaknesses, and specific recommendations. Then compare versions.",
  },
];

const HowItWorks = () => {
  return (
    <div className="how-page">
      <Navbar />

      <main className="how-main">
        <header className="how-header">
          <div className="page-label">
            <span>03.</span>
            <span>HOW IT WORKS</span>
          </div>

          <div className="how-arrow" aria-hidden="true">
            ↘
          </div>
        </header>

        <section className="how-hero">
          <h1>
            THREE STEPS.
            <br />
            ONE BETTER
            <br />
            SOP.
          </h1>

          <p className="how-intro">
            No vague AI advice. No complete rewrite. Just a clear breakdown of
            what is working, what isn't, and what you should fix.
          </p>
        </section>

        <section className="steps-grid">
          {steps.map((step) => (
            <article className="step-item" key={step.number}>
              <div className="step-number">{step.number}</div>

              <div className="step-icon" aria-hidden="true">
                {step.number === "01" && "＋"}
                {step.number === "02" && "✎"}
                {step.number === "03" && "↗"}
              </div>

              <h2>{step.title}</h2>

              <p>{step.description}</p>
            </article>
          ))}
        </section>

        <div className="how-bottom">
          <span>YOUR SOP.</span>
          <span>YOUR STORY.</span>
          <span>YOUR IMPROVEMENT. →</span>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;