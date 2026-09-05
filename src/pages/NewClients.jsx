import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import FAQAccordion from "../components/FAQAccordion";
import Reveal from "../components/Reveal";
import { newClientSteps } from "../data/content";
import { faqItems } from "../data/faq";
import "./NewClients.css";

export default function NewClients() {
  return (
    <>
      <PageHero
        eyebrow="New Clients"
        title="New here? We've got you."
        subtitle="Here's exactly what to expect from browsing services to walking out the door with hair you love."
        image="/images/pages/new-clients.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="new-clients__steps">
            {newClientSteps.map((step, i) => (
              <Reveal as="div" key={step.number} delay={(i % 4) + 1} className="new-clients__step">
                <span className="new-clients__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container grid-2">
          <Reveal>
            <p className="eyebrow">Good To Know</p>
            <h2>What to bring to your first visit</h2>
            <p>
              Reference photos help enormously — even a folder of images you like (and don't like) gives your
              stylist a real head start. Come with clean or day-old hair, and set aside a little extra time for
              your first consultation.
            </p>
            <p>
              If you're booking a color service, please avoid a fresh wash directly beforehand, and let us know
              about any recent chemical services (keratin, relaxer, henna) when you book.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="new-clients__faq">
              <h4>A few common questions</h4>
              <FAQAccordion items={faqItems.slice(0, 4)} />
              <Link to="/contact" className="text-link" style={{ marginTop: "1.6rem", display: "inline-block" }}>
                Have another question?
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Your First Visit"
        title="Start your first visit."
        subtitle="Booking takes a few minutes — we'll take care of the rest."
        ctaLabel="Start Your First Visit"
        ctaTo="/book"
      />
    </>
  );
}
