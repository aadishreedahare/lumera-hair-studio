import { useState } from "react";
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

const EMPTY_FORM = { service: "", stylist: "", date: "", time: "", fullName: "", phone: "", email: "", notes: "" };

// Local date as YYYY-MM-DD (shift by the timezone offset so toISOString doesn't give the UTC date).
function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Summary({ rows }) {
  return (
    <dl>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function Field({ label, full, ...props }) {
  const Input = props.rows ? "textarea" : "input";
  return (
    <label className={`booking__field ${full ? "booking__field--full" : ""}`}>
      <span>{label}</span>
      <Input {...props} />
    </label>
  );
}

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const preselectedStylist = searchParams.get("stylist");

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    stylist: STYLIST_OPTIONS.some((s) => s.slug === preselectedStylist) ? preselectedStylist : "",
  });
  const [confirmation, setConfirmation] = useState(null);

  const min = todayISO();

  const requiredForStep = [["service"], ["stylist"], ["date"], ["time"], ["fullName", "phone", "email"]][step] ?? [];
  const canContinue = requiredForStep.every((key) => form[key].trim());

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
    setForm(EMPTY_FORM);
    setConfirmation(null);
    setStep(0);
  };

  const appointmentRows = [
    ["Service", form.service],
    ["Stylist", stylistName],
    ["Date", formatDate(form.date)],
    ["Time", form.time],
  ];

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
                      onClick={() => update({ service: item.name })}
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
                <Field label="Full name *" type="text" placeholder="Your name" required
                  value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} />
                <Field label="Phone *" type="tel" placeholder="+91 00000 00000" required
                  value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
                <Field label="Email *" type="email" placeholder="you@example.com" required full
                  value={form.email} onChange={(e) => update({ email: e.target.value })} />
                <Field label="Hair concerns / additional notes" rows={4} full
                  placeholder="Tell us anything that will help your stylist prepare."
                  value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
              </div>
            </fieldset>

            <div className="booking__summary">
              <h4>Your appointment</h4>
              <Summary rows={appointmentRows} />
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
              <Summary
                rows={[["Confirmation code", confirmation], ...appointmentRows, ["Contact", `${form.phone} · ${form.email}`]]}
              />
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
