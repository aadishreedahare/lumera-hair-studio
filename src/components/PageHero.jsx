import "./PageHero.css";

export default function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <img src={image} alt="" />
        <div className="page-hero__scrim" />
      </div>
      <div className="page-hero__content container">
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
