import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { getResolvedTheme, type Theme } from "~/utils/theme";

export default function LogoIcon() {
  const [theme, setTheme] = useState<Theme>("light");
  const [loaded, setLoaded] = useState(false);

  // Initialize theme state from resolved theme (SSR-safe)
  useEffect(() => {
    setTheme(getResolvedTheme());
    setLoaded(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <NavLink
      to="/"
      className="flex items-center gap-2 shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
      {loaded ? (
        <img
          src={isDark
            ? "/images/logo_words-dark.png"
            : "/images/logo_words-light.png"
          }
          alt="Manaprobe logo"
          width={256}
          height={64}
        />
      ) : (
        <picture>
          <source srcSet="/images/logo_words-dark.png" media="(prefers-color-scheme: dark)" />
          <source srcSet="/images/logo_words-light.png" media="(prefers-color-scheme: light)" />
          <img
            src="/images/logo_words-light.png"
            alt="Manaprobe logo"
            width={256}
            height={64}
          />
        </picture>
      )}
    </NavLink>
  );
}
