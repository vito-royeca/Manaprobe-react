"use client";

import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import MobileMenuPanel from "./MobileMenuPanel";
import ThemeToggle from "~/components/ThemeToggle";
import { getResolvedTheme } from "~/utils/theme";
import type { Theme } from "~/utils/theme";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as const;

function LogoIcon() {
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
            ? "/logo_words-dark.png"
            : "/logo_words-light.png"
          }
          alt="Manaprobe logo"
          width={256}
          height={64}
        />
      ) : (
        <picture>
          <source srcSet="/logo_words-dark.png" media="(prefers-color-scheme: dark)" />
          <source srcSet="/logo_words-light.png" media="(prefers-color-scheme: light)" />
          <img
            src="/logo_words-light.png"
            alt="Manaprobe logo"
            width={256}
            height={64}
          />
        </picture>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-surface shadow-sm border-b border-border">
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        <LogoIcon />

        {/* Desktop navigation links - visible at md breakpoint and above */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-alt"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Theme toggle - visible on all viewport sizes */}
        <ThemeToggle />

        {/* Hamburger button - visible only below md breakpoint */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu-panel"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <MobileMenuPanel
        isOpen={isMenuOpen}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
