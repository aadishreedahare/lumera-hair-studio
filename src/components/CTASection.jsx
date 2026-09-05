import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./CTASection.css";

export default function CTASection({
  eyebrow,
  title,
  subtitle,
  ctaLabel = "Book an Appointment",
  ctaTo = "/book",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="cta-section">
      <div className="container cta-section__inner">
        <Reveal>
          {eyebrow && <p className="eyebrow eyebrow--light eyebrow--center">{eyebrow}</p>}
          <h2>{title}</h2>
          {subtitle && <p className="cta-section__subtitle">{subtitle}</p>}
          <div className="cta-section__actions">
            <Link to={ctaTo} className="btn btn-ghost-light">
              {ctaLabel}
            </Link>
            {secondaryLabel && (
              <Link to={secondaryTo} className="text-link cta-section__secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
