import { Link } from "react-router";

import { NAV_LINKS, SOCIAL_LINKS } from "./Links";

function CopyrightSection() {
  return (
    <div className="text-center md:text-left">
      <p className="text-sm text-text-on-dark/80">
        &copy; {new Date().getFullYear()} Manaprobe. All rights reserved.
        This website and related apps contain data that is Copyright © Wizards of the Coast - All Rights Reserved.
        This website is not affiliated with Wizards of the Coast in any way. 
        Made with ❤️ by &nbsp;
          <a 
            href="https://vitoroyeca.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:text-brand-accent underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2">
            Vito Royeca
          </a>.
      </p>
    </div>
  );
}

function QuickLinksSection() {
  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm text-text-on-dark/80 hover:text-text-on-dark transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinksSection() {
  return (
    <div className="flex flex-col items-center gap-2 md:items-end">
      <ul className="flex gap-4">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-on-dark/80 hover:text-text-on-dark transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DisclaimerSection() {
  return (
    <div className="max-w-7xl mx-auto md:justify-between md:items-start mt-10">
      <p className="text-sm text-text-on-dark/80 text-center">
        This website and related apps contain data that is Copyright © Wizards of the Coast - All Rights Reserved.<br />
        This website is not affiliated with Wizards of the Coast in any way.<br />
        Made with ❤️ by &nbsp;
          <a 
            href="https://vitoroyeca.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:text-brand-accent underline font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2">
            Vito Royeca
          </a>.
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-on-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start">
        
        <QuickLinksSection />
        <SocialLinksSection />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start">
        <CopyrightSection />
      </div>
    </footer>
  );
}
