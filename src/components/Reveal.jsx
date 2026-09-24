import { useReveal } from "../hooks/useReveal";

// Fades children in when they scroll into view. `as` picks the wrapper element.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${delayClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
