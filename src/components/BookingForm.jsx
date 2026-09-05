import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiCheck, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { serviceMenu } from "../data/services";
import { team } from "../data/team";
import { timeSlots } from "../data/content";
import "./BookingForm.css";

const STEPS = ["Service", "Stylist", "Date", "Time", "Details", "Confirmation"];

const STYLIST_OPTIONS = [
  { slug: "any", name: "Any Available Stylist", role: "We'll match you with the best fit", image: null },
  ...team.map((member) => ({ slug: member.slug, name: member.name, role: member.role, image: member.image })),
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const preselectedStylist = searchParams.get("stylist");

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: "",
    serviceCategory: "",
    stylist: preselectedStylist && STYLIST_OPTIONS.some((s) => s.slug === preselectedStylist) ? preselectedStylist : "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [confirmation, setConfirmation] = useState(null);

  const min = todayISO();

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(form.service);
      case 1:
        return Boolean(form.stylist);
      case 2:
        return Boolean(form.date);
      case 3:
        return Boolean(form.time);
      case 4:
        return form.fullName.trim() && form.phone.trim() && form.email.trim();
      default:
        return true;
    }
  }, [step, form]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const next = () => {
    if (step === 4) {
      const code = `LUM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      setConfirmation(code);
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const stylistName = STYLIST_OPTIONS.find((s) => s.slug === form.stylist)?.name;

  const restart = () => {
    setForm({
      service: "",
      serviceCategory: "",
      stylist: "",
      date: "",
      time: "",
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    });
    setConfirmation(null);
    setStep(0);
  };

  return (
    <div className="booking">
      <ol className="booking__steps" aria-label="Booking progress">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={`booking__step ${index === step ? "is-current" : ""} ${index < step ? "is-done" : ""}`}
          >
            <span className="booking__step-index">{index < step ? <FiCheck /> : index + 1}</span>
            <span className="booking__step-label">{label}</span>
          </li>
        ))}
      </ol>

      <div className="booking__panel">
        {step === 0 && (
          <fieldset className="booking__fieldset">
            <legend>Choose a service</legend>
            {serviceMenu.map((group) => (
              <div className="booking__group" key={group.category}>
                <h4 className="booking__group-title">{group.category}</h4>
                <div className="booking__option-grid">
                  {group.items.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      className={`booking__option ${form.service === item.name ? "is-selected" : ""}`}
                      onClick={() => update({ service: item.name, serviceCategory: group.category })}
                    >
                      <span>{item.name}</span>
                      <span className="booking__option-price">{item.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="booking__fieldset">
            <legend>Choose a stylist</legend>
            <div className="booking__stylist-grid">
              {STYLIST_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.slug}
                  className={`booking__stylist ${form.stylist === option.slug ? "is-selected" : ""}`}
                  onClick={() => update({ stylist: option.slug })}
                >
                  <span className="booking__stylist-avatar" aria-hidden="true">
                    {option.image ? <img src={option.image} alt="" /> : <span className="booking__stylist-any">Any</span>}
                  </span>
                  <span className="booking__stylist-name">{option.name}</span>
                  <span className="booking__stylist-role">{option.role}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="booking__fieldset">
            <legend>Choose a date</legend>
            <label className="booking__field" htmlFor="booking-date">
              <span>Preferred date</span>
              <input
                id="booking-date"
                type="date"
                min={min}
                value={form.date}
                onChange={(e) => update({ date: e.target.value })}
              />
            </label>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="booking__fieldset">
            <legend>Available times — {formatDate(form.date)}</legend>
            <div className="booking__time-grid">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={`booking__time ${form.time === slot ? "is-selected" : ""}`}
                  onClick={() => update({ time: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div className="booking__details">
            <fieldset className="booking__fieldset">
              <legend>Your information</legend>
              <div className="booking__form-grid">
                <label className="booking__field">
                  <span>Full name *</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update({ fullName: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="booking__field">
                  <span>Phone *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    placeholder="+91 00000 00000"
                    required
                  />
                </label>
                <label className="booking__field booking__field--full">
                  <span>Email *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update({ email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="booking__field booking__field--full">
                  <span>Hair concerns / additional notes</span>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    placeholder="Tell us anything that will help your stylist prepare."
                  />
                </label>
              </div>
            </fieldset>

            <div className="booking__summary">
              <h4>Your appointment</h4>
              <dl>
                <div>
                  <dt>Service</dt>
                  <dd>{form.service || "—"}</dd>
                </div>
                <div>
                  <dt>Stylist</dt>
                  <dd>{stylistName || "—"}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(form.date) || "—"}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{form.time || "—"}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="booking__confirmation">
            <span className="booking__confirmation-icon">
              <FiCheck />
            </span>
            <h3>Your appointment request is in.</h3>
            <p>
              Thank you, {form.fullName.split(" ")[0] || "there"}. We've noted your request below — our front desk
              will confirm by phone or email shortly. This is a demo flow for a fictional studio, so no real
              appointment has been booked and no payment has been processed.
            </p>
            <div className="booking__summary booking__summary--confirmed">
              <dl>
                <div>
                  <dt>Confirmation code</dt>
                  <dd>{confirmation}</dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{form.service}</dd>
                </div>
                <div>
                  <dt>Stylist</dt>
                  <dd>{stylistName}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(form.date)}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{form.time}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    {form.phone} · {form.email}
                  </dd>
                </div>
              </dl>
            </div>
            <button type="button" className="btn btn-outline" onClick={restart}>
              Book Another Appointment
            </button>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="booking__nav">
          <button type="button" className="booking__nav-btn" onClick={back} disabled={step === 0}>
            <FiArrowLeft /> Back
          </button>
          <button type="button" className="btn" onClick={next} disabled={!canContinue}>
            {step === 4 ? "Confirm Booking" : "Continue"} <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
