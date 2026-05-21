// "use client";

import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";

import HamburgerButton from "./HamburgerButton";
import LogoIcon from "./LogoIcon";
import MobileMenuPanel from "./MobileMenuPanel";
import { NAV_LINKS } from "./Links";
import ThemeToggle from "~/components/ThemeToggle";

function NavigationLinksSection() {
  return (
    <ul className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((item) => (
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
        <NavigationLinksSection />

        {/* Theme toggle - visible on all viewport sizes */}
        <ThemeToggle />

        {/* Hamburger button - visible only below md breakpoint */}
        <HamburgerButton
          isMenuOpen={isMenuOpen}
          onMenuToggle={setIsMenuOpen} />
      </nav>

      {/* Mobile menu panel */}
      <MobileMenuPanel
        isOpen={isMenuOpen}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
