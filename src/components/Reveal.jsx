import { useReveal } from "../hooks/useReveal";

/**
 * Thin wrapper that applies the .reveal fade/slide-up treatment to its
 * children as they enter the viewport. `as` lets the wrapper render as a
 * semantically appropriate element (div, li, article...).
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${delayClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
