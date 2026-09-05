import { useEffect, useMemo, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { galleryCategories } from "../data/gallery";
import "./GalleryGrid.css";

export default function GalleryGrid({ items }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxId, setLightboxId] = useState(null);

  const filtered = useMemo(
    () => (activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory)),
    [items, activeCategory]
  );

  const lightboxIndex = filtered.findIndex((item) => item.id === lightboxId);
  const activeItem = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const goTo = (delta) => {
    if (lightboxIndex < 0) return;
    const next = (lightboxIndex + delta + filtered.length) % filtered.length;
    setLightboxId(filtered[next].id);
  };

  useEffect(() => {
    if (!activeItem) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxId(null);
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  return (
    <div className="gallery">
      <div className="gallery__filters" role="tablist" aria-label="Filter gallery by category">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`gallery__filter ${activeCategory === category ? "is-active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery__masonry">
        {filtered.map((item) => (
          <button type="button" key={item.id} className="gallery__item" onClick={() => setLightboxId(item.id)}>
            <img src={item.image} alt={item.caption} loading="lazy" />
            <span className="gallery__caption">
              <span className="gallery__caption-text">{item.caption}</span>
              <span className="gallery__caption-cat">{item.category}</span>
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeItem.caption}>
          <button type="button" className="lightbox__close" onClick={() => setLightboxId(null)} aria-label="Close">
            <FiX />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => goTo(-1)} aria-label="Previous image">
            <FiChevronLeft />
          </button>
          <figure className="lightbox__figure">
            <img src={activeItem.image} alt={activeItem.caption} />
            <figcaption>
              <span>{activeItem.caption}</span>
              <span className="lightbox__cat">{activeItem.category}</span>
            </figcaption>
          </figure>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => goTo(1)} aria-label="Next image">
            <FiChevronRight />
          </button>
          <div className="lightbox__backdrop" onClick={() => setLightboxId(null)} />
        </div>
      )}
    </div>
  );
}
