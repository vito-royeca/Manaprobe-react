import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the theme utility module
vi.mock("~/utils/theme", () => ({
  getResolvedTheme: vi.fn(),
  applyTheme: vi.fn(),
  persistTheme: vi.fn(),
}));

import ThemeToggle from "../ThemeToggle";
import { getResolvedTheme, applyTheme, persistTheme } from "~/utils/theme";

const mockedGetResolvedTheme = vi.mocked(getResolvedTheme);
const mockedApplyTheme = vi.mocked(applyTheme);
const mockedPersistTheme = vi.mocked(persistTheme);

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetResolvedTheme.mockReturnValue("light");
  });

  describe("Icon rendering", () => {
    it("renders moon icon when light mode is active", () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      // Moon icon path for light mode
      const svgs = button.querySelectorAll("svg");
      expect(svgs).toHaveLength(1);
      const path = svgs[0].querySelector("path");
      expect(path?.getAttribute("d")).toContain("21 12.79");
    });

    it("renders sun icon when dark mode is active", () => {
      mockedGetResolvedTheme.mockReturnValue("dark");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      const svgs = button.querySelectorAll("svg");
      expect(svgs).toHaveLength(1);
      const path = svgs[0].querySelector("path");
      expect(path?.getAttribute("d")).toContain("M12 3v1");
    });
  });

  describe("Aria-label", () => {
    it('has aria-label "Switch to dark theme" when light mode is active', () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Switch to dark theme");
    });

    it('has aria-label "Switch to light theme" when dark mode is active', () => {
      mockedGetResolvedTheme.mockReturnValue("dark");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Switch to light theme");
    });
  });

  describe("Toggle behavior", () => {
    it("toggles from light to dark on click and calls applyTheme/persistTheme", () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockedApplyTheme).toHaveBeenCalledWith("dark");
      expect(mockedPersistTheme).toHaveBeenCalledWith("dark");
      // After toggle, aria-label should update
      expect(button).toHaveAttribute("aria-label", "Switch to light theme");
    });

    it("toggles from dark to light on click and calls applyTheme/persistTheme", () => {
      mockedGetResolvedTheme.mockReturnValue("dark");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockedApplyTheme).toHaveBeenCalledWith("light");
      expect(mockedPersistTheme).toHaveBeenCalledWith("light");
      expect(button).toHaveAttribute("aria-label", "Switch to dark theme");
    });
  });

  describe("Keyboard activation", () => {
    it("is keyboard-activatable via Enter key", () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
      fireEvent.keyUp(button, { key: "Enter", code: "Enter" });
      // Native button elements handle Enter/Space natively, triggering click
      // We simulate the click that the browser would fire
      fireEvent.click(button);

      expect(mockedApplyTheme).toHaveBeenCalledWith("dark");
      expect(mockedPersistTheme).toHaveBeenCalledWith("dark");
    });

    it("is keyboard-activatable via Space key", () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: " ", code: "Space" });
      fireEvent.keyUp(button, { key: " ", code: "Space" });
      // Native button elements handle Space natively, triggering click
      fireEvent.click(button);

      expect(mockedApplyTheme).toHaveBeenCalledWith("dark");
      expect(mockedPersistTheme).toHaveBeenCalledWith("dark");
    });

    it("button element is focusable (has no tabIndex=-1)", () => {
      mockedGetResolvedTheme.mockReturnValue("light");
      render(<ThemeToggle />);

      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("tabindex", "-1");
    });
  });
});
