import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { featuredServices } from "../data/services";
import { newClientSteps, whyLumera } from "../data/content";
import { testimonials } from "../data/testimonials";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Introduction */}
      <section className="section">
        <div className="container grid-2">
          <Reveal>
            <p className="eyebrow">Welcome to LUMÉRA</p>
            <h2>A more personal approach to beautiful hair.</h2>
            <p className="lede" style={{ marginBottom: "1.6em" }}>
              LUMÉRA Hair Studio was created for clients who believe great hair begins with being heard. Every
              appointment starts with a conversation about your lifestyle, your hair history and what you want to
              achieve.
            </p>
            <Link to="/about" className="text-link">
              Discover Our Story
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <div className="home-intro__media">
              <img src="/images/intro-editorial.jpg" alt="Editorial view inside the LUMÉRA color studio" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured services */}
      <section className="section section--tinted">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">Our Specialties</p>
            <h2>What we're known for</h2>
          </Reveal>
          <div className="home-services__grid">
            {featuredServices.map((service, i) => (
              <Reveal as="div" key={service.slug} delay={(i % 3) + 1}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
          <Reveal className="home-services__cta">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* New client steps */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">New Here? We've Got You.</p>
            <h2>Your first visit, mapped out</h2>
          </Reveal>
          <div className="home-steps__grid">
            {newClientSteps.map((step, i) => (
              <Reveal as="div" key={step.number} delay={(i % 4) + 1} className="home-step">
                <span className="home-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="home-services__cta">
            <Link to="/new-clients" className="btn btn-outline">
              Start Your First Visit
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why Lumera */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--light eyebrow--center">The Lumera Difference</p>
            <h2>Why clients choose LUMÉRA</h2>
          </Reveal>
          <div className="home-why__grid">
            {whyLumera.map((item, i) => (
              <Reveal as="div" key={item.title} delay={(i % 4) + 1} className="home-why__item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">In Their Words</p>
            <h2>Client experiences</h2>
            <p className="lede" style={{ margin: "0.6em auto 0" }}>
              Fictional testimonials written for this concept project.
            </p>
          </Reveal>
          <div className="home-testimonials__grid">
            {testimonials.map((t, i) => (
              <Reveal as="div" key={t.name} delay={(i % 3) + 1}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready When You Are"
        title="Hair designed around you starts with one visit."
        subtitle="Reserve your appointment online in a few simple steps."
        ctaLabel="Book an Appointment"
        ctaTo="/book"
        secondaryLabel="Explore Services"
        secondaryTo="/services"
      />
    </>
  );
}
