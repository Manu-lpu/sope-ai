import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Improve your SOPs with AI.</h1>
        <p>Review, compare, and refine your statements before submitting.</p>
        <Link to="/applications/new">
          <Button type="button">Get Started</Button>
        </Link>
      </main>
    </div>
  );
};

export default Landing;
