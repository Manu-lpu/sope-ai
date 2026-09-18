import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-main">
        <div className="auth-left">
          <div className="page-label">
            <span>06.</span>
            <span>LOGIN</span>
          </div>

          <div className="auth-heading">
            <h1>
              WELCOME
              <br />
              BACK.
            </h1>

            <p>
              Your SOPs are waiting. Pick up where you left off and keep
              improving.
            </p>
          </div>

          <div className="auth-statement">
            <span>YOUR STORY.</span>
            <span>YOUR APPLICATION.</span>
            <span>YOUR SOPE. →</span>
          </div>
        </div>

        <section className="auth-form-panel">
          <div className="auth-form-header">
            <span>SOPE / 06</span>
            <span>STUDENT ACCESS</span>
          </div>

          <form className="auth-form">
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
            />

            <button type="submit">
              SIGN IN
              <span>→</span>
            </button>
          </form>

          <div className="auth-footer">
            <span>NEW TO SOPE?</span>
            <Link to="/signup">CREATE ACCOUNT →</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;