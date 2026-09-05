import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { serviceMenu } from "../data/services";
import "./Services.css";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services & Pricing"
        title="Considered services, priced honestly."
        subtitle="Every service starts with a conversation about your hair — prices below are starting points for that conversation."
        image="/images/pages/services-hero.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="services-menu">
            {serviceMenu.map((group, i) => (
              <Reveal as="div" key={group.category} delay={(i % 3) + 1} className="services-menu__group">
                <h2 className="services-menu__title">{group.category}</h2>
                <ul className="services-menu__list">
                  {group.items.map((item) => (
                    <li key={item.name} className="services-menu__item">
                      <span className="services-menu__name">{item.name}</span>
                      <span className="services-menu__dots" aria-hidden="true" />
                      <span className="services-menu__price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="services-note">
            <p>
              Prices are starting prices and may vary depending on hair length, density, condition, stylist level
              and customization required.
            </p>
          </Reveal>

          <Reveal className="services-consult">
            <p className="services-consult__label">Not sure what to book?</p>
            <h3>Start with a consultation.</h3>
            <Link to="/book" className="btn">
              Book a Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Every great result starts with a conversation."
        subtitle="Book your service, or reach out first if you'd like guidance."
        ctaLabel="Book an Appointment"
        ctaTo="/book"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}
