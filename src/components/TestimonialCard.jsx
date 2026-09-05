import "./TestimonialCard.css";

export default function TestimonialCard({ quote, name, avatar }) {
  return (
    <figure className="testimonial-card">
      <blockquote className="testimonial-card__quote">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="testimonial-card__meta">
        <img src={avatar} alt="" aria-hidden="true" className="testimonial-card__avatar" />
        <span>{name}</span>
      </figcaption>
    </figure>
  );
}
