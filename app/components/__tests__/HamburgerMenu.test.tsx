import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

function getHamburgerButton() {
  return screen.getByRole("button", { name: "Toggle navigation menu" });
}

describe("Hamburger menu interaction", () => {
  describe("Initial state", () => {
    it("renders hamburger button with aria-expanded='false'", () => {
      renderNavbar();

      const button = getHamburgerButton();
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("has aria-controls referencing 'mobile-menu-panel'", () => {
      renderNavbar();

      const button = getHamburgerButton();
      expect(button).toHaveAttribute("aria-controls", "mobile-menu-panel");
    });

    it("does not render the mobile menu panel initially", () => {
      renderNavbar();

      expect(
        screen.queryByRole("list", { name: undefined })
      ).not.toBeNull(); // desktop nav list exists
      // The mobile-menu-panel element should not be in the DOM when closed
      const panel = document.getElementById("mobile-menu-panel");
      expect(panel).toBeNull();
    });
  });

  describe("Opening the menu", () => {
    it("opens the mobile menu panel on hamburger click", async () => {
      const user = userEvent.setup();
      renderNavbar();

      await user.click(getHamburgerButton());

      const panel = document.getElementById("mobile-menu-panel");
      expect(panel).not.toBeNull();
    });

    it("sets aria-expanded to 'true' when menu is open", async () => {
      const user = userEvent.setup();
      renderNavbar();

      await user.click(getHamburgerButton());

      expect(getHamburgerButton()).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Closing the menu", () => {
    it("closes the menu when clicking the hamburger button again (toggle)", async () => {
      const user = userEvent.setup();
      renderNavbar();

      // Open
      await user.click(getHamburgerButton());
      expect(document.getElementById("mobile-menu-panel")).not.toBeNull();

      // Close
      await user.click(getHamburgerButton());
      expect(document.getElementById("mobile-menu-panel")).toBeNull();
      expect(getHamburgerButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("closes the menu when a navigation link is clicked", async () => {
      const user = userEvent.setup();
      renderNavbar();

      await user.click(getHamburgerButton());
      expect(document.getElementById("mobile-menu-panel")).not.toBeNull();

      // Click a link inside the mobile menu panel
      const panel = document.getElementById("mobile-menu-panel")!;
      const featuresLink = panel.querySelector('a[href="/features"]')!;
      await user.click(featuresLink);

      expect(document.getElementById("mobile-menu-panel")).toBeNull();
      expect(getHamburgerButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("closes the menu when Escape key is pressed", async () => {
      const user = userEvent.setup();
      renderNavbar();

      await user.click(getHamburgerButton());
      expect(document.getElementById("mobile-menu-panel")).not.toBeNull();

      await user.keyboard("{Escape}");

      expect(document.getElementById("mobile-menu-panel")).toBeNull();
      expect(getHamburgerButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("closes the menu when clicking outside the header", async () => {
      const user = userEvent.setup();
      const { container } = renderNavbar();

      await user.click(getHamburgerButton());
      expect(document.getElementById("mobile-menu-panel")).not.toBeNull();

      // Click outside the header (on the document body area outside the rendered component)
      await user.click(container.parentElement!);

      expect(document.getElementById("mobile-menu-panel")).toBeNull();
      expect(getHamburgerButton()).toHaveAttribute("aria-expanded", "false");
    });
  });
});
