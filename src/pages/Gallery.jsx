import PageHero from "../components/PageHero";
import GalleryGrid from "../components/GalleryGrid";
import CTASection from "../components/CTASection";
import { galleryItems } from "../data/gallery";

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Work we're proud of."
        subtitle="A look at recent color, cuts, balayage, extensions, styling and curly hair work from our studio. Filter by category or browse it all."
        image="/images/pages/gallery-hero.jpg"
      />

      <section className="section">
        <div className="container">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      <CTASection
        title="See something you love?"
        subtitle="Bring a photo to your consultation — it's the easiest way to show your stylist exactly what you're after."
        ctaLabel="Book an Appointment"
        ctaTo="/book"
      />
    </>
  );
}
