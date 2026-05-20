export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Check if code is running in a browser environment.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Get the resolved theme: stored preference > system preference > 'light'.
 *
 * Resolution order:
 * 1. localStorage persisted value (if valid)
 * 2. System color scheme preference via matchMedia
 * 3. 'light' as the ultimate default
 *
 * Returns 'light' during SSR or when browser APIs are unavailable.
 */
export function getResolvedTheme(): Theme {
  if (!isBrowser()) {
    return "light";
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.)
  }

  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch {
    // matchMedia unavailable
  }

  return "light";
}

/**
 * Apply theme to document root by toggling the `dark` class on `<html>`.
 * This is idempotent — calling multiple times with the same value produces the same result.
 */
export function applyTheme(theme: Theme): void {
  if (!isBrowser()) {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Persist theme choice to localStorage.
 * Handles errors gracefully (private browsing, quota exceeded).
 */
export function persistTheme(theme: Theme): void {
  if (!isBrowser()) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.)
    // Fail silently — theme still works in-memory via applyTheme
  }
}

/**
 * Subscribe to OS color scheme preference changes.
 * Returns a cleanup function to remove the listener.
 *
 * Returns a no-op cleanup function during SSR.
 */
export function onSystemThemeChange(
  callback: (theme: Theme) => void
): () => void {
  if (!isBrowser()) {
    return () => {};
  }

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) =>
    callback(e.matches ? "dark" : "light");
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
