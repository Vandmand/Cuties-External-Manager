import { useState } from "react";

export default function useHref() {
  const [href, setHref] = useState("");

  window.addEventListener("locationChange", () =>
    setHref(window.location.pathname)
  );

  return href;
}
