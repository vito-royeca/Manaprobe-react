import IconButton from "@mui/material/IconButton";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppTheme } from "~/utils/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === "dark";

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      color="inherit"
      className={className}
    >
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
