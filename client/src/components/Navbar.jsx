import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav className="navbar">
      <h2>SOPE</h2>
      <div>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
