"use client";

import { useEffect } from "react";

/**
 * Thin client component that wires up the scroll-reveal IntersectionObserver
 * for all .section-fade elements on the home page.
 * This keeps app/page.tsx a pure Server Component (needed for async data fetching).
 */
export default function HomeClientEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
