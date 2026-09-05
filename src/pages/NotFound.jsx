import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow eyebrow--center">404</p>
        <h1>This page has stepped out.</h1>
        <p className="lede" style={{ margin: "0 auto 2rem" }}>
          The page you're looking for doesn't exist. Let's get you back to something beautiful.
        </p>
        <Link to="/" className="btn">
          Return Home
        </Link>
      </div>
    </section>
  );
}
