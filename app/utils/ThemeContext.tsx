import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "~/utils/muiTheme";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getResolvedTheme(): Theme {
  if (!isBrowser()) return "light";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable
  }

  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {
    // matchMedia unavailable
  }

  return "light";
}

function applyTheme(theme: Theme): void {
  if (!isBrowser()) return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function persistTheme(theme: Theme): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // fail silently
  }
}

function onSystemThemeChange(callback: (theme: Theme) => void): () => void {
  if (!isBrowser()) return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => callback(e.matches ? "dark" : "light");
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useAppTheme() {
  return useContext(ThemeContext);
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const resolved = getResolvedTheme();
    applyTheme(resolved);
    setTheme(resolved);

    const cleanup = onSystemThemeChange((t) => {
      applyTheme(t);
      setTheme(t);
    });
    return cleanup;
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    persistTheme(next);
  }

  const muiTheme = useMemo(() => createAppTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
