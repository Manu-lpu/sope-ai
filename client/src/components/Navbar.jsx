import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav className="navbar">
      <h2 className="brand">SOPE</h2>
      <div className="nav-links">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
