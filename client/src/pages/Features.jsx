import Navbar from "../components/Navbar";

const features = [
  {
    number: "01",
    title: "SPECIFICITY",
    text: "We check if your SOP actually says something meaningful about you.",
  },
  {
    number: "02",
    title: "PROGRAM FIT",
    text: "We evaluate how well your story connects with the program and university.",
  },
  {
    number: "03",
    title: "CLICHÉ DETECTOR",
    text: "We call out tired phrases that make your SOP feel generic.",
  },
  {
    number: "04",
    title: "SENTENCE FEEDBACK",
    text: "We identify sentences that need stronger evidence and specificity.",
  },
];

const Features = () => {
  return (
    <div className="features-page">
      <Navbar />

      <main className="features-main">
        <div className="features-heading-row">
          <div className="page-label">
            <span>02.</span>
            <span>FEATURES</span>
          </div>

          <div className="feature-mark">
            <span>↗</span>
            <span>↙</span>
          </div>
        </div>

        <section className="features-intro">
          <h1>
            WE FIND
            <br />
            WHAT OTHERS
            <br />
            MISS.
          </h1>

          <div className="features-content">
            <div className="feature-list">
              {features.map((feature) => (
                <article className="feature-item" key={feature.number}>
                  <div className="feature-number">{feature.number}</div>

                  <div className="feature-text">
                    <h2>{feature.title}</h2>
                    <p>{feature.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="score-preview">
              <div className="score-top">
                <span>SOPE SCORE</span>
                <span>01 / 04</span>
              </div>

              <div className="score-number">
                <strong>82</strong>
                <span>/100</span>
              </div>

              <div className="score-line">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="score-breakdown">
                <div>
                  <span>SPECIFICITY</span>
                  <strong>78</strong>
                </div>

                <div>
                  <span>PROGRAM FIT</span>
                  <strong>91</strong>
                </div>

                <div>
                  <span>CLICHÉS</span>
                  <strong>82</strong>
                </div>

                <div>
                  <span>STRUCTURE</span>
                  <strong>88</strong>
                </div>

                <div>
                  <span>PERSONALITY</span>
                  <strong>71</strong>
                </div>
              </div>

              <div className="score-note">
                <span>↑</span>
                <p>
                  Your SOP has potential.
                  <br />
                  Here's what we found.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Features;