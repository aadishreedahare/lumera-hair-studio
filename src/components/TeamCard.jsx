import { Link } from "react-router-dom";
import "./TeamCard.css";

export default function TeamCard({ member }) {
  return (
    <article className="team-card">
      <div className="team-card__media">
        <img src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" />
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p className="team-card__experience">{member.experience}</p>
        <ul className="team-card__specialties">
          {member.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="team-card__bio">{member.bio}</p>
        <Link to={`/book?stylist=${member.slug}`} className="text-link">
          Book with {member.name.split(" ")[0]}
        </Link>
      </div>
    </article>
  );
}
