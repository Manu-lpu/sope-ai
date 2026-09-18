import Navbar from "../components/Navbar";

const faqs = [
  {
    number: "01",
    question: "WHAT DOES SOPE ACTUALLY REVIEW?",
    answer:
      "SOPE reviews your SOP for specificity, program fit, clarity, structure, personality, clichés, strengths, weaknesses, and areas that need improvement.",
  },
  {
    number: "02",
    question: "DOES SOPE WRITE MY SOP FOR ME?",
    answer:
      "No. SOPE is designed as a reviewer rather than a ghostwriter. It points out what needs work and gives practical suggestions so you can improve your own story.",
  },
  {
    number: "03",
    question: "WHY NOT JUST ASK CHATGPT?",
    answer:
      "SOPE is built around a structured SOP-review workflow. Instead of starting with a blank chat, you get consistent scoring, category-level feedback, cliché detection, sentence-level suggestions, and version tracking.",
  },
  {
    number: "04",
    question: "CAN I COMPARE DIFFERENT SOP VERSIONS?",
    answer:
      "Yes. SOPE stores your SOP versions so you can review how your writing changes over time and compare improvements between drafts.",
  },
  {
    number: "05",
    question: "IS MY SOP STORED?",
    answer:
      "Your SOP is stored as part of your application and version history so you can return to previous drafts and reviews.",
  },
  {
    number: "06",
    question: "IS SOPE A REPLACEMENT FOR A PROFESSIONAL EDITOR?",
    answer:
      "No. SOPE is intended to give you a useful first-pass review before submission. For high-stakes applications, you may still want feedback from a qualified human editor or advisor.",
  },
];

const FAQ = () => {
  return (
    <div className="faq-page">
      <Navbar />

      <main className="faq-main">
        <header className="faq-header">
          <div className="page-label">
            <span>05.</span>
            <span>FAQ</span>
          </div>

          <div className="faq-mark" aria-hidden="true">
            ?
          </div>
        </header>

        <section className="faq-hero">
          <h1>
            YOU ASK.
            <br />
            WE ANSWER.
          </h1>

          <p>
            Everything you need to know before putting your SOP through SOPE.
          </p>
        </section>

        <section className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.number}>
              <summary>
                <span className="faq-number">{faq.number}</span>

                <span className="faq-question">{faq.question}</span>

                <span className="faq-toggle">+</span>
              </summary>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </section>

        <div className="faq-bottom">
          <span>STILL CURIOUS?</span>
          <span>START WITH YOUR SOP. →</span>
        </div>
      </main>
    </div>
  );
};

export default FAQ;