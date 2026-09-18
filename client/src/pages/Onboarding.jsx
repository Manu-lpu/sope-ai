import Navbar from "../components/Navbar";

const Onboarding = () => {
  return (
    <div className="onboarding-page">
      <Navbar />

      <main className="onboarding-main">
        <header className="onboarding-header">
          <div className="page-label">
            <span>08.</span>
            <span>GETTING STARTED</span>
          </div>

          <div className="onboarding-progress">
            <span>01</span>
            <span>/</span>
            <span>01</span>
          </div>
        </header>

        <section className="onboarding-content">
          <div className="onboarding-heading">
            <h1>
              LET'S GET
              <br />
              STARTED.
            </h1>

            <p>
              Tell us where you're applying. This gives SOPE the context it
              needs to review your SOP properly.
            </p>
          </div>

          <form className="onboarding-form">
            <div className="onboarding-field">
              <label htmlFor="university">UNIVERSITY</label>
              <input
                id="university"
                type="text"
                placeholder="e.g. University of Toronto"
              />
            </div>

            <div className="onboarding-field">
              <label htmlFor="program">PROGRAM</label>
              <input
                id="program"
                type="text"
                placeholder="e.g. MSc Computer Science"
              />
            </div>

            <div className="onboarding-row">
              <div className="onboarding-field">
                <label htmlFor="country">COUNTRY</label>
                <input
                  id="country"
                  type="text"
                  placeholder="e.g. Canada"
                />
              </div>

              <div className="onboarding-field">
                <label htmlFor="intake">INTAKE</label>
                <input
                  id="intake"
                  type="text"
                  placeholder="e.g. Fall 2027"
                />
              </div>
            </div>

            <button type="submit" className="onboarding-button">
              CONTINUE
              <span>→</span>
            </button>
          </form>
        </section>

        <div className="onboarding-bottom">
          <span>CONTEXT MATTERS.</span>
          <span>SOPE NEEDS YOURS. →</span>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;