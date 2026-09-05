import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll position on every route change so page transitions
// always start at the top, like a traditional multi-page site.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
