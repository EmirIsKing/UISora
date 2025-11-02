"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 50); // delay ensures hydration is finished
      }
    }
  }, []);

  return null;
}
