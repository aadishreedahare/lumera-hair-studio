import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./FAQAccordion.css";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.question}>
            <button
              type="button"
              className="faq__question"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <FiPlus className="faq__icon" aria-hidden />
            </button>
            <div className="faq__answer-wrap">
              <p className="faq__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
