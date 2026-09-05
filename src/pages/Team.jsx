import PageHero from "../components/PageHero";
import TeamCard from "../components/TeamCard";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { team } from "../data/team";
import "./Team.css";

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Specialists, not generalists."
        subtitle="Every LUMÉRA stylist has a defined focus, so your service is always led by someone who works in that craft every day."
        image="/images/pages/team-hero.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal as="div" key={member.slug} delay={(i % 4) + 1}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Found Your Match?"
        title="Book directly with your preferred stylist."
        subtitle="Or leave it to us — every LUMÉRA stylist is trained to the same standard."
        ctaLabel="Book an Appointment"
        ctaTo="/book"
      />
    </>
  );
}
