import { useState } from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiMail, FiPhone, FiCheck } from "react-icons/fi";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import FAQAccordion from "../components/FAQAccordion";
import { salon } from "../data/salon";
import { faqItems } from "../data/faq";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's create something you'll love living in."
        image="/images/pages/contact-hero.jpg"
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <h2>Visit the studio</h2>
            <address>
              <strong>{salon.name}</strong>
              {salon.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <div className="contact-info__row">
              <FiPhone aria-hidden />
              <a href={salon.phoneHref}>{salon.phone}</a>
            </div>
            <div className="contact-info__row">
              <FiMail aria-hidden />
              <a href={`mailto:${salon.email}`}>{salon.email}</a>
            </div>
            <div className="contact-info__row">
              <FiInstagram aria-hidden />
              <a href={salon.instagramHref} target="_blank" rel="noreferrer">
                {salon.instagram}
              </a>
            </div>

            <h3 className="contact-info__hours-title">Hours</h3>
            <ul className="contact-info__hours">
              {salon.hours.map((h) => (
                <li key={h.days}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>

            <Link to="/book" className="btn">
              Book an Appointment
            </Link>
          </Reveal>

          <Reveal delay={1} className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <span className="contact-success__icon">
                  <FiCheck />
                </span>
                <h3>Message sent.</h3>
                <p>Thank you for reaching out — our front desk will get back to you shortly.</p>
                <button type="button" className="text-link" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <h2>Send a message</h2>
                <label className="contact-form__field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </label>
                <label className="contact-form__field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update({ email: e.target.value })}
                  />
                </label>
                <label className="contact-form__field">
                  <span>Message</span>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => update({ message: e.target.value })}
                  />
                </label>
                <button type="submit" className="btn btn-block">
                  Send Message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          title="LUMÉRA Hair Studio location"
          src={salon.mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">Frequently Asked</p>
            <h2>Questions, answered</h2>
          </Reveal>
          <div className="contact-faq">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
