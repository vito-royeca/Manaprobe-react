import { createTheme } from "@mui/material/styles";
import type { Theme as AppTheme } from "./theme";

/**
 * Create an MUI theme that matches the app's current light/dark mode.
 * Color tokens align with the values defined in app.css @theme.
 */
export function createAppTheme(mode: AppTheme) {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#FAFAFA",
              paper: "#F3F4F6",
            },
            text: {
              primary: "#111827",
              secondary: "#6B7280",
            },
            divider: "#E5E7EB",
          }
        : {
            background: {
              default: "#111111",
              paper: "#1A1A1A",
            },
            text: {
              primary: "#F9FAFB",
              secondary: "#9CA3AF",
            },
            divider: "#2D2D2D",
          }),
    },
    typography: {
      fontFamily:
        '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
  });
}
