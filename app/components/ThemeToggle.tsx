import { useState, useEffect } from "react";
import { getResolvedTheme, applyTheme, persistTheme } from "~/utils/theme";
import type { Theme } from "~/utils/theme";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme state from resolved theme (SSR-safe)
  useEffect(() => {
    setTheme(getResolvedTheme());
  }, []);

  function handleToggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    persistTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`p-2 rounded-md text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2${className ? ` ${className}` : ""}`}
    >
      {isDark ? (
        // Sun icon — shown when dark mode is active (click to switch to light)
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon — shown when light mode is active (click to switch to dark)
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
