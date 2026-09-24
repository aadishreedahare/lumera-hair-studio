import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../data/salon";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header className={`navbar ${solid ? "navbar--solid" : ""}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo" aria-label="LUMÉRA Hair Studio, home">
            LUMÉRA
          </Link>

          <nav className="navbar__links" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `navbar__link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <Link to="/book" className="btn navbar__cta">
              Book an Appointment
            </Link>
            <button
              type="button"
              className="navbar__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Kept outside <header>: its backdrop-filter would otherwise clip this fixed overlay to the header's height. */}
      <div className={`navbar__mobile ${open ? "is-open" : ""}`}>
        <nav className="navbar__mobile-links" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? "is-active" : ""}`}
              style={{ transitionDelay: open ? `${i * 40 + 60}ms` : "0ms" }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="btn btn-outline navbar__mobile-cta"
            style={{ transitionDelay: open ? `${navLinks.length * 40 + 60}ms` : "0ms" }}
          >
            Book an Appointment
          </Link>
        </nav>
      </div>
    </>
  );
}
