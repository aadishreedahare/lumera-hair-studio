import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <img src="/images/hero.jpg" alt="Soft, moody light inside the LUMÉRA Hair Studio color bar" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">Koregaon Park, Pune</p>
        <h1 className="hero__headline">Hair designed around you.</h1>
        <p className="hero__sub">
          Personalized cuts, dimensional color and thoughtful hair care in the heart of Pune.
        </p>
        <div className="hero__actions">
          <Link to="/book" className="btn btn-ghost-light">
            Book an Appointment
          </Link>
          <Link to="/services" className="text-link hero__link">
            Explore Services
          </Link>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
