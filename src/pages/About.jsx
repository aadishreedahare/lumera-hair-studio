import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import "./About.css";


const pillars = [
  {
    title: "Listen First",
    description:
      "No appointment begins with scissors or color. It begins with a conversation about your hair history, your routine and what you actually want day to day.",
  },
  {
    title: "Health Before Everything",
    description:
      "We turn down services that would compromise your hair's integrity. A beautiful result should still be healthy hair a year from now.",
  },
  {
    title: "Considered Craft",
    description:
      "Every stylist at LUMÉRA trains continuously in modern cutting and color technique, so the work stays current without chasing trends for their own sake.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About LUMÉRA"
        title="A studio built around conversation."
        subtitle="Get to know the philosophy behind LUMÉRA Hair Studio and the people who bring it to life."
        image="/images/pages/about-hero.jpg"
      />

      <section className="section">
        <div className="container grid-2">
          <Reveal>
            <div className="about-media">
              <img src="/images/pages/about-1.jpg" alt="Editorial detail from inside the LUMÉRA studio" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">Our Story</p>
            <h2>Founded on a simple belief.</h2>
            <p>
              LUMÉRA Hair Studio opened in Koregaon Park with one goal: to give clients the personalized, unhurried
              experience that mass-market salons rarely have room for. Founder Ananya Mehta built the studio around
              a single chair philosophy — every stylist takes the time a service actually needs, rather than
              rushing to the next appointment.
            </p>
            <p>
              Today, LUMÉRA is a small team of specialists rather than generalists. Each stylist has a defined focus
              — color, cutting, texture, extensions — so your service is always led by someone who works in that
              craft every day.
            </p>
            <Link to="/team" className="text-link">
              Meet the Team
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">Our Philosophy</p>
            <h2>How we work</h2>
          </Reveal>
          <div className="about-pillars">
            {pillars.map((pillar, i) => (
              <Reveal as="div" key={pillar.title} delay={(i % 3) + 1} className="about-pillar">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-quote">
        <div className="about-quote__media">
          <img src="/images/pages/about-2.jpg" alt="" />
          <div className="about-quote__scrim" />
        </div>
        <div className="container about-quote__content">
          <Reveal>
            <blockquote>
              &ldquo;Great hair isn't about following a trend — it's about a cut and color that actually fits the
              life you're living.&rdquo;
            </blockquote>
            <p className="about-quote__attribution">Ananya Mehta, Founder &amp; Creative Director</p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Come See For Yourself"
        title="Ready to experience LUMÉRA?"
        subtitle="Book a consultation or your first service — we'll take it from there."
        ctaLabel="Book an Appointment"
        ctaTo="/book"
        secondaryLabel="View Services"
        secondaryTo="/services"
      />
    </>
  );
}
