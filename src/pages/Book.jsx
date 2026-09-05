import PageHero from "../components/PageHero";
import BookingForm from "../components/BookingForm";

export default function Book() {
  return (
    <>
      <PageHero
        eyebrow="Book an Appointment"
        title="Reserve your visit."
        subtitle="Choose a service, a stylist and a time that works for you. This demo flow does not process real payments or bookings."
        image="/images/pages/book-hero.jpg"
      />
      <section className="section">
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
