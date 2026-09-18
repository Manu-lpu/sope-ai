import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/features", label: "FEATURES" },
    { to: "/how-it-works", label: "HOW IT WORKS" },
    { to: "/pricing", label: "PRICING" },
    { to: "/faq", label: "FAQ" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        SOPE
      </Link>

      <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        <Link to="/login" className="nav-login" onClick={closeMenu}>
          LOGIN
        </Link>

        <Link to="/signup" className="nav-signup" onClick={closeMenu}>
          SIGN UP
        </Link>
      </div>

      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;