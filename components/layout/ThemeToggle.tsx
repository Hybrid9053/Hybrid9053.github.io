"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Theme is applied pre-paint by the inline script in app/layout.tsx.
 * Both icons are rendered and swapped with CSS, so there is no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f6f7f9" : "#07080b");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <Sun size={16} aria-hidden="true" className="hidden light:block" />
      <Moon size={16} aria-hidden="true" className="block light:hidden" />
    </button>
  );
}
