import { Link } from "react-router-dom";
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import { salon, navLinks } from "../data/salon";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">LUMÉRA</span>
          <p className="footer__tagline">&ldquo;{salon.tagline}&rdquo;</p>
          <a href={salon.instagramHref} target="_blank" rel="noreferrer" className="footer__social">
            <FiInstagram aria-hidden />
            <span>{salon.instagram}</span>
          </a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Visit</h4>
          <address className="footer__address">
            {salon.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a href={salon.phoneHref} className="footer__contact-link">
            <FiPhone aria-hidden /> {salon.phone}
          </a>
          <a href={`mailto:${salon.email}`} className="footer__contact-link">
            <FiMail aria-hidden /> {salon.email}
          </a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Book a Visit</h4>
          <p className="footer__note">
            Ready for hair designed around you? Reserve your appointment online in a few steps.
          </p>
          <Link to="/book" className="btn btn-ghost-light">
            Book an Appointment
          </Link>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 LUMÉRA Hair Studio. All rights reserved.</p>
        <p className="footer__fictional">Self-initiated concept project — fictional business, for portfolio purposes.</p>
      </div>
    </footer>
  );
}
