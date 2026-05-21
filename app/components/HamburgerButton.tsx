interface HamburgerButtonProps {
  isMenuOpen: boolean;
  onMenuToggle: (value: boolean) => void;
};

export default function HamburgerButton({
  isMenuOpen,
  onMenuToggle
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-expanded={isMenuOpen}
      aria-label="Toggle navigation menu"
      aria-controls="mobile-menu-panel"
      onClick={() => onMenuToggle(!isMenuOpen)}
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
  );
}