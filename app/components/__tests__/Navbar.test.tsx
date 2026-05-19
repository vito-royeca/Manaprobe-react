import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect } from "vitest";
import Navbar from "../Navbar";

function renderNavbar(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  describe("Navigation links rendering", () => {
    it("renders all 4 navigation links with correct labels", () => {
      renderNavbar();

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    });

    it("renders Home link with href '/'", () => {
      renderNavbar();

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders Features link with href '/features'", () => {
      renderNavbar();

      const featuresLink = screen.getByRole("link", { name: "Features" });
      expect(featuresLink).toHaveAttribute("href", "/features");
    });

    it("renders About link with href '/about'", () => {
      renderNavbar();

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("renders Contact link with href '/contact'", () => {
      renderNavbar();

      const contactLink = screen.getByRole("link", { name: "Contact" });
      expect(contactLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("Logo rendering", () => {
    it("renders the logo image with correct alt text", () => {
      renderNavbar();

      const logo = screen.getByAltText("ManaProbe logo");
      expect(logo).toBeInTheDocument();
      expect(logo.tagName).toBe("IMG");
    });

    it("logo links to home page '/'", () => {
      renderNavbar();

      const logo = screen.getByAltText("ManaProbe logo");
      const logoLink = logo.closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Active link styling", () => {
    it("applies active styling to Home link when on '/' route", () => {
      renderNavbar("/");

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink.className).toContain("bg-brand-accent/10");
      expect(homeLink.className).toContain("text-brand-accent");
    });

    it("applies active styling to Features link when on '/features' route", () => {
      renderNavbar("/features");

      const featuresLink = screen.getByRole("link", { name: "Features" });
      expect(featuresLink.className).toContain("bg-brand-accent/10");
      expect(featuresLink.className).toContain("text-brand-accent");
    });

    it("does not apply active styling to Home link when on '/features' route", () => {
      renderNavbar("/features");

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink.className).not.toContain("bg-brand-accent/10");
      expect(homeLink.className).toContain("text-text-secondary");
    });

    it("applies active styling to About link when on '/about' route", () => {
      renderNavbar("/about");

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink.className).toContain("bg-brand-accent/10");
      expect(aboutLink.className).toContain("text-brand-accent");
    });

    it("applies active styling to Contact link when on '/contact' route", () => {
      renderNavbar("/contact");

      const contactLink = screen.getByRole("link", { name: "Contact" });
      expect(contactLink.className).toContain("bg-brand-accent/10");
      expect(contactLink.className).toContain("text-brand-accent");
    });
  });
});
