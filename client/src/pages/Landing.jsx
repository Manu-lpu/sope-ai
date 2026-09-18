import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />

      <main className="landing-hero">
        <div className="hero-label">
          <span>01.</span>
          <span>LANDING PAGE</span>
        </div>

        <div className="hero-content">
          <h1 className="hero-logo">SOPE</h1>

          <h2 className="hero-title">
            Make your SOP
            <br />
            impossible to ignore.
          </h2>

          <div className="hero-actions">
            <Link to="/applications/new">
              <Button type="button">ANALYSE MY SOP →</Button>
            </Link>

            <Link to="/features" className="hero-secondary-button">
              VIEW DEMO
            </Link>
          </div>
        </div>

        <div className="scribble scribble-left">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="scribble scribble-right">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-footer">
          <span>AI-POWERED SOP REVIEW</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </main>
    </div>
  );
};

export default Landing;