import { NavLink } from "react-router";

import { NAV_LINKS } from "./Links";

interface MobileMenuPanelProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

export default function MobileMenuPanel({
  isOpen,
  onLinkClick,
}: MobileMenuPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="mobile-menu-panel"
      className="md:hidden border-t border-border bg-surface"
    >
      <ul className="flex flex-col px-4 py-2 gap-1">
        {NAV_LINKS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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
    </div>
  );
}
