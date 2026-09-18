import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Signup = () => {
  return (
    <div className="auth-page signup-page">
      <Navbar />

      <main className="auth-main">
        <section className="auth-form-panel">
          <div className="auth-form-header">
            <span>SOPE / 07</span>
            <span>NEW STUDENT</span>
          </div>

          <form className="auth-form">
            <label htmlFor="name">FULL NAME</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
            />

            <label htmlFor="signup-email">EMAIL</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
            />

            <label htmlFor="signup-password">PASSWORD</label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
            />

            <button type="submit">
              CREATE ACCOUNT
              <span>→</span>
            </button>
          </form>

          <div className="auth-footer">
            <span>ALREADY HAVE AN ACCOUNT?</span>
            <Link to="/login">SIGN IN →</Link>
          </div>
        </section>

        <div className="auth-left signup-copy">
          <div className="page-label">
            <span>07.</span>
            <span>SIGN UP</span>
          </div>

          <div className="auth-heading">
            <h1>
              START
              <br />
              HERE.
            </h1>

            <p>
              Create your SOPE account and start turning rough drafts into
              stronger applications.
            </p>
          </div>

          <div className="auth-statement">
            <span>WRITE IT.</span>
            <span>REVIEW IT.</span>
            <span>MAKE IT MATTER. →</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;