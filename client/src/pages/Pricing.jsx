import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const plans = [
  {
    number: "01",
    name: "FREE",
    price: "₹0",
    description: "For students who want a quick first review.",
    features: [
      "1 SOP review",
      "Overall score",
      "Category scores",
      "Basic recommendations",
    ],
    action: "START FREE",
    featured: false,
  },
  {
    number: "02",
    name: "PRO",
    price: "₹199",
    description: "For students seriously refining their application.",
    features: [
      "Unlimited reviews",
      "Detailed sentence feedback",
      "Cliché detection",
      "Version comparison",
      "Full recommendations",
    ],
    action: "GET PRO",
    featured: true,
  },
];

const Pricing = () => {
  return (
    <div className="pricing-page">
      <Navbar />

      <main className="pricing-main">
        <header className="pricing-header">
          <div className="page-label">
            <span>04.</span>
            <span>PRICING</span>
          </div>

          <div className="pricing-mark" aria-hidden="true">
            ₹
          </div>
        </header>

        <section className="pricing-hero">
          <h1>
            PAY LESS.
            <br />
            KNOW MORE.
          </h1>

          <p>
            A better first pass before you spend hundreds or thousands on
            professional SOP editing.
          </p>
        </section>

        <section className="pricing-grid">
          {plans.map((plan) => (
            <article
              className={`pricing-plan${plan.featured ? " featured" : ""}`}
              key={plan.number}
            >
              <div className="pricing-plan-top">
                <span>{plan.number}</span>

                {plan.featured && <span className="pricing-badge">POPULAR</span>}
              </div>

              <div className="pricing-plan-name">
                <h2>{plan.name}</h2>
                <span>{plan.description}</span>
              </div>

              <div className="pricing-price">
                <strong>{plan.price}</strong>
                {plan.featured && <span>/ review</span>}
              </div>

              <div className="pricing-divider" />

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.featured ? "/applications/new" : "/applications/new"}
                className="pricing-button"
              >
                {plan.action}
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>

        <div className="pricing-note">
          <span>NO CONSULTANCY.</span>
          <span>NO LOCK-IN.</span>
          <span>JUST BETTER FEEDBACK. →</span>
        </div>
      </main>
    </div>
  );
};

export default Pricing;