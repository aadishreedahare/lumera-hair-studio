import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "./ServiceCard.css";

export default function ServiceCard({ title, description, image, to = "/services" }) {
  return (
    <Link to={to} className="service-card">
      <div className="service-card__media">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">
          {title}
          <FiArrowUpRight className="service-card__icon" aria-hidden />
        </h3>
        <p className="service-card__desc">{description}</p>
      </div>
    </Link>
  );
}
