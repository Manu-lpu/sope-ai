import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Landing = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI-powered SOP review</p>
          <h1>Improve your SOPs with AI.</h1>
          <p className="subtitle">
            Review, compare, and refine your statements before submitting.
          </p>
          <div className="cta-row">
            <Link to="/applications/new">
              <Button type="button">Get Started</Button>
            </Link>
            <Link to="/features" className="secondary-link">
              Explore features
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
